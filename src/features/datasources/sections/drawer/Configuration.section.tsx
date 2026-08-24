import Stack from '@mui/material/Stack';
import AppCard from '../../../../components/AppCard';
import CredentialFieldsSection from '../shared/CredentialFields.section';
import ScopeListSection from '../shared/ScopeList.section';
import SyncFrequencySection from '../shared/SyncFrequency.section';
import type { ScopeItem, SyncFrequency } from '../../datasources.types';
import { StyledSaveButton, StyledDisconnectButton } from './Configuration.section.styled.component';

const MASKED_TOKEN = 'ghp_••••••••••••3f2a';
const DEFAULT_WORKSPACE = 'ascentic-eng';

interface ConfigurationSectionProps {
	scope: ScopeItem[];
	syncFrequency: SyncFrequency;
	onToggleScopeItem: (name: string) => void;
	onChangeSyncFrequency: (frequency: SyncFrequency) => void;
}

/** Drawer tab 2 - the same credential and scope controls as the wizard, plus lifecycle actions. */
function ConfigurationSection({
	scope,
	syncFrequency,
	onToggleScopeItem,
	onChangeSyncFrequency,
}: ConfigurationSectionProps) {
	return (
		<Stack spacing={2.25} sx={{ minWidth: 0 }}>
			<AppCard title="Credentials">
				<CredentialFieldsSection
					showHeading={false}
					accessToken={MASKED_TOKEN}
					workspace={DEFAULT_WORKSPACE}
				/>
			</AppCard>
			<AppCard title="Scope">
				<ScopeListSection items={scope} onToggle={onToggleScopeItem} />
			</AppCard>
			<AppCard title="Sync frequency">
				<SyncFrequencySection value={syncFrequency} onChange={onChangeSyncFrequency} />
			</AppCard>
			<Stack direction="row" spacing={1.25} sx={{ flexWrap: 'wrap', minWidth: 0 }}>
				<StyledSaveButton>Save Changes</StyledSaveButton>
				<StyledDisconnectButton>Disconnect</StyledDisconnectButton>
			</Stack>
		</Stack>
	);
}

export default ConfigurationSection;
