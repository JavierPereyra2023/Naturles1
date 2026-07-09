/**
 * SIMULADOR 3D DE ECLIPSE SOLAR (Con IDs Prefijados para evitar colisiones)
 * Ciencias Naturales - 1° Año de Secundaria
 * 
 * Desarrollado de forma autocontenida como un IIFE.
 * Diseñado para ser integrado en páginas web educativas de Ciencias Naturales.
 */

(function () {
  // 1. Detección del contenedor principal
  const container = document.getElementById('solar-eclipse-simulator');
  if (!container) {
    console.error('Simulador Eclipse Solar: No se encontró el contenedor con ID "solar-eclipse-simulator".');
    return;
  }

  // 2. Inyección de la estructura HTML y estilos
  container.innerHTML = `
    <div class="relative w-full overflow-hidden rounded-xl border border-white/5 bg-[#0E1410] p-4 sm:p-6 transition-all duration-300 hover:border-blue-500/30">
      <!-- Fila superior: Título e información general -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h3 class="text-white text-lg font-bold flex items-center gap-2" style="font-family: 'Playfair Display', Georgia, serif;">
            <span class="iconify text-blue-500" data-icon="lucide:eclipse" data-width="22"></span>
            Simulador 3D de Eclipse Solar
          </h3>
          <p class="text-xs text-[#5A6B60] mt-0.5" style="font-family: 'Inter', sans-serif;">
            Observá la alineación Sol-Luna-Tierra y experimentá un eclipse total desde el espacio y la superficie terrestre.
          </p>
        </div>
        <div class="flex gap-2">
          <!-- Botón de cambio de cámara -->
          <button id="btnSolarToggleCamera" class="text-xs bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded border border-blue-500/20 font-semibold transition-all duration-200 flex items-center gap-1.5">
            <span class="iconify" data-icon="lucide:video" data-width="14"></span>
            <span id="txtSolarToggleCamera">Cambiar a Vista Terrestre</span>
          </button>
        </div>
      </div>

      <!-- El marco del simulador 3D -->
      <div class="relative w-full overflow-hidden rounded-lg bg-[#030605] border border-white/5 flex flex-col items-stretch">
        <!-- Contenedor del Canvas de Three.js -->
        <div class="relative w-full h-[440px] sm:h-[500px]">
          <!-- Pantalla de carga -->
          <div id="solarEclipseLoading" class="absolute inset-0 bg-[#020403] flex items-center justify-center text-[#5A6B60] text-xs z-10">
            <div class="flex flex-col items-center gap-2">
              <span class="iconify animate-spin text-blue-500" data-icon="lucide:loader" data-width="24"></span>
              Cargando simulador 3D...
            </div>
          </div>
          
          <!-- Canvas 3D -->
          <canvas id="solarEclipseCanvas" class="w-full h-full block cursor-grab active:cursor-grabbing" aria-label="Modelo 3D interactivo del eclipse solar"></canvas>
        </div>

        <div class="grid grid-cols-1 gap-3 bg-[#0E1410]/90 p-3 md:grid-cols-[1.2fr_.8fr]">

          <!-- Tarjeta informativa flotante (Abajo a la izquierda) -->
          <div id="solarEclipseInfoCard" class="bg-[#080C0A]/85 border border-white/5 rounded-lg p-4 space-y-3 text-xs transition-opacity duration-300">
            <div class="flex justify-between items-center border-b border-white/10 pb-2">
              <span class="font-bold text-white tracking-wide">Estado del Sistema</span>
              <span id="lblSolarEclipseState" class="px-2 py-0.5 rounded text-[9px] font-bold bg-blue-500/20 text-blue-400 uppercase">Fuera de Alineación</span>
            </div>
            
            <div class="space-y-2">
              <div class="flex justify-between text-[#A8B5AD]">
                <span>Fase Lunar:</span>
                <span id="valSolarPhaseName" class="font-bold text-white text-right">Luna Nueva</span>
              </div>
              <div class="flex justify-between text-[#A8B5AD]">
                <span>Separación Angular:</span>
                <span id="valSolarAngularSep" class="font-mono text-white text-right">0.0°</span>
              </div>
              <div class="flex justify-between text-[#A8B5AD]">
                <span>Oscurecimiento Solar:</span>
                <span id="valSolarObscuration" class="font-mono text-blue-400 font-bold text-right">0%</span>
              </div>
              <div class="flex justify-between text-[#A8B5AD]">
                <span>Sombra en la Tierra:</span>
                <span id="valSolarShadowState" class="font-mono text-white text-right">Ninguna</span>
              </div>
            </div>
          </div>

          <!-- Selector de Guías Visuales (Arriba a la derecha) -->
          <div class="bg-[#080C0A]/80 border border-white/5 rounded-lg p-3 space-y-2 text-[10px] shadow-lg">
            <span class="text-[#5A6B60] font-bold uppercase tracking-wider block text-[8px]">Visualizar guías</span>
            <label class="flex items-center gap-2 text-white cursor-pointer select-none">
              <input type="checkbox" id="chkSolarShowRays" checked class="rounded border-white/10 bg-white/5 text-blue-500 focus:ring-blue-500">
              <span>Rayos de Luz Solar</span>
            </label>
            <label class="flex items-center gap-2 text-white cursor-pointer select-none">
              <input type="checkbox" id="chkSolarShowCones" checked class="rounded border-white/10 bg-white/5 text-blue-500 focus:ring-blue-500">
              <span>Conos de Sombra (3D)</span>
            </label>
            <label class="flex items-center gap-2 text-white cursor-pointer select-none">
              <input type="checkbox" id="chkSolarShowOrbit" checked class="rounded border-white/10 bg-white/5 text-blue-500 focus:ring-blue-500">
              <span>Línea Orbital de la Luna</span>
            </label>
          </div>
        </div>

        <!-- Panel de Control inferior -->
        <div class="bg-[#0E1410]/95 border-t border-white/5 p-4 flex flex-col md:flex-row items-center gap-4 text-xs">
          <!-- Play/Pause -->
          <button id="btnSolarPlayPause" class="flex items-center justify-center p-2.5 rounded bg-blue-500 text-[#080C0A] hover:bg-blue-400 transition-colors font-bold shrink-0 gap-1.5 w-full md:w-auto" title="Pausar / Reanudar">
            <span id="iconSolarPlayPause" class="iconify" data-icon="lucide:pause" data-width="16"></span>
            <span id="txtSolarPlayPause">Pausar</span>
          </button>

          <!-- Deslizador de Fase/Ángulo -->
          <div class="flex items-center gap-3 flex-grow w-full">
            <span class="text-[#5A6B60] whitespace-nowrap font-semibold">Órbita Lunar:</span>
            <input type="range" id="sliderSolarMoonAngle" min="0" max="359" value="0" class="w-full accent-blue-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer">
            <span id="txtSolarMoonAngleVal" class="text-white font-mono whitespace-nowrap min-w-[60px] text-right">0°</span>
          </div>

          <!-- Acciones Rápidas -->
          <div class="flex gap-2 w-full md:w-auto shrink-0 justify-center md:justify-end">
            <button id="btnSolarSnapEclipse" class="bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 px-3.5 py-2 rounded transition-colors text-[11px] font-bold flex items-center gap-1.5 w-full md:w-auto justify-center">
              <span class="iconify" data-icon="lucide:target" data-width="14"></span>
              Alinear Eclipse Total
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // 3. Declaración de variables y estado interno del simulador
  const canvas = document.getElementById('solarEclipseCanvas');
  const loading = document.getElementById('solarEclipseLoading');
  
  // Elementos del DOM de control
  const btnSolarPlayPause = document.getElementById('btnSolarPlayPause');
  const iconSolarPlayPause = document.getElementById('iconSolarPlayPause');
  const txtSolarPlayPause = document.getElementById('txtSolarPlayPause');
  const sliderSolarMoonAngle = document.getElementById('sliderSolarMoonAngle');
  const txtSolarMoonAngleVal = document.getElementById('txtSolarMoonAngleVal');
  const btnSolarToggleCamera = document.getElementById('btnSolarToggleCamera');
  const txtSolarToggleCamera = document.getElementById('txtSolarToggleCamera');
  const btnSolarSnapEclipse = document.getElementById('btnSolarSnapEclipse');

  const lblSolarEclipseState = document.getElementById('lblSolarEclipseState');
  const valSolarPhaseName = document.getElementById('valSolarPhaseName');
  const valSolarAngularSep = document.getElementById('valSolarAngularSep');
  const valSolarObscuration = document.getElementById('valSolarObscuration');
  const valSolarShadowState = document.getElementById('valSolarShadowState');

  const chkSolarShowRays = document.getElementById('chkSolarShowRays');
  const chkSolarShowCones = document.getElementById('chkSolarShowCones');
  const chkSolarShowOrbit = document.getElementById('chkSolarShowOrbit');

  // Estado de la simulación
  let isPlaying = true;
  let isEarthView = false;
  let isTransitioning = false;
  
  let showRays = true;
  let showCones = true;
  let showOrbit = true;

  // Parámetros orbitales y de escala
  let moonAngle = 0; // Ángulo orbital en radianes (0 es alineación exacta)
  const sunRadius = 14;
  const earthRadius = 4.2;
  const moonRadius = 1.22; // ligeramente aumentado para cubrir bien el Sol en vista terrestre
  const moonOrbitRadius = 12;
  const tiltAngle = 5 * Math.PI / 180; // Inclinación orbital de la Luna de 5 grados

  // Posiciones globales fijadas para el simulador de alineación
  const sunPosition = new THREE.Vector3(-55, 0, 0);
  const earthPosition = new THREE.Vector3(45, 0, 0);

  // Variables de Three.js
  let scene, camera, renderer, controls;
  let sunMesh, sunGlowMesh, coronaMesh;
  let earthGroup, earthTiltGroup, earthMesh, cloudsMesh;
  let moonMesh;
  let umbraMesh, penumbraMesh;
  let moonOrbitLine;
  let raysLines = [];
  let starsPoints;
  const camTarget = new THREE.Vector3(-4, 0, 0); // Encuadra Sol, Luna y Tierra en la vista espacial.

  // 4. Generación de textura procedimental CORS-safe de ruido base
  const noiseCanvas = (function () {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const size = 32;
    const grid = new Float32Array(size * size);
    let seed = 123;
    function random() {
      let x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    }
    for (let i = 0; i < grid.length; i++) {
      grid[i] = random();
    }

    function noise(x, y) {
      const X = Math.floor(x) % size;
      const Y = Math.floor(y) % size;
      const xNext = (X + 1) % size;
      const yNext = (Y + 1) % size;

      const xf = x - Math.floor(x);
      const yf = y - Math.floor(y);

      const u = xf * xf * (3 - 2 * xf);
      const v = yf * yf * (3 - 2 * yf);

      const n00 = grid[Y * size + X];
      const n10 = grid[Y * size + xNext];
      const n01 = grid[yNext * size + X];
      const n11 = grid[yNext * size + xNext];

      const x1 = n00 + u * (n10 - n00);
      const x2 = n01 + u * (n11 - n01);
      return x1 + v * (x2 - x1);
    }

    const imgData = ctx.createImageData(512, 256);
    const data = imgData.data;
    for (let y = 0; y < 256; y++) {
      for (let x = 0; x < 512; x++) {
        let val = 0;
        let amp = 1;
        let freq = 1;
        let max = 0;
        for (let o = 0; o < 4; o++) {
          val += noise((x / 512) * size * freq, (y / 256) * size * freq) * amp;
          max += amp;
          amp *= 0.5;
          freq *= 2;
        }
        const norm = val / max;
        const idx = (y * 512 + x) * 4;
        const c = Math.floor(norm * 255);
        data[idx] = c;
        data[idx + 1] = c;
        data[idx + 2] = c;
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
    return canvas;
  })();
  const noiseTexture = new THREE.CanvasTexture(noiseCanvas);

  // 5. Creación de texturas procedimentales para los astros
  function createProceduralTexture(type) {
    const texCanvas = document.createElement('canvas');
    texCanvas.width = 512;
    texCanvas.height = 256;
    const ctx = texCanvas.getContext('2d');

    const nCtx = noiseCanvas.getContext('2d');
    const nData = nCtx.getImageData(0, 0, 512, 256).data;

    if (type === 'sun') {
      const outData = ctx.createImageData(512, 256);
      const out = outData.data;
      for (let i = 0; i < nData.length; i += 4) {
        const nVal = nData[i] / 255;
        let r = 255;
        let g = Math.floor(130 + nVal * 125);
        let b = Math.floor(nVal * 80);
        if (nVal < 0.2) {
          const factor = nVal / 0.2;
          r = Math.floor(140 + factor * 115);
          g = Math.floor(50 + factor * 80);
          b = 0;
        }
        out[i] = r;
        out[i + 1] = g;
        out[i + 2] = b;
        out[i + 3] = 255;
      }
      ctx.putImageData(outData, 0, 0);
      ctx.fillStyle = 'rgba(255, 230, 100, 0.15)';
      for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * 512, Math.random() * 256, 12 + Math.random() * 25, 0, Math.PI * 2);
        ctx.fill();
      }
    } 
    else if (type === 'earth') {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 512;
      tempCanvas.height = 256;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.fillStyle = '#000000';
      tempCtx.fillRect(0, 0, 512, 256);
      tempCtx.fillStyle = '#ffffff';

      // América
      tempCtx.beginPath();
      tempCtx.moveTo(80, 45);
      tempCtx.bezierCurveTo(100, 40, 130, 50, 140, 70);
      tempCtx.bezierCurveTo(150, 85, 140, 105, 120, 115);
      tempCtx.bezierCurveTo(115, 125, 120, 135, 135, 145);
      tempCtx.bezierCurveTo(160, 160, 175, 180, 160, 205);
      tempCtx.bezierCurveTo(150, 220, 130, 230, 120, 215);
      tempCtx.bezierCurveTo(115, 200, 110, 170, 110, 150);
      tempCtx.bezierCurveTo(100, 135, 80, 120, 70, 100);
      tempCtx.bezierCurveTo(60, 80, 70, 55, 80, 45);
      tempCtx.closePath();
      tempCtx.fill();

      // Groenlandia
      tempCtx.beginPath();
      tempCtx.moveTo(145, 25);
      tempCtx.lineTo(165, 28);
      tempCtx.lineTo(160, 45);
      tempCtx.lineTo(138, 40);
      tempCtx.closePath();
      tempCtx.fill();

      // Eurasia y África
      tempCtx.beginPath();
      tempCtx.moveTo(225, 120);
      tempCtx.bezierCurveTo(250, 115, 275, 120, 290, 135);
      tempCtx.bezierCurveTo(305, 150, 300, 180, 285, 198);
      tempCtx.bezierCurveTo(275, 210, 260, 215, 255, 205);
      tempCtx.bezierCurveTo(245, 190, 235, 165, 225, 140);
      tempCtx.bezierCurveTo(215, 110, 230, 90, 245, 80);
      tempCtx.bezierCurveTo(260, 70, 280, 60, 310, 50);
      tempCtx.bezierCurveTo(350, 40, 410, 45, 450, 50);
      tempCtx.bezierCurveTo(475, 60, 485, 80, 475, 100);
      tempCtx.bezierCurveTo(465, 115, 440, 125, 420, 120);
      tempCtx.bezierCurveTo(400, 115, 380, 105, 360, 110);
      tempCtx.bezierCurveTo(340, 115, 300, 105, 280, 95);
      tempCtx.bezierCurveTo(250, 90, 230, 95, 225, 120);
      tempCtx.closePath();
      tempCtx.fill();

      // India e Indochina
      tempCtx.beginPath();
      tempCtx.moveTo(355, 105);
      tempCtx.lineTo(370, 125);
      tempCtx.lineTo(380, 108);
      tempCtx.closePath();
      tempCtx.fill();
      tempCtx.beginPath();
      tempCtx.moveTo(395, 105);
      tempCtx.lineTo(410, 125);
      tempCtx.lineTo(415, 110);
      tempCtx.closePath();
      tempCtx.fill();

      // Australia
      tempCtx.beginPath();
      tempCtx.moveTo(415, 165);
      tempCtx.bezierCurveTo(445, 160, 460, 170, 455, 185);
      tempCtx.bezierCurveTo(445, 200, 420, 195, 412, 185);
      tempCtx.closePath();
      tempCtx.fill();

      // Antártida
      tempCtx.fillRect(0, 230, 512, 26);

      const tData = tempCtx.getImageData(0, 0, 512, 256).data;
      const outData = ctx.createImageData(512, 256);
      const out = outData.data;

      for (let y = 0; y < 256; y++) {
        for (let x = 0; x < 512; x++) {
          const idx = (y * 512 + x) * 4;
          const nVal = nData[idx] / 255;
          const px = (x + Math.floor((nVal - 0.5) * 12) + 512) % 512;
          const py = Math.max(0, Math.min(255, y + Math.floor((nVal - 0.5) * 8)));
          const pIdx = (py * 512 + px) * 4;
          const isLand = tData[pIdx] > 128;

          let r, g, b;
          if (isLand) {
            r = 34; g = 115; b = 50;
            if (nVal > 0.6) {
              r = 100; g = 78; b = 60;
            } else if (nVal > 0.52) {
              r = 135; g = 110; b = 80;
            }
            const latDist = Math.abs(y - 128);
            if (latDist > 20 && latDist < 60 && nVal < 0.45) {
              r = 205; g = 175; b = 115;
            }
          } else {
            r = 10; g = 38; b = 85;
            if (nVal > 0.45) {
              r = 15; g = 75; b = 125;
            }
          }

          const northPolar = 20 + nVal * 6;
          const southPolar = 226 - nVal * 6;
          if (y < northPolar || y > southPolar) {
            r = 245; g = 245; b = 252;
          }

          out[idx] = r;
          out[idx + 1] = g;
          out[idx + 2] = b;
          out[idx + 3] = 255;
        }
      }
      ctx.putImageData(outData, 0, 0);
    } 
    else if (type === 'earth_clouds') {
      ctx.clearRect(0, 0, 512, 256);
      const outData = ctx.createImageData(512, 256);
      const out = outData.data;
      for (let y = 0; y < 256; y++) {
        for (let x = 0; x < 512; x++) {
          const sampleX = (x + 180) % 512;
          const sampleY = (y + 80) % 256;
          const sampleIdx = (sampleY * 512 + sampleX) * 4;
          const nVal = nData[sampleIdx] / 255;
          const idx = (y * 512 + x) * 4;
          if (nVal > 0.52) {
            out[idx] = 255;
            out[idx + 1] = 255;
            out[idx + 2] = 255;
            out[idx + 3] = Math.floor((nVal - 0.52) * 2.1 * 180);
          } else {
            out[idx + 3] = 0;
          }
        }
      }
      ctx.putImageData(outData, 0, 0);
    } 
    else if (type === 'moon') {
      const outData = ctx.createImageData(512, 256);
      const out = outData.data;
      for (let i = 0; i < nData.length; i += 4) {
        const nVal = nData[i] / 255;
        const c = Math.floor(100 + nVal * 60);
        out[i] = c;
        out[i + 1] = c;
        out[i + 2] = c;
        out[i + 3] = 255;
      }
      ctx.putImageData(outData, 0, 0);
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.14)';
      for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * 512, Math.random() * 256, 4 + Math.random() * 12, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const tex = new THREE.CanvasTexture(texCanvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }

  // 6. Textura de gradiente para los conos de sombra volumétricos
  function createConeTexture(type) {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    if (type === 'umbra') {
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      grad.addColorStop(0.8, 'rgba(0, 0, 0, 0.55)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
    } else {
      grad.addColorStop(0, 'rgba(15, 18, 25, 0.3)');
      grad.addColorStop(0.6, 'rgba(15, 18, 25, 0.15)');
      grad.addColorStop(1, 'rgba(15, 18, 25, 0.0)');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 256);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }

  // 7. Textura de corona solar (resplandor circular con filamentos)
  function createCoronaTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    const cx = 256;
    const cy = 256;
    
    const grad = ctx.createRadialGradient(cx, cy, 65, cx, cy, 250);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    grad.addColorStop(0.08, 'rgba(255, 248, 220, 0.95)');
    grad.addColorStop(0.2, 'rgba(255, 200, 110, 0.7)');
    grad.addColorStop(0.5, 'rgba(255, 110, 40, 0.3)');
    grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, 256, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = 'rgba(255, 210, 140, 0.04)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 48; i++) {
      const angle = Math.random() * Math.PI * 2;
      const len = 130 + Math.random() * 100;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * len, cx + Math.sin(angle) * len);
      ctx.stroke();
    }
    
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }

  // 8. Inicialización de la escena 3D y componentes
  function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 1, 1000);
    camera.position.set(12, 34, 150);

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 250;
    controls.minDistance = 15;
    controls.target.copy(camTarget);

    // --- ILUMINACIÓN ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.04);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.copy(sunPosition);
    sunLight.castShadow = true;
    
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 15;
    sunLight.shadow.camera.far = 160;
    
    const shadowFrustum = 6;
    sunLight.shadow.camera.left = -shadowFrustum;
    sunLight.shadow.camera.right = shadowFrustum;
    sunLight.shadow.camera.top = shadowFrustum;
    sunLight.shadow.camera.bottom = -shadowFrustum;
    sunLight.shadow.bias = -0.0003;
    scene.add(sunLight);

    const lightTarget = new THREE.Object3D();
    lightTarget.position.copy(earthPosition);
    scene.add(lightTarget);
    sunLight.target = lightTarget;

    scene.userData = { sunLight, ambientLight };

    // --- FONDO DE ESTRELLAS ---
    const starsGeo = new THREE.BufferGeometry();
    const starsCount = 450;
    const starPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i += 3) {
      const r = 240 + Math.random() * 60;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2 * Math.PI;
      const phi = Math.acos(2 * v - 1);
      starPositions[i] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = r * Math.cos(phi);
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.9,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6
    });
    starsPoints = new THREE.Points(starsGeo, starsMat);
    scene.add(starsPoints);

    // --- TEXTURAS ---
    const sunTexture = createProceduralTexture('sun');
    const earthTexture = createProceduralTexture('earth');
    const cloudsTexture = createProceduralTexture('earth_clouds');
    const moonTexture = createProceduralTexture('moon');

    // --- EL SOL ---
    const sunGeo = new THREE.SphereGeometry(sunRadius, 32, 32);
    const sunMat = new THREE.MeshStandardMaterial({ map: sunTexture, emissive: 0xff8a00, emissiveMap: sunTexture, emissiveIntensity: 1.4, roughness: 0.9 });
    sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.position.copy(sunPosition);
    scene.add(sunMesh);

    const glowGeo = new THREE.SphereGeometry(sunRadius * 1.25, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xffa31a,
      transparent: true,
      opacity: 0.16,
      side: THREE.BackSide
    });
    sunGlowMesh = new THREE.Mesh(glowGeo, glowMat);
    sunGlowMesh.position.copy(sunPosition);
    scene.add(sunGlowMesh);

    const coronaGeo = new THREE.PlaneGeometry(sunRadius * 4.6, sunRadius * 4.6);
    const coronaMat = new THREE.MeshBasicMaterial({
      map: createCoronaTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      opacity: 0.45
    });
    coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    coronaMesh.position.copy(sunPosition);
    scene.add(coronaMesh);

    // --- LA TIERRA ---
    earthGroup = new THREE.Group();
    earthGroup.position.copy(earthPosition);
    scene.add(earthGroup);

    earthTiltGroup = new THREE.Group();
    earthTiltGroup.rotation.z = 23.44 * Math.PI / 180;
    earthGroup.add(earthTiltGroup);

    const earthGeo = new THREE.SphereGeometry(earthRadius, 32, 32);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      bumpMap: noiseTexture,
      bumpScale: 0.22,
      roughness: 0.75,
      metalness: 0.1
    });
    earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthMesh.receiveShadow = true;
    earthMesh.castShadow = true;
    earthTiltGroup.add(earthMesh);

    const cloudsGeo = new THREE.SphereGeometry(earthRadius * 1.018, 32, 32);
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.75,
      roughness: 0.9,
      metalness: 0.0
    });
    cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    cloudsMesh.receiveShadow = true;
    earthTiltGroup.add(cloudsMesh);

    const atmosphereMesh = new THREE.Mesh(
      new THREE.SphereGeometry(earthRadius * 1.055, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x5bbcff, transparent: true, opacity: 0.18, side: THREE.BackSide, depthWrite: false })
    );
    earthTiltGroup.add(atmosphereMesh);

    // --- LA LUNA ---
    const moonGeo = new THREE.SphereGeometry(moonRadius, 24, 24);
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTexture,
      roughness: 0.85,
      metalness: 0.05
    });
    moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.castShadow = true;
    earthGroup.add(moonMesh);

    // Texturas astronómicas reales con respaldo procedural para uso sin conexión.
    const hdTexture = new THREE.TextureLoader();
    const loadHDTexture = (url, apply) => hdTexture.load(url, tex => {
      tex.encoding = THREE.sRGBEncoding;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      apply(tex);
    }, undefined, () => {});
    loadHDTexture('https://www.solarsystemscope.com/textures/download/2k_sun.jpg', tex => { sunMat.map = tex; sunMat.emissiveMap = tex; sunMat.needsUpdate = true; });
    loadHDTexture('https://www.solarsystemscope.com/textures/download/2k_earth.jpg', tex => { earthMat.map = tex; earthMat.needsUpdate = true; });
    loadHDTexture('https://www.solarsystemscope.com/textures/download/2k_earth_clouds.jpg', tex => { cloudsMat.map = tex; cloudsMat.needsUpdate = true; });
    loadHDTexture('https://www.solarsystemscope.com/textures/download/2k_moon.jpg', tex => { moonMat.map = tex; moonMat.needsUpdate = true; });

    // --- CONOS DE SOMBRA 3D (UMBRA Y PENUMBRA) ---
    const coneHeight = 16.0;

    const umbraGeo = new THREE.CylinderGeometry(
      moonRadius * 0.95,
      0.08,
      coneHeight,
      32,
      1,
      true
    );
    umbraGeo.rotateX(Math.PI / 2);
    umbraGeo.translate(0, 0, coneHeight / 2);
    
    const umbraMat = new THREE.MeshBasicMaterial({
      map: createConeTexture('umbra'),
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
    umbraMesh = new THREE.Mesh(umbraGeo, umbraMat);
    earthGroup.add(umbraMesh);

    const penumbraGeo = new THREE.CylinderGeometry(
      moonRadius * 1.05,
      3.8,
      coneHeight,
      32,
      1,
      true
    );
    penumbraGeo.rotateX(Math.PI / 2);
    penumbraGeo.translate(0, 0, coneHeight / 2);
    
    const penumbraMat = new THREE.MeshBasicMaterial({
      map: createConeTexture('penumbra'),
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
    penumbraMesh = new THREE.Mesh(penumbraGeo, penumbraMat);
    earthGroup.add(penumbraMesh);

    // --- GUÍAS ORBITALES ---
    const moonOrbitCurve = new THREE.EllipseCurve(0, 0, moonOrbitRadius, moonOrbitRadius, 0, 2 * Math.PI, false, 0);
    const moonOrbitPoints = moonOrbitCurve.getPoints(120);
    const moonOrbitGeom = new THREE.BufferGeometry().setFromPoints(
      moonOrbitPoints.map(p => new THREE.Vector3(p.x, 0, p.y))
    );
    const moonOrbitMat = new THREE.LineBasicMaterial({ color: 0x3B82F6, transparent: true, opacity: 0.28 });
    moonOrbitLine = new THREE.Line(moonOrbitGeom, moonOrbitMat);
    moonOrbitLine.rotation.x = tiltAngle;
    earthGroup.add(moonOrbitLine);

    // --- RAYOS SOLARES ---
    setupRays();

    loading.style.display = 'none';

    animate();
  }

  function setupRays() {
    raysLines.forEach(l => scene.remove(l));
    raysLines = [];

    if (!showRays) return;

    const rayGeom = new THREE.CylinderGeometry(0.07, 0.07, 1, 8, 1, true);
    for (let i = 0; i < 3; i++) {
      const rayMat = new THREE.MeshBasicMaterial({ color: 0xffd36a, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false });
      const ray = new THREE.Mesh(rayGeom, rayMat);
      scene.add(ray);
      raysLines.push(ray);
    }
  }

  function updateRays() {
    if (!showRays || !raysLines.length) return;

    const dir = new THREE.Vector3().subVectors(earthPosition, sunPosition).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const right = new THREE.Vector3().crossVectors(up, dir).normalize();
    const realUp = new THREE.Vector3().crossVectors(dir, right).normalize();

    const offsets = [{ r: 0, u: 0 }, { r: 2.6, u: 0 }, { r: -2.6, u: 0 }];

    for (let i = 0; i < offsets.length; i++) {
      if (i >= raysLines.length) break;
      const off = offsets[i];
      const offsetVec = new THREE.Vector3()
        .addScaledVector(right, off.r)
        .addScaledVector(realUp, off.u);

      const start = sunPosition.clone().addScaledVector(dir, sunRadius).add(offsetVec);
      
      let end = earthPosition.clone().add(offsetVec);
      if (Math.abs(moonAngle) < 0.25) {
        if (i === 0) {
          end = moonMesh.position.clone().add(earthPosition);
        }
      }

      const segment = end.clone().sub(start);
      const ray = raysLines[i];
      ray.position.copy(start).addScaledVector(segment, 0.5);
      ray.scale.set(1, segment.length(), 1);
      ray.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), segment.normalize());
    }
  }

  function updateEclipseData() {
    const mx = moonMesh.position.x;
    const my = moonMesh.position.y;
    const mz = moonMesh.position.z;

    const obsX = earthPosition.x - earthRadius;
    const obsY = 0;
    const obsZ = 0;

    const vecObsToSun = new THREE.Vector3(-55 - obsX, 0 - obsY, 0 - obsZ);
    const vecObsToMoon = new THREE.Vector3((45 + mx) - obsX, my - obsY, mz - obsZ);

    const lenSun = vecObsToSun.length();
    const lenMoon = vecObsToMoon.length();

    let cosTheta = vecObsToSun.dot(vecObsToMoon) / (lenSun * lenMoon);
    cosTheta = Math.max(-1.0, Math.min(1.0, cosTheta));
    const angularSepRad = Math.acos(cosTheta);
    const angularSepDeg = angularSepRad * 180 / Math.PI;

    const R_S = Math.atan(sunRadius / lenSun);
    const R_M = Math.atan(moonRadius / lenMoon);

    let obscurationPct = 0;
    if (angularSepRad < (R_S + R_M)) {
      if (angularSepRad <= Math.abs(R_M - R_S)) {
        obscurationPct = 1.0;
      } else {
        obscurationPct = ((R_S + R_M) - angularSepRad) / (2 * R_S);
        obscurationPct = Math.max(0, Math.min(1, obscurationPct));
      }
    }

    const angleDeg = Math.round((moonAngle * 180 / Math.PI) % 360);
    txtSolarMoonAngleVal.innerText = angleDeg + "°";
    sliderSolarMoonAngle.value = angleDeg;

    valSolarAngularSep.innerText = angularSepDeg.toFixed(1) + "°";
    valSolarObscuration.innerText = Math.round(obscurationPct * 100) + "%";

    let phaseText = "Luna Nueva";
    if (angleDeg >= 355 || angleDeg <= 5) {
      phaseText = "Luna Nueva";
    } else if (angleDeg > 5 && angleDeg < 85) {
      phaseText = "Creciente Cóncava";
    } else if (angleDeg >= 85 && angleDeg <= 95) {
      phaseText = "Cuarto Creciente";
    } else if (angleDeg > 95 && angleDeg < 175) {
      phaseText = "Gibosa Creciente";
    } else if (angleDeg >= 175 && angleDeg <= 185) {
      phaseText = "Luna Llena";
    } else if (angleDeg > 185 && angleDeg < 265) {
      phaseText = "Gibosa Menguante";
    } else if (angleDeg >= 265 && angleDeg <= 275) {
      phaseText = "Cuarto Menguante";
    } else {
      phaseText = "Menguante Cóncava";
    }
    valSolarPhaseName.innerText = phaseText;

    const stateLabel = lblSolarEclipseState;
    const shadowLabel = valSolarShadowState;

    if (obscurationPct >= 0.99) {
      stateLabel.innerText = "Eclipse Total";
      stateLabel.className = "px-2 py-0.5 rounded text-[9px] font-bold bg-[#DC2626]/20 text-[#DC2626] uppercase";
      shadowLabel.innerText = "Umbra (Totalidad)";
      shadowLabel.className = "font-mono text-[#DC2626] font-bold text-right";
    } else if (obscurationPct > 0.01) {
      stateLabel.innerText = "Eclipse Parcial";
      stateLabel.className = "px-2 py-0.5 rounded text-[9px] font-bold bg-blue-500/20 text-blue-400 uppercase";
      shadowLabel.innerText = "Penumbra";
      shadowLabel.className = "font-mono text-amber-500 font-semibold text-right";
    } else {
      stateLabel.innerText = "Sin Alineación";
      stateLabel.className = "px-2 py-0.5 rounded text-[9px] font-bold bg-[#5A6B60]/20 text-[#5A6B60] uppercase";
      shadowLabel.innerText = "Ninguna";
      shadowLabel.className = "font-mono text-white text-right";
    }

    if (isEarthView) {
      const blueSkyColor = new THREE.Color(0x38BDF8);
      const darkSkyColor = new THREE.Color(0x06080c);
      const currentSkyColor = blueSkyColor.clone().lerp(darkSkyColor, obscurationPct);
      renderer.setClearColor(currentSkyColor);

      starsPoints.material.opacity = obscurationPct * 0.85;
      starsPoints.material.transparent = true;

      const { sunLight, ambientLight } = scene.userData;
      if (sunLight && ambientLight) {
        sunLight.intensity = 2.5 * (1.0 - obscurationPct * 0.98);
        ambientLight.intensity = 0.04 * (1.0 - obscurationPct * 0.85);
      }

      if (obscurationPct > 0.75) {
        const factor = (obscurationPct - 0.75) / 0.25;
        coronaMesh.material.opacity = 0.2 + factor * 0.8;
      } else {
        coronaMesh.material.opacity = obscurationPct * 0.22;
      }
    } else {
      renderer.setClearColor(0x030605);
      starsPoints.material.opacity = 0.6;
      coronaMesh.material.opacity = 0.45;

      const { sunLight, ambientLight } = scene.userData;
      if (sunLight && ambientLight) {
        sunLight.intensity = 2.5;
        ambientLight.intensity = 0.04;
      }
    }
  }

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    if (isPlaying && !isDraggingSlider()) {
      moonAngle += delta * 0.25;
      if (moonAngle >= Math.PI * 2) moonAngle = 0;
    }

    const localX = -moonOrbitRadius * Math.cos(moonAngle);
    const localY = moonOrbitRadius * Math.sin(moonAngle) * Math.sin(tiltAngle);
    const localZ = moonOrbitRadius * Math.sin(moonAngle) * Math.cos(tiltAngle);
    moonMesh.position.set(localX, localY, localZ);
    
    moonMesh.rotation.y = -moonAngle + Math.PI;

    umbraMesh.position.copy(moonMesh.position);
    umbraMesh.lookAt(0, 0, 0);

    penumbraMesh.position.copy(moonMesh.position);
    penumbraMesh.lookAt(0, 0, 0);

    umbraMesh.visible = showCones && !isEarthView;
    penumbraMesh.visible = showCones && !isEarthView;

    sunMesh.rotation.y += 0.0015;
    earthMesh.rotation.y += 0.009;
    cloudsMesh.rotation.y += 0.011;

    const glowScale = 1.0 + Math.sin(time * 2.0) * 0.025;
    sunGlowMesh.scale.set(glowScale, glowScale, glowScale);

    coronaMesh.quaternion.copy(camera.quaternion);

    updateRays();

    updateEclipseData();

    if (isTransitioning) {
      const targetCamPos = isEarthView ? 
        new THREE.Vector3(45 - earthRadius + 0.05, 0, 0) :
        new THREE.Vector3(12, 34, 150);

      const targetCamLook = isEarthView ? 
        sunPosition.clone() :
        new THREE.Vector3(-4, 0, 0);

      camera.position.lerp(targetCamPos, 0.06);
      camTarget.lerp(targetCamLook, 0.06);
      camera.lookAt(camTarget);

      controls.target.copy(camTarget);

      const targetFOV = isEarthView ? 28 : 45;
      if (Math.abs(camera.fov - targetFOV) > 0.05) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, targetFOV, 0.06);
        camera.updateProjectionMatrix();
      }

      if (camera.position.distanceTo(targetCamPos) < 0.1 && camTarget.distanceTo(targetCamLook) < 0.1) {
        isTransitioning = false;
        if (isEarthView) {
          controls.enabled = false;
        }
      }
    } else {
      if (isEarthView) {
        camera.position.set(earthPosition.x - earthRadius + 0.05, 0, 0);
        camera.lookAt(sunPosition);
      } else {
        controls.update();
      }
    }

    renderer.render(scene, camera);
  }

  function isDraggingSlider() {
    return document.activeElement === sliderSolarMoonAngle;
  }

  btnSolarPlayPause.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      iconSolarPlayPause.setAttribute('data-icon', 'lucide:pause');
      txtSolarPlayPause.innerText = "Pausar";
    } else {
      iconSolarPlayPause.setAttribute('data-icon', 'lucide:play');
      txtSolarPlayPause.innerText = "Reanudar";
    }
  });

  sliderSolarMoonAngle.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    moonAngle = (val * Math.PI) / 180;
    updateEclipseData();
  });

  btnSolarSnapEclipse.addEventListener('click', () => {
    moonAngle = 0;
    updateEclipseData();
  });

  btnSolarToggleCamera.addEventListener('click', () => {
    isEarthView = !isEarthView;
    isTransitioning = true;

    if (isEarthView) {
      txtSolarToggleCamera.innerText = "Cambiar a Vista Espacial";
      btnSolarToggleCamera.classList.add('bg-blue-500/20', 'border-blue-500/40');
    } else {
      txtSolarToggleCamera.innerText = "Cambiar a Vista Terrestre";
      btnSolarToggleCamera.classList.remove('bg-blue-500/20', 'border-blue-500/40');
      controls.enabled = true;
    }
  });

  chkSolarShowRays.addEventListener('change', (e) => {
    showRays = e.target.checked;
    setupRays();
  });

  chkSolarShowCones.addEventListener('change', (e) => {
    showCones = e.target.checked;
  });

  chkSolarShowOrbit.addEventListener('change', (e) => {
    showOrbit = e.target.checked;
    moonOrbitLine.visible = showOrbit;
  });

  window.addEventListener('resize', () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  });

  init();
})();
