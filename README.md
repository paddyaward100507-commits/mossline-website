# Mossline Digital

Landing page for Mossline Digital, a website design and development agency
for SMEs in Ireland and the UK.

## Structure

- `index.html` — main page (hero, services/pricing, process, why-us, compare, sectors, contact)
- `portfolio.html` — portfolio page, reached via the Portfolio dropdown in the nav
- `styles.css` — styling
- `assets/` — logo and wordmark

## Adding a portfolio project

Find the `<section class="portfolio">` block in `portfolio.html`. Duplicate one
`.portfolio-card` element, then:

1. Replace the `.portfolio-tag` text with the sector (e.g. "Hospitality")
2. Replace the `<h3>` and `<p>` with the real project name/description
3. Swap the `.portfolio-thumb` placeholder icon for a real screenshot, e.g.
   `<img src="assets/portfolio/project-name.jpg" alt="...">` in place of the
   `<svg class="portfolio-thumb-icon">` element
4. Optionally add a matching card to the nav dropdown preview
   (`.dropdown-portfolio-grid` in the `<header>` of both `index.html` and
   `portfolio.html`)

## Running locally

Open `index.html` directly in a browser, or serve the folder with any static
file server, e.g. on Windows with no other tooling installed:

```
powershell -NoProfile -ExecutionPolicy Bypass -File serve.ps1
```

Then visit `http://localhost:8734/`.
