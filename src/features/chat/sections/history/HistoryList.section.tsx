import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus } from 'lucide-react';
import type { ChatConversationSummary, ChatDay } from '../../chat.types';
import {
  StyledHistoryListRoot,
  StyledNewChatButton,
  StyledDayLabel,
  StyledConversationItemButton,
} from './HistoryList.section.styled.component';

interface HistoryListSectionProps {
  conversations: ChatConversationSummary[];
  activeConv: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
}

const DAY_ORDER: ChatDay[] = ['today', 'yesterday'];
const DAY_LABELS: Record<ChatDay, string> = { today: 'Today', yesterday: 'Yesterday' };

function HistoryListSection({ conversations, activeConv, onSelect, onNewChat }: HistoryListSectionProps) {
  return (
    <StyledHistoryListRoot>
      <Box sx={{ height: 36, display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: 'text.primary' }}>Chat History</Typography>
      </Box>
      <StyledNewChatButton onClick={onNewChat} startIcon={<Plus size={15} />}>
        New Chat
      </StyledNewChatButton>
      {DAY_ORDER.map((day) => {
        const items = conversations.filter((conversation) => conversation.day === day);
        if (items.length === 0) return null;
        return (
          <Box key={day}>
            <StyledDayLabel>{DAY_LABELS[day]}</StyledDayLabel>
            <Stack sx={{ gap: '2px' }}>
              {items.map((conversation) => {
                const active = conversation.id === activeConv;
                return (
                  <StyledConversationItemButton key={conversation.id} onClick={() => onSelect(conversation.id)} active={active}>
                    {conversation.title}
                  </StyledConversationItemButton>
                );
              })}
            </Stack>
          </Box>
        );
      })}
    </StyledHistoryListRoot>
  );
}

export default HistoryListSection;
