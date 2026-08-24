import type { LucideIcon } from 'lucide-react';

export type DataSourceStatus = 'connected' | 'syncing' | 'needs-setup' | 'failed';

export type IngestionStepState = 'completed' | 'running' | 'queued' | 'failed';

export type RunStatus = 'completed' | 'failed';

export type DrawerTab = 'ingestion' | 'configuration' | 'data';

export type SyncFrequency = 'hourly' | 'daily' | 'weekly';

export type WizardStep = 1 | 2 | 3;

export interface DataSource {
	key: string;
	name: string;
	icon: LucideIcon;
	type: string;
	status: DataSourceStatus;
	syncLabel: string;
	dataIndexed: string;
	dataSecondary: string;
}

export interface CatalogApp {
	key: string;
	name: string;
	icon: LucideIcon;
	description: string;
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
}

export interface SourceRun {
	started: string;
	items: string;
	duration: string;
	status: RunStatus;
}

export interface IndexedItem {
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
