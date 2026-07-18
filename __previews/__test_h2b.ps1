$html = "  <span class='test'>1</span> ¿Por qué? "

# Test 1: <[^>]+>
$c1 = [regex]::Replace($html, '<[^>]+>', '')
Write-Output "Test 1: [$c1]"

# Test 2: <.*?> with Singleline option
$c2 = [regex]::Replace($html, '<.*?>', '', [System.Text.RegularExpressions.RegexOptions]::Singleline)
Write-Output "Test 2: [$c2]"

# Test 3: with DotAll
$c3 = [regex]::Replace($html, '(?s)<.*?>', '')
Write-Output "Test 3: [$c3]"

# Test 4: combined
$c4 = [regex]::Replace($html, '<[^>]*?>', '')
Write-Output "Test 4: [$c4]"
