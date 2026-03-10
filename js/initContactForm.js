"use strict";

import createPopup from "./createPopup.js";

export default function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const inputs = form.querySelectorAll("input[required], textarea[required]");

  const popup = createPopup({
    root: "#form-popup",
    message: ".popup__message",
    close: ".popup__close",
    activeClass: "active",
  });

  function validateEmail(email) {
    const value = email.trim();

    const latinRegex = /^[a-z0-9@._-]+$/;
    if (!latinRegex.test(value)) return "errors.email_latin_only";

    if (value !== value.toLowerCase()) return "errors.email_lowercase";

    if (!value.includes("@")) return "errors.email_no_at";

    return "";
  }

  const errorTimers = new Map();

  function autoHideError(input, hint, delay = 5000) {
    if (!hint) return;

    if (errorTimers.has(input)) {
      clearTimeout(errorTimers.get(input));
    }

    const timer = setTimeout(() => {
      input.classList.remove("error");
      hint.textContent = "";
      errorTimers.delete(input); 
    }, delay);

    errorTimers.set(input, timer);
  }

  function validateInputs() {
    let isValid = true;

    const emailInput = form.querySelector('input[type="email"]');

    inputs.forEach((input) => {
      const hint = input.parentElement.querySelector(".input-hint");
      if (!input.value.trim()) {
        input.classList.add("error");
        input.classList.remove("success");
        if (hint) hint.textContent = t("errors.required");

		  autoHideError(input, hint);
        isValid = false;
        return;
      }

      if (input === emailInput) {
        const emailErrorKey = validateEmail(input.value);
        if (emailErrorKey) {
          input.classList.add("error");
          input.classList.remove("success");

          switch (emailErrorKey) {
            case "errors.email_latin_only":
              hint.textContent = t("errors.email_latin_only");
              break;

            case "errors.email_lowercase":
              hint.textContent = t("errors.email_lowercase");
              break;

            case "errors.email_no_at":
              hint.textContent = t("errors.email_no_at");
              break;
          }

			 autoHideError(input, hint);
          isValid = false;
          return;
        }
      }

      input.classList.remove("error");
      input.classList.add("success");
      if (hint) hint.textContent = "";
    });

    return isValid;
  }

  async function sendForm() {
    const formData = new FormData(form);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    return response.json();
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      popup.open(t("contact.form.fill_required"));

      return;
    }
    status.textContent = t("form.sending");
    status.className = "contact__form-status loading";

    let result;

    try {
      result = await sendForm();
    } catch (err) {
      popup.open(t("contact.form.network_error"));
      setStatus();

      return;
    }

    if (result.success) {
      popup.open(t("contact.form.success"));
      form.reset();
      inputs.forEach((input) => input.classList.remove("success"));
    } else {
      popup.open(t("contact.form.fail"));
    }

    setStatus();
  });

  const baseStatusClass = "contact__form-status";

  function setStatus(text = "", state = "") {
    status.textContent = text;
    status.className = state ? `${baseStatusClass} ${state}` : baseStatusClass;
  }
}
