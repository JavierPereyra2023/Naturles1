(function () {
  var LIST_ID = 'spacex-launches-list';
  var CACHE_KEY = 'spacex_launches_cache_v1';
  var CACHE_TTL_MS = 60 * 60 * 1000;
  var AUTO_REFRESH_MS = 20 * 60 * 1000;
  var API_URL = 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?lsp__name=SpaceX&limit=4';
  var FETCH_TIMEOUT_MS = 8000;
  var lastFetchAt = 0;

  var STATUS_STYLES = {
    go: { bg: 'bg-natura-leaf/15', text: 'text-natura-leaf' },
    hold: { bg: 'bg-natura-silverDark/20', text: 'text-natura-silverDark' },
    tbd: { bg: 'bg-natura-silverDark/20', text: 'text-natura-silverDark' },
    fail: { bg: 'bg-natura-bio/15', text: 'text-natura-bio' },
    default: { bg: 'bg-natura-energy/15', text: 'text-natura-energy' }
  };

  function safeString(value, maxLen) {
    if (typeof value !== 'string') return null;
    var trimmed = value.trim();
    if (!trimmed) return null;
    return trimmed.length > maxLen ? trimmed.slice(0, maxLen - 1) + '…' : trimmed;
  }

  function formatDate(iso) {
    if (typeof iso !== 'string') return null;
    var d = new Date(iso);
    if (isNaN(d.getTime())) return null;
    try {
      return new Intl.DateTimeFormat('es-AR', {
        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
      }).format(d);
    } catch (e) {
      return d.toISOString();
    }
  }

  function statusStyle(statusName) {
    var key = (safeString(statusName, 40) || '').toLowerCase();
    if (key.indexOf('go') === 0 || key.indexOf('success') !== -1) return STATUS_STYLES.go;
    if (key.indexOf('hold') !== -1) return STATUS_STYLES.hold;
    if (key.indexOf('tbd') !== -1 || key.indexOf('to be') !== -1) return STATUS_STYLES.tbd;
    if (key.indexOf('fail') !== -1) return STATUS_STYLES.fail;
    return STATUS_STYLES.default;
  }

  function el(tag, className) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    return e;
  }

  function iconSpan(icon, width) {
    var s = document.createElement('span');
    s.className = 'iconify flex-shrink-0';
    s.setAttribute('data-icon', icon);
    s.setAttribute('data-width', String(width));
    return s;
  }

  function buildCard(launch) {
    var name = safeString(launch && launch.name, 90);
    if (!name) return null;

    var rocketName = safeString(launch && launch.rocket && launch.rocket.configuration && launch.rocket.configuration.name, 60) || 'SpaceX';
    var padName = safeString(launch && launch.pad && launch.pad.name, 70);
    var locationName = safeString(launch && launch.pad && launch.pad.location && launch.pad.location.name, 70);
    var dateLabel = formatDate(launch && launch.net);
    var statusName = safeString(launch && launch.status && launch.status.name, 40) || 'Por confirmar';
    var style = statusStyle(statusName);

    var card = el('div', 'content-card bg-natura-gray rounded-2xl p-5 flex flex-col gap-3');

    var badgeRow = el('div', 'flex items-center justify-between gap-2 flex-wrap');
    var rocketBadge = el('span', 'text-[9px] font-bold uppercase tracking-wider bg-natura-energy/15 text-natura-energy px-2.5 py-1 rounded-full');
    rocketBadge.textContent = rocketName;
    var statusBadge = el('span', 'text-[9px] font-bold uppercase tracking-wider ' + style.bg + ' ' + style.text + ' px-2.5 py-1 rounded-full');
    statusBadge.textContent = statusName;
    badgeRow.appendChild(rocketBadge);
    badgeRow.appendChild(statusBadge);

    var title = el('h3', 'font-heading font-bold text-sm text-white leading-snug');
    title.textContent = name;

    var dateEl = el('p', 'text-xs text-natura-silver flex items-center gap-1.5');
    dateEl.appendChild(iconSpan('lucide:calendar', 13));
    var dateText = document.createElement('span');
    dateText.textContent = dateLabel || 'Fecha a confirmar';
    dateEl.appendChild(dateText);

    card.appendChild(badgeRow);
    card.appendChild(title);
    card.appendChild(dateEl);

    if (padName || locationName) {
      var siteEl = el('p', 'text-xs text-natura-silverDark flex items-center gap-1.5');
      siteEl.appendChild(iconSpan('lucide:map-pin', 13));
      var siteText = document.createElement('span');
      siteText.textContent = [padName, locationName].filter(Boolean).join(', ');
      siteEl.appendChild(siteText);
      card.appendChild(siteEl);
    }

    return card;
  }

  function renderError(list) {
    while (list.firstChild) list.removeChild(list.firstChild);
    var wrap = el('div', 'col-span-full text-center py-6');
    var msg = el('p', 'text-sm text-natura-silverDark mb-1');
    msg.textContent = 'No pudimos cargar los próximos lanzamientos ahora mismo.';
    var sub = el('p', 'text-xs text-natura-silverDark');
    sub.textContent = 'Podés ver el calendario oficial con el botón de abajo.';
    wrap.appendChild(msg);
    wrap.appendChild(sub);
    list.appendChild(wrap);
  }

  function renderLaunches(list, launches) {
    var cards = (Array.isArray(launches) ? launches : [])
      .map(buildCard)
      .filter(Boolean)
      .slice(0, 4);

    while (list.firstChild) list.removeChild(list.firstChild);

    if (!cards.length) {
      renderError(list);
      return;
    }
    cards.forEach(function (card) { list.appendChild(card); });
  }

  function readCache() {
    try {
      var raw = window.localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed.timestamp !== 'number' || !Array.isArray(parsed.launches)) return null;
      if (Date.now() - parsed.timestamp > CACHE_TTL_MS) return null;
      return parsed.launches;
    } catch (e) {
      return null;
    }
  }

  function writeCache(launches) {
    try {
      window.localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), launches: launches }));
    } catch (e) {
      // localStorage unavailable/full: not critical, skip caching silently.
    }
  }

  function fetchLaunches() {
    var controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
    var timeoutId = controller ? setTimeout(function () { controller.abort(); }, FETCH_TIMEOUT_MS) : null;

    return fetch(API_URL, { method: 'GET', signal: controller ? controller.signal : undefined })
      .then(function (res) {
        if (timeoutId) clearTimeout(timeoutId);
        if (!res.ok) throw new Error('bad status ' + res.status);
        return res.json();
      })
      .then(function (data) {
        if (!data || !Array.isArray(data.results)) throw new Error('unexpected payload');
        return data.results;
      });
  }

  function refresh(list, isInitial) {
    fetchLaunches()
      .then(function (launches) {
        lastFetchAt = Date.now();
        writeCache(launches);
        renderLaunches(list, launches);
      })
      .catch(function () {
        // On a background refresh, keep whatever is already on screen instead of
        // wiping good data over a transient network hiccup. Only the very first
        // load falls back to the error state.
        if (isInitial) renderError(list);
      });
  }

  function startAutoRefresh(list) {
    setInterval(function () {
      if (document.visibilityState === 'visible') refresh(list, false);
    }, AUTO_REFRESH_MS);

    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible' && Date.now() - lastFetchAt > AUTO_REFRESH_MS) {
        refresh(list, false);
      }
    });
  }

  function init() {
    var list = document.getElementById(LIST_ID);
    if (!list) return;

    var cached = readCache();
    if (cached) {
      lastFetchAt = Date.now();
      renderLaunches(list, cached);
    } else {
      refresh(list, true);
    }

    startAutoRefresh(list);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
