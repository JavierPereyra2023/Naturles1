# Replace picsum URLs with local asset paths in HTML files
$replacements = @{
    # Sistema solar
    'picsum.photos/seed/solar-system-hub/1920/600.jpg'   = '../../../assets/fisica/sistema-solar/solar-system-hub.jpg'
    'picsum.photos/seed/solar-planets/600/400.jpg'       = '../../../assets/fisica/sistema-solar/sapiens-planets.jpg'
    'picsum.photos/seed/earth-moon/600/400.jpg'          = '../../../assets/fisica/sistema-solar/earth-moon-phase.jpg'
    'picsum.photos/seed/space-exploration/600/400.jpg'   = '../../../assets/fisica/sistema-solar/astronaut-moon.jpg'
    'picsum.photos/seed/mapi-project/600/400.jpg'        = '../../../assets/fisica/sistema-solar/mapi-table.jpg'
    'picsum.photos/seed/sun-planets-hero/1920/600.jpg'   = '../../../assets/fisica/sistema-solar/sun-surface.jpg'
    'picsum.photos/seed/earth-moon-hero/1920/600.jpg'    = '../../../assets/fisica/sistema-solar/earth-moon-real.jpg'
    'picsum.photos/seed/space-telescope/1920/600.jpg'    = '../../../assets/fisica/sistema-solar/hubble-telescope.jpg'
    'picsum.photos/seed/model-solar/1920/600.jpg'        = '../../../assets/fisica/sistema-solar/mapi-table.jpg'

    # Movimientos
    'picsum.photos/seed/motion-hero/1920/600.jpg'        = '../../assets/fisica/movimientos/motion-hero.jpg'
    'picsum.photos/seed/motion-mru/600/400.jpg'          = '../../assets/fisica/movimientos/motion-mru.jpg'
    'picsum.photos/seed/motion-mruv/600/400.jpg'         = '../../assets/fisica/movimientos/motion-mruv.jpg'
    'picsum.photos/seed/motion-graphs/600/400.jpg'       = '../../assets/fisica/movimientos/xy-graph.jpg'
    'picsum.photos/seed/linear-motion/1920/600.jpg'      = '../../assets/fisica/movimientos/linear-motion.jpg'
    'picsum.photos/seed/accelerated-motion/1920/600.jpg' = '../../assets/fisica/movimientos/falling-apple.jpg'
    'picsum.photos/seed/graphs-motion/1920/600.jpg'      = '../../assets/fisica/movimientos/xy-graph.jpg'

    # Biología - heroes
    'picsum.photos/seed/biology-cells/1920/600.jpg'      = '../../assets/biologia/biodiversity-hero.jpg'
    'picsum.photos/seed/living-beings-bio/600/400.jpg'   = '../assets/biologia/seres-vivos/forest-ecosystem.jpg'
    'picsum.photos/seed/plants-bio/600/400.jpg'          = '../assets/biologia/plantas/rainforest.jpg'
    'picsum.photos/seed/animals-bio/600/400.jpg'         = '../assets/biologia/animales/lion.jpg'
    'picsum.photos/seed/human-body-bio/1920/600.jpg'     = '../assets/biologia/cuerpo-humano/skeleton-anatomy.jpg'
    'picsum.photos/seed/human-body-bio/600/400.jpg'      = '../assets/biologia/cuerpo-humano/skeleton-anatomy.jpg'
    'picsum.photos/seed/animals-bio/1920/600.jpg'        = '../assets/biologia/animales/lion.jpg'
    'picsum.photos/seed/vertebrates-hero/1920/600.jpg'   = '../assets/biologia/animales/jaguar.jpg'

    # Cuerpo humano cards
    'picsum.photos/seed/digestion-bio/600/400.jpg'       = '../assets/biologia/cuerpo-humano/digestive-anatomy.jpg'
    'picsum.photos/seed/heart-bio/600/400.jpg'           = '../assets/biologia/cuerpo-humano/heart-anatomy.jpg'
    'picsum.photos/seed/lungs-bio/600/400.jpg'           = '../assets/biologia/cuerpo-humano/lungs-anatomy.jpg'
    'picsum.photos/seed/healthy-food-bio/600/400.jpg'    = '../assets/biologia/cuerpo-humano/healthy-food.jpg'
    'picsum.photos/seed/endocrine-bio/600/400.jpg'      = '../assets/biologia/cuerpo-humano/endocrine-anatomy.jpg'
    'picsum.photos/seed/muscles-bio/600/400.jpg'         = '../assets/biologia/cuerpo-humano/muscles-anatomy.jpg'
    'picsum.photos/seed/skeleton-bio/600/400.jpg'        = '../assets/biologia/cuerpo-humano/skeleton-anatomy.jpg'
    'picsum.photos/seed/kidneys-bio/600/400.jpg'         = '../assets/biologia/cuerpo-humano/kidney-anatomy.jpg'
    'picsum.photos/seed/pancreas-bio/600/400.jpg'        = '../assets/biologia/cuerpo-humano/pancreas-microscope.jpg'
    'picsum.photos/seed/urinary-bio/600/400.jpg'         = '../assets/biologia/cuerpo-humano/nephron-microscope.jpg'

    # Cuerpo humano heroes
    'picsum.photos/seed/digestion-bio/1920/600.jpg'       = '../assets/biologia/cuerpo-humano/digestive-anatomy.jpg'
    'picsum.photos/seed/heart-bio/1920/600.jpg'           = '../assets/biologia/cuerpo-humano/heart-anatomy.jpg'
    'picsum.photos/seed/lungs-bio/1920/600.jpg'           = '../assets/biologia/cuerpo-humano/lungs-anatomy.jpg'
    'picsum.photos/seed/healthy-food-bio/1920/600.jpg'    = '../assets/biologia/cuerpo-humano/healthy-food.jpg'
    'picsum.photos/seed/endocrine-bio/1920/600.jpg'      = '../assets/biologia/cuerpo-humano/endocrine-anatomy.jpg'
    'picsum.photos/seed/muscles-bio/1920/600.jpg'         = '../assets/biologia/cuerpo-humano/muscles-anatomy.jpg'
    'picsum.photos/seed/skeleton-bio/1920/600.jpg'        = '../assets/biologia/cuerpo-humano/skeleton-anatomy.jpg'
    'picsum.photos/seed/kidneys-bio/1920/600.jpg'         = '../assets/biologia/cuerpo-humano/kidney-anatomy.jpg'
    'picsum.photos/seed/pancreas-bio/1920/600.jpg'        = '../assets/biologia/cuerpo-humano/pancreas-microscope.jpg'
    'picsum.photos/seed/urinary-bio/1920/600.jpg'         = '../assets/biologia/cuerpo-humano/nephron-microscope.jpg'

    # Plantas cards
    'picsum.photos/seed/photosynthesis-card/600/400.jpg' = '../assets/biologia/plantas/leaf-stomata.jpg'
    'picsum.photos/seed/plant-structures-card/600/400.jpg' = '../assets/biologia/plantas/tree-sunlight.jpg'
    'picsum.photos/seed/germination-card/600/400.jpg'    = '../assets/biologia/plantas/seed-germinating.jpg'

    # Animales cards
    'picsum.photos/seed/animal-feeding/600/400.jpg'      = '../assets/biologia/animales/lion.jpg'
    'picsum.photos/seed/vertebrates/600/400.jpg'         = '../assets/biologia/animales/jaguar.jpg'
    'picsum.photos/seed/invertebrates/600/400.jpg'       = '../assets/biologia/animales/butterfly.jpg'
    'picsum.photos/seed/local-fauna/600/400.jpg'         = '../assets/biologia/animales/fauna-argentina.jpg'
}

# Get all HTML files in priority directories
$files = @(
    Get-ChildItem -Path "D:\naturales_1\unidades\biologia" -Recurse -Filter "*.html" | Select-Object -ExpandProperty FullName
    Get-ChildItem -Path "D:\naturales_1\unidades\fisica" -Recurse -Filter "*.html" | Select-Object -ExpandProperty FullName
)

$total = 0
foreach ($file in $files) {
    $content = Get-Content -Path $file -Raw -Encoding UTF8
    $original = $content
    $fileCount = 0

    foreach ($key in $replacements.Keys) {
        $value = $replacements[$key]
        if ($content -match [regex]::Escape($key)) {
            $content = $content.Replace("https://$key", $value)
            $fileCount += ([regex]::Matches($original, [regex]::Escape($key))).Count
        }
    }

    if ($content -ne $original) {
        Set-Content -Path $file -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Updated: $file - $fileCount replacements"
        $total += $fileCount
    }
}
Write-Host "`nTotal replacements: $total"
