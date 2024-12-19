import React, { useMemo } from "react";
import { Typography } from "@mui/material";
import { MessageEntity } from "../../../domain/entities/MessageEntity";
import Grid2 from "@mui/material/Unstable_Grid2";
import Repository from "./Repostory";
import { RepositoryEntity } from "domain/entities/RepositoryEntity";
import GenericErrorBoundary from "errors/GenericErrorBoundary";

interface MessageProps {
  message: MessageEntity;
  loading: boolean;
  loadingText?: string;
}

const Message: React.FC<MessageProps> = ({ message, loading, loadingText }) => {
  const getSx = useMemo(() => {
    switch (message.role) {
      case "system":
        return {
          bgcolor: "#2c2c2c",
          justifyContent: "flex-start",
          borderRadius: "20px 20px 20px 0",
        };
      case "system.loading":
        return {
          bgcolor: "#2c2c2c",
          justifyContent: "flex-start",
          borderRadius: "20px 20px 20px 0",
        };
      case "user":
        return {
          bgcolor: "#2c2c2c",
          justifyContent: "flex-end",
          initial: { opacity: 0, x: 50 },
          borderRadius: "20px 20px 0 20px",
        };
      case "assistant":
        return {
          bgcolor: "transparent",
          justifyContent: "flex-start",
          borderRadius: "20px 20px 20px 0",
        };
    }
  }, [message.role]);

  const RepositoryCardMemo = useMemo(
    () => <Repository repository={message.content as RepositoryEntity} />,
    [message.content]
  );

  const ContentControllerMemo = useMemo(() => {
    switch (message.role) {
      case "system.loading":
        return (
          <Grid2
            sx={{
              bgcolor: getSx?.bgcolor,
              borderRadius: getSx?.borderRadius,
              minWidth: "130px",
              width: "fit-content",
              p: 2,
            }}
          >
            <Typography>
              {loading && loadingText
                ? loadingText
                : message.content.toString() || "Carregado."}
            </Typography>
          </Grid2>
        );
      case "system":
      case "user":
        return (
          <Grid2
            sx={{
              bgcolor: getSx?.bgcolor,
              borderRadius: getSx?.borderRadius,
              marginLeft: message.role == "user" ? "auto" : "0",
              minWidth: "130px",
              width: "fit-content",
              p: 2,
            }}
          >
            <Typography>{message.content.toString()}</Typography>
          </Grid2>
        );
      case "assistant":
        return (
          <Grid2
            sx={{
              bgcolor: getSx?.bgcolor,
              borderRadius: getSx?.borderRadius,
              minWidth: "130px",
              width: "fit-content",
            }}
          >
            {RepositoryCardMemo}
          </Grid2>
        );
    }
  }, [loadingText, loading, message, RepositoryCardMemo, getSx]);

  return <GenericErrorBoundary>{ContentControllerMemo}</GenericErrorBoundary>;
};

export default Message;
