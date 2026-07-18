param(
  [string]$Root = (Split-Path -Parent $MyInvocation.MyCommand.Path),
  [string]$Output = "AUDITORIA_SITIO.md"
)

$ErrorActionPreference = "Stop"
$htmlFiles = Get-ChildItem -LiteralPath $Root -Recurse -Filter *.html |
  Where-Object { $_.FullName -notmatch '[\\/]output[\\/]' }
$rows = [System.Collections.Generic.List[object]]::new()
$broken = [System.Collections.Generic.List[object]]::new()

foreach ($file in $htmlFiles) {
  $text = Get-Content -LiteralPath $file.FullName -Raw -Encoding UTF8
  $relative = $file.FullName.Substring($Root.TrimEnd('\').Length + 1).Replace('\', '/')
  $imgMatches = [regex]::Matches($text, '<img\b[^>]*>', 'IgnoreCase')
  $missingAlt = 0
  foreach ($img in $imgMatches) {
    if ($img.Value -notmatch '\balt\s*=\s*["''][^"'']+["'']') { $missingAlt++ }
  }

  $localRefs = [regex]::Matches($text, '(?:src|href)\s*=\s*["'']([^"''#?]+)["'']', 'IgnoreCase')
  foreach ($match in $localRefs) {
    $ref = $match.Groups[1].Value
    if ($ref -match '^(?:https?:|data:|mailto:|tel:|javascript:|//)') { continue }
    $decoded = [Uri]::UnescapeDataString($ref)
    $target = [IO.Path]::GetFullPath((Join-Path $file.DirectoryName $decoded))
    if (-not (Test-Path -LiteralPath $target)) {
      $broken.Add([pscustomobject]@{ Page = $relative; Reference = $ref })
    }
  }

  $priority = 0
  $notes = [System.Collections.Generic.List[string]]::new()
  if ($imgMatches.Count -eq 0 -and $text.Length -gt 12000) { $priority += 3; $notes.Add('Página extensa sin imágenes') }
  elseif ($imgMatches.Count -eq 0) { $priority += 2; $notes.Add('Sin imágenes') }
  elseif ($imgMatches.Count -eq 1 -and $text.Length -gt 25000) { $priority += 1; $notes.Add('Contenido extenso con una sola imagen') }
  if ($missingAlt -gt 0) { $priority += 2; $notes.Add("$missingAlt imagen(es) sin alt útil") }
  if ($text -match '[\u00C2\u00C3].|\u00E2\u20AC|\u00F0\u0178') { $priority += 3; $notes.Add('Posible texto mal codificado') }
  if ($text -match 'MathJax' -and $text -notmatch '\\\(|\$\$|\\\[') { $priority += 1; $notes.Add('MathJax cargado sin fórmulas detectables') }

  $rows.Add([pscustomobject]@{
    Page = $relative
    Images = $imgMatches.Count
    MissingAlt = $missingAlt
    Score = $priority
    Notes = ($notes -join '; ')
  })
}

$ranked = $rows | Sort-Object -Property @{Expression='Score'; Descending=$true}, @{Expression='Page'; Descending=$false}
$lines = [System.Collections.Generic.List[string]]::new()
$lines.Add('# Auditoría automática del sitio')
$lines.Add('')
$lines.Add("Generada: $(Get-Date -Format 'yyyy-MM-dd HH:mm')")
$lines.Add('')
$lines.Add('## Resumen')
$lines.Add('')
$lines.Add("- Páginas HTML: $($rows.Count)")
$lines.Add("- Referencias locales rotas: $($broken.Count)")
$lines.Add("- Páginas sin imágenes: $(($rows | Where-Object Images -eq 0).Count)")
$lines.Add("- Imágenes sin texto alternativo útil: $(($rows | Measure-Object MissingAlt -Sum).Sum)")
$lines.Add("- Páginas con prioridad alta: $(($rows | Where-Object Score -ge 3).Count)")
$lines.Add('')
$lines.Add('## Prioridades')
$lines.Add('')
$lines.Add('| Prioridad | Página | Imágenes | Observaciones |')
$lines.Add('|---:|---|---:|---|')
foreach ($row in $ranked) {
  if ($row.Score -eq 0) { continue }
  $safeNotes = $row.Notes.Replace('|', '\|')
  $lines.Add("| $($row.Score) | ``$($row.Page)`` | $($row.Images) | $safeNotes |")
}
$lines.Add('')
$lines.Add('## Referencias rotas')
$lines.Add('')
if ($broken.Count -eq 0) {
  $lines.Add('No se detectaron referencias locales rotas.')
} else {
  $lines.Add('| Página | Referencia |')
  $lines.Add('|---|---|')
  foreach ($item in $broken) { $lines.Add("| ``$($item.Page)`` | ``$($item.Reference)`` |") }
}
$lines.Add('')
$lines.Add('## Criterio de prioridad')
$lines.Add('')
$lines.Add('- 3 puntos: página extensa sin imágenes o posible problema de codificación.')
$lines.Add('- 2 puntos: página sin imágenes o imágenes sin texto alternativo.')
$lines.Add('- 1 punto: página extensa con una sola imagen o MathJax aparentemente innecesario.')

$outputPath = Join-Path $Root $Output
[IO.File]::WriteAllLines($outputPath, $lines, [Text.UTF8Encoding]::new($false))
Write-Host "Informe generado: $outputPath"
Write-Host "Páginas: $($rows.Count) | Rutas rotas: $($broken.Count) | Prioridad alta: $(($rows | Where-Object Score -ge 3).Count)"
