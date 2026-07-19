(function initAutoToc() {
  'use strict';
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAutoToc, { once: true });
    return;
  }
  if (document.querySelector('[data-toc], .auto-toc')) return;

  var main = document.querySelector('main, section.relative.py-12, section.py-10, section.pb-20, section.relative.py-16');
  if (!main) {
    var firstHeading = document.querySelector('h2, h3');
    main = firstHeading && (firstHeading.closest('section, .max-w-7xl, .grid') || firstHeading.parentElement);
  }
  if (!main) return;
  var headings = Array.from(main.querySelectorAll('h2, h3')).filter(function (heading) {
    return heading.textContent.trim().length > 0;
  });
  if (!headings.length) return;

  var used = {};
  function slug(text) {
    var base = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'seccion';
    used[base] = (used[base] || 0) + 1;
    return used[base] === 1 ? base : base + '-' + used[base];
  }

  var links = headings.map(function (heading, index) {
    if (!heading.id) heading.id = slug(heading.textContent);
    return '<a href="#' + heading.id + '" class="toc-link' + (index === 0 ? ' active' : '') + '" data-toc>' +
      String(index + 1).padStart(2, '0') + '. ' + heading.textContent.trim() + '</a>';
  }).join('');

  var wrapper = document.createElement('div');
  wrapper.className = 'auto-toc-wrap max-w-7xl mx-auto px-4 md:px-6';
  wrapper.innerHTML = '<aside class="auto-toc" aria-label="Índice de contenidos"><h2 class="auto-toc-title">En esta página</h2><nav>' + links + '</nav></aside>';
  main.parentNode.insertBefore(wrapper, main);

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('.auto-toc [data-toc]').forEach(function (link) { link.classList.remove('active'); });
      var active = document.querySelector('.auto-toc a[href="#' + entry.target.id + '"]');
      if (active) active.classList.add('active');
    });
  }, { rootMargin: '-18% 0px -70% 0px' });
  headings.forEach(function (heading) { observer.observe(heading); });
}());
