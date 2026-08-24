import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const SUCCESS_ICON_SIZE = 32;

export const StyledSuccessBanner = styled(Stack)(({ theme }) => ({
	alignItems: 'center',
	padding: theme.spacing(1.75, 2),
	borderRadius: theme.tokens.radius.lg,
	backgroundColor: theme.tokens.positiveTint,
	minWidth: 0,
}));

export const StyledSuccessIcon = styled(Box)(({ theme }) => ({
	width: SUCCESS_ICON_SIZE,
	height: SUCCESS_ICON_SIZE,
	flexShrink: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '50%',
	backgroundColor: theme.palette.success.main,
	color: theme.palette.success.contrastText,
}));

export const StyledSuccessTitle = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.lg,
	fontWeight: 600,
	color: theme.palette.text.primary,
}));

export const StyledSuccessCaption = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.sm,
	color: theme.tokens.ink2,
	lineHeight: 1.4,
}));

export const StyledPipelineBox = styled(Box)(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: theme.tokens.radius.lg,
	padding: theme.spacing(2),
	minWidth: 0,
}));

export const StyledPipelineBoxTitle = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.md,
	fontWeight: 600,
	color: theme.palette.text.primary,
	marginBottom: theme.spacing(1.75),
}));
