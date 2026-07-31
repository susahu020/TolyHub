#!/usr/bin/env python3
"""
add-adsense.py — Insert the Google AdSense Auto Ads snippet into every HTML
page in the project, right before </head>.

WHEN TO RUN THIS:
Only after your AdSense application is APPROVED and you have your
publisher ID (looks like: ca-pub-1234567890123456).

HOW TO RUN:
1. cd into the tolyhub/ project root (the folder with index.html in it)
2. python3 scripts/add-adsense.py ca-pub-XXXXXXXXXXXXXXXX
   (replace with your real publisher ID)
3. Commit/upload the changed files to your host (GitHub Pages / Netlify / Vercel)

This is idempotent — running it twice with the same ID won't duplicate the
snippet. Running it again with a NEW ID will replace the old one everywhere.
"""
import sys
import re
import glob

MARKER_START = "<!-- ADSENSE-AUTO-ADS-START -->"
MARKER_END = "<!-- ADSENSE-AUTO-ADS-END -->"

def build_snippet(pub_id):
    return (
        f'{MARKER_START}\n'
        f'<script async src="https://pagead2.googlesyndication.com/pagead/js/'
        f'adsbygoogle.js?client={pub_id}" crossorigin="anonymous"></script>\n'
        f'{MARKER_END}\n'
    )

def main():
    if len(sys.argv) != 2 or not sys.argv[1].startswith("ca-pub-"):
        print("Usage: python3 scripts/add-adsense.py ca-pub-XXXXXXXXXXXXXXXX")
        sys.exit(1)

    pub_id = sys.argv[1]
    snippet = build_snippet(pub_id)

    html_files = glob.glob("**/*.html", recursive=True)
    if not html_files:
        print("No HTML files found. Run this from the project root (where index.html lives).")
        sys.exit(1)

    changed = 0
    for path in html_files:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()

        if "</head>" not in content:
            continue

        # Remove any previously-inserted snippet first (idempotent re-run / ID swap)
        content = re.sub(
            re.escape(MARKER_START) + r".*?" + re.escape(MARKER_END) + r"\n?",
            "",
            content,
            flags=re.S,
        )

        new_content = content.replace("</head>", snippet + "</head>", 1)

        if new_content != content:
            with open(path, "w", encoding="utf-8") as f:
                f.write(new_content)
            changed += 1

    print(f"Inserted AdSense snippet ({pub_id}) into {changed} file(s).")
    print("Next: fill in ads.txt with your real publisher ID, then redeploy.")

if __name__ == "__main__":
    main()
