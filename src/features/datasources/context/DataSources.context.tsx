import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { dataSourceService } from '../../../services/DataSource.service';
import { CURRENT_USER } from '../../../configs/user.configs';
import {
  SOURCE_CATALOG,
  SYNC_POLL_INTERVAL_MS,
  getSourceConfig,
  type SourceCatalogEntry,
} from '../../../configs/datasource.configs';
import { RESOURCE_ACCESS_SCOPE, SYNC_RUN_STATUS, type SourceTypeType } from '../../../types/common.types';
import type {
  DataSourceDetail,
  DataSourceSummary,
  IndexedResource,
  SyncRun,
} from '../../../types/dataSource.types';
import { SOURCE_SCOPE } from '../datasources.mock';
import { toDataSourceRow } from '../datasources.mappers';
import type {
  CredentialForm,
  DataSource,
  DrawerTab,
  ScopeItem,
  SyncFrequency,
  WizardStep,
} from '../datasources.types';

const FIRST_STEP: WizardStep = 1;
const CONFIGURE_STEP: WizardStep = 2;
const INGEST_STEP: WizardStep = 3;

const SOURCES_ERROR = 'Could not load your connected sources.';
const START_ERROR = 'Could not start the ingestion.';
const DETAIL_ERROR = 'Could not load this source.';

const EMPTY_FORM: CredentialForm = { title: '', config: {}, token: '' };

/** A run that is still moving. Anything else is settled, and polling stops. */
function isInFlight(run: SyncRun | null): boolean {
  return run?.status === SYNC_RUN_STATUS.Pending || run?.status === SYNC_RUN_STATUS.Running;
}

interface DataSourcesContextValue {
  sources: DataSource[];
  sourcesLoading: boolean;
  sourcesError: string | null;
  catalog: SourceCatalogEntry[];
  scope: ScopeItem[];
  syncFrequency: SyncFrequency;

  wizardOpen: boolean;
  wizardStep: WizardStep;
  pickedSourceType: SourceTypeType | null;
  pickedEntry: SourceCatalogEntry | null;
  form: CredentialForm;
  requiredFieldsFilled: boolean;
  submitting: boolean;
  submitError: string | null;
  activeRun: SyncRun | null;

  drawerOpen: boolean;
  drawerSource: DataSource | null;
  drawerDetail: DataSourceDetail | null;
  drawerRuns: SyncRun[];
  drawerResources: IndexedResource[];
  drawerLoading: boolean;
  drawerError: string | null;
  drawerTab: DrawerTab;

  openWizard: (sourceType?: SourceTypeType) => void;
  closeWizard: () => void;
  pickSource: (sourceType: SourceTypeType) => void;
  setFormTitle: (title: string) => void;
  setFormConfigField: (key: string, value: string) => void;
  setFormToken: (token: string) => void;
  wizardNext: () => void;
  wizardBack: () => void;
  openDrawer: (sourceId: string) => void;
  closeDrawer: () => void;
  setDrawerTab: (tab: DrawerTab) => void;
  toggleScopeItem: (name: string) => void;
  setSyncFrequency: (frequency: SyncFrequency) => void;
}

const DataSourcesContext = createContext<DataSourcesContextValue | null>(null);

