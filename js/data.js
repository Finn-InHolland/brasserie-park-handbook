// Brasserie Park Handboek, prototype: alleen de Hooiberg.
// Elke tekst is een paar: [Nederlands, Engels].
// Afmetingen en capaciteit komen van brasseriepark.nl/zalen/hooiberg.
// Foto's staan in assets/hooiberg/<nummer>.jpg (groot) en <nummer>-sm.jpg (klein).
// Video's: zet het pad of een YouTube-link in `videos` zodra ze er zijn (zie README).

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

      videos: {
        opbouwen: { src: null, poster: "4268" },
        afbouwen: { src: null, poster: "4279" }
      },

      photoGroups: [
        {
          title: ["Diner-opstelling", "Dinner layout"],
          photos: [
            { id: "4268", caption: ["De lange tafel, richting de deuren naar de brasserie", "The long table, facing the doors to the brasserie"] },
            { id: "4232", caption: ["De tafel is twee tafels breed, met stoelen aan beide kanten", "The table is two tables wide, with chairs on both sides"] },
            { id: "4231", caption: ["Aan het eind van de tafel staat het scherm, voor de ramen", "The screen stands at the end of the table, in front of the windows"] },
            { id: "4244", caption: ["Richting het park: scherm, glazen deuren en een losse tafel voor vier", "Towards the park: screen, glass doors and a separate table for four"] },
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
        },
        {
          title: ["Borrel-opstelling", "Drinks layout"],
          photos: [
            { id: "4297", caption: ["Statafels in het midden, tafels voor vier langs de ramen", "High tables in the middle, tables for four along the windows"] },
            { id: "4299", caption: ["Gezien vanuit de deuren van de brasserie", "Seen from the brasserie doors"] },
            { id: "4279", caption: ["Open vloer in het midden van de zaal", "Open floor in the middle of the room"] },
            { id: "4282", caption: ["Tafels voor vier bij de glazen deuren", "Tables for four by the glass doors"] },
            { id: "4287", caption: ["Statafels met een zwarte hoes", "High tables with a black cover"] },
            { id: "4291", caption: ["Statafel van bovenaf, met kaars", "High table from above, with a candle"] },
            { id: "4295", caption: ["Houten tafel aan de binnenkant van de zaal", "Wooden table on the inner side of the room"] },
            { id: "4285", caption: ["Houten tafel van bovenaf", "Wooden table from above"] }
          ]
        }
      ],

      // Plattegrond op basis van de foto's, in meters. Hoeken met de klok mee, te beginnen
      // links van de deuren naar de brasserie. Wand 0 = brasseriekant, wand 3 = parkkant.
      // Floor plan based on the photos, in metres. Corners clockwise, starting left of the
      // doors to the brasserie. Wall 0 = brasserie side, wall 3 = park side.
      plan: {
        w: 8,
        h: 8,
        points: [[2, 0], [6, 0], [8, 4], [6, 8], [2, 8], [0, 4]],
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
        ],
        setups: [
          {
            setup: "diner",
            photo: "4268",
            items: [
              { type: "table", x: 4, y: 4.05, w: 1.6, h: 5.4, wood: true, chairs: { left: 9, right: 9, top: 2, bottom: 1 } },
              { type: "screen", x: 4, y: 7.5, w: 1.4, label: ["Scherm", "Screen"] },
              { type: "table", x: 1.65, y: 4.9, w: 0.8, h: 0.8, rot: 63.4, wood: true, chairs: { left: 1, right: 1, top: 1, bottom: 1 } },
              { type: "table", x: 1.75, y: 2.75, w: 0.8, h: 0.8, rot: -63.4, wood: true, chairs: { left: 1, right: 1, top: 1, bottom: 1 } }
            ]
          },
          {
            setup: "borrel",
            photo: "4297",
            items: [
              { type: "table", x: 1.75, y: 5.35, w: 0.8, h: 0.8, rot: 63.4, wood: true, chairs: { left: 1, right: 1, top: 1, bottom: 1 } },
              { type: "table", x: 2.75, y: 6.95, w: 0.8, h: 0.8, wood: true, chairs: { left: 1, right: 1, top: 1, bottom: 1 } },
              { type: "table", x: 5.25, y: 6.95, w: 0.8, h: 0.8, wood: true, chairs: { left: 1, right: 1, top: 1, bottom: 1 } },
              { type: "table", x: 6.25, y: 5.35, w: 0.8, h: 0.8, rot: -63.4, wood: true, chairs: { left: 1, right: 1, top: 1, bottom: 1 } },
              { type: "standing", x: 4, y: 5.0 },
              { type: "standing", x: 1.55, y: 3.95 },
              { type: "standing", x: 6.45, y: 3.95 },
              { type: "table", x: 2.75, y: 1.85, w: 1.4, h: 0.8, wood: true, chairs: { top: 2, bottom: 2 } },
              { type: "table", x: 5.25, y: 1.85, w: 1.4, h: 0.8, wood: true, chairs: { top: 2, bottom: 2 } }
            ]
          }
        ]
      }
    }
  };
})();
