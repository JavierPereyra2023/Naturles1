# Audit: find pages that need a sidebar TOC
$root = 'D:\naturales_1\unidades'
$pages = Get-ChildItem -Path $root -Recurse -File -Filter '*.html' | Where-Object {
  $_.DirectoryName -notlike '*\podcast*' -and $_.DirectoryName -notlike '*\revista*'
} | Select-Object -ExpandProperty FullName

$withToc = @()
$noToc = @()
foreach ($p in $pages) {
  $content = Get-Content $p -Raw
  $hasToc = $content -match 'class="[^"]*toc-link[^"]*"' -or $content -match 'data-toc'
  $rel = $p.Substring($root.Length + 1)
  $isIndexHub = ($rel -like '*\index.html' -or $rel -eq 'index.html')
  $sectionCount = ([regex]::Matches($content, '<section\s')).Count
  if ($hasToc) { $withToc += "$rel ($sectionCount sec)" }
  elseif ($isIndexHub) { }
  elseif ($sectionCount -lt 2) { }
  else { $noToc += "$rel ($sectionCount sec)" }
}

Write-Output "=== YA TIENEN TOC (no tocar): $($withToc.Count) ==="
$withToc | Sort-Object | ForEach-Object { Write-Output "  $_" }
Write-Output ""
Write-Output "=== CANDIDATAS A AGREGAR TOC: $($noToc.Count) ==="
$noToc | Sort-Object | ForEach-Object { Write-Output "  $_" }
