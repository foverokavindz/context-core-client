import Stack from '@mui/material/Stack';
import { AlertTriangle, Check, Loader } from 'lucide-react';
import IngestionPipelineSection from '../shared/IngestionPipeline.section';
import { SYNC_RUN_STATUS } from '../../../../types/common.types';
import type { SyncRun } from '../../../../types/dataSource.types';
import { toIngestionSteps } from '../../datasources.mappers';
import {
  StyledStatusBanner,
  StyledStatusIcon,
  StyledStatusTitle,
  StyledStatusCaption,
  StyledPipelineBox,
  StyledPipelineBoxTitle,
  type BannerTone,
} from './PipelineStatus.section.styled.component';

const STATUS_ICON_SIZE = 16;

interface PipelineStatusSectionProps {
  sourceName: string;
  submitting: boolean;
  submitError: string | null;
  run: SyncRun | null;
}

interface Banner {
  tone: BannerTone;
  icon: typeof Check;
  title: string;
  caption: string;
}

function toBanner(
  sourceName: string,
  submitting: boolean,
  submitError: string | null,
  run: SyncRun | null,
): Banner {
  if (submitError) {
    return {
      tone: 'critical',
      icon: AlertTriangle,
      title: `Could not connect ${sourceName}`,
      caption: submitError,
    };
  }

  if (submitting || !run) {
    return {
      tone: 'neutral',
      icon: Loader,
      title: `Starting ingestion for ${sourceName}`,
      caption: 'Connecting the source and queueing its first run.',
    };
  }

  if (run.status === SYNC_RUN_STATUS.Failed) {
    return {
      tone: 'critical',
      icon: AlertTriangle,
      title: `Ingestion failed for ${sourceName}`,
      caption: run.error_message ?? 'The run did not finish. Check the credentials and try again.',
    };
  }

  if (run.status === SYNC_RUN_STATUS.Completed) {
    return {
      tone: 'positive',
      icon: Check,
      title: `${sourceName} is indexed`,
      caption: `${run.resources_processed.toLocaleString()} items and ${run.chunks_created.toLocaleString()} chunks are now searchable.`,
    };
  }

  return {
    tone: 'positive',
    icon: Check,
    title: `Ingestion started for ${sourceName}`,
    caption: 'You can close this dialog and track progress from its row any time.',
  };
}

function PipelineStatusSection({ sourceName, submitting, submitError, run }: PipelineStatusSectionProps) {
  const banner = toBanner(sourceName, submitting, submitError, run);
  const BannerIcon = banner.icon;

  return (
    <Stack spacing={2} sx={{ minWidth: 0 }}>
      <StyledStatusBanner direction="row" spacing={1.5} tone={banner.tone}>
        <StyledStatusIcon tone={banner.tone}>
          <BannerIcon size={STATUS_ICON_SIZE} />
        </StyledStatusIcon>
        <Stack spacing={0.125} sx={{ minWidth: 0 }}>
          <StyledStatusTitle>{banner.title}</StyledStatusTitle>
          <StyledStatusCaption>{banner.caption}</StyledStatusCaption>
        </Stack>
      </StyledStatusBanner>
      <StyledPipelineBox>
        <StyledPipelineBoxTitle>Ingestion Pipeline</StyledPipelineBoxTitle>
        <IngestionPipelineSection steps={toIngestionSteps({ submitting, submitError, run })} />
      </StyledPipelineBox>
    </Stack>
  );
}

export default PipelineStatusSection;
