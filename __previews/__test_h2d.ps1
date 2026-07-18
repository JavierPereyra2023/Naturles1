$html = "<span class='test'>1</span> holamundo"

# Regex con flag inline (?s) para que . matchee saltos de linea
$c1 = $html -replace '(?s)<.+?>', ''
Write-Output "Test inline (?s): [$c1]"

# Regex con DotAll
$c2 = [regex]::Replace($html, '<.+?>', '', [System.Text.RegularExpressions.RegexOptions]::Singleline)
Write-Output "Test con Singleline: [$c2]"
