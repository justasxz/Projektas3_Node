@echo off
REM Tai nurodimas, kaip sudėti programą į .zip failą
REM 1. Kopijuoti tik šiuos failus į naują aplanką "app_dist":
REM    - server.js
REM    - node_modules/
REM    - public/
REM    - data/
REM    - run.bat (šis failas)
REM 2. Žmonės, kurie gaus ZIP, turi:
REM    - Parsisiųsti Node.js iš https://nodejs.org (LTS versija)
REM    - Išarchyvuoti ZIP failą
REM    - Du kartus paspausti ant run.bat failo
REM 3. Tiek! Programa atsidaro automatiškai 127.0.0.1:3000

echo.
echo Programos siuntimui:
echo ==================
echo 1. Sukurtas "run.bat" failas - dvigubai spustelti jį norint paleisti
echo 2. Prireikia Node.js (https://nodejs.org)
echo 3. Bendra aplankų struktūra jau paruošta
echo.
pause
