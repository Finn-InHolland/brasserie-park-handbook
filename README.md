# Brasserie Park Handboek / Handbook

Mockup van een web-app voor de medewerkers van Brasserie Park: per zaal uitleg-video's, foto's,
plattegronden, een check-list van A tot Z en korte uitleg, plus QR-codes om op te hangen.
Gemaakt als schoolproject. Vooral voor de telefoon, maar werkt ook op de pc. Nederlands en Engels.

A mockup web app for Brasserie Park staff: per room, how-to videos, photos, floor plans, an A–Z
checklist and short tips, plus printable QR codes. Made as a school project. Phone-first, also works
on PC. Dutch and English.

Live: https://finn-inholland.github.io/brasserie-park-handbook/

## Structuur / Structure

```
index.html                    De pagina / The page shell
css/style.css                 Huisstijl en opmaak / Brand styling
js/data.js                    ALLE INHOUD: zalen, check-lists, tips, foto's, video's / ALL CONTENT
js/plans.js                   Tekent de plattegronden op schaal / Draws the floor plans to scale
js/app.js                     Pagina's, taal, check-lists, QR-codes / Pages, language, checklists, QR codes
assets/logo-brasserie-park.svg  Logo van brasseriepark.nl
```

## Foto's en video's toevoegen / Adding photos and videos

1. Zet het bestand in de map `assets/`, bijvoorbeeld `assets/fotos/tuinzaal-overzicht.jpg`.
2. Open `js/data.js`, zoek de zaal en vul `src` in:

```js
photos: [
  { src: "assets/fotos/tuinzaal-overzicht.jpg", caption: ["Overzicht van de Tuinzaal", "Overview of the Tuinzaal"] },
```

Video's werken hetzelfde. Een eigen bestand (`.mp4`) of een YouTube-link mag allebei:

```js
videos: { opbouwen: "assets/videos/tuinzaal-opbouwen.mp4", afbouwen: "https://youtu.be/XXXXXXXX" },
```

Zolang `src` leeg (`null`) is, toont de app een nette "Foto volgt" / "Video volgt"-plek.
Houd foto's onder ~500 KB (bijv. 1600 px breed) zodat de app snel blijft op de telefoon.

## Teksten aanpassen / Editing text

Elke tekst in `js/data.js` is een paar: `["Nederlands", "English"]`.
Check-list punten, tips en "belangrijk om te weten" staan per zaal. De algemene punten die voor
elke zaal gelden staan bovenaan het bestand.

## Plattegronden / Floor plans

De plattegronden worden getekend uit de afmetingen en capaciteit van brasseriepark.nl/zalen (2026).
De plek van deuren, de bar en andere vaste meubels is een schatting: pas die aan in `plan` per zaal
in `js/data.js` zodra de echte plattegronden er zijn.

## QR-codes

Via **Meer → QR-codes bekijken en printen**. Elke code opent direct de juiste zaal. De codes wijzen
automatisch naar het adres waarop de site draait.

## Huisstijl / Brand

Kleuren en logo komen van brasseriepark.nl. Hun lettertypes (Adobe Fonts) mogen we niet gebruiken,
daarom gratis Google Fonts die erop lijken: **Oswald** (koppen), **Barlow Semi Condensed** (tekst)
en **Allison** (handschrift-accent).

## Lokaal bekijken / View locally

```
python -m http.server 5552
```

Open daarna http://localhost:5552.
