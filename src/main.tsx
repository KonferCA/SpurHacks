import { Provider } from "@components";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SplineProvider } from "./providers/SplineProvider";
import "./index.css";

import { Router } from "@utils";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <StrictMode>
    <Provider>
      <SplineProvider>
        <Router />
      </SplineProvider>
    </Provider>
  </StrictMode>
);
