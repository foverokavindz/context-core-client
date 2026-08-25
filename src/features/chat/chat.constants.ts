import { File, Flag, GitBranch, Layers, MessageCircle, type LucideIcon } from 'lucide-react';
import { CHAT_SOURCE, type ChatSourceType } from '../../types/common.types';

export const SOURCE_ICONS: Record<ChatSourceType, LucideIcon> = {
	[CHAT_SOURCE.GitHub]: GitBranch,
	[CHAT_SOURCE.Jira]: Flag,
	[CHAT_SOURCE.Confluence]: Layers,
	[CHAT_SOURCE.Slack]: MessageCircle,
};

export const SOURCE_LABELS: Record<ChatSourceType, string> = {
	[CHAT_SOURCE.GitHub]: 'GitHub',
	[CHAT_SOURCE.Jira]: 'Jira',
	[CHAT_SOURCE.Confluence]: 'Confluence',
	[CHAT_SOURCE.Slack]: 'Slack',
};

export const FALLBACK_SOURCE_ICON = File;

export function getSourceIcon(source: ChatSourceType): LucideIcon {
	return SOURCE_ICONS[source] ?? FALLBACK_SOURCE_ICON;
}

export function getSourceLabel(source: ChatSourceType): string {
	return SOURCE_LABELS[source] ?? source;
}

export const THINKING_MESSAGES = [
	'Searching your knowledge sources…',
	'Digging through your connected sources…',
	'Reading the most relevant passages…',
	'Connecting the dots across sources…',
	'Cross-checking what your docs say…',
	'Working through the retrieval plan…',
	'Piecing an answer together…',
];
