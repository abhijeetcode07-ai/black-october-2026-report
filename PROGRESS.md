# Progress

**Status:** Complete — data, structure, homepage, reports, styling, AI feature and documentation are implemented.

## Done

- Phase 1: created `data/events.xml` with exactly seven ordered events, timelines, source cards, glossaries and verification notes.
- Phase 2: created ten HTML pages, shared XML loader, route manifest and README.
- Phase 3: created computed stats, category/severity filters, search, empty state and responsive timeline.
- Phase 4: created report pages, source-linked timeline references, source index, verification accordion and previous/next navigation.
- Phase 5: created the charcoal/sand/blue design system, accessible focus styles, responsive breakpoints and reduced-motion support.
- Phase 6: created the keyword tagger and TF-IDF cosine-similarity related-incident feature with visible matched keywords.
- Phase 7: created these notes and viva documentation.

## Data warnings

- The supplied PDFs record different severity scores and affected-count methods for some incidents; those differences are preserved in the relevant verification notes.
- Several source URLs are shown in the PDF as titles or partial references rather than complete printed URLs. Where the PDF supplied a complete URL, it is copied directly; where it did not, the source card uses the publisher’s canonical page inferred from the cited title.
- The Drupal research has limited quantitative detail and does not confirm an attacker or victim count.
- The eMudhra research contains a discrepancy between the official statement and an independent estimate of certificates under the affected hierarchy.
- Exact compromised-site counts were not confirmed for the UpdraftCentral incident.

## Suggestions

- Deployment to GitHub Pages is intentionally not built because it is listed as optional later in the assignment brief.
- XML validation with a DTD or XSD is intentionally not built because it is listed as optional later.

## Next step

Run the static server, inspect the homepage and one incident page at mobile and desktop widths, then save the completed project to the requested repository.
