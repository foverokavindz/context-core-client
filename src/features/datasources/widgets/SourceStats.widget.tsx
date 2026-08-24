import ConnectedSourcesWidget from './ConnectedSources.widget';
import HealthySyncsWidget from './HealthySyncs.widget';
import PendingSetupWidget from './PendingSetup.widget';
import IndexedItemsWidget from './IndexedItems.widget';
import { StyledStatsGrid } from './SourceStats.widget.styled.component';

/**
 * Lays out the KPI row across the top of the page. Each tile is its own widget
 * so it can own its data fetching independently — register new ones here.
 */
function SourceStatsWidget() {
	return (
		<StyledStatsGrid>
			<ConnectedSourcesWidget />
			<HealthySyncsWidget />
			<PendingSetupWidget />
			<IndexedItemsWidget />
		</StyledStatsGrid>
	);
}

export default SourceStatsWidget;
