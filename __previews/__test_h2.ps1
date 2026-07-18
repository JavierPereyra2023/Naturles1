$html = @"
<section>
  <h2 class='section-heading text-3xl mb-5 flex items-center gap-3'>
    <span class='w-8 h-8 rounded-lg bg-natura-leaf flex items-center justify-center text-natura-black font-ui text-sm font-bold'>1</span> ¿Por qué potabilizar? </h2>
</section>
"@

$match = [regex]::Match($html, '<h2[^>]*>(.*?)</h2>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
if ($match.Success) {
  Write-Output "raw match: [$($match.Groups[1].Value)]"
  $cleaned = [regex]::Replace($match.Groups[1].Value, '<.*?>', '', [System.Text.RegularExpressions.RegexOptions]::Singleline)
  Write-Output "cleaned: [$cleaned]"
  $trimmed = $cleaned.Trim() -replace '\s+', ' '
  Write-Output "final: [$trimmed]"
}
