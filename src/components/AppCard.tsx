import type { ReactNode } from 'react';
import Stack from '@mui/material/Stack';
import {
  StyledAppCardRoot,
  StyledAppCardHeader,
  StyledAppCardTitle,
  StyledAppCardDescription,
  StyledAppCardBody,
  StyledAppCardFooter,
} from './styled/AppCard.styled.component';

interface AppCardProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

function AppCard({ title, description, action, footer, children }: AppCardProps) {
  const hasHeader = Boolean(title || description || action);

  return (
    <StyledAppCardRoot variant="soft">
      {hasHeader && (
        <StyledAppCardHeader direction="row" spacing={1.5}>
          <Stack spacing={0.25} sx={{ minWidth: 0 }}>
            {title && <StyledAppCardTitle>{title}</StyledAppCardTitle>}
            {description && <StyledAppCardDescription>{description}</StyledAppCardDescription>}
          </Stack>
          {action}
        </StyledAppCardHeader>
      )}
      <StyledAppCardBody>{children}</StyledAppCardBody>
      {footer && (
        <StyledAppCardFooter direction="row" spacing={1}>
          {footer}
        </StyledAppCardFooter>
      )}
    </StyledAppCardRoot>
  );
}

export default AppCard;
