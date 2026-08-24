import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const CHIP_SIZE = 22;
const FIELD_MIN_WIDTH = 180;

export const StyledSectionChip = styled(Box)(({ theme }) => ({
	width: CHIP_SIZE,
	height: CHIP_SIZE,
	flexShrink: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: theme.tokens.radius.sm,
	backgroundColor: theme.tokens.accentTint,
	color: theme.palette.accent.dark,
}));

export const StyledSectionHeading = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.md,
	fontWeight: 600,
	letterSpacing: '-0.003em',
	color: theme.palette.text.primary,
}));

export const StyledFieldGrid = styled(Box)(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: `repeat(auto-fit, minmax(${FIELD_MIN_WIDTH}px, 1fr))`,
	gap: theme.spacing(1.75),
	minWidth: 0,
}));

export const StyledCredentialField = styled(TextField)(({ theme }) => ({
	'& .MuiInputBase-input': {
		fontSize: theme.tokens.fontSize.xl,
		padding: theme.spacing(1.25, 1.5),
	},
	'& .MuiFormLabel-root': {
		fontSize: theme.tokens.fontSize.md,
		color: theme.tokens.ink3,
	},
	'& .MuiOutlinedInput-root': {
		borderRadius: theme.tokens.radius.md,
		backgroundColor: theme.tokens.surfaceRaised,
	},
}));
