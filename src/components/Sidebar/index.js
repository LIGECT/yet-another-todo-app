import imageLogo from "../../assets/images/logo.svg";
import "./Sidebar.css";
import {
  createDeleteIcon,
  createEditIcon,
  createFolderPlusIcon,
} from "../../utils/Icons.js";

export function renderSidebar(
  projects,
  currentProjectId,
  isCreatingProject,
  editingProjectId
) {
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
    newProjectInput.classList.add("new-project-input", "is-hidden");
    newProjectInput.placeholder = "New project name...";

    newProjectContainer.append(newProjectButton, newProjectInput);

    sidebarContainer.append(appHeader, projectsList, newProjectContainer);
  }

  const projectsList = sidebarContainer.querySelector(".projects-list");
  projectsList.replaceChildren();

  if (projects.length === 0) {
    const emptyStateContainer = document.createElement("div");
    emptyStateContainer.className = "projects-empty-state";

    const folderIcon = createFolderPlusIcon();

    const emptyStateMessage = document.createElement("p");
    emptyStateMessage.className = "empty-state-message";
    emptyStateMessage.textContent = "Create your first project";

    emptyStateContainer.append(folderIcon, emptyStateMessage);
    projectsList.appendChild(emptyStateContainer);
  } else {
    projects.forEach((project) => {
      const projectBlock = document.createElement("div");
      projectBlock.dataset.projectId = project.id;
      projectBlock.className = "project-item";
      if (project.id === currentProjectId) {
        projectBlock.classList.add("active-project");
      }
      projectsList.appendChild(projectBlock);

      if (project.id === editingProjectId) {
        projectBlock.classList.add("editing");
        const input = document.createElement("input");
        input.type = "text";
        input.className = "editing-project-input";
        input.value = project.name;
        input.placeholder = "Rename project...";
        projectBlock.append(input);
        input.focus();
      } else {
        const projectName = document.createElement("span");
        projectName.textContent = project.name;

        projectBlock.append(projectName);

        if (project.id === currentProjectId) {
          const deleteButton = document.createElement("button");
          deleteButton.className = "delete-project-btn";
          deleteButton.setAttribute(
            "aria-label",
            `Delete project: ${project.name}`
          );
          const trashIcon = createDeleteIcon();
          deleteButton.append(trashIcon);

          const editButton = document.createElement("button");
          editButton.className = "edit-project-btn";
          editButton.setAttribute(
            "aria-label",
            `Rename project: ${project.name}`
          );
          const editIcon = createEditIcon();
          editButton.append(editIcon);

          const actions = document.createElement("div");
          actions.className = "project-action";
          actions.append(editButton, deleteButton);
          projectBlock.append(actions);
        }
      }
    });
  }

  const newProjectButton = sidebarContainer.querySelector(".new-project-btn");
  const newProjectInput = sidebarContainer.querySelector("#new-project-input");

  newProjectButton.classList.toggle("is-hidden", isCreatingProject);
  newProjectInput.classList.toggle("is-hidden", !isCreatingProject);

  if (isCreatingProject) {
    newProjectInput.focus();
  }
}
