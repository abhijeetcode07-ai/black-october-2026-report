# TODO

- [x] **Research data:** `events.xml` is the single content source, contains exactly seven events, follows the XML field rules, sorts by `order`, includes source-linked timeline references, and preserves visible research warnings.
- [x] **Static structure:** Provide one homepage, seven separate incident URLs, About, Sources, shared CSS/JS, route manifest and documentation.
- [x] **Homepage discovery:** Compute incident count, Critical count, unique source count and date range from XML; provide category chips, severity selection, case-insensitive title/summary search, live result count, clear filters and an empty state.
- [x] **Incident reports:** Render quick facts, plain-English explanation, dated timeline, mechanics, impact, fixes, lessons, glossary, sources, verification notes, AI tags, related incidents and previous/next controls from XML.
- [x] **Traceability and safety:** Source tags jump to source cards; external links use `target="_blank"` and `rel="noopener noreferrer"`; XML failures show a visible error.
- [x] **Explainable AI:** Implement the weighted keyword tagger and TF-IDF/cosine similarity in plain browser JavaScript with no external API, model, library or key.
- [x] **Design and accessibility:** Use the required palette and fonts, semantic structure, keyboard focus states, responsive layouts from phone to desktop and reduced-motion support.
- [x] **Viva documentation:** Explain each file, XML loading, the worked TF-IDF example, the viva answers and the known limits.
- [ ] **Repository delivery:** Save and confirm the implementation in the requested GitHub repository.
