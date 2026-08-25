import Stack from '@mui/material/Stack';
import { CircleAlert, Cpu, TriangleAlert } from 'lucide-react';
import Markdown from '../../../../components/Markdown';
import ThinkingBubbleSection from './ThinkingBubble.section';
import CitationsSection from './Citations.section';
import RetrievalTraceSection from './RetrievalTrace.section';
import { CURRENT_USER } from '../../../../configs/user.configs';
import type { ChatTurn } from '../../chat.types';
import {
  StyledUserMessageBubble,
  StyledUserAvatarBox,
  StyledAiAvatarBox,
  StyledAiMessageBubble,
} from './Conversation.section.styled.component';
import {
  StyledUserRow,
  StyledAiRow,
  StyledAiColumn,
  StyledErrorBubble,
  StyledWarningBanner,
  StyledBubbleIcon,
  StyledBubbleStatus,
} from './MessageTurn.section.styled.component';

const AVATAR_ICON_SIZE = 14;
const BUBBLE_ICON_SIZE = 16;

interface MessageTurnSectionProps {
  turn: ChatTurn;
}

function MessageTurnSection({ turn }: MessageTurnSectionProps) {
  const answer = turn.answer;

  return (
    <>
      <StyledUserRow direction="row" spacing={1.25}>
        <StyledUserMessageBubble>{turn.question}</StyledUserMessageBubble>
        <StyledUserAvatarBox>{CURRENT_USER.displayName.charAt(0)}</StyledUserAvatarBox>
      </StyledUserRow>

      <StyledAiRow direction="row" spacing={1.25}>
        <StyledAiAvatarBox>
          <Cpu size={AVATAR_ICON_SIZE} />
        </StyledAiAvatarBox>
        <StyledAiColumn>
          {turn.status === 'loading' && <ThinkingBubbleSection />}

          {turn.status === 'error' && (
            <StyledErrorBubble>
              <StyledBubbleIcon>
                <CircleAlert size={BUBBLE_ICON_SIZE} />
              </StyledBubbleIcon>
              <Stack sx={{ gap: 0.25 }}>
                <StyledBubbleStatus>Couldn't answer that</StyledBubbleStatus>
                <span>{turn.errorMessage}</span>
              </Stack>
            </StyledErrorBubble>
          )}

          {turn.status === 'warning' && (
            <StyledWarningBanner>
              <StyledBubbleIcon>
                <TriangleAlert size={BUBBLE_ICON_SIZE} />
              </StyledBubbleIcon>
              <Stack sx={{ gap: 0.25 }}>
                <StyledBubbleStatus>Answer incomplete — status {answer?.status}</StyledBubbleStatus>
                <span>The assistant could not fully answer this question. Anything it did find is shown below.</span>
              </Stack>
            </StyledWarningBanner>
          )}

          {answer && answer.answer && (
            <StyledAiMessageBubble>
              <Markdown>{answer.answer}</Markdown>
            </StyledAiMessageBubble>
          )}

          {answer && <CitationsSection sources={answer.sources ?? []} />}
          {answer && <RetrievalTraceSection retrieval={answer.retrieval} />}
        </StyledAiColumn>
      </StyledAiRow>
    </>
  );
}

export default MessageTurnSection;
