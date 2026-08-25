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
} from './HistoryList.section.styled.component';

const ICON_SIZE = 15;

interface HistoryListSectionProps {
  conversations: ChatConversationSummary[];
  activeConv: string | null;
  creating: boolean;
  onSelect: (id: string) => void;
  onNewChat: () => void;
}

function HistoryListSection({ conversations, activeConv, creating, onSelect, onNewChat }: HistoryListSectionProps) {
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
      {conversations.length === 0 ? (
        <StyledEmptyHistoryText>Chats you start here will be listed for the rest of this session.</StyledEmptyHistoryText>
      ) : (
        <Box>
          <StyledSectionLabel>This session</StyledSectionLabel>
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
      )}
    </StyledHistoryListRoot>
  );
}

export default HistoryListSection;
