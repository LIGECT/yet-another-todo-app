export class Todo {
  constructor(title, description = "...", dueDate = "none", priority = "low") {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }
  // toggleComplete() { this.completed = !this.completed; }
}

// function createTodo(title, description, dueDate, priority) {
//   const newId = crypto.randomUUID();

//   return {
//     id: newId,
//     title,
//     description: description,
//     dueDate: dueDate,
//     priority: priority,
//     completed: false,
//   };
// }

// export { createTodo };
