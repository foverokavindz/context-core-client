import type { ChatLlmConfig } from '../types/chat.types';

export const CHAT_LLM_CONFIG: ChatLlmConfig = {
	model: 'gpt-5-mini',
	temperature: 0.2,
};

export const NEW_CHAT_TITLE = 'New Chat';

export const CHAT_QUERY_TIMEOUT_MS = 180000;
