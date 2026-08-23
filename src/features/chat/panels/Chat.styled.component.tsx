import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import { EXPANDED_WIDTH } from './History.panel.styled.component';

export const StyledChatPageRoot = styled(Box)({
  position: 'relative',
  flex: 1,
  minHeight: 0,
  display: 'flex',
  overflow: 'hidden',
});

export const StyledHistoryToggleButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'historyCollapsed',
})<IconButtonProps & { historyCollapsed: boolean }>(({ theme, historyCollapsed }) => ({
  position: 'absolute',
  top: 7,
  right: historyCollapsed ? 16 : EXPANDED_WIDTH + 7,
  zIndex: 20,
  width: 40,
  height: 40,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.tokens.radius.md,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.tokens.elevation[2],
  color: theme.palette.text.secondary,
  transition: `right ${theme.tokens.motion.durEnter} ${theme.tokens.motion.ease}`,
  '&:hover': { boxShadow: theme.tokens.elevation[3] },
}));
