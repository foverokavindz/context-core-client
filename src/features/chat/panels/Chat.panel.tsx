import { useChatContext } from '../context/Chat.context';
import NewChatScreen from '../screens/NewChat.screen';
import ChatConversationScreen from '../screens/ChatConversation.screen';
import { NEW_CHAT_TITLE } from '../../../configs/chat.configs';
import { StyledChatPanelRoot } from './Chat.panel.styled.component';

function ChatPanel() {
  const { activeConv, conversations, turns, sending, creatingSession, sessionError, startNewChat, sendMessage } = useChatContext();

  const activeTitle =
    activeConv === null ? '' : (conversations.find((conversation) => conversation.id === activeConv)?.title ?? NEW_CHAT_TITLE);

  return (
    <StyledChatPanelRoot>
      {activeConv === null ? (
        <NewChatScreen onStartNewChat={startNewChat} creating={creatingSession} error={sessionError} />
      ) : (
        <ChatConversationScreen
          title={activeTitle}
          turns={turns}
          sending={sending}
          creatingSession={creatingSession}
          onStartNewChat={startNewChat}
          onSend={sendMessage}
        />
      )}
    </StyledChatPanelRoot>
  );
}

export default ChatPanel;
