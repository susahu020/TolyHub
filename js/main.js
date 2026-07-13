// ToolBox — Main JS

// ── TOOLS REGISTRY ──
const TOOLS = [
  // Text
  { id:'word-counter',     name:'Word Counter',        cat:'Text',       icon:'📝', color:'blue',   file:'tools/text/word-counter.html',   desc:'Count words, chars, sentences' },
  { id:'char-counter',     name:'Character Counter',   cat:'Text',       icon:'🔤', color:'blue',   file:'tools/text/char-counter.html',   desc:'Count characters with/without spaces' },
  { id:'case-converter',   name:'Case Converter',      cat:'Text',       icon:'🔡', color:'blue',   file:'tools/text/case-converter.html', desc:'UPPER, lower, Title, camelCase' },
  { id:'text-compare',     name:'Text Compare',        cat:'Text',       icon:'⚖️', color:'blue',   file:'tools/text/text-compare.html',   desc:'Find differences between two texts' },
  { id:'sort-text',        name:'Sort Text Lines',     cat:'Text',       icon:'↕️', color:'blue',   file:'tools/text/sort-text.html',      desc:'Sort lines A–Z or Z–A' },
  { id:'remove-duplicates',name:'Remove Duplicates',   cat:'Text',       icon:'🗑️', color:'blue',   file:'tools/text/remove-duplicates.html', desc:'Remove duplicate lines from text' },
  // Developer
  { id:'json-formatter',   name:'JSON Formatter',      cat:'Developer',  icon:'{ }', color:'green', file:'tools/developer/json-formatter.html', desc:'Format & beautify JSON' },
  { id:'json-validator',   name:'JSON Validator',      cat:'Developer',  icon:'✅', color:'green',  file:'tools/developer/json-validator.html', desc:'Validate JSON syntax' },
  { id:'json-minifier',    name:'JSON Minifier',       cat:'Developer',  icon:'📦', color:'green',  file:'tools/developer/json-minifier.html',  desc:'Minify & compress JSON' },
  { id:'base64-encoder',   name:'Base64 Encoder',      cat:'Developer',  icon:'🔒', color:'green',  file:'tools/developer/base64-encoder.html', desc:'Encode text to Base64' },
  { id:'base64-decoder',   name:'Base64 Decoder',      cat:'Developer',  icon:'🔓', color:'green',  file:'tools/developer/base64-decoder.html', desc:'Decode Base64 to text' },
  { id:'url-encoder',      name:'URL Encoder',         cat:'Developer',  icon:'🔗', color:'green',  file:'tools/developer/url-encoder.html',    desc:'Encode special URL characters' },
  { id:'url-decoder',      name:'URL Decoder',         cat:'Developer',  icon:'🔗', color:'green',  file:'tools/developer/url-decoder.html',    desc:'Decode URL-encoded strings' },
  { id:'md5-generator',    name:'MD5 Generator',       cat:'Developer',  icon:'#️⃣', color:'green',  file:'tools/developer/md5-generator.html',  desc:'Generate MD5 hash from text' },
  // SEO
  { id:'meta-generator',   name:'Meta Tag Generator',  cat:'SEO',        icon:'🏷️', color:'orange', file:'tools/seo/meta-generator.html',    desc:'Generate HTML meta tags' },
  { id:'robots-generator', name:'Robots.txt Generator',cat:'SEO',        icon:'🤖', color:'orange', file:'tools/seo/robots-generator.html',  desc:'Create robots.txt file' },
  { id:'sitemap-generator',name:'Sitemap Generator',   cat:'SEO',        icon:'🗺️', color:'orange', file:'tools/seo/sitemap-generator.html', desc:'Generate XML sitemap' },
  { id:'schema-generator', name:'Schema Generator',    cat:'SEO',        icon:'📋', color:'orange', file:'tools/seo/schema-generator.html',  desc:'Generate JSON-LD schema markup' },
  { id:'serp-preview',     name:'SERP Preview',        cat:'SEO',        icon:'🔍', color:'orange', file:'tools/seo/serp-preview.html',      desc:'Preview Google search result' },
  { id:'og-generator',     name:'Open Graph Generator',cat:'SEO',        icon:'📤', color:'orange', file:'tools/seo/og-generator.html',      desc:'Generate Open Graph meta tags' },
  // Security
  { id:'password-gen',     name:'Password Generator',  cat:'Security',   icon:'🔑', color:'red',    file:'tools/security/password-gen.html',     desc:'Generate strong passwords' },
  { id:'password-strength',name:'Password Strength',   cat:'Security',   icon:'🛡️', color:'red',    file:'tools/security/password-strength.html', desc:'Check how strong your password is' },
  { id:'sha256-gen',       name:'SHA256 Generator',    cat:'Security',   icon:'#️⃣', color:'red',    file:'tools/security/sha256-gen.html',       desc:'Generate SHA-256 hash' },
  // Productivity
  { id:'qr-generator',     name:'QR Code Generator',   cat:'Productivity',icon:'📱',color:'purple', file:'tools/productivity/qr-generator.html',  desc:'Generate QR codes instantly' },
  { id:'uuid-generator',   name:'UUID Generator',      cat:'Productivity',icon:'🆔',color:'purple', file:'tools/productivity/uuid-generator.html', desc:'Generate unique UUIDs' },
  // Calculators
  { id:'percentage-calc',  name:'Percentage Calculator',cat:'Calculators',icon:'%', color:'teal',   file:'tools/calculators/percentage-calc.html', desc:'Calculate percentages easily' },
  { id:'age-calculator',   name:'Age Calculator',      cat:'Calculators', icon:'🎂',color:'teal',   file:'tools/calculators/age-calculator.html',  desc:'Calculate exact age from birthdate' },
  { id:'date-calculator',  name:'Date Calculator',     cat:'Calculators', icon:'📅',color:'teal',   file:'tools/calculators/date-calculator.html', desc:'Add/subtract dates & find differences' },
  { id:'gst-calculator',   name:'GST Calculator',      cat:'Calculators', icon:'🧾',color:'teal',   file:'tools/calculators/gst-calculator.html',  desc:'Calculate GST amounts easily' },
  { id:'emi-calculator',   name:'EMI Calculator',      cat:'Calculators', icon:'🏦',color:'teal',   file:'tools/calculators/emi-calculator.html',  desc:'Calculate loan EMI amounts' },
  { id:'irctc-date-calculator', name:'IRCTC Date Calculator', cat:'Calculators', icon:'🚆',color:'teal', file:'tools/calculators/irctc-date-calculator.html', desc:'Train booking, Tatkal & refund dates' },
  { id:'sip-calculator',   name:'SIP Calculator',      cat:'Calculators', icon:'📈',color:'teal',   file:'tools/calculators/sip-calculator.html',  desc:'Estimate mutual fund SIP returns' },
];

