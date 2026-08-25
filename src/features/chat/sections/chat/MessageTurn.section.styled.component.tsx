import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export const StyledUserRow = styled(Stack)({
	maxWidth: '70%',
	alignSelf: 'flex-end',
	alignItems: 'flex-end',
});

export const StyledAiRow = styled(Stack)({
	maxWidth: '80%',
	alignSelf: 'flex-start',
	alignItems: 'flex-start',
});

export const StyledAiColumn = styled(Stack)(({ theme }) => ({
	flex: 1,
	minWidth: 0,
	gap: theme.spacing(1.75),
}));

export const StyledErrorBubble = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	alignItems: 'flex-start',
	gap: theme.spacing(1.25),
	backgroundColor: theme.tokens.criticalTint,
	border: `1px solid ${theme.palette.error.light}`,
	paddingInline: theme.spacing(2.25),
	paddingBlock: theme.spacing(1.75),
	borderRadius: theme.tokens.radius.xl,
	fontSize: theme.tokens.fontSize.xl,
	lineHeight: 1.55,
	color: theme.palette.error.dark,
}));

export const StyledWarningBanner = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	alignItems: 'flex-start',
	gap: theme.spacing(1.25),
	backgroundColor: theme.tokens.warningTint,
	border: `1px solid ${theme.palette.warning.light}`,
	paddingInline: theme.spacing(2.25),
	paddingBlock: theme.spacing(1.75),
	borderRadius: theme.tokens.radius.xl,
	fontSize: theme.tokens.fontSize.xl,
	lineHeight: 1.55,
	color: theme.palette.warning.dark,
}));

export const StyledBubbleIcon = styled(Box)({
	flexShrink: 0,
	display: 'inline-flex',
	marginTop: 2,
});

export const StyledBubbleStatus = styled(Box)(({ theme }) => ({
	fontWeight: theme.typography.fontWeightMedium,
}));
