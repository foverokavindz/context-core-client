import type { ReactNode } from 'react';
import Stack from '@mui/material/Stack';
import { StyledPageTitleBarRoot, StyledPageTitle, StyledPageSubtitle } from './styled/PageTitleBar.styled.component';

interface PageTitleBarProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

function PageTitleBar({ title, subtitle, actions }: PageTitleBarProps) {
  return (
    <StyledPageTitleBarRoot direction="row" spacing={2.5}>
      <Stack sx={{ minWidth: 0 }}>
        <StyledPageTitle>{title}</StyledPageTitle>
        {subtitle && <StyledPageSubtitle>{subtitle}</StyledPageSubtitle>}
      </Stack>
      {actions && (
        <Stack direction="row" spacing={1.25} sx={{ flexShrink: 0, alignItems: 'center' }}>
          {actions}
        </Stack>
      )}
    </StyledPageTitleBarRoot>
  );
}

export default PageTitleBar;
