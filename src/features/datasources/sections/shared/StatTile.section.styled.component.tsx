import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ICON_CHIP_SIZE = 32;

export const StyledStatIconChip = styled(Box)(({ theme }) => ({
	width: ICON_CHIP_SIZE,
	height: ICON_CHIP_SIZE,
	flexShrink: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: theme.tokens.radius.sm,
	backgroundColor: theme.tokens.accentTint,
	color: theme.palette.accent.dark,
	boxShadow: `inset 0 1px 0 ${theme.palette.common.white}`,
}));

export const StyledStatValue = styled(Typography)(({ theme }) => ({
	fontSize: theme.typography.h4.fontSize,
	fontWeight: 600,
	letterSpacing: '-0.006em',
	color: theme.palette.text.primary,
}));

export const StyledStatLabel = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.xl,
	fontWeight: 500,
	color: theme.palette.text.primary,
}));

export const StyledStatCaption = styled(Typography)(({ theme }) => ({
	fontSize: theme.tokens.fontSize.md,
	color: theme.tokens.ink3,
}));
