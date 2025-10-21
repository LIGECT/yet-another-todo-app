import { setupProjectHandlers } from "./projectHandlers.js";
import { setupProjectKeyboardHandlers } from "./projectKeyboardHandlers.js";
import { setupTodoHandlers } from "./todoHandlers.js";
import { setupFormHandlers } from "./formHandlers.js";
import { openModal } from "./ui.js";

function setupAppEventHandlers(getState, updateState) {
  setupProjectHandlers(getState, updateState);
  setupProjectKeyboardHandlers(getState, updateState);

  const formHandlers = setupFormHandlers(getState, updateState);

  setupTodoHandlers(getState, updateState, (todo) => {
    formHandlers.setCurrentEditingId(todo.id);
    openModal({ mode: "edit" });
    formHandlers.fillForm(todo);
  });
}

export { setupAppEventHandlers };
