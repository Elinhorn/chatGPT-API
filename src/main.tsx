import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "../app/globals.css";
import { ThemeProvider } from "./context/theme-provider.tsx";
import { ColorProvider } from "./context/color-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </ColorProvider>
  </StrictMode>
);
