import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { useChat } from "views/chat/hooks/useChat.hook";
import ChatWindow from "views/chat/components/Window";
import ChatInput from "views/chat/components/Input";

const ChatPage: React.FC = () => {
  const {
    messages,
    input,
    setInput,
    handleSendMessage,
    handleHelp,
    loading,
    loadingText,
  } = useChat();

  const ChatWindowMemo = useMemo(
    () => (
      <ChatWindow
        messages={messages}
        loading={loading}
        loadingText={loadingText}
      />
    ),
    [messages, loading, loadingText]
  );

  const ChatInputMemo = useMemo(
    () => (
      <ChatInput
        loading={loading}
        inputValue={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        onSend={handleSendMessage}
        onHelp={handleHelp}
      />
    ),
    [input, handleHelp, handleSendMessage, setInput, loading]
  );

  return (
    <Box
      test-id="app"
      id="app"
      sx={{ p: 4, display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <Box sx={{ flex: 1 }}>{ChatWindowMemo}</Box>
      <Box sx={{ flex: 0 }}>{ChatInputMemo}</Box>
    </Box>
  );
};

export default ChatPage;
