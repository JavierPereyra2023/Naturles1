/**
 * Simulador 3D de Eclipse Lunar
 * 
 * Desarrollado para Ciencias Naturales - 1° Año de Secundaria.
 * Encapsulado en un IIFE autoejecutable y autocontenido.
 * 
 * Este script:
 * 1. Comprueba e inyecta dinámicamente las dependencias requeridas (Three.js, OrbitControls, Tailwind, Iconify) si no están presentes.
 * 2. Inyecta la interfaz de controles y el contenedor del canvas en el elemento `#lunar-eclipse-simulator` (o crea uno si no existe).
 * 3. Crea texturas procedimentales 100% seguras de CORS usando canvas con ruido para el Sol, la Tierra (con continentes y nubes) y la Luna.
 * 4. Modela la física geométrica exacta del eclipse (conos de umbra y penumbra en 3D semitransparentes con gradiente de desvanecimiento).
 * 5. Controla matemáticamente la iluminación de la Luna transicionando en tiempo real a rojo cobrizo ("Luna de Sangre") al entrar en la umbra.
 * 6. Permite cambiar entre la "Vista Espacial" y la "Vista Telescopio" enfocado en la Luna (cámara seguidora interactiva con OrbitControls).
 * 7. Incluye sliders para ajustar el ángulo orbital, la inclinación de la órbita (mostrando por qué no hay eclipses todos los meses) y botones de presets.
 */

