/* ==========================================================================
   JuanDavid.dev — Dynamic Sections Renderer
   ========================================================================== */

const sectionsRenderer = (() => {
  async function init() {
    await renderServices();
    await renderTechnologies();
    await renderTimeline();
    await renderFeaturedProjects();
    await renderOtherProjects();
    await renderBlogPosts();
  }

  // Helper fetch function
  async function fetchData(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      return await res.json();
    } catch (e) {
      console.error(`Failed to fetch ${url}`, e);
      return [];
    }
  }

  // Render Services Section
  async function renderServices() {
    const container = document.getElementById('services-container');
    if (!container) return;

    const data = await fetchData('data/services.json');
    let html = '';

    data.forEach((s, idx) => {
      const techsHTML = s.technologies.slice(0, 5).map(t => `<span class="tech-badge">${t}</span>`).join('');
      
      html += `
        <div class="glass-panel glow-card service-card reveal hover-lift" style="--accent-color: ${s.color};">
          <div class="service-icon" style="background: rgba(56, 189, 248, 0.08); color: ${s.color}; border: 1px solid rgba(56, 189, 248, 0.15);">
            <i class="${s.icon}"></i>
          </div>
          <h3>${s.title}</h3>
          <p>${s.description}</p>
          <div class="service-techs">
            ${techsHTML}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // Render Technologies Section
  async function renderTechnologies() {
    const container = document.getElementById('tech-matrix-container');
    const filterContainer = document.getElementById('tech-filters');
    if (!container || !filterContainer) return;

    const data = await fetchData('data/technologies.json');
    if (data.length === 0) return;

    // Get categories
    const categories = ['Todas', ...new Set(data.map(item => item.category))];
    
    // Render filters
    let filterHTML = '';
    categories.forEach((cat, idx) => {
      filterHTML += `
        <button class="tech-filter-btn ${idx === 0 ? 'active' : ''}" data-category="${cat}">
          ${cat}
        </button>
      `;
    });
    filterContainer.innerHTML = filterHTML;

    // Render Items Function
    const renderItems = (category = 'Todas') => {
      let filtered = data;
      if (category !== 'Todas') {
        filtered = data.filter(item => item.category === category);
      }

      let itemsHTML = '';
      filtered.forEach(t => {
        itemsHTML += `
          <div class="tech-item hover-scale reveal" data-category="${t.category}">
            <i class="${t.icon}" style="color: ${t.color || 'var(--accent-cyan)'};"></i>
            <span>${t.name}</span>
          </div>
        `;
      });
      container.innerHTML = itemsHTML;
      animationsManager.initScrollReveal(); // Re-trigger scroll reveal for newly added elements
    };

    // Filter event listeners
    filterContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('tech-filter-btn')) {
        filterContainer.querySelectorAll('.tech-filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        const cat = e.target.getAttribute('data-category');
        renderItems(cat);
      }
    });

    renderItems();
  }

  // Render Timeline (Experience) Section
  async function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    const data = await fetchData('data/experience.json');
    let html = '';

    data.forEach((item, idx) => {
      const skillsHTML = (item.skills || []).map(s => `<span class="tech-badge">${s}</span>`).join('');
      const isCurrent = item.current ? 'current' : '';
      
      html += `
        <div class="timeline-item reveal-left">
          <div class="timeline-dot ${isCurrent}"></div>
          <span class="timeline-year">${item.year}</span>
          <div class="glass-panel timeline-card hover-scale">
            <h3>${item.title}</h3>
            <div class="timeline-subtitle">${item.subtitle}</div>
            <p>${item.description}</p>
            <div class="timeline-skills">
              ${skillsHTML}
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // Render Featured Projects
  async function renderFeaturedProjects() {
    const container = document.getElementById('featured-projects-container');
    if (!container) return;

    const data = await fetchData('data/projects.json');
    let html = '';

    data.forEach(p => {
      const techsHTML = p.technologies.slice(0, 4).map(t => `<span class="tech-badge">${t}</span>`).join('');
      
      html += `
        <div class="glass-panel glow-card project-card reveal hover-lift" data-slug="${p.slug}">
          <div class="project-card-header">
            <div class="project-card-icon" style="background: rgba(56, 189, 248, 0.08); color: ${p.color}; border: 1px solid rgba(56, 189, 248, 0.15);">
              <i class="${p.icon}"></i>
            </div>
            <h3>${p.title}</h3>
            <span class="project-subtitle">${p.subtitle}</span>
          </div>
          <div class="project-card-body">
            <p>${p.description}</p>
            <div class="project-card-techs">
              ${techsHTML}
            </div>
          </div>
          <div class="project-card-footer">
            <div class="project-card-stats">
              <span><i class="fas fa-star"></i> ${p.stars}</span>
              <span><i class="fas fa-code-branch"></i> ${p.forks}</span>
            </div>
            <span class="project-view-btn">
              <span data-i18n="projects_view_details">Ver Detalles</span>
              <i class="fas fa-arrow-right"></i>
            </span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Attach click events for modal
    container.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const slug = card.getAttribute('data-slug');
        modalManager.open(slug);
      });
    });
  }

  // Render Other Projects Gallery
  async function renderOtherProjects() {
    const container = document.getElementById('other-projects-container');
    if (!container) return;

    const data = await fetchData('data/other-projects.json');
    let html = '';

    data.forEach(p => {
      const techsHTML = p.technologies.map(t => `<span>${t}</span>`).join('');
      const statusBadge = p.status === 'Completado' 
        ? `<span class="status-badge completed" style="font-size: 0.65rem; padding: 2px 8px; margin-left: auto;"><span class="status-dot"></span> Completado</span>`
        : `<span class="status-badge in-progress" style="font-size: 0.65rem; padding: 2px 8px; margin-left: auto;"><span class="status-dot" style="background:var(--accent-amber);"></span> En progreso</span>`;

      html += `
        <div class="glass-panel other-project-card reveal hover-scale">
          <div style="display: flex; align-items: center; margin-bottom: var(--space-3);">
            <div class="other-project-icon" style="color: ${p.color || 'var(--accent-cyan)'}; margin-bottom: 0;">
              <i class="${p.icon}"></i>
            </div>
            ${statusBadge}
          </div>
          <h4>${p.title}</h4>
          <p>${p.description}</p>
          <div class="other-project-techs">
            ${techsHTML}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // Render Blog Posts Section
  async function renderBlogPosts() {
    const container = document.getElementById('recent-posts-container');
    if (!container) return;

    const data = await fetchData('data/blog.json');
    let html = '';

    data.slice(0, 3).forEach(post => {
      html += `
        <div class="glass-panel glow-card blog-card reveal hover-lift">
          <div>
            <div class="blog-card-category">
              <i class="${post.icon || 'fas fa-book'}"></i>
              <span>${post.category}</span>
            </div>
            <h3><a href="articulo.html?id=${post.slug}">${post.title}</a></h3>
            <p class="blog-card-desc">${post.description}</p>
          </div>
          <div class="blog-card-meta">
            <span><i class="far fa-calendar-alt"></i> ${post.date}</span>
            <span><i class="far fa-clock"></i> ${post.readTime} min</span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  return { init };
})();
