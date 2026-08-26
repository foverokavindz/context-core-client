import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { MoreHorizontal, Plus, RefreshCw } from 'lucide-react';
import AppCard from '../../../components/AppCard';
import { useDataSourcesContext } from '../context/DataSources.context';
import type { DataSourceStatus } from '../datasources.types';
import {
  StyledTableScroller,
  StyledSourcesTable,
  StyledHeaderCell,
  StyledBodyCell,
  StyledSourceIconChip,
  StyledSourceName,
  StyledTypePill,
  StyledStatusDot,
  StyledStatusLabel,
  StyledMetaText,
  StyledIndexedPrimary,
  StyledIndexedSecondary,
  StyledRowMenuButton,
  StyledRowActionButton,
} from './DataSourcesTable.widget.styled.component';

const SOURCE_ICON_SIZE = 15;
const ACTION_ICON_SIZE = 13;

const COLUMNS = ['Source', 'Type', 'Status', 'Last Sync', 'Data Indexed', 'Actions'];

const EMPTY_MESSAGE = 'No sources connected yet. Add one to start building your index.';

const STATUS_LABELS: Record<DataSourceStatus, string> = {
  connected: 'Connected',
  syncing: 'Syncing',
  'needs-setup': 'Needs setup',
  failed: 'Failed',
};

function DataSourcesTableWidget() {
  const { sources, sourcesLoading, sourcesError, openDrawer } = useDataSourcesContext();

  if (sourcesLoading && sources.length === 0) {
    return (
      <AppCard title="Your Data Sources">
        <Stack sx={{ alignItems: 'center', py: 4 }}>
          <CircularProgress size={24} />
        </Stack>
      </AppCard>
    );
  }

  if (sourcesError) {
    return (
      <AppCard title="Your Data Sources">
        <Typography sx={{ fontSize: 'body2.fontSize', color: 'error.main' }}>{sourcesError}</Typography>
      </AppCard>
    );
  }

  if (sources.length === 0) {
    return (
      <AppCard title="Your Data Sources">
        <Typography sx={{ fontSize: 'body2.fontSize', color: 'text.secondary' }}>{EMPTY_MESSAGE}</Typography>
      </AppCard>
    );
  }

  return (
    <AppCard title="Your Data Sources">
      <StyledTableScroller>
        <StyledSourcesTable>
          <TableHead>
            <TableRow>
              {COLUMNS.map((column) => (
                <StyledHeaderCell key={column}>{column}</StyledHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sources.map((source) => {
              const SourceIcon = source.icon;
              const needsSetup = source.status === 'needs-setup';

              return (
                <TableRow key={source.key}>
                  <StyledBodyCell>
                    <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center', minWidth: 0 }}>
                      <StyledSourceIconChip>
                        <SourceIcon size={SOURCE_ICON_SIZE} />
                      </StyledSourceIconChip>
                      <StyledSourceName>{source.name}</StyledSourceName>
                    </Stack>
                  </StyledBodyCell>
                  <StyledBodyCell>
                    <StyledTypePill>{source.type}</StyledTypePill>
                  </StyledBodyCell>
                  <StyledBodyCell>
                    <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
                      <StyledStatusDot status={source.status} />
                      <StyledStatusLabel status={source.status}>
                        {STATUS_LABELS[source.status]}
                      </StyledStatusLabel>
                    </Stack>
                  </StyledBodyCell>
                  <StyledBodyCell>
                    <StyledMetaText>{source.syncLabel}</StyledMetaText>
                  </StyledBodyCell>
                  <StyledBodyCell>
                    <Stack sx={{ minWidth: 0 }}>
                      <StyledIndexedPrimary>{source.dataIndexed}</StyledIndexedPrimary>
                      <StyledIndexedSecondary>{source.dataSecondary}</StyledIndexedSecondary>
                    </Stack>
                  </StyledBodyCell>
                  <StyledBodyCell>
                    <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
                      <StyledRowMenuButton
                        aria-label={`Manage ${source.name}`}
                        onClick={() => openDrawer(source.key)}
                      >
                        <MoreHorizontal size={SOURCE_ICON_SIZE} />
                      </StyledRowMenuButton>
                      <StyledRowActionButton
                        onClick={() => openDrawer(source.key)}
                        startIcon={
                          needsSetup ? (
                            <Plus size={ACTION_ICON_SIZE} />
                          ) : (
                            <RefreshCw size={ACTION_ICON_SIZE} />
                          )
                        }
                      >
                        {needsSetup ? 'Connect' : 'View Runs'}
                      </StyledRowActionButton>
                    </Stack>
                  </StyledBodyCell>
                </TableRow>
              );
            })}
          </TableBody>
        </StyledSourcesTable>
      </StyledTableScroller>
    </AppCard>
  );
}

export default DataSourcesTableWidget;
