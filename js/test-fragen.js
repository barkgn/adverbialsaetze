/* automatisch erzeugt mit tools/build.js – nicht von Hand ändern */
window.TEST_FRAGEN = {
 "A": {
  "titel": "Test: Adverbiale und Adverbialsätze",
  "minuten": 20,
  "tasks": [
   {
    "nr": "1",
    "text": "**Markiere** alle Adverbiale (adverbialen Bestimmungen) im Satz.",
    "punkte": 3,
    "score": "tapCount",
    "items": [
     {
      "id": "tA.1",
      "type": "tap",
      "prompt": "",
      "s": "{Wegen des Regens} {wartete} {die Klasse} {lange} {im Bus.}"
     }
    ]
   },
   {
    "nr": "2",
    "text": "**Bestimme** die Funktion des markierten Adverbials: lokal, temporal, kausal, modal, instrumental oder final.",
    "punkte": 4,
    "score": "perItem",
    "items": [
     {
      "id": "tA.2a",
      "type": "choice",
      "prompt": "Lena schnitt das Brot **mit einem Messer**.",
      "options": [
       "lokal",
       "temporal",
       "kausal",
       "modal",
       "instrumental",
       "final"
      ]
     },
     {
      "id": "tA.2b",
      "type": "choice",
      "prompt": "**Zur Erholung** machte die Klasse eine Pause.",
      "options": [
       "lokal",
       "temporal",
       "kausal",
       "modal",
       "instrumental",
       "final"
      ]
     },
     {
      "id": "tA.2c",
      "type": "choice",
      "prompt": "Der Bus hielt **vor dem Museum**.",
      "options": [
       "lokal",
       "temporal",
       "kausal",
       "modal",
       "instrumental",
       "final"
      ]
     },
     {
      "id": "tA.2d",
      "type": "choice",
      "prompt": "Die Kinder hörten **aufmerksam** zu.",
      "options": [
       "lokal",
       "temporal",
       "kausal",
       "modal",
       "instrumental",
       "final"
      ]
     }
    ]
   },
   {
    "nr": "3",
    "text": "**Bestimme** die Form des markierten Adverbials.",
    "punkte": 2,
    "score": "perItem",
    "items": [
     {
      "id": "tA.3a",
      "type": "choice",
      "prompt": "Wir übernachten **dort**.",
      "options": [
       "Adverb",
       "Adjektiv",
       "Präpositionalgruppe",
       "Nominalgruppe",
       "Nebensatz"
      ]
     },
     {
      "id": "tA.3b",
      "type": "choice",
      "prompt": "Die Führung dauerte **den ganzen Vormittag**.",
      "options": [
       "Adverb",
       "Adjektiv",
       "Präpositionalgruppe",
       "Nominalgruppe",
       "Nebensatz"
      ]
     }
    ]
   },
   {
    "nr": "4",
    "text": "**Markiere** in jedem Satz den Adverbialsatz. **Bestimme** dann seine Funktion.",
    "punkte": 3,
    "score": "pairs",
    "items": [
     {
      "id": "tA.4a1",
      "type": "tap",
      "prompt": "",
      "s": "{Als wir ankamen,} {regnete es.}"
     },
     {
      "id": "tA.4a2",
      "type": "choice",
      "prompt": "Funktion des Adverbialsatzes:",
      "options": [
       "lokal",
       "temporal",
       "kausal",
       "modal",
       "instrumental",
       "final"
      ]
     },
     {
      "id": "tA.4b1",
      "type": "tap",
      "prompt": "",
      "s": "{Jonas packte eine Jacke ein,} {weil es kalt war.}"
     },
     {
      "id": "tA.4b2",
      "type": "choice",
      "prompt": "Funktion des Adverbialsatzes:",
      "options": [
       "lokal",
       "temporal",
       "kausal",
       "modal",
       "instrumental",
       "final"
      ]
     },
     {
      "id": "tA.4c1",
      "type": "tap",
      "prompt": "",
      "s": "{Die Lehrerin spricht laut,} {damit alle sie verstehen.}"
     },
     {
      "id": "tA.4c2",
      "type": "choice",
      "prompt": "Funktion des Adverbialsatzes:",
      "options": [
       "lokal",
       "temporal",
       "kausal",
       "modal",
       "instrumental",
       "final"
      ]
     }
    ]
   },
   {
    "nr": "5",
    "text": "**Setze** alle fehlenden Kommas.",
    "punkte": 2,
    "score": "perItem",
    "items": [
     {
      "id": "tA.5a",
      "type": "comma",
      "target": "Bevor der Zug abfuhr kaufte Mara noch Wasser."
     },
     {
      "id": "tA.5b",
      "type": "comma",
      "target": "Die Klasse hat nachdem sie gegessen hatte das Schloss besichtigt."
     }
    ]
   },
   {
    "nr": "6",
    "text": "**Bestimme**, ob der markierte Nebensatz ein Adverbialsatz, ein Subjektsatz oder ein Objektsatz ist.",
    "punkte": 2,
    "score": "perItem",
    "items": [
     {
      "id": "tA.6a",
      "type": "choice",
      "prompt": "Lena hofft, **dass das Wetter hält**.",
      "options": [
       "Adverbialsatz",
       "Subjektsatz",
       "Objektsatz"
      ]
     },
     {
      "id": "tA.6b",
      "type": "choice",
      "prompt": "**Dass der Ausflug ausfiel**, ärgerte alle.",
      "options": [
       "Adverbialsatz",
       "Subjektsatz",
       "Objektsatz"
      ]
     }
    ]
   },
   {
    "nr": "7",
    "text": "**Bilde** Satzgefüge mit Adverbialsätzen. Schreibe jeweils den ganzen Satz.",
    "punkte": 4,
    "score": "text2",
    "items": [
     {
      "id": "tA.7a",
      "type": "text",
      "prompt": "**Forme** die Präpositionalgruppe in einen Adverbialsatz um: *Nach dem Mittagessen gingen wir in den Park.* → *Nachdem …*"
     },
     {
      "id": "tA.7b",
      "type": "text",
      "prompt": "**Verbinde** die beiden Hauptsätze zu einem Satzgefüge mit einem **temporalen** Adverbialsatz: *Die Klasse kam am Bahnhof an. Der Zug war schon weg.*"
     }
    ]
   }
  ]
 },
 "B": {
  "titel": "Test: Adverbiale und Adverbialsätze (Nachschreiben)",
  "minuten": 20,
  "tasks": [
   {
    "nr": "1",
    "text": "**Markiere** alle Adverbiale (adverbialen Bestimmungen) im Satz.",
    "punkte": 3,
    "score": "tapCount",
    "items": [
     {
      "id": "tB.1",
      "type": "tap",
      "prompt": "",
      "s": "{Nach dem Training} {duschte} {Tim} {schnell} {in der Halle.}"
     }
    ]
   },
   {
    "nr": "2",
    "text": "**Bestimme** die Funktion des markierten Adverbials: lokal, temporal, kausal, modal, instrumental oder final.",
    "punkte": 4,
    "score": "perItem",
    "items": [
     {
      "id": "tB.2a",
      "type": "choice",
      "prompt": "Die Trainerin öffnete die Kiste **mit einem Schlüssel**.",
      "options": [
       "lokal",
       "temporal",
       "kausal",
       "modal",
       "instrumental",
       "final"
      ]
     },
     {
      "id": "tB.2b",
      "type": "choice",
      "prompt": "**Für das Turnier** übte Ella jeden Tag.",
      "options": [
       "lokal",
       "temporal",
       "kausal",
       "modal",
       "instrumental",
       "final"
      ]
     },
     {
      "id": "tB.2c",
      "type": "choice",
      "prompt": "Die Bälle lagen **unter der Bank**.",
      "options": [
       "lokal",
       "temporal",
       "kausal",
       "modal",
       "instrumental",
       "final"
      ]
     },
     {
      "id": "tB.2d",
      "type": "choice",
      "prompt": "Die Mannschaft spielte **fair**.",
      "options": [
       "lokal",
       "temporal",
       "kausal",
       "modal",
       "instrumental",
       "final"
      ]
     }
    ]
   },
   {
    "nr": "3",
    "text": "**Bestimme** die Form des markierten Adverbials.",
    "punkte": 2,
    "score": "perItem",
    "items": [
     {
      "id": "tB.3a",
      "type": "choice",
      "prompt": "Das Spiel beginnt **gleich**.",
      "options": [
       "Adverb",
       "Adjektiv",
       "Präpositionalgruppe",
       "Nominalgruppe",
       "Nebensatz"
      ]
     },
     {
      "id": "tB.3b",
      "type": "choice",
      "prompt": "Die Mannschaft trainierte **jeden Abend**.",
      "options": [
       "Adverb",
       "Adjektiv",
       "Präpositionalgruppe",
       "Nominalgruppe",
       "Nebensatz"
      ]
     }
    ]
   },
   {
    "nr": "4",
    "text": "**Markiere** in jedem Satz den Adverbialsatz. **Bestimme** dann seine Funktion.",
    "punkte": 3,
    "score": "pairs",
    "items": [
     {
      "id": "tB.4a1",
      "type": "tap",
      "prompt": "",
      "s": "{Während die Fans sangen,} {lief Ella ein.}"
     },
     {
      "id": "tB.4a2",
      "type": "choice",
      "prompt": "Funktion des Adverbialsatzes:",
      "options": [
       "lokal",
       "temporal",
       "kausal",
       "modal",
       "instrumental",
       "final"
      ]
     },
     {
      "id": "tB.4b1",
      "type": "tap",
      "prompt": "",
      "s": "{Tim wartete draußen,} {da die Halle noch zu war.}"
     },
     {
      "id": "tB.4b2",
      "type": "choice",
      "prompt": "Funktion des Adverbialsatzes:",
      "options": [
       "lokal",
       "temporal",
       "kausal",
       "modal",
       "instrumental",
       "final"
      ]
     },
     {
      "id": "tB.4c1",
      "type": "tap",
      "prompt": "",
      "s": "{Die Trainerin pfeift,} {damit alle stehen bleiben.}"
     },
     {
      "id": "tB.4c2",
      "type": "choice",
      "prompt": "Funktion des Adverbialsatzes:",
      "options": [
       "lokal",
       "temporal",
       "kausal",
       "modal",
       "instrumental",
       "final"
      ]
     }
    ]
   },
   {
    "nr": "5",
    "text": "**Setze** alle fehlenden Kommas.",
    "punkte": 2,
    "score": "perItem",
    "items": [
     {
      "id": "tB.5a",
      "type": "comma",
      "target": "Nachdem der Schiedsrichter gepfiffen hatte jubelten die Fans."
     },
     {
      "id": "tB.5b",
      "type": "comma",
      "target": "Ella hat als niemand hinsah den Ball geholt."
     }
    ]
   },
   {
    "nr": "6",
    "text": "**Bestimme**, ob der markierte Nebensatz ein Adverbialsatz, ein Subjektsatz oder ein Objektsatz ist.",
    "punkte": 2,
    "score": "perItem",
    "items": [
     {
      "id": "tB.6a",
      "type": "choice",
      "prompt": "Tim weiß, **dass er gut gespielt hat**.",
      "options": [
       "Adverbialsatz",
       "Subjektsatz",
       "Objektsatz"
      ]
     },
     {
      "id": "tB.6b",
      "type": "choice",
      "prompt": "**Dass die Halle gesperrt war**, überraschte alle.",
      "options": [
       "Adverbialsatz",
       "Subjektsatz",
       "Objektsatz"
      ]
     }
    ]
   },
   {
    "nr": "7",
    "text": "**Bilde** Satzgefüge mit Adverbialsätzen. Schreibe jeweils den ganzen Satz.",
    "punkte": 4,
    "score": "text2",
    "items": [
     {
      "id": "tB.7a",
      "type": "text",
      "prompt": "**Forme** die Präpositionalgruppe in einen Adverbialsatz um: *Wegen der Hitze tranken alle viel Wasser.* → *Weil …*"
     },
     {
      "id": "tB.7b",
      "type": "text",
      "prompt": "**Verbinde** die beiden Hauptsätze zu einem Satzgefüge mit einem **kausalen** Adverbialsatz: *Ella war müde. Sie hatte lange trainiert.*"
     }
    ]
   }
  ]
 }
};
