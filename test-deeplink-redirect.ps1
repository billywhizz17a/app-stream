# Test if the deeplink redirect works on appstream.uk
try {
    $r = Invoke-WebRequest -Uri "https://appstream.uk/dl/links.json" -UseBasicParsing -TimeoutSec 15
    Write-Output "links.json status: $($r.StatusCode)"
    Write-Output $r.Content
} catch {
    Write-Output "links.json error: $($_.Exception.Message)"
}

Write-Output ""

# Test the 404.html redirect page (GitHub Pages serves 404.html for /dl/CkqcPX4y)
try {
    $r2 = Invoke-WebRequest -Uri "https://appstream.uk/dl/CkqcPX4y" -UseBasicParsing -TimeoutSec 15 -MaximumRedirection 0 -ErrorAction Stop
    Write-Output "Deeplink status: $($r2.StatusCode)"
    Write-Output "Content contains redirect script: $($r2.Content -match 'window.location.replace')"
} catch {
    $code = $_.Exception.Response.StatusCode.value__
    Write-Output "Deeplink response code: $code"
    if ($code -eq 404) {
        Write-Output "404 page served (this is expected - GitHub Pages serves 404.html for unknown paths)"
        # Check if the 404 page has our redirect script
        try {
            $r3 = Invoke-WebRequest -Uri "https://appstream.uk/dl/CkqcPX4y" -UseBasicParsing -TimeoutSec 15
            Write-Output "404 content has redirect script: $($r3.Content -match 'window.location.replace')"
        } catch {
            Write-Output "Could not read 404 content: $($_.Exception.Message)"
        }
    }
}
