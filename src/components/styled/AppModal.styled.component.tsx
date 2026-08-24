import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const ICON_CHIP_SIZE = 38;
const CLOSE_BUTTON_SIZE = 30;

export const StyledAppModalRoot = styled(Dialog)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: theme.tokens.scrim,
  },
  '& .MuiDialog-paper': {
    width: '100%',
    borderRadius: theme.tokens.radius['2xl'],
    boxShadow: theme.tokens.elevation[3],
    backgroundColor: theme.tokens.surfaceRaised,
    border: 'none',
  },
}));

export const StyledAppModalHeader = styled(Stack)(({ theme }) => ({
  flexShrink: 0,
  paddingTop: theme.spacing(2.75),
  paddingBottom: theme.spacing(0.5),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  alignItems: 'flex-start',
  minWidth: 0,
}));

export const StyledAppModalIconChip = styled(Box)(({ theme }) => ({
  width: ICON_CHIP_SIZE,
  height: ICON_CHIP_SIZE,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.tokens.radius.md,
  backgroundColor: theme.tokens.accentTint,
  color: theme.palette.accent.dark,
  boxShadow: `0 0 0 1px ${theme.tokens.accentTintStrong}`,
}));

export const StyledAppModalTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  fontWeight: 600,
  letterSpacing: '-0.004em',
  color: theme.palette.text.primary,
}));

export const StyledAppModalSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.tokens.fontSize.md,
  color: theme.tokens.ink3,
  lineHeight: 1.45,
  marginTop: theme.spacing(0.25),
}));

export const StyledAppModalCloseButton = styled(IconButton)(({ theme }) => ({
  width: CLOSE_BUTTON_SIZE,
  height: CLOSE_BUTTON_SIZE,
  flexShrink: 0,
  padding: 0,
  border: 'none',
  borderRadius: theme.tokens.radius.md,
  color: theme.tokens.ink3,
  '&:hover': { backgroundColor: theme.tokens.surfaceInset },
}));

export const StyledAppModalHeaderExtra = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  paddingTop: theme.spacing(1.25),
  paddingBottom: theme.spacing(1.25),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  minWidth: 0,
}));

export const StyledAppModalBody = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  minWidth: 0,
}));

export const StyledAppModalFooter = styled(Stack)(({ theme }) => ({
  flexShrink: 0,
  padding: theme.spacing(1.75, 3),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.tokens.surfaceSunken,
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  minWidth: 0,
}));
