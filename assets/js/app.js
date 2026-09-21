/* ==========================================================================
   JuanDavid.dev — Main Application Entry Router
   ========================================================================== */

const LOADER_HIDE_DELAY_MS = 400;

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize core system utilities
  themeManager.init();
  i18nManager.init();
  navigationManager.init();
  particlesManager.init();
  modalManager.init();

  // 2. Determine and route active page type
  const path = window.location.pathname;
  const isHomePage = path.endsWith('index.html') || path.endsWith('/') || path === '';

  if (isHomePage) {
    await initHomePage();
  } else if (path.endsWith('proyecto.html')) {
    await initProjectDetailPage();
  } else if (path.endsWith('articulo.html')) {
    await initArticleDetailPage();
  }

  // 3. Hide loading screen after load is finished
  const loader = document.getElementById('loader-screen');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), LOADER_HIDE_DELAY_MS);
  }

  registerServiceWorker();
});

async function initHomePage() {
  // Render Dynamic sections
  await sectionsRenderer.init();

  // Dynamically rendered nodes carry data-i18n too: re-apply current language
  i18nManager.applyLanguage(i18nManager.getLang());

  // Load stats from GitHub Live API
  await githubService.renderDashboardStats();

  // Bind Contact actions
  contactManager.init();

  // Run animations manager hooks
  animationsManager.init();
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  if (!['http:', 'https:'].includes(window.location.protocol)) return;
  navigator.serviceWorker.register('sw.js').catch(err => {
    console.warn('Service worker registration failed', err);
  });
}

function getSlugFromQuery() {
  return new URLSearchParams(window.location.search).get('id');
}

function goHome() {
  window.location.href = 'index.html';
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Data fetch failed: ${url} (${res.status})`);
  return res.json();
}

/**
 * Loads content/<type>/<slug>/index.md, strips the YAML frontmatter and
 * returns the rendered HTML, or null when the file does not exist.
 */
async function fetchMarkdownHtml(type, slug) {
  const safeSlug = encodeURIComponent(slug);
  const res = await fetch(`content/${type}/${safeSlug}/index.md`);
  if (!res.ok) return null;
  const raw = await res.text();
  const body = raw.replace(/^---[\s\S]*?---\s*/, '');
  if (typeof marked === 'undefined') return null;
  return marked.parse(body);
}

function renderProjectFallback(project) {
  const features = project.features
    .map(f => `<li><i class="fas fa-check-circle" style="color:var(--accent-cyan); margin-right:var(--space-2);"></i> ${f}</li>`)
    .join('');
  return `
    <h2>Descripción Detallada</h2>
    <p>${project.longDescription}</p>
    <h2>Arquitectura de Componentes</h2>
    <p>${project.architecture}</p>
    <h2>Funcionalidades e Implementación</h2>
    <ul style="list-style:none; padding:0;">${features}</ul>
  `;
}

function renderDetailLinks(project) {
  const links = [];
  if (project.githubUrl) {
    links.push(`<a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm"><i class="fab fa-github"></i> Código</a>`);
  }
  if (project.demoUrl) {
    links.push(`<a href="${project.demoUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i> Demo</a>`);
  }
  return links.join('');
}

async function initProjectDetailPage() {
  const slug = getSlugFromQuery();
  if (!slug) return goHome();

  try {
    const projects = await fetchJson('data/projects.json');
    const project = projects.find(p => p.slug === slug);
    if (!project) throw new Error('Project not found');

    document.title = `${project.title} - Caso de Estudio`;
    const titleEl = document.getElementById('detail-title');
    const subtitleEl = document.getElementById('detail-subtitle');
    const techEl = document.getElementById('detail-techs');
    const linksEl = document.getElementById('detail-links');
    const contentEl = document.getElementById('detail-content');

    if (titleEl) titleEl.textContent = project.title;
    if (subtitleEl) subtitleEl.textContent = project.subtitle;
    if (techEl) techEl.innerHTML = project.technologies.map(t => `<span class="tech-badge">${t}</span>`).join('');
    if (linksEl) linksEl.innerHTML = renderDetailLinks(project);

    if (contentEl) {
      const markdownHtml = await fetchMarkdownHtml('projects', slug);
      contentEl.innerHTML = `<div class="glass-panel markdown-body">${markdownHtml || renderProjectFallback(project)}</div>`;
      contentEl.classList.add('visible');
    }
  } catch (err) {
    console.error('Error rendering project details', err);
    goHome();
  }
}

async function initArticleDetailPage() {
  const slug = getSlugFromQuery();
  if (!slug) return goHome();

  try {
    const articles = await fetchJson('data/blog.json');
    const article = articles.find(a => a.slug === slug);
    if (!article) throw new Error('Article not found');

    document.title = `${article.title} - Blog`;
    const titleEl = document.getElementById('detail-title');
    const subtitleEl = document.getElementById('detail-subtitle');
    const metaEl = document.getElementById('detail-meta');
    const contentEl = document.getElementById('detail-content');

    if (titleEl) titleEl.textContent = article.title;
    if (subtitleEl) subtitleEl.textContent = article.description;
    if (metaEl) {
      metaEl.innerHTML = `
        <span><i class="far fa-calendar-alt"></i> ${article.date}</span> &bull;
        <span><i class="far fa-clock"></i> ${article.readTime} min de lectura</span> &bull;
        <span class="tech-badge">${article.category}</span>
      `;
    }

    if (contentEl) {
      const markdownHtml = await fetchMarkdownHtml('blog', slug);
      const html = markdownHtml || `
        <h2>Próximamente</h2>
        <p>Este artículo está en redacción. Vuelve pronto o revisa los demás artículos del <a href="index.html#blog">blog</a>.</p>
      `;
      contentEl.innerHTML = `<div class="glass-panel markdown-body">${html}</div>`;
      contentEl.classList.add('visible');
    }
  } catch (err) {
    console.error('Error rendering article details', err);
    goHome();
  }
}
