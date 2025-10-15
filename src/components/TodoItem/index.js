import { createDeleteIcon, createEditIcon } from "../../utils/Icons.js";
import { formatDueDate } from "../../utils/date.js";

export function createTodoItemElement(todo) {
  const todoItem = document.createElement("li");
  todoItem.className = "todo-items";
  todoItem.dataset.todoId = todo.id;
  todoItem.dataset.priority = todo.priority;

  if (todo.completed) {
    todoItem.classList.add("is-completed");
  }

  const priorityIndicator = document.createElement("div");
  priorityIndicator.className = "priority-indicator";

  const mainInfo = document.createElement("div");
  mainInfo.className = "todo-main-info";

  const checkboxSVG = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  checkboxSVG.setAttribute("class", "todo-checkbox-svg");
  checkboxSVG.setAttribute("viewBox", "0 0 24 24");
  checkboxSVG.innerHTML = `
    <circle class="checkbox-circle" cx="12" cy="12" r="10" fill="none" stroke="#888" stroke-width="2"/>
    <path class="checkbox-checkmark" d="M7 13l3 3 7-7" stroke="#00C4B4" stroke-width="2" fill="none"/>
`;

  const titleAndDate = document.createElement("div");
  titleAndDate.className = "title-and-date";

  const title = document.createElement("span");
  title.textContent = todo.title;
  title.className = "todo-title";

  const dueDate = document.createElement("span");
  dueDate.className = "todo-due-date";
  dueDate.textContent = formatDueDate(todo.dueDate);

  titleAndDate.append(title, dueDate);

  mainInfo.append(checkboxSVG, titleAndDate);

  const detailsContainer = document.createElement("div");
  detailsContainer.className = "todo-details";

  const description = document.createElement("p");
  description.className = "todo-description";
  description.textContent = todo.description;

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-todo-btn";
  deleteButton.setAttribute("aria-label", `Delete task: ${todo.title}`);
  const trashIcon = createDeleteIcon();
  deleteButton.append(trashIcon);

  const editButton = document.createElement("button");
  editButton.className = "edit-todo-btn";
  editButton.setAttribute("aria-label", `Edit task: ${todo.title}`);
  const editIcon = createEditIcon();
  editButton.append(editIcon);

  const actions = document.createElement("div");
  actions.className = "todo-actions";
  actions.append(editButton, deleteButton);

  detailsContainer.append(description, actions);

  todoItem.append(priorityIndicator, mainInfo, detailsContainer);

  return todoItem;
}
