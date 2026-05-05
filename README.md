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

The repo is named `aalap-shah421.github.io`, which makes it a "user site" - GitHub Pages serves the repo's `main` branch automatically at `https://aalap-shah421.github.io`.

Standard workflow after a clone:

```bash
git add .
git commit -m "your message"
git push
```

GitHub Pages rebuilds within ~30-60 seconds.

The `.nojekyll` file at the root tells GitHub Pages to skip Jekyll processing, which is required to serve files inside dotfile-prefixed directories.

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

Edit the `#now` block in `index.html`. It shows what I'm currently working on. Keeping it fresh is the strongest signal to recruiters that the site is alive.

## A note for visitors

If you're poking around this repo, hi. There's a small CTF hidden across the live site - if you'd rather find it the fun way than read source, start at `https://aalap-shah421.github.io/` and open your browser's dev tools console. Solving it has a real reward at the end. Have fun.

## Files

```
.
├── index.html            # main page
├── blog.html             # blog index
├── 404.html              # custom 404
├── style.css             # terminal aesthetic
├── script.js             # interactions
├── robots.txt
├── .nojekyll
├── posts/                # blog posts + index.json
├── assets/               # resume, images, banners
└── (a few other dirs)    # see at your own risk
```
