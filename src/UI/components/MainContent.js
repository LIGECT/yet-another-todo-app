import { createTodoItemElement } from "./TodoItem";
import "../../css/layout/MainContent.css";

export function renderMainContent(project) {
  const mainContentContainer = document.getElementById("main-content");

  let todoList = mainContentContainer.querySelector("ul");
  if (!todoList) {
    todoList = document.createElement("ul");
    mainContentContainer.appendChild(todoList);
  }

  todoList.innerHTML = "";

  if (project) {
    project.todos.forEach((todo) => {
      const todoElement = createTodoItemElement(todo);
      todoList.appendChild(todoElement);
    });
  }
}
