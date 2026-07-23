/* ==========================================================================
   Antigravity Engine - UI Interactive Effects & Dynamic Features
   ========================================================================== */

class UIEffectsManager {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.initScrollReveals();
      this.initReadingProgressBar();
      this.initBackToTop();
      this.initCustomCursor();
      this.initCardGlowTracking();
      this.initCodeCopyButtons();
    });
  }

  initScrollReveals() {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
  }

  initReadingProgressBar() {
    const progressBar = document.querySelector('.reading-progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight <= 0) return;
      const scrolled = (window.scrollY / windowHeight) * 100;
      progressBar.style.width = `${scrolled}%`;
    });
  }

  initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;

    window.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    document.querySelectorAll('a, button, .icon-btn, .filter-tag, .glass-panel').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
  }

  initCardGlowTracking() {
    document.addEventListener('mousemove', (e) => {
      document.querySelectorAll('.glow-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  initCodeCopyButtons() {
    document.querySelectorAll('pre code').forEach(codeBlock => {
      const pre = codeBlock.parentNode;
      if (pre.querySelector('.copy-code-btn')) return;

      const btn = document.createElement('button');
      btn.className = 'copy-code-btn';
      btn.innerHTML = '<i class="far fa-copy"></i> Copy';
      btn.style.cssText = `
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        font-size: 0.75rem;
        padding: 0.2rem 0.6rem;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
      `;

      pre.style.position = 'relative';
      pre.appendChild(btn);

      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeBlock.innerText).then(() => {
          btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
          btn.style.color = 'var(--accent-emerald)';
          setTimeout(() => {
            btn.innerHTML = '<i class="far fa-copy"></i> Copy';
            btn.style.color = 'var(--text-secondary)';
          }, 2000);
        });
      });
    });
  }

  generateTableOfContents(articleContainerId = 'article-body', tocContainerId = 'toc-container') {
    const article = document.getElementById(articleContainerId);
    const toc = document.getElementById(tocContainerId);
    if (!article || !toc) return;

    const headings = article.querySelectorAll('h2, h3');
    if (headings.length === 0) {
      toc.style.display = 'none';
      return;
    }

    let tocHtml = `
      <div class="toc-title"><i class="fas fa-list-ul"></i> Tabla de Contenidos</div>
      <ul class="toc-list">
    `;

    headings.forEach((heading, idx) => {
      const id = heading.id || `heading-${idx}`;
      heading.id = id;
      const indent = heading.tagName === 'H3' ? 'style="padding-left: 1rem;"' : '';
      tocHtml += `<li ${indent}><a href="#${id}" class="toc-link">${heading.textContent}</a></li>`;
    });

    tocHtml += '</ul>';
    toc.innerHTML = tocHtml;
    toc.style.display = 'block';
  }

  openLightbox(imageSrc, altText = '') {
    let lightbox = document.getElementById('lightbox-modal');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'lightbox-modal';
      lightbox.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(7, 9, 14, 0.92);
        backdrop-filter: blur(12px);
        display: flex; align-items: center; justify-content: center;
        z-index: 10000; opacity: 0; transition: opacity 0.3s;
        pointer-events: none;
      `;
      lightbox.innerHTML = `
        <div style="position: relative; max-width: 90vw; max-height: 90vh;">
          <img id="lightbox-img" src="" alt="" style="max-width: 100%; max-height: 85vh; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: var(--shadow-lg);" />
          <button id="lightbox-close" style="position: absolute; top: -40px; right: 0; background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;"><i class="fas fa-times"></i></button>
        </div>
      `;
      document.body.appendChild(lightbox);
      lightbox.querySelector('#lightbox-close').addEventListener('click', () => this.closeLightbox());
      lightbox.addEventListener('click', (e) => { if (e.target === lightbox) this.closeLightbox(); });
    }

    const img = lightbox.querySelector('#lightbox-img');
    img.src = imageSrc;
    img.alt = altText;
    lightbox.style.pointerEvents = 'auto';
    lightbox.style.opacity = '1';
  }

  closeLightbox() {
    const lightbox = document.getElementById('lightbox-modal');
    if (lightbox) {
      lightbox.style.opacity = '0';
      lightbox.style.pointerEvents = 'none';
    }
  }
}

const uiEffects = new UIEffectsManager();
