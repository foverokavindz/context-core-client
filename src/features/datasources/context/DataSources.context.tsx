import { createContext, useContext, useState, type ReactNode } from 'react';
import { DATA_SOURCES, SOURCE_CATALOG, SOURCE_SCOPE } from '../datasources.mock';
import type {
  CatalogApp,
  DataSource,
  DrawerTab,
  ScopeItem,
  SyncFrequency,
  WizardStep,
} from '../datasources.types';

const FIRST_STEP: WizardStep = 1;
const CONFIGURE_STEP: WizardStep = 2;
const INGEST_STEP: WizardStep = 3;

interface DataSourcesContextValue {
  sources: DataSource[];
  catalog: CatalogApp[];
  scope: ScopeItem[];
  syncFrequency: SyncFrequency;
  wizardOpen: boolean;
  wizardStep: WizardStep;
  wizardPick: string | null;
  pickedApp: CatalogApp | null;
  drawerOpen: boolean;
  drawerSource: DataSource | null;
  drawerTab: DrawerTab;
  openWizard: (pickKey?: string) => void;
  closeWizard: () => void;
  pickApp: (key: string) => void;
  wizardNext: () => void;
  wizardBack: () => void;
  openDrawer: (key: string) => void;
  closeDrawer: () => void;
  setDrawerTab: (tab: DrawerTab) => void;
  toggleScopeItem: (name: string) => void;
  setSyncFrequency: (frequency: SyncFrequency) => void;
}

const DataSourcesContext = createContext<DataSourcesContextValue | null>(null);

export function DataSourcesProvider({ children }: { children: ReactNode }) {
  const [sources, setSources] = useState<DataSource[]>(DATA_SOURCES);
  const [scope, setScope] = useState<ScopeItem[]>(SOURCE_SCOPE);
  const [syncFrequency, setSyncFrequency] = useState<SyncFrequency>('daily');
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState<WizardStep>(FIRST_STEP);
  const [wizardPick, setWizardPick] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerKey, setDrawerKey] = useState<string | null>(null);
  const [drawerTab, setDrawerTab] = useState<DrawerTab>('ingestion');

  const catalog = SOURCE_CATALOG.filter((app) => !sources.some((source) => source.key === app.key));
  const pickedApp = SOURCE_CATALOG.find((app) => app.key === wizardPick) ?? null;
  const drawerSource = sources.find((source) => source.key === drawerKey) ?? null;

  const openWizard = (pickKey?: string) => {
    setWizardPick(pickKey ?? null);
    setWizardStep(pickKey ? CONFIGURE_STEP : FIRST_STEP);
    setWizardOpen(true);
  };

  const closeWizard = () => {
    setWizardOpen(false);
    setWizardStep(FIRST_STEP);
    setWizardPick(null);
  };

  const pickApp = (key: string) => setWizardPick(key);

  const connectPickedApp = () => {
    if (!pickedApp) return;
    setSources((prev) =>
      prev.some((source) => source.key === pickedApp.key)
        ? prev
        : [
          ...prev,
          {
            key: pickedApp.key,
            name: pickedApp.name,
            icon: pickedApp.icon,
            type: 'New',
            status: 'syncing',
            syncLabel: 'Just now',
            dataIndexed: '—',
            dataSecondary: 'First ingestion in progress',
          },
        ],
    );
  };

  const wizardNext = () => {
    if (wizardStep === FIRST_STEP) {
      if (wizardPick) setWizardStep(CONFIGURE_STEP);
      return;
    }
    if (wizardStep === CONFIGURE_STEP) {
      connectPickedApp();
      setWizardStep(INGEST_STEP);
      return;
    }
    closeWizard();
  };

  const wizardBack = () => {
    if (wizardStep === FIRST_STEP) {
      closeWizard();
      return;
    }
    setWizardStep((step) => (step - 1) as WizardStep);
  };

  const openDrawer = (key: string) => {
    setDrawerKey(key);
    setDrawerTab('ingestion');
    setDrawerOpen(true);
  };

  const closeDrawer = () => setDrawerOpen(false);

  const toggleScopeItem = (name: string) =>
    setScope((prev) => prev.map((item) => (item.name === name ? { ...item, selected: !item.selected } : item)));

  const value: DataSourcesContextValue = {
    sources,
    catalog,
    scope,
    syncFrequency,
    wizardOpen,
    wizardStep,
    wizardPick,
    pickedApp,
    drawerOpen,
    drawerSource,
    drawerTab,
    openWizard,
    closeWizard,
    pickApp,
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
