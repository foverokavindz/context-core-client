import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import type { DataSourceStatus } from '../datasources.types';

const DRAWER_WIDTH = 460;
const DRAWER_MAX_WIDTH = '94vw';
const ICON_CHIP_SIZE = 42;
const CLOSE_BUTTON_SIZE = 30;
const STATUS_DOT_SIZE = 5;
const TAB_INDICATOR_HEIGHT = 2;

function statusColor(theme: import('@mui/material/styles').Theme, status: DataSourceStatus): string {
	if (status === 'connected') return theme.palette.success.dark;
	if (status === 'syncing') return theme.palette.warning.dark;
	if (status === 'failed') return theme.palette.error.main;
	return theme.tokens.ink3;
}

function statusTint(theme: import('@mui/material/styles').Theme, status: DataSourceStatus): string {
	if (status === 'connected') return theme.tokens.positiveTint;
	if (status === 'syncing') return theme.tokens.warningTint;
	if (status === 'failed') return theme.tokens.criticalTint;
	return theme.tokens.surfaceInset;
}

export const StyledSourceDrawer = styled(Drawer)(({ theme }) => ({
	'& .MuiBackdrop-root': {
		backgroundColor: theme.tokens.scrim,
	},
	'& .MuiDrawer-paper': {
		width: DRAWER_WIDTH,
		maxWidth: DRAWER_MAX_WIDTH,
		border: 'none',
		boxShadow: theme.tokens.elevation[3],
		backgroundColor: theme.tokens.surfacePage,
	},
}));

export const StyledDrawerHeader = styled(Stack)(({ theme }) => ({
	flexShrink: 0,
	padding: theme.spacing(2.5, 2.75),
	borderBottom: `1px solid ${theme.palette.divider}`,
	backgroundColor: theme.tokens.surfaceRaised,
	alignItems: 'flex-start',
	minWidth: 0,
}));

export const StyledDrawerIconChip = styled(Box)(({ theme }) => ({
	width: ICON_CHIP_SIZE,
	height: ICON_CHIP_SIZE,
	flexShrink: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: theme.tokens.radius.lg,
	backgroundColor: theme.tokens.accentTint,
	color: theme.palette.accent.dark,
	boxShadow: `0 0 0 1px ${theme.tokens.accentTintStrong}`,
}));

export const StyledDrawerTitle = styled(Typography)(({ theme }) => ({
	fontSize: theme.typography.h6.fontSize,
	fontWeight: 600,
	letterSpacing: '-0.004em',
	color: theme.palette.text.primary,
}));

export const StyledDrawerStatusPill = styled(Stack, {
	shouldForwardProp: (prop) => prop !== 'status',
})<{ status: DataSourceStatus }>(({ theme, status }) => ({
	alignItems: 'center',
	padding: theme.spacing(0.25, 1),
	borderRadius: theme.tokens.radius.sm,
	fontSize: theme.tokens.fontSize['2xs'],
	fontWeight: 500,
	backgroundColor: statusTint(theme, status),
	color: statusColor(theme, status),
}));

export const StyledDrawerStatusDot = styled(Box)({
	width: STATUS_DOT_SIZE,
	height: STATUS_DOT_SIZE,
	borderRadius: '50%',
	backgroundColor: 'currentColor',
});

export const StyledDrawerSubtitle = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.sm,
	color: theme.tokens.ink3,
	marginTop: theme.spacing(0.375),
}));

export const StyledDrawerCloseButton = styled(IconButton)(({ theme }) => ({
	width: CLOSE_BUTTON_SIZE,
	height: CLOSE_BUTTON_SIZE,
	flexShrink: 0,
	padding: 0,
	border: 'none',
	borderRadius: theme.tokens.radius.md,
	color: theme.tokens.ink3,
	'&:hover': { backgroundColor: theme.tokens.surfaceInset },
}));

export const StyledDrawerTabs = styled(Tabs)(({ theme }) => ({
	flexShrink: 0,
	minHeight: 'auto',
	padding: theme.spacing(0, 2.75),
	backgroundColor: theme.tokens.surfaceRaised,
	borderBottom: `1px solid ${theme.palette.divider}`,
	'& .MuiTabs-indicator': {
		height: TAB_INDICATOR_HEIGHT,
		borderRadius: TAB_INDICATOR_HEIGHT / 2,
		backgroundColor: theme.palette.accent.main,
	},
}));

export const StyledDrawerTab = styled(Tab)(({ theme }) => ({
	minHeight: 'auto',
	minWidth: 'auto',
	padding: theme.spacing(1.625, 0),
	marginRight: theme.spacing(2.75),
	fontSize: theme.tokens.fontSize.lg,
	color: theme.tokens.ink3,
	'&.Mui-selected': { color: theme.palette.text.primary, fontWeight: 600 },
}));

export const StyledDrawerBody = styled(Box)(({ theme }) => ({
	flex: 1,
	overflowY: 'auto',
	padding: theme.spacing(2.5, 2.75, 3),
	backgroundColor: theme.tokens.surfaceSunken,
	minWidth: 0,
}));
