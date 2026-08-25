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
