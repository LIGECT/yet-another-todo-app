export function render(state) {
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
