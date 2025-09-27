import { deleteTodoFromProject } from "../../utils/deleteButton.js";
import { openModal, closeModal } from "./ui.js";
import { animate } from "animejs";

export function setupAppEventHandlers(state, render) {
  const mainContentContainer = document.getElementById("main-content");
  const form = document.getElementById("edit-form");
  let currentEditingId = null;

  mainContentContainer.addEventListener("click", (e) => {
    const todoItem = e.target.closest(".todo-items");
    if (!todoItem) return;

    const todoId = todoItem.dataset.todoId;

    if (e.target.closest(".delete-todo-btn")) {
      e.stopPropagation();
      const currentProject = state.projects.find(
        (p) => p.id === state.currentProjectId
      );
      deleteTodoFromProject(currentProject, todoId);
      render(state);
      return;
    }

    if (e.target.closest(".edit-todo-btn")) {
      e.stopPropagation();
      currentEditingId = todoId;

      const currentProject = state.projects.find(
        (p) => p.id === state.currentProjectId
      );
      const todo = currentProject.todos.find((t) => t.id === todoId);
      if (todo) {
        openModal();
        fillForm(todo);
      }

      return;
    }

    if (e.target.closest(".todo-checkbox-svg")) {
      e.stopPropagation();

      const currentProject = state.projects.find(
        (p) => p.id === state.currentProjectId
      );
      const todo = currentProject.todos.find((t) => t.id === todoId);

      if (todo && !todo.completed) {
        todo.completed = true;
        const checkboxSVG = e.target.closest(".todo-checkbox-svg");
        const checkmarkPath = checkboxSVG.querySelector(".checkbox-checkmark");
        const circle = checkboxSVG.querySelector(".checkbox-circle");
        const pathLength = checkmarkPath.getTotalLength();
        checkmarkPath.style.strokeDasharray = pathLength;
        checkmarkPath.style.strokeDashoffset = pathLength;
        checkmarkPath.style.opacity = "1";

        animate(circle, {
          stroke: ["#888", "#00C4B4"],
          duration: 400,
          ease: "outSine",
        });

        const checkAnimation = animate(checkmarkPath, {
          strokeDashoffset: [pathLength, 0],
          duration: 500,
          ease: "outSine",
          delay: 100,
        });

        checkAnimation.then(() => {
          render(state);
        });
      } else if (todo) {
        todo.completed = false;
        render(state);
      }
      return;
    }

    todoItem.classList.toggle("is-expanded");
  });

  function fillForm(todo) {
    document.getElementById("edit-title").value = todo.title;
    document.getElementById("edit-description").value = todo.description;
    document.getElementById("edit-dueDate").value = todo.dueDate || "";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const currentProject = state.projects.find(
      (p) => p.id === state.currentProjectId
    );

    const todo = currentProject.todos.find((t) => t.id === currentEditingId);
    if (!todo) return;

    todo.title = document.getElementById("edit-title").value.trim();
    todo.description = document.getElementById("edit-description").value.trim();
    todo.dueDate = document.getElementById("edit-dueDate").value;

    closeModal();
    render(state);
  });
}