// ── THEME ──
const theme = {
  init() {
    const saved = localStorage.getItem('tb-theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    this.updateBtn(saved);
  },
  toggle() {
    const curr = document.documentElement.getAttribute('data-theme');
    const next = curr === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('tb-theme', next);
    this.updateBtn(next);
  },
  updateBtn(t) {
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = t === 'dark' ? '☀️' : '🌙';
  }
};

// ── FAVORITES ──
const favorites = {
  get() { return JSON.parse(localStorage.getItem('tb-favorites') || '[]'); },
  toggle(id) {
    let favs = this.get();
    if (favs.includes(id)) favs = favs.filter(f => f !== id);
    else favs.unshift(id);
    localStorage.setItem('tb-favorites', JSON.stringify(favs));
    return favs.includes(id);
  },
  has(id) { return this.get().includes(id); }
};

// ── RECENTLY USED ──
const recent = {
  get() { return JSON.parse(localStorage.getItem('tb-recent') || '[]'); },
  add(id) {
    let r = this.get().filter(x => x !== id);
    r.unshift(id);
    r = r.slice(0, 8);
    localStorage.setItem('tb-recent', JSON.stringify(r));
  }
};

// ── SEARCH (shared utility) ──
function _buildSearch(inp, box, root) {
  if (!inp || !box) return;
  let activeIdx = -1;

  function esc(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  function highlight(text, q) {
    if (!q) return text;
    return text.replace(new RegExp('(' + esc(q) + ')', 'gi'), '<mark>$1</mark>');
  }
  function groupBy(arr, key) {
    return arr.reduce((acc, item) => {
      (acc[item[key]] = acc[item[key]] || []).push(item); return acc;
    }, {});
  }
  function getItems() { return box.querySelectorAll('.search-result-item'); }
  function setActive(idx) {
    const items = getItems();
    items.forEach((el, i) => el.classList.toggle('sr-active', i === idx));
    if (items[idx]) items[idx].scrollIntoView({ block: 'nearest' });
    activeIdx = idx;
  }

  function render(q) {
    if (!q) { box.classList.add('hidden'); activeIdx = -1; return; }
    const matches = TOOLS.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.cat.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q)
    ).slice(0, 10);

    if (!matches.length) {
      const safeQ = String(q).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
      box.innerHTML = '<div class="search-empty">'
        + '<div class="se-icon">🔍</div>'
        + '<div class="se-text">No tools found for "' + safeQ + '"</div>'
        + '<div class="se-sub">Try "JSON", "password", "GST", or "word"</div>'
        + '</div>';
      box.classList.remove('hidden'); activeIdx = -1; return;
    }

    const groups = groupBy(matches, 'cat');
    let html = '<div class="sr-list">';
    Object.entries(groups).forEach(([cat, tools]) => {
      html += '<div class="sr-group-header">' + cat + '</div>';
      tools.forEach(t => {
        html += '<a href="' + root + t.file + '" class="search-result-item" onclick="recent.add(\'' + t.id + '\')">'
          + '<div class="result-icon icon-' + t.color + '">' + t.icon + '</div>'
          + '<div class="result-text">'
          + '<div class="result-name">' + highlight(t.name, q) + '</div>'
          + '<div class="result-cat">' + t.desc + '</div>'
          + '</div><span class="result-arrow">→</span></a>';
      });
    });
    html += '</div>'
      + '<div class="sr-footer">'
      + '<span><kbd>↑↓</kbd> Navigate</span>'
      + '<span><kbd>↵</kbd> Open</span>'
      + '<span><kbd>Esc</kbd> Close</span>'
      + '<span style="margin-left:auto">' + matches.length + ' result' + (matches.length !== 1 ? 's' : '') + '</span>'
      + '</div>';
    box.innerHTML = html;
    box.classList.remove('hidden'); activeIdx = -1;
  }

  inp.addEventListener('input', () => render(inp.value.trim().toLowerCase()));
  inp.addEventListener('focus', () => { if (inp.value.trim()) render(inp.value.trim().toLowerCase()); });

  inp.addEventListener('keydown', e => {
    const items = getItems();
    if (e.key === 'ArrowDown')  { e.preventDefault(); setActive(Math.min(activeIdx + 1, items.length - 1)); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(Math.max(activeIdx - 1, 0)); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      const target = activeIdx >= 0 ? items[activeIdx] : items[0];
      if (target) target.click();
    } else if (e.key === 'Escape') { box.classList.add('hidden'); inp.blur(); activeIdx = -1; }
  });

  document.addEventListener('click', e => {
    const wrap = inp.closest('.nav-search, .search-spotlight');
    if (wrap && !wrap.contains(e.target)) { box.classList.add('hidden'); activeIdx = -1; }
    else if (!inp.contains(e.target) && !box.contains(e.target)) { box.classList.add('hidden'); activeIdx = -1; }
  });
}

