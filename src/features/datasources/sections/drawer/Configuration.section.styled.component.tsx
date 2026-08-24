import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const ACTION_HEIGHT = 32;

export const StyledSaveButton = styled(Button)(({ theme }) => ({
	height: ACTION_HEIGHT,
	padding: theme.spacing(0, 1.75),
	fontSize: theme.tokens.fontSize.md,
	fontWeight: 500,
	borderRadius: theme.tokens.radius.md,
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	'&:hover': { backgroundColor: theme.palette.primary.light },
}));

export const StyledDisconnectButton = styled(Button)(({ theme }) => ({
	height: ACTION_HEIGHT,
	padding: theme.spacing(0, 1.75),
	fontSize: theme.tokens.fontSize.md,
	fontWeight: 500,
	borderRadius: theme.tokens.radius.md,
	backgroundColor: theme.tokens.criticalTint,
	color: theme.palette.error.main,
	'&:hover': { backgroundColor: theme.tokens.criticalTint, boxShadow: theme.tokens.elevation[1] },
}));
