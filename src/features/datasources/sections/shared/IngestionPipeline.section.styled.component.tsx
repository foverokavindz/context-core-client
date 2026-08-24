import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { IngestionStepState } from '../../datasources.types';

const DOT_SIZE = 20;
const CONNECTOR_WIDTH = 1;

// Completed reads positive, running amber with a halo, queued and failed fall
// back to the neutral inset / critical tints already in the theme.
function stateColor(theme: import('@mui/material/styles').Theme, state: IngestionStepState): string {
	if (state === 'completed') return theme.palette.success.main;
	if (state === 'running') return theme.palette.warning.dark;
	if (state === 'failed') return theme.palette.error.main;
	return theme.tokens.ink3;
}

export const StyledPipelineRoot = styled(Stack)({
	minWidth: 0,
});

export const StyledPipelineStep = styled(Stack)({
	alignItems: 'flex-start',
	minWidth: 0,
});

export const StyledPipelineRail = styled(Stack)({
	alignItems: 'center',
	flexShrink: 0,
	alignSelf: 'stretch',
});

export const StyledPipelineDot = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'state',
})<{ state: IngestionStepState }>(({ theme, state }) => ({
	width: DOT_SIZE,
	height: DOT_SIZE,
	flexShrink: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '50%',
	backgroundColor: state === 'queued' ? theme.tokens.surfaceInset : stateColor(theme, state),
	color: state === 'queued' ? theme.tokens.ink3 : theme.palette.common.white,
	boxShadow: state === 'running' ? `0 0 0 3px ${theme.tokens.warningTint}` : 'none',
}));

export const StyledPipelineConnector = styled(Box)(({ theme }) => ({
	width: CONNECTOR_WIDTH,
	flex: 1,
	minHeight: theme.spacing(2),
	backgroundColor: theme.palette.divider,
}));

export const StyledPipelineLabel = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.lg,
	fontWeight: 500,
	color: theme.palette.text.primary,
}));

export const StyledPipelineState = styled(Typography, {
	shouldForwardProp: (prop) => prop !== 'state',
})<{ state: IngestionStepState }>(({ theme, state }) => ({
	fontSize: theme.tokens.fontSize.xs,
	fontWeight: 500,
	color: stateColor(theme, state),
}));
