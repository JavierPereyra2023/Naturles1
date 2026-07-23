(function () {
  const units = window.QUIZ_UNITS || [];
  const key = 'naturales1.quiz.progreso.v1';
  const pass = 60;
  const prize = 90;
  const totalPoints = units.length * 100;
  const requiredPoints = Math.ceil(totalPoints * 0.7);

  const read = () => {
    try {
      return JSON.parse(localStorage.getItem(key) || '{"student":{},"units":{}}');
    } catch {
      return { student: {}, units: {} };
    }
  };
  const save = (data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {}
  };

  const area = {
    quimica: { name: 'Química', color: '#22C55E' },
    fisica: { name: 'Física', color: '#3B82F6' },
    biologia: { name: 'Biología', color: '#DC2626' }
  };

  const diffLabel = ['Inicial', 'Intermedio', 'Desafío'];
  const questionMeta = (u, i, q) => ({
    topic: (q && q.topic) || (u.topics && u.topics[i % u.topics.length]) || 'Conceptos centrales',
    difficulty: diffLabel[Math.min((q && q.difficulty != null ? q.difficulty : i % 3), 2)]
  });

  const score = () => {
    const d = read();
    return units.reduce((t, u) => t + (d.units[u.id]?.best || 0), 0);
  };
  const completed = () => {
    const d = read();
    return units.filter((u) => (d.units[u.id]?.best || 0) >= pass).length;
  };
  const resetScores = () => {
    const d = read();
    d.units = {};
    delete d.lastResult;
    save(d);
    return d;
  };
  const aggregateStats = () => {
    const d = read();
    const stats = {};
    units.forEach((u) => {
      const unit = d.units[u.id];
      Object.entries(unit?.stats || {}).forEach(([topic, v]) => {
        stats[topic] ??= { correct: 0, total: 0 };
        stats[topic].correct += v.correct || 0;
        stats[topic].total += v.total || 0;
      });
    });
    return stats;
  };

  const ensureStudent = () => {
    const d = read();
    if (d.student?.name) return d.student;
    const name = (prompt('Escribí tu nombre para guardar tu progreso y diplomas:') || '').trim();
    if (!name) return d.student || {};
    const course = (prompt('Curso (ej: 1°4):') || '').trim();
    d.student = { name, course };
    save(d);
    return d.student;
  };

  window.QuizProgress = {
    read,
    save,
    units,
    pass,
    prize,
    totalPoints,
    requiredPoints,
    area,
    score,
    completed,
    resetScores,
    aggregateStats,
    questionMeta,
    ensureStudent,
    achievement: () => null
  };

  window.renderQuizCards = function (target) {
    const d = read();
    target.innerHTML = Object.keys(area)
      .map(
        (a) =>
          `<h3 class="quiz-area" id="${a}">${area[a].name}</h3>` +
          units
            .filter((u) => u.area === a)
            .map((u) => {
              const p = d.units[u.id]?.best || 0;
              const level = p >= prize ? 'Premio' : p >= pass ? 'Aprobada' : 'Pendiente';
              return `<a href="quiz.html?unidad=${u.id}" class="quiz-card" style="--area:${area[u.area].color}"><span class="iconify" data-icon="${u.icon}"></span><div><small>${area[u.area].name} · ${level}</small><h3>${u.title}</h3><p>${p ? `Mejor: ${Math.round(p)} pts · ${d.units[u.id]?.attempts || 0} intentos` : `${u.questions.length} preguntas · 100 pts`}</p></div><b>${p >= pass ? '✓' : '→'}</b></a>`;
            })
            .join('')
      )
      .join('');
  };

  const esc = (value) =>
    String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const achievement = (points) =>
    points >= 100
      ? { label: 'Estrella · Platino · 100%', color: '#e5e7eb' }
      : points >= 90
        ? { label: 'Sol · Oro · 90–99%', color: '#fbbf24' }
        : points >= 80
          ? { label: 'Tierra · Plata · 80–89%', color: '#cbd5e1' }
          : { label: 'Luna · Bronce · 60–79%', color: '#d97706' };

  window.diplomaSVG = function (name, course, title, points) {
    const final = String(title || '').startsWith('Diploma final');
    const average = final ? Math.round(points / Math.max(units.length, 1)) : Math.round(points);
    const a = achievement(average);
    const heading = final ? 'CERTIFICADO FINAL' : 'CERTIFICADO DE UNIDAD';
    const detail = final
      ? 'Completó los desafíos de Ciencias Naturales'
      : `Finalizó la unidad: ${esc(title)}`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="850" viewBox="0 0 1200 850">
      <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0b211b"/><stop offset="1" stop-color="#07100d"/></linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <rect width="1200" height="850" fill="url(#bg)"/>
      <rect x="32" y="32" width="1136" height="786" rx="10" fill="none" stroke="#2dd4bf" stroke-width="3"/>
      <g transform="translate(600 130)"><circle r="52" fill="#123c31" stroke="${a.color}" stroke-width="6" filter="url(#glow)"/><path d="M0-28l8 18 20 2-15 14 4 20-17-10-17 10 4-20-15-14 20-2z" fill="${a.color}"/></g>
      <text x="600" y="230" text-anchor="middle" fill="#5eead4" font-family="Georgia" font-size="34" letter-spacing="3">${heading}</text>
      <text x="600" y="290" text-anchor="middle" fill="#c8d4cc" font-family="Arial" font-size="22">Ciencias Naturales · 1° Año</text>
      <text x="600" y="360" text-anchor="middle" fill="#c8d4cc" font-family="Arial" font-size="24">Se reconoce a</text>
      <text x="600" y="430" text-anchor="middle" fill="white" font-family="Georgia" font-style="italic" font-size="52">${esc(name)}</text>
      <text x="600" y="490" text-anchor="middle" fill="#c8d4cc" font-family="Arial" font-size="22">Curso: ${esc(course) || '—'}</text>
      <text x="600" y="550" text-anchor="middle" fill="#ffffff" font-family="Georgia" font-size="26">${detail}</text>
      <text x="600" y="600" text-anchor="middle" fill="#c8d4cc" font-family="Arial" font-size="22">Puntaje: ${average}% · ${a.label}</text>
      <text x="600" y="680" text-anchor="middle" fill="#5eead4" font-family="Arial" font-size="20">Prof. Javier Pereyra · ${new Date().toLocaleDateString('es-AR')}</text>
      <text x="600" y="740" text-anchor="middle" fill="#91a79b" font-family="Arial" font-size="14">Escala: Luna 60–79% · Tierra 80–89% · Sol 90–99% · Estrella 100%</text>
    </svg>`;
  };

  window.QuizProgress.achievement = achievement;

  function diplomaToPDF(svgContent, filename) {
    if (typeof html2pdf === 'undefined') {
      alert('Error al cargar el generador de PDF. Recargá la página e intentá de nuevo.');
      return;
    }
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.left = '-9999px';
    div.style.top = '0';
    div.style.width = '1200px';
    div.style.height = '850px';
    div.style.backgroundColor = '#080C0A';
    div.innerHTML = svgContent;
    document.body.appendChild(div);
    html2pdf()
      .set({
        margin: 0,
        filename: filename + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#080C0A', logging: false },
        jsPDF: { unit: 'px', format: [1200, 850], orientation: 'landscape' }
      })
      .from(div)
      .save()
      .then(function () { if (div.parentNode) div.parentNode.removeChild(div); })
      .catch(function () { if (div.parentNode) div.parentNode.removeChild(div); alert('No se pudo generar el PDF. Intentá de nuevo.'); });
  }

  window.QuizProgress.printUnitDiploma = function (unit, points) {
    const d = read();
    let name = d.student?.name || '';
    if (!name) {
      const s = ensureStudent();
      name = s.name || '';
    }
    if (!name) return;
    const course = d.student?.course || '';
    diplomaToPDF(diplomaSVG(name, course, unit.title, points), 'Diploma - ' + unit.title);
  };

  window.QuizProgress.printFinalDiploma = function () {
    const d = read();
    let name = d.student?.name || '';
    if (!name) {
      const s = ensureStudent();
      name = s.name || '';
    }
    if (!name) return;
    const course = d.student?.course || '';
    diplomaToPDF(diplomaSVG(name, course, 'Diploma final', score()), 'Diploma final - Ciencias Naturales');
  };

  function initDashboard() {
    const box = document.getElementById('progreso');
    if (!box) return;
    const topicsTitle = document.querySelector('#temas h2');
    const topicsLead = document.querySelector('#temas h2 + p');
    const topicsEyebrow = topicsTitle?.previousElementSibling;
    if (topicsEyebrow) topicsEyebrow.textContent = 'Antes del desafío';
    if (topicsTitle) topicsTitle.textContent = 'Repasá los temas antes del desafío.';
    if (topicsLead)
      topicsLead.textContent =
        'Volvé a las unidades, revisá los contenidos y preparate para resolver los quizzes con más seguridad.';
    document.querySelectorAll('.subject-visual').forEach((card, i) => {
      const destinations = [
        '../unidades/quimica/index.html',
        '../unidades/fisica/index.html',
        '../unidades/biologia/index.html'
      ];
      if (destinations[i]) card.href = destinations[i];
    });
    const choose = document.querySelector('a[href="#temas"]');
    if (choose && !document.getElementById('hero-progress-link')) {
      const link = document.createElement('a');
      link.id = 'hero-progress-link';
      link.href = 'progreso.html';
      link.className =
        'quiz-button mt-8 ml-0 sm:ml-2 inline-flex items-center gap-3 rounded-sm border border-teal-300/40 bg-teal-300/10 px-6 py-4 text-xs font-extrabold uppercase tracking-[.16em] text-teal-200 transition-all duration-200 hover:bg-teal-300/20';
      link.innerHTML =
        '<span class="iconify" data-icon="lucide:chart-line" data-width="18"></span> Ver mi progreso';
      choose.parentNode.append(link);
    }
    const actionRow = box.querySelector('.flex.flex-wrap.items-start');
    if (actionRow && !document.getElementById('reset-progress')) {
      const b = document.createElement('button');
      b.id = 'reset-progress';
      b.className =
        'rounded-sm border border-red-300/30 px-4 py-3 text-xs font-bold uppercase tracking-wider text-red-200 hover:bg-red-300/10';
      b.textContent = 'Borrar puntajes';
      b.onclick = () => {
        if (
          confirm(
            'Se borrarán los puntajes e intentos, pero se conservarán tu nombre y curso. ¿Continuar?'
          )
        ) {
          resetScores();
          location.reload();
        }
      };
      actionRow.append(b);
    }
    const d = read();
    const saved = units.filter((u) => d.units[u.id]?.lastResult);
    let links = document.getElementById('saved-analysis-links');
    if (!links) {
      links = document.createElement('div');
      links.id = 'saved-analysis-links';
      links.className = 'mt-7 border-t border-white/10 pt-6';
      box.append(links);
    }
    links.innerHTML = saved.length
      ? `<p class="text-[11px] font-bold uppercase tracking-[.2em] text-teal-300">Consultar respuestas guardadas</p><div class="mt-3 flex flex-wrap gap-2">${saved
          .map(
            (u) =>
              `<a href="resultado.html?unidad=${encodeURIComponent(u.id)}" class="rounded-sm border border-teal-300/25 bg-teal-300/5 px-4 py-3 text-xs font-bold text-teal-200 hover:bg-teal-300/10">${u.title} · Ver análisis</a>`
          )
          .join('')}</div>`
      : '';
  }

  document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    const finalButton = document.getElementById('diploma');
    if (finalButton) finalButton.onclick = () => QuizProgress.printFinalDiploma();
  });
})();
