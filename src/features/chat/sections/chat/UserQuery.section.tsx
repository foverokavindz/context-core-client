import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import InputBase from '@mui/material/InputBase';
import { Paperclip, Send } from 'lucide-react';
import { StyledUserQueryRoot, StyledAttachButton, StyledInputStack, StyledSendButton } from './UserQuery.section.styled.component';

interface UserQuerySectionProps {
	onSend: (question: string) => void;
}

function UserQuerySection({ onSend }: UserQuerySectionProps) {
	const [value, setValue] = useState('');

	const handleSend = () => {
		const trimmed = value.trim();
		if (!trimmed) return;
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
			<StyledAttachButton aria-label="Attach file">
				<Paperclip size={16} />
			</StyledAttachButton>
			<StyledInputStack direction="row">
				<InputBase
					fullWidth
					placeholder="Ask about your organization's knowledge..."
					value={value}
					onChange={(event) => setValue(event.target.value)}
					onKeyDown={handleKeyDown}
					sx={{ fontSize: 14, color: 'text.primary' }}
				/>
			</StyledInputStack>
			<StyledSendButton aria-label="Send message" onClick={handleSend} disabled={!value.trim()}>
				<Send size={15} />
			</StyledSendButton>
		</StyledUserQueryRoot>
	);
}

export default UserQuerySection;
