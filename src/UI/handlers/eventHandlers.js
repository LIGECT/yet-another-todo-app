import { deleteTodoFromProject } from "../../utils/deleteButton.js";
import { openModal } from "./ui.js";

export function setupAppEventHandlers(state, render) {
  const mainContentContainer = document.getElementById("main-content");

  mainContentContainer.addEventListener("click", (e) => {
    const todoItem = e.target.closest(".todo-items");
    if (!todoItem) return;

    const todoId = todoItem.dataset.todoId;

    if (e.target.matches(".delete-todo-btn")) {
      e.stopPropagation();
      const currentProject = state.projects.find(
        (p) => p.id === state.currentProjectId
      );
      deleteTodoFromProject(currentProject, todoId);
      render(state);
      return;
    }

    if (e.target.matches(".edit-todo-btn")) {
      e.stopPropagation();
      openModal();
      return;
    }

    if (e.target.matches(".todo-checkbox")) {
      const currentProject = state.projects.find(
        (p) => p.id === state.currentProjectId
      );
      const todo = currentProject.todos.find((t) => t.id === todoId);
      if (todo) {
        todo.completed = !todo.completed;
        render(state);
      }
      return;
    }

    todoItem.classList.toggle("is-expanded");
  });
}
