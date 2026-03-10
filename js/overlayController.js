
"use strict";

export const overlayController = (() => {
  const overlay = document.querySelector("#overlay");
  if (!overlay) return;

  let currentType = null; // "menu" або "popup"

  function open(type) {
    currentType = type;

    overlay.classList.add("overlay--active");

    if (type === "menu") {
      overlay.classList.add("overlay--menu");
      overlay.classList.remove("overlay--popup");
    }

    if (type === "popup") {
      overlay.classList.add("overlay--popup");
      overlay.classList.remove("overlay--menu");
    }
  }

  function close() {
    overlay.classList.remove("overlay--active");
    overlay.classList.remove("overlay--menu");
    overlay.classList.remove("overlay--popup");

    currentType = null;
  }

  overlay.addEventListener("click", () => {
    if (currentType === "menu") {
      close();
    }
  });

  return { open, close };
})();