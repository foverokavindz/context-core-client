import AppCard from '../../../components/AppCard';
import StatTileSection from '../sections/shared/StatTile.section';
import { PENDING_SETUP_STAT } from '../datasources.mock';

/** KPI tile for sources still waiting on setup. */
function PendingSetupWidget() {
	return (
		<AppCard>
			<StatTileSection stat={PENDING_SETUP_STAT} />
		</AppCard>
	);
}

export default PendingSetupWidget;
