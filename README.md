# G-NRG 360 — Website Source

Static export of the original Carrd site, cleaned and self-contained.

## Structure

```
/
├── index.html      English homepage (root)
├── he.html         Hebrew homepage
├── assets/
│   ├── image01.jpg ... image16.jpg   Photo content
│   ├── flag-he.png, flag-en.jpg      Language switcher flags
│   ├── fonts-en.css, fonts-he.css    Google Fonts CSS
│   └── ...
└── README.md       (this file)
```

## Deployment

This folder is ready to deploy as-is to any static host:

- **Cloudflare Pages** (recommended): connect this GitHub repo, no build step needed.
- **GitHub Pages**: enable Pages in repo settings.
- **Netlify / Vercel**: drag the folder onto the dashboard.

No build command. Output directory is `/` (the repo root).

## Known limitations (carried over from Carrd)

1. **Contact form**: the original form relied on Carrd's backend, which is no longer connected.
   The form still renders, but submissions will not be delivered. To fix, hook the form to a
   free service such as Web3Forms or Formspree (change the form's `action` URL and add an
   `access_key` field).

2. **Favicon**: removed during cleanup because the original favicon was served from a path
   that's not part of the export. Add a `favicon.ico` or `favicon.png` to the root when you
   have one, and reference it in the `<head>` of both HTML files.

3. **Page-load animations**: Carrd's reveal animations relied on a JavaScript file that
   wasn't included in the browser export. Content still appears correctly, just without the
   initial fade-in effect.

## Updating content

For text changes, edit `index.html` (English) and/or `he.html` (Hebrew) directly.
Both files are minified single-line HTML — easier to ask Claude or Claude Code for changes
than to edit by hand.
