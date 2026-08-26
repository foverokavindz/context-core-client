import Stack from '@mui/material/Stack';
import AppCard from '../../../components/AppCard';
import { useDataSourcesContext } from '../context/DataSources.context';
import {
	StyledRecommendedRow,
	StyledRecommendedIconChip,
	StyledRecommendedName,
	StyledRecommendedDescription,
	StyledConnectButton,
} from './RecommendedSources.widget.styled.component';

const APP_ICON_SIZE = 15;
const RECOMMENDED_COUNT = 3;

function RecommendedSourcesWidget() {
	const { catalog, openWizard } = useDataSourcesContext();
	const recommended = catalog.slice(0, RECOMMENDED_COUNT);

	return (
		<AppCard title="Recommended Sources">
			<Stack spacing={0.25} sx={{ minWidth: 0 }}>
				{recommended.map((entry, index) => {
					const AppIcon = entry.icon;

					return (
						<StyledRecommendedRow
							key={entry.sourceType}
							direction="row"
							spacing={1.375}
							divided={index < recommended.length - 1}
						>
							<StyledRecommendedIconChip>
								<AppIcon size={APP_ICON_SIZE} />
							</StyledRecommendedIconChip>
							<Stack spacing={0.125} sx={{ flex: 1, minWidth: 0 }}>
								<StyledRecommendedName>{entry.name}</StyledRecommendedName>
								<StyledRecommendedDescription>{entry.description}</StyledRecommendedDescription>
							</Stack>
							<StyledConnectButton onClick={() => openWizard(entry.sourceType)}>
								Connect
							</StyledConnectButton>
						</StyledRecommendedRow>
					);
				})}
			</Stack>
		</AppCard>
	);
}

export default RecommendedSourcesWidget;
