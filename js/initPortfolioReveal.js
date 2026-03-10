"use strict";

export default function initPortfolioReveal() {
  const list = document.querySelector(".portfolio__preview-list");
  const items = document.querySelectorAll(".portfolio__item");
  const button = document.querySelector(".portfolio__button");

  if (!list || !items.length || !button) return;

  if (window.matchMedia("(max-width: 509px)").matches) {
    items.forEach((item) => {
      item.classList.add("show");
    });
    return;
  }

  let visibleCount = 3;

  let expanded = false;

  items.forEach((item, index) => {
    if (index < 3) {
      item.style.display = "flex";
      item.classList.add("reveal-once");
    }
  });

  button.addEventListener("click", () => {
    if (!expanded) {
      const columns = getGridColumns(list);
      const step = Math.max(columns, 3);
      visibleCount += step;

      showItems(visibleCount);

      if (visibleCount >= items.length) {
        expanded = true;
        button.textContent = t("portfolio.button_hide");
      }
    } else {
      hideAllExceptFirstElements();
      expanded = false;
      visibleCount = 3;
      button.textContent = t("portfolio.button_show");
    }
  });

  function showItems(count) {
    items.forEach((item, index) => {
      if (index < count) {
        item.style.display = "flex";

        requestAnimationFrame(() => {
          item.classList.add("show");
        });
      }
    });
  }

  function hideAllExceptFirstElements() {
    items.forEach((item, index) => {
      if (index >= 3) {
        item.classList.remove("show");
        item.style.display = "none";
      }
    });
  }

  function getGridColumns(gridElement) {
    const styles = window.getComputedStyle(gridElement);
    return styles.getPropertyValue("grid-template-columns").split(" ").length;
  }
}
