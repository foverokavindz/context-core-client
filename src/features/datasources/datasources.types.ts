import type { LucideIcon } from 'lucide-react';
import type { SourceTypeType } from '../../types/common.types';

export type DataSourceStatus = 'connected' | 'syncing' | 'needs-setup' | 'failed';

export type IngestionStepState = 'completed' | 'running' | 'queued' | 'failed';

export type RunStatus = 'pending' | 'running' | 'completed' | 'failed';

export type DrawerTab = 'ingestion' | 'configuration' | 'data';

export type SyncFrequency = 'hourly' | 'daily' | 'weekly';

export type WizardStep = 1 | 2 | 3;

export interface DataSource {
	key: string;
	name: string;
	sourceType: SourceTypeType;
	icon: LucideIcon;
	type: string;
	status: DataSourceStatus;
	syncLabel: string;
	dataIndexed: string;
	dataSecondary: string;
}

export interface SourceStat {
	label: string;
	value: string;
	caption: string;
	icon: LucideIcon;
}

export interface IngestionStep {
	label: string;
	state: IngestionStepState;
	detail?: string | null;
}

export interface SourceRun {
	id: string;
	started: string;
	items: string;
	duration: string;
	status: RunStatus;
}

export interface IndexedItem {
	id: string;
	name: string;
	meta: string;
	chunks: string;
}

export interface ScopeItem {
	name: string;
	selected: boolean;
}

export interface DataStat {
	label: string;
	value: string;
}

export interface CredentialForm {
	title: string;
	config: Record<string, string>;
	token: string;
}
