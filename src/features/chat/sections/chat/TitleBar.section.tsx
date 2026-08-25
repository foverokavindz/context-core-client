import CircularProgress from '@mui/material/CircularProgress';
import { Plus } from 'lucide-react';
import { StyledTitleBarRoot, StyledTitleText, StyledNewChatButton } from './TitleBar.section.styled.component';

const ICON_SIZE = 14;

interface TitleBarSectionProps {
	title: string;
	onStartNewChat: () => void;
	creating: boolean;
}

function TitleBarSection({ title, onStartNewChat, creating }: TitleBarSectionProps) {
	return (
		<StyledTitleBarRoot direction="row" spacing={1.5}>
			<StyledTitleText>{title}</StyledTitleText>
			<StyledNewChatButton
				onClick={onStartNewChat}
				disabled={creating}
				startIcon={creating ? <CircularProgress size={ICON_SIZE} color="inherit" /> : <Plus size={ICON_SIZE} />}
			>
				Start New Chat
			</StyledNewChatButton>
		</StyledTitleBarRoot>
	);
}

export default TitleBarSection;
