# Fix incorrect relative paths in HTML files
# Re-derive correct path for any file in unidades/*

$assetRoot = "D:\naturales_1\assets"

$files = @(
    Get-ChildItem -Path "D:\naturales_1\unidades" -Recurse -Filter "*.html" | Select-Object -ExpandProperty FullName
)

$total = 0
foreach ($file in $files) {
    $content = Get-Content -Path $file -Raw -Encoding UTF8
    $original = $content
    $fileCount = 0

    # Calculate relative path manually
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
    $relToAssets = ('..\' * $upCount + ($downParts -join '\')).Replace('\', '/').TrimEnd('/')

    # Find any path like "X/assets/..." and replace prefix with the correct relToAssets
    # The current pattern: anything like ../assets/, ../../assets/, ../../../assets/, etc.
    $content = [regex]::Replace($content, '(\.\./)+assets/', "$relToAssets/")
    $content = [regex]::Replace($content, '^\.\./assets/', "$relToAssets/")

    if ($content -ne $original) {
        Set-Content -Path $file -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Fixed: $file"
        $total++
    }
}
Write-Host "`nTotal files fixed: $total"
