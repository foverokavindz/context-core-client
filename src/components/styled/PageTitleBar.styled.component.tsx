import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const StyledPageTitleBarRoot = styled(Stack)({
	height: 76,
	flexShrink: 0,
	alignItems: 'center',
	justifyContent: 'space-between',
});

export const StyledPageTitle = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize['3xl'],
	fontWeight: 600,
	letterSpacing: '-0.01em',
	color: theme.palette.text.primary,
}));

export const StyledPageSubtitle = styled(Typography)(({ theme }) => ({
	marginTop: theme.spacing(0.375),
	fontSize: theme.tokens.fontSize.lg,
	color: theme.palette.text.secondary,
}));
