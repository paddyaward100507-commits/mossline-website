# Mossline Digital

Landing page for Mossline Digital, a website design and development agency
for SMEs in Ireland and the UK.

## Structure

- `index.html` — single-page site (hero, services/pricing, portfolio, process, why-us, sectors, contact)
- `styles.css` — styling
- `assets/` — logo and wordmark

## Adding a portfolio project

Find the `<section id="portfolio">` block in `index.html`. Duplicate one
`.portfolio-card` element, then:

1. Replace the `.portfolio-tag` text with the sector (e.g. "Hospitality")
2. Replace the `<h3>` and `<p>` with the real project name/description
3. Swap the `.portfolio-thumb` placeholder icon for a real screenshot, e.g.
   `<img src="assets/portfolio/project-name.jpg" alt="...">` in place of the
   `<svg class="portfolio-thumb-icon">` element
4. Optionally add a matching card to the nav dropdown preview
   (`.dropdown-portfolio-grid` in the `<header>`)

## Running locally

Open `index.html` directly in a browser, or serve the folder with any static
file server, e.g. on Windows with no other tooling installed:

```
powershell -NoProfile -ExecutionPolicy Bypass -File serve.ps1
```

Then visit `http://localhost:8734/`.
