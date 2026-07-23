/* ==========================================================================
   Antigravity Engine - Real-Time Search, Filtering & Multi-View Engine
   ========================================================================== */

class SearchFilterEngine {
  constructor(items = [], containerId = 'projects-grid-container') {
    this.items = items;
    this.container = document.getElementById(containerId);
    this.searchQuery = '';
    this.selectedTag = 'all';
    this.viewMode = 'grid'; // 'grid', 'github', 'timeline'
  }

  setItems(items) {
    this.items = items;
    this.render();
  }

  initListeners(searchInputId = 'search-input', tagContainerClass = 'filter-tag') {
    const searchInput = document.getElementById(searchInputId);
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains(tagContainerClass)) {
        document.querySelectorAll(`.${tagContainerClass}`).forEach(el => el.classList.remove('active'));
        e.target.classList.add('active');
        this.selectedTag = e.target.getAttribute('data-tag') || 'all';
        this.render();
      }

      // View switcher buttons
      if (e.target.closest('.view-switch-btn')) {
        const btn = e.target.closest('.view-switch-btn');
        document.querySelectorAll('.view-switch-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.viewMode = btn.getAttribute('data-view') || 'grid';
        this.render();
      }
    });
  }

  getFilteredItems() {
    return this.items.filter(item => {
      // Tag filter
      const matchesTag = this.selectedTag === 'all' || 
                         (item.category && item.category.toLowerCase() === this.selectedTag.toLowerCase()) ||
                         (item.tags && item.tags.some(t => t.toLowerCase() === this.selectedTag.toLowerCase())) ||
                         (item.technologies && item.technologies.some(t => t.toLowerCase() === this.selectedTag.toLowerCase()));

      // Text query match
      const titleStr = (item.title || '').toLowerCase();
      const descStr = (item.description || '').toLowerCase();
      const techStr = (item.technologies || []).join(' ').toLowerCase();

      const matchesSearch = !this.searchQuery || 
                            titleStr.includes(this.searchQuery) || 
                            descStr.includes(this.searchQuery) ||
                            techStr.includes(this.searchQuery);

      return matchesTag && matchesSearch;
    });
  }

  render() {
    if (!this.container) return;
    const filtered = this.getFilteredItems();

    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div class="glass-panel" style="grid-column: 1/-1; padding: 4rem 2rem; text-align: center;">
          <i class="fas fa-search" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
          <h3>No se encontraron resultados</h3>
          <p>Intenta ajustar tu término de búsqueda o selecciona otra etiqueta.</p>
        </div>
      `;
      return;
    }

    if (this.viewMode === 'github') {
      this.renderGitHubView(filtered);
    } else if (this.viewMode === 'timeline') {
      this.renderTimelineView(filtered);
    } else {
      this.renderGridView(filtered);
    }
  }

  renderGridView(items) {
    let html = '';
    items.forEach(item => {
      const techBadges = (item.technologies || [])
        .map(t => `<span class="tech-badge">${t}</span>`)
        .join('');

      const detailUrl = item.type === 'blog' ? `articulo.html?id=${item.slug}` : `proyecto.html?id=${item.slug}`;

      html += `
        <div class="project-card glass-panel glow-card reveal">
          <div class="project-thumbnail">
            <img src="${item.image || 'assets/images/placeholder.svg'}" alt="${item.title}" loading="lazy" />
            <span class="project-category-tag">${item.category || 'Engineering'}</span>
          </div>
          <div class="project-content">
            <div class="project-header">
              <h3 class="project-title">${item.title}</h3>
              ${item.status ? `<span class="project-status status-${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span>` : ''}
            </div>
            <p class="project-description">${item.description}</p>
            <div class="project-tech-stack">${techBadges}</div>
            <div class="project-footer">
              <a href="${detailUrl}" class="btn btn-sm btn-primary">
                <span>Caso de Estudio</span>
                <i class="fas fa-arrow-right"></i>
              </a>
              ${item.githubUrl ? `<a href="${item.githubUrl}" target="_blank" class="icon-btn" title="GitHub"><i class="fab fa-github"></i></a>` : ''}
            </div>
          </div>
        </div>
      `;
    });
    this.container.className = 'grid-3';
    this.container.innerHTML = html;
    if (typeof uiEffects !== 'undefined') uiEffects.initScrollReveals();
  }

  renderGitHubView(items) {
    let html = '';
    items.forEach(item => {
      const primaryLang = (item.technologies && item.technologies[0]) || 'Code';
      html += `
        <div class="glass-panel glow-card reveal" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; color: var(--accent-cyan);">
              <i class="fas fa-book-bookmark"></i>
              <a href="${item.githubUrl || '#'}" target="_blank" style="font-weight: 700; font-size: 1.1rem;">${SITE_CONFIG.githubUsername}/${item.slug}</a>
              <span style="font-size: 0.75rem; border: 1px solid var(--border-color); padding: 0.1rem 0.5rem; border-radius: 99px; color: var(--text-muted); margin-left: auto;">Public</span>
            </div>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem;">${item.description}</p>
          </div>
          <div style="display: flex; align-items: center; gap: 1.5rem; font-size: 0.825rem; color: var(--text-muted);">
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background-color: var(--accent-cyan);"></span>
              <span>${primaryLang}</span>
            </div>
            <div><i class="far fa-star"></i> ${item.stars || Math.floor(Math.random() * 50 + 12)}</div>
            <div><i class="fas fa-code-fork"></i> ${item.forks || Math.floor(Math.random() * 15 + 2)}</div>
            <div style="margin-left: auto;"><a href="proyecto.html?id=${item.slug}" style="color: var(--accent-purple);">Detalles &rarr;</a></div>
          </div>
        </div>
      `;
    });
    this.container.className = 'grid-2';
    this.container.innerHTML = html;
    if (typeof uiEffects !== 'undefined') uiEffects.initScrollReveals();
  }

  renderTimelineView(items) {
    let html = '<div class="timeline">';
    const sorted = [...items].sort((a, b) => new Date(b.date || '2026') - new Date(a.date || '2026'));
    sorted.forEach(item => {
      html += `
        <div class="timeline-item reveal">
          <div class="timeline-dot"></div>
          <div class="timeline-date">${item.date || '2026'}</div>
          <div class="glass-panel" style="padding: 1.5rem;">
            <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem;"><a href="proyecto.html?id=${item.slug}">${item.title}</a></h3>
            <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1rem;">${item.description}</p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              ${(item.technologies || []).map(t => `<span class="tech-badge">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
    });
    html += '</div>';
    this.container.className = '';
    this.container.innerHTML = html;
    if (typeof uiEffects !== 'undefined') uiEffects.initScrollReveals();
  }
}

const searchEngine = new SearchFilterEngine();
