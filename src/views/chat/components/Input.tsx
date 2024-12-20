import React from "react";
import { TextField, IconButton, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Send as SendIcon, HelpOutline as HelpIcon } from "@mui/icons-material";
import GenericErrorBoundary from "errors/GenericErrorBoundary";

interface InputProps {
  inputValue: string;
  loading: boolean;
  onChange: (u: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  onHelp: () => void;
}

const Input: React.FC<InputProps> = ({
  inputValue,
  loading,
  onChange,
  onSend,
  onHelp,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <GenericErrorBoundary>
      <Grid2
        container
        direction="row"
        wrap="nowrap"
        spacing={2}
        alignItems="center"
        alignContent="center"
        sx={{
          height: "96px",
          borderRadius: "1.5rem",
          backgroundColor: "#2f2f2f",
        }}
      >
        <Grid2 sx={{ flex: "0 1 62px" }}>
          <IconButton
            sx={{
              color: "#000000",
              backgroundColor: "#ffffff",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "#ffffff",
              },
            }}
            onClick={!loading ? onHelp : () => {}}
          >
            {loading ? (
              <CircularProgress size={18} color="secondary" />
            ) : (
              <HelpIcon />
            )}
          </IconButton>
        </Grid2>
        <Grid2 flex={11.1}>
          <TextField
            multiline
            type="text"
            variant="standard"
            fullWidth
            placeholder="Nome de usuário do GitHub que você gostaria de pesquisar."
            value={inputValue}
            onChange={onChange}
            onKeyPress={handleKeyPress}
            InputProps={{ style: { color: "#ffffff" } }}
          />
        </Grid2>
        <Grid2 flex={0.3} sx={{ flex: "0 1 60px" }}>
          <IconButton
            onClick={!loading ? onSend : () => {}}
            sx={{
              color: "#000000",
              backgroundColor: "#ffffff",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "#ffffff",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={18} color="secondary" />
            ) : (
              <SendIcon />
            )}
          </IconButton>
        </Grid2>
      </Grid2>
    </GenericErrorBoundary>
  );
};

export default Input;
