import { styled, keyframes } from '@mui/material/styles';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const fadeIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
});

export const StyledThinkingBubble = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	alignItems: 'center',
	gap: theme.spacing(1.25),
	backgroundColor: theme.palette.background.paper,
	boxShadow: theme.tokens.elevation[1],
	paddingInline: theme.spacing(2.25),
	paddingBlock: theme.spacing(2),
	borderRadius: theme.tokens.radius.xl,
	fontSize: theme.tokens.fontSize.xl,
	color: theme.palette.text.secondary,
}));

export const StyledThinkingText = styled(Box)<BoxProps>(({ theme }) => ({
	animation: `${fadeIn} ${theme.tokens.motion.durEnter} ${theme.tokens.motion.ease}`,
}));
