import "./style.css";
import { appState } from "./data/initialData.js";
import { render } from "./UI/ui.js";
import { createTodo } from "./factories/todo.js";

const input = document.getElementById("new-todo-input");

function handleEnterPress(event) {
  if (event.key !== "Enter") return;

  const inputText = input.value.trim();

  if (inputText === "") return;

  const currentProject = appState.projects.find(
    (project) => project.id === appState.currentProjectId
  );

  if (!currentProject) {
    console.log("Текущий проэкт не найден"); // Кстати, а где остальные параметры? dueDate, priority? Пока похуй, но потом надо будет.
  }

  const newTodo = createTodo(inputText);
  currentProject.todos.push(newTodo);

  render(appState);

  input.value = "";
}

input.addEventListener("keydown", handleEnterPress);

render(appState);
