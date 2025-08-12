ALcothon — Drink & Code Online
================================

Static one‑pager for the online drinking‑and‑coding event.

Files
- `index.html`: Markup, SEO/OG, critical CSS inline, links.
- `styles.css`: Non‑critical styles (loaded after above‑the‑fold).
- `script.js`: Countdown, theme toggle, back‑to‑top.
- `assets/logo.svg`: Simple SVG favicon/logo (martini in angle brackets).

Edit the copy
All visible copy lives in `index.html`. Keep the exact wording per sections if you want to preserve the event’s tone. Update footer links as needed.

Set the event start
1) Open `script.js`.
2) Change the ISO string in `EVENT_START`, for example:
```js
const EVENT_START = "2025-10-04T19:00:00+02:00"; // YYYY-MM-DDThh:mm:ssZ
```

Behavior
- Before start: countdown shows “Starts in …”.
- After start: both CTA button groups are replaced by “Event in session”.

Replace links
- Registration: `https://github.com/<ORG>/<REPO>/issues/new?title=Register%3A%20%3CYour%20Name%3E&body=Project%20idea%3A%20...`
- Discord: `https://discord.gg/your-invite`
- Footer GitHub repo: `https://github.com/ORG/REPO`
- Contact email: `mailto:hello@example.com`

Preview locally (no build tools)
Any static server works. Two easy options:

Option A: Python
```bash
cd /Users/maksimgalinskii/Documents/prikol/Alcohackathon
python3 -m http.server 8000
# open http://localhost:8000/
```

Option B: Node
```bash
npx serve -s . --listen 8000 --yes
# open http://localhost:8000/
```

Deploy to GitHub Pages
1) Commit and push to `main`.
2) In your GitHub repo: Settings → Pages → Build and deployment → Source: `Deploy from a branch`.
3) Branch: `main`; Folder: `/ (root)`.
4) Save. Your site will be available shortly. Update the repo URL in the footer once live.

Accessibility and performance
- Semantic landmarks and headings; skip‑link; visible focus outlines.
- Dark theme by default with a toggle; respects `prefers-reduced-motion`.
- Critical CSS in `<head>`, rest deferred via `styles.css`. JS is `defer` loaded.
- No external fonts; system stack ensures fast renders.

License
Open source by default. Use and adapt for your event.
