export function deleteTodoFromProject(project, todoId) {
  if (!project) return; 
  project.todos = project.todos.filter((t) => t.id !== todoId);
}
