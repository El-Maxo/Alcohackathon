// ALcothon — client script (vanilla JS, no dependencies)

// Set your event start time (ISO 8601). Example: "2025-12-31T19:00:00Z"
// Update this value as needed; see README for details.
const EVENT_START = "2025-12-31T19:00:00Z";

(function () {
  const root = document.documentElement;

  // Theme: default dark, remember in localStorage
  const THEME_KEY = "alcothon-theme";
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (_) {}
  }
  function initTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "light" || saved === "dark") {
        applyTheme(saved);
        return;
      }
    } catch (_) {}
    applyTheme("dark");
  }
  initTheme();

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(current);
    });
  }

  // Countdown
  const countdownEl = document.getElementById("countdown");
  const ctaContainers = () => Array.from(document.querySelectorAll('[data-cta]'));

  function formatDuration(ms) {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (n) => String(n).padStart(2, "0");
    return `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  }

  function showInSession() {
    if (countdownEl) countdownEl.textContent = "Event in session";
    ctaContainers().forEach((node) => {
      const pill = document.createElement("div");
      pill.setAttribute("role", "status");
      pill.className = "btn btn-secondary";
      pill.textContent = "Event in session";
      node.replaceWith(pill);
    });
  }

  function startCountdown() {
    if (!countdownEl) return;
    const start = Date.parse(EVENT_START);
    if (Number.isNaN(start)) {
      countdownEl.textContent = "";
      return;
    }
    function tick() {
      const now = Date.now();
      const remaining = start - now;
      if (remaining <= 0) {
        showInSession();
        clearInterval(timer);
      } else {
        countdownEl.textContent = `Starts in ${formatDuration(remaining)}`;
      }
    }
    tick();
    const timer = setInterval(tick, 1000);
  }
  startCountdown();

  // Back to top
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    const showAfter = 600;
    function onScroll() {
      if (window.scrollY > showAfter) backToTopBtn.classList.add("show");
      else backToTopBtn.classList.remove("show");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    backToTopBtn.addEventListener("click", () => {
      if (prefersReduced) window.scrollTo(0, 0);
      else window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();


