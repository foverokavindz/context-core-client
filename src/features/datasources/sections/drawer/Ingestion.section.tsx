import Stack from '@mui/material/Stack';
import AppCard from '../../../../components/AppCard';
import IngestionPipelineSection from '../shared/IngestionPipeline.section';
import type { IngestionStep, SourceRun } from '../../datasources.types';
import {
	StyledRunRow,
	StyledRunStarted,
	StyledRunMeta,
	StyledRunStatusPill,
} from './Ingestion.section.styled.component';

const RUN_STATUS_LABELS: Record<SourceRun['status'], string> = {
	completed: 'Completed',
	failed: 'Failed',
};

interface IngestionSectionProps {
	steps: IngestionStep[];
	runs: SourceRun[];
}

/** Drawer tab 1 - the current run's pipeline plus the run history behind it. */
function IngestionSection({ steps, runs }: IngestionSectionProps) {
	return (
		<Stack spacing={2.25} sx={{ minWidth: 0 }}>
			<AppCard title="Current Run">
				<IngestionPipelineSection steps={steps} />
			</AppCard>
			<AppCard title="Previous Runs">
				<Stack sx={{ minWidth: 0 }}>
					{runs.map((run, index) => (
						<StyledRunRow
							key={run.started}
							direction="row"
							spacing={1.25}
							divided={index < runs.length - 1}
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
