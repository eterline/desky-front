import { createRoot } from "react-dom/client";
import { App } from "./components/App";

const rootID = "app-root";
const rootDiv = document.getElementById("app-root");

if (!rootDiv) {
    throw new Error(`Sorry, can't get App root component with ID: '${rootID}'`);
}

const rootContainer = createRoot(rootDiv);

rootContainer.render(<App />);