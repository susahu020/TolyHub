# 🛠️ TolyHub — Phase 1 Deployment Guide
## Complete Beginner's Step-by-Step Guide

---

## 📁 Project Structure

```
tolyhub/
├── index.html                    ← Homepage
├── css/
│   └── style.css                 ← All styles (design system)
├── js/
│   ├── main.js                   ← Core JS (search, theme, utils)
│   ├── layout.js                 ← Navbar, sidebar, footer (auto-injected)
│   └── tool-shell.js             ← Helper for tool pages
└── tools/
    ├── text/                     ← 6 text tools
    ├── developer/                ← 8 developer tools
    ├── seo/                      ← 6 SEO tools
    ├── security/                 ← 3 security tools
    ├── productivity/             ← 2 productivity tools
    └── calculators/              ← 5 calculator tools
```

---

## ✅ Phase 1 Tools Built (30 Total)

### 📝 Text Tools (6)
1. Word Counter
2. Character Counter
3. Case Converter
4. Text Compare
5. Sort Text Lines
6. Remove Duplicate Lines

### 💻 Developer Tools (8)
7. JSON Formatter
8. JSON Validator
9. JSON Minifier
10. Base64 Encoder
11. Base64 Decoder
12. URL Encoder
13. URL Decoder
14. MD5 Generator

### 🔍 SEO Tools (6)
15. Meta Tag Generator
16. Robots.txt Generator
17. XML Sitemap Generator
18. Schema Generator (JSON-LD)
19. SERP Preview
20. Open Graph Generator

### 🔒 Security Tools (3)
21. Password Generator
22. Password Strength Checker
23. SHA-256 Generator

### ⚡ Productivity Tools (2)
24. QR Code Generator
25. UUID Generator

### 🧮 Calculators (5)
26. Percentage Calculator
27. Age Calculator
28. Date Calculator
29. GST Calculator
30. EMI Calculator

---

## 🚀 STEP 1 — Test Locally (No Install Needed!)

Just open the files directly in your browser:

1. Go to your `tolyhub/` folder
2. Double-click `index.html`
3. It opens in your browser — that's it!

> ⚠️ Some browser features (clipboard paste) need a local server.
> To run a local server, install VS Code + Live Server extension.

---

## 🚀 STEP 2 — Deploy FREE on GitHub Pages

### Create GitHub Account
1. Go to https://github.com and sign up (free)

### Upload Your Project
1. Click **New repository** (green button)
2. Name it: `tolyhub` (or any name you want)
3. Set it to **Public**
4. Click **Create repository**
5. Click **uploading an existing file**
6. Drag ALL your project files into the browser (maintain folder structure)
7. Click **Commit changes**

### Enable GitHub Pages
1. Go to your repository → **Settings**
2. Click **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Select **main** branch, **/ (root)** folder
5. Click **Save**
6. Wait 2–3 minutes
7. Your site is live at: `https://yourusername.github.io/tolyhub/`

✅ **100% FREE. No credit card. No limits.**

---

## 🚀 STEP 3 — Deploy FREE on Netlify (Even Easier!)

1. Go to https://netlify.com and sign up (free)
2. Click **Add new site** → **Deploy manually**
3. **Drag your entire `tolyhub/` folder** into the browser
4. Your site is live instantly with a random URL like `amazing-einstein-123.netlify.app`
5. To get a custom domain later, go to **Site settings** → **Domain management**

✅ **Free tier includes: 100GB bandwidth/month, custom domain, HTTPS**

---

## 🚀 STEP 4 — Deploy FREE on Vercel (Best for SEO)

1. Go to https://vercel.com and sign up with GitHub
2. Click **New Project**
3. Import your GitHub repository
4. Click **Deploy**
5. Done! Live in 30 seconds

✅ **Free tier: Unlimited static sites, global CDN, automatic HTTPS**

---

## 🌐 STEP 5 — Get a Custom Domain (Optional, ~₹800/year)

1. Buy a `.com` domain from:
   - **Namecheap** (namecheap.com) — ~$8/year
   - **GoDaddy** (godaddy.com) — ~₹800/year
   - **Cloudflare Registrar** (cloudflare.com) — at-cost pricing
2. Connect it to your Netlify/Vercel site:
   - Go to your site dashboard
   - Click **Add custom domain**
   - Follow DNS setup instructions (usually takes 5–30 minutes)

---

## ➕ STEP 6 — Add a New Tool (Super Easy!)

To add a new tool, just copy any existing tool file and modify it:

