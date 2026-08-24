import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import type { DataSourceStatus } from '../datasources.types';

const TABLE_MIN_WIDTH = 820;
const ICON_CHIP_SIZE = 32;
const ACTION_BUTTON_SIZE = 32;
const STATUS_DOT_SIZE = 6;

// Connected reads positive, syncing amber, needs-setup neutral, failed critical.
function statusColor(theme: import('@mui/material/styles').Theme, status: DataSourceStatus): string {
	if (status === 'connected') return theme.palette.success.main;
	if (status === 'syncing') return theme.palette.warning.dark;
	if (status === 'failed') return theme.palette.error.main;
	return theme.tokens.ink3;
}

export const StyledTableScroller = styled(Box)({
	overflowX: 'auto',
	minWidth: 0,
});

export const StyledSourcesTable = styled(Table)({
	minWidth: TABLE_MIN_WIDTH,
});

export const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
	padding: theme.spacing(0, 1.5, 1.25, 0),
	borderBottom: `1px solid ${theme.palette.divider}`,
	fontSize: theme.tokens.fontSize.xs,
	fontWeight: 600,
	letterSpacing: '.03em',
	textTransform: 'uppercase',
	color: theme.tokens.ink3,
}));

export const StyledBodyCell = styled(TableCell)(({ theme }) => ({
	padding: theme.spacing(1.625, 1.5, 1.625, 0),
	borderBottom: `1px solid ${theme.palette.divider}`,
	verticalAlign: 'middle',
}));

export const StyledSourceIconChip = styled(Box)(({ theme }) => ({
	width: ICON_CHIP_SIZE,
	height: ICON_CHIP_SIZE,
	flexShrink: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: theme.tokens.radius.md,
	backgroundColor: theme.tokens.accentTint,
	color: theme.palette.accent.dark,
}));

export const StyledSourceName = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.xl,
	fontWeight: 600,
	color: theme.palette.text.primary,
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
}));

export const StyledTypePill = styled(Typography)(({ theme }) => ({
	display: 'inline-block',
	width: 'fit-content',
	padding: theme.spacing(0.25, 1),
	borderRadius: theme.tokens.radius.sm,
	backgroundColor: theme.tokens.surfaceInset,
	fontSize: theme.tokens.fontSize.xs,
	fontWeight: 500,
	color: theme.tokens.ink2,
	whiteSpace: 'nowrap',
}));

export const StyledStatusDot = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'status',
})<{ status: DataSourceStatus }>(({ theme, status }) => ({
	width: STATUS_DOT_SIZE,
	height: STATUS_DOT_SIZE,
	flexShrink: 0,
	borderRadius: '50%',
	backgroundColor: statusColor(theme, status),
}));

export const StyledStatusLabel = styled(Typography, {
	shouldForwardProp: (prop) => prop !== 'status',
})<{ status: DataSourceStatus }>(({ theme, status }) => ({
	fontSize: theme.tokens.fontSize.sm,
	color: statusColor(theme, status),
	whiteSpace: 'nowrap',
}));

export const StyledMetaText = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.sm,
	color: theme.tokens.ink3,
}));

export const StyledIndexedPrimary = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.md,
	color: theme.palette.text.primary,
}));

export const StyledIndexedSecondary = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize['2xs'],
	color: theme.tokens.ink3,
}));

export const StyledRowMenuButton = styled(IconButton)(({ theme }) => ({
	width: ACTION_BUTTON_SIZE,
	height: ACTION_BUTTON_SIZE,
	flexShrink: 0,
	padding: 0,
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: theme.tokens.radius.md,
	backgroundColor: theme.tokens.surfaceRaised,
	color: theme.tokens.ink2,
	'&:hover': { backgroundColor: theme.tokens.surfaceInset, borderColor: theme.tokens.lineStrong },
}));

export const StyledRowActionButton = styled(Button)(({ theme }) => ({
	height: ACTION_BUTTON_SIZE,
	padding: theme.spacing(0, 1.25),
	fontSize: theme.tokens.fontSize.md,
	fontWeight: 500,
	borderRadius: theme.tokens.radius.md,
	backgroundColor: theme.tokens.surfaceRaised,
	color: theme.palette.text.primary,
	boxShadow: theme.tokens.elevation[1],
	whiteSpace: 'nowrap',
	'&:hover': { backgroundColor: theme.tokens.surfaceInset },
}));
