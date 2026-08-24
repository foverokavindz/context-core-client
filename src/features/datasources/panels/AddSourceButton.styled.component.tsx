import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const BUTTON_HEIGHT = 38;

export const StyledAddSourceButton = styled(Button)(({ theme }) => ({
	height: BUTTON_HEIGHT,
	padding: theme.spacing(0, 2),
	fontSize: theme.tokens.fontSize.xl,
	fontWeight: 500,
	borderRadius: theme.tokens.radius.md,
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	whiteSpace: 'nowrap',
	'&:hover': { backgroundColor: theme.palette.primary.light },
}));
