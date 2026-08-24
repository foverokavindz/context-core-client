import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

const CARD_MIN_WIDTH = 170;
const ICON_CHIP_SIZE = 36;
const BADGE_SIZE = 18;
const SELECTED_BORDER_WIDTH = 1.5;

export const StyledCatalogGrid = styled(Box)(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: `repeat(auto-fit, minmax(${CARD_MIN_WIDTH}px, 1fr))`,
	gap: theme.spacing(1.5),
	minWidth: 0,
}));

export const StyledCatalogCard = styled(ButtonBase, {
	shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected: boolean }>(({ theme, selected }) => ({
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	gap: theme.spacing(1.125),
	padding: theme.spacing(2),
	minWidth: 0,
	textAlign: 'left',
	borderRadius: theme.tokens.radius.lg,
	border: `${SELECTED_BORDER_WIDTH}px solid ${selected ? theme.palette.accent.main : theme.palette.divider}`,
	backgroundColor: selected ? theme.tokens.accentTint : theme.tokens.surfaceRaised,
	boxShadow: selected ? theme.tokens.elevation[2] : theme.tokens.elevation[1],
	transition: `border-color ${theme.tokens.motion.durHover} ${theme.tokens.motion.ease}, box-shadow ${theme.tokens.motion.durHover} ${theme.tokens.motion.ease}, transform ${theme.tokens.motion.durHover} ${theme.tokens.motion.ease}`,
	'&:hover': {
		borderColor: selected ? theme.palette.accent.main : theme.tokens.lineStrong,
		boxShadow: theme.tokens.elevation[2],
		transform: 'translateY(-1px)',
	},
}));

export const StyledCatalogIconChip = styled(Box)(({ theme }) => ({
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

export const StyledCatalogName = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.lg,
	fontWeight: 600,
	letterSpacing: '-0.003em',
	color: theme.palette.text.primary,
}));

export const StyledCatalogDescription = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.xs,
	color: theme.tokens.ink3,
	lineHeight: 1.45,
}));

export const StyledCatalogBadge = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: theme.spacing(1.25),
	right: theme.spacing(1.25),
	width: BADGE_SIZE,
	height: BADGE_SIZE,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '50%',
	backgroundColor: theme.palette.accent.main,
	color: theme.palette.accent.contrastText,
}));
