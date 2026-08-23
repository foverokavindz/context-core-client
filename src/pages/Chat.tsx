import { Clock } from 'lucide-react';
import ChatPanel from '../features/chat/panels/Chat.panel';
import HistoryPanel from '../features/chat/panels/History.panel';
import { ChatProvider, useChatContext } from '../features/chat/context/Chat.context';
import { StyledChatPageRoot, StyledHistoryToggleButton } from './Chat.styled.component';

function ChatLayout() {
  const { historyCollapsed, toggleHistoryCollapsed } = useChatContext();

  return (
    <StyledChatPageRoot>
      <StyledHistoryToggleButton
        aria-label={historyCollapsed ? 'Show chat history' : 'Hide chat history'}
        onClick={toggleHistoryCollapsed}
        historyCollapsed={historyCollapsed}
      >
        <Clock size={16} />
      </StyledHistoryToggleButton>
      <ChatPanel />
      <HistoryPanel />
    </StyledChatPageRoot>
  );
}

function Chat() {
  return (
    <ChatProvider>
      <ChatLayout />
    </ChatProvider>
  );
}

export default Chat;
