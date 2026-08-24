import SourceStatsWidget from '../widgets/SourceStats.widget';
import DataSourcesTableWidget from '../widgets/DataSourcesTable.widget';
import RecommendedSourcesWidget from '../widgets/RecommendedSources.widget';
import SyncScheduleWidget from '../widgets/SyncSchedule.widget';
import NeedHelpWidget from '../widgets/NeedHelp.widget';
import AddSourcePanel from './AddSource.panel';
import SourceDetailPanel from './SourceDetail.panel';
import {
  StyledDataSourcesRoot,
  StyledMainColumn,
  StyledRailColumn,
} from './DataSources.panel.styled.component';

function DataSourcesPanel() {
  return (
    <>
      <StyledDataSourcesRoot>
        <StyledMainColumn>
          <SourceStatsWidget />
          <DataSourcesTableWidget />
        </StyledMainColumn>
        <StyledRailColumn>
          <RecommendedSourcesWidget />
          <SyncScheduleWidget />
          <NeedHelpWidget />
        </StyledRailColumn>
      </StyledDataSourcesRoot>

      <AddSourcePanel />
      <SourceDetailPanel />
    </>
  );
}

export default DataSourcesPanel;
