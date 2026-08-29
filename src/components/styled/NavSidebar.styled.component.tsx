import { styled } from '@mui/material/styles';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography, { type TypographyProps } from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ButtonBase, { type ButtonBaseProps } from '@mui/material/ButtonBase';
import LinearProgress from '@mui/material/LinearProgress';

export const EXPANDED_WIDTH = 240;
export const COLLAPSED_WIDTH = 68;

export const StyledSidebarRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})<BoxProps & { collapsed: boolean }>(({ theme, collapsed }) => ({
  position: 'relative',
  width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
  flexShrink: 0,
  backgroundColor: theme.tokens.surfaceSidebar,
  borderRight: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  transition: `width ${theme.tokens.motion.durEnter} ${theme.tokens.motion.ease}`,
  overflow: 'hidden',
}));

export const StyledHeaderStack = styled(Stack)(({ theme }) => ({
  height: 60,
  flexShrink: 0,
  paddingLeft: theme.spacing(1.75),
  paddingRight: theme.spacing(1.75),
  borderBottom: `1px solid ${theme.palette.divider}`,
  alignItems: 'center',
}));

export const StyledLogoBox = styled(Box)(({ theme }) => ({
  width: 28,
  height: 28,
  flexShrink: 0,
  borderRadius: theme.tokens.radius.md,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 800,
  fontSize: theme.tokens.fontSize.xl,
}));

export const StyledTitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: theme.tokens.fontSize['2xl'],
  fontWeight: 700,
  // letterSpacing: '-0.01em',
}));

export const StyledCollapseButton = styled(IconButton)(({ theme }) => ({
  marginLeft: 'auto',
  flexShrink: 0,
  width: 26,
  height: 26,
  padding: 0,
  border: 'none',
  color: theme.palette.text.secondary,
  '&:hover': { backgroundColor: theme.tokens.surfaceInset },
}));

export const StyledNavBox = styled(Box)<BoxProps>(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  paddingLeft: theme.spacing(1.25),
  paddingRight: theme.spacing(1.25),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
}));

export const StyledSectionLabel = styled(Typography)(({ theme }) => ({
  fontSize: theme.tokens.fontSize['3xs'],
  fontWeight: 500,
  letterSpacing: '.06em',
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
  paddingLeft: theme.spacing(1.25),
  paddingRight: theme.spacing(1.25),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(0.5),
}));

export const StyledNavItemButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'active',
})<ButtonBaseProps & { active: boolean; to?: string }>(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  height: 36,
  paddingLeft: theme.spacing(1.25),
  paddingRight: theme.spacing(1.25),
  width: '100%',
  borderRadius: theme.tokens.radius.md,
  justifyContent: 'flex-start',
  backgroundColor: active ? theme.tokens.accentTint : 'transparent',
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  fontWeight: active ? 600 : 450,
  fontSize: theme.tokens.fontSize.xl,
  transition: `background ${theme.tokens.motion.durHover} ${theme.tokens.motion.ease}`,
  '&:hover': {
    backgroundColor: active ? theme.tokens.accentTintStrong : theme.tokens.surfaceInset,
  },
}));

export const StyledFooterBox = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1.5),
  marginLeft: theme.spacing(0.5),
  marginRight: theme.spacing(0.5),
  marginBottom: theme.spacing(1),
}));

export const StyledIndexedHeaderStack = styled(Stack)(({ theme }) => ({
  fontSize: theme.tokens.fontSize.sm,
  fontWeight: 500,
  color: theme.palette.text.secondary,
  alignItems: 'center',
}));

export const StyledIndexedProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 999,
  backgroundColor: theme.tokens.surfaceInset,
  '& .MuiLinearProgress-bar': {
    backgroundColor: theme.palette.accent.main,
    borderRadius: 999,
  },
}));

export const StyledUpgradeLink = styled(Typography)<TypographyProps<'a', { component: 'a' }>>(({ theme }) => ({
  fontSize: theme.tokens.fontSize.sm,
  fontWeight: 500,
  color: theme.palette.accent.dark,
  textDecoration: 'none',
  '&:hover': { color: theme.palette.accent.main },
}));

export const StyledAvatarBox = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: theme.tokens.accentTint,
  color: theme.palette.accent.dark,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
