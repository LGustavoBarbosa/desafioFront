import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { MessageEntity } from "domain/entities/MessageEntity";
// import { GitHubRepository } from "../../domain/repositories/GitHubRepository";
import { OpenAIRepository } from "domain/repositories/OpenAIRepository";
import { SuggestionsEntity } from "domain/entities/SuggestionsEntity";
import { bootChatPrompt } from "core/boot.chat.prompt";

// const gitHubRepo = new GitHubRepository();
const openAIRepo = new OpenAIRepository();

export interface ChatHook {
  messages: MessageEntity[];
  input: string;
  loading: boolean;
  loadingText: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => Promise<void>;
  handleHelp: () => void;
}

export function useChat(): ChatHook {
  const [messages, setMessages] = useState<MessageEntity[]>([]);
  const [input, setInput] = useState("");
  const [loadingText, setLoadingText] = useState("Carregando");
  const useBonceLoadingRef = useRef<NodeJS.Timeout | null>(null);

  const offLoadingText = useCallback(() => {
    clearInterval(useBonceLoadingRef.current as NodeJS.Timeout);
    setLoadingText("");
  }, [useBonceLoadingRef]);

  const callLoading = useCallback(async () => {
    useBonceLoadingRef.current = setInterval(() => {
      setLoadingText((prev) => {
        if (!prev) {
          return "Carregando";
        }
        if (prev === "Carregando...") {
          return "Carregando";
        }
        return prev + ".";
      });
    }, 600);
    const assistantThinking = new MessageEntity({
      id: uuid(),
      role: "system.loading",
      content: loadingText,
      loadingText: loadingText,
    });
    setMessages((prev) => [...prev, assistantThinking]);
  }, [loadingText]);

  const showBounceMessages = useCallback((suggestions: SuggestionsEntity[]) => {
    for (const suggestion of suggestions) {
      setTimeout(() => {
        const suggestionsEntity = new MessageEntity({
          id: uuid(),
          role: "assistant",
          content: suggestion,
        });
        setMessages((prev) => [...prev, suggestionsEntity]);
      }, 600);
    }
  }, []);

  const scrollBottom = useCallback(() => {
    const chatContainer = document.getElementById("chat-window");
    if (chatContainer) {
      window.scrollTo(0, chatContainer.scrollHeight);
    }
  }, []);

  useEffect(() => {
    scrollBottom();
  }, [messages, scrollBottom]);

  const handleSendMessage = useCallback(async () => {
    try {
      if (!input.trim()) return;
      const userMessage = new MessageEntity({
        id: uuid(),
        role: "user",
        content: input,
      });
      setMessages((prev) => [...prev, userMessage]);
      scrollBottom();
      setInput("");
      callLoading();
      const suggestions = await openAIRepo.getSuggestion(input);
      showBounceMessages(suggestions);
    } catch (error) {
      console.log(error);
    } finally {
      offLoadingText();
    }
  }, [callLoading, input, offLoadingText, showBounceMessages, scrollBottom]);

  const handleHelp = useCallback(() => {
    setInput(
      "Explore as tendências atuais em gerenciamento de estado funcional no React."
    );
  }, []);

  const boot = useCallback(async () => {
    try {
      const input = bootChatPrompt;
      const assistantThinking = new MessageEntity({
        id: uuid(),
        role: "system",
        content:
          "Aqui estão algumas tendências de tecnologias front-end mais populares no GitHub no último semestre.",
      });
      setMessages((prev) => [...prev, assistantThinking]);
      callLoading();
      const suggestions: SuggestionsEntity[] = await openAIRepo.getSuggestion(
        input
      );
      showBounceMessages(suggestions);
    } catch (error) {
      console.error(error);
    } finally {
      offLoadingText();
    }
  }, [callLoading, offLoadingText, showBounceMessages]);

  useEffect(() => {
    boot();
  }, []);

  return {
    messages,
    input,
    loading: loadingText ? true : false,
    loadingText,
    setInput,
    handleSendMessage,
    handleHelp,
  };
}
