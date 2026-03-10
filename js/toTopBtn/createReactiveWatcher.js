"use strict";

export default function createReactiveWatcher(
  selector,
  callback,
  options = {},
) {
  const el = document.querySelector(selector);
  if (!el) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        callback(entry, el, obs);
      });
    },
    {
      threshold: options.threshold || 0.1,
    },
  );

  observer.observe(el);
}
