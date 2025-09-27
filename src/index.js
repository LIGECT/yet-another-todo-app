import "./css/main.css";
import "./css/modal.css";
import { appState } from "./data/initialData.js";
import {
  render,
  handleProjectClicks,
  setupModalHandlers,
} from "./handlers/ui.js";

import { Todo } from "./models/Todo.js";
import { setupAppEventHandlers } from "./handlers/eventHandlers.js";

const input = document.getElementById("new-todo-input");

function handleEnterPress(event) {
  if (event.key !== "Enter") return;

  const inputText = input.value.trim();

  if (inputText === "") return;

  const currentProject = appState.projects.find(
    (project) => project.id === appState.currentProjectId
  );

  if (!currentProject) {
    console.error("Current project not found");
  }

  const newTodo = new Todo(inputText);
  currentProject.todos.push(newTodo);

  render(appState);

  input.value = "";
}

input.addEventListener("keydown", handleEnterPress);

handleProjectClicks(appState);
setupModalHandlers();
setupAppEventHandlers(appState, render);

render(appState);
