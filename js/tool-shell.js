// tool-shell.js — builds the outer shell HTML for tool pages
// Usage: call buildToolShell({ id, name, cat, icon, color, desc }) at DOMContentLoaded
function buildToolShell(opts) {
  const root = '../../';
  document.title = `${opts.name} — Free Online Tool | ToolBox`;
  // meta description
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) { meta = document.createElement('meta'); meta.name='description'; document.head.appendChild(meta); }
  meta.content = `Free online ${opts.name}. ${opts.desc}. No login required, works in your browser.`;
}
