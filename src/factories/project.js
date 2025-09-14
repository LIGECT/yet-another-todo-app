function createProject(name) {
  const newId = crypto.randomUUID();

  return {
    id: newId,
    name: name,
    todos: [],
  };
}

export { createProject };
