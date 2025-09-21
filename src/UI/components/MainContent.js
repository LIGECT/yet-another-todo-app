import "../../css/layout/MainContent.css";
import "../../css/components/modal.css";
import { deleteTodoFromProject } from "../../utils/deleteButton.js";
import { openModal } from "../ui.js";

export function renderMainContent(project, state, render) {
  const mainContentContainer = document.getElementById("main-content");

  let todoList = mainContentContainer.querySelector("ul");
  if (!todoList) {
    todoList = document.createElement("ul");
    mainContentContainer.appendChild(todoList);
  }

  todoList.innerHTML = "";

  if (project) {
    project.todos.forEach((todo) => {
      const todoItem = document.createElement("li");
      todoItem.className = "todo-items";
      todoItem.dataset.todoId = todo.id;

      todoItem.addEventListener("click", () => {
        todoItem.classList.toggle("is-expanded");
      });

      const titleDiv = document.createElement("div");
      titleDiv.textContent = todo.title;

      const description = document.createElement("p");
      description.textContent = todo.description;

      const spanDate = document.createElement("span");
      spanDate.textContent = todo.dueDate;

      const priority = document.createElement("button");
      priority.textContent = todo.priority;

      const completed = document.createElement("input");
      completed.type = "checkbox";
      completed.checked = todo.completed;
      completed.id = `todo-completed-${todo.id}`;
      completed.name = "completed";

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.className = "delete-todo-btn";

      deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();

        const currentProject = state.projects.find(
          (p) => p.id === state.currentProjectId
        );

        const todoId = todoItem.dataset.todoId;
        deleteTodoFromProject(currentProject, todoId);

        render(state);
      });

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "edit-todo-btn";
      editButton.addEventListener("click", (e) => {
        e.stopPropagation();
        openModal();
      });

      const detailsContainer = document.createElement("div");
      detailsContainer.className = "todo-details";

      detailsContainer.append(
        description,
        spanDate,
        priority,
        deleteButton,
        editButton
      );

      todoItem.append(completed, titleDiv, detailsContainer);

      todoList.appendChild(todoItem);
    });
  }
}
