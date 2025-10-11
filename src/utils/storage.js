import { Todo } from "../models/Todo.js";
import { Project } from "../models/Project.js";

function saveState(state) {
  localStorage.setItem("todoAppState", JSON.stringify(state));
}

function loadState() {
  let data = localStorage.getItem("todoAppState");

  if (!data) {
    return undefined;
  }

  return JSON.parse(data, (key, value) => {
    if (
      value &&
      typeof value === "object" &&
      Array.isArray(value.todos) &&
      value.name
    ) {
      const project = new Project(value.name);
      project.id = value.id;
      project.todos = value.todos;
      return project;
    }

    if (
      value &&
      typeof value === "object" &&
      value !== null &&
      value.title &&
      value.completed !== undefined
    ) {
      return new Todo(
        value.title,
        value.description,
        value.dueDate,
        value.priority,
        value.completed,
        value.id
      );
    }
    return value;
  });
}

export { saveState, loadState };
