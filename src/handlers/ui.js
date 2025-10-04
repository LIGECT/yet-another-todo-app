import { renderSidebar } from "../components/Sidebar/index.js";
import { renderMainContent } from "../components/MainContent/index.js";
import { fillForm } from "./eventHandlers.js";

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

export function openModal(options) {
  const modalOverlay = document.getElementById("modal-overlay");
  modalOverlay.classList.remove("hidden");
  const form = document.getElementById("edit-form");

  if (options.mode === "create") {
    document.getElementById("edit-title").value = "";
    document.getElementById("edit-description").value = "";
    document.getElementById("edit-dueDate").value = "";

    const title = document.getElementById("titleForm");
    title.textContent = "Add Task";
  } else if (options.mode === "edit") {
    document.getElementById("titleForm").textContent = "Edit Task";
    fillForm(options.todo);
  }
}

export function closeModal() {
  const modalOverlay = document.getElementById("modal-overlay");
  modalOverlay.classList.add("hidden");
}
