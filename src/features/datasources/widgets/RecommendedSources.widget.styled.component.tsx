import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const ICON_CHIP_SIZE = 32;
const CONNECT_BUTTON_HEIGHT = 30;

export const StyledRecommendedRow = styled(Stack, {
	shouldForwardProp: (prop) => prop !== 'divided',
})<{ divided: boolean }>(({ theme, divided }) => ({
	alignItems: 'center',
	minWidth: 0,
	padding: theme.spacing(1.25),
	margin: theme.spacing(0, -1.25),
	borderRadius: theme.tokens.radius.md,
	borderBottom: divided ? `1px solid ${theme.palette.divider}` : 'none',
	'&:hover': { backgroundColor: theme.tokens.surfaceInset },
}));

export const StyledRecommendedIconChip = styled(Box)(({ theme }) => ({
	width: ICON_CHIP_SIZE,
	height: ICON_CHIP_SIZE,
	flexShrink: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: theme.tokens.radius.md,
	backgroundColor: theme.tokens.accentTint,
	color: theme.palette.accent.dark,
}));

export const StyledRecommendedName = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.lg,
	fontWeight: 600,
	letterSpacing: '-0.003em',
	color: theme.palette.text.primary,
}));

export const StyledRecommendedDescription = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.xs,
	color: theme.tokens.ink3,
	lineHeight: 1.35,
}));

export const StyledConnectButton = styled(Button)(({ theme }) => ({
	height: CONNECT_BUTTON_HEIGHT,
	flexShrink: 0,
	padding: theme.spacing(0, 1.5),
	fontSize: theme.tokens.fontSize.md,
	fontWeight: 500,
	borderRadius: theme.tokens.radius.md,
	backgroundColor: theme.tokens.surfaceRaised,
	color: theme.palette.text.primary,
	boxShadow: theme.tokens.elevation[1],
	'&:hover': { backgroundColor: theme.tokens.surfaceInset },
}));
