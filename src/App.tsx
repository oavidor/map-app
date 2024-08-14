import { StrictMode } from "react";
import theme from "./styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppLayout } from "./components";
import { MapPage } from "./pages";

function App() {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <AppLayout>
          <MapPage />
        </AppLayout>
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;
