import { styled } from '@mui/material/styles';
import Box, { type BoxProps } from '@mui/material/Box';

export const EXPANDED_WIDTH = 260;

export const StyledHistoryAside = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'collapsed',
})<BoxProps & { collapsed: boolean }>(({ theme, collapsed }) => ({
	width: collapsed ? 0 : EXPANDED_WIDTH,
	flexShrink: 0,
	borderLeft: collapsed ? 'none' : `1px solid ${theme.palette.divider}`,
	display: 'flex',
	flexDirection: 'column',
	overflow: 'hidden',
	transition: `width ${theme.tokens.motion.durEnter} ${theme.tokens.motion.ease}`,
	backgroundColor: theme.palette.background.paper,
}));
