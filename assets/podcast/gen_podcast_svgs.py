"""
Genera los 14 SVGs del podcast.
Estilo: fondo oscuro, ícono geométrico central, badge de episodio, paleta por unidad.
Química: verde (#22C55E)
Física: azul (#3B82F6)
Biología: rojo (#DC2626)
ESI: turquesa (#14B8A6)
"""
import os

OUT_DIR = r"D:\naturales_1\assets\podcast"
os.makedirs(OUT_DIR, exist_ok=True)

# Plantilla común (gradiente + dots + badge + ícono)
def svg_wrapper(content, color, badge_num, label):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" role="img" aria-label="{label} podcast">
  <defs>
    <linearGradient id="bg{badge_num}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0E1410"/>
      <stop offset="1" stop-color="#161C18"/>
    </linearGradient>
    <radialGradient id="glow{badge_num}" cx="0.5" cy="0.5">
      <stop offset="0" stop-color="{color}" stop-opacity="0.25"/>
      <stop offset="1" stop-color="{color}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots{badge_num}" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
      <circle cx="15" cy="15" r="1" fill="rgba(255,255,255,0.04)"/>
    </pattern>
  </defs>
  <rect width="600" height="400" fill="url(#bg{badge_num})"/>
  <rect width="600" height="400" fill="url(#dots{badge_num})"/>
  <rect width="600" height="400" fill="url(#glow{badge_num})"/>
  <!-- Badge episodio -->
  <g transform="translate(28, 28)">
    <rect x="0" y="0" width="76" height="24" rx="2" fill="{color}" opacity="0.15"/>
    <text x="38" y="16" text-anchor="middle" fill="{color}" font-family="Inter, sans-serif" font-size="10" font-weight="700" letter-spacing="2">EP {badge_num:02d}</text>
  </g>
  <!-- Decoration bottom -->
  <g transform="translate(28, 360)">
    <line x1="0" y1="0" x2="40" y2="0" stroke="{color}" stroke-width="2" opacity="0.6"/>
  </g>
  {content}
