import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { useChat } from "views/chat/hooks/useChat.hook";
import ChatWindow from "views/chat/components/Window";
import ChatInput from "views/chat/components/Input";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

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
    <Grid2
      id="chat-page"
      container
      direction="column"
      sx={{
        height: "100vh",
        overflowY: "hidden",
        overflowX: "hidden",
        width: "100%",
      }}
      spacing={1}
      pl={2}
      pr={2}
      pb={2}
      pt={2}
    >
      <Grid2 id="chat-window" className="chat-window" sx={{ flex: 1 }} xs={12}>
        {ChatWindowMemo}
      </Grid2>
      <Grid2 sx={{ flex: 0 }} xs={12}>
        {ChatInputMemo}
      </Grid2>
    </Grid2>
  );
};

export default ChatPage;
