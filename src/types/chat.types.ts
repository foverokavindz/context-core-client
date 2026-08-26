import type { ChatSourceType, MessageRoleType } from './common.types';

export interface ChatSession {
	chat_session_id: string;
}

// POST /v1/chats body
export interface CreateChatSession {
	user_id: string;
	title: string;
}

export interface ChatLlmConfig {
	model: string;
	temperature: number;
}

// POST /v1/chats/{chat_session_id}/query body
export interface CreateChatQuery {
	query: string;
	user_id: string;
	team_id: string;
	department_id: string;
	llm_config: ChatLlmConfig;
}

// One retrieved chunk backing the answer
export interface ChatSource {
	chunk_id: string;
	source: ChatSourceType;
	resource_type: string;
	resource_title: string | null;
	external_id: string;
	score: number;
	snippet: string;
}

export interface ChatRetrievalStep {
	step_id: string;
	source: ChatSourceType;
	goal: string;
	executed_query: string;
	result_count: number;
}

export interface ChatRetrieval {
	resolved_query: string;
	intent: string;
	retrieval_required: boolean;
	plan_goal: string;
	steps: ChatRetrievalStep[];
}

export interface ChatAnswer {
	chat_session_id: string;
	message_id: string;
	answer_message_id: string;
	// Compare against CHAT_ANSWER_STATUS.Answered; anything else is a warning.
	status: string;
	answer: string;
	sources: ChatSource[];
	retrieval: ChatRetrieval | null;
}

export interface ChatHistoryMessage {
	message_id: string;
	role: MessageRoleType;
	content: string;
	created_at: string;
	updated_at: string;
}

export interface ChatHistorySession {
	chat_session_id: string;
	title: string | null;
	created_at: string;
	updated_at: string;
	messages: ChatHistoryMessage[];
}
