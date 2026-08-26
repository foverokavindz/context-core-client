import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AppCard from '../../../../components/AppCard';
import IngestionPipelineSection from '../shared/IngestionPipeline.section';
import type { SyncRun } from '../../../../types/dataSource.types';
import { toIngestionSteps, toSourceRuns } from '../../datasources.mappers';
import type { RunStatus } from '../../datasources.types';
import {
  StyledRunRow,
  StyledRunStarted,
  StyledRunMeta,
  StyledRunStatusPill,
} from './Ingestion.section.styled.component';

const RUN_STATUS_LABELS: Record<RunStatus, string> = {
  pending: 'Queued',
  running: 'Running',
  completed: 'Completed',
  failed: 'Failed',
};

const NO_RUNS = 'This source has not run yet.';

interface IngestionSectionProps {
  runs: SyncRun[];
}

function IngestionSection({ runs }: IngestionSectionProps) {
  const [latest, ...previous] = runs;
  const steps = toIngestionSteps({ submitting: false, submitError: null, run: latest ?? null });
  const previousRuns = toSourceRuns(previous);

  return (
    <Stack spacing={2.25} sx={{ minWidth: 0 }}>
      <AppCard title="Current Run">
        {latest ? (
          <IngestionPipelineSection steps={steps} />
        ) : (
          <Typography sx={{ fontSize: 'body2.fontSize', color: 'text.secondary' }}>{NO_RUNS}</Typography>
        )}
      </AppCard>
      <AppCard title="Previous Runs">
        <Stack sx={{ minWidth: 0 }}>
          {previousRuns.length === 0 && (
            <Typography sx={{ fontSize: 'body2.fontSize', color: 'text.secondary' }}>
              No earlier runs.
            </Typography>
          )}
          {previousRuns.map((run, index) => (
            <StyledRunRow
              key={run.id}
              direction="row"
              spacing={1.25}
              divided={index < previousRuns.length - 1}
            >
              <Stack sx={{ flex: 1, minWidth: 0 }}>
                <StyledRunStarted>{run.started}</StyledRunStarted>
                <StyledRunMeta>
                  {run.items} items · {run.duration}
                </StyledRunMeta>
              </Stack>
              <StyledRunStatusPill status={run.status}>
                {RUN_STATUS_LABELS[run.status]}
              </StyledRunStatusPill>
            </StyledRunRow>
          ))}
        </Stack>
      </AppCard>
    </Stack>
  );
}

export default IngestionSection;
