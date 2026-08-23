import { createContext, useContext, useState, type ReactNode } from 'react';
import { CHAT_CONVERSATIONS, CHAT_CONVERSATION_SUMMARIES, buildMockAnswer } from '../chat.mock';
import type { ChatConversationData, ChatConversationSummary } from '../chat.types';

const TITLE_TRUNCATE_LENGTH = 48;

function truncateTitle(text: string): string {
  return text.length > TITLE_TRUNCATE_LENGTH ? `${text.slice(0, TITLE_TRUNCATE_LENGTH - 1)}…` : text;
}

interface ChatContextValue {
  activeConv: string | null;
  conversations: ChatConversationSummary[];
  activeData: ChatConversationData | null;
  historyCollapsed: boolean;
  startNewChat: () => void;
  selectConversation: (id: string) => void;
  sendMessage: (question: string) => void;
  toggleHistoryCollapsed: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [activeConv, setActiveConv] = useState<string | null>(null);
  const [historyCollapsed, setHistoryCollapsed] = useState(true);
  const [conversationData, setConversationData] = useState<Record<string, ChatConversationData>>(CHAT_CONVERSATIONS);
  const [conversations, setConversations] = useState<ChatConversationSummary[]>(CHAT_CONVERSATION_SUMMARIES);

  const startNewChat = () => setActiveConv('new');
  const selectConversation = (id: string) => setActiveConv(id);
  const toggleHistoryCollapsed = () => setHistoryCollapsed((collapsed) => !collapsed);

  const sendMessage = (question: string) => {
    const id = `local-${Date.now()}`;
    setConversationData((prev) => ({ ...prev, [id]: buildMockAnswer(question) }));
    setConversations((prev) => [{ id, title: truncateTitle(question), day: 'today' }, ...prev]);
    setActiveConv(id);
  };

  const activeData = activeConv && activeConv !== 'new' ? (conversationData[activeConv] ?? null) : null;

  const value: ChatContextValue = {
    activeConv,
    conversations,
    activeData,
    historyCollapsed,
    startNewChat,
    selectConversation,
    sendMessage,
    toggleHistoryCollapsed,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext(): ChatContextValue {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}
