Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm run dev -- --host 127.0.0.1 --port 3000 --strictPort --open false" -WorkingDirectory "c:\Users\chris\CascadeProjects\App Stream" -WindowStyle Hidden
Write-Host "Preview server starting at http://127.0.0.1:3000/app-stream/"
