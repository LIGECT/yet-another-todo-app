function createProject(name) {
  const newId = "project-" + Date.now();

  return {
    id: newId,
    name: name,
    todos: [],
  };
}

export { createProject };
