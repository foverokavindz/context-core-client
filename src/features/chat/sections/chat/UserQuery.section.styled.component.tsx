import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';

export const StyledUserQueryRoot = styled(Stack)(({ theme }) => ({
	flexShrink: 0,
	borderTop: `1px solid ${theme.palette.divider}`,
	paddingLeft: theme.spacing(4),
	paddingRight: theme.spacing(4),
	paddingTop: theme.spacing(2),
	paddingBottom: theme.spacing(2),
	backgroundColor: theme.palette.background.paper,
	alignItems: 'center',
}));

export const StyledAttachButton = styled(IconButton)(({ theme }) => ({
	width: 36,
	height: 36,
	border: 'none',
	backgroundColor: theme.tokens.surfaceInset,
	color: theme.palette.text.secondary,
}));

export const StyledInputStack = styled(Stack)(({ theme }) => ({
	flex: 1,
	height: 44,
	paddingLeft: theme.spacing(2),
	paddingRight: theme.spacing(2),
	backgroundColor: theme.tokens.surfaceInset,
	borderRadius: theme.tokens.radius.xl,
	alignItems: 'center',
}));

export const StyledSendButton = styled(IconButton)(({ theme }) => ({
	width: 36,
	height: 36,
	border: 'none',
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	'&:hover': { backgroundColor: theme.palette.primary.main },
	'&.Mui-disabled': { backgroundColor: theme.tokens.surfaceInset, color: theme.tokens.ink3 },
}));

export const StyledQueryInput = styled(InputBase)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.xl,
	color: theme.palette.text.primary,
	'&.Mui-disabled': { color: theme.palette.text.secondary },
}));
