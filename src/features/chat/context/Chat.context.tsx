import { createContext, useContext, useState, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { chatService } from '../../../services/Chat.service';
import { CHAT_LLM_CONFIG, NEW_CHAT_TITLE } from '../../../configs/chat.configs';
import { CURRENT_USER } from '../../../configs/user.configs';
import { CHAT_ANSWER_STATUS } from '../../../types/common.types';
import type { ChatConversationSummary, ChatTurn } from '../chat.types';

const TITLE_TRUNCATE_LENGTH = 48;
const GENERIC_ERROR = 'Something went wrong while answering that question.';

function truncateTitle(text: string): string {
  return text.length > TITLE_TRUNCATE_LENGTH ? `${text.slice(0, TITLE_TRUNCATE_LENGTH - 1)}…` : text;
}

interface ChatContextValue {
  activeConv: string | null;
  conversations: ChatConversationSummary[];
  turns: ChatTurn[];
  historyCollapsed: boolean;
  creatingSession: boolean;
  sessionError: string | null;
  sending: boolean;
  startNewChat: () => void;
  selectConversation: (id: string) => void;
  sendMessage: (question: string) => void;
  toggleHistoryCollapsed: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { chatSessionId } = useParams();
  const navigate = useNavigate();

  const [historyCollapsed, setHistoryCollapsed] = useState(true);
  const [conversations, setConversations] = useState<ChatConversationSummary[]>([]);
  const [turnsBySession, setTurnsBySession] = useState<Record<string, ChatTurn[]>>({});
  const [creatingSession, setCreatingSession] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const activeConv = chatSessionId ?? null;
  const turns = activeConv ? (turnsBySession[activeConv] ?? []) : [];

  const patchTurn = (sessionId: string, turnId: string, patch: Partial<ChatTurn>) => {
    setTurnsBySession((prev) => ({
      ...prev,
      [sessionId]: (prev[sessionId] ?? []).map((turn) => (turn.id === turnId ? { ...turn, ...patch } : turn)),
    }));
  };

  const startNewChat = async () => {
    setSessionError(null);
    setCreatingSession(true);
    const response = await chatService.CreateChatSession({ user_id: CURRENT_USER.userId, title: NEW_CHAT_TITLE });
    if (response.success && response.data) {
      const newSessionId = response.data.chat_session_id;
      setConversations((prev) => [{ id: newSessionId, title: NEW_CHAT_TITLE }, ...prev]);
      setTurnsBySession((prev) => ({ ...prev, [newSessionId]: [] }));
      navigate(`/chat/${newSessionId}`);
    } else {
      console.error('Create Chat Session Error:', response.message);
      setSessionError(response.error ?? response.message ?? 'Could not start a new chat.');
    }
    setCreatingSession(false);
  };

  const selectConversation = (id: string) => navigate(`/chat/${id}`);

  const toggleHistoryCollapsed = () => setHistoryCollapsed((collapsed) => !collapsed);

  const sendMessage = async (question: string) => {
    if (!activeConv || sending) return;
    const sessionId = activeConv;
    const turnId = `turn-${Date.now()}`;

    setTurnsBySession((prev) => ({
      ...prev,
      [sessionId]: [...(prev[sessionId] ?? []), { id: turnId, question, status: 'loading', answer: null, errorMessage: null }],
    }));

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === sessionId && conversation.title === NEW_CHAT_TITLE
          ? { ...conversation, title: truncateTitle(question) }
          : conversation,
      ),
    );
    setSending(true);

    const response = await chatService.SendChatQuery(sessionId, {
      query: question,
      user_id: CURRENT_USER.userId,
      team_id: CURRENT_USER.teamId,
      department_id: CURRENT_USER.departmentId,
      llm_config: CHAT_LLM_CONFIG,
    });

    if (response.success && response.data) {
      const answered = response.data.status === CHAT_ANSWER_STATUS.Answered;
      patchTurn(sessionId, turnId, { status: answered ? 'answered' : 'warning', answer: response.data });
    } else {
      console.error('Send Chat Query Error:', response.message);
      patchTurn(sessionId, turnId, { status: 'error', errorMessage: response.error ?? response.message ?? GENERIC_ERROR });
    }
    setSending(false);
  };

  const value: ChatContextValue = {
    activeConv,
    conversations,
    turns,
    historyCollapsed,
    creatingSession,
    sessionError,
    sending,
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
