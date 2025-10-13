import { renderSidebar } from "../components/Sidebar/index.js";
import { renderMainContent } from "../components/MainContent/index.js";
import { initializeMobileMenu } from "../handlers/sidebarHandler.js";

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
  initializeMobileMenu();
}

export function openModal(options) {
  const modalOverlay = document.getElementById("modal-overlay");
  modalOverlay.classList.remove("hidden");

  if (options.mode === "create") {
    document.getElementById("titleForm").textContent = "Add Task";
  } else if (options.mode === "edit") {
    document.getElementById("titleForm").textContent = "Edit Task";
  }
}

export function closeModal() {
  const modalOverlay = document.getElementById("modal-overlay");
  modalOverlay.classList.add("hidden");
}
