/* ==========================================================================
   JuanDavid.dev — Animations Manager
   ========================================================================== */

const animationsManager = (() => {
  function init() {
    initScrollReveal();
    initCounters();
    initCustomCursor();
    initParallax();
  }

  // Scroll Reveal with Intersection Observer
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Reveal once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  // Counters that count up when visible
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    const runCounter = (el) => {
      const targetStr = el.textContent || '';
      const hasPlus = targetStr.includes('+');
      const target = parseInt(targetStr.replace('+', ''), 10);
      if (isNaN(target)) return;

      let count = 0;
      const duration = 2000; // 2 seconds
      const stepTime = Math.max(Math.floor(duration / target), 15);
      
      const timer = setInterval(() => {
        count += Math.ceil(target / (duration / stepTime));
        if (count >= target) {
          el.textContent = target + (hasPlus ? '+' : '');
          clearInterval(timer);
        } else {
          el.textContent = count + (hasPlus ? '+' : '');
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const numberEl = entry.target.querySelector('.stat-number');
          if (numberEl && !numberEl.classList.contains('counted')) {
            numberEl.classList.add('counted');
            runCounter(numberEl);
          }
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    document.querySelectorAll('.stat-card').forEach(card => observer.observe(card));
  }

  // Custom cursor with trail ring
  function initCustomCursor() {
    // Disable cursor check on mobile/touch
    if (window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window)) return;

    let dot = document.querySelector('.cursor-dot');
    let ring = document.querySelector('.cursor-ring');

    if (!dot) {
      dot = document.createElement('div');
      dot.className = 'cursor-dot';
      document.body.appendChild(dot);
    }
    if (!ring) {
      ring = document.createElement('div');
      ring.className = 'cursor-ring';
      document.body.appendChild(ring);
    }

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    // Animate the ring with inertia
    function animateRing() {
      const ease = 0.15;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;
      
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover states for links and buttons
    const interactiveSelectors = 'a, button, .project-card, .tech-item, input, textarea, select';
    
    const addHoverClass = () => document.body.classList.add('cursor-hover');
    const removeHoverClass = () => document.body.classList.remove('cursor-hover');

    // Dynamically apply hover effect
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        addHoverClass();
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest(interactiveSelectors)) {
        removeHoverClass();
      }
    });
  }

  // Mouse move parallax effect in Hero
  function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const items = hero.querySelectorAll('.hero-avatar-ring, .hero-avatar-glow');
    
    hero.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 769) return;
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      items.forEach((item, index) => {
        const factor = (index + 1) * 0.05;
        item.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });

    hero.addEventListener('mouseleave', () => {
      items.forEach(item => {
        item.style.transform = 'translate(0, 0)';
      });
    });
  }

  return { init, initScrollReveal };
})();
