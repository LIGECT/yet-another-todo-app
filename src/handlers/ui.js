import { renderSidebar } from "../components/Sidebar/index.js";
import { renderMainContent } from "../components/MainContent/index.js";

export function render(state) {
  const currentProject = state.projects.find(
    (p) => p.id === state.currentProjectId
  );

  renderSidebar(
    state.projects,
    state.currentProjectId,
    state.isCreatingProject
  );
  renderMainContent(currentProject);
}

export function openModal() {
  const modalOverlay = document.getElementById("modal-overlay");
  modalOverlay.classList.remove("hidden");
}

export function closeModal() {
  const modalOverlay = document.getElementById("modal-overlay");
  modalOverlay.classList.add("hidden");
}
