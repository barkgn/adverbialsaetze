/* Modul VII (Abschlussfall) und Profi-Akten */
(function () {
  const { I } = LJ;

  /* Probetest – gleiche Struktur wie der Test (20 Punkte). score: perItem | tapCount | pairs | text2 */
  const PROBETEST = { minuten: 20, tasks: [
    { nr: '1', text: '**Markiere** alle Adverbiale im Satz.', punkte: 3, score: 'tapCount', lz: 'LZ1', items: [
      I.tap('m7.pt.1', '', '[In der Bibliothek] {las} {Mara} [gestern] [stundenlang.]'),
    ] },
    { nr: '2', text: '**Bestimme** die Funktion des markierten Adverbials.', punkte: 4, score: 'perItem', lz: 'LZ2', items: [
      I.fn('m7.pt.2a', 'Ben markierte die Stelle **mit einem Stift**.', 'instrumental'),
      I.fn('m7.pt.2b', '**Wegen des Lärms** ging Ben nach draußen.', 'kausal'),
      I.fn('m7.pt.2c', '**Zur Vorbereitung** las Mia das Kapitel.', 'final'),
      I.fn('m7.pt.2d', '**Seit einer Woche** liest Ben das Buch.', 'temporal'),
    ] },
    { nr: '3', text: '**Bestimme** die Form des markierten Adverbials.', punkte: 2, score: 'perItem', lz: 'LZ2', items: [
      I.form('m7.pt.3a', 'Die Ferien beginnen **bald**.', 'Adverb'),
      I.form('m7.pt.3b', 'Lina las **den ganzen Abend**.', 'Nominalgruppe'),
    ] },
    { nr: '4', text: '**Markiere** den Adverbialsatz und **bestimme** seine Funktion.', punkte: 3, score: 'pairs', lz: 'LZ3', items: [
      I.tap('m7.pt.4a1', '', '{Tom blieb zu Hause,} [weil er krank war.]'), I.fn('m7.pt.4a2', 'Funktion des Adverbialsatzes:', 'kausal'),
      I.tap('m7.pt.4b1', '', '[Nachdem der Film zu Ende war,] {gingen alle nach Hause.}'), I.fn('m7.pt.4b2', 'Funktion des Adverbialsatzes:', 'temporal'),
      I.tap('m7.pt.4c1', '', '{Mia spart Geld,} [damit sie ein Fahrrad kaufen kann.]'), I.fn('m7.pt.4c2', 'Funktion des Adverbialsatzes:', 'final'),
    ] },
    { nr: '5', text: '**Setze** die fehlenden Kommas.', punkte: 2, score: 'perItem', lz: 'LZ5', items: [
      I.comma('m7.pt.5a', 'Als der Regen aufhörte, gingen wir raus.'),
      I.comma('m7.pt.5b', 'Der Trainer hat, bevor das Spiel begann, eine Rede gehalten.'),
    ] },
    { nr: '6', text: '**Bestimme**: Adverbialsatz, Subjektsatz oder Objektsatz?', punkte: 2, score: 'perItem', lz: 'LZ4', items: [
      I.glied('m7.pt.6a', 'Ich hoffe, **dass du morgen kommst**.', 'Objektsatz'),
      I.glied('m7.pt.6b', '**Dass es schneit**, freut die Kinder.', 'Subjektsatz'),
    ] },
    { nr: '7', text: '**Bilde** Satzgefüge mit Adverbialsätzen. Schreibe jeweils den ganzen Satz.', punkte: 4, score: 'text2', lz: 'LZ6', items: [
      I.text('m7.pt.7a', '**Forme** die Präpositionalgruppe in einen Adverbialsatz um: *Wegen des Staus kamen wir zu spät.* → *Weil …*', ['Weil es einen Stau gab, kamen wir zu spät.', 'Weil wir im Stau standen, kamen wir zu spät.', 'Da es einen Stau gab, kamen wir zu spät.'], { subs: ['weil', 'da'], verbs: ['gab', 'standen', 'war'] }),
      I.text('m7.pt.7b', '**Verbinde** zu einem Satzgefüge mit einem **finalen** Adverbialsatz: *Mia stellte den Wecker. Sie wollte pünktlich sein.*', ['Mia stellte den Wecker, damit sie pünktlich war.', 'Mia stellte den Wecker, damit sie pünktlich ist.', 'Mia stellte den Wecker, um pünktlich zu sein.'], { subs: ['damit', 'um'], verbs: ['war', 'ist', 'sein', 'konnte'], lz: 'LZ7' }),
    ] },
  ] };
  LJ.PROBETEST = PROBETEST;

  LJ.modules.push({
    id: 'm7', nr: 'VII', kurz: 'Abschlussfall', titel: 'Bereit für den Test',
    leitfrage: 'Was kannst du schon sicher, und was übst du noch?',
    ziele: ['**einschätzen**, welche Lernziele du sicher beherrschst.', 'deine Schwachstellen gezielt **üben**.', 'den Fall des verschwundenen Pokals **lösen**.'],
    steps: [
      { t: 'page', nr: '41', text: '**Lies**, wie der Test abläuft.', title: 'M21 So läuft der Test', blocks: [
        'Der Test findet in der App statt. Deine Lehrkraft schaltet ihn frei.\n- Du hast **20 Minuten** Zeit.\n- Es gibt **keine Lupe** und keine Rückmeldung während des Tests.\n- Du hast für jede Aufgabe **nur einen Versuch**.\n- Die Aufgaben sehen so aus wie im Probetest.',
        '**Tipps für den Test:**\n1. Finde zuerst das Prädikat.\n2. Stell die W-Frage: *Wo? Wann? Warum? Wie? Womit? Wozu?*\n3. Schau beim Nebensatz auf die Subjunktion und auf das Verb am Ende.\n4. Denk an das Komma zwischen Hauptsatz und Nebensatz.',
      ] },
      { t: 'probetest', nr: '42', text: '**Bearbeite** den Probetest. Du hast 20 Minuten Zeit. Danach zeigt dir die App dein Ergebnis und deine Fehler.' },
      { t: 'profil', nr: '43', text: '**Sieh** dir dein Fehlerprofil an. Die App zeigt dir für jedes Lernziel eine Ampel. **Bearbeite** zu jedem gelben oder roten Lernziel eine Wiederholungsrunde.' },
      { t: 'self', nr: '44', text: '**Schätze** dich selbst ein. **Kreuze** für jeden Satz an, wie sicher du bist.', ziele: Object.values(LJ.lernziele) },
      { t: 'merkblatt', nr: '45', text: '**Öffne** das Merkblatt. Es enthält alle Merken-Kästen. Du kannst es ausdrucken oder als PDF speichern. **Lies** es am Tag vor dem Test noch einmal durch.' },
      { t: 'task', nr: '46', titel: 'Den Fall lösen', text: '**Löse** den Fall. **Lies** dir dazu alle fünf Hinweise noch einmal durch (oben unter „Hinweise“). **Beantworte** dann die Fragen der Kommissarin.', lz: 'LZ2', fall: true, items: [
        I.ch('m7.46.1', '**Wähle**: Wer hat den Pokal genommen?', ['Herr Brandt', 'Lina', 'Tom', 'Mia'], 'Tom'),
        I.ch('m7.46.2', '**Wähle**: Wozu hat er oder sie den Pokal genommen?', ['um ihn zu verstecken', 'damit der Name eingraviert wird', 'weil er kaputt war'], 'damit der Name eingraviert wird'),
        I.order('m7.46.3', '**Baue** aus den Bausteinen den Abschlusssatz für den Bericht. Denk an das Komma.', ['Tom hat den Pokal', 'am Freitag um 17:20 Uhr', 'aus dem Lehrerzimmer', 'geholt,', 'damit', 'der Name der Siegermannschaft', 'rechtzeitig', 'eingraviert wird.'], [['Tom hat den Pokal', 'am Freitag um 17:20 Uhr', 'aus dem Lehrerzimmer', 'geholt,', 'damit', 'der Name der Siegermannschaft', 'rechtzeitig', 'eingraviert wird.']], { lz: 'LZ7' }),
        I.sel('m7.46.4', '**Bestimme** die Adverbiale im Abschlusssatz nach Funktion und Form.', [
          { label: '*am Freitag um 17:20 Uhr* – Funktion', options: LJ.FUNKTIONEN, answer: 'temporal', errFn: 'func' },
          { label: '*am Freitag um 17:20 Uhr* – Form', options: LJ.FORMEN, answer: 'Präpositionalgruppe' },
          { label: '*aus dem Lehrerzimmer* – Funktion', options: LJ.FUNKTIONEN, answer: 'lokal', errFn: 'func' },
          { label: '*aus dem Lehrerzimmer* – Form', options: LJ.FORMEN, answer: 'Präpositionalgruppe' },
          { label: '*damit … eingraviert wird* – Funktion', options: LJ.FUNKTIONEN, answer: 'final', errFn: 'func' },
          { label: '*damit … eingraviert wird* – Form', options: LJ.FORMEN, answer: 'Nebensatz' },
        ]),
      ] },
      { t: 'finish', md: 'Tom wollte die AG überraschen. Der Name der Siegermannschaft sollte schon bei der Siegerehrung auf dem Pokal stehen. Leider hat er niemandem Bescheid gesagt. Die Siegerehrung wird am Montag nachgeholt – mit Gravur.\n\nHerzlichen Glückwunsch: Du bekommst das Abzeichen **Meisterdetektivin / Meisterdetektiv**!' },
    ],
  });

  /* Profi-Akten: frei nach Expressweg der Akte (nach), nach dem Abschlussfall alle */
  LJ.profi = [
    { nr: 'P1', nach: 'm2', text: '**Bestimme** alle Adverbiale in diesem Satz nach ihrer Funktion: *Am Freitag lief Herr Brandt wegen des Gewitters schnell mit dem Schlüssel zur Turnhalle.*', items: [
      I.sel('p1.1', '*Am Freitag lief Herr Brandt wegen des Gewitters schnell mit dem Schlüssel zur Turnhalle.*', [['Am Freitag', 'temporal'], ['wegen des Gewitters', 'kausal'], ['schnell', 'modal'], ['mit dem Schlüssel', 'instrumental'], ['zur Turnhalle', 'lokal']].map(([l, a]) => ({ label: l, options: LJ.FUNKTIONEN, answer: a, errFn: 'func' }))),
    ] },
    { nr: 'P2', nach: 'm3', text: '**Bestimme** alle Adverbiale nach Funktion und Form: *Gestern rannte Lina wegen des Gewitters schnell nach Hause, weil sie keinen Schirm hatte.*', items: [
      I.sel('p2.1', '*Gestern rannte Lina wegen des Gewitters schnell nach Hause, weil sie keinen Schirm hatte.*', [['Gestern', 'temporal', 'Adverb'], ['wegen des Gewitters', 'kausal', 'Präpositionalgruppe'], ['schnell', 'modal', 'Adjektiv'], ['nach Hause', 'lokal', 'Präpositionalgruppe'], ['weil sie keinen Schirm hatte', 'kausal', 'Nebensatz']].flatMap(([l, f, fo]) => [{ label: `*${l}* – Funktion`, options: LJ.FUNKTIONEN, answer: f, errFn: 'func' }, { label: `*${l}* – Form`, options: LJ.FORMEN, answer: fo }])),
    ] },
    { nr: 'P3', nach: 'm4', text: '**Entscheide**, welche Bedeutung das markierte Wort hat.', items: [
      I.ch('p3.1', '**Während** Mia fotografierte, sang der Chor.', ['gleichzeitig (temporal)', 'Gegensatz'], 'gleichzeitig (temporal)'),
      I.ch('p3.2', 'Lina ging nach Hause, **während** Mia blieb.', ['gleichzeitig (temporal)', 'Gegensatz'], 'Gegensatz'),
      I.ch('p3.3', 'Tom ist schneller **als** Lina.', ['temporale Subjunktion', 'Vergleich'], 'Vergleich'),
      I.ch('p3.4', '**Da** die Halle zu war, trainierte die AG draußen.', ['kausale Subjunktion', 'lokales Adverb'], 'kausale Subjunktion'),
      I.ch('p3.5', 'Der Pokal steht wieder **da**.', ['kausale Subjunktion', 'lokales Adverb'], 'lokales Adverb'),
    ] },
    { nr: 'P4', nach: 'm4', text: '**Untersuche** das komplexe Satzgefüge. **Ordne** jedem Teil die passende Bezeichnung zu. *Der Pokal, den Tom, nachdem das Spiel vorbei war, in die Werkstatt brachte, steht jetzt wieder im Regal.*', items: [
      I.sel('p4.1', '*Der Pokal, den Tom, nachdem das Spiel vorbei war, in die Werkstatt brachte, steht jetzt wieder im Regal.*', [['Der Pokal', 'Hauptsatz (Teil 1)'], ['den Tom … in die Werkstatt brachte', 'Relativsatz'], ['nachdem das Spiel vorbei war', 'Temporalsatz'], ['steht jetzt wieder im Regal', 'Hauptsatz (Teil 2)']].map(([l, a]) => ({ label: `*${l}*`, options: ['Hauptsatz (Teil 1)', 'Hauptsatz (Teil 2)', 'Relativsatz', 'Temporalsatz'], answer: a }))),
      I.ch('p4.2', 'In welchem Satz steckt der Temporalsatz (Trägersatz)?', ['im Hauptsatz', 'im Relativsatz'], 'im Relativsatz'),
    ] },
    { nr: 'P5', nach: 'm4', text: '**Vergleiche** die beiden Satzanfänge für eine Detektivgeschichte. **Erkläre** in zwei bis drei Sätzen, welcher spannender wirkt und warum.\n\na) *Tom öffnete die Tür, als plötzlich das Licht ausging.*\n\nb) *Als plötzlich das Licht ausging, öffnete Tom die Tür.*', items: [
      I.open('p5.1', '', { beispiel: 'In a) steht der Nebensatz im Nachfeld. Das überraschende Ereignis kommt am Ende und wirkt wie eine Wendung. In b) steht es im Vorfeld; zuerst wird die Stimmung aufgebaut, dann folgt die Handlung.' }),
    ] },
    { nr: 'P6', nach: 'm6', text: '*wenn* kann zwei Bedeutungen haben (Ausblick auf Klasse 9). **Entscheide**: Zeit (temporal) oder Bedingung?', items: [
      I.ch('p6.1', '**Immer wenn** die Glocke läutet, rennen alle los.', ['Zeit', 'Bedingung'], 'Zeit', { fb: 'immer dann, wenn' }),
      I.ch('p6.2', '**Wenn** es morgen regnet, fällt das Spiel aus.', ['Zeit', 'Bedingung'], 'Bedingung', { fb: 'Ersatzprobe: Passt *falls*, ist es eine Bedingung.' }),
      I.ch('p6.3', '**Wenn** Tom trainiert, hört er Musik.', ['Zeit', 'Bedingung'], 'Zeit', { fb: 'jedes Mal, wenn' }),
    ] },
  ];
})();
