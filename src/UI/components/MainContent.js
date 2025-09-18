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
      todoItem.textContent = todo.title;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.className = "delete-todo-btn";
      todoItem.appendChild(deleteButton);
      todoList.appendChild(todoItem);
    });
  }
}