(function() {
  // 1. Detección del contenedor para inyección de la interfaz
  let container = document.getElementById('lunar-eclipse-simulator');
  if (!container) {
    // Si no se encuentra, buscar en el flujo de la página o crear uno temporal al final
    container = document.createElement('div');
    container.id = 'lunar-eclipse-simulator';
    container.className = 'max-w-7xl mx-auto px-4 md:px-6 py-6';
    document.body.appendChild(container);
  }

  // Cargar scripts requeridos de forma secuencial
  function loadScript(src, cb) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = cb;
    script.onerror = function() {
      console.error('Error al cargar la dependencia: ' + src);
    };
    document.head.appendChild(script);
  }

  // Iniciar carga de dependencias si faltan
  const needsThree = typeof THREE === 'undefined';
  const needsOrbit = needsThree || typeof THREE.OrbitControls === 'undefined';
  const needsTailwind = typeof tailwind === 'undefined';
  const needsIconify = typeof Iconify === 'undefined';

  function checkTailwind() {
    if (needsTailwind) {
      loadScript('https://cdn.tailwindcss.com', checkIconify);
    } else {
      checkIconify();
    }
  }

  function checkIconify() {
    if (needsIconify) {
      loadScript('https://code.iconify.design/3/3.1.0/iconify.min.js', startSimulator);
    } else {
      startSimulator();
    }
  }

  if (needsThree) {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', function() {
      loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js', checkTailwind);
    });
  } else if (needsOrbit) {
    loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js', checkTailwind);
  } else {
    checkTailwind();
  }

  // 2. Lógica del Simulador una vez cargadas las dependencias
  function startSimulator() {
    // Definición de fuentes si no están agregadas
    if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    // Inyectar HTML de la Interfaz
    container.innerHTML = `
      <div class="my-8 overflow-hidden rounded-xl border border-white/5 bg-[#0E1410] p-6 transition-all duration-300 hover:border-blue-500/30 relative select-none">
        
        <!-- Cabecera -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 class="font-heading text-xl font-bold text-white flex items-center gap-2" style="font-family: 'Playfair Display', Georgia, serif;">
              <span class="iconify text-blue-500" data-icon="lucide:eclipse" data-width="24"></span>
              Simulador 3D de Eclipse Lunar
            </h3>
            <p class="text-xs text-[#5A6B60] mt-0.5" style="font-family: 'Inter', sans-serif;">
              Estudiá cómo la alineación Sol-Tierra-Luna proyecta la sombra terrestre y genera la "Luna de sangre" al entrar en la umbra.
            </p>
          </div>
          
          <div class="flex gap-2">
            <!-- Selector de Cámara -->
            <button id="eclipseCamSpaceBtn" class="text-xs bg-blue-500 text-[#080C0A] px-3 py-1.5 rounded border border-blue-500 font-sans font-semibold transition-all duration-200 flex items-center gap-1.5">
              <span class="iconify" data-icon="lucide:globe" data-width="14"></span>
              <span>Vista Espacial</span>
            </button>
            <button id="eclipseCamTelescopeBtn" class="text-xs bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded border border-white/10 font-sans font-semibold transition-all duration-200 flex items-center gap-1.5">
              <span class="iconify" data-icon="lucide:search" data-width="14"></span>
              <span>Vista Telescopio</span>
            </button>
          </div>
        </div>

        <!-- Contenedor Principal del Canvas -->
        <div class="relative w-full overflow-hidden rounded-lg bg-[#030605] border border-white/5 flex flex-col items-stretch">
          <div class="relative w-full h-[500px]">
            <!-- Spinner de carga -->
            <div id="lunarEclipseLoading" class="absolute inset-0 bg-[#020403] flex items-center justify-center text-[#5A6B60] text-xs z-10 font-sans">
              <div class="flex flex-col items-center gap-2">
                <span class="iconify animate-spin text-blue-500" data-icon="lucide:loader" data-width="24"></span>
                Generando texturas y escena 3D...
              </div>
            </div>
            
            <!-- Canvas de Three.js -->
            <canvas id="eclipse3DCanvas" class="w-full h-full block cursor-grab active:cursor-grabbing" aria-label="Modelo 3D interactivo del eclipse lunar"></canvas>
          </div>

          <div class="grid grid-cols-1 gap-3 bg-[#0E1410]/90 p-3 md:grid-cols-[1.2fr_.8fr]">
            
            <!-- Panel Informativo Lateral Izquierdo (Dinámico) -->
            <div class="bg-[#080C0A]/85 border border-white/5 rounded-lg p-4 font-sans space-y-3 text-xs shadow-lg">
              <div class="flex justify-between items-center border-b border-white/10 pb-2">
                <span id="eclipseStateTitle" class="font-bold text-white tracking-wide text-sm">Alineación Orbital</span>
                <span id="eclipseStateBadge" class="px-2.5 py-0.5 rounded text-[9px] font-bold bg-[#5A6B60]/20 text-[#A8B5AD] uppercase">Luna Llena</span>
              </div>
              
              <p id="eclipseStateDesc" class="text-[#A8B5AD] text-xs leading-relaxed">
                La Luna está fuera del cono de sombra de la Tierra. Vemos su cara completamente iluminada por la luz solar directa (Luna Llena).
              </p>
              
              <div class="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                <div class="space-y-0.5">
                  <span class="text-[#5A6B60] text-[9px] uppercase font-bold tracking-wider block">Luz Directa</span>
                  <span id="txtLuzDirecta" class="text-white font-mono font-semibold text-sm">100%</span>
                </div>
                <div class="space-y-0.5 border-l border-white/10 pl-3">
                  <span class="text-[#5A6B60] text-[9px] uppercase font-bold tracking-wider block">Luz Refractada (Roja)</span>
                  <span id="txtLuzRefractada" class="text-[#5A6B60] font-mono text-sm">0%</span>
                </div>
              </div>
            </div>

            <!-- Panel de Guías Visuales Superior Derecho -->
            <div class="bg-[#080C0A]/80 border border-white/5 rounded-lg p-3 font-sans space-y-2 text-[10px] shadow-lg">
              <span class="text-[#5A6B60] font-bold uppercase tracking-wider block text-[8px]">Visualizar guías</span>
              <label class="flex items-center gap-2 text-white cursor-pointer select-none">
                <input type="checkbox" id="chkEclipseShowShadows" checked class="rounded border-white/10 bg-white/5 text-blue-500 focus:ring-blue-500">
                <span>Conos de Sombra (3D)</span>
              </label>
              <label class="flex items-center gap-2 text-white cursor-pointer select-none">
                <input type="checkbox" id="chkEclipseShowRays" checked class="rounded border-white/10 bg-white/5 text-blue-500 focus:ring-blue-500">
                <span>Rayos de Luz Solar</span>
              </label>
              <label class="flex items-center gap-2 text-white cursor-pointer select-none">
                <input type="checkbox" id="chkEclipseShowOrbit" checked class="rounded border-white/10 bg-white/5 text-blue-500 focus:ring-blue-500">
                <span>Órbita de la Luna</span>
              </label>
              <label class="flex items-center gap-2 text-white cursor-pointer select-none">
                <input type="checkbox" id="chkEclipseShowLabels" checked class="rounded border-white/10 bg-white/5 text-blue-500 focus:ring-blue-500">
                <span>Etiquetas de Texto</span>
              </label>
            </div>
          </div>

          <!-- Panel de Controles y Timeline Inferior -->
          <div class="bg-[#0E1410]/95 border-t border-white/5 p-4 flex flex-col lg:flex-row items-center gap-4 text-xs font-sans">
            <!-- Play/Pause -->
            <button id="btnEclipsePlayPause" class="flex items-center justify-center px-4 py-2 rounded bg-blue-500 text-[#080C0A] hover:bg-blue-400 transition-colors font-bold shrink-0 gap-1.5 w-full lg:w-auto" title="Pausar / Reanudar">
              <span id="iconEclipsePlayPause" class="iconify" data-icon="lucide:pause" data-width="16"></span>
              <span id="txtEclipsePlayPause">Pausar</span>
            </button>

            <!-- Slider de Posición Orbital -->
            <div class="flex items-center gap-3 flex-grow w-full">
              <span class="text-[#A8B5AD] whitespace-nowrap">Posición Lunar:</span>
              <input type="range" id="sliderEclipsePos" min="0" max="359" value="0" class="w-full accent-blue-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer">
              <span id="txtEclipsePosVal" class="text-white font-mono whitespace-nowrap min-w-[36px] text-right">0°</span>
            </div>

            <!-- Slider de Inclinación de la Órbita -->
            <div class="flex items-center gap-3 flex-grow w-full lg:max-w-xs">
              <span class="text-[#A8B5AD] whitespace-nowrap">Inclinación Órbita:</span>
              <input type="range" id="sliderEclipseIncl" min="0" max="8" step="0.5" value="0" class="w-full accent-blue-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer">
              <span id="txtEclipseInclVal" class="text-white font-mono whitespace-nowrap min-w-[28px] text-right">0°</span>
            </div>

            <!-- Ajustes rápidos -->
            <div class="flex gap-1.5 shrink-0 justify-end w-full lg:w-auto">
              <button id="btnLunarPresetTotal" class="bg-blue-500/20 border border-blue-500/30 text-blue-400 px-3 py-2 rounded hover:bg-blue-500/30 transition-colors text-[10px] font-semibold w-full lg:w-auto">Alineación (0°)</button>
              <button id="btnLunarPresetReal" class="bg-white/5 hover:bg-white/10 text-white px-3 py-2 border border-white/10 rounded transition-colors text-[10px] font-semibold w-full lg:w-auto">Órbita Real (5.1°)</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // 3. Inicialización de Variables de la Escena
    const canvas = document.getElementById('eclipse3DCanvas');
    const loadingEl = document.getElementById('lunarEclipseLoading');
    const containerCanvas = canvas.parentElement;

    let isPlaying = true;
    let showShadows = true;
    let showRays = true;
    let showOrbit = true;
    let showLabels = true;
    let currentCameraView = 'space'; // 'space' o 'telescope'
    let isTransitioning = false;
    
    let orbitAngle = 0; // Ángulo orbital en radianes (mapeado de 0 a 359 en slider)
    let inclinationDeg = 0; // Inclinación en grados

    // Dimensiones físicas escaladas para visualización interactiva
    const sunRadius = 22;
    const earthRadius = 6.0;
    const moonRadius = 1.6;
    const orbitRadius = 32;
    const sunDistance = 120; // Distancia Sol-Tierra
    
    // Puntos de los límites de sombra
    const umbraApexX = (earthRadius * sunDistance) / (sunRadius - earthRadius); // 45.0
    const penumbraApexX = (earthRadius * sunDistance) / (sunRadius + earthRadius); // 25.71

    let scene, camera, renderer, controls;
    let sunMesh, sunGlowMesh, earthGroup, earthMesh, cloudsMesh, moonMesh, orbitGroup;
    let umbraCone, penumbraCone, shadowConesGroup;
    let raysGroup = [];
    let labelsGroup = [];

    // --- GENERACIÓN DE RUIDO PROCEDIMENTAL PARA TEXTURAS CORS-SAFE ---
    const noiseCanvas = (function() {
      const cv = document.createElement('canvas');
      cv.width = 512;
      cv.height = 256;
      const ctx = cv.getContext('2d');
      
      const size = 32;
      const grid = new Float32Array(size * size);
      let seed = 42;
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
          data[idx+1] = c;
          data[idx+2] = c;
          data[idx+3] = 255;
        }
      }
      ctx.putImageData(imgData, 0, 0);
      return cv;
    })();

    const noiseTexture = new THREE.CanvasTexture(noiseCanvas);

    // --- FUNCIÓN PARA CREAR TEXTURAS PROCEDIMENTALES ---
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
          let b = Math.floor(nVal * 60);
          if (nVal < 0.15) {
            const factor = nVal / 0.15;
            r = Math.floor(140 + factor * 115);
            g = Math.floor(30 + factor * 100);
            b = 0;
          }
          out[i] = r;
          out[i+1] = g;
          out[i+2] = b;
          out[i+3] = 255;
        }
        ctx.putImageData(outData, 0, 0);
        
        // Agregar llamaradas/manchas solares orgánicas
        ctx.fillStyle = 'rgba(255, 230, 100, 0.1)';
        for (let i = 0; i < 12; i++) {
          ctx.beginPath();
          ctx.arc(Math.random()*512, Math.random()*256, 12 + Math.random()*25, 0, Math.PI*2);
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
        
        // Dibujar continentes simplificados en proyección equirrectangular
        // América del Norte y del Sur
        tempCtx.beginPath();
        tempCtx.moveTo(80, 45);
        tempCtx.bezierCurveTo(105, 42, 132, 50, 138, 70);
        tempCtx.bezierCurveTo(148, 88, 138, 108, 118, 118);
        tempCtx.bezierCurveTo(112, 126, 118, 138, 132, 148);
        tempCtx.bezierCurveTo(158, 162, 172, 185, 158, 208);
        tempCtx.bezierCurveTo(148, 222, 128, 232, 118, 218);
        tempCtx.bezierCurveTo(112, 202, 108, 172, 108, 152);
        tempCtx.bezierCurveTo(98, 138, 78, 122, 68, 102);
        tempCtx.bezierCurveTo(58, 82, 68, 58, 78, 48);
        tempCtx.closePath();
        tempCtx.fill();
        
        // Groenlandia
        tempCtx.beginPath();
        tempCtx.moveTo(145, 25);
        tempCtx.lineTo(168, 28);
        tempCtx.lineTo(162, 48);
        tempCtx.lineTo(138, 42);
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
        
        // India y Sudeste Asiático
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
            
            // Ondulación de costas usando ruido
            const px = (x + Math.floor((nVal - 0.5) * 12) + 512) % 512;
            const py = Math.max(0, Math.min(255, y + Math.floor((nVal - 0.5) * 8)));
            const pIdx = (py * 512 + px) * 4;
            const isLand = tData[pIdx] > 128;
            
            let r, g, b;
            if (isLand) {
              r = 34; g = 115; b = 50; // Bosque base
              if (nVal > 0.6) {
                r = 95; g = 72; b = 52; // Montañas altas
              } else if (nVal > 0.52) {
                r = 130; g = 105; b = 75; // Zonas secas / colinas
              }
              const latDist = Math.abs(y - 128);
              if (latDist > 20 && latDist < 60 && nVal < 0.45) {
                r = 205; g = 175; b = 115; // Desiertos subtropicales
              }
            } else {
              r = 8; g = 32; b = 75; // Océano profundo
              if (nVal > 0.45) {
                r = 12; g = 62; b = 115; // Océano superficial
              }
            }
            
            // Polos nevados
            const northPolar = 18 + nVal * 7;
            const southPolar = 228 - nVal * 7;
            if (y < northPolar || y > southPolar) {
              r = 245; g = 245; b = 252;
            }
            
            out[idx] = r;
            out[idx+1] = g;
            out[idx+2] = b;
            out[idx+3] = 255;
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
            const sampleX = (x + 150) % 512;
            const sampleY = (y + 60) % 256;
            const sampleIdx = (sampleY * 512 + sampleX) * 4;
            const nVal = nData[sampleIdx] / 255;
            const idx = (y * 512 + x) * 4;
            if (nVal > 0.54) {
              out[idx] = 255;
              out[idx+1] = 255;
              out[idx+2] = 255;
              out[idx+3] = Math.floor((nVal - 0.54) * 2.1 * 185);
            } else {
              out[idx+3] = 0;
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
          // Superficie grisácea regolítica con cráteres
          const c = Math.floor(125 + nVal * 65);
          out[i] = c;
          out[i+1] = c;
          out[i+2] = c;
          out[i+3] = 255;
        }
        ctx.putImageData(outData, 0, 0);
        
        // Agregar "mares" lunares oscuros y cráteres definidos
        ctx.fillStyle = 'rgba(25, 25, 25, 0.16)';
        for (let i = 0; i < 18; i++) {
          ctx.beginPath();
          ctx.arc(Math.random()*512, Math.random()*256, 6 + Math.random()*20, 0, Math.PI*2);
          ctx.fill();
        }
        
        // Destellos de cráteres de impacto con rayos
        ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
        for (let i = 0; i < 8; i++) {
          ctx.beginPath();
          ctx.arc(Math.random()*512, Math.random()*256, 3 + Math.random()*4, 0, Math.PI*2);
          ctx.fill();
        }
      }
      
      const tex = new THREE.CanvasTexture(texCanvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      return tex;
    }

    // --- AUXILIAR: GENERAR GRADIENTE DE COLOR PARA LOS CONOS DE SOMBRA ---
    function createConeGradientTexture(colorStr, baseOpacity, tipOpacity) {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      
      // Crear gradiente lineal de abajo (base) hacia arriba (punta del cono)
      const grad = ctx.createLinearGradient(0, 256, 0, 0);
      grad.addColorStop(0, `rgba(${colorStr}, ${baseOpacity})`);
      grad.addColorStop(0.7, `rgba(${colorStr}, ${baseOpacity * 0.4})`);
      grad.addColorStop(1, `rgba(${colorStr}, ${tipOpacity})`);
      
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1, 256);
      
      const tex = new THREE.CanvasTexture(canvas);
      return tex;
    }

    // --- CREACIÓN DE ELEMENTOS DE TEXTO 3D (SPRITES) ---
    function createTextSprite(text, color, fontSize) {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      
      ctx.font = `bold ${fontSize || 20}px sans-serif`;
      ctx.fillStyle = color || '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 128, 32);
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(10, 2.5, 1);
      return sprite;
    }

    // --- INICIALIZAR THREE.JS ---
    scene = new THREE.Scene();

    // Cámara
    camera = new THREE.PerspectiveCamera(45, containerCanvas.clientWidth / containerCanvas.clientHeight, 1, 1000);
    camera.position.set(4, 34, 118);

    // Renderizador
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(containerCanvas.clientWidth, containerCanvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    // Controles orbitales
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 250;
    controls.minDistance = 10;
    controls.target.set(2, 0, 0);

    // Ocultar spinner
    loadingEl.style.display = 'none';

    // Luces
    // Luz principal que simula al Sol (a la izquierda)
    const sunLight = new THREE.PointLight(0xffffff, 2.8, 350);
    sunLight.position.set(-sunDistance, 0, 0);
    scene.add(sunLight);

    // Luz ambiental baja para poder ver las zonas de sombra de la Tierra y Luna
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.08);
    scene.add(ambientLight);

    // Fondo estelar 3D
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 500;
    const starPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i += 3) {
      const radius = 220 + Math.random() * 80;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2 * Math.PI;
      const phi = Math.acos(2 * v - 1);
      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i+1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i+2] = radius * Math.cos(phi);
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.9, sizeAttenuation: true });
    const starPoints = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starPoints);

    // Texturas de los astros
    const sunTexture = createProceduralTexture('sun');
    const earthTexture = createProceduralTexture('earth');
    const cloudsTexture = createProceduralTexture('earth_clouds');
    const moonTexture = createProceduralTexture('moon');

    // --- MALLA SOL ---
    const sunGeo = new THREE.SphereGeometry(sunRadius, 32, 32);
    const sunMat = new THREE.MeshStandardMaterial({ map: sunTexture, emissive: 0xff8a00, emissiveMap: sunTexture, emissiveIntensity: 1.4, roughness: 0.9 });
    sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.position.set(-sunDistance, 0, 0);
    scene.add(sunMesh);

    // Brillo solar de fondo
    const sunGlowGeo = new THREE.SphereGeometry(sunRadius * 1.2, 32, 32);
    const sunGlowMat = new THREE.MeshBasicMaterial({
      color: 0xffaa33,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });
    sunGlowMesh = new THREE.Mesh(sunGlowGeo, sunGlowMat);
    sunGlowMesh.position.copy(sunMesh.position);
    scene.add(sunGlowMesh);

    // --- MALLA TIERRA ---
    earthGroup = new THREE.Group();
    earthGroup.position.set(0, 0, 0);
    scene.add(earthGroup);

    // Grupo de inclinación de la Tierra (eje terrestre)
    const earthTiltGroup = new THREE.Group();
    earthTiltGroup.rotation.z = 23.44 * Math.PI / 180; // Inclinación real
    earthGroup.add(earthTiltGroup);

    const earthGeo = new THREE.SphereGeometry(earthRadius, 32, 32);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      bumpMap: noiseTexture,
      bumpScale: 0.15,
      roughness: 0.6,
      metalness: 0.1
    });
    earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthTiltGroup.add(earthMesh);

    // Atmósfera / Nubes
    const cloudsGeo = new THREE.SphereGeometry(earthRadius * 1.02, 32, 32);
    const cloudsMat = new THREE.MeshBasicMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.75
    });
    cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    earthTiltGroup.add(cloudsMesh);

    const atmosphereMesh = new THREE.Mesh(
      new THREE.SphereGeometry(earthRadius * 1.055, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x5bbcff, transparent: true, opacity: 0.18, side: THREE.BackSide, depthWrite: false })
    );
    earthTiltGroup.add(atmosphereMesh);

    // Eje de Rotación Visual de la Tierra
    const axisGeo = new THREE.CylinderGeometry(0.08, 0.08, earthRadius * 2.8, 8);
    const axisMat = new THREE.MeshBasicMaterial({ color: 0x38BDF8, transparent: true, opacity: 0.6 });
    const axisLine = new THREE.Mesh(axisGeo, axisMat);
    earthTiltGroup.add(axisLine);

    // Ecuador de la Tierra
    const equatorGeo = new THREE.RingGeometry(earthRadius * 1.15, earthRadius * 1.18, 32);
    const equatorMat = new THREE.MeshBasicMaterial({ color: 0x38BDF8, side: THREE.DoubleSide, transparent: true, opacity: 0.35 });
    const equatorLine = new THREE.Mesh(equatorGeo, equatorMat);
    equatorLine.rotation.x = Math.PI / 2;
    earthTiltGroup.add(equatorLine);

    // --- GRUPO ÓRBITA DE LA LUNA (INCLINABLE) ---
    orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    // Línea orbital visual
    const orbitCurve = new THREE.EllipseCurve(0, 0, orbitRadius, orbitRadius, 0, 2*Math.PI, false, 0);
    const orbitPoints = orbitCurve.getPoints(120);
    const orbitGeom = new THREE.BufferGeometry().setFromPoints(
      orbitPoints.map(p => new THREE.Vector3(p.x, 0, p.y))
    );
    const orbitMat = new THREE.LineBasicMaterial({ color: 0x3B82F6, transparent: true, opacity: 0.22 });
    const orbitLineVisual = new THREE.Line(orbitGeom, orbitMat);
    orbitGroup.add(orbitLineVisual);

    // --- MALLA LUNA (Sincronizada localmente al grupo orbital) ---
    const moonGeo = new THREE.SphereGeometry(moonRadius, 32, 32);
    // Colores y propiedades del material lunar para transición
    const colorNormal = new THREE.Color(0xcccccc);
    const colorEclipse = new THREE.Color(0x220a0a); // Sombra oscura total
    const emissiveNormal = new THREE.Color(0x000000);
    const emissiveEclipse = new THREE.Color(0xb53c1e); // Brillo cobre "Luna de Sangre"
    
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTexture,
      roughness: 0.85,
      metalness: 0.05,
      color: colorNormal,
      emissive: emissiveNormal
    });
    moonMesh = new THREE.Mesh(moonGeo, moonMat);
    orbitGroup.add(moonMesh);

    // Mapas astronómicos reales con respaldo procedimental si no hay conexión.
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

    // --- CONOS DE SOMBRA 3D SEMITRANSPARENTES ---
    shadowConesGroup = new THREE.Group();
    scene.add(shadowConesGroup);

    // 1. Umbra (Cono de sombra total convergente)
    // Va de x = 0 (Tierra) a x = umbraApexX = 45.0
    // Radio en base: earthRadius = 6.0, Radio en punta: 0
    const umbraGeo = new THREE.ConeGeometry(earthRadius, umbraApexX, 32, 1, true);
    // Cargar textura de gradiente para suavidad
    const umbraTex = createConeGradientTexture('30, 2, 2', 0.62, 0.04);
    const umbraMat = new THREE.MeshBasicMaterial({
      map: umbraTex,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.NormalBlending
    });
    umbraCone = new THREE.Mesh(umbraGeo, umbraMat);
    // Alinear el eje de altura (Y) a la dirección +X
    umbraCone.rotation.z = -Math.PI / 2;
    // Centrar el cono de forma que la base quede en x = 0 y la punta en x = 45
    umbraCone.position.x = umbraApexX / 2;
    shadowConesGroup.add(umbraCone);

    // 2. Penumbra (Cono de sombra parcial divergente, cilindro truncado)
    // Va de x = 0 (Tierra, r = 6) a x = 50 (r = 17.67)
    const penumbraHeight = 50.0;
    const penumbraRadiusEnd = earthRadius * (1.0 + penumbraHeight / penumbraApexX); // ~17.67
    const penumbraGeo = new THREE.CylinderGeometry(penumbraRadiusEnd, earthRadius, penumbraHeight, 32, 1, true);
    const penumbraTex = createConeGradientTexture('20, 20, 20', 0.35, 0.01);
    const penumbraMat = new THREE.MeshBasicMaterial({
      map: penumbraTex,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.NormalBlending
    });
    penumbraCone = new THREE.Mesh(penumbraGeo, penumbraMat);
    // Alinear e inclinar
    penumbraCone.rotation.z = -Math.PI / 2;
    // Centrar: base en x = 0 y final en x = 50
    penumbraCone.position.x = penumbraHeight / 2;
    shadowConesGroup.add(penumbraCone);

    // --- RAYOS DE LUZ SOLAR (GUÍAS GEOMÉTRICAS) ---
    const raysMat = new THREE.LineBasicMaterial({
      color: 0xffd36a,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending
    });

    const raysGeo = new THREE.BufferGeometry();
    const raysPositions = new Float32Array(4 * 3 * 2); // Sólo los límites del cono de sombra.
    raysGeo.setAttribute('position', new THREE.BufferAttribute(raysPositions, 3));
    const raysLines = new THREE.LineSegments(raysGeo, raysMat);
    scene.add(raysLines);

    function updateRaysGeometry() {
      const posArr = raysLines.geometry.attributes.position.array;
      let ptr = 0;
      
      const Rs = sunRadius;
      const Re = earthRadius;
      const Xu = umbraApexX;
      
      // Rayos de Umbra (Superior e Inferior - Plano XY)
      // 1. Rayo superior
      posArr[ptr++] = -sunDistance; posArr[ptr++] = Rs; posArr[ptr++] = 0;
      posArr[ptr++] = Xu; posArr[ptr++] = 0; posArr[ptr++] = 0;
      // 2. Rayo inferior
      posArr[ptr++] = -sunDistance; posArr[ptr++] = -Rs; posArr[ptr++] = 0;
      posArr[ptr++] = Xu; posArr[ptr++] = 0; posArr[ptr++] = 0;

      // Rayos de Umbra (Frente y Detrás - Plano XZ)
      // 3. Rayo frontal
      posArr[ptr++] = -sunDistance; posArr[ptr++] = 0; posArr[ptr++] = Rs;
      posArr[ptr++] = Xu; posArr[ptr++] = 0; posArr[ptr++] = 0;
      // 4. Rayo trasero
      posArr[ptr++] = -sunDistance; posArr[ptr++] = 0; posArr[ptr++] = -Rs;
      posArr[ptr++] = Xu; posArr[ptr++] = 0; posArr[ptr++] = 0;

      // Los cuatro bordes bastan para explicar el cono: evitamos la reja de líneas cruzadas.
      raysLines.geometry.attributes.position.needsUpdate = true;
      return;

      // Rayos de Penumbra cruzados (Plano XY)
      // 5. Cruzado de Arriba-Sol a Abajo-Tierra
      posArr[ptr++] = -sunDistance; posArr[ptr++] = Rs; posArr[ptr++] = 0;
      posArr[ptr++] = 50; posArr[ptr++] = -Re * (1 + 50/penumbraApexX); posArr[ptr++] = 0;
      // 6. Cruzado de Abajo-Sol a Arriba-Tierra
      posArr[ptr++] = -sunDistance; posArr[ptr++] = -Rs; posArr[ptr++] = 0;
      posArr[ptr++] = 50; posArr[ptr++] = Re * (1 + 50/penumbraApexX); posArr[ptr++] = 0;

      // Rayos de Penumbra cruzados (Plano XZ)
      // 7. Frente-Sol a Atrás-Tierra
      posArr[ptr++] = -sunDistance; posArr[ptr++] = 0; posArr[ptr++] = Rs;
      posArr[ptr++] = 50; posArr[ptr++] = 0; posArr[ptr++] = -Re * (1 + 50/penumbraApexX);
      // 8. Atrás-Sol a Frente-Tierra
      posArr[ptr++] = -sunDistance; posArr[ptr++] = 0; posArr[ptr++] = -Rs;
      posArr[ptr++] = 50; posArr[ptr++] = 0; posArr[ptr++] = Re * (1 + 50/penumbraApexX);

      raysLines.geometry.attributes.position.needsUpdate = true;
    }
    updateRaysGeometry();

    // --- ETIQUETAS DE TEXTO ---
    labelsGroup = new THREE.Group();
    scene.add(labelsGroup);

    const labelSol = createTextSprite("SOL (Estrella)", "#FDBA74", 22);
    labelSol.position.set(-sunDistance, sunRadius + 5, 0);
    labelsGroup.add(labelSol);

    const labelTierra = createTextSprite("TIERRA", "#60A5FA", 22);
    labelTierra.position.set(0, earthRadius + 4, 0);
    labelsGroup.add(labelTierra);

    const labelLuna = createTextSprite("LUNA", "#CBD5E1", 20);
    labelsGroup.add(labelLuna);

    const labelUmbra = createTextSprite("UMBRA (Sombra Total)", "#F87171", 18);
    labelUmbra.position.set(umbraApexX * 0.45, 0, 9);
    labelsGroup.add(labelUmbra);

    const labelPenumbra = createTextSprite("PENUMBRA", "#94A3B8", 18);
    labelPenumbra.position.set(28, 12, 0);
    labelsGroup.add(labelPenumbra);

    // --- CÁLCULO FÍSICO DE FACTORES DE ECLIPSE ---
    function getPhaseName(rad) {
      let deg = (rad * 180 / Math.PI) % 360;
      if (deg < 0) deg += 360;
      
      // Clasificación estándar de fases
      if (deg >= 345 || deg < 15) return 'Luna Llena';
      if (deg >= 15 && deg < 75) return 'Gibosa Menguante';
      if (deg >= 75 && deg < 105) return 'Cuarto Menguante';
      if (deg >= 105 && deg < 165) return 'Menguante Cóncava';
      if (deg >= 165 && deg < 195) return 'Luna Nueva';
      if (deg >= 195 && deg < 255) return 'Creciente Cóncava';
      if (deg >= 255 && deg < 285) return 'Cuarto Creciente';
      return 'Gibosa Creciente';
    }

    function calculateEclipseFactors(mx, my, mz) {
      // Si la Luna está en el lado del Sol (x <= 0), no hay eclipse posible
      if (mx <= 0) {
        const name = getPhaseName(orbitAngle);
        return {
          direct: 1.0,
          red: 0.0,
          status: name,
          desc: `Fase de ${name}. La Luna se encuentra en el lado iluminado por el Sol y no cruza la sombra de la Tierra.`,
          badgeClass: 'bg-[#5A6B60]/20 text-[#A8B5AD]'
        };
      }

      // Distancia perpendicular de la Luna al eje central de la sombra (el eje X)
      const dAxis = Math.sqrt(my * my + mz * mz);
      
      // Radios de los conos de sombra en la posición X de la Luna
      const rUmbra = Math.max(0, earthRadius * (1.0 - mx / umbraApexX));
      const rPenumbra = earthRadius * (1.0 + mx / penumbraApexX);
      const Rm = moonRadius;

      let direct = 1.0;
      let red = 0.0;
      let status = 'Luna Llena';
      let desc = 'La Luna está en oposición al Sol pero fuera de la sombra terrestre. Vemos su cara completamente iluminada.';
      let badgeClass = 'bg-[#5A6B60]/20 text-[#A8B5AD]';

      if (dAxis <= rUmbra - Rm) {
        // 1. Eclipse Total (Umbra completa)
        direct = 0.0;
        red = 1.0;
        status = 'Eclipse Lunar Total';
        desc = '¡Luna de Sangre! La Tierra bloquea toda la luz solar directa. Solo la luz roja filtrada y refractada por la atmósfera terrestre tiñe la Luna.';
        badgeClass = 'bg-red-500/20 text-red-400 border border-red-500/30';
      } 
      else if (dAxis < rUmbra + Rm) {
        // 2. Eclipse Parcial (Transición o borde de la Umbra)
        const tUmbra = (dAxis - (rUmbra - Rm)) / (2 * Rm); // 0 (total) a 1 (fuera)
        red = 1.0 - tUmbra;
        const maxDirect = Math.max(0, (dAxis - rUmbra) / (rPenumbra - rUmbra));
        direct = tUmbra * maxDirect;
        status = 'Eclipse Lunar Parcial';
        desc = 'Una porción de la Luna se sumerge en la umbra (rojo cobrizo oscuro) mientras que la otra permanece en la penumbra (luz gris atenuada).';
        badgeClass = 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      } 
      else if (dAxis < rPenumbra + Rm) {
        // 3. Eclipse Penumbral (Penumbra pero no Umbra)
        red = 0.0;
        const tPenumbra = (dAxis - (rUmbra + Rm)) / ((rPenumbra + Rm) - (rUmbra + Rm)); // 0 (cerca de umbra) a 1 (fuera de penumbra)
        direct = 0.15 + 0.85 * tPenumbra; // Dimming sutil
        status = 'Eclipse Lunar Penumbral';
        desc = 'La Luna transita por la penumbra terrestre. Se produce una pérdida leve de brillo en la superficie lunar, pero sin el color rojo.';
        badgeClass = 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      } 
      else {
        // 4. Luna Llena limpia
        direct = 1.0;
        red = 0.0;
        status = 'Luna Llena';
        desc = 'La Luna pasa de largo por arriba o por abajo de la sombra terrestre debido a la inclinación de su plano orbital.';
        badgeClass = 'bg-green-500/10 text-emerald-400 border border-emerald-500/20';
      }

      return { direct, red, status, desc, badgeClass };
    }

    // --- CONFIGURACIÓN DE EVENTOS DE INTERFAZ ---
    const playPauseBtn = document.getElementById('btnEclipsePlayPause');
    const playPauseIcon = document.getElementById('iconEclipsePlayPause');
    const playPauseTxt = document.getElementById('txtEclipsePlayPause');

    playPauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        playPauseIcon.setAttribute('data-icon', 'lucide:pause');
        playPauseTxt.innerText = "Pausar";
      } else {
        playPauseIcon.setAttribute('data-icon', 'lucide:play');
        playPauseTxt.innerText = "Reanudar";
      }
    });

    const sliderPos = document.getElementById('sliderEclipsePos');
    const txtPosVal = document.getElementById('txtEclipsePosVal');
    sliderPos.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      orbitAngle = (val * Math.PI) / 180;
      txtPosVal.innerText = val + "°";
    });

    const sliderIncl = document.getElementById('sliderEclipseIncl');
    const txtInclVal = document.getElementById('txtEclipseInclVal');
    sliderIncl.addEventListener('input', (e) => {
      inclinationDeg = parseFloat(e.target.value);
      orbitGroup.rotation.z = (inclinationDeg * Math.PI) / 180;
      txtInclVal.innerText = inclinationDeg.toFixed(1) + "°";
      updateSnapButtons();
    });

    const btnPresetTotal = document.getElementById('btnLunarPresetTotal');
    const btnPresetReal = document.getElementById('btnLunarPresetReal');

    btnLunarPresetTotal.addEventListener('click', () => {
      inclinationDeg = 0.0;
      orbitGroup.rotation.z = 0;
      sliderIncl.value = 0;
      txtInclVal.innerText = "0.0°";
      updateSnapButtons();
    });

    btnLunarPresetReal.addEventListener('click', () => {
      inclinationDeg = 5.1;
      orbitGroup.rotation.z = (5.1 * Math.PI) / 180;
      sliderIncl.value = 5.1;
      txtInclVal.innerText = "5.1°";
      updateSnapButtons();
    });

    function updateSnapButtons() {
      if (Math.abs(inclinationDeg - 0.0) < 0.1) {
        btnLunarPresetTotal.className = 'bg-blue-500/20 border border-blue-500/30 text-blue-400 px-3 py-2 rounded transition-colors text-[10px] font-semibold w-full lg:w-auto';
        btnLunarPresetReal.className = 'bg-white/5 hover:bg-white/10 text-white px-3 py-2 border border-white/10 rounded transition-colors text-[10px] font-semibold w-full lg:w-auto';
      } else if (Math.abs(inclinationDeg - 5.1) < 0.2) {
        btnLunarPresetReal.className = 'bg-blue-500/20 border border-blue-500/30 text-blue-400 px-3 py-2 rounded transition-colors text-[10px] font-semibold w-full lg:w-auto';
        btnLunarPresetTotal.className = 'bg-white/5 hover:bg-white/10 text-white px-3 py-2 border border-white/10 rounded transition-colors text-[10px] font-semibold w-full lg:w-auto';
      } else {
        btnLunarPresetTotal.className = 'bg-white/5 hover:bg-white/10 text-white px-3 py-2 border border-white/10 rounded transition-colors text-[10px] font-semibold w-full lg:w-auto';
        btnLunarPresetReal.className = 'bg-white/5 hover:bg-white/10 text-white px-3 py-2 border border-white/10 rounded transition-colors text-[10px] font-semibold w-full lg:w-auto';
      }
    }

    // Toggle de Guías Visuales
    document.getElementById('chkEclipseShowShadows').addEventListener('change', (e) => {
      showShadows = e.target.checked;
      shadowConesGroup.visible = showShadows;
    });

    document.getElementById('chkEclipseShowRays').addEventListener('change', (e) => {
      showRays = e.target.checked;
      raysLines.visible = showRays;
    });

    document.getElementById('chkEclipseShowOrbit').addEventListener('change', (e) => {
      showOrbit = e.target.checked;
      orbitLineVisual.visible = showOrbit;
    });

    document.getElementById('chkEclipseShowLabels').addEventListener('change', (e) => {
      showLabels = e.target.checked;
      labelsGroup.visible = showLabels;
    });

    // Control de Cámaras
    const spaceBtn = document.getElementById('eclipseCamSpaceBtn');
    const teleBtn = document.getElementById('eclipseCamTelescopeBtn');

    function updateCameraUI() {
      if (currentCameraView === 'space') {
        spaceBtn.className = 'text-xs bg-blue-500 text-[#080C0A] px-3 py-1.5 rounded border border-blue-500 font-sans font-semibold transition-all duration-200 flex items-center gap-1.5';
        teleBtn.className = 'text-xs bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded border border-white/10 font-sans font-semibold transition-all duration-200 flex items-center gap-1.5';
      } else {
        teleBtn.className = 'text-xs bg-blue-500 text-[#080C0A] px-3 py-1.5 rounded border border-blue-500 font-sans font-semibold transition-all duration-200 flex items-center gap-1.5';
        spaceBtn.className = 'text-xs bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded border border-white/10 font-sans font-semibold transition-all duration-200 flex items-center gap-1.5';
      }
    }

    spaceBtn.addEventListener('click', () => {
      if (currentCameraView === 'space') return;
      currentCameraView = 'space';
      isTransitioning = true;
      updateCameraUI();
    });

    teleBtn.addEventListener('click', () => {
      if (currentCameraView === 'telescope') return;
      currentCameraView = 'telescope';
      isTransitioning = true;
      updateCameraUI();
    });

    // Ajuste dinámico de Redimensionamiento
    window.addEventListener('resize', () => {
      camera.aspect = containerCanvas.clientWidth / containerCanvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerCanvas.clientWidth, containerCanvas.clientHeight);
    });

    // --- BUCLE DE ANIMACIÓN ---
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // 1. Avanzar órbita si está en Play
      if (isPlaying && document.activeElement !== sliderPos) {
        orbitAngle += delta * 0.15; // Velocidad orbital
        if (orbitAngle >= Math.PI * 2) orbitAngle = 0;
        
        // Sincronizar slider
        const deg = Math.round((orbitAngle * 180) / Math.PI) % 360;
        sliderPos.value = deg;
        txtPosVal.innerText = deg + "°";
      }

      // 2. Actualizar posición local de la Luna en órbita
      moonMesh.position.x = orbitRadius * Math.cos(orbitAngle);
      moonMesh.position.z = orbitRadius * Math.sin(orbitAngle);
      moonMesh.position.y = 0; // El plano orbital en sí se inclina mediante orbitGroup

      // Rotación sincrónica: la cara visible siempre apunta al centro (la Tierra)
      moonMesh.lookAt(0, 0, 0);

      // Rotaciones constantes de Tierra, nubes y Sol
      sunMesh.rotation.y += 0.001;
      earthMesh.rotation.y += 0.003;
      cloudsMesh.rotation.y += 0.0038;

      // Efecto latido/pulso solar
      const pulse = 1.0 + Math.sin(time * 2.0) * 0.02;
      sunGlowMesh.scale.set(pulse, pulse, pulse);

      // Obtener la posición del mundo absoluta de la Luna (aplica inclinación y rotaciones)
      const moonWorldPos = new THREE.Vector3();
      moonMesh.getWorldPosition(moonWorldPos);

      // 3. Evaluar Eclipses y teñido de Luna de Sangre
      const eclipse = calculateEclipseFactors(moonWorldPos.x, moonWorldPos.y, moonWorldPos.z);
      
      // Interpolar material lunar
      // A medida que entra en la umbra (red = 1), el color difuso se oscurece mucho (a rojo oscuro)
      // y se activa el color emisivo rojo cobre.
      moonMat.color.copy(colorEclipse).lerp(colorNormal, eclipse.direct);
      moonMat.emissive.copy(emissiveEclipse).lerp(emissiveNormal, eclipse.red);

      // 4. Actualizar etiquetas de texto y UI HTML
      if (showLabels) {
        labelLuna.position.copy(moonWorldPos).add(new THREE.Vector3(0, moonRadius + 3.0, 0));
        // Orientar etiquetas a la cámara para que siempre sean legibles
        labelsGroup.children.forEach(sprite => {
          sprite.quaternion.copy(camera.quaternion);
        });
      }

      // Actualizar UI
      document.getElementById('eclipseStateTitle').innerText = eclipse.status;
      document.getElementById('eclipseStateBadge').innerText = eclipse.status;
      document.getElementById('eclipseStateBadge').className = 'px-2.5 py-0.5 rounded text-[9px] font-bold ' + eclipse.badgeClass;
      document.getElementById('eclipseStateDesc').innerText = eclipse.desc;
      
      // Actualizar porcentajes
      document.getElementById('txtLuzDirecta').innerText = Math.round(eclipse.direct * 100) + '%';
      
      const txtRefractada = document.getElementById('txtLuzRefractada');
      if (eclipse.red > 0) {
        txtRefractada.innerText = Math.round(eclipse.red * 100) + '%';
        txtRefractada.className = 'text-red-400 font-mono font-semibold text-sm';
      } else {
        txtRefractada.innerText = '0%';
        txtRefractada.className = 'text-[#5A6B60] font-mono text-sm';
      }

      // 5. Suavizado e interpolación de cámaras (Space vs Telescope)
      if (currentCameraView === 'telescope') {
        // Enfoque Telescopio: Cámara sigue a la Luna desde la Tierra
        const dir = moonWorldPos.clone().normalize();
        
        // Posicionar cámara 12 unidades antes de la Luna, en la línea de visión Tierra-Luna
        const targetCamPos = moonWorldPos.clone().sub(dir.multiplyScalar(10.5));
        // Agregar pequeña desviación de altura para mejor encuadre 3D
        targetCamPos.y += 1.8;
        
        if (isTransitioning) {
          camera.position.lerp(targetCamPos, 0.05);
          controls.target.lerp(moonWorldPos, 0.05);
          if (camera.position.distanceTo(targetCamPos) < 0.15) {
            isTransitioning = false;
          }
        } else {
          // Mantener la cámara fija con el movimiento de la Luna manteniendo control manual del usuario
          const prevTarget = controls.target.clone();
          controls.target.copy(moonWorldPos);
          const moveDiff = moonWorldPos.clone().sub(prevTarget);
          camera.position.add(moveDiff);
        }
      } else {
        // Enfoque Espacial General
        const targetCamPos = new THREE.Vector3(0, 52, 102);
        const targetTarget = new THREE.Vector3(12, 0, 0); // Centrar plano orbital y cono
        
        if (isTransitioning) {
          camera.position.lerp(targetCamPos, 0.05);
          controls.target.lerp(targetTarget, 0.05);
          if (camera.position.distanceTo(targetCamPos) < 0.15) {
            isTransitioning = false;
          }
        } else {
          controls.target.copy(targetTarget);
        }
      }

      controls.update();
      renderer.render(scene, camera);
    }

    // Iniciar bucle
    animate();
  }
})();
