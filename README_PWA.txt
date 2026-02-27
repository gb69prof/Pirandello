PIRANDELLO — PATCH PWA (versione "fatta bene")
================================================

Contenuto:
- manifest.webmanifest
- sw.js
- offline.html
- icons/ (icon-192.png, icon-512.png, apple-touch-icon.png)
- assets/js/pwa.js  (inietta manifest/meta e registra il service worker)

Dove mettere i file:
1) NELLA ROOT del repo Pirandello:
   - manifest.webmanifest
   - sw.js
   - offline.html
   - cartella icons/

2) Dentro assets/js/:
   - pwa.js

Cosa modificare (una sola cosa, semplice):
- In OGNI pagina HTML (index.html, Pirandello.html, Novelle.html, ecc.)
  aggiungi questo tag (nel <head> oppure subito prima di </body>):

  <script src="assets/js/pwa.js" defer></script>

Test:
- Pubblica su GitHub Pages (Settings -> Pages -> main -> /root).
- Apri il sito e poi:
  Chrome (Android/desktop): menu -> "Installa app"
  iOS Safari: Condividi -> "Aggiungi a Home"

Se vuoi "offline totale":
- aggiungi le altre pagine HTML dentro l'array CORE in sw.js
