# Add sidebar TOC + scroll-spy to candidate pages
# Idempotent: skips pages that already have it
$root = 'D:\naturales_1\unidades'

# Color por unidad (basado en el bg-XXX del body)
function Get-AccentColor($path) {
  if ($path -match '\\quimica\\') { return '#22C55E' }
  if ($path -match '\\biologia\\') { return '#DC2626' }
  if ($path -match '\\fisica\\') { return '#3B82F6' }
  return '#3B82F6'
}

# Slugify: lowercase, sin acentos, sin caracteres especiales, guiones
function Get-Slug($text) {
  $t = $text.ToLower()
  $t = $t -replace '[Ã¡Ã Ã¤Ã¢Ã£]', 'a'
  $t = $t -replace '[Ã©Ã¨Ã«Ãª]', 'e'
  $t = $t -replace '[Ã­Ã¬Ã¯Ã®]', 'i'
  $t = $t -replace '[Ã³Ã²Ã¶Ã´Ãµ]', 'o'
  $t = $t -replace '[ÃºÃ¹Ã¼Ã»]', 'u'
  $t = $t -replace '[Ã±]', 'n'
  $t = $t -replace 'Â¿', ''
  $t = $t -replace '\?', ''
  $t = $t -replace '[^a-z0-9\s-]', ''
  $t = $t -replace '\s+', '-'
  $t = $t -replace '-+', '-'
  $t = $t.Trim('-')
  return $t
}

# Lista de pÃ¡ginas candidatas (las 37)
$candidates = @("quimica\agua\potabilizacion.html"
  'biologia\animales\alimentacion.html',
  'biologia\animales\fauna-local.html',
  'biologia\animales\invertebrados.html',
  'biologia\animales\vertebrados.html',
  'biologia\celulas\niveles-organizacion.html',
  'biologia\celulas\organelas.html',
  'biologia\celulas\tipos-celulas.html',
  'biologia\cuerpo-humano\alimentacion.html',
  'biologia\cuerpo-humano\circulacion.html',
  'biologia\cuerpo-humano\digestion.html',
  'biologia\cuerpo-humano\endocrino.html',
  'biologia\cuerpo-humano\esqueleto.html',
  'biologia\cuerpo-humano\musculos.html',
  'biologia\cuerpo-humano\nervioso.html',
  'biologia\cuerpo-humano\pancreas.html',
  'biologia\cuerpo-humano\reproductor.html',
  'biologia\cuerpo-humano\respiracion.html',
  'biologia\cuerpo-humano\rinones.html',
  'biologia\cuerpo-humano\urinario.html',
  'biologia\ecologia\factores-poblacionales.html',
  'biologia\ecologia\poblaciones.html',
  'biologia\ecologia\relaciones-interespecificas.html',
  'biologia\plantas\estructuras.html',
  'biologia\plantas\fotosintesis.html',
  'biologia\plantas\germinacion.html',
  'biologia\seres-vivos\caracteristicas.html',
  'biologia\seres-vivos\clasificacion.html',
  'biologia\seres-vivos\ecosistemas.html',
  'fisica\calor-sonido\calor-temperatura.html',
  'fisica\calor-sonido\luz.html',
  'fisica\calor-sonido\materiales.html',
  'fisica\calor-sonido\ondas.html',
  'fisica\calor-sonido\sonido.html',
  'fisica\energia\formas-energia.html',
  'fisica\energia\fuentes-energia.html',
  'fisica\energia\transformaciones.html',
  'quimica\agua\potabilizacion.html'
)

