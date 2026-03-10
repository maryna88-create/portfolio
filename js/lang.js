"use strict";

const defaultLang = "en";

async function loadLang(lang) {
  const res = await fetch(`./locales/${lang}.json`);
  return res.json();
}

function getValue(obj, keys) {
  return keys.reduce((acc, key) => acc?.[key], obj);
}

function applyPlaceholders(text, data) {
  return text.replace(/__(\d+)__/g, (_, num) => {
    const key = "colored" + num;
    return `<span class="about__text about__text--colored">${data[key]}</span>`;
  });
}

function applyTranslations(data, fallbackData) {
  const elements = document.querySelectorAll(
    "[data-i18n], [data-i18n-placeholder], [data-i18n-href]",
  );

  elements.forEach((el) => {
    let key, value;

    if (el.dataset.i18nPlaceholder) {
      key = el.dataset.i18nPlaceholder.split(".");
      value = getValue(data, key) ?? getValue(fallbackData, key);
      el.placeholder = value || "";
      return;
    }

    if (el.dataset.i18nHref) {
      const hrefKey = el.dataset.i18nHref.split(".");
      const hrefValue =
        getValue(data, hrefKey) ?? getValue(fallbackData, hrefKey);
      el.setAttribute("href", hrefValue);
    }

    if (el.dataset.i18n) {
      key = el.dataset.i18n.split(".");
      value = getValue(data, key) ?? getValue(fallbackData, key);

      const attr = el.dataset.i18nAttr;

      if (attr) {
        el.setAttribute(attr, value || "");
      } else if (el.dataset.i18nHtml === "true") {
        let html = value;

        if (key[0] === "about") {
          html = applyPlaceholders(value, data.about);
        }

        el.innerHTML = html;
      } else {
        el.textContent = value || "";
      }
    }
  });
}

let currentLangData = {};
let fallbackLangData = {};

window.t = function (key) {
  const parts = key.split(".");
  return (
    getValue(currentLangData, parts) ?? getValue(fallbackLangData, parts) ?? key
  );
};

async function changeLang(lang) {
  currentLangData = await loadLang(lang);
  fallbackLangData = await loadLang(defaultLang);

  applyTranslations(currentLangData, fallbackLangData);
  localStorage.setItem("lang", lang);

  const portfolioButton = document.querySelector(".portfolio__button");
  if (portfolioButton) {
    const expanded = portfolioButton.classList.contains("expanded");
    portfolioButton.textContent = expanded
      ? t("portfolio.button_hide")
      : t("portfolio.button_show");
  }
}

function initLangButtons() {
  const langButtons = document.querySelectorAll("[data-lang]");

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      changeLang(lang);
    });
  });
}

export default async function initI18n() {
  const savedLang = localStorage.getItem("lang") || defaultLang;

  await changeLang(savedLang);
  initLangButtons();
}
