import Stack from '@mui/material/Stack';
import AppCard from '../../../components/AppCard';
import { StyledLinkCardCopy, StyledLinkCardAction } from './LinkCard.widget.styled.component';

function NeedHelpWidget() {
	return (
		<AppCard title="Need Help?">
			<Stack spacing={1} sx={{ minWidth: 0 }}>
				<StyledLinkCardCopy>Learn how to connect and troubleshoot integrations.</StyledLinkCardCopy>
				<StyledLinkCardAction href="#">View Documentation →</StyledLinkCardAction>
			</Stack>
		</AppCard>
	);
}

export default NeedHelpWidget;
