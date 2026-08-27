# Test 404.html content using HttpClient (doesn't throw on 404)
Add-Type -AssemblyName System.Net.Http
$client = New-Object System.Net.Http.HttpClient
$client.Timeout = [TimeSpan]::FromSeconds(15)

try {
    $response = $client.GetAsync("https://appstream.uk/dl/CkqcPX4y").Result
    Write-Output "Status code: $($response.StatusCode.value__)"
    $content = $response.Content.ReadAsStringAsync().Result
    $hasRedirect = $content -match "window.location.replace"
    $hasLinksJson = $content -match "links.json"
    Write-Output "Content length: $($content.Length)"
    Write-Output "Has redirect script: $hasRedirect"
    Write-Output "Has links.json fetch: $hasLinksJson"
    Write-Output "First 200 chars: $($content.Substring(0, [Math]::Min(200, $content.Length)))"
} catch {
    Write-Output "Error: $($_.Exception.Message)"
}
