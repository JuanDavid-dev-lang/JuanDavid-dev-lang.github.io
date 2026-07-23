/* ==========================================================================
   JuanDavid.dev — Navigation & Scroll Manager
   ========================================================================== */

const navigationManager = (() => {
  function init() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const backToTopBtn = document.querySelector('.back-to-top');

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Back to top visibility
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }

      // Reading progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      const progressBar = document.querySelector('.reading-progress');
      if (progressBar) {
        progressBar.style.width = scrolled + '%';
      }

      // Active Section Highlight on Scroll
      highlightActiveSection();
    });

    // Mobile Menu Toggle
    if (mobileToggle && navMenu) {
      // Create overlay if not present
      let overlay = document.querySelector('.mobile-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';
        document.body.appendChild(overlay);
      }

      const closeMenu = () => {
        navMenu.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      };

      mobileToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.contains('active');
        if (isActive) {
          closeMenu();
        } else {
          navMenu.classList.add('active');
          mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
          overlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });

      overlay.addEventListener('click', closeMenu);

      // Close menu when a link is clicked
      navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
      });
    }

    // Scroll to Top Click
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Smooth Scroll for Section Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 72; // Header height
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = target.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100; // Offset for navbar
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-menu .nav-link').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }

  return { init };
})();
