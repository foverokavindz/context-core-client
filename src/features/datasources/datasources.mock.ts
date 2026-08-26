import { Check, Clock, Database, FileText } from 'lucide-react';
import type { ScopeItem, SourceStat, SyncFrequency } from './datasources.types';

export const CONNECTED_SOURCES_STAT: SourceStat = {
	label: 'Connected Sources',
	value: '4',
	caption: 'of 5 total',
	icon: Database,
};

export const HEALTHY_SYNCS_STAT: SourceStat = {
	label: 'Healthy Syncs',
	value: '4',
	caption: '80% of sources',
	icon: Check,
};

export const PENDING_SETUP_STAT: SourceStat = {
	label: 'Pending Setup',
	value: '1',
	caption: 'Needs attention',
	icon: Clock,
};

export const INDEXED_ITEMS_STAT: SourceStat = {
	label: 'Indexed Items',
	value: '128,450',
	caption: '+3,842 vs last 7d',
	icon: FileText,
};

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
