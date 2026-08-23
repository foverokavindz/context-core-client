import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';

export const StyledTopBarRoot = styled(Stack)(({ theme }) => ({
  height: 60,
  flexShrink: 0,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  alignItems: 'center',
}));

export const StyledOrgButton = styled(ButtonBase)(({ theme }) => ({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  height: 36,
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.tokens.radius.md,
  backgroundColor: theme.palette.background.paper,
  transition: `border-color ${theme.tokens.motion.durHover} ${theme.tokens.motion.ease}`,
  '&:hover': { borderColor: theme.tokens.lineStrong },
}));

export const StyledOrgIconBox = styled(Box)(({ theme }) => ({
  width: 22,
  height: 22,
  flexShrink: 0,
  borderRadius: theme.tokens.radius.sm,
  backgroundColor: theme.tokens.accentTint,
  color: theme.palette.accent.dark,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledOrgName = styled(Typography)(({ theme }) => ({
  fontSize: theme.tokens.fontSize.lg,
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

export const StyledSearchBar = styled(Stack)(({ theme }) => ({
  flex: 1,
  maxWidth: 440,
  marginLeft: 'auto',
  marginRight: 'auto',
  height: 36,
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  backgroundColor: theme.tokens.surfaceInset,
  borderRadius: theme.tokens.radius.md,
  minWidth: 0,
  alignItems: 'center',
}));

export const StyledSearchInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  fontSize: theme.tokens.fontSize.lg,
  color: theme.palette.text.primary,
}));

export const StyledKbdBadge = styled(Stack)(({ theme }) => ({
  flexShrink: 0,
  paddingLeft: theme.spacing(0.75),
  paddingRight: theme.spacing(0.75),
  paddingTop: theme.spacing(0.125),
  paddingBottom: theme.spacing(0.125),
  borderRadius: theme.tokens.radius.sm,
  backgroundColor: theme.palette.background.paper,
  boxShadow: `0 0 0 1px ${theme.palette.divider}`,
  fontSize: theme.tokens.fontSize['3xs'],
  fontWeight: 500,
  color: theme.palette.text.secondary,
  alignItems: 'center',
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  border: 'none',
  color: theme.palette.text.secondary,
  '&:hover': { backgroundColor: theme.tokens.surfaceInset },
}));

export const StyledNotificationBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.accent.main,
    color: theme.palette.accent.contrastText,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

export const StyledDivider = styled(Box)(({ theme }) => ({
  width: 1,
  height: 24,
  backgroundColor: theme.palette.divider,
  marginLeft: theme.spacing(0.25),
  marginRight: theme.spacing(0.25),
}));

export const StyledUserButton = styled(ButtonBase)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  paddingLeft: theme.spacing(0.75),
  paddingRight: theme.spacing(0.75),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  borderRadius: theme.tokens.radius.md,
  '&:hover': { backgroundColor: theme.tokens.surfaceInset },
}));

export const StyledUserAvatar = styled(Avatar)(({ theme }) => ({
  width: 30,
  height: 30,
  fontSize: theme.tokens.fontSize.sm,
  fontWeight: 600,
  backgroundColor: theme.tokens.accentTint,
  color: theme.palette.accent.dark,
}));

export const StyledUserName = styled(Typography)(({ theme }) => ({
  fontSize: theme.tokens.fontSize.md,
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

export const StyledUserRole = styled(Typography)(({ theme }) => ({
  fontSize: theme.tokens.fontSize['2xs'],
  color: theme.palette.text.secondary,
}));