```
1. Copy: tools/text/word-counter.html
2. Rename: tools/text/my-new-tool.html
3. Edit the content inside
4. Add it to TOOLS array in js/main.js
5. Done! It automatically appears in:
   - Search results
   - Sidebar navigation
   - Recently used
```

### Adding to TOOLS array in main.js:
```js
{ 
  id:'my-new-tool', 
  name:'My New Tool', 
  cat:'Text', 
  icon:'🔧', 
  color:'blue', 
  file:'tools/text/my-new-tool.html', 
  desc:'What this tool does' 
},
```

---

## 🎨 STEP 7 — Customize Branding

Edit these to match your brand:

### Change Site Name
Search for `TolyHub` in all files and replace with your brand name.

### Change Colors
Open `css/style.css` and edit:
```css
:root {
  --accent: #4361ee;  ← Change this to your brand color
}
```

### Change Logo Icon
Search for `🛠` in layout.js and replace with your preferred emoji or image.

---

## 📊 STEP 8 — Add Google Analytics (Free)

1. Go to https://analytics.google.com
2. Create a new property for your website
3. Get your Measurement ID (looks like: `G-XXXXXXXXXX`)
4. Add to your `index.html` before `</head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 💰 STEP 9 — Add Google AdSense (Monetization)

1. Apply at https://adsense.google.com (need 20–30 days of content)
2. Once approved, get your ad code
3. Add ad units to tool pages:
```html
<!-- In tool pages, add after tool-body div -->
<div class="ad-container" style="text-align:center;margin:1rem 0;">
  <!-- AdSense ad code here -->
</div>
```

---

## 🔍 STEP 10 — Submit to Google Search Console

1. Go to https://search.google.com/search-console
2. Click **Add property** → Enter your website URL
3. Verify ownership (HTML file method is easiest)
4. Submit your sitemap: `https://yoursite.com/sitemap.xml`
5. Google will start indexing your pages within days

---

## 🏗 What's Next — Phase 2 (100+ Tools)

When you're ready to expand, add:
- PDF tools (merge, split, compress) using pdf-lib
- Image tools (compress, resize, convert) using browser Canvas API
- More developer tools (HTML/CSS/JS formatters)
- Website lookup tools (WHOIS, DNS, SSL checker)
- More calculators (ROI, SIP, Profit Margin)

---

## 💡 Tips for Success

1. **Publish quickly** — Even 10 tools is enough to launch
2. **Write blog posts** — "How to use JSON Formatter" helps SEO
3. **Share on Reddit** — r/webdev, r/SEO, r/sideprojects
4. **Submit to directories** — Product Hunt, Hacker News, IndieHackers
5. **Focus on mobile** — 60%+ of users are on phones
6. **Load speed matters** — This project loads in <1 second (no frameworks!)

---

## 📰 Blog System

- `blog.html` — listing page with all 30 tool guides, filterable by category
- `blog/<tool-id>.html` — one in-depth SEO article per tool (how-to steps, use cases, FAQ with schema.org markup, related tools)
- `blog_data.py` + `generate_blog.py` — regenerate all blog pages after editing content or adding new tools. Run from inside the `tolyhub/` folder:
  ```
  python3 generate_blog.py
  ```
  Edit the article content in `blog_data.py`, then re-run the script to rebuild `blog.html` and every `blog/<tool-id>.html` page.

---

## 📬 Contact Form (Google Apps Script)

`contact.html` posts to a Google Apps Script Web App URL (`SCRIPT_URL` inside the page). The script itself is version-controlled at `scripts/contact-form.gs` — copy its full contents into your Apps Script project at script.google.com.

**Important:** editing `scripts/contact-form.gs` in this repo does **not** update the live script. Apps Script only picks up changes after you redeploy:
1. Open your project at script.google.com
2. Paste the updated code from `scripts/contact-form.gs`, replacing everything
3. **Deploy → Manage deployments → ✏️ (edit) → Version: New version → Deploy**
4. The `/exec` URL stays the same, so `contact.html` doesn't need any changes

If a submitted message arrives as plain, unstyled text (or with garbled symbols) instead of the branded card design, it almost always means step 3 was skipped and an older version of the script is still live.

---


**Sidebar not showing?**
→ Make sure `js/layout.js` and `js/main.js` are loaded in every page

**Search not working?**
→ Open browser console (F12) and check for errors

**Dark mode not saving?**
→ localStorage must be enabled in your browser

**QR code not generating?**
→ Check your internet connection (QR tool loads from CDN)

---

*Built with ❤️ — 100% free, no frameworks, no build tools needed!*
