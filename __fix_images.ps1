# Script para reemplazar imágenes externas de NASA con gradientes CSS temáticos
# Mantiene la identidad visual pero elimina la dependencia de NASA Image Library

$rootPath = "D:\Naturales_1"

# Gradientes temáticos por página (start, end)
$gradients = @{
    'tecnologia-espacial' = @('#1E3A8A', '#0E7490')  # azul oscuro a cyan
    'falcon-9' = @('#0F172A', '#1E40AF')               # slate a azul
    'falcon-heavy' = @('#1E293B', '#0C4A6E')           # slate oscuro a azul cielo
    'starship' = @('#0C4A6E', '#0F172A')               # azul cielo a slate
    'hubble' = @('#581C87', '#1E3A8A')                 # púrpura a azul
    'webb' = @('#92400E', '#7C2D12')                   # ámbar a rojo oscuro
    'ligo' = @('#0E7490', '#1E40AF')                   # teal a azul
    'radiotelescopios' = @('#5B21B6', '#1E3A8A')        # violeta a azul
}

$files = Get-ChildItem -Path "$rootPath\unidades\fisica\sistema-solar" -Filter "*.html" -ErrorAction SilentlyContinue
$count = 0
$errors = 0

foreach ($file in $files) {
    $baseName = $file.BaseName
    if (-not $gradients.ContainsKey($baseName)) { continue }

    $startColor = $gradients[$baseName][0]
    $endColor = $gradients[$baseName][1]
    $gradient = "linear-gradient(135deg, $startColor 0%, $endColor 100%)"

    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8

    # Reemplazar la imagen del hero
    $heroPattern = '<div class="absolute inset-0 opacity-\[0\.[0-9]+\]">\s*<img src="https://images-assets\.nasa\.gov/[^"]+" alt="[^"]*" class="w-full h-full object-cover" style="filter: [^"]+">\s*</div>'

    $heroReplacement = "<div class=""absolute inset-0 opacity-[0.55]"" style=""background: $gradient;""></div>"

    $newContent = $content -replace $heroPattern, $heroReplacement

    # Reemplazar las imágenes de las cards
    $cardPattern = '<img src="https://images-assets\.nasa\.gov/[^"]+" alt="[^"]*" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">'
    $cardReplacement = "<div class=""w-full h-full group-hover:scale-105 transition-transform duration-500"" style=""background: $gradient;""></div>"
    $newContent = $newContent -replace $cardPattern, $cardReplacement

    if ($newContent -ne $content) {
        try {
            Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
            $count++
            Write-Host "OK  $baseName"
        } catch {
            Write-Host "FAIL  $baseName  - $_"
            $errors++
        }
    } else {
        Write-Host "NO MATCH  $baseName"
    }
}

Write-Host ""
Write-Host "Procesados: $count"
Write-Host "Errores: $errors"
