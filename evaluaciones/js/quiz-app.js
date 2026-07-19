(function(){
  const units=window.QUIZ_UNITS||[];
  const key='naturales1.quiz.progreso.v1';
  const pass=60;
  const totalPoints=units.length*100;
  const requiredPoints=Math.ceil(totalPoints*.7);
  const read=()=>{
    try { return JSON.parse(localStorage.getItem(key)||'{"student":{},"units":{}}'); }
    catch { return {student:{},units:{}}; }
  };
  const save=data=>localStorage.setItem(key,JSON.stringify(data));
  const area={quimica:{name:'Química',color:'#22C55E'},fisica:{name:'Física',color:'#3B82F6'},biologia:{name:'Biología',color:'#DC2626'}};
  const score=()=>{const d=read();return units.reduce((t,u)=>t+(d.units[u.id]?.best||0),0)};
  const completed=()=>{const d=read();return units.filter(u=>(d.units[u.id]?.best||0)>=pass).length};
  window.QuizProgress={read,save,units,pass,totalPoints,requiredPoints,area,score,completed};
  window.renderQuizCards=function(target){
    const d=read();
    target.innerHTML=Object.keys(area).map(a=>`<h3 class="quiz-area" id="${a}">${area[a].name}</h3>`+units.filter(u=>u.area===a).map(u=>{
      const p=d.units[u.id]?.best||0;
      return `<a href="quiz.html?unidad=${u.id}" class="quiz-card" style="--area:${area[u.area].color}"><span class="iconify" data-icon="${u.icon}"></span><div><small>${area[u.area].name}</small><h3>${u.title}</h3><p>${p?`Mejor resultado: ${Math.round(p)} puntos`:`${u.questions.length} preguntas · 100 puntos`}</p></div><b>${p>=pass?'✓':'→'}</b></a>`
    }).join('')).join('');
  };
  window.diplomaSVG=function(name,course){
    const safe=value=>String(value||'').replace(/[<&>"']/g,'');
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="850" viewBox="0 0 1200 850"><rect width="1200" height="850" fill="#08110e"/><rect x="32" y="32" width="1136" height="786" rx="8" fill="none" stroke="#2dd4bf" stroke-width="3"/><text x="600" y="185" text-anchor="middle" fill="#5eead4" font-family="Georgia" font-size="42">CIENCIAS NATURALES · 1° AÑO</text><text x="600" y="285" text-anchor="middle" fill="white" font-family="Georgia" font-size="78">Diploma de logro</text><text x="600" y="375" text-anchor="middle" fill="#c8d4cc" font-family="Arial" font-size="28">Se reconoce a</text><text x="600" y="455" text-anchor="middle" fill="#5eead4" font-family="Georgia" font-style="italic" font-size="60">${safe(name)}</text><text x="600" y="510" text-anchor="middle" fill="#c8d4cc" font-family="Arial" font-size="26">Curso: ${safe(course)||'—'}</text><text x="600" y="570" text-anchor="middle" fill="#c8d4cc" font-family="Arial" font-size="28">por completar los desafíos de Ciencias Naturales</text><text x="600" y="620" text-anchor="middle" fill="#c8d4cc" font-family="Arial" font-size="24">Puntaje acumulado: ${Math.round(score())} / ${totalPoints}</text><text x="600" y="715" text-anchor="middle" fill="#5eead4" font-family="Arial" font-size="23">Prof. Javier Pereyra · ${new Date().toLocaleDateString('es-AR')}</text></svg>`;
  };
})();
