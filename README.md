# Brasserie Park Handboek: prototype Hooiberg

Prototype van een web-app voor de medewerkers van Brasserie Park, voor het klaarzetten en afbouwen
van de zalen. Voor nu alleen de **Hooiberg**: video's, foto's en een plattegrond die is getekend op
basis van de foto's. Check-list en uitleg staan op "Coming soon". Gemaakt als schoolproject.
Vooral voor de telefoon, werkt ook op de pc. Nederlands en Engels.

A prototype web app for Brasserie Park staff, for setting up and clearing the rooms. For now only the
**Hooiberg**: videos, photos and a floor plan drawn from the photos. Checklist and info are "Coming
soon". Made as a school project. Phone-first, also works on PC. Dutch and English.

Live: https://finn-inholland.github.io/brasserie-park-handbook/

## Structuur / Structure

```
index.html                      De pagina / The page shell
css/style.css                   Huisstijl en opmaak / Brand styling
js/data.js                      ALLE INHOUD van de Hooiberg / ALL Hooiberg content
js/plans.js                     Tekent de plattegrond / Draws the floor plan
js/app.js                       Pagina's, taal, fotoviewer, QR-code / Pages, language, photo viewer, QR code
assets/logo-brasserie-park.svg  Logo van brasseriepark.nl
assets/hooiberg/                Foto's: <nummer>.jpg (1600 px) en <nummer>-sm.jpg (720 px)
```

## Foto's / Photos

De foto's in `assets/hooiberg/` zijn verkleinde kopieën van de aangeleverde foto's (zonder
cameragegevens). Een foto toevoegen:

1. Maak een grote (1600 px breed) en een kleine versie (720 px breed): `4300.jpg` en `4300-sm.jpg`.
2. Zet ze in `assets/hooiberg/`.
3. Voeg in `js/data.js`, bij de juiste opstelling (`diner` of `borrel`), onder `photoGroups` een regel toe:

```js
{ id: "4300", caption: ["Korte uitleg onder de foto", "Short caption below the photo"] },
```

## Video's

Elke opstelling heeft een video voor opbouwen en afbouwen. Zet in `js/data.js` bij de opstelling
het pad of een YouTube-link bij `src`. Zolang `src` leeg (`null`) is, staat er "Video volgt" over
een foto.

```js
videos: {
  opbouwen: { src: "assets/videos/hooiberg-diner-opbouwen.mp4", poster: "4268" },
  afbouwen: { src: "https://youtu.be/XXXXXXXX", poster: "4232" }
},
```

## Opstellingen / Layouts

Bij Video's, Foto's en Plattegrond kies je Diner of Borrel. De keuze staat ook in het adres,
zodat je direct kunt linken: `#/fotos/borrel`, `#/plattegrond/diner`.

## Plattegrond / Floor plan

Getekend op basis van de foto's, zoals je binnenkomt: de brasserie onderaan, het park bovenaan.
Maten en plekken zijn bij benadering. Wanden, deuren, glas en spiegels staan in `plan` in
`js/data.js`; de meubels staan per opstelling bij `items` (`x`/`y` in meters).

## QR-code

Ga naar `#/qr` (https://finn-inholland.github.io/brasserie-park-handbook/#/qr) en druk op
**Printen**. De code opent de startpagina van het handboek en wijst automatisch naar het adres
waarop de site draait.

## Huisstijl / Brand

Kleuren en logo komen van brasseriepark.nl. Hun lettertypes (Adobe Fonts) mogen we niet gebruiken,
daarom gratis Google Fonts die erop lijken: **Oswald** (koppen), **Barlow Semi Condensed** (tekst)
en **Allison** (handschrift-accent).

## Lokaal bekijken / View locally

```
python -m http.server 5552
```

Open daarna http://localhost:5552.
