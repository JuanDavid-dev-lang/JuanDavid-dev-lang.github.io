/* ==========================================================================
   JuanDavid.dev — GitHub API Service
   ========================================================================== */

const githubService = (() => {
  const CACHE_KEY_STATS = 'jd-github-stats-v2';
  const CACHE_KEY_LANGS = 'jd-github-langs-v2';
  const CACHE_TTL = 1 * 60 * 60 * 1000; // 1 hour

  // Static Fallbacks in case of API limits or offline
  const STATIC_FALLBACK = {
    repos: 26,
    stars: 4,
    forks: 0,
    followers: 0,
    languages: [
      { name: 'JavaScript', value: 37.5, color: '#f7df1e' },
      { name: 'CSS', value: 29.2, color: '#563d7c' },
      { name: 'TypeScript', value: 25.0, color: '#3178c6' },
      { name: 'Python', value: 4.2, color: '#3776ab' },
      { name: 'HTML', value: 4.2, color: '#e34f26' }
    ]
  };

  async function fetchStats() {
    const cachedStats = getCachedData(CACHE_KEY_STATS);
    const cachedLangs = getCachedData(CACHE_KEY_LANGS);
    
    if (cachedStats && cachedLangs) {
      return { stats: cachedStats, languages: cachedLangs };
    }

    try {
      const username = SITE_CONFIG.githubUsername;
      
      // Fetch user profile
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error('GitHub API Error');
      const userData = await userRes.json();

      // Fetch repos to sum stars and forks
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      if (!reposRes.ok) throw new Error('GitHub Repos API Error');
      const reposData = await reposRes.json();

      let totalStars = 0;
      let totalForks = 0;
      let langMap = {};

      reposData.forEach(repo => {
        if (!repo.fork) {
          totalStars += repo.stargazers_count;
          totalForks += repo.forks_count;
          if (repo.language) {
            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
          }
        }
      });

      // Format languages
      const totalRepos = Object.values(langMap).reduce((a, b) => a + b, 0);
      const languages = Object.entries(langMap)
        .map(([name, count]) => {
          const value = parseFloat(((count / totalRepos) * 100).toFixed(1));
          return { name, value, color: getLangColor(name) };
        })
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

      const stats = {
        repos: userData.public_repos,
        stars: totalStars,
        forks: totalForks,
        followers: userData.followers
      };

      setCacheData(CACHE_KEY_STATS, stats);
      setCacheData(CACHE_KEY_LANGS, languages);

      return { stats, languages };
    } catch (err) {
      console.warn('GitHub API failed, using static fallbacks:', err);
      const { languages, ...stats } = STATIC_FALLBACK;
      return { stats, languages };
    }
  }

  function getCachedData(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }

  function setCacheData(key, value) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + CACHE_TTL
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  function getLangColor(lang) {
    const colors = {
      'JavaScript': '#f7df1e',
      'TypeScript': '#3178c6',
      'Python': '#3776ab',
      'HTML': '#e34f26',
      'CSS': '#563d7c',
      'PHP': '#777bb4',
      'Java': '#b07219',
      'Shell': '#89e051',
      'Vue': '#41b883',
      'C++': '#f34b7d'
    };
    return colors[lang] || '#8b949e';
  }

  async function renderDashboardStats() {
    const { stats, languages } = await fetchStats();
    
    // Set counters
    const counters = {
      'stat-repos-count': stats.repos,
      'stat-stars-count': stats.stars,
      'stat-forks-count': stats.forks,
      'stat-followers-count': stats.followers
    };
    Object.entries(counters).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(value ?? 0);
    });

    // Render Langs
    const langChartContainer = document.getElementById('github-lang-chart');
    if (!langChartContainer) return;

    let totalPercent = languages.reduce((sum, item) => sum + item.value, 0);

    let html = `
      <div class="lang-bar-container">
    `;
    
    languages.forEach(lang => {
      // Scale percentages to equal 100% in the bar
      const width = (lang.value / totalPercent) * 100;
      html += `
        <div class="lang-bar-segment" style="width: ${width}%; background-color: ${lang.color};" data-tooltip="${lang.name}: ${lang.value}%"></div>
      `;
    });

    html += `
      </div>
      <div class="lang-legend">
    `;

    languages.forEach(lang => {
      html += `
        <div class="lang-legend-item">
          <span class="lang-legend-dot" style="background-color: ${lang.color};"></span>
          <strong>${lang.name}</strong> <span>${lang.value}%</span>
        </div>
      `;
    });

    html += `
      </div>
    `;

    langChartContainer.innerHTML = html;
  }

  return { renderDashboardStats };
})();
