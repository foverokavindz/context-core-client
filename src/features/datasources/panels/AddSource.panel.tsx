import Stack from '@mui/material/Stack';
import { Plus } from 'lucide-react';
import AppModal from '../../../components/AppModal';
import { useDataSourcesContext } from '../context/DataSources.context';
import { WIZARD_SUBTITLES } from '../datasources.mock';
import type { WizardStep } from '../datasources.types';
import SelectSourceSection from '../sections/modal/SelectSource.section';
import CredentialsSection from '../sections/modal/Credentials.section';
import PipelineStatusSection from '../sections/modal/PipelineStatus.section';
import {
  StyledStepRail,
  StyledStepItem,
  StyledStepDot,
  StyledStepLabel,
  StyledStepConnector,
  StyledWizardBackButton,
  StyledWizardNextButton,
} from './AddSource.panel.styled.component';

const HEADER_ICON_SIZE = 18;

const WIZARD_STEPS: { step: WizardStep; label: string }[] = [
  { step: 1, label: 'Choose source' },
  { step: 2, label: 'Configure' },
  { step: 3, label: 'Ingest' },
];

const NEXT_LABELS: Record<WizardStep, string> = {
  1: 'Continue',
  2: 'Start Ingestion',
  3: 'Done',
};

function stepState(current: WizardStep, step: WizardStep): 'done' | 'active' | 'upcoming' {
  if (current > step) return 'done';
  if (current === step) return 'active';
  return 'upcoming';
}

function AddSourcePanel() {
  const {
    catalog,
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
    closeWizard,
    pickSource,
    setFormTitle,
    setFormConfigField,
    setFormToken,
    wizardNext,
    wizardBack,
    toggleScopeItem,
    setSyncFrequency,
  } = useDataSourcesContext();

  const stepRail = (
    <StyledStepRail direction="row">
      {WIZARD_STEPS.map(({ step, label }, index) => {
        const state = stepState(wizardStep, step);
        const isLast = index === WIZARD_STEPS.length - 1;

        return (
          <StyledStepItem key={step} grows={!isLast}>
            <Stack spacing={0.75} sx={{ alignItems: 'center', flexShrink: 0 }}>
              <StyledStepDot state={state}>{state === 'done' ? '✓' : step}</StyledStepDot>
              <StyledStepLabel state={state}>{label}</StyledStepLabel>
            </Stack>
            {!isLast && <StyledStepConnector done={state === 'done'} />}
          </StyledStepItem>
        );
      })}
    </StyledStepRail>
  );

  const canGoBack = wizardStep !== 3 || Boolean(submitError);

  const nextDisabled =
    (wizardStep === 1 && !pickedSourceType) ||
    (wizardStep === 2 && (!requiredFieldsFilled || submitting));

  const footer = (
    <>
      {canGoBack && (
        <StyledWizardBackButton onClick={wizardBack}>
          {wizardStep === 1 ? 'Cancel' : 'Back'}
        </StyledWizardBackButton>
      )}
      <StyledWizardNextButton disabled={nextDisabled} onClick={wizardNext}>
        {NEXT_LABELS[wizardStep]}
      </StyledWizardNextButton>
    </>
  );

  return (
    <AppModal
      open={wizardOpen}
      onClose={closeWizard}
      title="Add New Source"
      subtitle={WIZARD_SUBTITLES[wizardStep]}
      icon={<Plus size={HEADER_ICON_SIZE} />}
      headerExtra={stepRail}
      footer={footer}
    >
      {wizardStep === 1 && (
        <SelectSourceSection
          catalog={catalog}
          selectedSourceType={pickedSourceType}
          onPick={pickSource}
        />
      )}
      {wizardStep === 2 && pickedEntry && (
        <CredentialsSection
          entry={pickedEntry}
          form={form}
          scope={scope}
          syncFrequency={syncFrequency}
          onChangeTitle={setFormTitle}
          onChangeConfigField={setFormConfigField}
          onChangeToken={setFormToken}
          onToggleScopeItem={toggleScopeItem}
          onChangeSyncFrequency={setSyncFrequency}
        />
      )}
      {wizardStep === 3 && (
        <PipelineStatusSection
          sourceName={form.title.trim() || pickedEntry?.name || 'this source'}
          submitting={submitting}
          submitError={submitError}
          run={activeRun}
        />
      )}
    </AppModal>
  );
}

export default AddSourcePanel;
