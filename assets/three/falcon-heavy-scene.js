import * as THREE from 'three';

const COLOR_ACTIVE = 0x3b82f6;
const COLOR_INACTIVE = 0x5a6b60;

const STEPS = ['fairing', 'stage2', 'boosters', 'centerCore', 'engines', 'recovery'];

// Radio de cada nucleo (3,7 m reales) y separacion lateral, en unidades locales.
// Base = 0, punta de la cofia ~= 14.5, igual escala que la escena del Falcon 9.
const R = 0.52;
const SIDE_X = 1.1;
const CORES_X = [-SIDE_X, 0, SIDE_X];

// [radius, y] waypoints de camara por paso
const CAMERA_WAYPOINTS = [
  { radius: 9.5, y: 13.2 },
  { radius: 9.0, y: 10.4 },
  { radius: 11.0, y: 8.4 },
  { radius: 10.5, y: 4.5 },
  { radius: 7.5, y: 0.8 },
  { radius: 12.5, y: 4.0 },
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

function buildFairing() {
  const group = new THREE.Group();
  const nose = lineMesh(new THREE.ConeGeometry(0.58, 2.1, 14));
  nose.position.y = 13.45;
  const body = lineMesh(new THREE.CylinderGeometry(0.58, 0.5, 1.6, 14));
  body.position.y = 11.6;
  group.add(nose, body);
  group.userData.id = 'fairing';
  return group;
}

function buildStage2() {
  const group = new THREE.Group();
  const tank = lineMesh(new THREE.CylinderGeometry(0.5, 0.5, 2.4, 14));
  tank.position.y = 9.6;
  const nozzle = lineMesh(new THREE.ConeGeometry(0.16, 0.35, 10, 1, true));
  nozzle.rotation.x = Math.PI;
  nozzle.position.y = 8.25;
  group.add(tank, nozzle);
  group.userData.id = 'stage2';
  return group;
}

// Los dos nucleos laterales: tanque igual al del Falcon 9 pero rematado en punta
function buildBoosters() {
  const group = new THREE.Group();
  [-SIDE_X, SIDE_X].forEach((x) => {
    const tank = lineMesh(new THREE.CylinderGeometry(R, R, 6.9, 14));
    tank.position.set(x, 4.0, 0);
    const nose = lineMesh(new THREE.ConeGeometry(R, 1.7, 14));
    nose.position.set(x, 8.3, 0);
    group.add(tank, nose);
  });
  group.userData.id = 'boosters';
  return group;
}

function buildCenterCore() {
  const group = new THREE.Group();
  const interstage = lineMesh(new THREE.CylinderGeometry(0.5, 0.52, 0.9, 14));
  interstage.position.y = 7.95;
  const tank = lineMesh(new THREE.CylinderGeometry(R, R, 6.9, 14));
  tank.position.y = 4.0;
  group.add(interstage, tank);

  // Anclajes que sujetan los nucleos laterales al central
  [-SIDE_X, SIDE_X].forEach((x) => {
    [1.2, 7.0].forEach((y) => {
      const clamp = lineMesh(new THREE.BoxGeometry(Math.abs(x) - R * 2, 0.16, 0.16));
      clamp.position.set(x / 2, y, 0);
      group.add(clamp);
    });
  });
  group.userData.id = 'centerCore';
  return group;
}

// 27 Merlin 1D: 9 por nucleo, 1 central + anillo de 8
function buildEngines() {
  const group = new THREE.Group();
  const nozzleGeo = new THREE.ConeGeometry(0.14, 0.55, 10, 1, true);
  const ring = 0.34;
  CORES_X.forEach((cx) => {
    const positions = [[0, 0]];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      positions.push([Math.cos(a) * ring, Math.sin(a) * ring]);
    }
    positions.forEach(([x, z]) => {
      const nozzle = lineMesh(nozzleGeo);
      nozzle.rotation.x = Math.PI;
      nozzle.position.set(cx + x, 0.28, z);
      group.add(nozzle);
    });
  });
  group.userData.id = 'engines';
  return group;
}

// Aletas de rejilla y patas: los tres nucleos vuelven y aterrizan
function buildRecovery() {
  const group = new THREE.Group();
  const finGeo = new THREE.BoxGeometry(0.9, 0.55, 0.04);
  const legGeo = new THREE.BoxGeometry(0.07, 2.3, 0.07);

  CORES_X.forEach((cx) => {
    const finY = cx === 0 ? 7.15 : 7.25;
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const r = 0.75;

      const fin = lineMesh(finGeo);
      fin.position.set(cx + Math.cos(angle) * r, finY, Math.sin(angle) * r);
      fin.rotation.y = angle;
      fin.rotation.z = Math.PI / 2;

      const leg = lineMesh(legGeo);
      leg.position.set(cx + Math.cos(angle) * r, 0.55, Math.sin(angle) * r);
      leg.rotation.z = Math.cos(angle) * 0.55;
      leg.rotation.x = -Math.sin(angle) * 0.55;

      group.add(fin, leg);
    }
  });
  group.userData.id = 'recovery';
  return group;
}

function buildRocket() {
  const rocket = new THREE.Group();
  const parts = {};
  [buildFairing(), buildStage2(), buildBoosters(), buildCenterCore(), buildEngines(), buildRecovery()].forEach((g) => {
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
  const fallback = wrap.querySelector('[data-falconheavy-fallback]');
  const canvasHost = wrap.querySelector('[data-falconheavy-canvas-host]');
  if (fallback) fallback.style.display = 'block';
  if (canvasHost) canvasHost.style.display = 'none';
}

function init() {
  const wrap = document.getElementById('falconheavy-wrap');
  if (!wrap) return;
  const canvas = document.getElementById('falconheavy-canvas');
  const canvasHost = wrap.querySelector('[data-falconheavy-canvas-host]');
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
