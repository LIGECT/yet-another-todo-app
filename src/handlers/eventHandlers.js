import { deleteTodoFromProject } from "../utils/deleteButton.js";
import { openModal, closeModal } from "./ui.js";
import { animateCheckbox } from "../utils/animations.js";
import { Todo } from "../models/Todo.js";
import { Project } from "../models/Project.js";

export function setupAppEventHandlers(state, render) {
  const mainContent = document.getElementById("main-content");
  const sidebar = document.getElementById("sidebar");
  const form = document.getElementById("edit-form");
  const priorityContainer = document.querySelector(
    ".priority-segmented-control"
  );
  let currentEditingId = null;
  let activePriorityButton = null;

  function fillForm(todo) {
    document.getElementById("edit-title").value = todo.title;
    document.getElementById("edit-description").value = todo.description;
    document.getElementById("edit-dueDate").value = todo.dueDate || "";

    setActivePriority(todo.priority);
  }

  function setActivePriority(priority) {
    const container = document.querySelector(".priority-segmented-control");
    const segments = container.querySelectorAll(".priority-segment");

    segments.forEach((seg) => seg.classList.remove("active"));

    const activeSegment = container.querySelector(
      `[data-priority="${priority}"]`
    );
    activeSegment.classList.add("active");
    activePriorityButton = activeSegment;
    container.setAttribute("data-active", priority);
  }

  sidebar.addEventListener("click", (e) => {
    const projectItem = e.target.closest(".project-item");
    if (projectItem) {
      const projectId = projectItem.dataset.projectId;
      state.currentProjectId = projectId;
      render(state);
      return;
    }

    const newProjectBtn = e.target.closest(".new-project-btn");
    if (newProjectBtn) {
      state.isCreatingProject = true;
      render(state);
      return;
    }
  });

  sidebar.addEventListener("keydown", (e) => {
    if (e.target.id === "new-project-input") {
      if (e.key === "Enter") {
        const input = e.target;
        const projectName = input.value.trim();

        if (projectName) {
          const newProject = new Project(projectName);
          state.projects.push(newProject);
          state.currentProjectId = newProject.id;
        }

        input.value = "";
        state.isCreatingProject = false;
        render(state);
      } else if (e.key === "Escape") {
        const input = e.target;
        input.value = "";
        state.isCreatingProject = false;
        render(state);
      }
    }
  });

  sidebar.addEventListener(
    "blur",
    (e) => {
      if (e.target.id === "new-project-input") {
        e.target.value = "";
        state.isCreatingProject = false;
        render(state);
      }
    },
    true
  );

  mainContent.addEventListener("click", (e) => {
    const todoItem = e.target.closest(".todo-items");
    if (!todoItem) return;

    const currentProject = state.projects.find(
      (p) => p.id === state.currentProjectId
    );
    if (!currentProject) return;

    const todoId = todoItem.dataset.todoId;

    if (e.target.closest(".delete-todo-btn")) {
      e.stopPropagation();
      deleteTodoFromProject(currentProject, todoId);
      render(state);
      return;
    }

    if (e.target.closest(".edit-todo-btn")) {
      e.stopPropagation();
      currentEditingId = todoId;
      const todo = currentProject.todos.find((t) => t.id === todoId);
      if (todo) {
        openModal({ mode: "edit" });
        fillForm(todo);
      }

      return;
    }

    if (e.target.closest(".todo-checkbox-svg")) {
      e.stopPropagation();
      const todo = currentProject.todos.find((t) => t.id === todoId);

      if (todo && !todo.completed) {
        todo.completed = true;

        const checkboxSVG = e.target.closest(".todo-checkbox-svg");
        const todoItemElement = e.target.closest(".todo-items");

        todoItemElement.classList.add("is-completed");

        animateCheckbox(checkboxSVG, () => render(state));
      } else if (todo) {
        todo.completed = false;
        render(state);
      }
      return;
    }

    todoItem.classList.toggle("is-expanded");
  });

  document.getElementById("fab-add-todo").addEventListener("click", (e) => {
    if (e.target.closest(".fab")) {
      const currentProject = state.projects.find(
        (p) => p.id === state.currentProjectId
      );

      if (!currentProject) {
        alert("Please select a project first to add a task.");
        return;
      }

      currentEditingId = null;
      openModal({ mode: "create" });
      fillForm({ title: "", description: "", dueDate: "", priority: "low" });
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const currentProject = state.projects.find(
      (p) => p.id === state.currentProjectId
    );

    if (!currentProject) {
      console.error("Current project not found");
      return;
    }

    const title = document.getElementById("edit-title").value.trim();
    const description = document
      .getElementById("edit-description")
      .value.trim();
    const dueDate = document.getElementById("edit-dueDate").value;
    const priority = activePriorityButton.dataset.priority;

    if (currentEditingId !== null) {
      const todo = currentProject.todos.find((t) => t.id === currentEditingId);
      if (!todo) return;
      Object.assign(todo, { title, description, dueDate, priority });
    } else {
      const newTodo = new Todo(title, description, dueDate, priority);
      currentProject.todos.push(newTodo);
    }

    closeModal();
    render(state);
  });

  priorityContainer.addEventListener("click", (e) => {
    e.preventDefault();
    const clickedSegment = e.target.closest(".priority-segment");
    if (!clickedSegment) return;

    setActivePriority(clickedSegment.dataset.priority);
  });

  document.getElementById("cancel-edit-btn").addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
  });
}
