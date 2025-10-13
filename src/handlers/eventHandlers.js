import { openModal, closeModal } from "./ui.js";
import { animateCheckbox } from "../utils/animations.js";
import { Todo } from "../models/Todo.js";
import { Project } from "../models/Project.js";

function setupAppEventHandlers(getState, updateState) {
  const mainContent = document.getElementById("main-content");
  const sidebar = document.getElementById("sidebar");
  const form = document.getElementById("edit-form");
  const priorityContainer = document.querySelector(
    ".priority-segmented-control"
  );
  let currentEditingId = null;
  const titleInput = document.getElementById("edit-title");
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

      updateState({
        ...getState(),
        currentProjectId: projectId,
      });
      return;
    }

    const newProjectBtn = e.target.closest(".new-project-btn");
    if (newProjectBtn) {
      updateState({
        ...getState(),
        isCreatingProject: true,
      });
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

          const newState = {
            ...getState(),
            projects: [...getState().projects, newProject],
            currentProjectId: newProject.id,
            isCreatingProject: false,
          };
          input.value = "";
          updateState(newState);
        } else {
          input.value = "";
          updateState({ ...getState(), isCreatingProject: false });
        }
      } else if (e.key === "Escape") {
        const input = e.target;
        input.value = "";
        updateState({
          ...getState(),
          isCreatingProject: false,
        });
      }
    }
  });

  sidebar.addEventListener(
    "blur",
    (e) => {
      if (e.target.id === "new-project-input") {
        e.target.value = "";
        updateState({
          ...getState(),
          isCreatingProject: false,
        });
      }
    },
    true
  );

  mainContent.addEventListener("click", (e) => {
    const todoItem = e.target.closest(".todo-items");
    if (!todoItem) return;

    const currentState = getState();
    const currentProject = currentState.projects.find(
      (p) => p.id === currentState.currentProjectId
    );
    if (!currentProject) return;

    const todoId = todoItem.dataset.todoId;

    if (e.target.closest(".delete-todo-btn")) {
      e.stopPropagation();
      const currentState = getState();

      const newProjects = currentState.projects.map((p) => {
        if (p.id === currentState.currentProjectId) {
          return {
            ...p,
            todos: p.todos.filter((t) => t.id !== todoId),
          };
        }
        return p;
      });
      updateState({ ...currentState, projects: newProjects });
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
      const currentState = getState();
      const todo = currentProject.todos.find((t) => t.id === todoId);
      if (!todo) return;

      const newProjects = currentState.projects.map((p) => {
        if (p.id === currentState.currentProjectId) {
          return {
            ...p,
            todos: p.todos.map((t) => {
              if (t.id === todoId) {
                return { ...t, completed: !t.completed };
              }
              return t;
            }),
          };
        }
        return p;
      });

      const newState = { ...currentState, projects: newProjects };

      if (!todo.completed) {
        const checkboxSVG = e.target.closest(".todo-checkbox-svg");
        animateCheckbox(checkboxSVG, () => {
          updateState(newState);
        });
      } else {
        updateState(newState);
      }
      return;
    }

    todoItem.classList.toggle("is-expanded");
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

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const description = document
      .getElementById("edit-description")
      .value.trim();
    const dueDate = document.getElementById("edit-dueDate").value;
    const priority = activePriorityButton.dataset.priority;

    let newProjects;

    const currentState = getState();

    if (currentEditingId !== null) {
      newProjects = currentState.projects.map((project) => {
        if (project.id === currentState.currentProjectId) {
          return {
            ...project,
            todos: project.todos.map((todo) => {
              if (todo.id === currentEditingId) {
                return { ...todo, title, description, dueDate, priority };
              }
              return todo;
            }),
          };
        }
        return project;
      });
    } else {
      const newTodo = new Todo(title, description, dueDate, priority);
      newProjects = currentState.projects.map((project) => {
        if (project.id === currentState.currentProjectId) {
          return {
            ...project,
            todos: [...project.todos, newTodo],
          };
        }
        return project;
      });
    }

    const newState = {
      ...currentState,
      projects: newProjects,
    };
    updateState(newState);

    currentEditingId = null;
    closeModal();
    form.reset();
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

  titleInput.addEventListener("input", () => {
    if (titleInput.value.length > 30) {
      titleInput.setCustomValidity(
        "Title cannot be longer than 30 characters."
      );
    } else {
      titleInput.setCustomValidity("");
    }
  });
}

export { setupAppEventHandlers };
