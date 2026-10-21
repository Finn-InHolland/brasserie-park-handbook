// Plattegrond Hooiberg: meubels per opstelling, in meters (x/y vanaf linksboven, rot in graden).
// Aanpassen kan met de editor: #/editor. Die maakt dit hele bestand opnieuw.
// Floor plan Hooiberg: furniture per layout, in metres (x/y from top left, rot in degrees).
// Edit it with the editor: #/editor. It regenerates this whole file.
window.BP_LAYOUTS = {
  "diner": [
    {"type":"table","x":4,"y":3.7,"w":1.6,"h":4.9,"chairs":{"left":8,"right":8,"top":1,"bottom":2}},
    {"type":"screen","x":4,"y":0.5,"w":1.4,"label":["Scherm","Screen"]},
    {"type":"table","x":7.15,"y":4,"w":0.7,"h":1.4,"side":true,"chairs":{"left":2}},
    {"type":"chair","x":2.1,"y":0.8,"rot":-63.4}
  ],
  "borrel": [
    {"type":"table","x":1.9,"y":2.45,"w":1.2,"h":0.7,"rot":-63.4,"chairs":{"top":2,"bottom":2}},
    {"type":"table","x":2.7,"y":1.1,"w":1.2,"h":0.7,"chairs":{"top":2,"bottom":2}},
    {"type":"table","x":5.3,"y":1.1,"w":1.2,"h":0.7,"chairs":{"top":2,"bottom":2}},
    {"type":"table","x":6.1,"y":2.45,"w":1.2,"h":0.7,"rot":63.4,"chairs":{"top":2,"bottom":2}},
    {"type":"standing","x":4,"y":3.4},
    {"type":"standing","x":1.2,"y":3.75},
    {"type":"standing","x":6.8,"y":3.75},
    {"type":"table","x":2.3,"y":6.3,"w":1.6,"h":0.8,"chairs":{"top":2,"bottom":2}},
    {"type":"table","x":5.7,"y":6.3,"w":1.6,"h":0.8,"chairs":{"top":2,"bottom":2}}
  ],
  "losse-tafels": [
    {"type":"table","x":1.9,"y":2.45,"w":1.2,"h":0.7,"rot":-63.4,"chairs":{"top":2,"bottom":2}},
    {"type":"table","x":2.7,"y":1.1,"w":1.2,"h":0.7,"chairs":{"top":2,"bottom":2}},
    {"type":"table","x":5.3,"y":1.1,"w":1.2,"h":0.7,"chairs":{"top":2,"bottom":2}},
    {"type":"table","x":6.1,"y":2.45,"w":1.2,"h":0.7,"rot":63.4,"chairs":{"top":2,"bottom":2}},
    {"type":"table","x":1.6,"y":4.25,"w":1.6,"h":0.8,"chairs":{"top":2,"bottom":2}},
    {"type":"table","x":2.3,"y":6.3,"w":1.6,"h":0.8,"chairs":{"top":2,"bottom":2}},
    {"type":"table","x":6.4,"y":4.25,"w":1.6,"h":0.8,"chairs":{"top":2,"bottom":2}},
    {"type":"table","x":5.7,"y":6.3,"w":1.6,"h":0.8,"chairs":{"top":2,"bottom":2}}
  ]
};