</svg>'''

# ---------- QUÍMICA ----------

# 1. Materia y Propiedades: tres frascos con estados de la materia
materia = '''
  <g transform="translate(300, 200)">
    <!-- Frasco sólido -->
    <g transform="translate(-160, 0)">
      <rect x="-32" y="-60" width="64" height="120" fill="rgba(34,197,94,0.08)" stroke="#22C55E" stroke-width="2" rx="3"/>
      <rect x="-28" y="-20" width="56" height="78" fill="#22C55E" opacity="0.4"/>
      <rect x="-30" y="-78" width="60" height="20" fill="#22C55E" opacity="0.6" rx="2"/>
      <text x="0" y="92" text-anchor="middle" fill="#A8B5AD" font-family="Inter, sans-serif" font-size="10" font-weight="600" letter-spacing="1">SÓLIDO</text>
    </g>
    <!-- Frasco líquido -->
    <g transform="translate(0, 0)">
      <rect x="-32" y="-60" width="64" height="120" fill="rgba(34,197,94,0.08)" stroke="#22C55E" stroke-width="2" rx="3"/>
      <path d="M -28 10 Q -28 8 -26 8 L 26 8 Q 28 8 28 10 L 28 56 Q 28 58 26 58 L -26 58 Q -28 58 -28 56 Z" fill="#22C55E" opacity="0.45"/>
      <path d="M -28 10 Q -14 6 0 10 T 28 10" fill="none" stroke="#22C55E" stroke-width="1.5" opacity="0.7"/>
      <rect x="-30" y="-78" width="60" height="20" fill="#22C55E" opacity="0.6" rx="2"/>
      <text x="0" y="92" text-anchor="middle" fill="#A8B5AD" font-family="Inter, sans-serif" font-size="10" font-weight="600" letter-spacing="1">LÍQUIDO</text>
    </g>
    <!-- Frasco gas -->
    <g transform="translate(160, 0)">
      <rect x="-32" y="-60" width="64" height="120" fill="rgba(34,197,94,0.08)" stroke="#22C55E" stroke-width="2" rx="3"/>
      <circle cx="-12" cy="20" r="6" fill="#22C55E" opacity="0.7"/>
      <circle cx="14" cy="0" r="5" fill="#22C55E" opacity="0.7"/>
      <circle cx="0" cy="40" r="4" fill="#22C55E" opacity="0.6"/>
      <circle cx="16" cy="50" r="3" fill="#22C55E" opacity="0.5"/>
      <circle cx="-18" cy="-10" r="3" fill="#22C55E" opacity="0.6"/>
      <rect x="-30" y="-78" width="60" height="20" fill="#22C55E" opacity="0.6" rx="2"/>
      <text x="0" y="92" text-anchor="middle" fill="#A8B5AD" font-family="Inter, sans-serif" font-size="10" font-weight="600" letter-spacing="1">GAS</text>
    </g>
    <!-- Title -->
    <text x="0" y="-130" text-anchor="middle" fill="white" font-family="Playfair Display, serif" font-size="28" font-weight="800">Materia y sus Propiedades</text>
  </g>'''

# 2. Mezclas: dos frascos
mezclas = '''
  <g transform="translate(300, 200)">
    <text x="0" y="-130" text-anchor="middle" fill="white" font-family="Playfair Display, serif" font-size="28" font-weight="800">Mezclas y Métodos de Separación</text>

    <!-- Frasco homogéneo -->
    <g transform="translate(-100, 0)">
      <rect x="-44" y="-70" width="88" height="140" fill="rgba(34,197,94,0.08)" stroke="#22C55E" stroke-width="2" rx="3"/>
      <rect x="-40" y="10" width="80" height="56" fill="#22C55E" opacity="0.45"/>
      <text x="0" y="100" text-anchor="middle" fill="#A8B5AD" font-family="Inter, sans-serif" font-size="10" font-weight="600" letter-spacing="1">HOMOGÉNEA</text>
    </g>
    <!-- Frasco heterogéneo -->
    <g transform="translate(100, 0)">
      <rect x="-44" y="-70" width="88" height="140" fill="rgba(34,197,94,0.08)" stroke="#22C55E" stroke-width="2" rx="3"/>
      <rect x="-40" y="0" width="80" height="20" fill="#A8B5AD" opacity="0.6"/>
      <rect x="-40" y="20" width="80" height="46" fill="#22C55E" opacity="0.5"/>
      <circle cx="-15" cy="35" r="6" fill="#A8B5AD" opacity="0.7"/>
      <circle cx="10" cy="50" r="4" fill="#A8B5AD" opacity="0.6"/>
      <text x="0" y="100" text-anchor="middle" fill="#A8B5AD" font-family="Inter, sans-serif" font-size="10" font-weight="600" letter-spacing="1">HETEROGÉNEA</text>
    </g>
  </g>'''

# 3. Agua: gota estilizada
agua = '''
  <g transform="translate(300, 200)">
    <text x="0" y="-140" text-anchor="middle" fill="white" font-family="Playfair Display, serif" font-size="28" font-weight="800">El Agua como Recurso</text>

    <!-- Gota grande -->
    <g transform="translate(0, -10)">
      <path d="M 0 -90 Q 60 -10 60 50 A 60 60 0 0 1 -60 50 Q -60 -10 0 -90 Z" fill="rgba(34,197,94,0.12)" stroke="#22C55E" stroke-width="2.5"/>
      <ellipse cx="-22" cy="20" rx="12" ry="22" fill="white" opacity="0.25"/>
    </g>

    <!-- H2O label -->
    <text x="0" y="78" text-anchor="middle" fill="#22C55E" font-family="Inter, sans-serif" font-size="22" font-weight="800" letter-spacing="3">H₂O</text>
    <text x="0" y="100" text-anchor="middle" fill="#A8B5AD" font-family="Inter, sans-serif" font-size="9" letter-spacing="2">SUSTANCIA · RECURSO · DERECHO</text>
  </g>'''

# ---------- FÍSICA ----------

# 4. Energía: rayo + sol
energia = '''
  <g transform="translate(300, 200)">
    <text x="0" y="-140" text-anchor="middle" fill="white" font-family="Playfair Display, serif" font-size="28" font-weight="800">La Energía y sus Formas</text>

    <!-- Rayo -->
    <g transform="translate(-110, 0)">
      <path d="M -20 -60 L 0 -10 L -15 -10 L 20 60 L 5 10 L 20 10 Z" fill="#FBBF24" stroke="#3B82F6" stroke-width="1.5"/>
    </g>
    <!-- Sol -->
    <g transform="translate(110, 0)">
      <circle r="32" fill="#FBBF24" opacity="0.85"/>
      <g stroke="#FBBF24" stroke-width="2" stroke-linecap="round" opacity="0.9">
        <line x1="0" y1="-50" x2="0" y2="-42"/>
        <line x1="0" y1="42" x2="0" y2="50"/>
        <line x1="-50" y1="0" x2="-42" y2="0"/>
        <line x1="42" y1="0" x2="50" y2="0"/>
        <line x1="-35" y1="-35" x2="-30" y2="-30"/>
        <line x1="30" y1="30" x2="35" y2="35"/>
        <line x1="35" y1="-35" x2="30" y2="-30"/>
        <line x1="-30" y1="30" x2="-35" y2="35"/>
      </g>
    </g>
    <!-- Label -->
    <text x="0" y="120" text-anchor="middle" fill="#A8B5AD" font-family="Inter, sans-serif" font-size="9" letter-spacing="2">ELÉCTRICA · SOLAR · CINÉTICA · POTENCIAL</text>
  </g>'''

# 5. Calor y Sonido
calor = '''
  <g transform="translate(300, 200)">
    <text x="0" y="-140" text-anchor="middle" fill="white" font-family="Playfair Display, serif" font-size="28" font-weight="800">Calor y Sonido</text>

    <!-- Termómetro izquierda -->
    <g transform="translate(-110, 0)">
      <rect x="-6" y="-50" width="12" height="80" fill="rgba(255,255,255,0.1)" stroke="#EF4444" stroke-width="1.5" rx="6"/>
      <circle cx="0" cy="40" r="14" fill="#EF4444" stroke="#DC2626" stroke-width="1.5"/>
      <rect x="-4" y="-30" width="8" height="60" fill="#EF4444" opacity="0.7"/>
      <line x1="-18" y1="-20" x2="-10" y2="-20" stroke="white" stroke-width="1" opacity="0.5"/>
      <line x1="-18" y1="0" x2="-10" y2="0" stroke="white" stroke-width="1" opacity="0.5"/>
      <line x1="-18" y1="20" x2="-10" y2="20" stroke="white" stroke-width="1" opacity="0.5"/>
      <text x="0" y="76" text-anchor="middle" fill="#A8B5AD" font-family="Inter, sans-serif" font-size="9" font-weight="600">CALOR</text>
    </g>

    <!-- Onda de sonido derecha -->
    <g transform="translate(110, 0)">
      <g fill="none" stroke="#3B82F6" stroke-width="2" opacity="0.9">
        <circle cx="-30" cy="0" r="20"/>
        <circle cx="-30" cy="0" r="40" opacity="0.5"/>
        <circle cx="-30" cy="0" r="60" opacity="0.3"/>
      </g>
      <circle cx="-30" cy="0" r="8" fill="#3B82F6"/>
      <text x="0" y="76" text-anchor="middle" fill="#A8B5AD" font-family="Inter, sans-serif" font-size="9" font-weight="600">SONIDO</text>
    </g>
  </g>'''

# 6. Movimientos
movimientos = '''
  <g transform="translate(300, 200)">
    <text x="0" y="-140" text-anchor="middle" fill="white" font-family="Playfair Display, serif" font-size="28" font-weight="800">Movimientos y Trayectorias</text>

    <!-- Ejes -->
    <g transform="translate(0, 0)">
      <line x1="-160" y1="60" x2="160" y2="60" stroke="#3B82F6" stroke-width="1.5"/>
      <line x1="-160" y1="60" x2="-160" y2="-60" stroke="#3B82F6" stroke-width="1.5"/>
      <!-- Línea diagonal (MRU) -->
      <line x1="-150" y1="60" x2="150" y2="-50" stroke="#3B82F6" stroke-width="2.5" opacity="0.9"/>
      <!-- Dots en la línea -->
      <circle cx="-100" cy="23" r="3" fill="#3B82F6"/>
      <circle cx="-50" cy="0" r="3" fill="#3B82F6"/>
      <circle cx="0" cy="-17" r="3" fill="#3B82F6"/>
      <circle cx="50" cy="-33" r="3" fill="#3B82F6"/>
      <circle cx="100" cy="-50" r="3" fill="#3B82F6"/>
      <!-- Labels -->
      <text x="170" y="65" fill="#3B82F6" font-family="Inter, sans-serif" font-size="10" font-weight="700">t</text>
      <text x="-170" y="-65" fill="#3B82F6" font-family="Inter, sans-serif" font-size="10" font-weight="700">x</text>
    </g>
  </g>'''

# 7. Sistema Solar
solar = '''
  <g transform="translate(300, 200)">
    <text x="0" y="-140" text-anchor="middle" fill="white" font-family="Playfair Display, serif" font-size="28" font-weight="800">El Sistema Solar</text>

    <!-- Sol -->
    <circle cx="-100" cy="0" r="30" fill="#FBBF24"/>
    <g stroke="#FBBF24" stroke-width="1.5" stroke-linecap="round" opacity="0.7">
      <line x1="-100" y1="-44" x2="-100" y2="-38"/>
      <line x1="-100" y1="38" x2="-100" y2="44"/>
      <line x1="-144" y1="0" x2="-138" y2="0"/>
      <line x1="-62" y1="0" x2="-56" y2="0"/>
    </g>

    <!-- Órbitas -->
    <g fill="none" stroke="#3B82F6" stroke-width="1" opacity="0.5">
      <ellipse cx="-100" cy="0" rx="60" ry="22"/>
      <ellipse cx="-100" cy="0" rx="90" ry="32"/>
      <ellipse cx="-100" cy="0" rx="125" ry="42"/>
    </g>

    <!-- Planetas -->
    <circle cx="-40" cy="0" r="6" fill="#3B82F6"/>
    <circle cx="0" cy="-22" r="8" fill="#22C55E"/>
    <circle cx="35" cy="14" r="5" fill="#F59E0B"/>
  </g>'''

# ---------- BIOLOGÍA ----------

# 8. Seres Vivos / célula
seres = '''
  <g transform="translate(300, 200)">
    <text x="0" y="-140" text-anchor="middle" fill="white" font-family="Playfair Display, serif" font-size="28" font-weight="800">Seres Vivos: Unidad y Diversidad</text>

    <!-- Célula -->
    <g transform="translate(0, 0)">
      <!-- Membrana -->
      <ellipse cx="0" cy="0" rx="100" ry="80" fill="rgba(220,38,38,0.06)" stroke="#DC2626" stroke-width="2.5"/>
      <!-- Núcleo -->
      <circle cx="-10" cy="-10" r="28" fill="rgba(220,38,38,0.25)" stroke="#DC2626" stroke-width="2"/>
      <circle cx="-10" cy="-10" r="14" fill="#DC2626" opacity="0.6"/>
      <!-- Mitocondria -->
      <ellipse cx="40" cy="20" rx="20" ry="10" fill="rgba(220,38,38,0.3)" stroke="#DC2626" stroke-width="1.5" transform="rotate(30 40 20)"/>
      <!-- Orgánulos -->
      <circle cx="30" cy="-30" r="5" fill="#DC2626" opacity="0.6"/>
      <circle cx="-40" cy="20" r="4" fill="#DC2626" opacity="0.5"/>
      <circle cx="50" cy="-30" r="3" fill="#DC2626" opacity="0.5"/>
    </g>
  </g>'''

# 9. Plantas
plantas = '''
  <g transform="translate(300, 200)">
    <text x="0" y="-140" text-anchor="middle" fill="white" font-family="Playfair Display, serif" font-size="28" font-weight="800">Las Plantas</text>

    <!-- Maceta -->
    <g transform="translate(0, 50)">
      <path d="M -50 0 L 50 0 L 40 30 L -40 30 Z" fill="#A0522D" stroke="#22C55E" stroke-width="2"/>
      <line x1="-50" y1="0" x2="50" y2="0" stroke="#22C55E" stroke-width="1.5"/>
    </g>
    <!-- Tallo -->
    <line x1="0" y1="50" x2="0" y2="-30" stroke="#22C55E" stroke-width="4"/>
    <!-- Hojas -->
    <ellipse cx="-30" cy="0" rx="22" ry="10" fill="#22C55E" stroke="#15803D" stroke-width="1.5" transform="rotate(-30 -30 0)"/>
    <ellipse cx="30" cy="-20" rx="22" ry="10" fill="#22C55E" stroke="#15803D" stroke-width="1.5" transform="rotate(30 30 -20)"/>
    <!-- Flor -->
    <g transform="translate(0, -45)">
      <circle r="14" fill="#FBBF24"/>
      <circle cx="0" cy="-12" r="8" fill="#F59E0B"/>
      <circle cx="11" cy="-4" r="8" fill="#F59E0B"/>
      <circle cx="-11" cy="-4" r="8" fill="#F59E0B"/>
      <circle cx="7" cy="9" r="8" fill="#F59E0B"/>
      <circle cx="-7" cy="9" r="8" fill="#F59E0B"/>
      <circle cx="0" cy="0" r="6" fill="#DC2626"/>
    </g>
  </g>'''

# 10. Animales
animales = '''
  <g transform="translate(300, 200)">
    <text x="0" y="-140" text-anchor="middle" fill="white" font-family="Playfair Display, serif" font-size="28" font-weight="800">Los Animales</text>

    <!-- Huella estilizada -->
    <g transform="translate(0, 0)">
      <ellipse cx="0" cy="20" rx="50" ry="36" fill="rgba(220,38,38,0.15)" stroke="#DC2626" stroke-width="2.5"/>
      <ellipse cx="-40" cy="-20" rx="14" ry="18" fill="rgba(220,38,38,0.15)" stroke="#DC2626" stroke-width="2"/>
      <ellipse cx="-15" cy="-40" rx="14" ry="18" fill="rgba(220,38,38,0.15)" stroke="#DC2626" stroke-width="2"/>
      <ellipse cx="15" cy="-40" rx="14" ry="18" fill="rgba(220,38,38,0.15)" stroke="#DC2626" stroke-width="2"/>
      <ellipse cx="40" cy="-20" rx="14" ry="18" fill="rgba(220,38,38,0.15)" stroke="#DC2626" stroke-width="2"/>
    </g>
    <text x="0" y="100" text-anchor="middle" fill="#A8B5AD" font-family="Inter, sans-serif" font-size="9" letter-spacing="2">VERTEBRADOS · INVERTEBRADOS</text>
  </g>'''

# 11. Digestión
digestion = '''
  <g transform="translate(300, 200)">
    <text x="0" y="-140" text-anchor="middle" fill="white" font-family="Playfair Display, serif" font-size="28" font-weight="800">La Digestión</text>

    <!-- Tubo digestivo estilizado -->
    <g transform="translate(0, 0)" stroke="#DC2626" stroke-width="2.5" fill="none">
      <!-- Esófago -->
      <path d="M 0 -90 L 0 -30" />
      <!-- Estómago -->
      <path d="M -25 -30 Q -50 -10 -30 30 Q -10 50 25 30 Q 40 10 25 -10 Q 0 -25 -25 -30 Z" fill="rgba(220,38,38,0.12)"/>
      <!-- Intestino delgado -->
      <path d="M 25 30 L 35 60 L 25 80 L 35 100 L 25 110" stroke-width="2"/>
      <!-- Intestino grueso (alrededor) -->
      <path d="M 35 60 L 60 50 L 60 100 L 35 100" stroke-width="2.5"/>
    </g>
    <!-- Labels -->
    <text x="0" y="-100" text-anchor="middle" fill="#A8B5AD" font-family="Inter, sans-serif" font-size="9" font-weight="600">BOCA</text>
    <text x="0" y="0" text-anchor="middle" fill="#DC2626" font-family="Inter, sans-serif" font-size="11" font-weight="700">ESTÓMAGO</text>
    <text x="80" y="80" text-anchor="middle" fill="#A8B5AD" font-family="Inter, sans-serif" font-size="8" font-weight="600">INTESTINO</text>
  </g>'''

# 12. Circulación
circulacion = '''
  <g transform="translate(300, 200)">
    <text x="0" y="-140" text-anchor="middle" fill="white" font-family="Playfair Display, serif" font-size="28" font-weight="800">La Circulación</text>

    <!-- Corazón estilizado -->
    <g transform="translate(0, 0)">
      <path d="M 0 30
               C -20 0 -60 -20 -60 -50
               C -60 -75 -40 -85 -25 -75
               C -15 -68 -5 -55 0 -45
               C 5 -55 15 -68 25 -75
               C 40 -85 60 -75 60 -50
               C 60 -20 20 0 0 30 Z"
            fill="rgba(220,38,38,0.25)" stroke="#DC2626" stroke-width="2.5"/>
      <!-- Arterias -->
      <line x1="-50" y1="-50" x2="-100" y2="-80" stroke="#DC2626" stroke-width="2"/>
      <line x1="50" y1="-50" x2="100" y2="-80" stroke="#DC2626" stroke-width="2"/>
      <!-- Venas -->
      <line x1="-40" y1="0" x2="-90" y2="40" stroke="#3B82F6" stroke-width="2"/>
      <line x1="40" y1="0" x2="90" y2="40" stroke="#3B82F6" stroke-width="2"/>
      <circle cx="-100" cy="-80" r="3" fill="#DC2626"/>
      <circle cx="100" cy="-80" r="3" fill="#DC2626"/>
      <circle cx="-90" cy="40" r="3" fill="#3B82F6"/>
      <circle cx="90" cy="40" r="3" fill="#3B82F6"/>
    </g>
    <text x="0" y="100" text-anchor="middle" fill="#A8B5AD" font-family="Inter, sans-serif" font-size="9" letter-spacing="2">ARTERIAS · VENAS · SANGRE</text>
  </g>'''

# 13. Respiración
respiracion = '''
  <g transform="translate(300, 200)">
    <text x="0" y="-140" text-anchor="middle" fill="white" font-family="Playfair Display, serif" font-size="28" font-weight="800">La Respiración</text>

    <!-- Pulmones estilizados -->
    <g transform="translate(0, 0)">
      <!-- Tráquea -->
      <line x1="0" y1="-90" x2="0" y2="-30" stroke="#DC2626" stroke-width="3"/>
      <line x1="-6" y1="-90" x2="-6" y2="-30" stroke="#DC2626" stroke-width="1"/>
      <line x1="6" y1="-90" x2="6" y2="-30" stroke="#DC2626" stroke-width="1"/>

      <!-- Pulmón izquierdo -->
      <ellipse cx="-50" cy="20" rx="38" ry="55" fill="rgba(220,38,38,0.12)" stroke="#DC2626" stroke-width="2.5"/>
      <!-- Pulmón derecho -->
      <ellipse cx="50" cy="20" rx="38" ry="55" fill="rgba(220,38,38,0.12)" stroke="#DC2626" stroke-width="2.5"/>

      <!-- Alvéolos abstractos -->
      <circle cx="-65" cy="0" r="4" fill="#DC2626" opacity="0.5"/>
      <circle cx="-50" cy="40" r="4" fill="#DC2626" opacity="0.5"/>
      <circle cx="-30" cy="60" r="4" fill="#DC2626" opacity="0.5"/>
      <circle cx="65" cy="0" r="4" fill="#DC2626" opacity="0.5"/>
      <circle cx="50" cy="40" r="4" fill="#DC2626" opacity="0.5"/>
      <circle cx="30" cy="60" r="4" fill="#DC2626" opacity="0.5"/>

      <!-- O2 entrando, CO2 saliendo -->
      <text x="-90" y="-50" fill="#3B82F6" font-family="Inter, sans-serif" font-size="11" font-weight="800">O₂</text>
      <text x="78" y="-50" fill="#A8B5AD" font-family="Inter, sans-serif" font-size="11" font-weight="800">CO₂</text>
    </g>
  </g>'''

# 14. Alimentación
alimentacion = '''
  <g transform="translate(300, 200)">
    <text x="0" y="-140" text-anchor="middle" fill="white" font-family="Playfair Display, serif" font-size="28" font-weight="800">Alimentación Saludable</text>

    <!-- Plato estilizado -->
    <g transform="translate(0, 0)">
      <circle cx="0" cy="0" r="80" fill="rgba(255,255,255,0.05)" stroke="#14B8A6" stroke-width="2.5"/>
      <circle cx="0" cy="0" r="62" fill="none" stroke="#14B8A6" stroke-width="1" opacity="0.5"/>
      <!-- Porciones -->
      <!-- Vegetales (verde) - izquierda -->
      <path d="M -75 -10 A 70 70 0 0 1 -50 -55 L -50 0 Z" fill="#22C55E" opacity="0.5"/>
      <circle cx="-55" cy="-25" r="4" fill="#22C55E"/>
      <circle cx="-65" cy="-15" r="4" fill="#22C55E"/>
      <!-- Frutas (naranja) - arriba -->
      <path d="M -40 -65 A 70 70 0 0 1 40 -65 L 0 -50 Z" fill="#F59E0B" opacity="0.5"/>
      <circle cx="-20" cy="-58" r="4" fill="#F59E0B"/>
      <circle cx="15" cy="-58" r="4" fill="#F59E0B"/>
      <!-- Proteínas (rojo) - derecha -->
      <path d="M 75 -10 A 70 70 0 0 1 50 -55 L 50 0 Z" fill="#DC2626" opacity="0.5"/>
      <ellipse cx="60" cy="-25" rx="6" ry="4" fill="#DC2626"/>
      <!-- Carbohidratos (amarillo) - abajo -->
      <path d="M -55 55 A 70 70 0 0 0 55 55 L 0 50 Z" fill="#FBBF24" opacity="0.5"/>
      <ellipse cx="-25" cy="58" rx="8" ry="3" fill="#FBBF24"/>
      <ellipse cx="20" cy="60" rx="8" ry="3" fill="#FBBF24"/>
    </g>
  </g>'''

podcasts = [
    (1, "Materia y Propiedades", "#22C55E", materia),
    (2, "Mezclas", "#22C55E", mezclas),
    (3, "El Agua", "#22C55E", agua),
    (4, "La Energía", "#3B82F6", energia),
    (5, "Calor y Sonido", "#3B82F6", calor),
    (6, "Movimientos", "#3B82F6", movimientos),
    (7, "Sistema Solar", "#3B82F6", solar),
    (8, "Seres Vivos", "#DC2626", seres),
    (9, "Las Plantas", "#DC2626", plantas),
    (10, "Los Animales", "#DC2626", animales),
    (11, "La Digestión", "#DC2626", digestion),
    (12, "La Circulación", "#DC2626", circulacion),
    (13, "La Respiración", "#DC2626", respiracion),
    (14, "Alimentación Saludable", "#14B8A6", alimentacion),
]

# Nombres de archivo (los que ya están en podcast/index.html)
filenames = {
    1: "materia-propiedades.svg",
    2: "mezclas.svg",
    3: "agua.svg",
    4: "energia.svg",
    5: "calor-sonido.svg",
    6: "movimientos.svg",
    7: "sistema-solar.svg",
    8: "seres-vivos.svg",
    9: "plantas.svg",
    10: "animales.svg",
    11: "digestion.svg",
    12: "circulacion.svg",
    13: "respiracion.svg",
    14: "alimentacion.svg",
}

for n, label, color, content in podcasts:
    fname = filenames[n]
    out_path = os.path.join(OUT_DIR, fname)
    svg = svg_wrapper(content, color, n, label)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(svg)
    print(f"OK: {fname}")

print(f"\n{len(podcasts)} SVGs generados en {OUT_DIR}")
