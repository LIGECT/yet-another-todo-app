import "./style.css";
import { createTodo } from "./logics/todo";
import { createProject } from "./logics/project";

const project1 = createProject("Покупки");
const project2 = createProject("Работа");
const todo1 = createTodo("Купить молоко", "...", "2025-09-15", "hight");
const todo2 = createTodo("Написать отчёт", "...", "2025-09-16", "medium");
const todo3 = createTodo("Захватить мир", "...", "2025-12-31", "low");
project1.todos.push(todo1);
project2.todos.push(todo2);
project2.todos.push(todo3);

const appState = {
  projects: [project1, project2],
  currentProjectId: project1.id,
};

function render(state) {
  const contentDiv = document.getElementById("app");
  contentDiv.innerHTML = "";
  const fragment = document.createDocumentFragment();
  state.projects.forEach((project) => {
    const projectTitle = document.createElement("h2");
    projectTitle.textContent = project.name;

    const todoList = document.createElement("ul");

    project.todos.forEach((todo) => {
      const todoItem = document.createElement("li");
      todoItem.textContent = todo.title;
      todoList.appendChild(todoItem);
    });

    fragment.append(projectTitle, todoList);
  });

  contentDiv.appendChild(fragment);
}

render(appState);
