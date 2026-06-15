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

// ── SEARCH ──
const search = {
  init(root = '') {
    const inp = document.getElementById('global-search');
    const results = document.getElementById('search-results');
    if (!inp || !results) return;

    inp.addEventListener('input', () => {
      const q = inp.value.trim().toLowerCase();
      if (!q) { results.classList.add('hidden'); return; }
      const matches = TOOLS.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.cat.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q)
      ).slice(0, 8);

      if (!matches.length) {
        results.innerHTML = '<div class="search-empty">No tools found</div>';
      } else {
        results.innerHTML = matches.map(t => `
          <a href="${root}${t.file}" class="search-result-item" onclick="recent.add('${t.id}')">
            <div class="result-icon icon-${t.color}">${t.icon}</div>
            <div>
              <div class="result-name">${t.name}</div>
              <div class="result-cat">${t.cat} · ${t.desc}</div>
            </div>
          </a>`).join('');
      }
      results.classList.remove('hidden');
    });

    document.addEventListener('click', e => {
      if (!inp.contains(e.target) && !results.contains(e.target))
        results.classList.add('hidden');
    });
    inp.addEventListener('keydown', e => {
      if (e.key === 'Escape') { results.classList.add('hidden'); inp.blur(); }
    });

    // '/' focuses search from anywhere (unless already typing in a field)
    document.addEventListener('keydown', e => {
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
  const t = document.createElement('div');
  t.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;padding:12px 20px;border-radius:10px;font-size:14px;font-weight:600;color:#fff;background:${type==='success'?'#2ecc71':type==='danger'?'#e74c3c':'#4361ee'};box-shadow:0 4px 20px rgba(0,0,0,0.2);animation:slideIn 0.3s ease`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2800);
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

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  theme.init();
  initFAQ();
});
