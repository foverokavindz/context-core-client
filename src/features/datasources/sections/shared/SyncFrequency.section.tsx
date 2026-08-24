import { SYNC_FREQUENCIES, SYNC_FREQUENCY_LABELS } from '../../datasources.mock';
import type { SyncFrequency } from '../../datasources.types';
import { StyledFrequencyGroup, StyledFrequencyButton } from './SyncFrequency.section.styled.component';

interface SyncFrequencySectionProps {
	value: SyncFrequency;
	onChange: (frequency: SyncFrequency) => void;
}

function SyncFrequencySection({ value, onChange }: SyncFrequencySectionProps) {
	return (
		<StyledFrequencyGroup
			exclusive
			value={value}
			onChange={(_event, next: SyncFrequency | null) => {
				if (next) onChange(next);
			}}
		>
			{SYNC_FREQUENCIES.map((frequency) => (
				<StyledFrequencyButton key={frequency} value={frequency}>
					{SYNC_FREQUENCY_LABELS[frequency]}
				</StyledFrequencyButton>
			))}
		</StyledFrequencyGroup>
	);
}

export default SyncFrequencySection;
