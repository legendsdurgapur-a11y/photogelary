@echo off
setlocal enabledelayedexpansion
title LUMINA Gallery - Starting...
color 0A
cls

echo.
echo  =============================================================
echo   LUMINA Fine Art Photography Gallery
echo   Starting production server on http://localhost:5000
echo  =============================================================
echo.

:: Use the full quoted path to node.exe directly - avoids PATH issues
set "NODE=C:\Photo gallery(REACT)\.nodejs\node.exe"
set "SERVERJS=c:\TRIDIB\photo gelary\backend\server.js"

:: Check node exists
if not exist "%NODE%" (
    echo  [ERROR] node.exe not found at:
    echo  %NODE%
    echo.
    pause
    exit /b 1
)

:: Check server.js exists
if not exist "%SERVERJS%" (
    echo  [ERROR] server.js not found at:
    echo  %SERVERJS%
    echo.
    pause
    exit /b 1
)

echo  [OK] Node.js found
echo  [OK] Server found
echo.
echo  Opening http://localhost:5000 in your browser...
echo  (Please wait 3-4 seconds for server to start)
echo.
echo  KEEP THIS WINDOW OPEN while using the gallery.
echo  Close it to stop the server.
echo.
echo  =============================================================

:: Open browser after short delay (runs in background)
start "" /b cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:5000"

:: Start the server (blocking - keeps window open)
"%NODE%" "%SERVERJS%"

echo.
echo  Server stopped. Press any key to exit.
pause >nul
