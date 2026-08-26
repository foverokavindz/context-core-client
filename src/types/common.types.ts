export const CHAT_SOURCE = {
	GitHub: 'GITHUB',
	Jira: 'JIRA',
	Confluence: 'CONFLUENCE',
	Slack: 'SLACK',
} as const;

export type ChatSourceType = (typeof CHAT_SOURCE)[keyof typeof CHAT_SOURCE];

export const CHAT_ANSWER_STATUS = {
	Answered: 'ANSWERED',
} as const;

export type ChatAnswerStatusType = (typeof CHAT_ANSWER_STATUS)[keyof typeof CHAT_ANSWER_STATUS];

export const MESSAGE_ROLE = {
	User: 'USER',
	Assistant: 'ASSISTANT',
} as const;

export type MessageRoleType = (typeof MESSAGE_ROLE)[keyof typeof MESSAGE_ROLE];

export const SOURCE_TYPE = {
	GitHub: 'GITHUB',
	Jira: 'JIRA',
	Confluence: 'CONFLUENCE',
	Slack: 'SLACK',
} as const;

export type SourceTypeType = (typeof SOURCE_TYPE)[keyof typeof SOURCE_TYPE];

export const SOURCE_STATUS = {
	Active: 'ACTIVE',
	Inactive: 'INACTIVE',
	Error: 'ERROR',
} as const;

export type SourceStatusType = (typeof SOURCE_STATUS)[keyof typeof SOURCE_STATUS];

export const SYNC_RUN_STATUS = {
	Pending: 'PENDING',
	Running: 'RUNNING',
	Completed: 'COMPLETED',
	Failed: 'FAILED',
} as const;

export type SyncRunStatusType = (typeof SYNC_RUN_STATUS)[keyof typeof SYNC_RUN_STATUS];

export const RESOURCE_ACCESS_SCOPE = {
	Team: 'TEAM',
	Department: 'DEPARTMENT',
	Organization: 'ORGANIZATION',
} as const;

export type ResourceAccessScopeType = (typeof RESOURCE_ACCESS_SCOPE)[keyof typeof RESOURCE_ACCESS_SCOPE];

export const PIPELINE_STARTED = 'PIPELINE_STARTED';
