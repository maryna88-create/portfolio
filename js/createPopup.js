"use strict";

import { overlayController } from "./overlayController.js";

export default function createPopup(options) {
  const {
    root,
    message,
    close,
    activeClass = "active",
    autoClose = 3000,
  } = options;

  const popup = document.querySelector(root);
  if (!popup) {
    console.warn(`Popup root "${root}" not found`);
    return { open: () => {}, close: () => {} };
  }

  const msgEl = popup.querySelector(message);
  const closeBtn = popup.querySelector(close);

  let timer = null;

  function open(text) {
    if (msgEl) msgEl.textContent = text;
    popup.classList.add(activeClass);

    overlayController.open("popup");

    if (timer) clearTimeout(timer);

    if (autoClose) {
      timer = setTimeout(() => {
        closePopup();
      }, autoClose);
    }
  }

  function closePopup() {
    popup.classList.remove(activeClass);
    overlayController.close();

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  if (closeBtn) closeBtn.addEventListener("click", closePopup);

  return { open, close: closePopup };
}
