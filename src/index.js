import "./style.css";
import { greeting } from "./greeting.js";

function component() {
  const element = document.createElement("div");
  element.innerHTML = greeting;
  element.classList.add("hello"); // Добавим класс для примера стилизации
  return element;
}

document.getElementById("app").appendChild(component());
console.log("Логика приложения запущена!");
