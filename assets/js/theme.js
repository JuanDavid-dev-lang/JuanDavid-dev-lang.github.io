/* ==========================================================================
   JuanDavid.dev — Theme Manager (Dark/Light Mode)
   ========================================================================== */

const themeManager = (() => {
  const STORAGE_KEY = 'jd-theme';

  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'dark'); // Default to dark

    applyTheme(theme);
    bindToggle();

    // Listen for OS theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateIcon(theme);

    // Update meta theme-color
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.content = theme === 'dark' ? '#060910' : '#f8fafc';
    }
  }

  function updateIcon(theme) {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  function toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  function bindToggle() {
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.addEventListener('click', toggle);
    }
  }

  return { init };
})();
