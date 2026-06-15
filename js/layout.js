// layout.js — Injects shared navbar, sidebar, footer into every page

const SIDEBAR_CATS = [
  { label: 'Text Tools', icon: '📝', color: 'blue', tools: ['word-counter','char-counter','case-converter','text-compare','sort-text','remove-duplicates'] },
  { label: 'Developer',  icon: '💻', color: 'green', tools: ['json-formatter','json-validator','json-minifier','base64-encoder','base64-decoder','url-encoder','url-decoder','md5-generator'] },
  { label: 'SEO Tools',  icon: '🔍', color: 'orange', tools: ['meta-generator','robots-generator','sitemap-generator','schema-generator','serp-preview','og-generator'] },
  { label: 'Security',   icon: '🔒', color: 'red', tools: ['password-gen','password-strength','sha256-gen'] },
  { label: 'Productivity', icon: '⚡', color: 'purple', tools: ['qr-generator','uuid-generator'] },
  { label: 'Calculators', icon: '🧮', color: 'teal', tools: ['percentage-calc','age-calculator','date-calculator','gst-calculator','emi-calculator'] },
];

// Clean outline SVG icons for the top nav (replaces emoji for a more premium look)
const NAV_SVG_ICONS = {
  'Text Tools':    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>',
  'Developer':     '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>',
  'SEO Tools':     '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  'Security':      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  'Productivity':  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7z"/></svg>',
  'Calculators':   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="11" x2="10" y2="11"/><line x1="14" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="10" y2="15"/><line x1="14" y1="15" x2="16" y2="15"/><line x1="8" y1="19" x2="10" y2="19"/><line x1="14" y1="19" x2="16" y2="19"/></svg>',
  'Resources':     '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
};

function getDepth() {
  // Pages should declare their depth explicitly via window.PAGE_DEPTH
  // (0 = root, 1 = one folder deep e.g. /blog/, 2 = two folders deep e.g. /tools/seo/)
  if (typeof window.PAGE_DEPTH === 'number') {
    return window.PAGE_DEPTH === 0 ? './' : '../'.repeat(window.PAGE_DEPTH);
  }
  // Fallback: infer from URL. Known top-level folders are 'tools' and 'blog'.
  const parts = window.location.pathname.split('/').filter(Boolean);
  const file = parts[parts.length - 1] || '';
  const dirs = file.includes('.') ? parts.slice(0, -1) : parts; // drop filename if present
  if (dirs.length === 0) return './';
  const KNOWN_TOP_FOLDERS = ['tools', 'blog'];
  if (KNOWN_TOP_FOLDERS.includes(dirs[0])) {
    return '../'.repeat(dirs.length);
  }
  // Unknown nesting (e.g. deployed under a project subfolder like /SeoToolBox/about.html)
  // — treat the deepest known segment as root-relative depth 0.
  return './';
}

