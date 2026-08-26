import type { IApiClient } from '../api/IApiClient';
import { getApiClient } from '../api/AxiosClient';
import { CHAT_QUERY_TIMEOUT_MS } from '../configs/chat.configs';
import type { ApiResponse } from '../types/api.types';
import type { ChatAnswer, ChatHistorySession, ChatSession, CreateChatQuery, CreateChatSession } from '../types/chat.types';

export class ChatService {
	private api: IApiClient;

	constructor(api: IApiClient) {
		this.api = api;
	}

	public async CreateChatSession(dto: CreateChatSession): Promise<ApiResponse<ChatSession>> {
		return await this.api.post<ChatSession>(`/v1/chats`, dto);
	}

	public async GetChatHistory(userId: string): Promise<ApiResponse<ChatHistorySession[]>> {
		return await this.api.get<ChatHistorySession[]>(`/v1/users/${userId}/chats`);
	}

	public async SendChatQuery(chatSessionId: string, dto: CreateChatQuery): Promise<ApiResponse<ChatAnswer>> {
		return await this.api.post<ChatAnswer>(`/v1/chats/${chatSessionId}/query`, dto, { timeout: CHAT_QUERY_TIMEOUT_MS });
	}
}

export const chatService = new ChatService(getApiClient());
