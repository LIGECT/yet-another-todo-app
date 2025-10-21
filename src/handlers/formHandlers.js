import { Todo } from "../models/Todo.js";
import { openModal, closeModal } from "./ui.js";

export function setupFormHandlers(getState, updateState) {
  const form = document.getElementById("edit-form");
  const titleInput = document.getElementById("edit-title");
  const priorityContainer = document.querySelector(
    ".priority-segmented-control"
  );

  let currentEditingId = null;
  let activePriorityButton = null;

  function fillForm(todo) {
    titleInput.value = todo.title;
    document.getElementById("edit-description").value = todo.description;
    document.getElementById("edit-dueDate").value = todo.dueDate || "";
    setActivePriority(todo.priority);
  }

  function setActivePriority(priority) {
    const segments = priorityContainer.querySelectorAll(".priority-segment");
    segments.forEach((seg) => seg.classList.remove("active"));

    const activeSegment = priorityContainer.querySelector(
      `[data-priority="${priority}"]`
    );
    activeSegment.classList.add("active");
    activePriorityButton = activeSegment;
    priorityContainer.setAttribute("data-active", priority);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const description = document
      .getElementById("edit-description")
      .value.trim();
    const dueDate = document.getElementById("edit-dueDate").value;
    const priority = activePriorityButton.dataset.priority;

    const currentState = getState();
    let newProjects;

    if (currentEditingId !== null) {
      newProjects = currentState.projects.map((project) =>
        project.id === currentState.currentProjectId
          ? {
              ...project,
              todos: project.todos.map((todo) =>
                todo.id === currentEditingId
                  ? { ...todo, title, description, dueDate, priority }
                  : todo
              ),
            }
          : project
      );
    } else {
      const newTodo = new Todo(title, description, dueDate, priority);
      newProjects = currentState.projects.map((project) =>
        project.id === currentState.currentProjectId
          ? { ...project, todos: [...project.todos, newTodo] }
          : project
      );
    }

    updateState({ ...currentState, projects: newProjects });
    currentEditingId = null;
    closeModal();
    form.reset();
  });

  priorityContainer.addEventListener("click", (e) => {
    e.preventDefault();
    const clickedSegment = e.target.closest(".priority-segment");
    if (clickedSegment) {
      setActivePriority(clickedSegment.dataset.priority);
    }
  });

  titleInput.addEventListener("input", () => {
    if (titleInput.value.length > 30) {
      titleInput.setCustomValidity(
        "Title cannot be longer than 30 characters."
      );
    } else {
      titleInput.setCustomValidity("");
    }
  });

  document.getElementById("cancel-edit-btn").addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
  });

  document.getElementById("fab-add-todo").addEventListener("click", (e) => {
    if (e.target.closest(".fab")) {
      const currentState = getState();
      const currentProject = currentState.projects.find(
        (p) => p.id === currentState.currentProjectId
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

  return {
    fillForm,
    setCurrentEditingId: (id) => {
      currentEditingId = id;
    },
  };
}
