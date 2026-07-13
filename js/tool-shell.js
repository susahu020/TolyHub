// tool-shell.js — Sets page title and meta description for tool pages.
// Call buildToolShell({ id, name, cat, icon, color, desc }) in a <script> after layout.js
// if you want to override the defaults set in each tool's own <head>.
function buildToolShell(opts) {
  if (opts.name) {
    document.title = `${opts.name} — Free Online Tool | TolyHub`;
  }
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'description';
    document.head.appendChild(meta);
  }
  if (opts.desc) {
    meta.content = `Free online ${opts.name}. ${opts.desc}. No login required, works in your browser.`;
  }
  // Inject canonical favicon links if not already present
  if (!document.querySelector('link[rel="icon"]')) {
    const root = typeof window.PAGE_DEPTH === 'number' && window.PAGE_DEPTH > 0
      ? '../'.repeat(window.PAGE_DEPTH)
      : './';
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = root + 'favicon.ico';
    document.head.appendChild(link);
    const link32 = document.createElement('link');
    link32.rel = 'icon';
    link32.type = 'image/png';
    link32.sizes = '32x32';
    link32.href = root + 'logo/favicon-32x32.png';
    document.head.appendChild(link32);
  }
}
