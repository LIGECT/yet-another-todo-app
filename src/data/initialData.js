import { Todo } from "../models/Todo";
import { Project } from "../models/Project";

const project1 = new Project("Shopping");
const project2 = new Project("Work");
const todo1 = new Todo(
  "Buy milk",
  "Get 2 liters of whole milk from the store",
  "2025-09-15",
  "high"
);
const todo2 = new Todo(
  "Write a report",
  "Prepare the quarterly sales report for the team",
  "2025-09-16",
  "medium"
);
const todo3 = new Todo(
  "Take over the world",
  "Step-by-step plan to achieve global domination",
  "2025-12-31",
  "low"
);

project1.todos.push(todo1);
project2.todos.push(todo2);
project2.todos.push(todo3);

const appState = {
  projects: [project1, project2],
  currentProjectId: project1.id,
  isCreatingProject: false,
};

export { appState };
