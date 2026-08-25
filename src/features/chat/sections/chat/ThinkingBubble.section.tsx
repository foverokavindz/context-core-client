import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { THINKING_MESSAGES } from '../../chat.constants';
import { StyledThinkingBubble, StyledThinkingText } from './ThinkingBubble.section.styled.component';

const SPINNER_SIZE = 16;
const ROTATE_INTERVAL_MS = 4000;

function pickNextIndex(current: number): number {
  if (THINKING_MESSAGES.length < 2) return 0;
  const next = Math.floor(Math.random() * (THINKING_MESSAGES.length - 1));
  return next >= current ? next + 1 : next;
}

function ThinkingBubbleSection() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * THINKING_MESSAGES.length));

  useEffect(() => {
    const timer = setInterval(() => setIndex(pickNextIndex), ROTATE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <StyledThinkingBubble>
      <CircularProgress size={SPINNER_SIZE} color="inherit" />
      {/* Keyed on the index so each new line replays the fade-in. */}
      <StyledThinkingText key={index} component="span">
        {THINKING_MESSAGES[index]}
      </StyledThinkingText>
    </StyledThinkingBubble>
  );
}

export default ThinkingBubbleSection;
