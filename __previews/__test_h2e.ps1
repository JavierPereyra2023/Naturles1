$html = "<span class='test'>1</span> holamundo"

# Greedy
$c1 = $html -replace '(?s)<.+>', ''
Write-Output "Greedy (?s)<.+>: [$c1]"

# Greedy sin flag
$c2 = $html -replace '<.+>', ''
Write-Output "Greedy <.+>: [$c2]"

# Greedy .*
$c3 = $html -replace '(?s)<.*>', ''
Write-Output "Greedy (?s)<.*>: [$c3]"
