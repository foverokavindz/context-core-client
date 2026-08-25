import TitleBarSection from '../sections/chat/TitleBar.section';
import ConversationSection from '../sections/chat/Conversation.section';
import UserQuerySection from '../sections/chat/UserQuery.section';
import type { ChatTurn } from '../chat.types';
import { StyledChatConversationRoot } from './ChatConversation.screen.styled.component';

interface ChatConversationScreenProps {
	title: string;
	turns: ChatTurn[];
	sending: boolean;
	creatingSession: boolean;
	onStartNewChat: () => void;
	onSend: (question: string) => void;
}

function ChatConversationScreen({ title, turns, sending, creatingSession, onStartNewChat, onSend }: ChatConversationScreenProps) {
	return (
		<StyledChatConversationRoot>
			<TitleBarSection title={title} onStartNewChat={onStartNewChat} creating={creatingSession} />
			<ConversationSection turns={turns} />
			<UserQuerySection onSend={onSend} sending={sending} />
		</StyledChatConversationRoot>
	);
}

export default ChatConversationScreen;
