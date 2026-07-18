$html = "<span class='test'>1</span> holamundo"

# Test 1
$c1 = [regex]::Replace($html, '<[^>]+>', '')
Write-Output "Test 1: [$c1]"

# Test 2 con regex
$pattern = "<.*?>"
$regex = New-Object System.Text.RegularExpressions.Regex $pattern, ([System.Text.RegularExpressions.RegexOptions]::Singleline)
$c2 = $regex.Replace($html, '')
Write-Output "Test 2: [$c2]"

# Test 3 (reemplaza TODO incluyendo contenido)
$c3 = $html -replace '<.*?>', ''
Write-Output "Test 3: [$c3]"

# Test 4 sin lazy
$c4 = $html -replace '<[^>]*>', ''
Write-Output "Test 4: [$c4]"
