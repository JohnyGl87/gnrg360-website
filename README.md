# G-NRG 360 — website source

Source of [www.gnrg360.com](https://www.gnrg360.com): a hand-written static site, no build step.

## Structure

```
/
├── index.html          Hebrew homepage (RTL) → /
├── en.html             English homepage (LTR) → /en
├── 404.html            Hebrew "page not found"
├── en/404.html         English "page not found"
├── robots.txt, sitemap.xml
├── favicon.ico
├── _headers            Cloudflare Pages response headers (cache, noindex)
├── _redirects          Cloudflare Pages redirects (old /he URLs → /)
└── assets/
    ├── site.css, site.js   Shared styles and script
    ├── logo.png            Full logo
    ├── og-image.png        Social-sharing image, 1200×630 (og:image)
    ├── logo-header.png     Small header logo
    ├── icons/              Favicon / app icons
    ├── evgeni.jpg          Portrait
    └── v2-assets/          Client logos and the Assistant font
```

## Deployment

Hosted on Cloudflare Pages, connected to this GitHub repo. No build command; output directory is the repo root.

- Push to `main` → deploys to production.
- Push to any other branch → Cloudflare builds a preview deployment (noindex).

## Hosted files (not part of the site)

Some files live in this repo only so they have a stable public URL. They are not linked from any page.

| File | Public URL | Purpose |
| --- | --- | --- |
| `assets/medly-signature-logo.png` | `https://www.gnrg360.com/assets/medly-signature-logo.png` | Medly logo, used as an email-signature image |
| `assets/nrg-signature-logo.png` | `https://www.gnrg360.com/assets/nrg-signature-logo.png` | G-NRG 360 logo, used as an email-signature image (300×300, solid white background) |

These are unlisted, **not private**: anyone with the URL can open them, and they are visible in this public repo. `_headers` marks them `noindex` so search engines skip them.
