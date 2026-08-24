import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

const CHECKBOX_SIZE = 18;
const CHECKBOX_RADIUS = 5;

export const StyledScopeList = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'bordered',
})<{ bordered: boolean }>(({ theme, bordered }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing(0.25),
	minWidth: 0,
	border: bordered ? `1px solid ${theme.palette.divider}` : 'none',
	borderRadius: bordered ? theme.tokens.radius.lg : 0,
	padding: bordered ? theme.spacing(0.75) : 0,
}));

export const StyledScopeRow = styled(ButtonBase)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing(1.25),
	justifyContent: 'flex-start',
	width: '100%',
	minWidth: 0,
	padding: theme.spacing(1.125, 1.25),
	borderRadius: theme.tokens.radius.md,
	'&:hover': { backgroundColor: theme.tokens.surfaceInset },
}));

export const StyledScopeCheckbox = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected: boolean }>(({ theme, selected }) => ({
	width: CHECKBOX_SIZE,
	height: CHECKBOX_SIZE,
	flexShrink: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: CHECKBOX_RADIUS,
	color: theme.palette.accent.contrastText,
	backgroundColor: selected ? theme.palette.accent.main : 'transparent',
	boxShadow: selected ? 'none' : `inset 0 0 0 1px ${theme.tokens.lineStrong}`,
}));

export const StyledScopeLabel = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.xl,
	color: theme.palette.text.primary,
}));
