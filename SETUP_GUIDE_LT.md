# ✅ PROGRAMOS PASKELBIMO GIDAS

## 🎉 GERA ŽINIA: Tavo programa jau paruošta!

Yra **2 būdai** ja dalytis:

---

## 📦 VARIANTAS 1: QUICKSTART (Rekomenduojama!)

**Failas:** `dist/Node.js Programa 1.0.0.exe` (108 MB)

### Kam tai skirta?
- 🎯 Kai nori greitai bendrinti
- 🎯 Per el. paštą, USB, Telegram
- 🎯 Žmogui nereikia nieko diegti
- 🎯 Tik 2x spaudimas ir bata!

### Instrukcija žmogui:
```
1. Atsisiunti Node.js Programa 1.0.0.exe
2. Du kartus spaudi → programa veikia
3. Atsidarys http://localhost:3000
```

---

## 💼 VARIANTAS 2: PROFESSIONAL INSTALLER

**Failas:** `dist/Node.js Programa Setup 1.0.0.exe` (108 MB)

### Kam tai skirta?
- 🎯 Jeigu turi daugiau profesionalesnę instaliaciją
- 🎯 Žmonės mato "Next > Finish" dialogo
- 🎯 Programa instaliuojasi į C:/ Drive
- 🎯 Lengviau pašalinti vėliau

### Instrukcija žmogui:
```
1. Atsisiunti Node.js Programa Setup 1.0.0.exe
2. Du kartus spaudi
3. "Next" > "Install"
4. Programa atsidaro automatiškai
```

---

## 🎨 KAIP PERSONALIZUOTI?

### Keisti pavadinimą:
```json
// package.json 22-a eilutė:
"productName": "MANO PROGRAMA"
```

### Keisti aprašą:
```json
// package.json 4-a eilutė:
"description": "Mano nuostabi programa"
```

### Pridėti ikoną:
1. Padek `icon.ico` failą (256x256px) į šaknį
2. Keisk `package.json`:
```json
"icon": "icon.ico"
```

3. Paleisk: **`npm run build-exe`**

---

## 📊 PALYGINIMAS:

| Aspektas | 1.0.0.exe | Setup 1.0.0.exe |
|----------|-----------|-----------------|
| Dydis | 108 MB | 108 MB |
| Greitis | Momentinis | 1-2 sek |
| Diegimas | NE! | Taip |
| Meniu | NE | Taip |
| USB saugumas | ✅ | ✅ |
| Profesionalumas | ✅ | ✅✅ |

---

## 🔄 JEIGU NORI KEISTI KODĄ:

1. Redaguoji `server.js` arba `public/` failus
2. Paleidžia: `npm run build-exe`
3. Naujus .exe gauni `dist/` aplankale

---

## 📂 FAILŲ STRUKTURA:

```
Projektas3_Node/
├── dist/                              ← PASKELBIME! 📤
│   ├── Node.js Programa 1.0.0.exe        ← GRIEZTAI PALEISTI
│   └── Node.js Programa Setup 1.0.0.exe  ← INSTALIATORIUS
├── server.js                          ← Programa
├── package.json                       ← Konfigūracija
├── public/                            ← Web failai
├── data/                              ← Duomenys
├── run.bat                            ← Bendra paleiti
└── electron-main.js                   ← Electron wrapper
```

---

## 💡 PAGRINDINIAI ŽINGSNIAI:

### 1️⃣ Siųsti .exe:
```bash
Suradai jūs jau turi:
d:\DIAU3\Projektas3_Node\dist\Node.js Programa 1.0.0.exe
```

### 2️⃣ Žmogus atsisiunčia ir spaude
```
Double-click → programa paleista!
```

### 3️⃣ Programa atidaro:
```
http://localhost:3000
```

---

## 🎯 SUMMARY:

✅ Programa sukurta  
✅ .exe failai paruošti  
✅ Nereikia Node.js žmogui  
✅ Bendra dalytis USB ar el. paštu  
✅ Viena ir vienintelė komanda: run.bat arba .exe

---

## 🚀 Kitu žingsniu?

Siųsk jam šitą failą:
```
Node.js Programa 1.0.0.exe
```

Arba jeigu nori su instaliatorium:
```
Node.js Programa Setup 1.0.0.exe
```

Baigta! 🎉
