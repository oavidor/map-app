// src/theme.js
import { createTheme } from "@mui/material/styles";

const dark = false;

const theme = createTheme({
  palette: {
    mode: dark ? "dark" : "light",
    primary: {
      main: dark ? "#61F39F" : "#003B6F",
    },
    secondary: {
      main: dark ? "#01111F" : "#F4F7F9",
    },
    warning: {
      main: "#FFECB3",
      contrastText: "#000",
    },
    success: {
      main: "#61f39f",
      contrastText: "#000",
      dark: "#2e7d32",
    },
    error: {
      main: "#F36161",
    },
    background: {
      default: dark ? "#05192B" : "#ffffff",
    },
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
    },
  },
});

export default theme;
