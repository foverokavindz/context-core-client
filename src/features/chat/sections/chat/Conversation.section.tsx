import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Cpu, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { CHAT_USER_NAME } from '../../chat.mock';
import type { ChatConversationData, ChatTraceStep } from '../../chat.types';
import {
	StyledConversationRoot,
	StyledEmptyStateStack,
	StyledUserMessageBubble,
	StyledUserAvatarBox,
	StyledAiAvatarBox,
	StyledAiMessageBubble,
	StyledCitationChip,
	StyledTraceToggleButton,
	StyledTraceBody,
	StyledTraceStepIconBox,
	StyledTraceConnectorLine,
} from './Conversation.section.styled.component';

interface ConversationSectionProps {
	data: ChatConversationData | null;
	traceSteps: ChatTraceStep[];
}

function ConversationSection({ data, traceSteps }: ConversationSectionProps) {
	const theme = useTheme();
	const [traceOpen, setTraceOpen] = useState(false);

	return (
		<StyledConversationRoot>
			{!data && (
				<StyledEmptyStateStack>
					<Typography sx={{ fontSize: 14, color: 'text.primary', fontWeight: 500 }}>Ask your first question</Typography>
					<Typography sx={{ fontSize: 13, maxWidth: 320, lineHeight: 1.5 }}>
						Try asking about a service, a ticket, a policy, or anything indexed from your connected sources.
					</Typography>
				</StyledEmptyStateStack>
			)}

			{data && (
				<>
					<Stack direction="row" spacing={1.25} sx={{ maxWidth: '70%', alignSelf: 'flex-end', alignItems: 'flex-end' }}>
						<StyledUserMessageBubble>{data.question}</StyledUserMessageBubble>
						<StyledUserAvatarBox>{CHAT_USER_NAME.charAt(0)}</StyledUserAvatarBox>
					</Stack>

					<Stack direction="row" spacing={1.25} sx={{ maxWidth: '80%', alignSelf: 'flex-start', alignItems: 'flex-start' }}>
						<StyledAiAvatarBox>
							<Cpu size={14} />
						</StyledAiAvatarBox>
						<Stack sx={{ flex: 1, minWidth: 0, gap: 1.75 }}>
							<StyledAiMessageBubble>{data.answer}</StyledAiMessageBubble>

							<Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
								{data.citations.map((citation, index) => {
									const Icon = citation.icon;
									return (
										<StyledCitationChip key={`${citation.label}-${index}`} direction="row" spacing={0.75}>
											<Icon size={13} color={theme.tokens.ink3} />
											<Box component="span" sx={{ color: 'text.secondary' }}>
												{citation.source}
											</Box>
											<Box component="span" sx={{ fontWeight: 500 }}>
												{citation.label}
											</Box>
										</StyledCitationChip>
									);
								})}
							</Stack>

							<Box sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: `${theme.tokens.radius.lg}px`, overflow: 'hidden' }}>
								<StyledTraceToggleButton onClick={() => setTraceOpen((open) => !open)}>
									<span>Processing Trace</span>
									{traceOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
								</StyledTraceToggleButton>
								{traceOpen && (
									<StyledTraceBody>
										{traceSteps.map((step, index) => {
											const isLast = index === traceSteps.length - 1;
											return (
												<Stack key={step.label} direction="row" spacing={1.25} sx={{ minHeight: 26, alignItems: 'flex-start' }}>
													<Stack sx={{ flexShrink: 0, alignItems: 'center' }}>
														<StyledTraceStepIconBox>
															<Check size={9} />
														</StyledTraceStepIconBox>
														{!isLast && <StyledTraceConnectorLine />}
													</Stack>
													<Typography sx={{ fontSize: 13, color: 'text.secondary', pt: '1px' }}>{step.label}</Typography>
												</Stack>
											);
										})}
									</StyledTraceBody>
								)}
							</Box>
						</Stack>
					</Stack>
				</>
			)}
		</StyledConversationRoot>
	);
}

export default ConversationSection;
