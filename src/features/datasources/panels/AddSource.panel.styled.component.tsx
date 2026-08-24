import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const STEP_DOT_SIZE = 26;
const CONNECTOR_HEIGHT = 2;
const FOOTER_BUTTON_HEIGHT = 36;

export const StyledStepRail = styled(Stack)({
	alignItems: 'flex-start',
	width: '100%',
});

export const StyledStepItem = styled(Stack, {
	shouldForwardProp: (prop) => prop !== 'grows',
})<{ grows: boolean }>(({ grows }) => ({
	flexDirection: 'row',
	alignItems: 'center',
	minWidth: 0,
	flex: grows ? 1 : 'none',
}));

export const StyledStepDot = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'state',
})<{ state: 'done' | 'active' | 'upcoming' }>(({ theme, state }) => ({
	width: STEP_DOT_SIZE,
	height: STEP_DOT_SIZE,
	flexShrink: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '50%',
	fontSize: theme.tokens.fontSize.xs,
	fontWeight: 600,
	backgroundColor:
		state === 'done'
			? theme.palette.success.main
			: state === 'active'
				? theme.palette.accent.main
				: theme.tokens.surfaceInset,
	color: state === 'upcoming' ? theme.tokens.ink3 : theme.palette.common.white,
	boxShadow: state === 'active' ? `0 0 0 4px ${theme.tokens.accentTint}` : 'none',
	transition: `background-color ${theme.tokens.motion.durHover} ${theme.tokens.motion.ease}, box-shadow ${theme.tokens.motion.durHover} ${theme.tokens.motion.ease}`,
}));

export const StyledStepLabel = styled(Typography, {
	shouldForwardProp: (prop) => prop !== 'state',
})<{ state: 'done' | 'active' | 'upcoming' }>(({ theme, state }) => ({
	fontSize: theme.tokens.fontSize.xs,
	fontWeight: state === 'active' ? 600 : 400,
	whiteSpace: 'nowrap',
	color:
		state === 'active'
			? theme.palette.text.primary
			: state === 'done'
				? theme.tokens.ink2
				: theme.tokens.ink3,
}));

export const StyledStepConnector = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'done',
})<{ done: boolean }>(({ theme, done }) => ({
	flex: 1,
	minWidth: theme.spacing(2),
	height: CONNECTOR_HEIGHT,
	borderRadius: CONNECTOR_HEIGHT / 2,
	margin: theme.spacing(0, 1, 2.5),
	backgroundColor: done ? theme.palette.accent.main : theme.palette.divider,
	transition: `background-color ${theme.tokens.motion.durHover} ${theme.tokens.motion.ease}`,
}));

export const StyledWizardBackButton = styled(Button)(({ theme }) => ({
	height: FOOTER_BUTTON_HEIGHT,
	padding: theme.spacing(0, 1.75),
	fontSize: theme.tokens.fontSize.md,
	borderRadius: theme.tokens.radius.md,
	color: theme.tokens.ink2,
	'&:hover': { backgroundColor: theme.tokens.surfaceInset },
}));

export const StyledWizardNextButton = styled(Button)(({ theme }) => ({
	height: FOOTER_BUTTON_HEIGHT,
	padding: theme.spacing(0, 2.25),
	fontSize: theme.tokens.fontSize.md,
	fontWeight: 500,
	borderRadius: theme.tokens.radius.md,
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	'&:hover': { backgroundColor: theme.palette.primary.light },
	'&.Mui-disabled': { backgroundColor: theme.tokens.surfaceInset, color: theme.tokens.ink3 },
}));
