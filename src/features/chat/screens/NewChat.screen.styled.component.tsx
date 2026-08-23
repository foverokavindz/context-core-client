import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const StyledNewChatRoot = styled(Stack)(({ theme }) => ({
	flex: 1,
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.spacing(2.25),
	padding: theme.spacing(4),
	textAlign: 'center',
}));

export const StyledIconCircleBox = styled(Box)(({ theme }) => ({
	width: 52,
	height: 52,
	borderRadius: theme.tokens.radius.xl,
	backgroundColor: theme.tokens.accentTint,
	color: theme.palette.accent.dark,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

export const StyledWelcomeHeading = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.heading,
	fontWeight: 600,
	color: theme.palette.text.primary,
	letterSpacing: '-0.008em',
}));

export const StyledWelcomeSubtitle = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.xl,
	color: theme.palette.text.secondary,
	maxWidth: 380,
	lineHeight: 1.5,
}));

export const StyledStartButton = styled(Button)(({ theme }) => ({
	height: 40,
	paddingLeft: theme.spacing(2.5),
	paddingRight: theme.spacing(2.5),
	fontSize: theme.tokens.fontSize.xl,
	fontWeight: 600,
	borderRadius: theme.tokens.radius.md,
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	'&:hover': { backgroundColor: theme.palette.primary.main },
}));
