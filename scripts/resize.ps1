$ffmpeg = 'C:\Users\ibrah\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1-full_build\bin\ffmpeg.exe'
$frames = Get-ChildItem 'C:\Users\ibrah\Documents\MAK_GRUPA_CROATIA\public\frames' -Recurse -Filter '*.jpg'
$total = $frames.Count
$done = 0
$t0 = Get-Date

foreach ($f in $frames) {
    $tmp = $f.FullName + '.tmp'
    & $ffmpeg -y -i $f.FullName -vf scale=1280:720 -q:v 3 -update 1 -f mjpeg $tmp 2>&1 | Out-Null
    Move-Item -Force $tmp $f.FullName
    $done++
    $pct = [math]::Round($done / $total * 100)
    $secs = [math]::Round(((Get-Date) - $t0).TotalSeconds, 1)
    Write-Host -NoNewline "`r  $done/$total ($pct%)  ${secs}s"
}

Write-Host "`nFertig!"
