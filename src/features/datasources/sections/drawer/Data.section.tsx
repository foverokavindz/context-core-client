import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AppCard from '../../../../components/AppCard';
import type { DataStat, IndexedItem } from '../../datasources.types';
import {
  StyledDataStatsGrid,
  StyledDataStatTile,
  StyledDataStatLabel,
  StyledDataStatValue,
  StyledIndexedRow,
  StyledIndexedName,
  StyledIndexedMeta,
  StyledIndexedChunks,
} from './Data.section.styled.component';

const NO_ITEMS = 'Nothing indexed from this source yet.';

interface DataSectionProps {
  stats: DataStat[];
  items: IndexedItem[];
}

function DataSection({ stats, items }: DataSectionProps) {
  return (
    <Stack spacing={2.25} sx={{ minWidth: 0 }}>
      <StyledDataStatsGrid>
        {stats.map((stat) => (
          <StyledDataStatTile key={stat.label}>
            <StyledDataStatLabel>{stat.label}</StyledDataStatLabel>
            <StyledDataStatValue>{stat.value}</StyledDataStatValue>
          </StyledDataStatTile>
        ))}
      </StyledDataStatsGrid>
      <AppCard title="Indexed Items">
        <Stack sx={{ minWidth: 0 }}>
          {items.length === 0 && (
            <Typography sx={{ fontSize: 'body2.fontSize', color: 'text.secondary' }}>{NO_ITEMS}</Typography>
          )}
          {items.map((item, index) => (
            <StyledIndexedRow
              key={item.id}
              direction="row"
              spacing={1.25}
              divided={index < items.length - 1}
            >
              <Stack sx={{ flex: 1, minWidth: 0 }}>
                <StyledIndexedName>{item.name}</StyledIndexedName>
                <StyledIndexedMeta>{item.meta}</StyledIndexedMeta>
              </Stack>
              <StyledIndexedChunks>{item.chunks} chunks</StyledIndexedChunks>
            </StyledIndexedRow>
          ))}
        </Stack>
      </AppCard>
    </Stack>
  );
}

export default DataSection;
