import { renderSidebar } from "./components/Sidebar";
import { renderMainContent } from "./components/MainContent";

export function handleProjectClicks(state) {
  const appContainer = document.getElementById("app");

  appContainer.addEventListener("click", function (event) {
    const projectElement = event.target.closest("[data-project-id]");

    if (projectElement) {
      const projectId = projectElement.dataset.projectId;
      state.currentProjectId = projectId;
      render(state);
      console.log("Clicked on a project! Project ID:", projectId);
    } else {
      console.log("Clicked somewhere else, ignoring.");
    }
  });
}

export function render(state) {
  const currentProject = state.projects.find(
    (p) => p.id === state.currentProjectId
  );

  renderSidebar(state.projects, state.currentProjectId);
  renderMainContent(currentProject, state, render);
}

export function openModal() {
  document.getElementById("edit-modal").classList.remove("hidden");
}

export function closeModal() {
  document.getElementById("edit-modal").classList.add("hidden");
}

export function setupModalHandlers() {
  const cancelBtn = document.getElementById("cancel-edit-btn");
  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
  });
}
