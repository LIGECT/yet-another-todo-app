export function handleProjectClicks(state) {
  const appContainer = document.getElementById("app");

  appContainer.addEventListener("click", function (event) {
    const projectElement = event.target.closest("[data-project-id]");

    if (projectElement) {
      const projectId = projectElement.dataset.projectId;
      state.currentProjectId = projectId;
      render(state);
      console.log("Кликнули по проекту! ID этого проекта:", projectId);
    } else {
      console.log("Кликнули по какой-то хуйне, игнорируем.");
    }
  });
}

export function render(state) {
  const contentDiv = document.getElementById("app");
  contentDiv.innerHTML = "";
  const fragment = document.createDocumentFragment();
  state.projects.forEach((project) => {
    const projectBlock = document.createElement("div");
    projectBlock.dataset.projectId = project.id;
    const projectTitle = document.createElement("h2");
    projectTitle.textContent = project.name;

    const todoList = document.createElement("ul");

    project.todos.forEach((todo) => {
      const todoItem = document.createElement("li");
      todoItem.textContent = todo.title;
      todoList.appendChild(todoItem);
    });
    projectBlock.append(projectTitle, todoList);
    fragment.append(projectBlock);
  });

  contentDiv.appendChild(fragment);
}
