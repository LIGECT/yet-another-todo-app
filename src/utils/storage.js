import { Todo } from "../models/Todo.js";
import { Project } from "../models/Project.js";

function saveState(state) {
  localStorage.setItem("todoAppState", JSON.stringify(state));
}

function loadState() {
  let currentLocal = localStorage.getItem("todoAppState");

  if (!currentLocal) {
    return undefined;
  }

  const parsedState = JSON.parse(currentLocal);

  const loadedProject = parsedState.projects.map((p) => {
    const project = new Project(p.name);
    project.id = p.id;
    project.todos = p.todos.map(
      (t) =>
        new Todo(
          t.title,
          t.description,
          t.dueDate,
          t.priority,
          t.completed,
          t.id
        )
    );
    return project;
  });

  return { ...parsedState, projects: loadedProject };
}

export { saveState, loadState };
