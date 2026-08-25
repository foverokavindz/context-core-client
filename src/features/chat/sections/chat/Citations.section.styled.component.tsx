import { styled } from '@mui/material/styles';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

const PILL_MAX_WIDTH = 260;
const POPOVER_WIDTH = 380;
const SNIPPET_MAX_HEIGHT = 190;

export const StyledCitationPillRow = styled(Stack)(({ theme }) => ({
	flexWrap: 'wrap',
	gap: theme.spacing(1),
}));

export const StyledCitationPill = styled(ButtonBase)(({ theme }) => ({
	display: 'flex',
	gap: theme.spacing(0.75),
	maxWidth: PILL_MAX_WIDTH,
	paddingInline: theme.spacing(1.25),
	paddingBlock: theme.spacing(0.75),
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: 999,
	fontSize: theme.tokens.fontSize.sm,
	color: theme.palette.text.primary,
	backgroundColor: theme.palette.background.paper,
	alignItems: 'center',
	transition: `box-shadow ${theme.tokens.motion.durHover} ${theme.tokens.motion.ease}`,
	'&:hover': { boxShadow: theme.tokens.elevation[1], borderColor: theme.tokens.lineStrong },
}));

export const StyledCitationSource = styled(Box)<BoxProps>(({ theme }) => ({
	color: theme.palette.text.secondary,
	flexShrink: 0,
}));

export const StyledCitationTitle = styled(Box)<BoxProps>(({ theme }) => ({
	fontWeight: theme.typography.fontWeightMedium,
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
}));

export const StyledCitationDetail = styled(Stack)(({ theme }) => ({
	width: POPOVER_WIDTH,
	maxWidth: '100vw',
	padding: theme.spacing(2),
	gap: theme.spacing(1.25),
}));

export const StyledDetailKicker = styled(Stack)(({ theme }) => ({
	alignItems: 'center',
	gap: theme.spacing(0.75),
	fontSize: theme.tokens.fontSize.xs,
	color: theme.palette.text.secondary,
	textTransform: 'uppercase',
	letterSpacing: '0.06em',
}));

export const StyledDetailTitle = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize['2xl'],
	fontWeight: theme.typography.fontWeightMedium,
	color: theme.palette.text.primary,
	lineHeight: 1.4,
}));

export const StyledDetailMetaRow = styled(Stack)(({ theme }) => ({
	gap: theme.spacing(1.5),
	paddingTop: theme.spacing(1.25),
	borderTop: `1px solid ${theme.palette.divider}`,
	flexWrap: 'wrap',
}));

export const StyledDetailMetaLabel = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize['3xs'],
	color: theme.palette.text.secondary,
	textTransform: 'uppercase',
	letterSpacing: '0.06em',
}));

export const StyledDetailMetaValue = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.md,
	color: theme.palette.text.primary,
	wordBreak: 'break-all',
}));

export const StyledDetailSnippet = styled(Box)(({ theme }) => ({
	fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
	fontSize: theme.tokens.fontSize.xs,
	lineHeight: 1.6,
	color: theme.palette.text.secondary,
	backgroundColor: theme.tokens.surfaceInset,
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: theme.tokens.radius.md,
	padding: theme.spacing(1.25),
	maxHeight: SNIPPET_MAX_HEIGHT,
	overflowY: 'auto',
	whiteSpace: 'pre-wrap',
}));
