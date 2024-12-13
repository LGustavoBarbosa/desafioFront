import React from "react";
import Page from "presentation/Chat.page";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme";
import "./presentation/index.css";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Page />
    </ThemeProvider>
  );
}
