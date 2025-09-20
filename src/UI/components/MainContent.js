export function renderMainContent(project) {
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
      todoItem.dataset.todoId = todo.id;

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

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "edit-todo-btn";

      todoItem.append(
        titleDiv,
        description,
        spanDate,
        priority,
        completed,
        deleteButton,
        editButton
      );

      todoList.appendChild(todoItem);
    });
  }
}
