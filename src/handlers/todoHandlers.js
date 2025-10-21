import { animateCheckbox } from "../utils/animations.js";

export function setupTodoHandlers(getState, updateState, onEditTodo) {
  const mainContent = document.getElementById("main-content");

  function handleDeleteTodo(todoId) {
    const currentState = getState();
    const newProjects = currentState.projects.map((p) =>
      p.id === currentState.currentProjectId
        ? { ...p, todos: p.todos.filter((t) => t.id !== todoId) }
        : p
    );
    updateState({ ...currentState, projects: newProjects });
  }

  function handleToggleComplete(todoId, todo, checkboxSVG) {
    const currentState = getState();
    const newProjects = currentState.projects.map((p) =>
      p.id === currentState.currentProjectId
        ? {
            ...p,
            todos: p.todos.map((t) =>
              t.id === todoId ? { ...t, completed: !t.completed } : t
            ),
          }
        : p
    );

    const newState = { ...currentState, projects: newProjects };

    if (!todo.completed) {
      animateCheckbox(checkboxSVG, () => updateState(newState));
    } else {
      updateState(newState);
    }
  }

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
      handleDeleteTodo(todoId);
      return;
    }

    if (e.target.closest(".edit-todo-btn")) {
      e.stopPropagation();
      const todo = currentProject.todos.find((t) => t.id === todoId);
      if (todo && onEditTodo) {
        onEditTodo(todo);
      }
      return;
    }

    if (e.target.closest(".todo-checkbox-svg")) {
      e.stopPropagation();
      const todo = currentProject.todos.find((t) => t.id === todoId);
      if (todo) {
        handleToggleComplete(
          todoId,
          todo,
          e.target.closest(".todo-checkbox-svg")
        );
      }
      return;
    }
    todoItem.classList.toggle("is-expanded");
  });
}
