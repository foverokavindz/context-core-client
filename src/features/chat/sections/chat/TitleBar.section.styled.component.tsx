import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const StyledTitleBarRoot = styled(Stack)(({ theme }) => ({
	height: 56,
	flexShrink: 0,
	borderBottom: `1px solid ${theme.palette.divider}`,
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),
	alignItems: 'center',
}));

export const StyledTitleText = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize['2xl'],
	fontWeight: 600,
	color: theme.palette.text.primary,
	letterSpacing: '-0.006em',
}));

export const StyledNewChatButton = styled(Button)(({ theme }) => ({
	height: 32,
	paddingLeft: theme.spacing(1.5),
	paddingRight: theme.spacing(1.5),
	fontSize: theme.tokens.fontSize.md,
	fontWeight: 500,
	borderRadius: theme.tokens.radius.md,
	backgroundColor: theme.tokens.surfaceInset,
	color: theme.palette.text.primary,
	'&:hover': { backgroundColor: theme.tokens.surfaceSunken },
}));
