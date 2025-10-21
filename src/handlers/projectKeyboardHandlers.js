import { Project } from "../models/Project";

export function setupProjectKeyboardHandlers(getState, updateState) {
  const sidebar = document.getElementById("sidebar");
  let justPressedEnter = false;

  const setJustPressed = () => {
    justPressedEnter = true;
    setTimeout(() => {
      justPressedEnter = false;
    }, 100);
  };

  function handleNewProjectKeys(e, input) {
    if (e.key === "Enter") {
      setJustPressed();
      const projectName = input.value.trim();

      if (projectName) {
        const newProject = new Project(projectName);
        updateState({
          ...getState(),
          projects: [...getState().projects, newProject],
          currentProjectId: newProject.id,
          isCreatingProject: false,
        });
        input.value = "";
      } else {
        input.value = "";
        updateState({ ...getState(), isCreatingProject: false });
      }
    } else if (e.key === "Escape") {
      input.value = "";
      updateState({ ...getState(), isCreatingProject: false });
    }
  }

  function handleEditProjectKeys(e, input) {
    if (e.key === "Enter") {
      setJustPressed();
      const newName = input.value.trim();
      const currentState = getState();

      if (newName) {
        const updatedProjects = currentState.projects.map((p) =>
          p.id === currentState.editingProjectId ? { ...p, name: newName } : p
        );

        updateState({
          ...currentState,
          projects: updatedProjects,
          editingProjectId: null,
        });
      } else {
        updateState({
          ...currentState,
          editingProjectId: null,
        });
      }
    } else if (e.key === "Escape") {
      updateState({
        ...getState(),
        editingProjectId: null,
      });
    }
  }

  sidebar.addEventListener("keydown", (e) => {
    if (e.target.id === "new-project-input") {
      handleNewProjectKeys(e, e.target);
    } else if (e.target.closest(".editing-project-input")) {
      handleEditProjectKeys(e, e.target);
    }
  });

  sidebar.addEventListener(
    "blur",
    (e) => {
      if (e.relatedTarget?.closest("#fab-add-todo")) return;
      if (justPressedEnter) return;

      if (e.target.id === "new-project-input") {
        e.target.value = "";
        updateState({
          ...getState(),
          isCreatingProject: false,
        });
      } else if (e.target.closest(".editing-project-input")) {
        const currentState = getState();
        if (currentState.editingProjectId) {
          updateState({
            ...getState(),
            editingProjectId: null,
          });
        }
      }
    },
    true
  );

  return { getJustPressedEnter: () => justPressedEnter };
}
