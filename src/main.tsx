import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@components";
import { Router } from "@utils";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
    <StrictMode>
        <Provider>
            <Router />
        </Provider>
    </StrictMode>
);
