import { createContext, ReactNode, useContext } from "react";

interface ChatContextType {
  user: any;
  form: any;
  sendMessage: any;
  showChatInfo: boolean;
  setShowChatInfo: any;
  chat: any;
}

export interface ChatProviderProps {
  children: ReactNode;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