function injectLayout() {
  const root = getDepth();

  // const root = '/';
  const currentPath = window.location.pathname;

  // ── NAVBAR ──
  function buildMegaMenu() {
    return SIDEBAR_CATS.map(cat => {
      const items = cat.tools.map(id => {
        const tool = (typeof TOOLS !== 'undefined') ? TOOLS.find(t => t.id === id) : null;
        if (!tool) return '';
        return `<a href="${root}${tool.file}" class="mega-item" onclick="recent.add('${id}')">
          <span class="mega-item-icon icon-${tool.color}">${tool.icon}</span>
          <span class="mega-item-text">
            <span class="mega-item-name">${tool.name}</span>
            <span class="mega-item-desc">${tool.desc}</span>
          </span>
        </a>`;
      }).join('');
      return `
        <div class="nav-cat-item">
          <button class="nav-cat-btn" aria-haspopup="true">
            <span class="nav-cat-icon">${NAV_SVG_ICONS[cat.label] || ''}</span>${cat.label}
            <svg class="nav-cat-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 3.5L5 7L8.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="mega-panel">
            <div class="mega-panel-inner">${items}</div>
          </div>
        </div>`;
    }).join('');
  }

  const resourcesPanel = `
    <div class="nav-cat-item nav-resources">
      <button class="nav-cat-btn" aria-haspopup="true">
        <span class="nav-cat-icon">${NAV_SVG_ICONS['Resources']}</span>Resources
        <svg class="nav-cat-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 3.5L5 7L8.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="mega-panel mega-panel-simple">
        <div class="mega-panel-inner mega-panel-inner-list">
          <a href="${root}blog.html" class="mega-item">
            <span class="mega-item-icon icon-blue">📰</span>
            <span class="mega-item-text"><span class="mega-item-name">Blog</span><span class="mega-item-desc">Guides & tutorials for every tool</span></span>
          </a>
          <a href="${root}about.html" class="mega-item">
            <span class="mega-item-icon icon-purple">ℹ️</span>
            <span class="mega-item-text"><span class="mega-item-name">About Us</span><span class="mega-item-desc">Who we are & why it's free</span></span>
          </a>
          <a href="${root}contact.html" class="mega-item">
            <span class="mega-item-icon icon-teal">✉️</span>
            <span class="mega-item-text"><span class="mega-item-name">Contact</span><span class="mega-item-desc">Get in touch with the team</span></span>
          </a>
          <a href="${root}privacy-policy.html" class="mega-item">
            <span class="mega-item-icon icon-green">🔒</span>
            <span class="mega-item-text"><span class="mega-item-name">Privacy Policy</span><span class="mega-item-desc">How we handle your data</span></span>
          </a>
          <a href="${root}terms.html" class="mega-item">
            <span class="mega-item-icon icon-orange">📜</span>
            <span class="mega-item-text"><span class="mega-item-name">Terms of Service</span><span class="mega-item-desc">Usage terms & disclaimers</span></span>
          </a>
        </div>
      </div>
    </div>`;

  const navHtml = `
<nav class="navbar">
  <a href="${root}index.html" class="nav-logo">
    <div class="logo-icon">🛠</div>
    SeoToolBox
  </a>

  <div class="nav-categories">
    ${buildMegaMenu()}
    ${resourcesPanel}
  </div>

  <div class="nav-divider"></div>

  <div class="nav-search">
    <input type="text" id="global-search" placeholder="Search 30+ tools…" autocomplete="off">
    <kbd class="search-kbd">/</kbd>
    <div id="search-results" class="search-results hidden"></div>
  </div>

  <div class="nav-actions">
    <button class="btn-icon" id="theme-toggle" onclick="theme.toggle()" aria-label="Toggle theme">🌙</button>
    <button class="btn-icon mobile-menu-btn" onclick="toggleSidebar()" aria-label="Menu">☰</button>
  </div>
</nav>`;

  // ── SIDEBAR ──
  function buildSidebarLinks() {
    return SIDEBAR_CATS.map(cat => {
      const toolLinks = cat.tools.map(id => {
        const tool = (typeof TOOLS !== 'undefined') ? TOOLS.find(t => t.id === id) : null;
        if (!tool) return '';
        const isActive = currentPath.includes(id);
        return `<a href="${root}${tool.file}" class="sidebar-link${isActive ? ' active' : ''}" onclick="recent.add('${id}')">
          <span class="icon">${tool.icon}</span>${tool.name}
        </a>`;
      }).join('');
      return `
        <div class="sidebar-section">
          <div class="sidebar-title">${cat.icon} ${cat.label}</div>
          ${toolLinks}
        </div>`;
    }).join('');
  }

  const sidebarHtml = `
<aside class="sidebar" id="sidebar">
  <button class="sidebar-close" onclick="toggleSidebar()" aria-label="Close menu">✕</button>
  <a href="${root}index.html" class="sidebar-link" style="font-weight:700;font-size:15px;padding:0.5rem 1.25rem 1rem;">
    <span class="icon">🏠</span> All Tools
  </a>
  <a href="${root}blog.html" class="sidebar-link" style="font-weight:700;font-size:15px;padding:0.5rem 1.25rem 1rem;">
    <span class="icon">📰</span> Blog
  </a>
  ${buildSidebarLinks()}
  <div class="sidebar-section">
    <div class="sidebar-title">ℹ️ Company</div>
    <a href="${root}about.html" class="sidebar-link"><span class="icon">ℹ️</span>About Us</a>
    <a href="${root}contact.html" class="sidebar-link"><span class="icon">✉️</span>Contact</a>
    <a href="${root}privacy-policy.html" class="sidebar-link"><span class="icon">🔒</span>Privacy Policy</a>
    <a href="${root}terms.html" class="sidebar-link"><span class="icon">📜</span>Terms of Service</a>
  </div>
</aside>
<div class="sidebar-overlay" id="sidebar-overlay" onclick="toggleSidebar()"></div>`;

  // ── FOOTER ──
  const footerHtml = `
<footer class="footer">
  <div class="footer-grid">
    <div class="footer-brand">
      <a href="${root}index.html" class="nav-logo" style="font-size:1.1rem;">
        <div class="logo-icon" style="width:28px;height:28px;font-size:15px;">🛠</div> SeoToolBox
      </a>
      <p>100% free, privacy-first online tools. No login, no limits, no nonsense.</p>
    </div>
    <div class="footer-col">
      <h5>Text Tools</h5>
      <a href="${root}tools/text/word-counter.html">Word Counter</a>
      <a href="${root}tools/text/char-counter.html">Character Counter</a>
      <a href="${root}tools/text/case-converter.html">Case Converter</a>
      <a href="${root}tools/text/text-compare.html">Text Compare</a>
    </div>
    <div class="footer-col">
      <h5>Developer</h5>
      <a href="${root}tools/developer/json-formatter.html">JSON Formatter</a>
      <a href="${root}tools/developer/base64-encoder.html">Base64 Encoder</a>
      <a href="${root}tools/developer/url-encoder.html">URL Encoder</a>
      <a href="${root}tools/developer/md5-generator.html">MD5 Generator</a>
    </div>
    <div class="footer-col">
      <h5>SEO & More</h5>
      <a href="${root}tools/seo/meta-generator.html">Meta Tag Generator</a>
      <a href="${root}tools/security/password-gen.html">Password Generator</a>
      <a href="${root}tools/productivity/qr-generator.html">QR Code Generator</a>
      <a href="${root}tools/calculators/emi-calculator.html">EMI Calculator</a>
    </div>
    <div class="footer-col">
      <h5>Company</h5>
      <a href="${root}blog.html">Blog</a>
      <a href="${root}about.html">About Us</a>
      <a href="${root}contact.html">Contact</a>
      <a href="${root}privacy-policy.html">Privacy Policy</a>
      <a href="${root}terms.html">Terms of Service</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 SeoToolBox · All tools are free forever</span>
    <span>Made with ❤️ · Privacy First · No Login Required</span>
  </div>
</footer>`;

  // Inject into page
  const nav = document.getElementById('nav-placeholder');
  const side = document.getElementById('sidebar-placeholder');
  const foot = document.getElementById('footer-placeholder');
  if (nav) nav.outerHTML = navHtml;
  if (side) side.outerHTML = sidebarHtml;
  if (foot) foot.outerHTML = footerHtml;

  // Init global search now that the navbar (with #global-search) exists
  if (typeof search !== 'undefined') search.init(root);

  // Sync theme toggle icon with saved theme now that the button exists
  if (typeof theme !== 'undefined') {
    theme.updateBtn(document.documentElement.getAttribute('data-theme') || 'light');
  }
}

document.addEventListener('DOMContentLoaded', injectLayout);
