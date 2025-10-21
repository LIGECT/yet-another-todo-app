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
  const titleInput = document.getElementById("edit-title");
  let currentEditingId = null;
  let activePriorityButton = null;
  let editingProjectId = null;
  let justPressedEnter = false;

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
      const currentState = getState();
      if (currentState.currentProjectId !== projectId) {
        updateState({
          ...currentState,
          currentProjectId: projectId,
        });
      }
    }

    const newProjectBtn = e.target.closest(".new-project-btn");
    if (newProjectBtn) {
      updateState({
        ...getState(),
        editingProjectId: null,
        isCreatingProject: true,
      });
      return;
    }

    const deleteProjectBtn = e.target.closest(".delete-project-btn");
    if (deleteProjectBtn) {
      e.stopPropagation();

      const projectItem = e.target.closest(".project-item");
      const projectIdToDelete = projectItem.dataset.projectId;

      const currentState = getState();

      const indexToDelete = currentState.projects.findIndex(
        (p) => p.id === projectIdToDelete
      );

      const newProjects = currentState.projects.filter(
        (p) => p.id !== projectIdToDelete
      );

      let newCurrentProjectId = null;

      if (newProjects.length > 0) {
        if (indexToDelete === 0) {
          newCurrentProjectId = newProjects[0].id;
        } else {
          newCurrentProjectId = newProjects[indexToDelete - 1].id;
        }
      }

      updateState({
        ...currentState,
        projects: newProjects,
        currentProjectId: newCurrentProjectId,
      });
      return;
    }

    const editProjectBtn = e.target.closest(".edit-project-btn");
    if (editProjectBtn) {
      e.stopPropagation();

      const projectItem = e.target.closest(".project-item");
      const projectIdToEdit = projectItem.dataset.projectId;

      const currentState = getState();
      updateState({
        ...currentState,
        editingProjectId: projectIdToEdit,
        isCreatingProject: false,
      });
    }
  });

  sidebar.addEventListener("keydown", (e) => {
    if (e.target.id === "new-project-input") {
      if (e.key === "Enter") {
        justPressedEnter = true;
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
      setTimeout(() => {
        justPressedEnter = false;
      }, 100);
    } else if (e.target.closest(".editing-project-input")) {
      if (e.key === "Enter") {
        justPressedEnter = true;
        const input = e.target;
        const newName = input.value.trim();
        const currentState = getState();

        if (newName) {
          const newProject = currentState.projects.map((p) => {
            if (p.id === currentState.editingProjectId) {
              return { ...p, name: newName };
            }
            return p;
          });
          updateState({
            ...currentState,
            projects: newProject,
            editingProjectId: null,
            isCreatingProject: false,
          });
        } else {
          updateState({
            ...currentState,
            editingProjectId: null,
          });
        }
        setTimeout(() => {
          justPressedEnter = false;
        }, 100);
      } else if (e.key === "Escape") {
        updateState({
          ...getState(),
          editingProjectId: null,
        });
      }
    }
  });

  sidebar.addEventListener(
    "blur",
    (e) => {
      if (e.relatedTarget && e.relatedTarget.closest("#fab-add-todo")) return;

      if (justPressedEnter) return;

      if (e.target.id === "new-project-input") {
        e.target.value = "";
        updateState({
          ...getState(),
          isCreatingProject: false,
        });
      } else if (e.target.closest(".editing-project-input")) {
        const currentState = getState();
        if (currentState.editingProjectId) {
          updateState({
            ...getState(),
            editingProjectId: null,
          });
        }
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
