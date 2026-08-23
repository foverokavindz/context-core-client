import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { type ButtonBaseProps } from '@mui/material/ButtonBase';

export const StyledHistoryListRoot = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  gap: theme.spacing(1.75),
  flex: 1,
  overflowY: 'auto',
  width: 260,
}));

export const StyledNewChatButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: 36,
  fontSize: theme.tokens.fontSize.xl,
  fontWeight: 500,
  borderRadius: theme.tokens.radius.md,
  backgroundColor: theme.tokens.surfaceInset,
  color: theme.palette.text.primary,
  '&:hover': { backgroundColor: theme.tokens.surfaceSunken },
}));

export const StyledDayLabel = styled(Typography)(({ theme }) => ({
  fontSize: theme.tokens.fontSize['3xs'],
  fontWeight: 500,
  letterSpacing: '.06em',
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
  paddingLeft: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
}));

export const StyledConversationItemButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<ButtonBaseProps & { active: boolean }>(({ theme, active }) => ({
  display: 'block',
  width: '100%',
  textAlign: 'left',
  borderRadius: theme.tokens.radius.md,
  paddingLeft: theme.spacing(1.25),
  paddingRight: theme.spacing(1.25),
  paddingTop: theme.spacing(1.125),
  paddingBottom: theme.spacing(1.125),
  fontSize: theme.tokens.fontSize.md,
  backgroundColor: active ? theme.tokens.accentTint : 'transparent',
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  fontWeight: active ? 500 : 400,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '&:hover': { backgroundColor: active ? theme.tokens.accentTintStrong : theme.tokens.surfaceInset },
}));
