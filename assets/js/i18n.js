/* ==========================================================================
   JuanDavid.dev — i18n Internationalization System
   ========================================================================== */

const i18nManager = (() => {
  const STORAGE_KEY = 'jd-lang';
  let currentLang = 'es';

  function init() {
    currentLang = localStorage.getItem(STORAGE_KEY) || 'es';
    applyLanguage(currentLang);
    bindToggle();
  }

  function applyLanguage(lang) {
    currentLang = lang;
    const dict = I18N[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    document.documentElement.lang = lang;
    updateToggleUI(lang);
  }

  function updateToggleUI(lang) {
    const btn = document.querySelector('.lang-toggle');
    if (!btn) return;
    const code = btn.querySelector('.lang-code');
    if (code) {
      code.textContent = lang.toUpperCase();
    }
  }

  function toggle() {
    const next = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem(STORAGE_KEY, next);
    applyLanguage(next);
  }

  function bindToggle() {
    const btn = document.querySelector('.lang-toggle');
    if (btn) {
      btn.addEventListener('click', toggle);
    }
  }

  function t(key) {
    const dict = I18N[currentLang];
    return dict ? (dict[key] || key) : key;
  }

  function getLang() {
    return currentLang;
  }

  return { init, t, getLang, applyLanguage };
})();
