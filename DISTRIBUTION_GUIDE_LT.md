# 🎉 Node.js Programa - PASKELBIMO INSTRUKCIJA

## ✅ KĄ TURĖTE:

Jūs sukūrėte **du .exe failus** kurie gali paleisti šią programą BEZ Node.js!

### 📦 Failai:
- **`Node.js Programa 1.0.0.exe`** ← **TIESIOG PALEISTI** (greitas)
- **`Node.js Programa Setup 1.0.0.exe`** ← Instaliatorius (su meniu)

---

## 🚀 KAIP BENDRINTI:

### 🎁 Variantas 1: LENGVIAUSIAS (Portable)
```
Siųsk šį failą: Node.js Programa 1.0.0.exe
Žmogus: Du kartus spaudžia → programa veikia!
```

### 🎁 Variantas 2: PROFESIONALIAI (su instaliatoriu)
```
Siųsk šį failą: Node.js Programa Setup 1.0.0.exe
Žmogus: Du kartus spaudžia → "Next > Install" → programa veikia!
```

---

## 💡 SKIRTUMAI:

| Failas | Dydis | Greitis | Diegimas | Rekomenduojama |
|--------|-------|---------|----------|----------------|
| **1.0.0.exe** (Portable) | 108 MB | Greitas | Ne! | ✅ Jei jūs norite dėti USB ar el. paštu |
| **Setup 1.0.0.exe** (Installer) | 108 MB | Normalus | Taip, C:/ | ✅ Jei žmogus turi stiprų OU |

---

## 🌐 KĄ PROGRAMA DARO:

✅ Atsidaro **http://localhost:3000**  
✅ 3D vizualizacija (Three.js)  
✅ Realinės laiko duomenys (Server-Sent Events)  
✅ Pastabos saugojimas (JSON)  

---

## 🔧 JEIGU NORI KEISTI:

### Keisti pavadinimą:
```json
// package.json - radyk "productName":
"productName": "Mano Programa"
```

### Pridėti ikoną:
1. Padek `icon.ico` failą į projekto šaknį
2. Keisk `package.json`:
```json
"win": {
  "icon": "icon.ico"
}
```

3. Paleisk: `npm run build-exe`

---

## 🎯 SKRIPTAS VISAM:

Jeigu nori peribuildinti:
```bash
cd d:\DIAU3\Projektas3_Node
npm run build-exe
```

Failai atsiras: `dist/` aplankale

---

## 📝 KLAUSIMAI?

- Programa bėga lokalioje mašinoje
- Jeigu kas nors nepavyksta - žiūrėk `run.bat` failą
- Arba naudok `node server.js` tiesiai

---

## ⭐ VISKAS PARUOŠTA! 

Spausk `Node.js Programa 1.0.0.exe` ir skamisk tu jei veikia!
