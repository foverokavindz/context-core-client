import Stack from '@mui/material/Stack';
import AppCard from '../../../components/AppCard';
import { useDataSourcesContext } from '../context/DataSources.context';
import { RECOMMENDED_SOURCES } from '../datasources.mock';
import {
	StyledRecommendedRow,
	StyledRecommendedIconChip,
	StyledRecommendedName,
	StyledRecommendedDescription,
	StyledConnectButton,
} from './RecommendedSources.widget.styled.component';

const APP_ICON_SIZE = 15;

function RecommendedSourcesWidget() {
	const { openWizard } = useDataSourcesContext();

	return (
		<AppCard title="Recommended Sources">
			<Stack spacing={0.25} sx={{ minWidth: 0 }}>
				{RECOMMENDED_SOURCES.map((app, index) => {
					const AppIcon = app.icon;

					return (
						<StyledRecommendedRow
							key={app.key}
							direction="row"
							spacing={1.375}
							divided={index < RECOMMENDED_SOURCES.length - 1}
						>
							<StyledRecommendedIconChip>
								<AppIcon size={APP_ICON_SIZE} />
							</StyledRecommendedIconChip>
							<Stack spacing={0.125} sx={{ flex: 1, minWidth: 0 }}>
								<StyledRecommendedName>{app.name}</StyledRecommendedName>
								<StyledRecommendedDescription>{app.description}</StyledRecommendedDescription>
							</Stack>
							<StyledConnectButton onClick={() => openWizard(app.key)}>Connect</StyledConnectButton>
						</StyledRecommendedRow>
					);
				})}
			</Stack>
		</AppCard>
	);
}

export default RecommendedSourcesWidget;
