import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const STAT_MIN_WIDTH = 120;

export const StyledDataStatsGrid = styled(Box)(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: `repeat(auto-fit, minmax(${STAT_MIN_WIDTH}px, 1fr))`,
	gap: theme.spacing(1.5),
	minWidth: 0,
}));

export const StyledDataStatTile = styled(Stack)(({ theme }) => ({
	gap: theme.spacing(0.25),
	padding: theme.spacing(1.75),
	borderRadius: theme.tokens.radius.lg,
	backgroundColor: theme.tokens.surfaceRaised,
	boxShadow: theme.tokens.elevation[1],
	minWidth: 0,
}));

export const StyledDataStatLabel = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize['2xs'],
	color: theme.tokens.ink3,
}));

export const StyledDataStatValue = styled(Typography)(({ theme }) => ({
	fontSize: theme.typography.h6.fontSize,
	fontWeight: 600,
	color: theme.palette.text.primary,
}));

export const StyledIndexedRow = styled(Stack, {
	shouldForwardProp: (prop) => prop !== 'divided',
})<{ divided: boolean }>(({ theme, divided }) => ({
	alignItems: 'center',
	minWidth: 0,
	padding: theme.spacing(1.25, 0),
	borderBottom: divided ? `1px solid ${theme.palette.divider}` : 'none',
}));

export const StyledIndexedName = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.md,
	color: theme.palette.text.primary,
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
}));

export const StyledIndexedMeta = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize['2xs'],
	color: theme.tokens.ink3,
}));

export const StyledIndexedChunks = styled(Typography)(({ theme }) => ({
	flexShrink: 0,
	fontSize: theme.tokens.fontSize['2xs'],
	color: theme.tokens.ink3,
}));
