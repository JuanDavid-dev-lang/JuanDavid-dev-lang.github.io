/* ==========================================================================
   Antigravity Engine - Internationalization (i18n) Controller
   ========================================================================== */

class LanguageManager {
  constructor() {
    this.STORAGE_KEY = 'antigravity_lang';
    this.currentLang = localStorage.getItem(this.STORAGE_KEY) || 'es';
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.translatePage();
      
      const langBtns = document.querySelectorAll('.lang-toggle');
      langBtns.forEach(btn => {
        btn.addEventListener('click', () => this.toggleLanguage());
        this.updateButtonText(btn);
      });
    });
  }

  setLanguage(lang) {
    if (!I18N_DICTIONARY[lang]) return;
    this.currentLang = lang;
    localStorage.setItem(this.STORAGE_KEY, lang);
    this.translatePage();

    const langBtns = document.querySelectorAll('.lang-toggle');
    langBtns.forEach(btn => this.updateButtonText(btn));
  }

  toggleLanguage() {
    const newLang = this.currentLang === 'es' ? 'en' : 'es';
    this.setLanguage(newLang);
  }

  translatePage() {
    const dict = I18N_DICTIONARY[this.currentLang];
    if (!dict) return;

    // Elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
          el.setAttribute('placeholder', dict[key]);
        } else {
          el.textContent = dict[key];
        }
      }
    });

    document.documentElement.setAttribute('lang', this.currentLang);
  }

  updateButtonText(btn) {
    if (!btn) return;
    btn.innerHTML = `<span class="lang-code">${this.currentLang.toUpperCase()}</span>`;
    btn.setAttribute('aria-label', `Change language (Current: ${this.currentLang.toUpperCase()})`);
  }

  getText(key) {
    return I18N_DICTIONARY[this.currentLang]?.[key] || key;
  }
}

const langManager = new LanguageManager();
