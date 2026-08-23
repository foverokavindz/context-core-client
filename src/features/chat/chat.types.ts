import type { LucideIcon } from 'lucide-react';

export interface ChatCitation {
	source: string;
	icon: LucideIcon;
	label: string;
}

export interface ChatTraceStep {
	label: string;
}

export interface ChatConversationData {
	question: string;
	answer: string;
	citations: ChatCitation[];
}

export type ChatDay = 'today' | 'yesterday';

export interface ChatConversationSummary {
	id: string;
	title: string;
	day: ChatDay;
}
