import AppCard from '../../../components/AppCard';
import StatTileSection from '../sections/shared/StatTile.section';
import { useSourceStats } from '../datasources.hooks';
import { toConnectedSourcesStat } from '../datasources.mappers';

/** KPI tile for how many sources are connected and have synced at least once. */
function ConnectedSourcesWidget() {
	const { stats } = useSourceStats();

	return (
		<AppCard>
			<StatTileSection stat={toConnectedSourcesStat(stats)} />
		</AppCard>
	);
}

export default ConnectedSourcesWidget;
