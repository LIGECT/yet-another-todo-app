import "./css/main.css";
import "./css/fab.css";
import "./css/modal.css";
import "./css/mobile-sidebar.css";
import { appState as InitialData } from "./data/initialData.js";
import { render } from "./handlers/ui.js";
import { setupAppEventHandlers } from "./handlers/eventHandlers.js";
import { saveState, loadState } from "./utils/storage.js";

let appState = loadState() || InitialData;

function updateState(newState) {
  appState = newState;
  render(appState);
  saveState(appState);
}

setupAppEventHandlers(() => appState, updateState);

render(appState);
