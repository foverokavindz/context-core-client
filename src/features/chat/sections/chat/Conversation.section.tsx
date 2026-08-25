import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import MessageTurnSection from './MessageTurn.section';
import type { ChatTurn } from '../../chat.types';
import { StyledConversationRoot, StyledEmptyStateStack, StyledEmptyStateTitle, StyledEmptyStateBody } from './Conversation.section.styled.component';

interface ConversationSectionProps {
  turns: ChatTurn[];
}

function ConversationSection({ turns }: ConversationSectionProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [turns.length]);

  return (
    <StyledConversationRoot>
      {turns.length === 0 ? (
        <StyledEmptyStateStack>
          <StyledEmptyStateTitle>Ask your first question</StyledEmptyStateTitle>
          <StyledEmptyStateBody>
            Try asking about a service, a ticket, a policy, or anything indexed from your connected sources.
          </StyledEmptyStateBody>
        </StyledEmptyStateStack>
      ) : (
        turns.map((turn) => <MessageTurnSection key={turn.id} turn={turn} />)
      )}
      <Box ref={bottomRef} />
    </StyledConversationRoot>
  );
}

export default ConversationSection;
