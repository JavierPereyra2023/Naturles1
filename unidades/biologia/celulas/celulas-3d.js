(function(){
  function initModel(model){
    const stage=model.closest('.cell-model-wrap');
    if(!stage)return;
    let rx=-7, ry=0, t=0, dragging=false, paused=false, sx=0, sy=0, baseX=0, baseY=0, frame;
    const render=()=>{model.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg)`};
    const tick=()=>{if(!dragging&&!paused){t+=16;ry=16*Math.sin(t*.0011);rx+=(-7-rx)*.02;render()} frame=requestAnimationFrame(tick)};
    const sync=()=>{t=Math.asin(Math.max(-1,Math.min(1,ry/16)))/.0011};
    model.addEventListener('pointerdown',e=>{dragging=true;sx=e.clientX;sy=e.clientY;baseX=rx;baseY=ry;model.setPointerCapture(e.pointerId)});
    model.addEventListener('pointermove',e=>{if(!dragging)return;rx=Math.max(-24,Math.min(24,baseX-(e.clientY-sy)*.18));ry=baseY+(e.clientX-sx)*.22;render()});
    model.addEventListener('pointerup',()=>{dragging=false;sync()}); model.addEventListener('pointercancel',()=>{dragging=false;sync()});
    const root=stage.parentElement;
    const reset=root.querySelector('[data-reset-model]');
    const rotate=root.querySelector('[data-rotate-toggle]');
    const isolate=root.querySelector('[data-isolate]');
    if(rotate)rotate.addEventListener('click',()=>{paused=!paused;rotate.textContent=paused?'Reanudar':'Pausar';rotate.setAttribute('aria-pressed',String(paused))});
    if(isolate)isolate.addEventListener('click',()=>{const active=model.classList.toggle('isolated');isolate.textContent=active?'Quitar énfasis':'Resaltar';isolate.setAttribute('aria-pressed',String(active))});
    if(reset)reset.addEventListener('click',()=>{rx=-7;ry=0;paused=false;model.classList.remove('isolated');if(rotate){rotate.textContent='Pausar';rotate.setAttribute('aria-pressed','false')}if(isolate){isolate.textContent='Resaltar';isolate.setAttribute('aria-pressed','false')}render()});
    render();tick();
    window.addEventListener('pagehide',()=>cancelAnimationFrame(frame),{once:true});
  }
  document.querySelectorAll('.model-actions').forEach(actions=>{
    const label=actions.querySelector('span');
    const reset=actions.querySelector('[data-reset-model]');
    if(label)label.className='model-status';
    if(!reset||actions.querySelector('.model-controls'))return;
    const controls=document.createElement('div');
    controls.className='model-controls';
    const rotate=document.createElement('button');
    rotate.className='model-button'; rotate.type='button'; rotate.dataset.rotateToggle=''; rotate.setAttribute('aria-pressed','false'); rotate.textContent='Pausar';
    const isolate=document.createElement('button');
    isolate.className='model-button'; isolate.type='button'; isolate.dataset.isolate=''; isolate.setAttribute('aria-pressed','false'); isolate.textContent='Resaltar';
    controls.append(rotate,isolate,reset); actions.append(controls);
  });
  if(document.title.startsWith('Célula procariota')){
    const photo=document.querySelector('.photo-card img');
    if(photo){photo.src='../../../assets/biologia/celulas/bacterias-microscopia.png';photo.alt='Bacterias alargadas observadas mediante microscopía de fluorescencia';}
  }
  document.querySelectorAll('[data-cell-model]').forEach(initModel);
  document.querySelectorAll('[data-tabs] button').forEach(button=>button.addEventListener('click',()=>{
    const group=button.closest('[data-tabs]'), target=button.dataset.tab;
    group.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===button));
    group.parentElement.querySelectorAll('[data-panel]').forEach(panel=>panel.hidden=panel.dataset.panel!==target);
  }));
})();
