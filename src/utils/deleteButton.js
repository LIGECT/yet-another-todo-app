// export function deleteTodo(state, todoId) {
//   const project = state.projects.find((p) => p.id === state.currentProjectId);
//   if (project) {
//     project.todos = project.todos.filter((t) => t.id !== todoId);
//   }
//   render(state);
// }

// utils/deleteButton.js
export function deleteTodoFromProject(project, todoId) {
  if (!project) return; // На всякий случай
  project.todos = project.todos.filter((t) => t.id !== todoId);
}
