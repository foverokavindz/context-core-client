import Stack from '@mui/material/Stack';
import AppCard from '../../../components/AppCard';
import { StyledLinkCardCopy, StyledLinkCardAction } from './LinkCard.widget.styled.component';

function SyncScheduleWidget() {
	return (
		<AppCard title="Sync Schedule">
			<Stack spacing={1} sx={{ minWidth: 0 }}>
				<StyledLinkCardCopy>Manage how often each source syncs data.</StyledLinkCardCopy>
				<StyledLinkCardAction href="#">Manage Schedules →</StyledLinkCardAction>
			</Stack>
		</AppCard>
	);
}

export default SyncScheduleWidget;
