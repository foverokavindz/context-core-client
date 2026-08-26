import { FALLBACK_SOURCE_ICON, getSourceConfig, getSourceTarget } from '../../configs/datasource.configs';
import { SYNC_RUN_STATUS, type SyncRunStatusType } from '../../types/common.types';
import type { DataSourceDetail, DataSourceSummary, IndexedResource, SyncRun } from '../../types/dataSource.types';
import type { DataSource, DataSourceStatus, DataStat, IndexedItem, IngestionStep, IngestionStepState, RunStatus, SourceRun } from './datasources.types';

const EM_DASH = '—';

const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

const SECOND_MS = 1000;
const SECONDS_PER_MINUTE = 60;

const STEP_LABELS = ['Pending', 'Started', 'Running', 'Completed'] as const;

const RUN_STATUS_BY_WIRE: Record<SyncRunStatusType, RunStatus> = {
	[SYNC_RUN_STATUS.Pending]: 'pending',
	[SYNC_RUN_STATUS.Running]: 'running',
	[SYNC_RUN_STATUS.Completed]: 'completed',
	[SYNC_RUN_STATUS.Failed]: 'failed',
};

export function relativeTime(iso: string | null): string {
	if (!iso) return 'Never';

	const elapsed = Date.now() - new Date(iso).getTime();
	if (Number.isNaN(elapsed)) return 'Never';
	if (elapsed < MINUTE_MS) return 'Just now';
	if (elapsed < HOUR_MS) return `${Math.floor(elapsed / MINUTE_MS)} min ago`;
	if (elapsed < DAY_MS) return `${Math.floor(elapsed / HOUR_MS)} h ago`;
	return `${Math.floor(elapsed / DAY_MS)} d ago`;
}

export function formatDateTime(iso: string | null): string {
	if (!iso) return EM_DASH;
	const date = new Date(iso);
	return Number.isNaN(date.getTime()) ? EM_DASH : date.toLocaleString();
}

export function formatDuration(startedAt: string | null, completedAt: string | null): string {
	if (!startedAt || !completedAt) return EM_DASH;

	const elapsed = new Date(completedAt).getTime() - new Date(startedAt).getTime();
	if (Number.isNaN(elapsed) || elapsed < 0) return EM_DASH;

	const totalSeconds = Math.round(elapsed / SECOND_MS);
	const minutes = Math.floor(totalSeconds / SECONDS_PER_MINUTE);
	const seconds = totalSeconds % SECONDS_PER_MINUTE;
	return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

export function toDataSourceStatus(summary: DataSourceSummary): DataSourceStatus {
	const runStatus = summary.latest_run?.status;

	if (runStatus === SYNC_RUN_STATUS.Pending || runStatus === SYNC_RUN_STATUS.Running) return 'syncing';
	if (summary.status === 'ERROR' || runStatus === SYNC_RUN_STATUS.Failed) return 'failed';
	if (!summary.latest_run) return 'needs-setup';
	return 'connected';
}

export function toDataSourceRow(summary: DataSourceSummary): DataSource {
	const entry = getSourceConfig(summary.source_type);
	const target = getSourceTarget(summary.source_type, summary.config);

	return {
		key: summary.id,
		name: summary.name,
		sourceType: summary.source_type,
		icon: entry?.icon ?? FALLBACK_SOURCE_ICON,
		type: entry?.typeLabel ?? summary.source_type,
		status: toDataSourceStatus(summary),
		syncLabel: relativeTime(summary.last_synced_at),
		dataIndexed: `${summary.resource_count.toLocaleString()} items`,
		dataSecondary: target ?? `${summary.chunk_count.toLocaleString()} chunks`,
	};
}

interface IngestionProgress {
	submitting: boolean;
	submitError: string | null;
	run: SyncRun | null;
}

export function toIngestionSteps({ submitting, submitError, run }: IngestionProgress): IngestionStep[] {
	const states: IngestionStepState[] = ['queued', 'queued', 'queued', 'queued'];
	let detail: string | null = null;

	if (submitError) {
		states[0] = 'failed';
		detail = submitError;
	} else if (submitting || !run) {
		states[0] = 'running';
	} else {
		states[0] = 'completed';

		if (run.status === SYNC_RUN_STATUS.Pending) {
			states[1] = 'running';
		} else if (run.status === SYNC_RUN_STATUS.Running) {
			states[1] = 'completed';
			states[2] = 'running';
		} else if (run.status === SYNC_RUN_STATUS.Completed) {
			states[1] = 'completed';
			states[2] = 'completed';
			states[3] = 'completed';
		} else {
			states[1] = 'completed';
			states[2] = 'failed';
			detail = run.error_message;
		}
	}

	return STEP_LABELS.map((label, index) => ({
		label,
		state: states[index],
		detail: states[index] === 'failed' ? detail : null,
	}));
}

export function toSourceRuns(runs: SyncRun[]): SourceRun[] {
	return runs.map((run) => ({
		id: run.id,
		started: formatDateTime(run.started_at ?? run.created_at),
		items: run.resources_processed > 0 ? run.resources_processed.toLocaleString() : EM_DASH,
		duration: formatDuration(run.started_at, run.completed_at),
		status: RUN_STATUS_BY_WIRE[run.status],
	}));
}

export function toIndexedItems(resources: IndexedResource[]): IndexedItem[] {
	return resources.map((resource) => ({
		id: resource.id,
		name: resource.title ?? resource.external_id ?? 'Untitled',
		meta: `Updated ${relativeTime(resource.updated_at)}`,
		chunks: resource.chunk_count.toLocaleString(),
	}));
}

export function toDataStats(detail: DataSourceDetail | null): DataStat[] {
	return [
		{ label: 'Indexed items', value: detail ? detail.resource_count.toLocaleString() : EM_DASH },
		{ label: 'Chunks', value: detail ? detail.chunk_count.toLocaleString() : EM_DASH },
		{ label: 'Last run', value: detail ? relativeTime(detail.last_synced_at) : EM_DASH },
	];
}
