import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { MessageSquare, Plus } from 'lucide-react';
import { CURRENT_USER } from '../../../configs/user.configs';
import {
	StyledNewChatRoot,
	StyledIconCircleBox,
	StyledWelcomeHeading,
	StyledWelcomeSubtitle,
	StyledStartButton,
	StyledStartErrorText,
} from './NewChat.screen.styled.component';

const SPINNER_SIZE = 15;

interface NewChatScreenProps {
	onStartNewChat: () => void;
	creating: boolean;
	error: string | null;
}

function NewChatScreen({ onStartNewChat, creating, error }: NewChatScreenProps) {
	return (
		<StyledNewChatRoot>
			<StyledIconCircleBox>
				<MessageSquare size={24} />
			</StyledIconCircleBox>
			<Stack sx={{ gap: 0.75 }}>
				<StyledWelcomeHeading>Welcome back, {CURRENT_USER.displayName}</StyledWelcomeHeading>
				<StyledWelcomeSubtitle>
					Ask anything about your organization's knowledge — code, tickets, docs and conversations, all in one place.
				</StyledWelcomeSubtitle>
			</Stack>
			<StyledStartButton
				onClick={onStartNewChat}
				disabled={creating}
				startIcon={creating ? <CircularProgress size={SPINNER_SIZE} color="inherit" /> : <Plus size={SPINNER_SIZE} />}
			>
				{creating ? 'Starting…' : 'Start New Chat'}
			</StyledStartButton>
			{error && <StyledStartErrorText>{error}</StyledStartErrorText>}
		</StyledNewChatRoot>
	);
}

export default NewChatScreen;
