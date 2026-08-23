import { Plus } from 'lucide-react';
import { StyledTitleBarRoot, StyledTitleText, StyledNewChatButton } from './TitleBar.section.styled.component';

interface TitleBarSectionProps {
	title: string;
	onStartNewChat: () => void;
}

function TitleBarSection({ title, onStartNewChat }: TitleBarSectionProps) {
	return (
		<StyledTitleBarRoot direction="row" spacing={1.5}>
			<StyledTitleText>{title}</StyledTitleText>
			<StyledNewChatButton onClick={onStartNewChat} startIcon={<Plus size={14} />}>
				Start New Chat
			</StyledNewChatButton>
		</StyledTitleBarRoot>
	);
}

export default TitleBarSection;
