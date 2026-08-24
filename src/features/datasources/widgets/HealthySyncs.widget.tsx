import AppCard from '../../../components/AppCard';
import StatTileSection from '../sections/shared/StatTile.section';
import { HEALTHY_SYNCS_STAT } from '../datasources.mock';

/** KPI tile for how many sources are syncing healthily. */
function HealthySyncsWidget() {
	return (
		<AppCard>
			<StatTileSection stat={HEALTHY_SYNCS_STAT} />
		</AppCard>
	);
}

export default HealthySyncsWidget;
