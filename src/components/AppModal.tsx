import type { ReactNode } from 'react';
import Stack from '@mui/material/Stack';
import { X } from 'lucide-react';
import {
  StyledAppModalRoot,
  StyledAppModalHeader,
  StyledAppModalIconChip,
  StyledAppModalTitle,
  StyledAppModalSubtitle,
  StyledAppModalCloseButton,
  StyledAppModalHeaderExtra,
  StyledAppModalBody,
  StyledAppModalFooter,
} from './styled/AppModal.styled.component';

const CLOSE_ICON_SIZE = 16;
const PAPER_MAX_WIDTH = 660;
const PAPER_MAX_HEIGHT = '88vh';

interface AppModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  headerExtra?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

function AppModal({ open, onClose, title, subtitle, icon, headerExtra, footer, children }: AppModalProps) {
  return (
    <StyledAppModalRoot
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { maxWidth: PAPER_MAX_WIDTH, maxHeight: PAPER_MAX_HEIGHT } } }}
    >
      <StyledAppModalHeader direction="row" spacing={1.75}>
        {icon && <StyledAppModalIconChip>{icon}</StyledAppModalIconChip>}
        <Stack sx={{ flex: 1, minWidth: 0 }}>
          <StyledAppModalTitle>{title}</StyledAppModalTitle>
          {subtitle && <StyledAppModalSubtitle>{subtitle}</StyledAppModalSubtitle>}
        </Stack>
        <StyledAppModalCloseButton aria-label="Close dialog" onClick={onClose}>
          <X size={CLOSE_ICON_SIZE} />
        </StyledAppModalCloseButton>
      </StyledAppModalHeader>
      {headerExtra && <StyledAppModalHeaderExtra>{headerExtra}</StyledAppModalHeaderExtra>}
      <StyledAppModalBody>{children}</StyledAppModalBody>
      {footer && (
        <StyledAppModalFooter direction="row" spacing={1.25}>
          {footer}
        </StyledAppModalFooter>
      )}
    </StyledAppModalRoot>
  );
}

export default AppModal;
