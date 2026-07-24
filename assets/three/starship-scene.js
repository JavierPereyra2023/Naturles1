import * as THREE from 'three';

const COLOR_ACTIVE = 0x38bdf8;
const COLOR_INACTIVE = 0x5a6b60;

const STEPS = ['nose', 'flaps', 'shipTanks', 'shipEngines', 'booster', 'boosterEngines'];

// Radio del cuerpo (9 m reales) en unidades locales. Base = 0, punta ~= 15.4
const R = 0.78;

// [radius, y] waypoints de camara por paso, en unidades locales del cohete
const CAMERA_WAYPOINTS = [
  { radius: 6.0, y: 14.3 },
  { radius: 7.0, y: 12.3 },
  { radius: 7.5, y: 11.2 },
  { radius: 5.2, y: 9.3 },
  { radius: 11.0, y: 4.6 },
  { radius: 5.5, y: 0.7 },
];

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

function lineMesh(geometry) {
  const edges = new THREE.EdgesGeometry(geometry, 1);
  const material = new THREE.LineBasicMaterial({ color: COLOR_INACTIVE, transparent: true, opacity: 0.9 });
  material.userData.target = new THREE.Color(COLOR_INACTIVE);
  return new THREE.LineSegments(edges, material);
}

// Panel plano que sobresale radialmente del cuerpo (aletas y grid fins)
function panel(width, height, angle, y, thickness) {
  const mesh = lineMesh(new THREE.BoxGeometry(width, height, thickness || 0.06));
  const r = R + width / 2;
  mesh.position.set(Math.cos(angle) * r, y, Math.sin(angle) * r);
  mesh.rotation.y = -angle;
  return mesh;
}

function buildNose() {
  const group = new THREE.Group();
  const cone = lineMesh(new THREE.ConeGeometry(R, 2.0, 16));
  cone.position.y = 14.4;
  // Compuerta de la bahia de carga
  const hatch = lineMesh(new THREE.BoxGeometry(0.05, 1.0, 0.9));
  hatch.position.set(R * 0.82, 13.9, 0);
  group.add(cone, hatch);
  group.userData.id = 'nose';
  return group;
}

function buildFlaps() {
  const group = new THREE.Group();
  // Dos aletas delanteras, arriba
  group.add(panel(0.9, 1.3, 0, 12.6));
  group.add(panel(0.9, 1.3, Math.PI, 12.6));
  // Dos aletas traseras, mas grandes
  group.add(panel(1.15, 1.7, 0, 10.1, 0.08));
  group.add(panel(1.15, 1.7, Math.PI, 10.1, 0.08));
  group.userData.id = 'flaps';
  return group;
}

function buildShipTanks() {
  const group = new THREE.Group();
  const body = lineMesh(new THREE.CylinderGeometry(R, R, 3.85, 16));
  body.position.y = 11.48;
  // Mampara comun entre el tanque de metano y el de oxigeno liquido
  const bulkhead = lineMesh(new THREE.CylinderGeometry(R * 0.99, R * 0.99, 0.04, 16));
  bulkhead.position.y = 11.4;
  group.add(body, bulkhead);
  group.userData.id = 'shipTanks';
  return group;
}

function buildShipEngines() {
  const group = new THREE.Group();
  const skirt = lineMesh(new THREE.CylinderGeometry(R, R, 0.5, 16));
  skirt.position.y = 9.3;
  group.add(skirt);

  // 3 Raptor de nivel del mar (interiores) + 3 Raptor Vacuum (exteriores)
  const sea = new THREE.ConeGeometry(0.1, 0.34, 10, 1, true);
  const vac = new THREE.ConeGeometry(0.17, 0.46, 12, 1, true);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const n1 = lineMesh(sea);
    n1.rotation.x = Math.PI;
    n1.position.set(Math.cos(a) * 0.22, 8.88, Math.sin(a) * 0.22);
    const n2 = lineMesh(vac);
    n2.rotation.x = Math.PI;
    n2.position.set(Math.cos(a + Math.PI / 3) * 0.5, 8.82, Math.sin(a + Math.PI / 3) * 0.5);
    group.add(n1, n2);
  }
  group.userData.id = 'shipEngines';
  return group;
}

function buildBooster() {
  const group = new THREE.Group();
  const tank = lineMesh(new THREE.CylinderGeometry(R, R, 8.1, 16));
  tank.position.y = 4.5;
  // Anillo de hot-staging: deja escapar los gases al encender la nave todavia acoplada
  const hotStage = lineMesh(new THREE.CylinderGeometry(R, R * 1.02, 0.45, 16));
  hotStage.position.y = 8.78;
  group.add(tank, hotStage);

  // 4 aletas de rejilla cerca de la punta del propulsor
  for (let i = 0; i < 4; i++) {
    group.add(panel(0.75, 0.55, (i / 4) * Math.PI * 2 + Math.PI / 4, 8.1, 0.05));
  }
  // 2 pivotes de captura que apoyan sobre los brazos de la torre
  for (let i = 0; i < 2; i++) {
    const pin = lineMesh(new THREE.BoxGeometry(0.3, 0.14, 0.14));
    const a = i * Math.PI;
    pin.position.set(Math.cos(a) * (R + 0.12), 7.72, Math.sin(a) * (R + 0.12));
    pin.rotation.y = -a;
    group.add(pin);
  }
  group.userData.id = 'booster';
  return group;
}

