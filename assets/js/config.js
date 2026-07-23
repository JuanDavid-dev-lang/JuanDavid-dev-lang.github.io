/* ==========================================================================
   JuanDavid.dev — Site Configuration & i18n
   ========================================================================== */

const SITE_CONFIG = {
  name: "Juan David Gómez Vargas",
  shortName: "Juan David",
  title: "Desarrollador Full Stack & Estudiante de Ingeniería de Sistemas",
  age: 20,
  country: "Colombia 🇨🇴",
  university: "Unidades Tecnológicas de Santander (UTS)",
  githubUsername: "JuanDavid-dev-lang",
  email: "juandavid@example.com",
  location: "Bucaramanga, Colombia",

  social: {
    github: "https://github.com/JuanDavid-dev-lang",
    linkedin: "https://linkedin.com",
    email: "mailto:juandavid@example.com"
  },

  stats: {
    yearsProgramming: "3+",
    technologiesMastered: "25+",
    projectsCompleted: "12+",
    technologiesLearning: "8+"
  },

  meta: {
    url: "https://juandavid-dev-lang.github.io/",
    image: "assets/images/og-cover.png",
    themeColor: "#060910"
  }
};

const I18N = {
  es: {
    // Nav
    nav_home: "Inicio",
    nav_about: "Sobre Mí",
    nav_services: "Servicios",
    nav_tech: "Tecnologías",
    nav_timeline: "Trayectoria",
    nav_projects: "Proyectos",
    nav_blog: "Blog",
    nav_github: "GitHub",
    nav_contact: "Contacto",

    // Hero
    hero_badge: "Disponible para proyectos y consultoría",
    hero_greeting: "Hola, soy",
    hero_name: "Juan David",
    hero_role: "Full Stack Developer & AI Engineer",
    hero_description: "Colombiano de 20 años, Tecnólogo en Desarrollo de Sistemas Informáticos y estudiante de Ingeniería de Sistemas en la UTS. Apasionado por construir software moderno, inteligencia artificial y soluciones que generan impacto real.",
    btn_projects: "Explorar Proyectos",
    btn_github: "GitHub",
    btn_contact: "Contactar",

    // Stats
    stat_years: "Años Programando",
    stat_techs: "Tecnologías",
    stat_projects: "Proyectos",
    stat_learning: "Aprendiendo",

    // About
    about_label: "CONÓCEME",
    about_title: "Sobre Mí",
    about_subtitle: "Desarrollador con visión en IA y software moderno",
    about_p1: "Soy un desarrollador de software colombiano de 20 años con una profunda pasión por la tecnología y la innovación. Me gradué como Tecnólogo en Desarrollo de Sistemas Informáticos y actualmente continúo mi formación profesional como Ingeniero de Sistemas en las Unidades Tecnológicas de Santander (UTS), desde el segundo semestre del 2026.",
    about_p2: "Mi enfoque abarca el desarrollo Full Stack, la Inteligencia Artificial, la Ciencia de Datos, el Machine Learning, Cloud Computing y la arquitectura de software escalable. Creo firmemente que la tecnología es la herramienta más poderosa para resolver problemas del mundo real.",
    about_philosophy_title: "Filosofía de Desarrollo",
    about_goal_title: "Objetivos Profesionales",
    about_philosophy_desc: "Código limpio, modular y documentado. Cada línea debe tener propósito y cada componente debe ser reutilizable.",
    about_goal_desc: "Convertirme en arquitecto de software especializado en IA y sistemas distribuidos que generen impacto positivo.",

    // Philosophy cards
    philosophy_ai: "Inteligencia Artificial",
    philosophy_ai_desc: "ML, Deep Learning y NLP",
    philosophy_data: "Ciencia de Datos",
    philosophy_data_desc: "Análisis, predicción y visualización",
    philosophy_backend: "Backend Robusto",
    philosophy_backend_desc: "APIs escalables y microservicios",
    philosophy_frontend: "Frontend Moderno",
    philosophy_frontend_desc: "React, UX/UI premium",
    philosophy_cloud: "Cloud & DevOps",
    philosophy_cloud_desc: "Docker, CI/CD, infraestructura",
    philosophy_arch: "Arquitectura",
    philosophy_arch_desc: "Sistemas distribuidos y escalables",

    // Services
    services_label: "SERVICIOS",
    services_title: "¿En qué puedo ayudarte?",
    services_subtitle: "Desarrollo soluciones tecnológicas completas con las mejores prácticas del mercado.",

    // Technologies
    tech_label: "STACK TECNOLÓGICO",
    tech_title: "Tecnologías & Herramientas",
    tech_subtitle: "Dominio de herramientas modernas para desarrollo Full Stack, IA y DevOps.",
    tech_all: "Todas",

    // Timeline
    timeline_label: "TRAYECTORIA",
    timeline_title: "Mi Camino Profesional",
    timeline_subtitle: "Desde el aprendizaje de los fundamentos hasta la construcción de soluciones con IA.",

    // Projects
    projects_label: "PORTAFOLIO",
    projects_title: "Proyectos Destacados",
    projects_subtitle: "Una selección de los proyectos más complejos e innovadores en los que he trabajado.",
    projects_view_details: "Ver Detalles",
    projects_other_label: "MÁS PROYECTOS",
    projects_other_title: "Otros Proyectos & Experimentos",
    projects_other_subtitle: "Proyectos personales, herramientas experimentales, laboratorios de IA y contribuciones Open Source.",

    // Blog
    blog_label: "BLOG TÉCNICO",
    blog_title: "Artículos & Tutoriales",
    blog_subtitle: "Publicaciones sobre IA, desarrollo web, backend, buenas prácticas y arquitectura de software.",

    // GitHub
    github_label: "GITHUB",
    github_title: "Actividad en GitHub",
    github_subtitle: "Estadísticas en tiempo real consumidas directamente desde la API de GitHub.",
    github_repos: "Repositorios",
    github_stars: "Estrellas",
    github_forks: "Forks",
    github_langs: "Lenguajes",
    github_lang_title: "Lenguajes Más Utilizados",

    // Contact
    contact_label: "CONTACTO",
    contact_title: "¿Tienes un proyecto en mente?",
    contact_subtitle: "Estoy disponible para consultoría técnica, desarrollo de software y colaboraciones.",
    contact_info_title: "Conectemos",
    contact_info_desc: "Si tienes una idea, un proyecto o simplemente quieres conversar sobre tecnología, no dudes en escribirme.",
    contact_name: "Nombre",
    contact_name_placeholder: "Tu nombre completo",
    contact_email: "Correo Electrónico",
    contact_email_placeholder: "tu@email.com",
    contact_message: "Mensaje",
    contact_message_placeholder: "Cuéntame sobre tu proyecto...",
    contact_send: "Enviar Mensaje",
    contact_success_title: "¡Mensaje Enviado!",
    contact_success_desc: "Gracias por contactarme. Te responderé lo antes posible.",
    contact_error_name: "Por favor ingresa tu nombre",
    contact_error_email: "Ingresa un correo válido",
    contact_error_message: "El mensaje debe tener al menos 10 caracteres",

    // Footer
    footer_rights: "Todos los derechos reservados.",
    footer_built: "Hecho con",
    footer_tech: "HTML5, CSS3 & JavaScript Vanilla"
  },

  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_services: "Services",
    nav_tech: "Technologies",
    nav_timeline: "Timeline",
    nav_projects: "Projects",
    nav_blog: "Blog",
    nav_github: "GitHub",
    nav_contact: "Contact",

    hero_badge: "Available for projects and consulting",
    hero_greeting: "Hello, I'm",
    hero_name: "Juan David",
    hero_role: "Full Stack Developer & AI Engineer",
    hero_description: "20-year-old Colombian developer, graduated in Information Systems Development Technology and currently studying Systems Engineering at UTS. Passionate about building modern software, artificial intelligence and solutions that create real impact.",
    btn_projects: "Explore Projects",
    btn_github: "GitHub",
    btn_contact: "Contact Me",

    stat_years: "Years Coding",
    stat_techs: "Technologies",
    stat_projects: "Projects",
    stat_learning: "Learning",

    about_label: "ABOUT ME",
    about_title: "About Me",
    about_subtitle: "Developer with a vision in AI and modern software",
    about_p1: "I am a 20-year-old Colombian software developer with a deep passion for technology and innovation. I graduated as a Technologist in Information Systems Development and I am currently continuing my professional training as a Systems Engineer at the Unidades Tecnológicas de Santander (UTS), since the second semester of 2026.",
    about_p2: "My focus spans Full Stack development, Artificial Intelligence, Data Science, Machine Learning, Cloud Computing, and scalable software architecture. I firmly believe that technology is the most powerful tool to solve real-world problems.",
    about_philosophy_title: "Development Philosophy",
    about_goal_title: "Professional Goals",
    about_philosophy_desc: "Clean, modular, and documented code. Every line should have purpose and every component should be reusable.",
    about_goal_desc: "Become a software architect specialized in AI and distributed systems that generate positive impact.",

    philosophy_ai: "Artificial Intelligence",
    philosophy_ai_desc: "ML, Deep Learning & NLP",
    philosophy_data: "Data Science",
    philosophy_data_desc: "Analysis, prediction & visualization",
    philosophy_backend: "Robust Backend",
    philosophy_backend_desc: "Scalable APIs & microservices",
    philosophy_frontend: "Modern Frontend",
    philosophy_frontend_desc: "React, premium UX/UI",
    philosophy_cloud: "Cloud & DevOps",
    philosophy_cloud_desc: "Docker, CI/CD, infrastructure",
    philosophy_arch: "Architecture",
    philosophy_arch_desc: "Distributed & scalable systems",

    services_label: "SERVICES",
    services_title: "How can I help you?",
    services_subtitle: "I develop complete technological solutions with industry best practices.",

    tech_label: "TECH STACK",
    tech_title: "Technologies & Tools",
    tech_subtitle: "Proficiency in modern tools for Full Stack development, AI, and DevOps.",
    tech_all: "All",

    timeline_label: "JOURNEY",
    timeline_title: "My Professional Path",
    timeline_subtitle: "From learning the fundamentals to building AI-powered solutions.",

    projects_label: "PORTFOLIO",
    projects_title: "Featured Projects",
    projects_subtitle: "A selection of the most complex and innovative projects I have worked on.",
    projects_view_details: "View Details",
    projects_other_label: "MORE PROJECTS",
    projects_other_title: "Other Projects & Experiments",
    projects_other_subtitle: "Personal projects, experimental tools, AI labs, and Open Source contributions.",

    blog_label: "TECH BLOG",
    blog_title: "Articles & Tutorials",
    blog_subtitle: "Publications about AI, web development, backend, best practices, and software architecture.",

    github_label: "GITHUB",
    github_title: "GitHub Activity",
    github_subtitle: "Real-time stats consumed directly from the GitHub API.",
    github_repos: "Repositories",
    github_stars: "Stars",
    github_forks: "Forks",
    github_langs: "Languages",
    github_lang_title: "Most Used Languages",

    contact_label: "CONTACT",
    contact_title: "Have a project in mind?",
    contact_subtitle: "I am available for technical consulting, software development, and collaborations.",
    contact_info_title: "Let's Connect",
    contact_info_desc: "If you have an idea, a project, or just want to chat about technology, feel free to reach out.",
    contact_name: "Name",
    contact_name_placeholder: "Your full name",
    contact_email: "Email",
    contact_email_placeholder: "you@email.com",
    contact_message: "Message",
    contact_message_placeholder: "Tell me about your project...",
    contact_send: "Send Message",
    contact_success_title: "Message Sent!",
    contact_success_desc: "Thanks for reaching out. I'll get back to you as soon as possible.",
    contact_error_name: "Please enter your name",
    contact_error_email: "Enter a valid email address",
    contact_error_message: "Message must be at least 10 characters",

    footer_rights: "All rights reserved.",
    footer_built: "Made with",
    footer_tech: "HTML5, CSS3 & Vanilla JavaScript"
  }
};
