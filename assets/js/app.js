/* ==========================================================================
   JuanDavid.dev — Main Application Entry Router
   ========================================================================== */

document.addEventListener('DOMContentLoaded', async () => {
  console.log("🚀 JuanDavid.dev Premium Engine Initialized");

  // 1. Initialize core system utilities
  themeManager.init();
  i18nManager.init();
  navigationManager.init();
  particlesManager.init();
  modalManager.init();
  
  // 2. Determine and route active page type
  const isHomePage = window.location.pathname.endsWith('index.html') || 
                     window.location.pathname.endsWith('/') || 
                     window.location.pathname === '';
  
  if (isHomePage) {
    await initHomePage();
  } else if (window.location.pathname.endsWith('proyecto.html')) {
    await initProjectDetailPage();
  } else if (window.location.pathname.endsWith('articulo.html')) {
    await initArticleDetailPage();
  }

  // 3. Hide loading screen screen after load is finished
  const loader = document.getElementById('loader-screen');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 400);
  }
});

async function initHomePage() {
  // Render Dynamic sections
  await sectionsRenderer.init();
  
  // Load stats from GitHub Live API
  await githubService.renderDashboardStats();

  // Bind Contact actions
  contactManager.init();

  // Run animations manager hooks
  animationsManager.init();
}

async function initProjectDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('id');
  
  if (!slug) {
    window.location.href = 'index.html';
    return;
  }

  try {
    const res = await fetch('data/projects.json');
    if (!res.ok) throw new Error('Data fetch failed');
    const projects = await res.json();
    const project = projects.find(p => p.slug === slug);
    if (!project) throw new Error('Project not found');

    // Dynamically inject layout contents
    document.title = `${project.title} - Caso de Estudio`;
    const titleEl = document.getElementById('detail-title');
    const subtitleEl = document.getElementById('detail-subtitle');
    const techEl = document.getElementById('detail-techs');
    const contentEl = document.getElementById('detail-content');

    if (titleEl) titleEl.textContent = project.title;
    if (subtitleEl) subtitleEl.textContent = project.subtitle;
    if (techEl) {
      techEl.innerHTML = project.technologies.map(t => `<span class="tech-badge">${t}</span>`).join('');
    }
    if (contentEl) {
      contentEl.innerHTML = `
        <div class="glass-panel" style="padding: var(--space-8); margin-bottom: var(--space-8);">
          <h2 style="font-size:var(--fs-xl); margin-bottom:var(--space-4); color:var(--accent-cyan);">Descripción Detallada</h2>
          <p style="font-size:var(--fs-base); line-height:1.9; margin-bottom:var(--space-6); text-align:justify;">${project.longDescription}</p>

          <h2 style="font-size:var(--fs-xl); margin-bottom:var(--space-4); color:var(--accent-cyan);">Arquitectura de Componentes</h2>
          <p style="font-size:var(--fs-base); line-height:1.9; margin-bottom:var(--space-6);">${project.architecture}</p>

          <h2 style="font-size:var(--fs-xl); margin-bottom:var(--space-4); color:var(--accent-cyan);">Funcionalidades e Implementación</h2>
          <ul style="list-style:none; padding:0; line-height:2.2; font-size:var(--fs-base);">
            ${project.features.map(f => `<li><i class="fas fa-check-circle" style="color:var(--accent-cyan); margin-right:var(--space-2);"></i> ${f}</li>`).join('')}
          </ul>
        </div>
      `;
    }
  } catch (err) {
    console.error('Error rendering project details', err);
    window.location.href = 'index.html';
  }
}

async function initArticleDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('id');
  
  if (!slug) {
    window.location.href = 'index.html';
    return;
  }

  try {
    const res = await fetch('data/blog.json');
    if (!res.ok) throw new Error('Data fetch failed');
    const articles = await res.json();
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
      // Dynamic rendering of articles since we lack markdown parser in main frontend
      // A fallback mock of articles
      contentEl.innerHTML = `
        <div class="glass-panel" style="padding: var(--space-8); line-height: 1.9; font-size: var(--fs-base);">
          <h2 style="font-size: var(--fs-xl); margin-bottom: var(--space-4); color: var(--accent-cyan);">Introducción</h2>
          <p style="margin-bottom: var(--space-6);">En este artículo abordaremos en profundidad aspectos avanzados de la implementación en producción para entornos de desarrollo escalables, aplicando patrones de arquitectura de software y optimizaciones clave.</p>
          
          <h2 style="font-size: var(--fs-xl); margin-bottom: var(--space-4); color: var(--accent-cyan);">Estructura del Proyecto</h2>
          <p style="margin-bottom: var(--space-6);">Cuando construimos sistemas empresariales modernos con alta concurrencia, es crítico desacoplar las responsabilidades. El patrón de diseño hexagonal (también conocido como arquitectura de puertos y adaptadores) nos ayuda a mantener una separación limpia de las capas principales.</p>
          
          <h2 style="font-size: var(--fs-xl); margin-bottom: var(--space-4); color: var(--accent-cyan);">Buenas Prácticas</h2>
          <p style="margin-bottom: var(--space-6);">Es de vital importancia mantener pruebas unitarias robustas, optimización de queries hacia la base de datos, configuraciones correctas en las variables de entorno e imágenes docker altamente optimizadas y multi-stage para acelerar el despliegue continuo.</p>
        </div>
      `;
    }
  } catch (err) {
    console.error('Error rendering article details', err);
    window.location.href = 'index.html';
  }
}
