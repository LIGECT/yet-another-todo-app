import "../../css/layout/Sidebar.css";

export function renderSidebar(projects, currentProjectId) {
  const sidebarContainer = document.getElementById("sidebar");
  sidebarContainer.innerHTML = "";

  const appTitle = document.createElement("h1");
  appTitle.className = "app-title";
  appTitle.textContent = "TodoApp";

  const projectsList = document.createElement("div");
  projectsList.className = "projects-list";

  projects.forEach((project) => {
    const projectBlock = document.createElement("div");
    projectBlock.dataset.projectId = project.id;
    projectBlock.className = "project-item";

    if (project.id === currentProjectId) {
      projectBlock.classList.add("active-project");
    }

    // const projectTitle = document.createElement("h2");
    // projectTitle.textContent = project.name;
    // projectBlock.appendChild(projectTitle);
    // sidebarContainer.appendChild(projectBlock);

    projectBlock.textContent = project.name;
    projectsList.appendChild(projectBlock);
  });

  const newProjectButton = document.createElement("button");
  newProjectButton.className = "new-project-btn";
  newProjectButton.textContent = "+ New Project";

  sidebarContainer.append(appTitle, projectsList, newProjectButton);
}
