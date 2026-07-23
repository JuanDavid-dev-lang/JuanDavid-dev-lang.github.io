/* ==========================================================================
   Antigravity Engine - Dark / Light Theme Controller
   ========================================================================== */

class ThemeManager {
  constructor() {
    this.STORAGE_KEY = 'antigravity_theme';
    this.currentTheme = localStorage.getItem(this.STORAGE_KEY) || 'dark';
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    
    // Listen for theme toggle button clicks
    document.addEventListener('DOMContentLoaded', () => {
      const toggleBtns = document.querySelectorAll('.theme-toggle');
      toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => this.toggleTheme());
        this.updateButtonIcon(btn, this.currentTheme);
      });
    });
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    localStorage.setItem(this.STORAGE_KEY, theme);

    const toggleBtns = document.querySelectorAll('.theme-toggle');
    toggleBtns.forEach(btn => this.updateButtonIcon(btn, theme));
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  }

  updateButtonIcon(button, theme) {
    if (!button) return;
    button.innerHTML = theme === 'dark' 
      ? '<i class="fas fa-sun" aria-hidden="true"></i>' 
      : '<i class="fas fa-moon" aria-hidden="true"></i>';
    button.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  }
}

const themeManager = new ThemeManager();
