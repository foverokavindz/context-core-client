import Box from '@mui/material/Box';
import { StyledPageShellRoot, StyledPageShellBody } from './PageShellLayout.styled.component';

interface PageShellLayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const PageShellLayout: React.FC<PageShellLayoutProps> = ({ header, children, footer }) => {
  return (
    <StyledPageShellRoot>
      <Box sx={{ flexShrink: 0 }}>{header}</Box>
      <StyledPageShellBody>{children}</StyledPageShellBody>
      {footer && <Box sx={{ flexShrink: 0 }}>{footer}</Box>}
    </StyledPageShellRoot>
  );
};

export default PageShellLayout;