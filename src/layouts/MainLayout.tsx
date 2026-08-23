import { Outlet } from 'react-router-dom';
import type { ReactNode } from 'react';
import { StyledMainLayoutRoot, StyledMainContentBox, StyledOutletBox } from './MainLayout.styled.component';

interface MainLayoutProps {
  sidebar: ReactNode;
  topBar: ReactNode;
}

function MainLayout({ sidebar, topBar }: MainLayoutProps) {
  return (
    <StyledMainLayoutRoot>
      {sidebar}

      {/* Main Content Area */}
      <StyledMainContentBox component="main">
        {topBar}
        <StyledOutletBox>
          <Outlet />
        </StyledOutletBox>
      </StyledMainContentBox>
    </StyledMainLayoutRoot>
  );
}

export default MainLayout;