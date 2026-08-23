import Typography from '@mui/material/Typography';
import { StyledComingSoonRoot } from './ComingSoonPlaceholder.styled.component';

interface ComingSoonPlaceholderProps {
	label: string;
}

function ComingSoonPlaceholder({ label }: ComingSoonPlaceholderProps) {
	return (
		<StyledComingSoonRoot>
			<Typography color="text.secondary">{label} content is coming soon.</Typography>
		</StyledComingSoonRoot>
	);
}

export default ComingSoonPlaceholder;
