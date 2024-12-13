import React from "react";
import { MessageEntity } from "../../domain/entities/MessageEntity";
import Message from "./Message";
import Grid2 from "@mui/material/Unstable_Grid2";

interface ChatWindowProps {
  messages: MessageEntity[];
  loading: boolean;
  loadingText?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  loading,
  loadingText,
}) => {
  return (
    <Grid2
      id="chat-window"
      className="chat-window"
      container
      direction="column"
      wrap="nowrap"
      spacing={2}
      p={2}
    >
      {messages.map((msg) => (
        <Grid2 key={msg.id} xs={12}>
          <Message message={msg} loading={loading} loadingText={loadingText} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default ChatWindow;
