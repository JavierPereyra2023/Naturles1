# Add sidebar TOC + scroll-spy to candidate pages â€” v3 production version
# Modes: "DRYRUN" (default) prints what would be done; "APPLY" writes the changes.
param(
  [string]$Mode = "DRYRUN",
  [string[]]$Only = @()  # process only these specific files (for testing)
)

$root = 'D:\naturales_1\unidades'

function Get-AccentColor($rel) {
  if ($rel -match 'quimica') { return '#22C55E' }
  if ($rel -match 'biologia') { return '#DC2626' }
  if ($rel -match 'fisica') { return '#3B82F6' }
  return '#3B82F6'
}

function Get-Slug($text) {
  if ($null -eq $text) { return "" }
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

function Replace-First([string]$haystack, [string]$needle, [string]$replacement) {
  $idx = $haystack.IndexOf($needle)
  if ($idx -lt 0) { return $haystack }
  return $haystack.Substring(0, $idx) + $replacement + $haystack.Substring($idx + $needle.Length)
}

# Lista de pÃ¡ginas candidatas (37)
$allCandidates = @(
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

$candidates = @("biologia\celulas\niveles-organizacion.html","biologia\celulas\organelas.html","biologia\celulas\tipos-celulas.html","biologia\ecologia\factores-poblacionales.html","biologia\ecologia\poblaciones.html","biologia\ecologia\relaciones-interespecificas.html","biologia\plantas\estructuras.html","biologia\plantas\fotosintesis.html","biologia\plantas\germinacion.html","biologia\seres-vivos\caracteristicas.html","biologia\seres-vivos\clasificacion.html","biologia\seres-vivos\ecosistemas.html")

$results = @()
$script:totalChanged = 0
foreach ($rel in $candidates) {
  $path = Join-Path $root $rel
  if (-not (Test-Path $path)) {
    $results += [PSCustomObject]@{ File = $rel; Status = 'NOT_FOUND'; N = 0 }
    continue
  }
  $content = Get-Content $path -Raw
  if ($content -match 'data-toc') {
    $results += [PSCustomObject]@{ File = $rel; Status = 'ALREADY_HAS_TOC'; N = 0 }
    continue
  }

  $accent = Get-AccentColor $rel
  $newContent = $content

  # 1) Encontrar las secciones con h2 dentro
  $sectionRegex = [regex]'<section\s[^>]*>'
  $secOpens = [regex]::Matches($newContent, $sectionRegex)
  $sections = @()
  foreach ($m in $secOpens) {
    $openIdx = $m.Index
    $openTag = $m.Value
    $closeIdx = $newContent.IndexOf('</section>', $openIdx + $openTag.Length)
    if ($closeIdx -lt 0) { continue }
    $secHtml = $newContent.Substring($openIdx, $closeIdx - $openIdx + '</section>'.Length)
    $h2Match = [regex]::Match($secHtml, '<h2[^>]*>(.*?)</h2>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if ($h2Match.Success) {
      $rawTitle = $h2Match.Groups[1].Value
      $title = [regex]::Replace($rawTitle, '(?s)<.+?>', '')
      $title = $title.Trim() -replace '\s+', ' '
      $slug = Get-Slug $title
      if ($slug.Length -lt 2) { $slug = "sec-$($sections.Count + 1)" }
      $sections += [PSCustomObject]@{
        OpenIdx = $openIdx
        OpenTag = $openTag
        Title = $title
        Slug = $slug
      }
    }
  }

  if ($sections.Count -lt 2) {
    $results += [PSCustomObject]@{ File = $rel; Status = "TOO_FEW_SECTIONS ($($sections.Count))"; N = 0 }
    continue
  }

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
  for ($i = $sections.Count - 1; $i -ge 0; $i--) {
    $sec = $sections[$i]
    $oldOpen = $sec.OpenTag
    $newOpen = $oldOpen.Substring(0, $oldOpen.Length - 1) + " id=`"$($sec.Slug)`">"
    $newContent = $newContent.Substring(0, $sec.OpenIdx) + $newOpen + $newContent.Substring($sec.OpenIdx + $oldOpen.Length)
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

  # 4) Reemplazar el wrapper del main (o article si no hay main)
  $mainOpenMatch = [regex]::Match($newContent, '<main[^>]*>')
  $useArticle = $false
  if (-not $mainOpenMatch.Success) {
    $mainOpenMatch = [regex]::Match($newContent, '<article[^>]*>')
    $useArticle = $true
  }
  if (-not $mainOpenMatch.Success) {
    $results += [PSCustomObject]@{ File = $rel; Status = 'NO_MAIN_OR_ARTICLE'; N = $sections.Count }
    continue
  }
  $mainOpen = $mainOpenMatch.Value
  $closeTag = if ($useArticle) { '</article>' } else { '</main>' }
  $newMainTag = if ($useArticle) { '<article class="flex-1 min-w-0 space-y-12">' } else { '<main class="flex-1 min-w-0 space-y-12">' }
  $wrapperOpen = '<div class="max-w-4xl mx-auto px-4 md:px-6 py-10 lg:py-14"><div class="lg:flex gap-10">' + "`n" + $tocBlock + $newMainTag
  $newContent = Replace-First $newContent $mainOpen $wrapperOpen
  $idxMainClose = $newContent.IndexOf($closeTag)
  if ($idxMainClose -lt 0) {
    $results += [PSCustomObject]@{ File = $rel; Status = 'NO_CLOSE'; N = $sections.Count }
    continue
  }
  $newContent = $newContent.Substring(0, $idxMainClose) + $closeTag + '</div></div>' + $newContent.Substring($idxMainClose + $closeTag.Length)

  # 5) CSS
  $tocCss = @"

    .toc-link.active { color: $accent; border-left-color: $accent; }
    .toc-link { display: block; font-size: 12px; color: #A8B5AD; padding: 6px 0 6px 12px; border-left: 2px solid transparent; transition: all 0.2s; }
    .toc-link:hover { color: white; }"@
  if ($newContent -notmatch '\.toc-link\s*\.active') {
    $newContent = Replace-First $newContent '</style>' "$tocCss`n  </style>"
  }

  # 6) JS
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
  if ($newContent -notmatch 'data-toc.*sectionObserver|data-toc.*IntersectionObserver') {
    $newContent = Replace-First $newContent '</body>' "$scrollJs</body>"
  }

  if ($Mode -eq 'APPLY') {
    Set-Content -Path $path -Value $newContent -Encoding UTF8 -NoNewline
    $script:totalChanged++
    $results += [PSCustomObject]@{ File = $rel; Status = "WRITTEN"; N = $sections.Count }
  } else {
    $results += [PSCustomObject]@{ File = $rel; Status = "DRYRUN ($($sections.Count) sec, accent=$accent)"; N = $sections.Count }
  }
}

Write-Output "=== MODO: $Mode ==="
$results | Format-Table -AutoSize -Wrap
Write-Output "`nTotal procesado: $($results.Count) | Cambios aplicados: $script:totalChanged"
