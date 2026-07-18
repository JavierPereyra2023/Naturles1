$content = Get-Content 'D:\naturales_1\unidades\biologia\animales\vertebrados.html' -Raw
$sectionRegex = [regex]'<section\s[^>]*>'
$secOpens = [regex]::Matches($content, $sectionRegex)
$i = 0
foreach ($m in $secOpens) {
  $i++
  $openIdx = $m.Index
  $openTag = $m.Value
  $closeIdx = $content.IndexOf('</section>', $openIdx + $openTag.Length)
  if ($closeIdx -lt 0) { continue }
  $secHtml = $content.Substring($openIdx, $closeIdx - $openIdx + '</section>'.Length)
  $h2Match = [regex]::Match($secHtml, '<h2[^>]*>(.*?)</h2>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
  if ($h2Match.Success) {
    $rawTitle = $h2Match.Groups[1].Value
    $title = [regex]::Replace($rawTitle, '(?s)<.+>', '')
    $title = $title.Trim() -replace '\s+', ' '
    Write-Output "Sec $i title: [$title]"
  }
}
