import Stack from '@mui/material/Stack';
import { MessageSquare, Plus } from 'lucide-react';
import { CHAT_USER_NAME } from '../chat.mock';
import {
	StyledNewChatRoot,
	StyledIconCircleBox,
	StyledWelcomeHeading,
	StyledWelcomeSubtitle,
	StyledStartButton,
} from './NewChat.screen.styled.component';

interface NewChatScreenProps {
	onStartNewChat: () => void;
}

function NewChatScreen({ onStartNewChat }: NewChatScreenProps) {
	return (
		<StyledNewChatRoot>
			<StyledIconCircleBox>
				<MessageSquare size={24} />
			</StyledIconCircleBox>
			<Stack sx={{ gap: 0.75 }}>
				<StyledWelcomeHeading>Welcome back, {CHAT_USER_NAME}</StyledWelcomeHeading>
				<StyledWelcomeSubtitle>
					Ask anything about your organization's knowledge — code, tickets, docs and conversations, all in one place.
				</StyledWelcomeSubtitle>
			</Stack>
			<StyledStartButton onClick={onStartNewChat} startIcon={<Plus size={15} />}>
				Start New Chat
			</StyledStartButton>
		</StyledNewChatRoot>
	);
}

export default NewChatScreen;
