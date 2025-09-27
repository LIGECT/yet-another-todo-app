import imageLogo from "../../assets/images/logo.svg";
import "../../css/layout/Sidebar.css";

export function renderSidebar(projects, currentProjectId) {
  const sidebarContainer = document.getElementById("sidebar");
  sidebarContainer.innerHTML = "";

  const appHeader = document.createElement("div");
  appHeader.className = "app-header";

  const logo = document.createElement("img");
  logo.className = "logo-todo";
  logo.src = imageLogo;
  logo.sizes = "80px";
  logo.width = 80;
  logo.height = 80;

  logo.alt = "Abstract logo for a productivity app.";
  logo.loading = "lazy";

  const appTitle = document.createElement("h1");
  appTitle.className = "app-title";
  appTitle.textContent = "Todo App";

  appHeader.append(logo, appTitle);

  const projectsList = document.createElement("div");
  projectsList.className = "projects-list";

  projects.forEach((project) => {
    const projectBlock = document.createElement("div");
    projectBlock.dataset.projectId = project.id;
    projectBlock.className = "project-item";

    if (project.id === currentProjectId) {
      projectBlock.classList.add("active-project");
    }

    projectBlock.textContent = project.name;
    projectsList.appendChild(projectBlock);
  });

  const newProjectButton = document.createElement("button");
  newProjectButton.className = "new-project-btn";
  newProjectButton.textContent = "+ New Project";

  sidebarContainer.append(appHeader, projectsList, newProjectButton);
}
