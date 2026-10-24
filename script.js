'use strict';

// CHANGE THIS BEFORE PUBLICATION to an email address where you wish to receive messages.
const CONTACT_EMAIL = 'you@example.com';

// Each category has at least two recommendations and two independent image URLs.
// The local SVG illustrations automatically appear if external photos are unavailable.
const destinations = [
  { name: 'Kelingking Beach', region: 'Nusa Penida, Indonesia', category: 'beach', country: 'indonesia', tag: 'Breathtaking coastline', description: 'A spectacular crescent beach framed by steep green cliffs and brilliant turquoise water.', photo: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&fit=crop&auto=format&q=80', fallback: 'assets/beach-1.svg' },
  { name: 'Whitehaven Beach', region: 'Whitsunday Islands, Australia', category: 'beach', country: 'australia', tag: 'White sand escape', description: 'Beautiful sweeping shores and crystal-clear waters make this a dream beach destination.', photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&fit=crop&auto=format&q=80', fallback: 'assets/beach-2.svg' },
  { name: 'Fushimi Inari Shrine', region: 'Kyoto, Japan', category: 'temple', country: 'japan', tag: 'Iconic red gates', description: 'Walk through vibrant torii gates and explore one of Kyoto’s most memorable cultural landmarks.', photo: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=1000&fit=crop&auto=format&q=80', fallback: 'assets/temple-1.svg' },
  { name: 'Angkor Wat', region: 'Siem Reap, Cambodia', category: 'temple', country: 'cambodia', tag: 'Ancient wonder', description: 'Discover the remarkable temple complex, intricate architecture, and rich heritage of Cambodia.', photo: 'https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?w=1000&fit=crop&auto=format&q=80', fallback: 'assets/temple-2.svg' },
  { name: 'Kyoto', region: 'Japan', category: 'country', country: 'japan', tag: 'Tradition & beauty', description: 'Experience peaceful gardens, traditional streets, and a wonderful blend of history and modern life.', photo: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1000&fit=crop&auto=format&q=80', fallback: 'assets/japan-1.svg' },
  { name: 'Tokyo', region: 'Japan', category: 'country', country: 'japan', tag: 'Bright city lights', description: 'Explore lively neighborhoods, inventive food, and a city that always has something new to offer.', photo: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1000&fit=crop&auto=format&q=80', fallback: 'assets/japan-2.svg' },
  { name: 'Ubud', region: 'Bali, Indonesia', category: 'country', country: 'indonesia', tag: 'Nature & culture', description: 'Find lush scenery, peaceful rice terraces, art studios, and a laid-back island atmosphere.', photo: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&fit=crop&auto=format&q=80', fallback: 'assets/indonesia-1.svg' },
  { name: 'Nusa Penida', region: 'Bali, Indonesia', category: 'country', country: 'indonesia', tag: 'Island discovery', description: 'An island adventure with scenic cliffs, ocean views, and striking natural landscapes.', photo: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1000&fit=crop&auto=format&q=80', fallback: 'assets/indonesia-2.svg' }
];

function addPhotoFallbacks(scope = document) {
  scope.querySelectorAll('img[data-fallback]').forEach((img) => {
    img.addEventListener('error', function () {
      if (this.getAttribute('src') !== this.dataset.fallback) this.src = this.dataset.fallback;
    }, { once: true });
  });
}

function matchingDestinations(rawQuery) {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return [];
  if (/^(beach|beaches|coast|coastline|sea)$/.test(q)) return destinations.filter((item) => item.category === 'beach');
  if (/^(temple|temples|shrine|shrines|culture)$/.test(q)) return destinations.filter((item) => item.category === 'temple');
  if (/^(country|countries|destination|destinations)$/.test(q)) return destinations.filter((item) => item.category === 'country');
  if (q === 'japan' || q === 'indonesia') return destinations.filter((item) => item.category === 'country' && item.country === q);
  return destinations.filter((item) => [item.name, item.region, item.category, item.country, item.tag, item.description].join(' ').toLowerCase().includes(q));
}

function showResults(rawQuery) {
  const section = document.getElementById('recommendations');
  const grid = document.getElementById('recommendationGrid');
  if (!section || !grid) return;
  const results = matchingDestinations(rawQuery);
  grid.replaceChildren();
  document.getElementById('resultsCount').textContent = results.length + (results.length === 1 ? ' PLACE FOUND' : ' PLACES FOUND');
  document.getElementById('resultsNote').textContent = results.length ? `Showing destinations for “${rawQuery.trim()}”.` : `No destinations found for “${rawQuery.trim()}”. Try beach, temple, Japan, or Indonesia.`;
  document.getElementById('resultsTitle').textContent = results.length ? 'Recommended for you' : 'Keep exploring';
  results.forEach((item) => {
    const article = document.createElement('article');
    article.className = 'recommendation-card';
    const img = document.createElement('img');
    img.src = item.photo;
    img.dataset.fallback = item.fallback;
    img.alt = `${item.name} in ${item.region}`;
    img.loading = 'lazy';
    const info = document.createElement('div');
    info.className = 'recommendation-info';
    const tag = document.createElement('p');
    tag.className = 'eyebrow';
    tag.textContent = item.tag;
    const title = document.createElement('h3');
    title.textContent = item.name;
    const place = document.createElement('p');
    place.className = 'place';
    place.textContent = '⌖ ' + item.region;
    const desc = document.createElement('p');
    desc.textContent = item.description;
    info.append(tag, title, place, desc);
    article.append(img, info);
    grid.append(article);
  });
  addPhotoFallbacks(grid);
  section.hidden = false;
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function runSearch(query) {
  const trimmed = query.trim();
  if (!trimmed) return;
  if (document.body.dataset.page !== 'home') {
    window.location.href = 'index.html?q=' + encodeURIComponent(trimmed);
    return;
  }
  document.getElementById('searchInput').value = trimmed;
  const url = new URL(window.location.href);
  url.searchParams.set('q', trimmed);
  window.history.replaceState(null, '', url.pathname + url.search);
  showResults(trimmed);
}

function initSearch() {
  const form = document.getElementById('siteSearch');
  const input = document.getElementById('searchInput');
  if (form && input) form.addEventListener('submit', (event) => { event.preventDefault(); runSearch(input.value); });
  document.querySelectorAll('[data-search]').forEach((button) => button.addEventListener('click', () => runSearch(button.dataset.search)));
  const clear = document.getElementById('clearSearch');
  if (clear) clear.addEventListener('click', () => {
    input.value = '';
    if (document.body.dataset.page === 'home') {
      document.getElementById('recommendations').hidden = true;
      const url = new URL(window.location.href);
      url.searchParams.delete('q');
      window.history.replaceState(null, '', url.pathname + url.search);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    input.focus();
  });
  if (document.body.dataset.page === 'home') {
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) { input.value = q; showResults(q); }
  }
}

function initContact() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const display = document.getElementById('contactEmailDisplay');
  if (CONTACT_EMAIL !== 'you@example.com') display.textContent = CONTACT_EMAIL;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const status = document.getElementById('formStatus');
    if (CONTACT_EMAIL === 'you@example.com') {
      status.textContent = 'Site owner: set CONTACT_EMAIL in script.js before publishing so this form can send to your inbox.';
      status.classList.add('error');
      return;
    }
    status.classList.remove('error');
    status.textContent = 'Opening your email app with the prepared message. Click Send there to finish.';
    const message = `From: ${form.elements.namedItem('name').value}\nReply email: ${form.elements.namedItem('email').value}\n\n${form.elements.namedItem('message').value}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(form.elements.namedItem('subject').value)}&body=${encodeURIComponent(message)}`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  addPhotoFallbacks();
  initSearch();
  initContact();
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
