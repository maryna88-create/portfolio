"use strict";

import { overlayController } from "./overlayController.js";

export default function openMenu() {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("sidemenu");
  const navLinks = document.querySelectorAll(".nav-list__link");
  const overlay = document.getElementById("overlay");

  burger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    burger.classList.toggle("active");
    document.body.classList.toggle("menu-open", isOpen);

    if (isOpen) {
      overlayController.open("menu");
    } else {
      overlayController.close();
    }
  });

  overlay.addEventListener("click", () => {
    if (!menu.classList.contains("open")) return;

    closeMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }

      closeMenu();
    });
  });

  function closeMenu() {
	menu.classList.remove("open")
	burger.classList.remove("active")
	document.body.classList.remove("menu-open")
	overlayController.close();
  }
}
