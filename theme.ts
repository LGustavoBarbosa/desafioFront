import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto"; // Import the cabin font

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#1B5D51" },
    secondary: { main: "rgb(113, 95, 222)" },
    background: { default: "#10121e", paper: "#2a2e35" },
    text: { primary: "#f1faff" },
  },
  typography: {
    fontFamily: ["Roboto"].join(","),
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
          },
        },
      },
    },
    MuiGrid2: {
      styleOverrides: {
        root: {
          "&.chat-window": {
            scrollbarColor: "#424242 transparent",
            border: "1px solid #333",
            borderRadius: 2,
            height: "80vh",
            overflowY: "auto",
            overflowX: "hidden",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px white inset !important",
            WebkitTextFillColor: "black !important",
          },
        },
      },
    },
  },
});

export default theme;
