/* ==========================================================================
   Antigravity Engine - GitHub REST API Client & Live Stats Integration
   ========================================================================== */

class GitHubService {
  constructor(username = SITE_CONFIG.githubUsername) {
    this.username = username;
    this.baseUrl = 'https://api.github.com';
    this.fallbackData = {
      public_repos: 42,
      followers: 128,
      following: 45,
      stars: 380,
      totalCommits: 1450,
      languages: {
        "TypeScript": 38,
        "Python": 26,
        "JavaScript": 18,
        "Go": 10,
        "C++": 8
      }
    };
  }

  async fetchUserData() {
    try {
      const res = await fetch(`${this.baseUrl}/users/${this.username}`);
      if (!res.ok) throw new Error('GitHub API rate limit or user not found');
      const data = await res.json();
      return data;
    } catch (err) {
      console.warn('Using fallback GitHub user data:', err.message);
      return this.fallbackData;
    }
  }

  async fetchUserRepos() {
    try {
      const res = await fetch(`${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=100`);
      if (!res.ok) throw new Error('Failed to fetch repositories');
      const repos = await res.json();
      return repos;
    } catch (err) {
      console.warn('Using fallback GitHub repos:', err.message);
      return [];
    }
  }

  async fetchRecentEvents() {
    try {
      const res = await fetch(`${this.baseUrl}/users/${this.username}/events/public?per_page=10`);
      if (!res.ok) throw new Error('Failed to fetch events');
      return await res.json();
    } catch (err) {
      console.warn('Using fallback GitHub events:', err.message);
      return [];
    }
  }

  async renderDashboardStats() {
    const reposElem = document.getElementById('stat-repos-count');
    const starsElem = document.getElementById('stat-stars-count');
    const langChartElem = document.getElementById('github-lang-chart');

    const userData = await this.fetchUserData();
    const repos = await this.fetchUserRepos();

    if (reposElem) reposElem.textContent = userData.public_repos || this.fallbackData.public_repos;
    
    // Calculate total stars across public repos
    let totalStars = 0;
    const langMap = {};

    if (repos && repos.length > 0) {
      repos.forEach(repo => {
        totalStars += repo.stargazers_count || 0;
        if (repo.language) {
          langMap[repo.language] = (langMap[repo.language] || 0) + 1;
        }
      });
    }

    if (starsElem) starsElem.textContent = totalStars > 0 ? totalStars : this.fallbackData.stars;

    // Render language distribution bars
    if (langChartElem) {
      const activeLangs = Object.keys(langMap).length > 0 ? langMap : this.fallbackData.languages;
      const totalCount = Object.values(activeLangs).reduce((a, b) => a + b, 0);

      let html = '<div class="lang-distribution-bar" style="display: flex; height: 10px; border-radius: 99px; overflow: hidden; margin-bottom: 1rem;">';
      let labelsHtml = '<div class="lang-labels" style="display: flex; flex-wrap: wrap; gap: 1rem;">';

      const colors = ['#38bdf8', '#818cf8', '#34d399', '#fbbf24', '#fb7185', '#c084fc'];
      let colorIdx = 0;

      for (const [lang, count] of Object.entries(activeLangs)) {
        const pct = Math.round((count / totalCount) * 100);
        const color = colors[colorIdx % colors.length];
        html += `<div style="width: ${pct}%; background-color: ${color};" title="${lang}: ${pct}%"></div>`;
        labelsHtml += `
          <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: var(--text-secondary);">
            <span style="width: 10px; height: 10px; border-radius: 50%; background-color: ${color}; display: inline-block;"></span>
            <span>${lang} <strong>${pct}%</strong></span>
          </div>
        `;
        colorIdx++;
      }

      html += '</div>' + labelsHtml + '</div>';
      langChartElem.innerHTML = html;
    }
  }
}

const githubService = new GitHubService();
