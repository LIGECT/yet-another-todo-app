function createTodo(title, description, dueDate, priority) {
  const newId = crypto.randomUUID();

  return {
    id: newId,
    title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    completed: false,
  };
}

export { createTodo };
