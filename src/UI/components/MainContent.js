import { createTodoItemElement } from "./TodoItem";
import "../../css/layout/MainContent.css";
import "../../css/components/EmptyState.css";
import "../../css/components/TodoItem.css";
import EmptyState from "../../assets/images/empty-state.svg";

export function renderMainContent(project) {
  const mainContentContainer = document.getElementById("main-content");

  const dynamicContent = mainContentContainer.querySelectorAll(
    ".project-title-header, .todo-list, .empty-state"
  );
  dynamicContent.forEach((el) => el.remove());

  if (project) {
    const projectTitle = document.createElement("h1");
    projectTitle.className = "project-title-header";
    projectTitle.textContent = project.name;
    document.getElementById("new-todo-input").after(projectTitle);

    if (project.todos.length > 0) {
      const todoList = document.createElement("ul");
      todoList.className = "todo-list";
      project.todos.forEach((todo) => {
        const todoElement = createTodoItemElement(todo);
        todoList.appendChild(todoElement);
      });
      mainContentContainer.appendChild(todoList);
    } else {
      const emptyStateContainer = document.createElement("div");
      emptyStateContainer.className = "empty-state";

      const emptyStatePicture = document.createElement("img");
      emptyStatePicture.className = "empty-state-img";
      emptyStatePicture.src = EmptyState;
      emptyStatePicture.alt =
        "Minimalist empty state illustration for a to-do list app";
      emptyStatePicture.loading = "lazy";

      const emptyStateMessage = document.createElement("h3");
      emptyStateMessage.className = "empty-state-message";
      emptyStateMessage.textContent =
        "There are no tasks yet. Add the first one!";

      emptyStateContainer.append(emptyStatePicture, emptyStateMessage);
      mainContentContainer.appendChild(emptyStateContainer);
    }
  }
}
