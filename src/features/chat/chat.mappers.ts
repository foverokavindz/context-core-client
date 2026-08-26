import { NEW_CHAT_TITLE } from '../../configs/chat.configs';
import { CHAT_ANSWER_STATUS, MESSAGE_ROLE } from '../../types/common.types';
import type { ChatHistorySession } from '../../types/chat.types';
import type { ChatConversationSummary, ChatTurn } from './chat.types';

const TITLE_TRUNCATE_LENGTH = 48;

const NO_STORED_ANSWER = 'No answer was recorded for this question.';

export function truncateTitle(text: string): string {
	return text.length > TITLE_TRUNCATE_LENGTH ? `${text.slice(0, TITLE_TRUNCATE_LENGTH - 1)}…` : text;
}

export function toConversationSummary(session: ChatHistorySession): ChatConversationSummary {
	const storedTitle = session.title?.trim();
	if (storedTitle && storedTitle !== NEW_CHAT_TITLE) {
		return { id: session.chat_session_id, title: storedTitle };
	}

	const firstQuestion = session.messages.find((message) => message.role === MESSAGE_ROLE.User);
	return {
		id: session.chat_session_id,
		title: firstQuestion ? truncateTitle(firstQuestion.content) : NEW_CHAT_TITLE,
	};
}

export function toChatTurns(session: ChatHistorySession): ChatTurn[] {
	const turns: ChatTurn[] = [];

	for (const message of session.messages) {
		if (message.role === MESSAGE_ROLE.User) {
			turns.push({
				id: message.message_id,
				status: 'error',
				question: message.content,
				answer: null,
				errorMessage: NO_STORED_ANSWER,
			});
			continue;
		}

		const openTurn = turns[turns.length - 1];
		if (!openTurn || openTurn.answer) continue; // a reply with no question to attach to

		openTurn.status = 'answered';
		openTurn.errorMessage = null;
		openTurn.answer = {
			chat_session_id: session.chat_session_id,
			message_id: openTurn.id,
			answer_message_id: message.message_id,
			status: CHAT_ANSWER_STATUS.Answered,
			answer: message.content,
			sources: [], // history does not store the citations
			retrieval: null, // history does not store the retrieval trace
		};
	}

	return turns;
}
