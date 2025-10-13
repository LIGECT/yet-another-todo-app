import { createMenuIcon, createCloseIcon } from "../utils/Icons";
import headerLogo from "../assets/images/logo.svg";

function initializeSidebar() {
  const burgerBtn = document.getElementById("burger-btn");
  const closeSidebarBtn = document.getElementById("mobile-close-sidebar");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");

  if (!burgerBtn || !closeSidebarBtn || !sidebar || !overlay) {
    console.error("Один из элементов сайдбара не найден. Меню сломается.");
    return;
  }

  function openSidebar() {
    document.body.classList.add("sidebar-is-open");
    sidebar.classList.add("is-open");
    overlay.classList.remove("hidden");
  }

  function closeSidebar() {
    document.body.classList.remove("sidebar-is-open");
    sidebar.classList.remove("is-open");
    overlay.classList.add("hidden");
  }

  burgerBtn.addEventListener("click", openSidebar);
  closeSidebarBtn.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeSidebar();
    }
  });
}

function addIconsToMobileHeader() {
  const burgerBtn = document.getElementById("burger-btn");
  const closeBtn = document.getElementById("mobile-close-sidebar");
  const logoImg = document.querySelector(".header-logo");

  if (logoImg) logoImg.src = headerLogo;

  if (burgerBtn) burgerBtn.replaceChildren(createMenuIcon());
  if (closeBtn) closeBtn.replaceChildren(createCloseIcon());
}

function initializeMobileMenu() {
  addIconsToMobileHeader();
  initializeSidebar();
}

export { initializeMobileMenu };
