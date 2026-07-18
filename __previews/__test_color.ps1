function Get-AccentColor($rel) {
  if ($rel -match '\\quimica\\') { return 'GREEN' }
  if ($rel -match '\\biologia\\') { return 'RED' }
  if ($rel -match '\\fisica\\') { return 'BLUE' }
  return 'DEFAULT'
}
Write-Output "quimica\agua\potabilizacion.html: $(Get-AccentColor 'quimica\agua\potabilizacion.html')"
Write-Output "biologia\animales\alimentacion.html: $(Get-AccentColor 'biologia\animales\alimentacion.html')"
Write-Output "fisica\energia\formas-energia.html: $(Get-AccentColor 'fisica\energia\formas-energia.html')"
Write-Output "otro\algo.html: $(Get-AccentColor 'otro\algo.html')"
