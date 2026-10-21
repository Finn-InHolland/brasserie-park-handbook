// Brasserie Park Handboek, prototype: alleen de Hooiberg.
// Elke tekst is een paar: [Nederlands, Engels].
// Afmetingen en capaciteit komen van brasseriepark.nl/zalen/hooiberg.
// Foto's staan in assets/hooiberg/<nummer>.jpg (groot) en <nummer>-sm.jpg (klein).
// Video's: zet het pad of een YouTube-link bij `src` zodra ze er zijn (zie README).

(function () {
  "use strict";

  window.BP_DATA = {
    room: {
      id: "hooiberg",
      name: "Hooiberg",
      size: ["8 × 8 m", "8 × 8 m"],
      intro: [
        "Zeshoekige ruimte met uitzicht op park de Houtkamp. Bij mooi weer gaan de deuren open naar het ruime terras.",
        "A hexagonal room overlooking park de Houtkamp. In good weather the doors open onto the large terrace."
      ],
      capacity: [
        { setup: "diner", value: "48" },
        { setup: "borrel", value: "50" },
        { setup: "vergadering", value: "20" }
      ],

      // Foto per onderdeel / Photo per section
      hero: "4297",
      sectionPhotos: {
        videos: "4231",
        fotos: "4268",
        plattegrond: "4279",
        checklist: "4235",
        uitleg: "4230",
        quote: "4282"
      },

      // Per opstelling: video's, foto's en de meubels op de plattegrond (x/y in meters)
      // Per layout: videos, photos and the furniture on the floor plan (x/y in metres)
      setups: [
        {
          setup: "diner",
          cover: "4268",
          videos: {
            opbouwen: { src: null, poster: "4268" },
            afbouwen: { src: null, poster: "4232" }
          },
          photoGroups: [
            {
              title: ["De opstelling", "The layout"],
              photos: [
                { id: "4268", caption: ["De lange tafel, richting de deuren naar de brasserie", "The long table, facing the doors to the brasserie"] },
                { id: "4232", caption: ["De tafel is twee tafels breed, met stoelen aan beide kanten", "The table is two tables wide, with chairs on both sides"] },
                { id: "4231", caption: ["Aan het eind van de tafel staat het scherm, voor de ramen", "The screen stands at the end of the table, in front of the windows"] },
                { id: "4244", caption: ["Richting het park: scherm, glazen deuren en een bijzettafel", "Towards the park: screen, glass doors and a side table"] },
                { id: "4248", caption: ["Overzicht vanaf de parkkant", "Overview from the park side"] },
                { id: "4236", caption: ["Wand met spiegel en lijstjes naast de witte deuren", "Wall with a mirror and frames next to the white doors"] },
                { id: "4273", caption: ["De glazen gevel aan de parkkant", "The glass front on the park side"] },
                { id: "4262", caption: ["Gedekt met wijnkoelers, kaarsen en peper en zout", "Laid with wine coolers, candles, salt and pepper"] }
              ]
            },
            {
              title: ["Gedekte tafel", "Table setting"],
              photos: [
                { id: "4235", caption: ["Bord met menukaart, bestek op een servet, wijn- en waterglas", "Plate with menu card, cutlery on a napkin, wine and water glass"] },
                { id: "4250", caption: ["Hetzelfde couvert van bovenaf", "The same place setting from above"] },
                { id: "4230", caption: ["Kaars in een emaille kommetje en glazen", "Candle in an enamel bowl, and glasses"] }
              ]
            }
          ],
          items: [
            { type: "table", x: 4, y: 3.95, w: 1.6, h: 5.4, chairs: { left: 9, right: 9, top: 1, bottom: 2 } },
            { type: "screen", x: 4, y: 0.5, w: 1.4, label: ["Scherm", "Screen"] },
            { type: "table", x: 0.85, y: 4, w: 0.7, h: 1.4, side: true },
            { type: "table", x: 7.15, y: 4, w: 0.7, h: 1.4, side: true }
          ]
        },
        {
          setup: "borrel",
          cover: "4297",
          videos: {
            opbouwen: { src: null, poster: "4297" },
            afbouwen: { src: null, poster: "4279" }
          },
          photoGroups: [
            {
              title: ["De opstelling", "The layout"],
              photos: [
                { id: "4297", caption: ["Statafels in het midden, tafels voor vier langs de ramen", "High tables in the middle, tables for four along the windows"] },
                { id: "4299", caption: ["Gezien vanuit de deuren van de brasserie", "Seen from the brasserie doors"] },
                { id: "4279", caption: ["Open vloer in het midden van de zaal", "Open floor in the middle of the room"] },
                { id: "4282", caption: ["Tafels voor vier bij de glazen deuren", "Tables for four by the glass doors"] },
                { id: "4287", caption: ["Statafels met een zwarte hoes", "High tables with a black cover"] },
                { id: "4295", caption: ["Houten tafel aan de binnenkant van de zaal", "Wooden table on the inner side of the room"] }
              ]
            },
            {
              title: ["Details", "Details"],
              photos: [
                { id: "4291", caption: ["Statafel van bovenaf, met kaars", "High table from above, with a candle"] },
                { id: "4285", caption: ["Houten tafel van bovenaf", "Wooden table from above"] }
              ]
            }
          ],
          items: [
            { type: "table", x: 6.25, y: 2.65, w: 0.8, h: 0.8, rot: 63.4, chairs: { left: 1, right: 1, top: 1, bottom: 1 } },
            { type: "table", x: 5.25, y: 1.05, w: 0.8, h: 0.8, chairs: { left: 1, right: 1, top: 1, bottom: 1 } },
            { type: "table", x: 2.75, y: 1.05, w: 0.8, h: 0.8, chairs: { left: 1, right: 1, top: 1, bottom: 1 } },
            { type: "table", x: 1.75, y: 2.65, w: 0.8, h: 0.8, rot: -63.4, chairs: { left: 1, right: 1, top: 1, bottom: 1 } },
            { type: "standing", x: 4, y: 3.0 },
            { type: "standing", x: 6.45, y: 4.05 },
            { type: "standing", x: 1.55, y: 4.05 },
            { type: "table", x: 5.25, y: 6.15, w: 1.4, h: 0.8, chairs: { top: 2, bottom: 2 } },
            { type: "table", x: 2.75, y: 6.15, w: 1.4, h: 0.8, chairs: { top: 2, bottom: 2 } }
          ]
        }
      ],

      // Plattegrond in meters, zoals je binnenkomt: de brasserie onderaan, het park bovenaan.
      // Hoeken met de klok mee, te beginnen rechts van de deuren naar de brasserie.
      // Wand 0 = brasseriekant (onder), wand 3 = parkkant (boven).
      // Floor plan in metres, as you walk in: the brasserie at the bottom, the park at the top.
      // Corners clockwise, starting right of the doors to the brasserie.
      // Wall 0 = brasserie side (bottom), wall 3 = park side (top).
      plan: {
        w: 8,
        h: 8,
        points: [[6, 8], [2, 8], [0, 4], [2, 0], [6, 0], [8, 4]],
        parkWall: 3,
        walls: [
          { glass: [] },
          { glass: [[0.5, 0.94]], mirror: [0.1, 0.32] },
          { glass: [[0.04, 0.96]] },
          { glass: [[0.04, 0.96]] },
          { glass: [[0.04, 0.96]] },
          { glass: [[0.06, 0.5]], mirror: [0.68, 0.9] }
        ],
        // `at` is de plek op de wand (0 = begin, 1 = eind) / `at` is the spot along the wall (0 = start, 1 = end)
        doors: [
          { wall: 0, at: 0.5, width: 1.6, swing: true, label: ["Brasserie", "Brasserie"] },
          { wall: 1, at: 0.72, width: 0.9, label: ["Zijdeur", "Side door"] },
          { wall: 2, at: 0.18, width: 0.9, label: ["Terras", "Terrace"] },
          { wall: 3, at: 0.5, width: 1.4, exit: true, label: ["Nooduitgang", "Emergency exit"] },
          { wall: 4, at: 0.82, width: 0.9, label: ["Terras", "Terrace"] },
          { wall: 5, at: 0.28, width: 0.9, label: ["Binnenplaats", "Courtyard"] }
        ]
      }
    }
  };
})();