export function DataSourcesProvider({ children }: { children: ReactNode }) {
  const [summaries, setSummaries] = useState<DataSourceSummary[]>([]);
  const [sourcesLoading, setSourcesLoading] = useState(false);
  const [sourcesError, setSourcesError] = useState<string | null>(null);

  const [scope, setScope] = useState<ScopeItem[]>(SOURCE_SCOPE);
  const [syncFrequency, setSyncFrequency] = useState<SyncFrequency>('daily');

  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState<WizardStep>(FIRST_STEP);
  const [pickedSourceType, setPickedSourceType] = useState<SourceTypeType | null>(null);
  const [form, setForm] = useState<CredentialForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const [activeRun, setActiveRun] = useState<SyncRun | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerKey, setDrawerKey] = useState<string | null>(null);
  const [drawerDetail, setDrawerDetail] = useState<DataSourceDetail | null>(null);
  const [drawerRuns, setDrawerRuns] = useState<SyncRun[]>([]);
  const [drawerResources, setDrawerResources] = useState<IndexedResource[]>([]);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [drawerError, setDrawerError] = useState<string | null>(null);
  const [drawerTab, setDrawerTab] = useState<DrawerTab>('ingestion');

  const sources = summaries.map(toDataSourceRow);
  const pickedEntry = pickedSourceType ? getSourceConfig(pickedSourceType) : null;
  const drawerSource = sources.find((source) => source.key === drawerKey) ?? null;

  const requiredFieldsFilled = Boolean(
    pickedEntry &&
    form.title.trim() &&
    form.token.trim() &&
    pickedEntry.fields.every((field) => !field.required || form.config[field.key]?.trim()),
  );

  const fetchSources = async () => {
    setSourcesError(null);
    setSourcesLoading(true);
    const response = await dataSourceService.GetDataSourcesByTeam(CURRENT_USER.teamId);
    if (response.success && response.data) {
      setSummaries(response.data);
    } else {
      console.error('Get Data Sources Error:', response.message);
      setSourcesError(response.error ?? response.message ?? SOURCES_ERROR);
    }
    setSourcesLoading(false);
  };

  useEffect(() => {
    fetchSources();
  }, []);

  const drawerRun = drawerRuns[0] ?? null;
  const watchedRunId =
    activeRunId ??
    (drawerOpen && isInFlight(drawerRun) ? drawerRun.id : null) ??
    summaries.find((summary) => isInFlight(summary.latest_run))?.latest_run?.id ??
    null;

  const settledRef = useRef(false);

  useEffect(() => {
    if (!watchedRunId) return;

    settledRef.current = false;

    const readRun = async () => {
      const response = await dataSourceService.GetSyncRunById(watchedRunId);
      if (!response.success || !response.data) {
        console.error('Get Sync Run Error:', response.message);
        return;
      }

      const run = response.data;
      setActiveRun(run);
      setDrawerRuns((previous) =>
        previous.map((existing) => (existing.id === run.id ? run : existing)),
      );

      if (!isInFlight(run) && !settledRef.current) {
        settledRef.current = true;
        // The run is over: the source's counts and last_synced_at have moved.
        fetchSources();
      }
    };

    readRun();
    const timer = setInterval(() => {
      if (settledRef.current) {
        clearInterval(timer);
        return;
      }
      readRun();
    }, SYNC_POLL_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [watchedRunId]);

  const resetWizard = (sourceType: SourceTypeType | null) => {
    setPickedSourceType(sourceType);
    setForm(EMPTY_FORM);
    setSubmitError(null);
    setSubmitting(false);
    setActiveRunId(null);
    setActiveRun(null);
  };

  const openWizard = (sourceType?: SourceTypeType) => {
    resetWizard(sourceType ?? null);
    setWizardStep(sourceType ? CONFIGURE_STEP : FIRST_STEP);
    setWizardOpen(true);
  };

  const closeWizard = () => {
    setWizardOpen(false);
    setWizardStep(FIRST_STEP);
    resetWizard(null);
  };

  const pickSource = (sourceType: SourceTypeType) => {
    if (sourceType === pickedSourceType) return;
    resetWizard(sourceType); // a different source needs different fields, so the half-filled ones go
  };

  const setFormTitle = (title: string) => setForm((previous) => ({ ...previous, title }));

  const setFormConfigField = (key: string, value: string) =>
    setForm((previous) => ({ ...previous, config: { ...previous.config, [key]: value } }));

  const setFormToken = (token: string) => setForm((previous) => ({ ...previous, token }));

  const startIngestion = async (entry: SourceCatalogEntry) => {
    setSubmitError(null);
    setSubmitting(true);

    const response = await dataSourceService.StartIngestion(entry.slug, {
      title: form.title.trim(),
      team_id: CURRENT_USER.teamId,
      department_id: CURRENT_USER.departmentId,
      access_scope: RESOURCE_ACCESS_SCOPE.Team,
      created_by_user_id: CURRENT_USER.userId,
      source_type: entry.sourceType,
      config: Object.fromEntries(
        entry.fields
          .map((field) => [field.key, form.config[field.key]?.trim() ?? ''] as const)
          .filter(([, fieldValue]) => fieldValue.length > 0),
      ),
      token: form.token.trim(),
    });

    if (response.success && response.data) {
      setActiveRunId(response.data.sync_run_id);
      fetchSources(); // the connection exists from here, whatever the run goes on to do
    } else {
      console.error('Start Ingestion Error:', response.message);
      setSubmitError(response.error ?? response.message ?? START_ERROR);
    }
    setSubmitting(false);
  };

  const wizardNext = () => {
    if (wizardStep === FIRST_STEP) {
      if (pickedSourceType) setWizardStep(CONFIGURE_STEP);
      return;
    }
    if (wizardStep === CONFIGURE_STEP) {
      if (!pickedEntry || !requiredFieldsFilled) return;
      setWizardStep(INGEST_STEP);
      startIngestion(pickedEntry);
      return;
    }
    closeWizard();
  };

  const wizardBack = () => {
    if (wizardStep === FIRST_STEP) {
      closeWizard();
      return;
    }
    if (wizardStep === INGEST_STEP) {
      setSubmitError(null);
      setWizardStep(CONFIGURE_STEP);
      return;
    }
    setWizardStep(FIRST_STEP);
  };

  const fetchDrawer = async (sourceId: string) => {
    setDrawerError(null);
    setDrawerLoading(true);

    const [detail, runs, resources] = await Promise.all([
      dataSourceService.GetDataSourceById(sourceId),
      dataSourceService.GetSyncRunsBySource(sourceId),
      dataSourceService.GetIndexedResources(sourceId),
    ]);

    if (detail.success && detail.data) {
      setDrawerDetail(detail.data);
    } else {
      console.error('Get Data Source Error:', detail.message);
      setDrawerError(detail.error ?? detail.message ?? DETAIL_ERROR);
    }

    if (runs.success && runs.data) setDrawerRuns(runs.data);
    else console.error('Get Sync Runs Error:', runs.message);

    if (resources.success && resources.data) setDrawerResources(resources.data);
    else console.error('Get Indexed Resources Error:', resources.message);

    setDrawerLoading(false);
  };

  const openDrawer = (sourceId: string) => {
    setDrawerKey(sourceId);
    setDrawerTab('ingestion');
    setDrawerDetail(null);
    setDrawerRuns([]);
    setDrawerResources([]);
    setDrawerOpen(true);
    fetchDrawer(sourceId);
  };

  const closeDrawer = () => setDrawerOpen(false);

  const toggleScopeItem = (name: string) =>
    setScope((prev) => prev.map((item) => (item.name === name ? { ...item, selected: !item.selected } : item)));

  const value: DataSourcesContextValue = {
    sources,
    sourcesLoading,
    sourcesError,
    catalog: SOURCE_CATALOG,
    scope,
    syncFrequency,
    wizardOpen,
    wizardStep,
    pickedSourceType,
    pickedEntry,
    form,
    requiredFieldsFilled,
    submitting,
    submitError,
    activeRun,
    drawerOpen,
    drawerSource,
    drawerDetail,
    drawerRuns,
    drawerResources,
    drawerLoading,
    drawerError,
    drawerTab,
    openWizard,
    closeWizard,
    pickSource,
    setFormTitle,
    setFormConfigField,
    setFormToken,
    wizardNext,
    wizardBack,
    openDrawer,
    closeDrawer,
    setDrawerTab,
    toggleScopeItem,
    setSyncFrequency,
  };

  return <DataSourcesContext.Provider value={value}>{children}</DataSourcesContext.Provider>;
}

export function useDataSourcesContext(): DataSourcesContextValue {
  const context = useContext(DataSourcesContext);
  if (!context) {
    throw new Error('useDataSourcesContext must be used within a DataSourcesProvider');
  }
  return context;
}