const search = {
  init(root = '') {
    _buildSearch(
      document.getElementById('global-search'),
      document.getElementById('search-results'),
      root
    );
    // '/' shortcut focuses navbar search
    document.addEventListener('keydown', e => {
      const inp = document.getElementById('global-search');
      if (!inp) return;
      if (e.key === '/' && document.activeElement !== inp) {
        const tag = (document.activeElement?.tagName || '').toLowerCase();
        if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
        e.preventDefault();
        inp.focus();
      }
    });
  }
};

// ── MOBILE SIDEBAR ──
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const isOpen = sidebar?.classList.toggle('open');
  overlay?.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

// Close sidebar when a link inside it is clicked (mobile)
document.addEventListener('click', e => {
  if (window.innerWidth <= 768 && e.target.closest('.sidebar-link')) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar?.classList.contains('open')) toggleSidebar();
  }
});

// Close sidebar on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const sidebar = document.getElementById('sidebar');
    if (sidebar?.classList.contains('open')) toggleSidebar();
  }
});

// ── COPY TO CLIPBOARD ──
async function copyText(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '✅ Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); }, 2000);
    }
  } catch { alert('Copy failed. Please select and copy manually.'); }
}

// ── TOAST ──
function toast(msg, type = 'success') {
  // Remove any existing toast to avoid stacking
  document.getElementById('tb-toast')?.remove();
  const t = document.createElement('div');
  t.id = 'tb-toast';
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const styles = {
    success: { bg: isDark ? '#0d2818' : '#eafaf1', color: isDark ? '#4ade80' : '#1a7a44', border: isDark ? '#166534' : '#a9dfbf', icon: '✅' },
    danger:  { bg: isDark ? '#2d0e0e' : '#fdedec', color: isDark ? '#f87171' : '#a93226', border: isDark ? '#7f1d1d' : '#f5b7b1', icon: '❌' },
    info:    { bg: isDark ? '#1a2142' : '#eef0fd', color: isDark ? '#7fa7ff' : '#4361ee', border: isDark ? '#1e3a8a' : '#c5cdf8', icon: 'ℹ️' },
  };
  const s = styles[type] || styles.success;
  t.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;padding:12px 16px;border-radius:10px;font-size:14px;font-weight:600;display:flex;align-items:center;gap:8px;background:${s.bg};color:${s.color};border:1px solid ${s.border};box-shadow:0 4px 16px rgba(0,0,0,.15);max-width:320px;transition:opacity .3s;`;
  t.innerHTML = `${s.icon} ${msg}`;
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 320); }, 2600);
}

// ── FAQ TOGGLE ──
function initFAQ() {
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.display = 'none';
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.display = 'block';
      }
    });
  });
  document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
}

// ── TOOL PAGE INIT (called on each tool page) ──
function initToolPage(toolId) {
  recent.add(toolId);
  // Mark sidebar link active
  document.querySelectorAll('.sidebar-link').forEach(l => {
    if (l.href && l.href.includes(toolId)) l.classList.add('active');
  });
  // Wire Cmd/Ctrl+K to focus the global search (matches the ⌘K hint shown in the nav)
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const s = document.getElementById('global-search');
      if (s) { s.focus(); s.select(); }
    }
  });
}

// ── DOWNLOAD TEXT FILE ──
function downloadText(content, filename) {
  const blob = new Blob([content], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

// ── CUSTOM DATEPICKER ──
// Attach a styled calendar popover to any <input data-datepicker>.
// The input keeps a real ISO value (YYYY-MM-DD) in dataset.value / .value,
// shows a human-friendly format, and fires a 'change' event on selection.
const Datepicker = {
  MONTHS: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  DAYS: ['Su','Mo','Tu','We','Th','Fr','Sa'],

  formatDisplay(d) {
    return `${this.MONTHS[d.getMonth()].slice(0,3)} ${d.getDate()}, ${d.getFullYear()}`;
  },
  toISO(d) {
    const y = d.getFullYear(), m = String(d.getMonth()+1).padStart(2,'0'), day = String(d.getDate()).padStart(2,'0');
    return `${y}-${m}-${day}`;
  },
  fromISO(s) {
    if (!s) return null;
    const [y,m,d] = s.split('-').map(Number);
    return new Date(y, m-1, d);
  },

  init(input) {
    if (input.dataset.dpInit) return;
    input.dataset.dpInit = '1';
    input.readOnly = true;
    input.classList.add('dp-input');
    if (!input.placeholder) input.placeholder = 'Select date…';

    const wrap = document.createElement('div');
    wrap.className = 'dp-wrap';
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);

    const icon = document.createElement('span');
    icon.className = 'dp-icon';
    icon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
    wrap.appendChild(icon);

    const panel = document.createElement('div');
    panel.className = 'dp-panel hidden';
    wrap.appendChild(panel);

    // Initial view date: existing value, or today
    let viewDate = input.value ? this.fromISO(input.value) : new Date();
    let selected = input.value ? this.fromISO(input.value) : null;

    const minDate = input.dataset.dpMin ? this.fromISO(input.dataset.dpMin) : null;
    const maxDate = input.dataset.dpMax ? this.fromISO(input.dataset.dpMax) : null;

    const render = () => {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const todayISO = this.toISO(new Date());

      let cells = '';
      for (let i = 0; i < firstDay; i++) cells += '<span class="dp-day dp-empty"></span>';
      for (let d = 1; d <= daysInMonth; d++) {
        const cellDate = new Date(year, month, d);
        const iso = this.toISO(cellDate);
        let cls = 'dp-day';
        if (iso === todayISO) cls += ' dp-today';
        if (selected && iso === this.toISO(selected)) cls += ' dp-selected';
        if ((minDate && cellDate < minDate) || (maxDate && cellDate > maxDate)) cls += ' dp-disabled';
        cells += `<span class="${cls}" data-iso="${iso}">${d}</span>`;
      }

      // Build year options. If the input declares a min/max range (data-dp-min / data-dp-max),
      // constrain the dropdown to that range instead of always showing the full birthdate-style
      // +1/-120 year span — a journey-date picker only needs a handful of nearby years, for example.
      const curYear = new Date().getFullYear();
      const yearMax = maxDate ? maxDate.getFullYear() : curYear + 1;
      const yearMin = minDate ? minDate.getFullYear() : curYear - 120;
      let yearOpts = '';
      for (let y = yearMax; y >= yearMin; y--) {
        yearOpts += `<option value="${y}"${y === year ? ' selected' : ''}>${y}</option>`;
      }
      let monthOpts = this.MONTHS.map((m, i) => `<option value="${i}"${i === month ? ' selected' : ''}>${m}</option>`).join('');

      panel.innerHTML = `
        <div class="dp-header">
          <button type="button" class="dp-nav" data-dir="-1" aria-label="Previous month">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div class="dp-header-selects">
            <select class="dp-month-select">${monthOpts}</select>
            <select class="dp-year-select">${yearOpts}</select>
          </div>
          <button type="button" class="dp-nav" data-dir="1" aria-label="Next month">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
        <div class="dp-weekdays">${this.DAYS.map(d => `<span>${d}</span>`).join('')}</div>
        <div class="dp-days">${cells}</div>
        <div class="dp-footer">
          <button type="button" class="dp-today-btn">Today</button>
          <button type="button" class="dp-clear-btn">Clear</button>
        </div>`;

      panel.querySelector('.dp-month-select').addEventListener('change', e => {
        viewDate = new Date(viewDate.getFullYear(), parseInt(e.target.value), 1);
        render();
      });
      panel.querySelector('.dp-year-select').addEventListener('change', e => {
        viewDate = new Date(parseInt(e.target.value), viewDate.getMonth(), 1);
        render();
      });
      panel.querySelectorAll('.dp-nav').forEach(btn => {
        btn.addEventListener('click', () => {
          viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + parseInt(btn.dataset.dir), 1);
          render();
        });
      });
      panel.querySelectorAll('.dp-day:not(.dp-empty):not(.dp-disabled)').forEach(cell => {
        cell.addEventListener('click', () => {
          selected = this.fromISO(cell.dataset.iso);
          input.value = this.formatDisplay(selected);
          input.dataset.value = cell.dataset.iso;
          close();
          input.dispatchEvent(new Event('change', { bubbles: true }));
        });
      });
      panel.querySelector('.dp-today-btn').addEventListener('click', () => {
        const t = new Date();
        selected = t;
        viewDate = t;
        input.value = this.formatDisplay(t);
        input.dataset.value = this.toISO(t);
        close();
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
      panel.querySelector('.dp-clear-btn').addEventListener('click', () => {
        selected = null;
        input.value = '';
        input.dataset.value = '';
        close();
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    };

    const open = () => { render(); panel.classList.remove('hidden'); wrap.classList.add('dp-open'); };
    const close = () => { panel.classList.add('hidden'); wrap.classList.remove('dp-open'); };

    input.addEventListener('click', () => panel.classList.contains('hidden') ? open() : close());
    icon.addEventListener('click', () => panel.classList.contains('hidden') ? open() : close());
    document.addEventListener('click', e => {
      if (!wrap.contains(e.target)) close();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
    });

    // If the input already had a value set programmatically, reflect it
    if (input.value && /^\d{4}-\d{2}-\d{2}$/.test(input.value)) {
      const d = this.fromISO(input.value);
      selected = d; viewDate = d;
      input.dataset.value = input.value;
      input.value = this.formatDisplay(d);
    }

    // Expose a setter for programmatic updates (e.g. "Use Today" buttons)
    input._dpSet = (iso) => {
      if (!iso) {
        selected = null; input.value = ''; input.dataset.value = '';
        return;
      }
      const d = this.fromISO(iso);
      selected = d; viewDate = d;
      input.value = this.formatDisplay(d);
      input.dataset.value = iso;
    };
  },

  initAll() {
    document.querySelectorAll('input[data-datepicker]').forEach(inp => this.init(inp));
  }
};

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  theme.init();
  initFAQ();
});

// ── GLOBAL ⌘K SHORTCUT (homepage) ──
// Tool pages wire this inside initToolPage(); this covers the homepage and other non-tool pages.
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    // Only fire if initToolPage hasn't already added a listener (avoid double-focus)
    if (document.body.classList.contains('home-page') ||
        !document.body.dataset.toolInit) {
      e.preventDefault();
      const s = document.getElementById('global-search');
      if (s) { s.focus(); s.select(); }
    }
  }
});
