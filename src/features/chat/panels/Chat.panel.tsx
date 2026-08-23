import { useChatContext } from '../context/Chat.context';
import NewChatScreen from '../screens/NewChat.screen';
import ChatConversationScreen from '../screens/ChatConversation.screen';
import { StyledChatPanelRoot } from './Chat.panel.styled.component';

function ChatPanel() {
	const { activeConv, conversations, activeData, startNewChat, sendMessage } = useChatContext();

	const activeTitle =
		activeConv === null
			? ''
			: activeConv === 'new'
				? 'New Chat'
				: (conversations.find((conversation) => conversation.id === activeConv)?.title ?? 'Conversation');

	return (
		<StyledChatPanelRoot>
			{activeConv === null ? (
				<NewChatScreen onStartNewChat={startNewChat} />
			) : (
				<ChatConversationScreen title={activeTitle} data={activeData} onStartNewChat={startNewChat} onSend={sendMessage} />
			)}
		</StyledChatPanelRoot>
	);
}

export default ChatPanel;
