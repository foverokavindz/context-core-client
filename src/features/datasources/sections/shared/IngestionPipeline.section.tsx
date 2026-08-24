import Stack from '@mui/material/Stack';
import { Check } from 'lucide-react';
import type { IngestionStep, IngestionStepState } from '../../datasources.types';
import {
  StyledPipelineRoot,
  StyledPipelineStep,
  StyledPipelineRail,
  StyledPipelineDot,
  StyledPipelineConnector,
  StyledPipelineLabel,
  StyledPipelineState,
} from './IngestionPipeline.section.styled.component';

const CHECK_ICON_SIZE = 11;

const STATE_LABELS: Record<IngestionStepState, string> = {
  completed: 'Completed',
  running: 'Running',
  queued: 'Queued',
  failed: 'Failed',
};

interface IngestionPipelineSectionProps {
  steps: IngestionStep[];
}

function IngestionPipelineSection({ steps }: IngestionPipelineSectionProps) {
  return (
    <StyledPipelineRoot>
      {steps.map((step, index) => (
        <StyledPipelineStep key={step.label} direction="row" spacing={1.5}>
          <StyledPipelineRail>
            <StyledPipelineDot state={step.state}>
              {step.state === 'completed' && <Check size={CHECK_ICON_SIZE} />}
            </StyledPipelineDot>
            {index < steps.length - 1 && <StyledPipelineConnector />}
          </StyledPipelineRail>
          <Stack spacing={0.125} sx={{ minWidth: 0, pb: 2 }}>
            <StyledPipelineLabel>{step.label}</StyledPipelineLabel>
            <StyledPipelineState state={step.state}>{STATE_LABELS[step.state]}</StyledPipelineState>
          </Stack>
        </StyledPipelineStep>
      ))}
    </StyledPipelineRoot>
  );
}

export default IngestionPipelineSection;