$results = @()
foreach ($rel in $candidates) {
  $path = Join-Path $root $rel
  if (-not (Test-Path $path)) {
    $results += [PSCustomObject]@{ File = $rel; Status = 'NOT_FOUND' }
    continue
  }
  $content = Get-Content $path -Raw
  if ($content -match 'data-toc') {
    $results += [PSCustomObject]@{ File = $rel; Status = 'ALREADY_HAS_TOC' }
    continue
  }

  $accent = Get-AccentColor $rel

  # 1) Encontrar todas las secciones con h2 adentro y extraer (title, slug, sectionStart, sectionEnd)
  # Estrategia: regex que capture cada <section ...> ... </section> y encuentre el primer h2
  $sectionRegex = [regex]'<section\s[^>]*>(.*?)</section>'
  $matches = [regex]::Matches($content, $sectionRegex, [System.Text.RegularExpressions.RegexOptions]::Singleline)
  $sections = @()
  foreach ($m in $matches) {
    $secHtml = $m.Groups[1].Value
    $h2Match = [regex]::Match($secHtml, '<h2[^>]*>(.*?)</h2>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if ($h2Match.Success) {
      $rawTitle = $h2Match.Groups[1].Value
      # Limpiar el HTML interno del h2 (quitar spans, etc.)
      $title = [regex]::Replace($rawTitle, '<[^>]+>', '')
      $title = $title.Trim() -replace '\s+', ' '
      $slug = Get-Slug $title
      if ($slug.Length -lt 2) { $slug = "sec-$($sections.Count + 1)" }
      $sections += [PSCustomObject]@{
        Index = $m.Index
        Length = $m.Length
        Title = $title
        Slug = $slug
        OpeningTag = $m.Value.Substring(0, $m.Value.IndexOf('>') + 1)
      }
    }
  }

  if ($sections.Count -lt 2) {
    $results += [PSCustomObject]@{ File = $rel; Status = "TOO_FEW_SECTIONS ($($sections.Count))" }
    continue
  }

  # Asegurar slugs Ãºnicos
  $usedSlugs = @{}
  foreach ($s in $sections) {
    $base = $s.Slug
    $i = 1
    while ($usedSlugs.ContainsKey($s.Slug)) {
      $s.Slug = "$base-$i"
      $i++
    }
    $usedSlugs[$s.Slug] = $true
  }

  # 2) Insertar id="slug" en cada apertura de secciÃ³n
  $newContent = $content
  # Procesar en orden inverso para no romper Ã­ndices
  for ($i = $sections.Count - 1; $i -ge 0; $i--) {
    $sec = $sections[$i]
    $oldOpen = $sec.OpeningTag
    $newOpen = $oldOpen.Substring(0, $oldOpen.Length - 1) + " id=`"$($sec.Slug)`">"
    $newContent = $newContent.Substring(0, $sec.Index) + $newOpen + $newContent.Substring($sec.Index + $oldOpen.Length)
  }

  # 3) Construir el bloque del sidebar TOC
  $tocItems = ""
  $n = 0
  foreach ($s in $sections) {
    $n++
    $labelNum = $n.ToString("D2")
    $active = if ($n -eq 1) { " active" } else { "" }
    $tocItems += "`n          <a href=""#$($s.Slug)"" class=""toc-link$active"" data-toc>$labelNum. $($s.Title)</a>"
  }
  $tocBlock = @"
  <!-- SIDEBAR TOC -->
  <aside class="hidden lg:block w-52 flex-shrink-0">
    <div class="sticky top-24">
      <h3 class="text-[11px] font-bold uppercase tracking-[0.2em] text-natura-silverDark mb-4" style="font-family: 'Inter', sans-serif;">En esta pagina</h3>
      <nav class="space-y-0.5">$tocItems
      </nav>
    </div>
  </aside>

"@

  # 4) Reemplazar el wrapper del main: convertir `<main class="...">CONTENIDO</main>` a `<div class="max-w-4xl mx-auto px-4 md:px-6 py-10 lg:py-14"><div class="lg:flex gap-10">$tocBlock<main class="flex-1 min-w-0 space-y-12">CONTENIDO</main></div></div>`
  $mainOpenMatch = [regex]::Match($newContent, '<main[^>]*>')
  if (-not $mainOpenMatch.Success) {
    $results += [PSCustomObject]@{ File = $rel; Status = 'NO_MAIN_FOUND' }
    continue
  }
  $mainOpen = $mainOpenMatch.Value
  $wrapperOpen = '<div class="max-w-4xl mx-auto px-4 md:px-6 py-10 lg:py-14"><div class="lg:flex gap-10">' + "`n" + $tocBlock + '<main class="flex-1 min-w-0 space-y-12">'
  $newContent = $newContent.Replace($mainOpen, $wrapperOpen, 1)
  # Reemplazar el primer </main>
  $idxMainClose = $newContent.IndexOf('</main>')
  if ($idxMainClose -lt 0) {
    $results += [PSCustomObject]@{ File = $rel; Status = 'NO_MAIN_CLOSE' }
    continue
  }
  $newContent = $newContent.Substring(0, $idxMainClose) + '</main></div></div>' + $newContent.Substring($idxMainClose + '</main>'.Length)

  # 5) Insertar CSS .toc-link en el <style> (si no existe)
  $tocCss = @"

    .toc-link.active { color: $accent; border-left-color: $accent; }
    .toc-link { display: block; font-size: 12px; color: #A8B5AD; padding: 6px 0 6px 12px; border-left: 2px solid transparent; transition: all 0.2s; }
    .toc-link:hover { color: white; }"@
  if ($newContent -notmatch '\.toc-link\s*\.active') {
    $newContent = $newContent.Replace('</style>', $tocCss + "`n  </style>", 1)
  }

  # 6) Insertar JS scroll-spy antes de </body> (si no existe)
  $scrollJs = @"

<script>
  document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('[data-toc]');
    var sections = document.querySelectorAll('section[id]');
    if (!links.length || !sections.length) return;
    var sectionObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          links.forEach(function(link){
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -40% 0px' });
    sections.forEach(function(s){ sectionObserver.observe(s); });

    // Smooth scroll al hacer click
    links.forEach(function(link){
      link.addEventListener('click', function(e){
        var href = link.getAttribute('href');
        if (href && href.charAt(0) === '#') {
          var target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.pushState(null, '', href);
          }
        }
      });
    });
  });
</script>
"@
  if ($newContent -notmatch 'data-toc.*IntersectionObserver|data-toc.*sectionObserver') {
    $newContent = $newContent.Replace('</body>', $scrollJs + "</body>", 1)
  }

  # Guardar
  Set-Content -Path $path -Value $newContent -Encoding UTF8 -NoNewline
  $results += [PSCustomObject]@{ File = $rel; Status = "OK ($($sections.Count) sections, accent=$accent)" }
}

$results | Format-Table -AutoSize -Wrap
