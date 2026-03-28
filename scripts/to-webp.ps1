$ffmpeg = 'C:\Users\ibrah\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1-full_build\bin\ffmpeg.exe'
$frames = Get-ChildItem 'C:\Users\ibrah\Documents\MAK_GRUPA_CROATIA\public\frames' -Recurse -Filter '*.jpg'
$total = $frames.Count
$done = 0
$t0 = Get-Date

foreach ($f in $frames) {
    $out = [System.IO.Path]::ChangeExtension($f.FullName, '.webp')
    & $ffmpeg -y -i $f.FullName -quality 85 -f webp $out 2>&1 | Out-Null
    if (Test-Path $out) {
        Remove-Item $f.FullName -Force
    }
    $done++
    $pct = [math]::Round($done / $total * 100)
    $secs = [math]::Round(((Get-Date) - $t0).TotalSeconds, 1)
    Write-Host -NoNewline "`r  $done/$total ($pct%)  ${secs}s"
}

Write-Host "`nFertig!"
