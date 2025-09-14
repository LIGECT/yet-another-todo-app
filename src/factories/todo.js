function createTodo(title, description, dueDate, priority) {
  const newId = "todo-" + Date.now();

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
