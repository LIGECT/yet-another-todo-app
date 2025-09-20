import { renderSidebar } from "./components/Sidebar";
import { renderMainContent } from "./components/MainContent";

export function handleProjectClicks(state, deleteTodoFunc) {
  const appContainer = document.getElementById("app");

  appContainer.addEventListener("click", function (event) {
    const projectElement = event.target.closest("[data-project-id]");
    // const clickedButton = event.target.closest(".delete-todo-btn");

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
