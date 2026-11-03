# LUMINA Gallery - PowerShell Launcher
# Right-click this file and select "Run with PowerShell"

$NodePath = "C:\Photo gallery(REACT)\.nodejs"
$BackendDir = "$PSScriptRoot\backend"
$FrontendDir = "$PSScriptRoot\frontend"

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  LUMINA Fine Art Photography Gallery" -ForegroundColor Yellow
Write-Host "  Starting servers..." -ForegroundColor White
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

# Option A: Start production server only (port 5000)
Write-Host "[INFO] Starting LUMINA on http://localhost:5000 (Production)" -ForegroundColor Green
Write-Host "       This serves both the Angular app AND the API from one port." -ForegroundColor Gray
Write-Host ""

Start-Process "cmd.exe" -ArgumentList "/k", "title LUMINA Backend && set PATH=$NodePath;%PATH% && cd /d $BackendDir && `"$NodePath\node.exe`" server.js"

Start-Sleep -Seconds 2
Write-Host "[OK] Backend started! Opening browser..." -ForegroundColor Green
Start-Process "http://localhost:5000"

Write-Host ""
Write-Host "  Gallery:      http://localhost:5000" -ForegroundColor Cyan
Write-Host "  API Stats:    http://localhost:5000/api/stats" -ForegroundColor Cyan
Write-Host "  API Photos:   http://localhost:5000/api/photos" -ForegroundColor Cyan
Write-Host ""
Write-Host "  To use the Angular live dev server instead (hot reload)," -ForegroundColor White
Write-Host "  open a second terminal and run:" -ForegroundColor White
Write-Host "    set PATH=$NodePath;%PATH%" -ForegroundColor Yellow
Write-Host "    cd $FrontendDir" -ForegroundColor Yellow
Write-Host "    npm start" -ForegroundColor Yellow
Write-Host "  Then open: http://localhost:4200" -ForegroundColor Cyan
Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Read-Host "Press Enter to exit this launcher"

