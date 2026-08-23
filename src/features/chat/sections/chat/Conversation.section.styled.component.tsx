import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ButtonBase from '@mui/material/ButtonBase';

export const StyledConversationRoot = styled(Box)(({ theme }) => ({
	flex: 1,
	overflowY: 'auto',
	paddingLeft: theme.spacing(4),
	paddingRight: theme.spacing(4),
	paddingTop: theme.spacing(3.5),
	paddingBottom: theme.spacing(3.5),
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing(2),
}));

export const StyledEmptyStateStack = styled(Stack)(({ theme }) => ({
	flex: 1,
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.spacing(0.75),
	color: theme.palette.text.secondary,
	textAlign: 'center',
}));

export const StyledUserMessageBubble = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	paddingLeft: theme.spacing(2),
	paddingRight: theme.spacing(2),
	paddingTop: theme.spacing(1.5),
	paddingBottom: theme.spacing(1.5),
	borderRadius: theme.tokens.radius.xl,
	fontSize: theme.tokens.fontSize.xl,
	lineHeight: 1.5,
}));

export const StyledUserAvatarBox = styled(Box)(({ theme }) => ({
	width: 28,
	height: 28,
	flexShrink: 0,
	borderRadius: '50%',
	backgroundColor: theme.tokens.accentTint,
	color: theme.palette.accent.dark,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: theme.tokens.fontSize.xs,
	fontWeight: 600,
}));

export const StyledAiAvatarBox = styled(Box)(({ theme }) => ({
	width: 28,
	height: 28,
	flexShrink: 0,
	borderRadius: '50%',
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

export const StyledAiMessageBubble = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	boxShadow: theme.tokens.elevation[1],
	paddingLeft: theme.spacing(2.25),
	paddingRight: theme.spacing(2.25),
	paddingTop: theme.spacing(2),
	paddingBottom: theme.spacing(2),
	borderRadius: theme.tokens.radius.xl,
	fontSize: theme.tokens.fontSize.xl,
	lineHeight: 1.65,
	color: theme.palette.text.primary,
}));

export const StyledCitationChip = styled(Stack)(({ theme }) => ({
	paddingLeft: theme.spacing(1.25),
	paddingRight: theme.spacing(1.25),
	paddingTop: theme.spacing(0.75),
	paddingBottom: theme.spacing(0.75),
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: 999,
	fontSize: theme.tokens.fontSize.sm,
	color: theme.palette.text.primary,
	backgroundColor: theme.palette.background.paper,
	alignItems: 'center',
}));

export const StyledTraceToggleButton = styled(ButtonBase)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	width: '100%',
	backgroundColor: theme.palette.background.paper,
	paddingLeft: theme.spacing(1.75),
	paddingRight: theme.spacing(1.75),
	paddingTop: theme.spacing(1.375),
	paddingBottom: theme.spacing(1.375),
	fontSize: theme.tokens.fontSize.md,
	fontWeight: 500,
	color: theme.palette.text.secondary,
}));

export const StyledTraceBody = styled(Box)(({ theme }) => ({
	paddingLeft: theme.spacing(2.25),
	paddingRight: theme.spacing(2.25),
	paddingTop: theme.spacing(1.75),
	paddingBottom: theme.spacing(2),
	display: 'flex',
	flexDirection: 'column',
}));

export const StyledTraceStepIconBox = styled(Box)(({ theme }) => ({
	width: 14,
	height: 14,
	borderRadius: '50%',
	backgroundColor: theme.tokens.positiveTint,
	color: theme.palette.success.main,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

export const StyledTraceConnectorLine = styled(Box)(({ theme }) => ({
	width: 1,
	flex: 1,
	minHeight: 12,
	backgroundColor: theme.palette.divider,
}));
