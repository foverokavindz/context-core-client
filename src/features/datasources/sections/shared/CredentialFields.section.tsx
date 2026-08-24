import Stack from '@mui/material/Stack';
import { Key } from 'lucide-react';
import {
	StyledSectionChip,
	StyledSectionHeading,
	StyledFieldGrid,
	StyledCredentialField,
} from './CredentialFields.section.styled.component';

const CHIP_ICON_SIZE = 12;

interface CredentialFieldsSectionProps {
	accessToken?: string;
	workspace?: string;
	/** The wizard labels the group inline; the drawer already has a card title above it. */
	showHeading?: boolean;
}

/** Access token + workspace pair, shared by the wizard's configure step and the drawer. */
function CredentialFieldsSection({ accessToken, workspace, showHeading = true }: CredentialFieldsSectionProps) {
	return (
		<Stack spacing={1.5} sx={{ minWidth: 0 }}>
			{showHeading && (
				<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
					<StyledSectionChip>
						<Key size={CHIP_ICON_SIZE} />
					</StyledSectionChip>
					<StyledSectionHeading>Connection Details</StyledSectionHeading>
				</Stack>
			)}
			<StyledFieldGrid>
				<StyledCredentialField
					label="Access Token"
					placeholder="Paste a read-only token"
					defaultValue={accessToken}
				/>
				<StyledCredentialField
					label="Workspace / Organization"
					placeholder="ascentic-eng"
					defaultValue={workspace}
				/>
			</StyledFieldGrid>
		</Stack>
	);
}

export default CredentialFieldsSection;
