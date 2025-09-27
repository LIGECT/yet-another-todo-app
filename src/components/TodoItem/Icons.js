import { createElement, Trash2, Edit3 } from "lucide";

export function createDeleteIcon() {
  const icon = createElement(Trash2);
  icon.classList.add("icon", "icon-delete");
  return icon;
}

export function createEditIcon() {
  const icon = createElement(Edit3);
  icon.classList.add("icon", "icon-edit");
  return icon;
}
