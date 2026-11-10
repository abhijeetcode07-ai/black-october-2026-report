// data.js loads events.xml once and converts it into simple JavaScript objects.
let eventsPromise;
function getDataPath() {
  return (document.body.dataset.root || '') + 'data/events.xml';
}
function textOf(parent, selector, fallback = '') {
  const node = parent.querySelector(selector);
  return node ? node.textContent.trim() : fallback;
}
function listOf(parent, selector) {
  return Array.from(parent.querySelectorAll(selector)).map((node) => node.textContent.trim());
}
function eventNodeToObject(node) {
  const attacker = node.querySelector('attacker');
  return {
    id: node.getAttribute('id'),
    order: Number(node.getAttribute('order')),
    title: textOf(node, 'title'),
    shortTitle: textOf(node, 'shortTitle'),
    startDate: textOf(node, 'startDate'),
    category: textOf(node, 'category'),
    severity: textOf(node, 'severity'),
    cvss: textOf(node, 'cvss'),
    affected: textOf(node, 'affected'),
    attacker: attacker ? attacker.textContent.trim() : 'Not available',
    attackerConfidence: attacker ? attacker.getAttribute('confidence') : 'unattributed',
    cves: listOf(node, 'cves > cve'),
    status: textOf(node, 'status'),
    summary: textOf(node, 'summary'),
    whatHappened: listOf(node, 'happened > p'),
    timeline: Array.from(node.querySelectorAll('timeline > entry')).map((entry) => ({
      date: entry.getAttribute('date'),
      refs: (entry.getAttribute('refs') || '').split(',').filter(Boolean),
      text: textOf(entry, 'text'),
    })),
    howItWorked: listOf(node, 'how > p'),
    impact: listOf(node, 'impact > p'),
    fix: listOf(node, 'fix > p'),
    lessons: listOf(node, 'lessons > lesson'),
    glossary: Array.from(node.querySelectorAll('glossary > term')).map((term) => ({
      name: term.getAttribute('name'),
      definition: term.textContent.trim(),
    })),
    sources: Array.from(node.querySelectorAll('sources > source')).map((source) => ({
      id: source.getAttribute('id'),
      type: source.getAttribute('type'),
      title: textOf(source, 'title'),
      publisher: textOf(source, 'publisher'),
      url: textOf(source, 'url'),
      published: textOf(source, 'published'),
      note: textOf(source, 'note'),
    })),
    verification: listOf(node, 'verification > note'),
  };
}
async function loadEvents() {
  if (eventsPromise) return eventsPromise;
  eventsPromise = fetch(getDataPath())
    .then((response) => {
      if (!response.ok)
        throw new Error('Could not load events.xml (status ' + response.status + ')');
      return response.text();
    })
    .then((xmlText) => {
      const xmlDoc = new DOMParser().parseFromString(xmlText, 'application/xml');
      if (xmlDoc.querySelector('parsererror')) throw new Error('events.xml is not well-formed XML');
      const list = Array.from(xmlDoc.querySelectorAll('event')).map(eventNodeToObject);
      list.sort((a, b) => a.order - b.order);
      if (list.length !== 7) throw new Error('The data file should contain exactly 7 incidents.');
      return list;
    });
  return eventsPromise;
}
function formatDate(iso) {
  const parts = iso.split('-');
  if (parts.length < 3) return iso;
  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])).toLocaleDateString(
    'en-GB',
    { day: '2-digit', month: 'short', year: 'numeric' },
  );
}
function safeLink(link, label, className = '') {
  const a = document.createElement('a');
  a.href = link;
  a.textContent = label;
  a.className = className;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  return a;
}
function showError(id, error) {
  const box = document.getElementById(id);
  if (!box) return;
  box.textContent = 'The report could not be loaded. ' + error.message;
  box.classList.remove('d-none');
}
function populateIncidentMenu(events) {
  const menu = document.getElementById('incident-menu');
  if (!menu) return;
  menu.replaceChildren();
  events.forEach((event) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'dropdown-item';
    a.href = (document.body.dataset.root || '') + 'incidents/' + event.id + '.html';
    a.textContent = event.shortTitle;
    li.appendChild(a);
    menu.appendChild(li);
  });
}
