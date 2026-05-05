# aalap.sh - personal portfolio

Source for **https://aalap-shah421.github.io** - Aalap Shah's portfolio site.
Static HTML/CSS/JS. No build step. Hosted on GitHub Pages.

## Stack

- Pure HTML / CSS / vanilla JS (no framework, no build pipeline)
- Hosted on GitHub Pages (free)
- `posts/index.json` is the source of truth for blog posts

## Local preview

```bash
cd aalap-shah421.github.io
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

1. On GitHub, **create a new repo named exactly `aalap-shah421.github.io`** (this is special - it makes the repo your user-site, served at `https://aalap-shah421.github.io`).
2. Make it **public**.
3. From this directory:
   ```bash
   git init
   git add .
   git commit -m "initial portfolio"
   git branch -M main
   git remote add origin https://github.com/aalap-shah421/aalap-shah421.github.io.git
   git push -u origin main
   ```
4. On GitHub, go to **Settings → Pages** and confirm:
   - Source: **Deploy from a branch**
   - Branch: **main** / root
5. Wait ~1 minute. Visit `https://aalap-shah421.github.io`.

The `.nojekyll` file at the root tells GitHub Pages to skip Jekyll processing, which is required for the `/.well-known/` and `/.hidden/` dotfile paths used by the CTF.

## Updating the site

### Add a new blog post

1. Create `posts/YYYY-MM-DD-slug.html` (copy an existing post as a template).
2. Add an entry at the top of `posts/index.json`:
   ```json
   {
     "slug": "YYYY-MM-DD-slug",
     "title": "Your title",
     "date": "YYYY-MM-DD",
     "tags": ["tag1", "tag2"],
     "excerpt": "One-paragraph teaser.",
     "read": "3 min"
   }
   ```
3. Bump `<span id="last-updated">YYYY-MM-DD</span>` in `index.html`.
4. Commit and push.

### Update the "now" section

Edit the `#now` block in `index.html`. It shows what you're currently working on. Keep it fresh - it's the strongest signal to recruiters that the site is alive.

## CTF map (for your eyes only)

| Stage | Path | Mechanism | Notes |
|-------|------|-----------|-------|
| 0 | console on any page | dev-tools breadcrumb | mentions `/robots.txt` |
| 1 | `/robots.txt` | comment with next path | points to `/.well-known/whoami.txt` |
| 2 | `/.well-known/whoami.txt` | base64-encoded clue | tells them about the `#quiet` span |
| 3 | hidden `<span id="quiet">` on home | hex-encoded URL in `data-q` | decodes to `/.hidden/whichway/` |
| 4 | `/.hidden/whichway/` | ROT13 cipher | reveals flag + final URL |
| 5 | `/secret/finalboss.html` | flag submit form | mailto with their info |

Final flag: `AALAP{persistence_pays_lunch}`

## Files

```
.
├── index.html           # main page (hero, projects, about, skills, certs)
├── blog.html            # blog index
├── 404.html             # custom 404 with hint to CTF
├── style.css            # terminal aesthetic
├── script.js            # typewriter, post loader, console banner
├── robots.txt           # CTF stage 1
├── .nojekyll            # tell GH Pages to skip Jekyll
├── .well-known/
│   └── whoami.txt       # CTF stage 2
├── .hidden/
│   └── whichway/
│       └── index.html   # CTF stage 4 (ROT13)
├── secret/
│   └── finalboss.html   # CTF stage 5 (flag submit)
├── posts/
│   ├── index.json
│   ├── 2026-05-05-final-season-at-mason.html
│   └── 2026-04-28-hackfax-postmortem.html
├── drafts/              # weekly draft posts land here, you publish manually
└── assets/
    └── resume.pdf
```
