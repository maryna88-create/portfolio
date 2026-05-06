"use strict";

export default function initActiveCard({
  itemSelector = ".portfolio__item",
  innerSelector = null,
  activeClass = "--active",
  onActivate = null,
  onDeactivate = null,
  dragThreshold = 5,
} = {}) {
  const items = document.querySelectorAll(itemSelector);
  if (!items.length) return;

  const getEl = (item) =>
    innerSelector ? item.querySelector(innerSelector) : item;

  let defaultIndex = [...items].findIndex(
    (item) => item.dataset.popular === "true",
  );

  if (defaultIndex === -1) defaultIndex = 0;

  const initial = getEl(items[defaultIndex]);
  if (initial) {
    initial.classList.add(activeClass);
    onActivate && onActivate(initial, defaultIndex);
  }

  items.forEach((item, index) => {
    const el = getEl(item);
    if (!el) return;

    let startX = 0;
    let isDragging = false;

    item.addEventListener("pointerdown", (e) => {
      startX = e.clientX;
      isDragging = false;
    });

    item.addEventListener("pointermove", (e) => {
      if (Math.abs(e.clientX - startX) > dragThreshold) {
        isDragging = true;
      }
    });


	item.addEventListener("click", (e) => {
    if (isDragging) return;

    if (e.target.closest("a")) return;

    items.forEach((i, idx) => {
      const el2 = getEl(i);
      if (!el2) return;

      el2.classList.remove(activeClass);
      onDeactivate && onDeactivate(el2, idx);
    });

    el.classList.add(activeClass);
    onActivate && onActivate(el, index);
  });

  });
}
