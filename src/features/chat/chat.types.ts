import type { ChatAnswer } from '../../types/chat.types';

export type ChatTurnStatus = 'loading' | 'answered' | 'warning' | 'error';

export interface ChatTurn {
	id: string;
	question: string;
	status: ChatTurnStatus;
	answer: ChatAnswer | null;
	errorMessage: string | null;
}

export interface ChatConversationSummary {
	id: string;
	title: string;
}
