import Stack from '@mui/material/Stack';
import { Check } from 'lucide-react';
import IngestionPipelineSection from '../shared/IngestionPipeline.section';
import type { IngestionStep } from '../../datasources.types';
import {
  StyledSuccessBanner,
  StyledSuccessIcon,
  StyledSuccessTitle,
  StyledSuccessCaption,
  StyledPipelineBox,
  StyledPipelineBoxTitle,
} from './PipelineStatus.section.styled.component';

const SUCCESS_ICON_SIZE = 16;

interface PipelineStatusSectionProps {
  sourceName: string;
  steps: IngestionStep[];
}

function PipelineStatusSection({ sourceName, steps }: PipelineStatusSectionProps) {
  return (
    <Stack spacing={2} sx={{ minWidth: 0 }}>
      <StyledSuccessBanner direction="row" spacing={1.5}>
        <StyledSuccessIcon>
          <Check size={SUCCESS_ICON_SIZE} />
        </StyledSuccessIcon>
        <Stack spacing={0.125} sx={{ minWidth: 0 }}>
          <StyledSuccessTitle>Ingestion started for {sourceName}</StyledSuccessTitle>
          <StyledSuccessCaption>
            You can close this dialog and track progress from its row any time.
          </StyledSuccessCaption>
        </Stack>
      </StyledSuccessBanner>
      <StyledPipelineBox>
        <StyledPipelineBoxTitle>Ingestion Pipeline</StyledPipelineBoxTitle>
        <IngestionPipelineSection steps={steps} />
      </StyledPipelineBox>
    </Stack>
  );
}

export default PipelineStatusSection;
