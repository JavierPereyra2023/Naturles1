# Replace picsum URLs with local asset paths - using ABSOLUTE-style relative paths
# Compute correct path per file

$projectRoot = "D:\naturales_1"
$assetRoot = "D:\naturales_1\assets"

# Mapping of seed -> asset relative path
$replacements = @{
    'seed/solar-system-hub'   = 'fisica/sistema-solar/solar-system-hub.jpg'
    'seed/solar-planets'       = 'fisica/sistema-solar/mapi-diorama.jpg'
    'seed/earth-moon'          = 'fisica/sistema-solar/earth-moon-phase.jpg'
    'seed/space-exploration'   = 'fisica/sistema-solar/astronaut-moon.jpg'
    'seed/mapi-project'        = 'fisica/sistema-solar/mapi-table.jpg'
    'seed/sun-planets-hero'    = 'fisica/sistema-solar/sun-surface.jpg'
    'seed/earth-moon-hero'     = 'fisica/sistema-solar/earth-moon-real.jpg'
    'seed/space-telescope'     = 'fisica/sistema-solar/hubble-telescope.jpg'
    'seed/model-solar'         = 'fisica/sistema-solar/mapi-table.jpg'

    'seed/motion-hero'         = 'fisica/movimientos/motion-hero.jpg'
    'seed/motion-mru'          = 'fisica/movimientos/motion-mru.jpg'
    'seed/motion-mruv'         = 'fisica/movimientos/motion-mruv.jpg'
    'seed/motion-graphs'       = 'fisica/movimientos/xy-graph.jpg'
    'seed/linear-motion'       = 'fisica/movimientos/linear-motion.jpg'
    'seed/accelerated-motion'  = 'fisica/movimientos/falling-apple.jpg'
    'seed/graphs-motion'       = 'fisica/movimientos/xy-graph.jpg'

    'seed/biology-cells'       = 'biologia/biodiversity-hero.jpg'
    'seed/living-beings-bio'   = 'biologia/seres-vivos/forest-ecosystem.jpg'
    'seed/plants-bio'          = 'biologia/plantas/rainforest.jpg'
    'seed/animals-bio'         = 'biologia/animales/lion.jpg'
    'seed/human-body-bio'      = 'biologia/cuerpo-humano/skeleton-anatomy.jpg'
    'seed/vertebrates-hero'    = 'biologia/animales/jaguar.jpg'

    'seed/digestion-bio'       = 'biologia/cuerpo-humano/digestive-anatomy.jpg'
    'seed/heart-bio'           = 'biologia/cuerpo-humano/heart-anatomy.jpg'
    'seed/lungs-bio'           = 'biologia/cuerpo-humano/lungs-anatomy.jpg'
    'seed/healthy-food-bio'    = 'biologia/cuerpo-humano/healthy-food.jpg'
    'seed/endocrine-bio'       = 'biologia/cuerpo-humano/endocrine-anatomy.jpg'
    'seed/muscles-bio'         = 'biologia/cuerpo-humano/muscles-anatomy.jpg'
    'seed/skeleton-bio'        = 'biologia/cuerpo-humano/skeleton-anatomy.jpg'
    'seed/kidneys-bio'         = 'biologia/cuerpo-humano/kidney-anatomy.jpg'
    'seed/pancreas-bio'        = 'biologia/cuerpo-humano/pancreas-microscope.jpg'
    'seed/urinary-bio'         = 'biologia/cuerpo-humano/nephron-microscope.jpg'

    'seed/photosynthesis-card' = 'biologia/plantas/leaf-stomata.jpg'
    'seed/plant-structures-card' = 'biologia/plantas/tree-sunlight.jpg'
    'seed/germination-card'    = 'biologia/plantas/seed-germinating.jpg'

    'seed/animal-feeding'      = 'biologia/animales/lion.jpg'
    'seed/vertebrates'         = 'biologia/animales/jaguar.jpg'
    'seed/invertebrates'       = 'biologia/animales/butterfly.jpg'
    'seed/local-fauna'         = 'biologia/animales/fauna-argentina.jpg'
}

# Get all HTML files in priority directories
$files = @(
    Get-ChildItem -Path "D:\naturales_1\unidades" -Recurse -Filter "*.html" | Select-Object -ExpandProperty FullName
)

$total = 0
foreach ($file in $files) {
    $content = Get-Content -Path $file -Raw -Encoding UTF8
    $original = $content
    $fileCount = 0

    # Calculate relative path from file dir to assets/ manually
    $fileDir = Split-Path -Path $file -Parent
    $from = $fileDir
    $to = $assetRoot
    $fromParts = $from.Split('\')
    $toParts = $to.Split('\')
    $common = 0
    while ($common -lt $fromParts.Length -and $common -lt $toParts.Length -and $fromParts[$common] -eq $toParts[$common]) {
        $common++
    }
    $upCount = $fromParts.Length - $common
    $downParts = $toParts[$common..($toParts.Length - 1)]
    $relToAssets = ('..\' * $upCount + ($downParts -join '\'))
    $relToAssets = $relToAssets.TrimEnd('\').Replace('\', '/')

    foreach ($key in $replacements.Keys) {
        $relAsset = $replacements[$key]
        $targetPath = "$relToAssets/$relAsset"

        # Find URL like https://picsum.photos/seed/{key}/... and replace
        $pattern = "https://picsum\.photos/" + [regex]::Escape($key) + "/[0-9/.x]+"
        $matches = [regex]::Matches($content, $pattern)
        if ($matches.Count -gt 0) {
            $content = [regex]::Replace($content, $pattern, $targetPath)
            $fileCount += $matches.Count
        }
    }

    if ($content -ne $original) {
        Set-Content -Path $file -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Updated: $file - $fileCount replacements"
        $total += $fileCount
    }
}
Write-Host "`nTotal replacements: $total"
