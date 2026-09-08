@echo off
REM Sita programa yra Node.js serveris
REM Norint paleisti - reikia Node.js (https://nodejs.org)

cd /d "%~dp0"
echo.
echo ==================================
echo   Node.js Realios Pasaulio Programa
echo ==================================
echo.
echo Paleidžiama... praneš jei bus klaidų
echo Atsidarys naršyklėje: http://localhost:3000
echo.

node server.js

pause
