"use strict";

import createReactiveWatcher from "./createReactiveWatcher.js";

export default function initToTop() {
  const toTopBtn = document.querySelector("#to-top");
  if (!toTopBtn) return;

  createReactiveWatcher(
    "#home",
    (entry) => {
      if (!entry.isIntersecting) {
        toTopBtn.classList.add("--visible");
      } else {
        toTopBtn.classList.remove("--visible");
      }
    });

  toTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
