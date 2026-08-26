import { Database, Flag, GitBranch, Layers, MessageCircle, type LucideIcon } from 'lucide-react';
import { SOURCE_TYPE, type SourceTypeType } from '../types/common.types';

export const SYNC_POLL_INTERVAL_MS = 5000;

export const RUN_HISTORY_LIMIT = 20;

export interface SourceFieldConfig {
	key: string;
	label: string;
	placeholder: string;
	required: boolean;
	secret?: boolean;
}

export interface SourceCatalogEntry {
	sourceType: SourceTypeType;
	slug: string;
	name: string;
	description: string;
	typeLabel: string;
	icon: LucideIcon;
	titlePlaceholder: string;
	fields: SourceFieldConfig[];
	tokenField: SourceFieldConfig;
}

export const SOURCE_CATALOG: SourceCatalogEntry[] = [
	{
		sourceType: SOURCE_TYPE.GitHub,
		slug: 'github',
		name: 'GitHub',
		description: 'Repositories, source files and READMEs',
		typeLabel: 'Code Repository',
		icon: GitBranch,
		titlePlaceholder: 'TrackIt API',
		fields: [
			{ key: 'repository', label: 'Repository', placeholder: 'Asteron-Labs/TrackIt', required: true },
			{ key: 'branch', label: 'Branch', placeholder: 'Defaults to the repository default', required: false },
		],
		tokenField: { key: 'token', label: 'Personal Access Token', placeholder: 'ghp_…', required: true, secret: true },
	},
	{
		sourceType: SOURCE_TYPE.Jira,
		slug: 'jira',
		name: 'Jira',
		description: 'Issues, epics and sprint work',
		typeLabel: 'Ticketing',
		icon: Flag,
		titlePlaceholder: 'TrackIt Jira',
		fields: [
			{ key: 'site_url', label: 'Site URL', placeholder: 'https://your-org.atlassian.net', required: true },
			{ key: 'email', label: 'Account Email', placeholder: 'you@your-org.com', required: true },
			{ key: 'project_key', label: 'Project Key', placeholder: 'TRACKIT', required: true },
		],
		tokenField: { key: 'token', label: 'API Token', placeholder: 'Atlassian API token', required: true, secret: true },
	},
	{
		sourceType: SOURCE_TYPE.Confluence,
		slug: 'confluence',
		name: 'Confluence',
		description: 'Spaces, pages and documentation',
		typeLabel: 'Documentation',
		icon: Layers,
		titlePlaceholder: 'TrackIt Confluence',
		fields: [
			{ key: 'site_url', label: 'Site URL', placeholder: 'https://your-org.atlassian.net', required: true },
			{ key: 'email', label: 'Account Email', placeholder: 'you@your-org.com', required: true },
			{ key: 'space_key', label: 'Space Key', placeholder: 'TR', required: true },
		],
		tokenField: { key: 'token', label: 'API Token', placeholder: 'Atlassian API token', required: true, secret: true },
	},
	{
		sourceType: SOURCE_TYPE.Slack,
		slug: 'slack',
		name: 'Slack',
		description: 'Channel conversations and threads',
		typeLabel: 'Communication',
		icon: MessageCircle,
		titlePlaceholder: 'TrackIt Slack',
		fields: [{ key: 'channel_id', label: 'Channel ID', placeholder: 'C0BPCFHQYSU', required: true }],
		tokenField: { key: 'token', label: 'Bot Token', placeholder: 'xoxb-…', required: true, secret: true },
	},
];

export const FALLBACK_SOURCE_ICON: LucideIcon = Database;

export function getSourceConfig(sourceType: SourceTypeType): SourceCatalogEntry | null {
	return SOURCE_CATALOG.find((entry) => entry.sourceType === sourceType) ?? null;
}

export function getSourceTarget(sourceType: SourceTypeType, config: Record<string, string> | null): string | null {
	const entry = getSourceConfig(sourceType);
	if (!entry || !config) return null;

	const primaryField = entry.fields.find((field) => field.required);
	if (!primaryField) return null;

	return config[primaryField.key] ?? null;
}
