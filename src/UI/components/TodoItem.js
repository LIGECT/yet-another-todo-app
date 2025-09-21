import "../../css/components/modal.css";

export function createTodoItemElement(todo) {
  const todoItem = document.createElement("li");
  todoItem.className = "todo-items";
  todoItem.dataset.todoId = todo.id;

  if (todo.completed) {
    todoItem.classList.add("is-completed");
  }

  const completed = document.createElement("input");
  completed.type = "checkbox";
  completed.checked = todo.completed;
  completed.id = `todo-completed-${todo.id}`;
  completed.name = "completed";
  completed.className = "todo-checkbox";

  const titleDiv = document.createElement("div");
  titleDiv.textContent = todo.title;
  titleDiv.className = "todo-title";

  const deteilsContainer = document.createElement("div");
  deteilsContainer.className = "todo-details";

  const description = document.createElement("p");
  description.textContent = todo.description;

  const spanDate = document.createElement("span");
  spanDate.textContent = todo.dueDate;

  const priority = document.createElement("button");
  priority.textContent = todo.priority;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.className = "delete-todo-btn";

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "edit-todo-btn";

  deteilsContainer.append(
    description,
    spanDate,
    priority,
    deleteButton,
    editButton
  );

  todoItem.append(completed, titleDiv, deteilsContainer);

  return todoItem;
}
