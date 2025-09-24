import { createTodoItemElement } from "./TodoItem";
import "../../css/layout/MainContent.css";
import "../../css/components/TodoItem.css";

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
      const emptyState = document.createElement("div");
      emptyState.className = "empty-state";
      emptyState.innerHTML = `<h3>No tasks yet. Add one!</h3>`;
      mainContentContainer.appendChild(emptyState);
    }
  }
}
