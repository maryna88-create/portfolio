"use strict";

export default function createWatcher(sectionSelector, callback, options = {}) {
  const section = document.querySelector(sectionSelector);
  if (!section) return;

  let triggered = false;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          callback(entry, section, obs);

          if (options.once) {
            obs.unobserve(section);
          }
        }
      });
    },
    {
      threshold: options.threshold || 0.1,
    },
  );

  observer.observe(section);

  // Фолбек, якщо секція вже у viewport
  if (isInViewport(section) && !triggered) {
    triggered = true;
    callback({ isIntersecting: true }, section, observer);

    if (options.once) {
      observer.unobserve(section);
    }
  }
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

