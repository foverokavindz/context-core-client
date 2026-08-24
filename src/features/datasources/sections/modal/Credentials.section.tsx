import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Layers, RefreshCw } from 'lucide-react';
import CredentialFieldsSection from '../shared/CredentialFields.section';
import ScopeListSection from '../shared/ScopeList.section';
import SyncFrequencySection from '../shared/SyncFrequency.section';
import {
	StyledSectionChip,
	StyledSectionHeading,
} from '../shared/CredentialFields.section.styled.component';
import type { ScopeItem, SyncFrequency } from '../../datasources.types';

const CHIP_ICON_SIZE = 12;

interface CredentialsSectionProps {
	scope: ScopeItem[];
	syncFrequency: SyncFrequency;
	onToggleScopeItem: (name: string) => void;
	onChangeSyncFrequency: (frequency: SyncFrequency) => void;
}

/** Wizard step 2 - credentials, what to index, and how often to re-index. */
function CredentialsSection({
	scope,
	syncFrequency,
	onToggleScopeItem,
	onChangeSyncFrequency,
}: CredentialsSectionProps) {
	const selectedCount = scope.filter((item) => item.selected).length;

	return (
		<Stack spacing={2} sx={{ minWidth: 0 }}>
			<CredentialFieldsSection />

			<Divider />

			<Stack spacing={1.25} sx={{ minWidth: 0 }}>
				<Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
					<Stack direction="row" spacing={1} sx={{ alignItems: 'center', minWidth: 0 }}>
						<StyledSectionChip>
							<Layers size={CHIP_ICON_SIZE} />
						</StyledSectionChip>
						<StyledSectionHeading>Scope to Index</StyledSectionHeading>
					</Stack>
					<Typography sx={{ fontSize: 'caption.fontSize', color: 'text.secondary' }}>
						{selectedCount} selected
					</Typography>
				</Stack>
				<ScopeListSection bordered items={scope} onToggle={onToggleScopeItem} />
			</Stack>

			<Divider />

			<Stack spacing={1.25} sx={{ minWidth: 0 }}>
				<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
					<StyledSectionChip>
						<RefreshCw size={CHIP_ICON_SIZE} />
					</StyledSectionChip>
					<StyledSectionHeading>Sync Frequency</StyledSectionHeading>
				</Stack>
				<SyncFrequencySection value={syncFrequency} onChange={onChangeSyncFrequency} />
			</Stack>
		</Stack>
	);
}

export default CredentialsSection;
