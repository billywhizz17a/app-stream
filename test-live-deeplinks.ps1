# Test deeplink redirect on live site
Write-Output "=== Test 1: links.json ==="
try {
    $r = Invoke-WebRequest -Uri "https://appstream.uk/dl/links.json" -UseBasicParsing -TimeoutSec 15
    Write-Output "Status: $($r.StatusCode)"
    Write-Output "Content: $($r.Content)"
} catch {
    Write-Output "Error: $($_.Exception.Message)"
}

Write-Output ""
Write-Output "=== Test 2: 404.html for /dl/CkqcPX4y ==="
try {
    $r2 = Invoke-WebRequest -Uri "https://appstream.uk/dl/CkqcPX4y" -UseBasicParsing -TimeoutSec 15
    Write-Output "Status: $($r2.StatusCode)"
    $hasRedirect = $r2.Content -match "window.location.replace"
    Write-Output "Has redirect script: $hasRedirect"
} catch {
    Write-Output "Error: $($_.Exception.Message)"
    # Try to read the response body anyway
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $body = $reader.ReadToEnd()
        $hasRedirect = $body -match "window.location.replace"
        Write-Output "Has redirect script: $hasRedirect"
    }
}
