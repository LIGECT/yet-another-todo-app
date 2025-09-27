import { createElement, Trash2, Edit3, Circle, CircleCheck } from "lucide";

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

export function createCircleIcon() {
  const icon = createElement(Circle);
  icon.classList.add("icon", "circle");
  return icon;
}

export function createCircleCheckIcon() {
  const icon = createElement(CircleCheck);
  icon.classList.add("icon", "circle-check-big");
  return icon;
}
