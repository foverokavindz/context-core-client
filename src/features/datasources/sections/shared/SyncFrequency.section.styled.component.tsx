import { styled } from '@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

const CONTROL_HEIGHT = 36;

export const StyledFrequencyGroup = styled(ToggleButtonGroup)(({ theme }) => ({
	backgroundColor: theme.tokens.surfaceInset,
	borderRadius: theme.tokens.radius.md,
	padding: theme.spacing(0.5),
	gap: theme.spacing(0.5),
}));

export const StyledFrequencyButton = styled(ToggleButton)(({ theme }) => ({
	height: CONTROL_HEIGHT,
	border: 'none',
	borderRadius: theme.tokens.radius.sm,
	padding: theme.spacing(0, 2),
	fontSize: theme.tokens.fontSize.md,
	fontWeight: 500,
	color: theme.tokens.ink2,
	'&.Mui-selected': {
		backgroundColor: theme.tokens.surfaceRaised,
		color: theme.palette.text.primary,
		boxShadow: theme.tokens.elevation[1],
	},
}));
