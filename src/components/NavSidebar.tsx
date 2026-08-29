import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PanelLeft, Database } from 'lucide-react';
import { NAV_SECTIONS } from '../configs/Navigation.configs';
import {
  StyledSidebarRoot,
  StyledHeaderStack,
  StyledLogoBox,
  StyledTitleTypography,
  StyledCollapseButton,
  StyledNavBox,
  StyledSectionLabel,
  StyledNavItemButton,
  StyledFooterBox,
  StyledIndexedHeaderStack,
  StyledIndexedProgress,
  StyledUpgradeLink,
  StyledAvatarBox,
} from './styled/NavSidebar.styled.component';
import logoSqure from "../assets/logo.png"

const INDEXED_PCT = 64;
const INDEXED_LABEL = '128,450 of 200,000 items';

function NavSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();
  const location = useLocation();

  return (
    <StyledSidebarRoot component="aside" collapsed={collapsed}>
      <StyledHeaderStack direction="row" spacing={1.25}>
        <img src={logoSqure} alt="Context Logo" style={{ height: 30, width: 'auto' }} />
        {!collapsed && (
          <StyledTitleTypography noWrap sx={{ color: 'text.primary' }}>
            Context Core
          </StyledTitleTypography>
        )}
        <StyledCollapseButton onClick={() => setCollapsed((c) => !c)} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          <PanelLeft size={15} />
        </StyledCollapseButton>
      </StyledHeaderStack>

      <StyledNavBox component="nav">
        {NAV_SECTIONS.map((section, sectionIndex) => (
          <Box key={section.label ?? `section-${sectionIndex}`}>
            {section.label && !collapsed && <StyledSectionLabel>{section.label}</StyledSectionLabel>}
            {section.items.map((item) => {
              const active = location.pathname.startsWith(item.path);
              return (
                <StyledNavItemButton key={item.path} component={RouterLink} to={item.path} active={active}>
                  <Box sx={{ display: 'inline-flex', flexShrink: 0, color: active ? 'accent.dark' : theme.tokens.ink3 }}>{item.icon}</Box>
                  {!collapsed && <Box component="span">{item.label}</Box>}
                </StyledNavItemButton>
              );
            })}
          </Box>
        ))}
      </StyledNavBox>

      <StyledFooterBox>
        {!collapsed ? (
          <Stack spacing={1}>
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <StyledIndexedHeaderStack direction="row" spacing={0.75}>
                <Database size={13} color={theme.tokens.ink3} />
                <span>Indexed Items</span>
              </StyledIndexedHeaderStack>
              <Typography sx={{ fontSize: theme.tokens.fontSize.xs, color: 'text.secondary' }}>{INDEXED_PCT}%</Typography>
            </Stack>
            <StyledIndexedProgress variant="determinate" value={INDEXED_PCT} />
            <Typography sx={{ fontSize: theme.tokens.fontSize['2xs'], color: 'text.secondary' }}>{INDEXED_LABEL}</Typography>
            <StyledUpgradeLink component="a" href="#">
              Upgrade plan →
            </StyledUpgradeLink>
          </Stack>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <StyledAvatarBox>
              <Database size={15} />
            </StyledAvatarBox>
          </Box>
        )}
      </StyledFooterBox>
    </StyledSidebarRoot>
  );
}

export default NavSidebar;
