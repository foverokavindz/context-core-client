import AppCard from '../../../components/AppCard';
import StatTileSection from '../sections/shared/StatTile.section';
import { CONNECTED_SOURCES_STAT } from '../datasources.mock';

function ConnectedSourcesWidget() {
  return (
    <AppCard>
      <StatTileSection stat={CONNECTED_SOURCES_STAT} />
    </AppCard>
  );
}

export default ConnectedSourcesWidget;
