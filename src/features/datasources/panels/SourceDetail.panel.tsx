import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { X } from 'lucide-react';
import { getSourceConfig } from '../../../configs/datasource.configs';
import { useDataSourcesContext } from '../context/DataSources.context';
import { toDataStats, toIndexedItems } from '../datasources.mappers';
import type { DataSourceStatus, DrawerTab } from '../datasources.types';
import IngestionSection from '../sections/drawer/Ingestion.section';
import ConfigurationSection from '../sections/drawer/Configuration.section';
import DataSection from '../sections/drawer/Data.section';
import {
	StyledSourceDrawer,
	StyledDrawerHeader,
	StyledDrawerIconChip,
	StyledDrawerTitle,
	StyledDrawerStatusPill,
	StyledDrawerStatusDot,
	StyledDrawerSubtitle,
	StyledDrawerCloseButton,
	StyledDrawerTabs,
	StyledDrawerTab,
	StyledDrawerBody,
} from './SourceDetail.panel.styled.component';

const SOURCE_ICON_SIZE = 21;
const CLOSE_ICON_SIZE = 16;

const TABS: { value: DrawerTab; label: string }[] = [
	{ value: 'ingestion', label: 'Ingestion' },
	{ value: 'configuration', label: 'Configuration' },
	{ value: 'data', label: 'Data' },
];

const STATUS_LABELS: Record<DataSourceStatus, string> = {
	connected: 'Connected',
	syncing: 'Syncing',
	'needs-setup': 'Needs setup',
	failed: 'Failed',
};

function SourceDetailPanel() {
	const {
		scope,
		syncFrequency,
		drawerOpen,
		drawerSource,
		drawerDetail,
		drawerRuns,
		drawerResources,
		drawerError,
		drawerTab,
		closeDrawer,
		setDrawerTab,
		toggleScopeItem,
		setSyncFrequency,
	} = useDataSourcesContext();

	if (!drawerSource) return null;

	const SourceIcon = drawerSource.icon;
	const entry = getSourceConfig(drawerSource.sourceType);

	return (
		<StyledSourceDrawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
			<StyledDrawerHeader direction="row" spacing={1.625}>
				<StyledDrawerIconChip>
					<SourceIcon size={SOURCE_ICON_SIZE} />
				</StyledDrawerIconChip>
				<Stack sx={{ flex: 1, minWidth: 0 }}>
					<Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
						<StyledDrawerTitle>{drawerSource.name}</StyledDrawerTitle>
						<StyledDrawerStatusPill direction="row" spacing={0.625} status={drawerSource.status}>
							<StyledDrawerStatusDot />
							{STATUS_LABELS[drawerSource.status]}
						</StyledDrawerStatusPill>
					</Stack>
					<StyledDrawerSubtitle>Last sync {drawerSource.syncLabel}</StyledDrawerSubtitle>
				</Stack>
				<StyledDrawerCloseButton aria-label="Close source details" onClick={closeDrawer}>
					<X size={CLOSE_ICON_SIZE} />
				</StyledDrawerCloseButton>
			</StyledDrawerHeader>

			<StyledDrawerTabs
				value={drawerTab}
				onChange={(_event, next: DrawerTab) => setDrawerTab(next)}
			>
				{TABS.map((tab) => (
					<StyledDrawerTab key={tab.value} value={tab.value} label={tab.label} />
				))}
			</StyledDrawerTabs>

			<StyledDrawerBody>
				{drawerError && (
					<Typography sx={{ fontSize: 'body2.fontSize', color: 'error.main' }}>{drawerError}</Typography>
				)}
				{drawerTab === 'ingestion' && <IngestionSection runs={drawerRuns} />}
				{drawerTab === 'configuration' && entry && (
					<ConfigurationSection
						entry={entry}
						detail={drawerDetail}
						scope={scope}
						syncFrequency={syncFrequency}
						onToggleScopeItem={toggleScopeItem}
						onChangeSyncFrequency={setSyncFrequency}
					/>
				)}
				{drawerTab === 'data' && (
					<DataSection stats={toDataStats(drawerDetail)} items={toIndexedItems(drawerResources)} />
				)}
			</StyledDrawerBody>
		</StyledSourceDrawer>
	);
}

export default SourceDetailPanel;
