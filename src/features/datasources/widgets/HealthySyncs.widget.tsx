import AppCard from '../../../components/AppCard';
import StatTileSection from '../sections/shared/StatTile.section';
import { useSourceStats } from '../datasources.hooks';
import { toHealthySyncsStat } from '../datasources.mappers';

/** KPI tile for how many sources are syncing healthily. */
function HealthySyncsWidget() {
	const { stats } = useSourceStats();

	return (
		<AppCard>
			<StatTileSection stat={toHealthySyncsStat(stats)} />
		</AppCard>
	);
}

export default HealthySyncsWidget;
