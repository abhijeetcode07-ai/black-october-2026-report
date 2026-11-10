# Black October 2026

A static, multi-page incident atlas for BCA 107 Web Technologies. It documents seven cybersecurity incidents from supplied research PDFs using HTML5, CSS3, Bootstrap 5.3, vanilla JavaScript and XML.

## Run it locally

1. Open this folder in VS Code.
2. Start it with the Live Server extension (or run any local static HTTP server).
3. Open the local URL in a browser.

The server matters because browsers block `fetch()` when pages are opened directly with `file://`.

## Folder map

- `index.html` — computed stats, filters and the chronological timeline.
- `incidents/` — seven separate report URLs, filled from `data/events.xml`.
- `about.html` — method, classical NLP explanation and limitations.
- `sources.html` — grouped sources and combined glossary.
- `data/events.xml` — the single content source for incident facts.
- `js/` — XML loading, homepage rendering, incident rendering, source rendering and explainable AI/ML.
- `css/style.css` — custom charcoal, sand and electric-blue theme.

No backend, database, login, API key or external AI service is used.
