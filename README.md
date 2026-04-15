# BobbyWebsite — Limitless Contracting

Static marketing site for **Limitless Contracting** (Windsor & Essex County, Ontario): services, project gallery, reviews, and contact CTAs.

## What is in this repo

| Path | Purpose |
|------|---------|
| `index.html` | Full page markup, SEO meta, JSON-LD |
| `styles.css` | Layout, typography, responsive styles |
| `script.js` | Nav scroll, mobile menu, gallery reel, scroll reveal |
| `images/` | Production assets used by the site (`logo/`, `projects/`, `social/`) |
| `Assets/` | Additional source photos (logo variants, proof-of-work, social) |
| `vercel.json` | Vercel headers |
| `push-github.ps1` / `push-github.bat` | Helper to push with `gh` or `GITHUB_TOKEN` |

Open `index.html` in a browser from a local server (or deploy to Vercel/GitHub Pages) so asset paths resolve correctly.

## Quick start

```bash
git clone https://github.com/broiscodingtpc/bobbywebsite.git
cd bobbywebsite
# Optional: python -m http.server 8080
```

## Deploy

Connect the repo to [Vercel](https://vercel.com/) (framework: Other / static). Root `index.html` is the entry.

## Push from Windows

Use GitHub CLI (`gh auth login`) then `git push`, or run `push-github.bat` after setting `GITHUB_TOKEN` with `repo` scope.
