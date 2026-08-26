import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { Plus } from 'lucide-react';
import type { ChatConversationSummary } from '../../chat.types';
import {
  StyledHistoryListRoot,
  StyledNewChatButton,
  StyledSectionLabel,
  StyledConversationItemButton,
  StyledEmptyHistoryText,
  StyledHistoryStatusBox,
  StyledHistoryErrorText,
} from './HistoryList.section.styled.component';

const ICON_SIZE = 15;
const SPINNER_SIZE = 20;

interface HistoryListSectionProps {
  conversations: ChatConversationSummary[];
  activeConv: string | null;
  loading: boolean;
  error: string | null;
  creating: boolean;
  onSelect: (id: string) => void;
  onNewChat: () => void;
}

function HistoryListSection({ conversations, activeConv, loading, error, creating, onSelect, onNewChat }: HistoryListSectionProps) {
  function renderConversations() {
    if (loading) {
      return (
        <StyledHistoryStatusBox>
          <CircularProgress size={SPINNER_SIZE} />
        </StyledHistoryStatusBox>
      );
    }

    if (error) {
      return <StyledHistoryErrorText>{error}</StyledHistoryErrorText>;
    }

    if (conversations.length === 0) {
      return <StyledEmptyHistoryText>Chats you start will be listed here.</StyledEmptyHistoryText>;
    }

    return (
      <Box>
        <StyledSectionLabel>Recent</StyledSectionLabel>
        <Stack sx={{ gap: '2px' }}>
          {conversations.map((conversation) => (
            <StyledConversationItemButton
              key={conversation.id}
              onClick={() => onSelect(conversation.id)}
              active={conversation.id === activeConv}
            >
              {conversation.title}
            </StyledConversationItemButton>
          ))}
        </Stack>
      </Box>
    );
  }

  return (
    <StyledHistoryListRoot>
      <Box sx={{ height: 36, display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: 'text.primary' }}>Chat History</Typography>
      </Box>
      <StyledNewChatButton
        onClick={onNewChat}
        disabled={creating}
        startIcon={creating ? <CircularProgress size={ICON_SIZE} color="inherit" /> : <Plus size={ICON_SIZE} />}
      >
        New Chat
      </StyledNewChatButton>
      {renderConversations()}
    </StyledHistoryListRoot>
  );
}

export default HistoryListSection;
