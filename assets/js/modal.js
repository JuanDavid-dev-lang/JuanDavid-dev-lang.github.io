/* ==========================================================================
   JuanDavid.dev — Premium Projects Modals
   ========================================================================== */

const modalManager = (() => {
  let overlay;
  let cache = [];

  function init() {
    overlay = document.querySelector('.modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
      overlay.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title-area">
              <h2 id="modal-title" style="margin-bottom: var(--space-1);"></h2>
              <span id="modal-subtitle" style="font-size: var(--fs-sm); color: var(--text-muted); font-weight: 500;"></span>
            </div>
            <button class="modal-close" aria-label="Cerrar modal"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body" id="modal-body-content"></div>
        </div>
      `;
      document.body.appendChild(overlay);
    }

    // Event Bindings
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.closest('.modal-close')) {
        close();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        close();
      }
    });
  }

  async function open(slug) {
    if (cache.length === 0) {
      try {
        const res = await fetch('data/projects.json');
        if (res.ok) cache = await res.json();
      } catch (e) {
        console.error('Failed to pre-fetch projects for modal', e);
      }
    }

    const project = cache.find(p => p.slug === slug);
    if (!project) return;

    // Fill Modal Information
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-subtitle').textContent = project.subtitle;

    const bodyContent = document.getElementById('modal-body-content');
    
    // Construct technologies list
    const techsHTML = project.technologies.map(t => `<span class="tech-badge" style="font-size:0.75rem; padding: 4px 12px;">${t}</span>`).join('');
    
    // Construct features list
    const featuresHTML = project.features.map(f => `<li><i class="fas fa-check-circle" style="color:var(--accent-cyan); margin-right: var(--space-2);"></i>${f}</li>`).join('');

    // Setup action buttons (Live Demo or GitHub)
    let buttonsHTML = '';
    if (project.githubUrl) {
      buttonsHTML += `
        <a href="${project.githubUrl}" target="_blank" class="btn btn-secondary btn-sm">
          <i class="fab fa-github"></i> GitHub Código
        </a>
      `;
    }
    if (project.demoUrl) {
      buttonsHTML += `
        <a href="${project.demoUrl}" target="_blank" class="btn btn-primary btn-sm">
          <i class="fas fa-external-link-alt"></i> Demo En Vivo
        </a>
      `;
    }

    bodyContent.innerHTML = `
      <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: var(--space-8); @media (max-width: 768px) { grid-template-columns: 1fr; }">
        <div>
          <h3 style="font-size: var(--fs-md); margin-bottom: var(--space-3); color: var(--accent-cyan);">Descripción General</h3>
          <p style="font-size: var(--fs-sm); line-height: 1.8; margin-bottom: var(--space-6); text-align: justify;">${project.longDescription}</p>

          <h3 style="font-size: var(--fs-md); margin-bottom: var(--space-3); color: var(--accent-cyan);">Características Principales</h3>
          <ul style="list-style: none; padding: 0; margin-bottom: var(--space-6); font-size: var(--fs-sm); line-height: 2;">
            ${featuresHTML}
          </ul>
        </div>

        <div>
          <div class="glass-panel" style="padding: var(--space-5); margin-bottom: var(--space-6); background: rgba(0,0,0,0.1);">
            <h4 style="font-size: var(--fs-sm); margin-bottom: var(--space-3); color: var(--accent-purple);">Detalles del Proyecto</h4>
            <ul style="list-style: none; font-size: var(--fs-xs); line-height: 2; margin-bottom: var(--space-4);">
              <li style="display:flex; justify-content:space-between; border-bottom: 1px solid var(--border-color); padding: 4px 0;">
                <span class="text-muted">Estado:</span>
                <span class="status-badge completed" style="font-size: 0.65rem; padding: 1px 8px; font-weight:600;"><span class="status-dot"></span> ${project.status}</span>
              </li>
              <li style="display:flex; justify-content:space-between; border-bottom: 1px solid var(--border-color); padding: 4px 0;">
                <span class="text-muted">Categoría:</span>
                <strong>${project.category}</strong>
              </li>
              <li style="display:flex; justify-content:space-between; border-bottom: 1px solid var(--border-color); padding: 4px 0;">
                <span class="text-muted">Fecha:</span>
                <strong>${project.date}</strong>
              </li>
            </ul>

            <div style="display: flex; gap: var(--space-2); flex-wrap: wrap; margin-bottom: var(--space-5);">
              ${techsHTML}
            </div>

            <div style="display: flex; gap: var(--space-2); justify-content: center; border-top: 1px solid var(--border-color); padding-top: var(--space-4);">
              ${buttonsHTML}
            </div>
          </div>

          <div class="glass-panel" style="padding: var(--space-5); background: rgba(0,0,0,0.1);">
            <h4 style="font-size: var(--fs-sm); margin-bottom: var(--space-2); color: var(--accent-purple);">Arquitectura</h4>
            <p style="font-size: var(--fs-xs); line-height: 1.6; color: var(--text-secondary);">${project.architecture}</p>
          </div>
        </div>
      </div>
    `;

    // Open animations
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  return { init, open, close };
})();
