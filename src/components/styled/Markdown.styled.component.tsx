import { styled } from '@mui/material/styles';
import Box, { type BoxProps } from '@mui/material/Box';

const MONOSPACE_STACK = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

export const StyledMarkdownRoot = styled(Box)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.xl,
	lineHeight: 1.65,
	color: theme.palette.text.primary,
	'& > *:first-of-type': { marginTop: 0 },
	'& > *:last-child': { marginBottom: 0 },
}));

export const StyledMarkdownHeading = styled(Box)<BoxProps>(({ theme }) => ({
	fontSize: theme.tokens.fontSize['2xl'],
	fontWeight: theme.typography.fontWeightMedium,
	color: theme.palette.text.primary,
	marginTop: theme.spacing(2),
	marginBottom: theme.spacing(0.75),
	lineHeight: 1.4,
}));

export const StyledMarkdownParagraph = styled(Box)<BoxProps>(({ theme }) => ({
	marginTop: 0,
	marginBottom: theme.spacing(1.25),
}));

export const StyledMarkdownList = styled(Box)<BoxProps>(({ theme }) => ({
	marginTop: 0,
	marginBottom: theme.spacing(1.25),
	paddingLeft: theme.spacing(2.5),
	// Kept as a block list so bullets/numbers survive - flex blockifies markers away.
	'& li': { marginBottom: theme.spacing(0.5) },
	'& li:last-child': { marginBottom: 0 },
	'& li > p': { marginBottom: 0 },
	'& li > ul, & li > ol': { marginTop: theme.spacing(0.5), marginBottom: 0 },
}));

export const StyledMarkdownQuote = styled(Box)<BoxProps>(({ theme }) => ({
	margin: 0,
	marginBottom: theme.spacing(1.25),
	paddingLeft: theme.spacing(1.5),
	borderLeft: `2px solid ${theme.palette.divider}`,
	color: theme.palette.text.secondary,
}));

export const StyledMarkdownLink = styled(Box)<BoxProps<'a'>>(({ theme }) => ({
	color: theme.palette.accent.dark,
	textDecoration: 'underline',
	textUnderlineOffset: 2,
	'&:hover': { color: theme.palette.accent.main },
}));

export const StyledMarkdownDivider = styled(Box)<BoxProps>(({ theme }) => ({
	border: 'none',
	borderTop: `1px solid ${theme.palette.divider}`,
	marginTop: theme.spacing(2),
	marginBottom: theme.spacing(2),
}));

export const StyledInlineCode = styled(Box)<BoxProps>(({ theme }) => ({
	fontFamily: MONOSPACE_STACK,
	fontSize: theme.tokens.fontSize.md,
	backgroundColor: theme.tokens.surfaceInset,
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: theme.tokens.radius.sm,
	paddingInline: theme.spacing(0.625),
	paddingBlock: theme.spacing(0.125),
}));

export const StyledCodeBlock = styled(Box)<BoxProps>(({ theme }) => ({
	fontFamily: MONOSPACE_STACK,
	fontSize: theme.tokens.fontSize.md,
	lineHeight: 1.6,
	backgroundColor: theme.tokens.surfaceInset,
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: theme.tokens.radius.md,
	padding: theme.spacing(1.5),
	marginTop: 0,
	marginBottom: theme.spacing(1.25),
	overflowX: 'auto',
	// Neutralise the inline-code chrome for the <code> nested inside a fence.
	'& code': {
		backgroundColor: 'transparent',
		border: 'none',
		padding: 0,
		fontSize: 'inherit',
	},
}));

export const StyledMarkdownTableWrap = styled(Box)(({ theme }) => ({
	marginBottom: theme.spacing(1.25),
	overflowX: 'auto',
}));

export const StyledMarkdownTable = styled(Box)<BoxProps>(({ theme }) => ({
	borderCollapse: 'collapse',
	width: '100%',
	fontSize: theme.tokens.fontSize.md,
	'& th, & td': {
		border: `1px solid ${theme.palette.divider}`,
		padding: theme.spacing(0.875),
		textAlign: 'left',
		verticalAlign: 'top',
	},
	'& th': {
		backgroundColor: theme.tokens.surfaceSunken,
		fontWeight: theme.typography.fontWeightMedium,
	},
}));
