// Brasserie Park Handboek: alle inhoud per zaal.
// Elke tekst is een paar: [Nederlands, Engels].
// Foto's en video's: zet het pad in `src` zodra het echte bestand er is (zie README).
// Zaalgegevens (afmetingen, capaciteit) komen van brasseriepark.nl/zalen.

(function () {
  "use strict";

  // ---------- Algemene check-list / General checklist ----------

  var OP_START = [
    ["Reservering checken: aantal gasten, opstelling en tijden", "Check the booking: number of guests, layout and times"],
    ["Zaal controleren: schoon, geen schade, licht werkt", "Inspect the room: clean, no damage, lights work"],
    ["Ventileren en temperatuur instellen", "Air the room and set the temperature"],
    ["Tafels neerzetten volgens de plattegrond", "Place the tables according to the floor plan"],
    ["Stoelen plaatsen en recht zetten", "Place the chairs and line them up"],
    ["Tafellinnen en servetten plaatsen", "Lay the table linen and napkins"],
    ["Servies, bestek en glaswerk klaarzetten", "Set out crockery, cutlery and glassware"],
    ["Decoratie plaatsen (bloemen, kaarsen)", "Add decorations (flowers, candles)"]
  ];

  var OP_END = [
    ["Techniek testen: scherm, geluid en microfoon", "Test the tech: screen, sound and microphone"],
    ["Looproutes en nooduitgangen vrij", "Walkways and emergency exits clear"],
    ["Laatste check: alles compleet? Meld je bij de floormanager", "Final check: everything complete? Report to the floor manager"]
  ];

  var AF_START = [
    ["Controleren of alle gasten weg zijn; gevonden voorwerpen naar de bar", "Make sure all guests have left; lost property to the bar"],
    ["Glaswerk en servies afruimen naar de spoelkeuken", "Clear glassware and crockery to the dish area"],
    ["Tafellinnen en servetten naar de was", "Table linen and napkins to the laundry"],
    ["Decoratie weghalen; spullen van de klant apart houden", "Remove decorations; keep the client's items separate"]
  ];

  var AF_END = [
    ["Tafels en stoelen terug in de standaardopstelling", "Tables and chairs back in the standard layout"],
    ["Techniek uitzetten en opbergen", "Switch off and store the tech"],
    ["Vloer vegen of zuigen", "Sweep or vacuum the floor"],
    ["Afval scheiden en wegbrengen", "Separate and remove the waste"],
    ["Ramen en deuren dicht, verwarming laag, licht uit", "Windows and doors shut, heating down, lights off"],
    ["Afmelden bij de floormanager", "Sign off with the floor manager"]
  ];

  function checklist(opExtra, afExtra) {
    return {
      opbouwen: OP_START.concat(opExtra, OP_END),
      afbouwen: AF_START.concat(afExtra, AF_END)
    };
  }

  // ---------- Algemene uitleg / General info ----------

  var IMPORTANT = [
    ["Controleer altijd of de zaal schoon en zonder schade is vóór je begint.", "Always check the room is clean and undamaged before you start."],
    ["Volg de plattegrond van de juiste opstelling.", "Follow the floor plan for the right layout."],
    ["Bij vragen: neem contact op met de floormanager.", "Questions? Contact the floor manager."]
  ];

  var TIPS = [
    ["Werk met z'n tweeën: dat gaat sneller en veiliger.", "Work in pairs: it's faster and safer."],
    ["Bekijk eerst de video, dan weet je wat je moet doen.", "Watch the video first so you know what to do."],
    ["Bij grote evenementen: check de speciale instructies in de reservering.", "For big events: check the special instructions in the booking."]
  ];

  // ---------- Zalen / Rooms ----------

  var rooms = [
    {
      id: "tuinzaal",
      name: "Tuinzaal",
      tint: "#8C9A5B",
      size: ["8 × 5,5 m", "8 × 5.5 m"],
      intro: [
        "Intieme zaal met openslaande deuren naar het terras. Groene muren, een stamtafel en een buffetkast geven een huiselijke sfeer.",
        "An intimate room with French doors to the terrace. Green walls, a family table and a sideboard give it a homely feel."
      ],
      capacity: [
        { setup: "diner", value: "36" },
        { setup: "borrel", value: "40" },
        { setup: "vergadering", value: "16" }
      ],
      plan: {
        shape: "rect", w: 8, h: 5.5,
        doors: [
          { side: "S", at: 0.65, width: 0.9, kind: "entrance" },
          { side: "E", at: 2.75, width: 1.4, kind: "terrace" }
        ],
        blocks: [
          { x: 0, y: 1.4, w: 0.6, h: 2.6, label: ["Buffetkast", "Sideboard"] }
        ],
        setups: [
          { setup: "diner", layout: { type: "long", rows: 2, seats: 36 } },
          { setup: "borrel", layout: { type: "standing", tables: 6 } },
          { setup: "vergadering", layout: { type: "board", seats: 16 } }
        ]
      },
      photos: [
        { src: null, caption: ["Overzicht van de Tuinzaal", "Overview of the Tuinzaal"] },
        { src: null, caption: ["Voorbeeld: diner aan lange tafels", "Example: dinner at long tables"] },
        { src: null, caption: ["Voorbeeld: borrel met statafels", "Example: drinks with high tables"] },
        { src: null, caption: ["Buffetkast en stamtafel", "Sideboard and family table"] },
        { src: null, caption: ["Zo ziet een gedekte tafel eruit", "What a fully laid table looks like"] }
      ],
      videos: { opbouwen: null, afbouwen: null },
      checklist: checklist(
        [
          ["Openslaande deuren naar het terras: open of dicht volgens afspraak", "French doors to the terrace: open or closed as agreed"],
          ["Buffetkast netjes en aangevuld", "Sideboard tidy and stocked"]
        ],
        [
          ["Terrasdeuren sluiten en op slot", "Close and lock the terrace doors"],
          ["Buffetkast leegmaken en afnemen", "Empty and wipe down the sideboard"]
        ]
      ),
      important: [
        ["De terrasdeuren gaan pas open als de klant dat wil.", "Only open the terrace doors if the client wants them open."]
      ],
      tips: [
        ["Zet de stamtafel als laatste neer: hij is zwaar, til met z'n tweeën.", "Place the family table last: it's heavy, lift it together."]
      ]
    },
    {
      id: "herenkamer",
      name: "Herenkamer",
      tint: "#8A5A44",
      size: ["9 × 4,5 m", "9 × 4.5 m"],
      intro: [
        "Onze meest knusse ruimte, met een open haard voor de winter en een eigen terras voor de zomer.",
        "Our cosiest room, with an open fire in winter and its own terrace in summer."
      ],
      capacity: [
        { setup: "diner", value: "30" },
        { setup: "borrel", value: "35" },
        { setup: "vergadering", value: "16" }
      ],
      plan: {
        shape: "rect", w: 9, h: 4.5,
        doors: [
          { side: "S", at: 8.4, width: 0.9, kind: "entrance" },
          { side: "E", at: 2.25, width: 1.6, kind: "terrace" }
        ],
        blocks: [
          { x: 0, y: 1.45, w: 0.7, h: 1.6, label: ["Open haard", "Fireplace"], kind: "fire" }
        ],
        setups: [
          { setup: "diner", layout: { type: "long", rows: 2, seats: 30 } },
          { setup: "borrel", layout: { type: "standing", tables: 5 } },
          { setup: "vergadering", layout: { type: "board", seats: 16 } }
        ]
      },
      photos: [
        { src: null, caption: ["Overzicht van de Herenkamer", "Overview of the Herenkamer"] },
        { src: null, caption: ["De open haard", "The fireplace"] },
        { src: null, caption: ["Voorbeeld: intiem diner", "Example: intimate dinner"] },
        { src: null, caption: ["Voorbeeld: kleine vergadering", "Example: small meeting"] }
      ],
      videos: { opbouwen: null, afbouwen: null },
      checklist: checklist(
        [
          ["Open haard: alleen in de winter en na overleg aansteken, haardscherm ervoor", "Fireplace: only light in winter after checking, screen in front"],
          ["Terrasdeur checken: open of dicht volgens afspraak", "Check the terrace door: open or closed as agreed"]
        ],
        [
          ["Open haard: controleren of het vuur echt uit is", "Fireplace: make sure the fire is completely out"]
        ]
      ),
      important: [
        ["Laat de open haard nooit alleen branden.", "Never leave the fire burning unattended."]
      ],
      tips: [
        ["Houd minstens een meter vrij rond de open haard.", "Keep at least one metre clear around the fireplace."]
      ]
    },
    {
      id: "hooiberg",
      name: "Hooiberg",
      tint: "#B59B5E",
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
      plan: {
        shape: "hex", w: 8, h: 8,
        doors: [
          { side: "S", at: 5.3, width: 0.9, kind: "entrance" },
          { side: "N", at: 4, width: 2.4, kind: "terrace", sliding: true }
        ],
        blocks: [],
        setups: [
          { setup: "diner", layout: { type: "long", rows: 4, seats: 48 } },
          { setup: "borrel", layout: { type: "standing", tables: 7 } },
          { setup: "vergadering", layout: { type: "board", seats: 20 } }
        ]
      },
      photos: [
        { src: null, caption: ["Overzicht van de Hooiberg", "Overview of the Hooiberg"] },
        { src: null, caption: ["Uitzicht op park de Houtkamp", "View of park de Houtkamp"] },
        { src: null, caption: ["Voorbeeld: diner aan lange tafels", "Example: dinner at long tables"] },
        { src: null, caption: ["Het terras bij mooi weer", "The terrace in good weather"] }
      ],
      videos: { opbouwen: null, afbouwen: null },
      checklist: checklist(
        [
          ["Bij mooi weer: deuren naar het terras open en terras klaarzetten", "In good weather: open the terrace doors and set up the terrace"],
          ["Let op de hoeken: de ruimte is zeshoekig", "Mind the corners: the room is hexagonal"]
        ],
        [
          ["Terrasmeubels opruimen en terrasdeuren sluiten", "Put away the terrace furniture and close the doors"]
        ]
      ),
      important: [
        ["Door de zes hoeken past niet elke opstelling. Volg precies de plattegrond.", "With six corners not every layout fits. Follow the floor plan exactly."]
      ],
      tips: [
        ["Begin met de middelste tafel en werk naar buiten.", "Start with the middle table and work outwards."]
      ]
    },
    {
      id: "blauwe-vogelzaal",
      name: "Blauwe Vogelzaal",
      tint: "#3F6A8A",
      size: ["14,5 × 7 m", "14.5 × 7 m"],
      intro: [
        "Statige feestzaal met kroonluchters, een grote spiegel en een eigen bar. De muziekinstallatie staat al klaar voor de dj.",
        "A grand party room with chandeliers, a large mirror and its own bar. The sound system is ready for the DJ."
      ],
      capacity: [
        { setup: "diner", value: "100" },
        { setup: "feest", value: "200" },
        { setup: "theater", value: "90" },
        { setup: "receptie", value: "300", note: ["samen met de Orangerie", "together with the Orangerie"] }
      ],
      plan: {
        shape: "rect", w: 14.5, h: 7,
        doors: [
          { side: "S", at: 0.9, width: 1, kind: "entrance" },
          { side: "W", at: 3.5, width: 2.6, kind: "link", label: ["Orangerie", "Orangerie"] }
        ],
        blocks: [
          { x: 13.6, y: 1, w: 0.9, h: 5, label: ["Bar", "Bar"], kind: "bar" },
          { x: 2, y: 0, w: 3, h: 0.25, label: ["Spiegel", "Mirror"], kind: "mirror" }
        ],
        setups: [
          { setup: "diner", layout: { type: "long", rows: 3, seats: 100 } },
          { setup: "feest", layout: { type: "standing", tables: 14 } },
          { setup: "theater", layout: { type: "rows", seats: 90, front: ["Podium / scherm", "Stage / screen"] } }
        ]
      },
      photos: [
        { src: null, caption: ["Overzicht van de Blauwe Vogelzaal", "Overview of the Blauwe Vogelzaal"] },
        { src: null, caption: ["De bar en de kroonluchters", "The bar and the chandeliers"] },
        { src: null, caption: ["Voorbeeld: diner aan lange tafels", "Example: dinner at long tables"] },
        { src: null, caption: ["Voorbeeld: theateropstelling", "Example: theatre layout"] },
        { src: null, caption: ["Voorbeeld: feest met dansvloer", "Example: party with dance floor"] }
      ],
      videos: { opbouwen: null, afbouwen: null },
      checklist: checklist(
        [
          ["Bar aanvullen: glazen, ijs en dranken", "Stock the bar: glasses, ice and drinks"],
          ["Muziekinstallatie aanzetten en testen voor de dj", "Switch on and test the sound system for the DJ"],
          ["Dansvloer vrijhouden", "Keep the dance floor clear"],
          ["Lichtsfeer instellen: kroonluchters dimmen", "Set the lighting: dim the chandeliers"]
        ],
        [
          ["Bar leegmaken, afnemen en koelingen dicht", "Empty and wipe the bar, close the fridges"],
          ["Muziekinstallatie uit; spullen van de dj laten ophalen", "Sound system off; have the DJ's gear collected"]
        ]
      ),
      important: [
        ["Wordt de Orangerie er ook bij geboekt? Bouw dan beide zalen tegelijk op.", "Is the Orangerie booked too? Then set up both rooms at the same time."]
      ],
      tips: [
        ["Zet de bar als eerste klaar, dan kan het barpersoneel alvast beginnen.", "Set up the bar first so the bar staff can get started."]
      ]
    },
    {
      id: "orangerie",
      name: "Orangerie",
      tint: "#C47852",
      size: ["15 × 9 m", "15 × 9 m"],
      intro: [
        "Lichte ruimte met veel glas, de nieuwste zaal van Brasserie Park. Wordt alleen samen met de Blauwe Vogelzaal geboekt.",
        "A bright room with lots of glass, Brasserie Park's newest room. Only booked together with the Blauwe Vogelzaal."
      ],
      capacity: [
        { setup: "diner", value: "150", note: ["over 2 ruimtes", "across 2 rooms"] },
        { setup: "receptie", value: "300", note: ["over 2 ruimtes", "across 2 rooms"] },
        { setup: "vergadering", value: "80", note: ["over 2 ruimtes", "across 2 rooms"] }
      ],
      plan: {
        shape: "rect", w: 15, h: 9, glass: true,
        doors: [
          { side: "E", at: 4.5, width: 2.6, kind: "link", label: ["Blauwe Vogelzaal", "Blauwe Vogelzaal"] },
          { side: "S", at: 7.5, width: 1.6, kind: "garden" }
        ],
        blocks: [],
        setups: [
          { setup: "diner", layout: { type: "round", tables: 6, seats: 8 } },
          { setup: "receptie", layout: { type: "standing", tables: 10 } }
        ]
      },
      photos: [
        { src: null, caption: ["Overzicht van de Orangerie", "Overview of the Orangerie"] },
        { src: null, caption: ["Lichte ruimte met veel glas", "Bright room with lots of glass"] },
        { src: null, caption: ["Voorbeeld: diner aan ronde tafels", "Example: dinner at round tables"] },
        { src: null, caption: ["De doorgang naar de Blauwe Vogelzaal", "The passage to the Blauwe Vogelzaal"] }
      ],
      videos: { opbouwen: null, afbouwen: null },
      checklist: checklist(
        [
          ["Afstemmen met de collega's in de Blauwe Vogelzaal", "Coordinate with colleagues in the Blauwe Vogelzaal"],
          ["Ramen en zonwering checken (veel glas, kan warm worden)", "Check windows and sun blinds (lots of glass, can get warm)"]
        ],
        [
          ["Zonwering omhoog en ramen dicht", "Raise the blinds and close the windows"]
        ]
      ),
      important: [
        ["De Orangerie wordt nooit los verhuurd: check altijd de Blauwe Vogelzaal mee.", "The Orangerie is never booked on its own: always check the Blauwe Vogelzaal as well."]
      ],
      tips: [
        ["Op zonnige dagen: zonwering vroeg omlaag, dan blijft het koel.", "On sunny days: lower the blinds early to keep it cool."]
      ]
    },
    {
      id: "trouwtuin",
      name: "Trouwtuin",
      tint: "#A1A870",
      size: ["Buitenlocatie", "Outdoor venue"],
      intro: [
        "Romantische tuin voor trouwceremonies. Het bruidspaar staat onder het natuurlijke prieel van kunstenares Ludy Feyen.",
        "A romantic garden for wedding ceremonies. The couple stands under the natural arbour by artist Ludy Feyen."
      ],
      capacity: [
        { setup: "ceremonie", value: "100" }
      ],
      plan: {
        shape: "garden", w: 16, h: 12,
        doors: [
          { side: "S", at: 8, width: 2, kind: "path" }
        ],
        blocks: [
          { x: 6.5, y: 0.6, w: 3, h: 1.4, label: ["Prieel", "Arbour"], kind: "arbour" }
        ],
        setups: [
          { setup: "ceremonie", layout: { type: "rows", seats: 100, chair: "wood", front: ["Bruidspaar", "Couple"] } }
        ]
      },
      photos: [
        { src: null, caption: ["Overzicht van de Trouwtuin", "Overview of the wedding garden"] },
        { src: null, caption: ["Het prieel van Ludy Feyen", "The arbour by Ludy Feyen"] },
        { src: null, caption: ["Houten stoeltjes met middenpad", "Wooden chairs with a centre aisle"] },
        { src: null, caption: ["Plan B bij slecht weer", "Plan B for bad weather"] }
      ],
      videos: { opbouwen: null, afbouwen: null },
      checklist: {
        opbouwen: [
          ["Weerbericht checken: plan B is de dag ervoor afgestemd", "Check the forecast: plan B was agreed the day before"],
          ["Tuin controleren: gras, paden en afval", "Inspect the garden: lawn, paths and litter"],
          ["Houten stoeltjes in rijen zetten met een middenpad", "Set out the wooden chairs in rows with a centre aisle"],
          ["Prieel controleren en vrijmaken", "Check the arbour and keep it clear"],
          ["Tafeltje voor de trouwambtenaar klaarzetten", "Set up a small table for the registrar"],
          ["Geluidsinstallatie voor de ambtenaar en muziek testen", "Test the sound system for the registrar and music"],
          ["Decoratie van het bruidspaar plaatsen", "Put up the couple's decorations"],
          ["Looproute voor bruidspaar en gasten vrij", "Keep the route for the couple and guests clear"],
          ["Laatste check: alles compleet? Meld je bij de floormanager", "Final check: everything complete? Report to the floor manager"]
        ],
        afbouwen: [
          ["Stoeltjes inklappen en droog opbergen", "Fold the chairs and store them dry"],
          ["Geluidsinstallatie uitzetten en opruimen", "Switch off and pack away the sound system"],
          ["Decoratie van het bruidspaar apart houden", "Keep the couple's decorations separate"],
          ["Tuin nalopen op afval (confetti, rietjes, glas)", "Sweep the garden for litter (confetti, straws, glass)"],
          ["Afmelden bij de floormanager", "Sign off with the floor manager"]
        ]
      },
      important: [
        ["Bij twijfel over het weer: overleg met de floormanager over plan B.", "If the weather is doubtful: talk to the floor manager about plan B."],
        ["Het bruidspaar mag de tuin zelf versieren: vraag wat er moet blijven staan.", "The couple may decorate the garden themselves: ask what should stay."]
      ],
      tips: [
        ["Zet de stoeltjes vanaf het prieel naar achteren neer.", "Set out the chairs from the arbour towards the back."],
        ["Leg een paar droge doeken klaar voor natte stoeltjes.", "Keep a few dry cloths ready for wet chairs."]
      ]
    }
  ];

  window.BP_DATA = {
    rooms: rooms,
    important: IMPORTANT,
    tips: TIPS
  };
})();
