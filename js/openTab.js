"use strict";

export default function openTab() {
  let tabLinks = document.querySelectorAll(".about__tab-links");
  let tabContents = document.querySelectorAll(".about__tab-contents");

  function activateTab(tabName) {
    tabLinks.forEach((l) => l.classList.remove("about__tab-links--active"));
    tabContents.forEach((c) => {
      c.classList.remove("about__tab-contents--active");
    });

    const activeLink = document.querySelector(
      `.about__tab-links[data-tab="${tabName}"]`,
    );

    const activeContent = document.getElementById(tabName);
    if (activeLink) activeLink.classList.add("about__tab-links--active");
    if (activeContent)
      activeContent.classList.add("about__tab-contents--active");
  }

  tabLinks.forEach((link) => {
    link.addEventListener("click", () => {
      activateTab(link.dataset.tab);
    });
  });

  if (window.location.hash) {
    const hash = window.location.hash.replace("#", "");
    activateTab(hash);
  } else {
    const defaultTab = document.querySelector(".about__tab-links--active");
    if (defaultTab) activateTab(defaultTab.dataset.tab);
  }

  document.querySelectorAll("[data-open-tab]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      activateTab(trigger.dataset.openTab);
    });
  });

  const activeBtn = document.querySelector(".about__tab-links--active");
  if (!activeBtn) {
    const firstBtn = document.querySelector(".about__tab-links");
    const firstContent = document.querySelector(".about__tab-contents");
    if (firstBtn && firstContent) {
      firstBtn.classList.add("about__tab-links--active");
      firstContent.classList.add("about__tab-contents--active");
    }
  }

}
