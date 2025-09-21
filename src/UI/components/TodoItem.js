// import "../../css/components/modal.css";

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

  const completed = document.createElement("input");
  completed.type = "checkbox";
  completed.checked = todo.completed;
  completed.id = `todo-completed-${todo.id}`;
  completed.name = "completed";
  completed.className = "todo-checkbox";

  const titleAndDate = document.createElement("div");
  titleAndDate.className = "title-and-date";

  const title = document.createElement("span");
  title.textContent = todo.title;
  title.className = "todo-title";

  const dueDate = document.createElement("span");
  dueDate.className = "todo-due-date";
  dueDate.textContent = todo.dueDate;

  titleAndDate.append(title, dueDate);

  mainInfo.append(completed, titleAndDate);

  const detailsContainer = document.createElement("div");
  detailsContainer.className = "todo-details";

  const description = document.createElement("p");
  description.className = "todo-description";
  description.textContent = todo.description;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.className = "delete-todo-btn";

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "edit-todo-btn";

  const actions = document.createElement("div");
  actions.className = "todo-actions";
  actions.append(editButton, deleteButton);

  detailsContainer.append(description, actions);

  todoItem.append(priorityIndicator, mainInfo, detailsContainer);

  return todoItem;
}
