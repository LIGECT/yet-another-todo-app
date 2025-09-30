import imageLogo from "../../assets/images/logo.svg";
import "./Sidebar.css";

export function renderSidebar(projects, currentProjectId, isCreatingProject) {
  const sidebarContainer = document.getElementById("sidebar");

  if (!sidebarContainer.querySelector(".app-header")) {
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

    const newProjectContainer = document.createElement("div");
    newProjectContainer.className = "new-project-container";

    const newProjectButton = document.createElement("button");
    newProjectButton.className = "new-project-btn";
    newProjectButton.textContent = "+ New Project";

    const newProjectInput = document.createElement("input");
    newProjectInput.type = "text";
    newProjectInput.id = "new-project-input";
    newProjectInput.className = "new-project-input";
    newProjectInput.placeholder = "New project name...";

    newProjectContainer.append(newProjectButton, newProjectInput);

    sidebarContainer.append(appHeader, projectsList, newProjectContainer);
  }

  const projectsList = sidebarContainer.querySelector(".projects-list");
  projectsList.innerHTML = "";
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

  const newProjectButton = sidebarContainer.querySelector(".new-project-btn");
  const newProjectInput = sidebarContainer.querySelector("#new-project-input");

  if (isCreatingProject) {
    newProjectButton.classList.add("is-hidden");
    newProjectInput.classList.remove("is-hidden");
  } else {
    newProjectButton.classList.remove("is-hidden");
    newProjectInput.classList.add("is-hidden");
  }
}
