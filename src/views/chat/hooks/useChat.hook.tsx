import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { MessageEntity } from "domain/entities/MessageEntity";
import { GitHubRepository } from "domain/repositories/GitHubRepository";
import { RepositoryEntity } from "domain/entities/RepositoryEntity";

const gitHubRepo = new GitHubRepository();

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
    return loadingText;
  }, []);

  const showBounceMessages = useCallback((messages: MessageEntity[]) => {
    for (const message of messages) {
      setTimeout(() => {
        setMessages((prev) => [...prev, message]);
      }, 600);
    }
  }, []);

  const scrollBottom = useCallback(() => {
    const container = document.getElementById("chat-window");
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollBottom();
  }, [messages, scrollBottom]);

  const buildReporitoriesToMessages = useCallback(
    (repositories: RepositoryEntity[]) => {
      const repositoriesMessages = repositories?.map((repository) => {
        debugger;
        return new MessageEntity({
          id: uuid(),
          role: "assistant",
          content: repository,
        });
      });
      return repositoriesMessages;
    },
    []
  );

  const handleSendMessage = useCallback(async () => {
    try {
      if (!input.trim()) return;
      const userMessage = new MessageEntity({
        id: uuid(),
        role: "user",
        content: input,
      });
      setMessages((prev) => [...prev, userMessage]);

      setInput("");

      await callLoading();
      const repositories = await gitHubRepo.getUserRepos(input);
      debugger;
      const messages = buildReporitoriesToMessages(repositories);
      debugger;
      if (messages.length === 0) {
        const assistantMessage = new MessageEntity({
          id: uuid(),
          role: "system",
          content:
            "Não foram encontrados repositórios para o usuário informado. Por favor, insira outro nome de usuário do GitHub 🤖.",
        });
        showBounceMessages([assistantMessage]);
      } else {
        showBounceMessages(messages);
      }
      const assistantMessage = new MessageEntity({
        id: uuid(),
        role: "system",
        content:
          "Gostaria de explorar outro usuário? Se sim, por favor, insira o nome de usuário do GitHub 🤖.",
      });
      showBounceMessages([assistantMessage]);
    } catch (error) {
      console.log(error);
    } finally {
      offLoadingText();
    }
  }, [callLoading, input, offLoadingText, showBounceMessages, scrollBottom]);

  const handleHelp = useCallback(() => {
    setInput("LGustavoBarbosa");
  }, []);

  const bootGh = useCallback(async () => {
    try {
      const input =
        "Eu sou o seu assistente buscador de repositórios no GitHub! Para começar, por favor, insira o nome de usuário do GitHub que você gostaria de pesquisar 🤖.";
      const assistantThinking = new MessageEntity({
        id: uuid(),
        role: "system",
        content: input,
      });
      setMessages((prev) => [...prev, assistantThinking]);
    } catch (error) {
      console.error(error);
    } finally {
      offLoadingText();
    }
  }, [callLoading, offLoadingText, showBounceMessages]);

  useEffect(() => {
    bootGh();
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
