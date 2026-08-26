import { useChatContext } from '../context/Chat.context';
import HistoryListSection from '../sections/history/HistoryList.section';
import { StyledHistoryAside } from './History.panel.styled.component';

function HistoryPanel() {
  const { historyCollapsed, historyLoading, historyError, conversations, activeConv, creatingSession, selectConversation, startNewChat } =
    useChatContext();

  return (
    <StyledHistoryAside component="aside" collapsed={historyCollapsed}>
      {!historyCollapsed && (
        <HistoryListSection
          conversations={conversations}
          activeConv={activeConv}
          loading={historyLoading}
          error={historyError}
          creating={creatingSession}
          onSelect={selectConversation}
          onNewChat={startNewChat}
        />
      )}
    </StyledHistoryAside>
  );
}

export default HistoryPanel;
