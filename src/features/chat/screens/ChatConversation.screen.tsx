import TitleBarSection from '../sections/chat/TitleBar.section';
import ConversationSection from '../sections/chat/Conversation.section';
import UserQuerySection from '../sections/chat/UserQuery.section';
import { CHAT_TRACE_STEPS } from '../chat.mock';
import type { ChatConversationData } from '../chat.types';
import { StyledChatConversationRoot } from './ChatConversation.screen.styled.component';

interface ChatConversationScreenProps {
	title: string;
	data: ChatConversationData | null;
	onStartNewChat: () => void;
	onSend: (question: string) => void;
}

function ChatConversationScreen({ title, data, onStartNewChat, onSend }: ChatConversationScreenProps) {
	return (
		<StyledChatConversationRoot>
			<TitleBarSection title={title} onStartNewChat={onStartNewChat} />
			<ConversationSection data={data} traceSteps={CHAT_TRACE_STEPS} />
			<UserQuerySection onSend={onSend} />
		</StyledChatConversationRoot>
	);
}

export default ChatConversationScreen;
