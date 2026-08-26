import type { ResourceAccessScopeType, SourceStatusType, SourceTypeType, SyncRunStatusType } from './common.types';

export interface CreateIngestion {
	title: string;
	team_id: string;
	department_id: string;
	access_scope: ResourceAccessScopeType;
	created_by_user_id: string;
	source_type: SourceTypeType;
	config: Record<string, string>;
	token: string;
}

export interface IngestStarted {
	external_data_source_id: string;
	sync_run_id: string;
	source_type: SourceTypeType;
	title: string;
	status: string;
}

export interface SyncRun {
	id: string;
	external_data_source_id: string;
	status: SyncRunStatusType;
	started_at: string | null;
	completed_at: string | null;
	resources_processed: number;
	chunks_created: number;
	chunks_updated: number;
	chunks_deleted: number;
	error_message: string | null;
	created_at: string;
}

export interface DataSourceSummary {
	id: string;
	name: string;
	source_type: SourceTypeType;
	status: SourceStatusType;
	config: Record<string, string> | null;
	last_synced_at: string | null;
	created_at: string;
	latest_run: SyncRun | null;
	resource_count: number;
	chunk_count: number;
}

export interface DataSourceDetail extends DataSourceSummary {
	team_id: string;
	created_by_user_id: string;
	has_token: boolean;
}

export interface IndexedResource {
	id: string;
	title: string | null;
	external_id: string | null;
	resource_type: string;
	version_key: string | null;
	updated_at: string;
	chunk_count: number;
}

export interface DataSourceStats {
	total_sources: number;
	connected_sources: number;
	healthy_syncs: number;
	pending_setup: number;
	indexed_items: number;
	total_chunks: number;
}
