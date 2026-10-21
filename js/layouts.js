// Plattegrond Hooiberg: meubels per opstelling, in meters (x/y vanaf linksboven, rot in graden).
// Aanpassen kan met de editor: #/editor. Die maakt dit hele bestand opnieuw.
// Floor plan Hooiberg: furniture per layout, in metres (x/y from top left, rot in degrees).
// Edit it with the editor: #/editor. It regenerates this whole file.
window.BP_LAYOUTS = {
  "diner": [
    {"type":"table","x":4,"y":3.6,"w":1.6,"h":4.9,"chairs":{"left":8,"right":8,"bottom":2}},
    {"type":"screen","x":4,"y":0.5,"w":1.4,"label":["Scherm","Screen"]},
    {"type":"table","x":7.15,"y":4,"w":0.7,"h":1.4,"side":true,"chairs":{"left":2}},
    {"type":"chair","x":2.4,"y":0.5,"rot":-3.4}
  ],
  "borrel": [
    {"type":"table","x":1.9,"y":2.45,"w":1.2,"h":0.7,"rot":-63.4,"chairs":{"top":2,"bottom":2}},
    {"type":"table","x":2.7,"y":0.7,"w":1.2,"h":0.7,"chairs":{"top":2,"bottom":2},"rot":90},
    {"type":"table","x":5.3,"y":0.75,"w":1.2,"h":0.7,"chairs":{"top":2,"bottom":2},"rot":90},
    {"type":"table","x":6.35,"y":2.3,"w":1.2,"h":0.7,"rot":153.4,"chairs":{"top":2,"bottom":2}},
    {"type":"standing","x":4.15,"y":3.9},
    {"type":"standing","x":1.1,"y":4.05},
    {"type":"standing","x":7,"y":3.95},
    {"type":"table","x":2,"y":5.9,"w":1.6,"h":0.8,"chairs":{"top":2,"bottom":2},"rot":-25},
    {"type":"table","x":6,"y":5.9,"w":1.6,"h":0.8,"chairs":{"top":2,"bottom":2},"rot":25}
  ],
  "losse-tafels": [
    {"type":"table","x":1.7,"y":2.2,"w":1.2,"h":0.7,"rot":26.6,"chairs":{"top":2,"bottom":2}},
    {"type":"table","x":5.1,"y":0.7,"w":1.2,"h":0.7,"chairs":{"top":2,"bottom":2},"rot":90},
    {"type":"table","x":3.05,"y":0.7,"w":1.2,"h":0.7,"chairs":{"top":2,"bottom":2},"rot":90},
    {"type":"table","x":6.3,"y":2.2,"w":1.2,"h":0.7,"rot":153.4,"chairs":{"top":2,"bottom":2}},
    {"type":"table","x":1.25,"y":4.45,"w":1.6,"h":0.8,"chairs":{"top":2,"bottom":2},"rot":-25},
    {"type":"table","x":2.25,"y":6.45,"w":1.6,"h":0.8,"chairs":{"top":2,"bottom":2},"rot":-25},
    {"type":"table","x":6.8,"y":4.3,"w":1.6,"h":0.8,"chairs":{"top":2,"bottom":2},"rot":25},
    {"type":"table","x":5.6,"y":6.6,"w":1.6,"h":0.8,"chairs":{"top":2,"bottom":2},"rot":25}
  ]
};
