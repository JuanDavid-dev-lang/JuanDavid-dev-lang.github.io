/* ==========================================================================
   JuanDavid.dev — Particles Canvas Background
   ========================================================================== */

const particlesManager = (() => {
  let canvas;
  let ctx;
  let particlesList = [];
  let animationId;
  let mouse = { x: null, y: null, radius: 150 };

  const COLORS = {
    dark: {
      particle: 'rgba(56, 189, 248, 0.4)',
      line: 'rgba(99, 102, 241, 0.08)'
    },
    light: {
      particle: 'rgba(99, 102, 241, 0.25)',
      line: 'rgba(56, 189, 248, 0.08)'
    }
  };

  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      // Check boundaries
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
      }

      // Check mouse collision
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius + this.size) {
          if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
            this.x += 2;
          }
          if (mouse.x > this.x && this.x > this.size * 10) {
            this.x -= 2;
          }
          if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
            this.y += 2;
          }
          if (mouse.y > this.y && this.y > this.size * 10) {
            this.y -= 2;
          }
        }
      }

      // Move particle
      this.x += this.directionX;
      this.y += this.directionY;

      this.draw();
    }
  }

  function init() {
    canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    resizeCanvas();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Handle theme change observing
    const observer = new MutationObserver(() => {
      createParticles();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    createParticles();
    animate();
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    return isDark ? COLORS.dark : COLORS.light;
  }

  function createParticles() {
    particlesList = [];
    const colors = getThemeColors();
    
    // Scale count by resolution to save CPU
    let numberOfParticles = (canvas.width * canvas.height) / 11000;
    if (window.innerWidth < 768) {
      numberOfParticles = numberOfParticles / 2; // halve on mobile
    }
    numberOfParticles = Math.min(numberOfParticles, 120);

    for (let i = 0; i < numberOfParticles; i++) {
      let size = (Math.random() * 2) + 0.5;
      let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
      let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
      let directionX = (Math.random() * 0.4) - 0.2;
      let directionY = (Math.random() * 0.4) - 0.2;

      particlesList.push(new Particle(x, y, directionX, directionY, size, colors.particle));
    }
  }

  function connect() {
    let opacityValue = 1;
    const colors = getThemeColors();
    const maxDistance = window.innerWidth < 768 ? 85 : 120;

    for (let a = 0; a < particlesList.length; a++) {
      for (let b = a; b < particlesList.length; b++) {
        let dx = particlesList[a].x - particlesList[b].x;
        let dy = particlesList[a].y - particlesList[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          opacityValue = 1 - (distance / maxDistance);
          ctx.strokeStyle = colors.line.replace('0.08', (opacityValue * 0.12).toFixed(2));
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesList[a].x, particlesList[a].y);
          ctx.lineTo(particlesList[b].x, particlesList[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesList.length; i++) {
      particlesList[i].update();
    }
    connect();
    
    animationId = requestAnimationFrame(animate);
  }

  return { init };
})();