function buildBoosterEngines() {
  const group = new THREE.Group();
  const nozzle = new THREE.ConeGeometry(0.085, 0.32, 8, 1, true);
  // 33 Raptor: 3 centrales (con gimbal) + anillo de 10 + anillo externo de 20
  const rings = [[3, 0.14], [10, 0.4], [20, 0.66]];
  rings.forEach(([count, ring]) => {
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const n = lineMesh(nozzle);
      n.rotation.x = Math.PI;
      n.position.set(Math.cos(a) * ring, 0.29, Math.sin(a) * ring);
      group.add(n);
    }
  });
  group.userData.id = 'boosterEngines';
  return group;
}

function buildRocket() {
  const rocket = new THREE.Group();
  const parts = {};
  [buildNose(), buildFlaps(), buildShipTanks(), buildShipEngines(), buildBooster(), buildBoosterEngines()].forEach((g) => {
    rocket.add(g);
    parts[g.userData.id] = parts[g.userData.id] ? parts[g.userData.id].concat([g]) : [g];
  });
  return { rocket, parts };
}

function setStepColors(parts, activeId) {
  Object.keys(parts).forEach((id) => {
    const color = id === activeId ? COLOR_ACTIVE : COLOR_INACTIVE;
    parts[id].forEach((group) => {
      group.traverse((obj) => {
        if (obj.material && obj.material.userData) {
          obj.material.userData.target.set(color);
        }
      });
    });
  });
}

function showFallback(wrap) {
  const fallback = wrap.querySelector('[data-starship-fallback]');
  const canvasHost = wrap.querySelector('[data-starship-canvas-host]');
  if (fallback) fallback.style.display = 'block';
  if (canvasHost) canvasHost.style.display = 'none';
}

function init() {
  const wrap = document.getElementById('starship-wrap');
  if (!wrap) return;
  const canvas = document.getElementById('starship-canvas');
  const canvasHost = wrap.querySelector('[data-starship-canvas-host]');
  const stepEls = Array.from(wrap.querySelectorAll('[data-step-index]'));

  if (!canvas || !canvasHost || !supportsWebGL()) {
    showFallback(wrap);
    return;
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (e) {
    showFallback(wrap);
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  const { rocket, parts } = buildRocket();
  scene.add(rocket);

  let lastActiveId = null;
  let desiredCam = { radius: CAMERA_WAYPOINTS[0].radius, y: CAMERA_WAYPOINTS[0].y };
  let desiredLookY = CAMERA_WAYPOINTS[0].y;
  let curRadius = desiredCam.radius;
  let curLookY = desiredLookY;
  camera.position.set(desiredCam.radius * 0.7, desiredCam.y, desiredCam.radius * 0.7);

  function resize() {
    const w = canvasHost.clientWidth;
    const h = canvasHost.clientHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  function progressFromScroll() {
    const rect = wrap.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    if (total <= 0) return 0;
    return Math.min(1, Math.max(0, -rect.top / total));
  }

  function updateFromProgress(progress) {
    const segCount = CAMERA_WAYPOINTS.length - 1;
    const scaled = progress * segCount;
    const idx = Math.min(segCount - 1, Math.floor(scaled));
    const frac = scaled - idx;
    const a = CAMERA_WAYPOINTS[idx];
    const b = CAMERA_WAYPOINTS[idx + 1];
    desiredCam = {
      radius: a.radius + (b.radius - a.radius) * frac,
      y: a.y + (b.y - a.y) * frac,
    };
    desiredLookY = desiredCam.y;

    const stepIndex = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
    const activeId = STEPS[stepIndex];
    if (activeId !== lastActiveId) {
      lastActiveId = activeId;
      setStepColors(parts, activeId);
      stepEls.forEach((el) => {
        el.classList.toggle('active', Number(el.dataset.stepIndex) === stepIndex);
      });
    }
  }

  let isVisible = false;
  let rafId = null;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isVisible = entry.isIntersecting;
      if (isVisible && rafId === null) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(animate);
      } else if (!isVisible && rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    });
  }, { threshold: 0.01 });
  observer.observe(wrap);

  let lastTime = performance.now();
  function animate(now) {
    rafId = requestAnimationFrame(animate);
    const delta = Math.min(0.1, (now - lastTime) / 1000);
    lastTime = now;

    updateFromProgress(progressFromScroll());

    rocket.rotation.y += delta * 0.15;

    const k = 1 - Math.exp(-4 * delta);
    curRadius += (desiredCam.radius - curRadius) * k;
    curLookY += (desiredLookY - curLookY) * k;
    const newY = camera.position.y + (desiredCam.y - camera.position.y) * k;

    camera.position.set(curRadius * 0.7, newY, curRadius * 0.7);
    camera.lookAt(0, curLookY, 0);

    scene.traverse((obj) => {
      if (obj.material && obj.material.userData && obj.material.userData.target) {
        obj.material.color.lerp(obj.material.userData.target, 0.12);
      }
    });

    renderer.render(scene, camera);
  }

  updateFromProgress(0);
  setStepColors(parts, STEPS[0]);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
