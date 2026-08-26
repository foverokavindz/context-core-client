import AppCard from '../../../components/AppCard';
import StatTileSection from '../sections/shared/StatTile.section';
import { useSourceStats } from '../datasources.hooks';
import { toPendingSetupStat } from '../datasources.mappers';

function PendingSetupWidget() {
  const { stats } = useSourceStats();

  return (
    <AppCard>
      <StatTileSection stat={toPendingSetupStat(stats)} />
    </AppCard>
  );
}

export default PendingSetupWidget;
