import type { ScopeItem, SyncFrequency } from './datasources.types';

export const SOURCE_SCOPE: ScopeItem[] = [
	{ name: 'context-core-api', selected: true },
	{ name: 'retrieval-engine', selected: true },
	{ name: 'frontend', selected: false },
];

export const SYNC_FREQUENCIES: SyncFrequency[] = ['hourly', 'daily', 'weekly'];

export const SYNC_FREQUENCY_LABELS: Record<SyncFrequency, string> = {
	hourly: 'Hourly',
	daily: 'Daily',
	weekly: 'Weekly',
};

export const WIZARD_SUBTITLES: Record<number, string> = {
	1: 'Pick the system you want to bring into your context engine.',
	2: 'Grant read access and choose what gets indexed.',
	3: 'Ingestion has started — first results appear within minutes.',
};
