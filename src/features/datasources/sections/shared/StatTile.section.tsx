import Stack from '@mui/material/Stack';
import type { SourceStat } from '../../datasources.types';
import {
  StyledStatIconChip,
  StyledStatValue,
  StyledStatLabel,
  StyledStatCaption,
} from './StatTile.section.styled.component';

const STAT_ICON_SIZE = 16;

interface StatTileSectionProps {
  stat: SourceStat;
}

function StatTileSection({ stat }: StatTileSectionProps) {
  const StatIcon = stat.icon;

  return (
    <Stack spacing={1.75} sx={{ minWidth: 0 }}>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <StyledStatIconChip>
          <StatIcon size={STAT_ICON_SIZE} />
        </StyledStatIconChip>
        <StyledStatValue>{stat.value}</StyledStatValue>
      </Stack>
      <Stack spacing={0.25} sx={{ minWidth: 0 }}>
        <StyledStatLabel>{stat.label}</StyledStatLabel>
        <StyledStatCaption>{stat.caption}</StyledStatCaption>
      </Stack>
    </Stack>
  );
}

export default StatTileSection;
