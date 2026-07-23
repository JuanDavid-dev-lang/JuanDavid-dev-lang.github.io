/* ==========================================================================
   Antigravity Engine - Main Application Entry & Page Router Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', async () => {
  console.log("🚀 Antigravity Portfolio Engine Initialized");

  // Load components & bindings
  initNavigation();

  // Page specific logic based on current path or query params
  const currentPath = window.location.pathname;

  if (currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '') {
    initHomePage();
  } else if (currentPath.endsWith('proyectos.html')) {
    initProjectsPage();
  } else if (currentPath.endsWith('proyecto.html')) {
    initProjectDetailPage();
  } else if (currentPath.endsWith('blog.html')) {
    initBlogPage();
  } else if (currentPath.endsWith('articulo.html')) {
    initArticleDetailPage();
  } else if (currentPath.endsWith('tecnologias.html')) {
    initTechnologiesPage();
  } else if (currentPath.endsWith('experiencia.html')) {
    initExperiencePage();
  }
});

function initNavigation() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (href === 'index.html' && currentPath === '')) {
      link.classList.add('active');
    }
  });

  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });
  }
}

async function initHomePage() {
  // Render GitHub Live Stats
  if (typeof githubService !== 'undefined') {
    githubService.renderDashboardStats();
  }

  // Load Featured Projects
  const projects = await contentLoader.loadProjects();
  const featuredContainer = document.getElementById('featured-projects-container');
  if (featuredContainer && projects.length > 0) {
    const featured = projects.filter(p => p.featured).slice(0, 3);
    searchEngine.container = featuredContainer;
    searchEngine.renderGridView(featured.length > 0 ? featured : projects.slice(0, 3));
  }

  // Load Recent Blog Posts
  const posts = await contentLoader.loadBlogPosts();
  const postsContainer = document.getElementById('recent-posts-container');
  if (postsContainer && posts.length > 0) {
    let html = '';
    posts.slice(0, 3).forEach(post => {
      html += `
        <div class="glass-panel glow-card reveal" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 600; text-transform: uppercase; margin-bottom: 0.5rem;">${post.category || 'Tutorial'}</div>
            <h3 style="font-size: 1.2rem; margin-bottom: 0.75rem;"><a href="articulo.html?id=${post.slug}">${post.title}</a></h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem;">${post.description}</p>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.825rem; color: var(--text-muted); border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
            <span><i class="far fa-calendar-alt"></i> ${post.date}</span>
            <span><i class="far fa-clock"></i> ${post.readTime || '5'} min</span>
          </div>
        </div>
      `;
    });
    postsContainer.innerHTML = html;
    uiEffects.initScrollReveals();
  }
}

async function initProjectsPage() {
  const projects = await contentLoader.loadProjects();
  searchEngine.container = document.getElementById('projects-container');
  searchEngine.initListeners('search-input', 'filter-tag');
  searchEngine.setItems(projects);
}

async function initProjectDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('id') || 'pipac';
  
  const projects = await contentLoader.loadProjects();
  const project = projects.find(p => p.slug === slug) || projects[0];

  const content = await contentLoader.loadMarkdownFile(`content/projects/${slug}/index.md`);

  // Mount title and metadata
  const titleElem = document.getElementById('project-title');
  const descElem = document.getElementById('project-description');
  const bannerElem = document.getElementById('project-banner');
  const bodyElem = document.getElementById('project-body');

  if (titleElem) titleElem.textContent = project ? project.title : 'Caso de Estudio';
  if (descElem) descElem.textContent = project ? project.description : '';
  if (bannerElem && project && project.image) bannerElem.src = project.image;
  if (bodyElem) {
    bodyElem.innerHTML = content.html;
    uiEffects.initCodeCopyButtons();
    uiEffects.generateTableOfContents('project-body', 'toc-container');
  }
}

async function initBlogPage() {
  const posts = await contentLoader.loadBlogPosts();
  searchEngine.container = document.getElementById('blog-posts-container');
  searchEngine.initListeners('search-input', 'filter-tag');
  searchEngine.setItems(posts.map(p => ({ ...p, type: 'blog' })));
}

async function initArticleDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('id') || 'docker-render';

  const posts = await contentLoader.loadBlogPosts();
  const post = posts.find(p => p.slug === slug) || posts[0];

  const content = await contentLoader.loadMarkdownFile(`content/blog/${slug}/index.md`);

  const titleElem = document.getElementById('article-title');
  const metaElem = document.getElementById('article-meta');
  const bodyElem = document.getElementById('article-body');

  if (titleElem) titleElem.textContent = post ? post.title : 'Artículo Técnico';
  if (metaElem && post) {
    metaElem.innerHTML = `
      <span><i class="far fa-calendar-alt"></i> ${post.date}</span> &bull; 
      <span><i class="far fa-clock"></i> ${post.readTime || contentLoader.calculateReadingTime(content.rawText)} min de lectura</span> &bull; 
      <span class="tech-badge">${post.category || 'Tech'}</span>
    `;
  }
  if (bodyElem) {
    bodyElem.innerHTML = content.html;
    uiEffects.initCodeCopyButtons();
    uiEffects.generateTableOfContents('article-body', 'toc-container');
  }
}

async function initTechnologiesPage() {
  const techList = await contentLoader.loadTechnologies();
  const container = document.getElementById('tech-matrix-container');
  if (!container) return;

  let html = '';
  techList.forEach(t => {
    html += `
      <div class="glass-panel glow-card reveal" style="padding: 1.5rem; text-align: center;">
        <div style="font-size: 2.5rem; color: var(--accent-cyan); margin-bottom: 0.75rem;">
          <i class="${t.icon || 'fas fa-code'}"></i>
        </div>
        <h3 style="font-size: 1.2rem; margin-bottom: 0.25rem;">${t.name}</h3>
        <span style="font-size: 0.8rem; color: var(--accent-purple); font-weight: 600;">${t.category}</span>
        <p style="font-size: 0.875rem; color: var(--text-secondary); margin: 0.75rem 0 1rem 0;">${t.description}</p>
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
          <span>Nivel: <strong>${t.level}</strong></span>
          <span>Exp: <strong>${t.experience}</strong></span>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
  uiEffects.initScrollReveals();
}

async function initExperiencePage() {
  try {
    const res = await fetch('data/experience.json');
    if (!res.ok) return;
    const expData = await res.json();
    const container = document.getElementById('experience-timeline-container');
    if (!container) return;

    let html = '<div class="timeline">';
    expData.forEach(item => {
      html += `
        <div class="timeline-item reveal">
          <div class="timeline-dot"></div>
          <div class="timeline-date">${item.period}</div>
          <div class="glass-panel" style="padding: 1.5rem;">
            <h3 style="font-size: 1.25rem; color: var(--text-primary);">${item.role}</h3>
            <div style="font-size: 0.95rem; color: var(--accent-cyan); font-weight: 600; margin-bottom: 0.75rem;">${item.company} &bull; ${item.location}</div>
            <p style="font-size: 0.925rem; color: var(--text-secondary); margin-bottom: 1rem;">${item.description}</p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              ${(item.skills || []).map(s => `<span class="tech-badge">${s}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
    uiEffects.initScrollReveals();
  } catch (err) {
    console.error('Failed to load experience data', err);
  }
}
