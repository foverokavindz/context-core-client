import { GitBranch, Flag, Layers, MessageCircle, Briefcase } from 'lucide-react';
import type { ChatConversationData, ChatConversationSummary, ChatTraceStep } from './chat.types';

export const CHAT_CONVERSATIONS: Record<string, ChatConversationData> = {
	auth: {
		question: 'What services are affected by the authentication changes in AUTH-102?',
		answer:
			'The AUTH-102 changes update the token-issuance flow in auth-service, which is a direct dependency for three downstream services: api-gateway (validates incoming JWTs on every request), notification-service (subscribes to session-expired events), and the web client\'s session refresh logic. Session lifetime is also shortened from 24h to 4h, so any service caching long-lived tokens should be reviewed. No database migrations are required, but a coordinated deploy with api-gateway is recommended to avoid a validation mismatch window.',
		citations: [
			{ source: 'GitHub', icon: GitBranch, label: 'auth-service' },
			{ source: 'Jira', icon: Flag, label: 'AUTH-102' },
			{ source: 'Confluence', icon: Layers, label: 'Authentication Architecture' },
			{ source: 'Slack', icon: MessageCircle, label: '#backend-team' },
		],
	},
	'jira-dep': {
		question: 'Which other tickets depend on AUTH-102 landing first?',
		answer:
			'Three open tickets are blocked on AUTH-102: AUTH-108 (rotate refresh-token signing keys), GW-214 (api-gateway JWT validation update), and NOTIF-56 (session-expired push notifications). All three reference the shortened 4h session lifetime introduced in AUTH-102 as a precondition.',
		citations: [
			{ source: 'Jira', icon: Flag, label: 'AUTH-108' },
			{ source: 'Jira', icon: Flag, label: 'GW-214' },
			{ source: 'Jira', icon: Flag, label: 'NOTIF-56' },
		],
	},
	'proj-arch': {
		question: 'Give me an overview of the retrieval-engine service architecture.',
		answer:
			'retrieval-engine ingests content from connected sources, chunks and embeds it, and stores vectors alongside metadata for permission-aware filtering. Queries hit a hybrid search layer (BM25 + vector) before results are reranked and passed to the answer-generation step. It exposes a gRPC API consumed by both the Chat UI and the MCP endpoint used by external agents.',
		citations: [
			{ source: 'Confluence', icon: Layers, label: 'Retrieval Engine Architecture' },
			{ source: 'GitHub', icon: GitBranch, label: 'retrieval-engine' },
		],
	},
	leave: {
		question: 'How many annual leave days do engineering employees get?',
		answer:
			'Engineering employees accrue 18 days of annual leave per year, plus 5 sick days, per the current HR handbook. Unused annual leave carries over up to 5 days into the next calendar year; anything beyond that is forfeited unless approved by a manager.',
		citations: [
			{ source: 'HR Documents', icon: Briefcase, label: 'Annual Leave Policy' },
			{ source: 'HR Documents', icon: Briefcase, label: 'Employee Handbook' },
		],
	},
};

export const CHAT_CONVERSATION_SUMMARIES: ChatConversationSummary[] = [
	{ id: 'auth', title: 'Authentication architecture', day: 'today' },
	{ id: 'jira-dep', title: 'Jira ticket dependencies', day: 'today' },
	{ id: 'proj-arch', title: 'Project architecture', day: 'yesterday' },
	{ id: 'leave', title: 'Leave policy question', day: 'yesterday' },
];

export const CHAT_TRACE_STEPS: ChatTraceStep[] = [
	{ label: 'Query analyzed' },
	{ label: 'GitHub searched' },
	{ label: 'Jira searched' },
	{ label: 'Confluence searched' },
	{ label: 'Relevant context retrieved' },
	{ label: 'Answer generated' },
];

export const CHAT_USER_NAME = 'Kavinda';

// Standing in for a real answer-generation backend: every freshly asked
// question gets this representative canned response, with the user's own
// text as the displayed question.
export function buildMockAnswer(question: string): ChatConversationData {
	return { ...CHAT_CONVERSATIONS.auth, question };
}
