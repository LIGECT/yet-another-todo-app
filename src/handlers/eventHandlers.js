import { deleteTodoFromProject } from "../utils/deleteButton.js";
import { openModal, closeModal } from "./ui.js";
import { animateCheckbox } from "../utils/animations.js";
import { Todo } from "../models/Todo.js";
import { Project } from "../models/Project.js";

function setupAppEventHandlers(state, updateState) {
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
      // state.currentProjectId = projectId;
      // render(state);
      updateState({
        ...state,
        currentProjectId: projectId,
      });
      return;
    }

    const newProjectBtn = e.target.closest(".new-project-btn");
    if (newProjectBtn) {
      // state.isCreatingProject = true;
      // render(state);
      updateState({
        ...state,
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
            ...state,
            projects: [...state.projects, newProject],
            currentProjectId: newProject.id,
          };
          input.value = "";
          newState.isCreatingProject = false;
          updateState(newState);
        } else {
          input.value = "";
          updateState({ ...state, isCreatingProject: false });
        }
      } else if (e.key === "Escape") {
        const input = e.target;
        input.value = "";
        updateState({
          ...state,
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
          ...state,
          isCreatingProject: false,
        });
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
      const newProjects = state.projects.map((p) => {
        if (p.id === state.currentProjectId) {
          deleteTodoFromProject(p, todoId);
        }
        return p;
      });
      updateState({ ...state, projects: newProjects });
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
        animateCheckbox(checkboxSVG, () => {
          updateState({ ...state });
        });
        // const todoItemElement = e.target.closest(".todo-items");

        // todoItemElement.classList.add("is-completed");

        // animateCheckbox(checkboxSVG, () => render(state));
      } else if (todo) {
        todo.completed = false;
        updateState({ ...state });
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

    const title = document.getElementById("edit-title").value.trim();
    const description = document
      .getElementById("edit-description")
      .value.trim();
    const dueDate = document.getElementById("edit-dueDate").value;
    const priority = activePriorityButton.dataset.priority;

    let newProjects;

    if (currentEditingId !== null) {
      newProjects = state.projects.map((project) => {
        if (project.id === state.currentProjectId) {
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

      const newState = {
        ...state,
        projects: newProjects,
      };
      updateState(newState);
    } else {
      const newTodo = new Todo(title, description, dueDate, priority);
      const newProjects = state.projects.map((project) => {
        if (project.id === state.currentProjectId) {
          return {
            ...project,
            todos: [...project.todos, newTodo],
          };
        } else {
          return project;
        }
      });
      const newState = {
        ...state,
        projects: newProjects,
      };

      updateState(newState);
    }
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
}

export { setupAppEventHandlers };
