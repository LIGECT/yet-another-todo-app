export class Todo {
  constructor(
    title,
    description = "",
    dueDate = "none",
    priority = "low",
    completed = false,
    id = crypto.randomUUID()
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }
}
