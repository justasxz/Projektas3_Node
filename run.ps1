# PowerShell wrapper - patikriina Node ir paleidi programa

# Tikrinti ar yra Node.js
try {
    $nodeVersion = node --version 2>$null
    Write-Host "✓ Node.js rastas: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js NE RASTAS!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Parsisiųski Node.js iš: https://nodejs.org (LTS versija)" -ForegroundColor Yellow
    Write-Host "Po diegimo - pabandyk dar kartą" -ForegroundColor Yellow
    Read-Host "Spausk ENTER norėdamas išeiti"
    exit 1
}

# Tikrinti ar npm yra
try {
    npm --version | Out-Null
    Write-Host "✓ npm rastas" -ForegroundColor Green
} catch {
    Write-Host "✗ npm NE RASTAS!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "   Programa kuriasi... palauk 5-10 sek" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# Tikrinti ar yra node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "Diegiamas: npm install" -ForegroundColor Yellow
    npm install
}

# Paleisti serverį
Write-Host ""
Write-Host "🚀 Serveris paleidžiamas..." -ForegroundColor Green
Write-Host "Atsidarys: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

node server.js
