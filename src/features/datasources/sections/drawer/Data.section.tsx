import Stack from '@mui/material/Stack';
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

interface DataSectionProps {
	stats: DataStat[];
	items: IndexedItem[];
}

/** Drawer tab 3 - what this source actually contributed to the index. */
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
					{items.map((item, index) => (
						<StyledIndexedRow
							key={item.name}
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
