import Page from "views/chat/Chat.page";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import GenericErrorBoundary from "./errors/GenericErrorBoundary";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GenericErrorBoundary>
        <Page />
      </GenericErrorBoundary>
    </ThemeProvider>
  );
}
