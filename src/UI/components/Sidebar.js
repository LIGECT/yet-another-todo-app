export function renderSidebar(projects, currentProjectId) {
  const sidebarContainer = document.getElementById("sidebar");
  sidebarContainer.innerHTML = "";

  projects.forEach((project) => {
    const projectBlock = document.createElement("div");
    projectBlock.dataset.projectId = project.id;

    if (project.id === currentProjectId) {
      projectBlock.classList.add("active-project");
    }

    const projectTitle = document.createElement("h2");
    projectTitle.textContent = project.name;
    projectBlock.appendChild(projectTitle);
    sidebarContainer.appendChild(projectBlock);
  });
}
