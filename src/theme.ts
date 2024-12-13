import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto"; // Import the cabin font

const greyPrimary = "#212121";
const greySecondary = "#303030";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#ffffff" },
    secondary: { main: greySecondary },
    background: { default: greyPrimary, paper: greyPrimary },
    text: { primary: "#d6d6d6" },
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
            borderRadius: 2,
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
