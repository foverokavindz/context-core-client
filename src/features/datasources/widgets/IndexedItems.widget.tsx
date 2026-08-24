import AppCard from '../../../components/AppCard';
import StatTileSection from '../sections/shared/StatTile.section';
import { INDEXED_ITEMS_STAT } from '../datasources.mock';

/** KPI tile for the total number of indexed items. */
function IndexedItemsWidget() {
	return (
		<AppCard>
			<StatTileSection stat={INDEXED_ITEMS_STAT} />
		</AppCard>
	);
}

export default IndexedItemsWidget;
