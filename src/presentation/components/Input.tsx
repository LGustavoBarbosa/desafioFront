import React from "react";
import { TextField, IconButton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Send as SendIcon, HelpOutline as HelpIcon } from "@mui/icons-material";

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
    <Grid2
      container
      direction="row"
      wrap="nowrap"
      spacing={2}
      alignItems="center"
      alignContent="center"
    >
      <Grid2 sx={{ flex: "0 1 62px" }}>
        <IconButton disabled={loading} color="secondary" onClick={onHelp}>
          <HelpIcon />
        </IconButton>
      </Grid2>
      <Grid2 flex={11.1}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Digite sua mensagem..."
          value={inputValue}
          onChange={onChange}
          onKeyPress={handleKeyPress}
          InputProps={{ style: { color: "#ffffff" } }}
        />
      </Grid2>
      <Grid2 flex={0.3} sx={{ flex: "0 1 60px" }}>
        <IconButton
          onClick={onSend}
          sx={{
            color: "#000000",
            backgroundColor: "#ffffff",
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "#ffffff",
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </Grid2>
    </Grid2>
  );
};

export default Input;
