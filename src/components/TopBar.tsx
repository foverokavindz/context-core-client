import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Briefcase, ChevronDown, Search, Command, Bell, HelpCircle } from 'lucide-react';
import {
  StyledTopBarRoot,
  StyledOrgButton,
  StyledOrgIconBox,
  StyledOrgName,
  StyledSearchBar,
  StyledSearchInput,
  StyledKbdBadge,
  StyledIconButton,
  StyledNotificationBadge,
  StyledDivider,
  StyledUserButton,
  StyledUserAvatar,
  StyledUserName,
  StyledUserRole,
} from './styled/TopBar.styled.component';

const ORG_NAME = 'Ascentic Engineering';
const USER_NAME = 'Kavinda';
const USER_ROLE = 'Super Admin';
const NOTIFICATION_COUNT = 3;

function TopBar() {
  const theme = useTheme();

  return (
    <StyledTopBarRoot direction="row" spacing={2}>
      <Stack direction="row" spacing={2} sx={{ flex: 1, alignItems: 'center' }}>
        <StyledOrgButton>
          <StyledOrgIconBox>
            <Briefcase size={12} />
          </StyledOrgIconBox>
          <StyledOrgName noWrap>{ORG_NAME}</StyledOrgName>
          <ChevronDown size={14} color={theme.tokens.ink3} />
        </StyledOrgButton>

        <Stack direction="row" sx={{ flex: 1, alignItems: 'center' }}>
          <StyledSearchBar direction="row" spacing={1}>
            <Search size={15} color={theme.tokens.ink3} style={{ flexShrink: 0 }} />
            <StyledSearchInput placeholder="Search agents, tasks, sources..." />
            <StyledKbdBadge direction="row" spacing={0.25}>
              <Command size={11} />
              <span>K</span>
            </StyledKbdBadge>
          </StyledSearchBar>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ flexShrink: 0, alignItems: 'center' }}>
        <StyledIconButton aria-label="Notifications">
          <StyledNotificationBadge badgeContent={NOTIFICATION_COUNT}>
            <Bell size={17} />
          </StyledNotificationBadge>
        </StyledIconButton>
        <StyledIconButton aria-label="Help">
          <HelpCircle size={17} />
        </StyledIconButton>
        <StyledDivider />
        <StyledUserButton>
          <StyledUserAvatar>{USER_NAME.charAt(0)}</StyledUserAvatar>
          <Stack sx={{ alignItems: 'flex-start' }}>
            <StyledUserName noWrap>{USER_NAME}</StyledUserName>
            <StyledUserRole noWrap>{USER_ROLE}</StyledUserRole>
          </Stack>
          <ChevronDown size={13} color={theme.tokens.ink3} />
        </StyledUserButton>
      </Stack>
    </StyledTopBarRoot>
  );
}

export default TopBar;
