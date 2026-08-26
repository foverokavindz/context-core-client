import AppCard from '../../../components/AppCard';
import StatTileSection from '../sections/shared/StatTile.section';
import { useSourceStats } from '../datasources.hooks';
import { toIndexedItemsStat } from '../datasources.mappers';

/** KPI tile for the total number of indexed items. */
function IndexedItemsWidget() {
	const { stats } = useSourceStats();

	return (
		<AppCard>
			<StatTileSection stat={toIndexedItemsStat(stats)} />
		</AppCard>
	);
}

export default IndexedItemsWidget;
