import React from "react";
import Page from "views/chat/Chat.page";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import "../index.css";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Page />
    </ThemeProvider>
  );
}
