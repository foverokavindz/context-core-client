import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AppCard from '../../../../components/AppCard';
import CredentialFieldsSection from '../shared/CredentialFields.section';
import ScopeListSection from '../shared/ScopeList.section';
import SyncFrequencySection from '../shared/SyncFrequency.section';
import type { SourceCatalogEntry } from '../../../../configs/datasource.configs';
import type { DataSourceDetail } from '../../../../types/dataSource.types';
import type { CredentialForm, ScopeItem, SyncFrequency } from '../../datasources.types';
import { StyledSaveButton, StyledDisconnectButton } from './Configuration.section.styled.component';

const MASKED_TOKEN = '••••••••••••••••';

const READ_ONLY_NOTE = 'Editing a stored connection is not available yet.';

interface ConfigurationSectionProps {
  entry: SourceCatalogEntry;
  detail: DataSourceDetail | null;
  scope: ScopeItem[];
  syncFrequency: SyncFrequency;
  onToggleScopeItem: (name: string) => void;
  onChangeSyncFrequency: (frequency: SyncFrequency) => void;
}

/** Drawer tab 2 - the connection as it was stored, plus lifecycle actions. */
function ConfigurationSection({
  entry,
  detail,
  scope,
  syncFrequency,
  onToggleScopeItem,
  onChangeSyncFrequency,
}: ConfigurationSectionProps) {
  const form: CredentialForm = {
    title: detail?.name ?? '',
    config: detail?.config ?? {},
    token: detail?.has_token ? MASKED_TOKEN : '',
  };

  return (
    <Stack spacing={2.25} sx={{ minWidth: 0 }}>
      <AppCard title="Credentials">
        <Stack spacing={1.25} sx={{ minWidth: 0 }}>
          <CredentialFieldsSection entry={entry} form={form} readOnly showHeading={false} />
          <Typography sx={{ fontSize: 'caption.fontSize', color: 'text.secondary' }}>
            {READ_ONLY_NOTE}
          </Typography>
        </Stack>
      </AppCard>
      <AppCard title="Scope">
        <ScopeListSection items={scope} onToggle={onToggleScopeItem} />
      </AppCard>
      <AppCard title="Sync frequency">
        <SyncFrequencySection value={syncFrequency} onChange={onChangeSyncFrequency} />
      </AppCard>
      <Stack direction="row" spacing={1.25} sx={{ flexWrap: 'wrap', minWidth: 0 }}>
        <StyledSaveButton disabled>Save Changes</StyledSaveButton>
        <StyledDisconnectButton disabled>Disconnect</StyledDisconnectButton>
      </Stack>
    </Stack>
  );
}

export default ConfigurationSection;
