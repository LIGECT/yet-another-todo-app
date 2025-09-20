import "./css/main.css";
import { appState } from "./data/initialData.js";
import { render, handleProjectClicks } from "./UI/ui.js";
import { Todo } from "./models/Todo.js";

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

// function deleteTodo(state, todoId) {
//   const project = state.projects.find((p) => p.id === state.currentProjectId);
//   if (project) {
//     project.todos = project.todos.filter((t) => t.id !== todoId);
//   }
//   render(state);
// }

input.addEventListener("keydown", handleEnterPress);

// handleProjectClicks(appState, deleteTodo);
handleProjectClicks(appState);

render(appState);
