@echo off
setlocal enabledelayedexpansion
title LUMINA Gallery - Dev Mode
color 0A
cls

echo.
echo  =============================================================
echo   LUMINA Fine Art Photography Gallery - Dev Mode
echo   Backend:  http://localhost:5000
echo   Frontend: http://localhost:4200  (live reload)
echo  =============================================================
echo.

set "NODE=C:\Photo gallery(REACT)\.nodejs\node.exe"
set "NPM=C:\Photo gallery(REACT)\.nodejs\npm.cmd"
set "BACKENDDIR=c:\TRIDIB\photo gelary\backend"
set "FRONTENDDIR=c:\TRIDIB\photo gelary\frontend"

:: Check Node
if not exist "%NODE%" (
    echo  [ERROR] node.exe not found! Check Node.js installation.
    pause & exit /b 1
)

echo  [1/2] Starting Backend API on port 5000...
start "LUMINA - Backend (port 5000)" cmd /k ^""%NODE%" "%BACKENDDIR%\server.js"^"

echo  Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak >nul

echo  [2/2] Starting Angular Frontend on port 4200...
start "LUMINA - Angular Frontend (port 4200)" cmd /k ^"cd /d "%FRONTENDDIR%" && "%NPM%" start^"

echo.
echo  Waiting 20 seconds for Angular to compile...
echo  (A browser window will open automatically)
timeout /t 20 /nobreak >nul

echo  Opening browser...
start "" http://localhost:4200

echo.
echo  =============================================================
echo   LUMINA is running!
echo   Gallery:   http://localhost:4200
echo   API:       http://localhost:5000/api/photos
echo   Close the two server windows to stop.
echo  =============================================================
echo.
pause
