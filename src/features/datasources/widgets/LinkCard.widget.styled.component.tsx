import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export const StyledLinkCardCopy = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.sm,
	color: theme.tokens.ink3,
	lineHeight: 1.5,
}));

export const StyledLinkCardAction = styled(Link)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.md,
	fontWeight: 500,
	color: theme.palette.accent.dark,
	textDecoration: 'none',
	width: 'fit-content',
	'&:hover': { color: theme.palette.accent.main },
})) as typeof Link;
