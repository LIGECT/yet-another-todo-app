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
      todoItem.textContent = todo.title;
      todoList.appendChild(todoItem);
    });
  }
}
