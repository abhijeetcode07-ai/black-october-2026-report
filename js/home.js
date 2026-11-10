// home.js renders the homepage statistics, filters and vertical timeline.
let allEvents = [];
let selectedCategory = '';
function makeBadge(label, className = '') {
  const span = document.createElement('span');
  span.className = 'bo-badge ' + className;
  span.textContent = label;
  return span;
}
function renderStats(events) {
  const stats = document.getElementById('stats');
  const uniqueSources = new Set(
    events.flatMap((event) => event.sources.map((source) => source.url)),
  ).size;
  const critical = events.filter((event) => event.severity === 'Critical').length;
  const dates = events.map((event) => event.startDate).sort();
  const values = [
    [String(events.length).padStart(2, '0'), 'incidents'],
    [String(critical).padStart(2, '0'), 'critical severity'],
    [String(uniqueSources).padStart(2, '0'), 'unique sources'],
    [dates[0].slice(8) + '—' + dates[dates.length - 1].slice(8), 'start-date span'],
  ];
  values.forEach(([value, label]) => {
    const col = document.createElement('div');
    col.className = 'col-6 col-lg-3';
    const card = document.createElement('div');
    card.className = 'stat-card';
    const num = document.createElement('strong');
    num.textContent = value;
    const text = document.createElement('span');
    text.textContent = label;
    card.append(num, text);
    col.appendChild(card);
    stats.appendChild(col);
  });
}
function renderFilters(events) {
  const wrap = document.getElementById('category-filters');
  const categories = [...new Set(events.map((event) => event.category))];
  const all = document.createElement('button');
  all.type = 'button';
  all.className = 'filter-chip active';
  all.dataset.category = '';
  all.textContent = 'All';
  wrap.appendChild(all);
  categories.forEach((category) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter-chip';
    button.dataset.category = category;
    button.textContent = category;
    wrap.appendChild(button);
  });
  wrap.addEventListener('click', (event) => {
    if (!event.target.matches('.filter-chip')) return;
    selectedCategory = event.target.dataset.category;
    wrap
      .querySelectorAll('.filter-chip')
      .forEach((chip) => chip.classList.toggle('active', chip === event.target));
    applyFilters();
  });
}
function renderTimeline(events) {
  const list = document.getElementById('timeline-list');
  list.replaceChildren();
  events.forEach((event, index) => {
    const item = document.createElement('article');
    item.className = 'timeline-item ' + (index % 2 ? 'timeline-right' : 'timeline-left');
    const dot = document.createElement('span');
    dot.className = 'timeline-dot';
    dot.setAttribute('aria-hidden', 'true');
    const date = document.createElement('div');
    date.className = 'date-chip';
    date.textContent = formatDate(event.startDate);
    const card = document.createElement('div');
    card.className = 'timeline-card';
    card.tabIndex = 0;
    const top = document.createElement('div');
    top.className = 'card-topline';
    const number = document.createElement('span');
    number.className = 'mono-label';
    number.textContent = '0' + event.order;
    const badges = document.createElement('div');
    badges.className = 'badge-row';
    badges.append(
      makeBadge(event.category, 'category-badge'),
      makeBadge(event.severity, 'severity-' + event.severity.toLowerCase()),
    );
    top.append(number, badges);
    const h3 = document.createElement('h3');
    h3.textContent = event.title;
    const p = document.createElement('p');
    p.textContent = event.summary;
    const ai = document.createElement('div');
    ai.className = 'ai-tags';
    const aiLabel = document.createElement('span');
    aiLabel.textContent = 'AI-suggested';
    ai.appendChild(aiLabel);
    suggestTags(event).forEach((tag) => {
      const tagBadge = makeBadge(tag.tag, 'ai-badge');
      tagBadge.title =
        'Matched keywords: ' +
        tag.matched.map((match) => match.word + ' ×' + match.count).join(', ');
      ai.appendChild(tagBadge);
    });
    const link = document.createElement('a');
    link.className = 'report-link';
    link.href = 'incidents/' + event.id + '.html';
    link.textContent = 'Read the full report ';
    const arrow = document.createElement('span');
    arrow.textContent = '→';
    link.appendChild(arrow);
    card.append(top, h3, p, ai, link);
    item.append(dot, date, card);
    list.appendChild(item);
  });
  document.getElementById('result-count').textContent =
    'Showing ' + events.length + ' of ' + allEvents.length + ' incidents';
  document.getElementById('empty-state').classList.toggle('d-none', events.length !== 0);
}
function applyFilters() {
  const query = document.getElementById('incident-search').value.trim().toLowerCase();
  const severity = document.getElementById('severity-filter').value;
  const filtered = allEvents.filter(
    (event) =>
      (!selectedCategory || event.category === selectedCategory) &&
      (!severity || event.severity === severity) &&
      (!query ||
        event.title.toLowerCase().includes(query) ||
        event.summary.toLowerCase().includes(query)),
  );
  renderTimeline(filtered);
}
loadEvents()
  .then((events) => {
    allEvents = events;
    populateIncidentMenu(events);
    renderStats(events);
    renderFilters(events);
    renderTimeline(events);
    document.getElementById('severity-filter').addEventListener('change', applyFilters);
    document.getElementById('incident-search').addEventListener('input', applyFilters);
    document.getElementById('clear-filters').addEventListener('click', () => {
      selectedCategory = '';
      document.getElementById('severity-filter').value = '';
      document.getElementById('incident-search').value = '';
      document
        .querySelectorAll('.filter-chip')
        .forEach((chip) => chip.classList.toggle('active', chip.dataset.category === ''));
      applyFilters();
    });
  })
  .catch((error) => showError('home-error', error));
