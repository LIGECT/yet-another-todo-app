export function setupProjectHandlers(getState, updateState) {
  const sidebar = document.getElementById("sidebar");
  let justPressedEnter = false;

  function handleProjectClick(projectId) {
    const currentState = getState();
    if (currentState.currentProjectId !== projectId) {
      updateState({
        ...currentState,
        currentProjectId: projectId,
      });
    }
  }

  function handleNewProject() {
    updateState({
      ...getState(),
      editingProjectId: null,
      isCreatingProject: true,
    });
  }

  function handleDeleteProject(projectIdToDelete) {
    const currentState = getState();
    const indexToDelete = currentState.projects.findIndex(
      (p) => p.id === projectIdToDelete
    );
    const newProjects = currentState.projects.filter(
      (p) => p.id !== projectIdToDelete
    );

    let newCurrentProjectId = null;

    if (newProjects.length > 0) {
      newCurrentProjectId =
        indexToDelete === 0
          ? newProjects[0].id
          : newProjects[indexToDelete - 1].id;
    }

    updateState({
      ...currentState,
      projects: newProjects,
      currentProjectId: newCurrentProjectId,
    });
  }

  function handleEditProject(projectIdToEdit) {
    updateState({
      ...getState(),
      editingProjectId: projectIdToEdit,
      isCreatingProject: false,
    });
  }

  sidebar.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-project-btn");
    if (deleteBtn) {
      e.stopPropagation();
      const item = deleteBtn.closest(".project-item");
      if (item) {
        handleDeleteProject(item.dataset.projectId);
      }
      return;
    }

    const editBtn = e.target.closest(".edit-project-btn");
    if (editBtn) {
      e.stopPropagation();
      const item = editBtn.closest(".project-item");
      if (item) {
        handleEditProject(item.dataset.projectId);
      }
      return;
    }

    const projectItem = e.target.closest(".project-item");
    if (projectItem) {
      handleProjectClick(projectItem.dataset.projectId);
      return;
    }

    if (e.target.closest(".new-project-btn")) {
      handleNewProject();
      return;
    }
  });

  return { sidebar, justPressedEnter };
}
