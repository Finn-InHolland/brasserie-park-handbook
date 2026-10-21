# Brasserie Park Handboek / Handbook

Tweetalige (NL/EN) handboekwebsite voor Brasserie Park, gemaakt als schoolproject.
A bilingual (Dutch/English) handbook website for Brasserie Park, made as a school project.

## Structuur / Structure

```
index.html      De pagina met alle hoofdstukken / The page with every chapter
css/style.css   Opmaak / Styling
js/main.js      Taalwissel, mobiel menu, actief hoofdstuk / Language switch, mobile menu, active chapter
```

## Tekst toevoegen / Adding text

Elke tekst staat er twee keer in: één keer met `data-lang="nl"` en één keer met `data-lang="en"`.
De taalknop laat alleen de gekozen taal zien.

Every piece of text appears twice: once with `data-lang="nl"` and once with `data-lang="en"`.
The language button shows only the chosen language.

```html
<p data-lang="nl">Welkom bij het team!</p>
<p data-lang="en">Welcome to the team!</p>
```

Een nieuw hoofdstuk / A new chapter: add a `<section class="chapter" id="...">` in `index.html`
and a matching link in the `.toc` list.

## Lokaal bekijken / View locally

Open `index.html` in a browser. No build step is needed.
