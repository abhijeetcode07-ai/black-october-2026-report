# Viva notes

## How the files connect

- `index.html` is the homepage shell. `home.js` loads the seven events and draws the stats, filters and timeline.
- `about.html` explains the method and the limits of the small AI feature.
- `sources.html` is a shell; `sources-page.js` builds grouped source cards and the combined glossary from XML.
- Each file in `incidents/` has the same semantic shell. Its `data-event-id` tells `incident.js` which XML event to render.
- `data/events.xml` is the single source of incident content. If its text changes, the pages change after reload.
- `data.js` fetches and parses XML once. Other scripts use its plain JavaScript objects. XML text is placed into the page with `textContent`, not unsafe HTML injection.
- `style.css` contains the design system, responsive layout, focus states and reduced-motion rule.
- `ai.js` has no fetch call and no external library. It receives events from `data.js`.

## How XML is loaded

The page first fetches `data/events.xml` through a local server. `DOMParser` converts the text into an XML document. `eventNodeToObject()` reads each element into a JavaScript object, then sorts objects by the XML `order` attribute. If the request fails or XML is malformed, the page shows a visible error box.

## The AI/ML feature

The tagger tokenizes report text, removes stopwords, applies tiny stemming, and counts weighted keywords. A tag is shown when its score reaches the threshold. The matched words are visible in a tooltip, so the suggestion is explainable.

TF-IDF means term frequency–inverse document frequency. A word scores higher when it appears often in one report but appears in fewer reports overall. Cosine similarity compares the TF-IDF vectors and returns a rough percentage for the three closest reports.

### Tiny worked example

A: “attacker stole token from vendor”
B: “attacker abused vendor token to enter customers”
C: “researcher found weak certificate keys”

After stopwords are removed, A and B share `attacker`, `vendor` and `token`; C shares none with them. Cosine similarity therefore calls A and B related, while C is not related to either.

## Viva questions

1. **What AI/ML did you use?** Classical NLP: a keyword-scoring tagger and TF-IDF with cosine similarity.
2. **Is it really machine learning?** TF-IDF is a standard text-representation method used in information retrieval and ML pipelines. There is no neural network or training step.
3. **What is TF-IDF?** A word score that is reduced when the word appears in every report.
4. **What is cosine similarity?** A number from 0 to 1 showing similarity between two word-score vectors.
5. **Why no chatbot or API?** A browser site should not expose a secret API key, and a small explainable method is easier to defend in a viva.
6. **How do you know the tags are right?** They are suggestions, not truth. The matched keywords are shown and the research category stays separate.
7. **What are the limits?** Only seven documents, word-based comparison and a hand-made keyword list.
8. **How could it improve?** Add more incidents, better stemming and a learned keyword list.
