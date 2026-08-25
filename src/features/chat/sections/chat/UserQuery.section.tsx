import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Paperclip, Send } from 'lucide-react';
import { StyledUserQueryRoot, StyledAttachButton, StyledInputStack, StyledSendButton, StyledQueryInput } from './UserQuery.section.styled.component';

const SPINNER_SIZE = 15;

interface UserQuerySectionProps {
	onSend: (question: string) => void;
	sending: boolean;
}

function UserQuerySection({ onSend, sending }: UserQuerySectionProps) {
	const [value, setValue] = useState('');

	const handleSend = () => {
		const trimmed = value.trim();
		if (!trimmed || sending) return;
		onSend(trimmed);
		setValue('');
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleSend();
		}
	};

	return (
		<StyledUserQueryRoot direction="row" spacing={1.25}>
			<StyledAttachButton aria-label="Attach file" disabled={sending}>
				<Paperclip size={16} />
			</StyledAttachButton>
			<StyledInputStack direction="row">
				<StyledQueryInput
					fullWidth
					disabled={sending}
					placeholder={sending ? 'Waiting for an answer…' : "Ask about your organization's knowledge..."}
					value={value}
					onChange={(event) => setValue(event.target.value)}
					onKeyDown={handleKeyDown}
				/>
			</StyledInputStack>
			<StyledSendButton aria-label="Send message" onClick={handleSend} disabled={sending || !value.trim()}>
				{sending ? <CircularProgress size={SPINNER_SIZE} color="inherit" /> : <Send size={SPINNER_SIZE} />}
			</StyledSendButton>
		</StyledUserQueryRoot>
	);
}

export default UserQuerySection;
