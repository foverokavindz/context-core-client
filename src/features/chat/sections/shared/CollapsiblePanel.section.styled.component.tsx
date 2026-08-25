import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ButtonBase from '@mui/material/ButtonBase';

export const StyledCollapsibleRoot = styled(Box)(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: theme.tokens.radius.lg,
	overflow: 'hidden',
}));

export const StyledCollapsibleToggle = styled(ButtonBase)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	width: '100%',
	backgroundColor: theme.palette.background.paper,
	paddingInline: theme.spacing(1.75),
	paddingBlock: theme.spacing(1.375),
	fontSize: theme.tokens.fontSize.md,
	fontWeight: theme.typography.fontWeightMedium,
	color: theme.palette.text.secondary,
	'&:hover': { backgroundColor: theme.tokens.surfaceInset },
}));

export const StyledCollapsibleLabel = styled(Stack)(({ theme }) => ({
	alignItems: 'center',
	gap: theme.spacing(1),
}));

export const StyledCollapsibleCount = styled(Box)(({ theme }) => ({
	minWidth: 18,
	paddingInline: theme.spacing(0.75),
	borderRadius: 999,
	backgroundColor: theme.tokens.surfaceSunken,
	color: theme.palette.text.secondary,
	fontSize: theme.tokens.fontSize['3xs'],
	lineHeight: 1.55,
	textAlign: 'center',
}));

export const StyledCollapsibleBody = styled(Box)(({ theme }) => ({
	paddingInline: theme.spacing(2.25),
	paddingTop: theme.spacing(1.75),
	paddingBottom: theme.spacing(2),
	borderTop: `1px solid ${theme.palette.divider}`,
}));
