import { styled } from '@mui/material/styles';
import Box, { type BoxProps } from '@mui/material/Box';

export const StyledMainLayoutRoot = styled(Box)({
	display: 'flex',
	height: '100vh',
	width: '100%',
	overflow: 'hidden',
});

export const StyledMainContentBox = styled(Box)<BoxProps>(({ theme }) => ({
	flex: 1,
	minWidth: 0,
	minHeight: 0,
	display: 'flex',
	flexDirection: 'column',
	transition: `width ${theme.tokens.motion.durEnter} ${theme.tokens.motion.ease}`,
}));

export const StyledOutletBox = styled(Box)({
	flex: 1,
	minHeight: 0,
	display: 'flex',
	flexDirection: 'column',
});
