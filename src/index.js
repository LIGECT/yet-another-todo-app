import "./css/main.css";
import "./css/fab.css";
import "./css/modal.css";
import { appState } from "./data/initialData.js";
import { render } from "./handlers/ui.js";
import { setupAppEventHandlers } from "./handlers/eventHandlers.js";

setupAppEventHandlers(appState, render);

render(appState);
