# Kiberbiztonsági jogszabályi feladatok · V.1.0

A csatolt Excel változatlan tartalmának kereshető, szűrhető webes megjelenítése. Mind a kilenc munkalap, a belső és külső hivatkozások, a feldolgozottsági jelölések és a forráskorlátok megmaradnak.

**Részleges feldolgozás:** a feladat- és jogjegyzék első tételes kivonat; teljessége nincs igazolva. A forráslekérdezés napja 2026.09.13. Az oldal nem frissül automatikusan, és nem tartalmaz új jogi értelmezést.

[Eredeti Excel letöltése](docs/downloads/Kiberbiztinsagi_jogszabalyi_feladatok_V.1.0.xlsx)

## GitHub Pages bekapcsolása

Settings → Pages → Source: **Deploy from a branch** → Branch: **main**, mappa: **/docs** → Save.

A repository jelenleg privát. Privát repository Pages-közzétételéhez megfelelő GitHub-előfizetés kell. A beállítás részletei: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Frissítés

Az eredeti munkafüzet a `docs/downloads` mappában található. Az adatexport újragenerálása: `python scripts/build.py` (openpyxl szükséges). A `docs/data.js` minden nem üres sort átvesz; a HYPERLINK képletek webes hivatkozásokká alakulnak, a három COUNTA összesítés a forrástartományból számolódik. Ismeretlen képletnél a generálás leáll.

Az oldal külső JavaScript-szolgáltatás nélkül működik. Munkalaponként kereshető, az érintett/téma/jogszabály/feldolgozottság mezők szűrhetők. A találatok 40 soros lapokra oszlanak. A jogalapok a megfelelő forrássorra vezetnek és törlik az előző szűrést, hogy a cél látható legyen.
