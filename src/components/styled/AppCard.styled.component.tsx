import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const StyledAppCardRoot = styled(Card)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing(3),
	paddingTop: theme.spacing(3),
	paddingBottom: theme.spacing(3),
	minWidth: 0,
}));

export const StyledAppCardHeader = styled(Stack)(({ theme }) => ({
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),
	alignItems: 'flex-start',
	justifyContent: 'space-between',
	minWidth: 0,
}));

export const StyledAppCardTitle = styled(Typography)(({ theme }) => ({
	fontSize: theme.typography.body1.fontSize,
	fontWeight: 500,
	lineHeight: 1.4,
	color: theme.palette.text.primary,
}));

export const StyledAppCardDescription = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.xl,
	color: theme.tokens.ink3,
	lineHeight: 1.45,
}));

export const StyledAppCardBody = styled(Box)(({ theme }) => ({
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),
	fontSize: theme.tokens.fontSize.xl,
	minWidth: 0,
}));

export const StyledAppCardFooter = styled(Stack)(({ theme }) => ({
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),
	alignItems: 'center',
	minWidth: 0,
}));
