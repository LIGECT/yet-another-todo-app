import { createElement, Trash2, Edit3, Menu, X } from "lucide";

function createDeleteIcon() {
  const icon = createElement(Trash2);
  icon.classList.add("icon", "icon-delete");
  return icon;
}

function createEditIcon() {
  const icon = createElement(Edit3);
  icon.classList.add("icon", "icon-edit");
  return icon;
}

function createMenuIcon() {
  const icon = createElement(Menu);
  icon.classList.add("icon", "icon-menu");
  return icon;
}

function createCloseIcon() {
  const icon = createElement(X);
  icon.classList.add("icon", "icon-close");
  return icon;
}

export { createDeleteIcon, createEditIcon, createMenuIcon, createCloseIcon };
