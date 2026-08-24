import {
	Activity,
	Briefcase,
	Check,
	Clock,
	Cloud,
	Code,
	Database,
	File,
	FileText,
	Flag,
	GitBranch,
	MessageCircle,
	PenTool,
	Server,
} from 'lucide-react';
import type {
	CatalogApp,
	DataSource,
	DataStat,
	IndexedItem,
	IngestionStep,
	ScopeItem,
	SourceRun,
	SourceStat,
	SyncFrequency,
} from './datasources.types';

export const DATA_SOURCES: DataSource[] = [
	{
		key: 'github',
		name: 'GitHub',
		icon: GitBranch,
		type: 'Code Repository',
		status: 'connected',
		syncLabel: '2 min ago',
		dataIndexed: '2,420 items',
		dataSecondary: '3 repositories',
	},
	{
		key: 'jira',
		name: 'Jira',
		icon: Flag,
		type: 'Ticketing',
		status: 'connected',
		syncLabel: '5 min ago',
		dataIndexed: '640 items',
		dataSecondary: '12 projects',
	},
	{
		key: 'docs',
		name: 'Docs',
		icon: FileText,
		type: 'Documentation',
		status: 'connected',
		syncLabel: '3 min ago',
		dataIndexed: '310 items',
		dataSecondary: '24 spaces',
	},
	{
		// lucide-react has no Slack glyph; chat.mock.ts already stands in
		// MessageCircle for Slack, so this matches that choice.
		key: 'slack',
		name: 'Slack',
		icon: MessageCircle,
		type: 'Communication',
		status: 'needs-setup',
		syncLabel: 'OAuth required',
		dataIndexed: '—',
		dataSecondary: 'Not yet synced',
	},
	{
		key: 'hr',
		name: 'HR Documents',
		icon: Briefcase,
		type: 'HR',
		status: 'connected',
		syncLabel: '12 min ago',
		dataIndexed: '247 items',
		dataSecondary: '12 categories',
	},
];

export const SOURCE_CATALOG: CatalogApp[] = [
	{ key: 'notion', name: 'Notion', icon: File, description: 'Team notes and wikis' },
	{ key: 'figma', name: 'Figma', icon: PenTool, description: 'Design files and specs' },
	{ key: 'servicenow', name: 'ServiceNow', icon: Server, description: 'ITSM tickets and changes' },
	{ key: 'drive', name: 'Google Drive', icon: Cloud, description: 'Shared docs, sheets and decks' },
	{ key: 'linear', name: 'Linear', icon: Activity, description: 'Issues, cycles and project plans' },
	{ key: 'gitlab', name: 'GitLab', icon: Code, description: 'Repositories and merge requests' },
];

const RECOMMENDED_COUNT = 3;

export const RECOMMENDED_SOURCES: CatalogApp[] = SOURCE_CATALOG.slice(0, RECOMMENDED_COUNT);

// One constant per stat widget: each tile fetches its own figure once the
// stats endpoints land, so they don't share a single array.
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

export const INGESTION_STEPS: IngestionStep[] = [
	{ label: 'Retrieve Data', state: 'completed' },
	{ label: 'Process Data', state: 'completed' },
	{ label: 'Index Knowledge', state: 'running' },
	{ label: 'Verify Access', state: 'queued' },
];

export const SOURCE_RUNS: SourceRun[] = [
	{ started: 'Today, 09:42', items: '342', duration: '2m 14s', status: 'completed' },
	{ started: 'Today, 03:10', items: '128', duration: '1m 02s', status: 'completed' },
	{ started: 'Yesterday, 21:55', items: '—', duration: '—', status: 'failed' },
];

export const SOURCE_DATA_STATS: DataStat[] = [
	{ label: 'Indexed items', value: '2,420' },
	{ label: 'Chunks', value: '18,940' },
	{ label: 'Coverage', value: '98%' },
];

export const INDEXED_ITEMS: IndexedItem[] = [
	{ name: 'context-core-api / README.md', meta: 'Updated 2 hours ago', chunks: '24' },
	{ name: 'context-core-api / auth-service', meta: 'Updated 3 hours ago', chunks: '186' },
	{ name: 'retrieval-engine / docs', meta: 'Updated yesterday', chunks: '92' },
	{ name: 'retrieval-engine / pipelines', meta: 'Updated 2 days ago', chunks: '140' },
];

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
