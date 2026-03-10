"use strict";

import openTab from "./openTab.js";
import openMenu from "./openMenu.js";
import shrinkHeader from "./shrinkHeader.js";
import initPortfolioReveal from "./initPortfolioReveal.js";
import createWatcher from "./createWatcher.js";
// import initPortfolioTapOverlay from "./initPortfolioTapOverlay.js";
import initI18n from "./lang.js";
import initContactForm from "./initContactForm.js";
import initToTop from "./toTopBtn/initToTop.js";

document.addEventListener("DOMContentLoaded", () => {
  initI18n();
  openTab();
  openMenu();
  shrinkHeader();
  initPortfolioReveal();
//   initPortfolioTapOverlay();
  initContactForm();
  createWatcher(
    ".portfolio",
    (entry, section) => {
      section.classList.add("--watcher-view");
    },
    { once: true },
  );

  initToTop();
});

window.addEventListener("load", () => {
  document.querySelector(".hero").classList.add("--visible");

  setTimeout(() => {
    document.querySelector(".about").classList.add("--visible");
  }, 1200);
});
