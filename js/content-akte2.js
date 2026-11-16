/* Modul III (Akte 2): Formen des Adverbials */
(function () {
  const { I } = LJ;
  const BAUSTEINE = ['im Büro', 'am Freitag', 'mit Eile'];

  LJ.modules.push({
    id: 'm3', nr: 'III', akte: 2, kurz: 'Akte 2', titel: 'Viele Formen, eine Aufgabe: Formen des Adverbials',
    leitfrage: 'Woraus kann ein Adverbial bestehen?',
    ziele: ['die Form eines Adverbials (Adverb, Präpositionalgruppe, Adjektiv, Nominalgruppe, Nebensatz) **bestimmen**.', 'Präpositionen und Subjunktionen **unterscheiden**.'],
    wortspeicher: { box: 'wortspeicher', md: '| Begriff | Erklärung |\n| --- | --- |\n| Adverb | Wort, das sich nicht verändert: *hier, dort, heute, gestern, sofort, deshalb* |\n| Präposition | Verhältniswort: *in, an, auf, nach, mit, wegen, während, seit, für, zu* |\n| Präpositionalgruppe | Präposition + Nomen (mit Begleitern): *wegen des Regens*, *in der Aula* |\n| Adjektiv | Eigenschaftswort; man kann es steigern: *schnell – schneller* |\n| Nominalgruppe | Nomen mit seinen Begleitern, hier ohne Präposition: *den ganzen Tag* |\n| Subjunktion (unterordnende Konjunktion) | leitet einen Nebensatz ein: *weil, als, damit, nachdem, während* |' },
    steps: [
      { t: 'repeat', nr: '9', n: 2, text: '**Bearbeite** die zwei Wiederholungskarten aus Akte 1.' },
      { t: 'page', nr: '10', text: '**Sieh** dir Mias Fotos an und **lies** die Bildunterschriften.', title: 'M6 Akte 2: Mias Fotos', blocks: [
        'Mia schreibt für die Schülerzeitung. Sie hat beim Schulfest viele Fotos gemacht.',
        { img: 'fotos', bilder: [
          { motiv: 'regal', text: 'Um 17:10 Uhr steht der Pokal noch **dort** im Regal.' },
          { motiv: 'person', text: 'Eine Person rennt **eilig** aus dem Lehrerzimmer.' },
          { motiv: 'tasche', text: 'Sie trägt **unter dem Arm** eine große Sporttasche.' },
          { motiv: 'uhr', text: 'Die Uhr im Flur zeigt 17:20 Uhr. **Wegen der Eile** hat die Person die Tür offen gelassen.' },
        ] },
      ] },
      { t: 'page', nr: '11', text: '**Lies** dir die Erklärung durch.', title: 'M7 Ein Adverbial – viele Formen', blocks: [
        'Adverbiale haben dieselbe Aufgabe: Sie geben Umstände an. Sie können aber ganz verschieden gebaut sein. Schau dir die temporalen Adverbiale an. Alle antworten auf die Frage *Wann?*:',
        '| Form | Beispiel |\n| --- | --- |\n| Adverb | *Mia fotografierte **gestern**.* |\n| Präpositionalgruppe | *Mia fotografierte **am Freitag**.* |\n| Nominalgruppe | *Mia fotografierte **den ganzen Abend**.* |\n| Nebensatz | *Mia fotografierte, **als das Fest begann**.* |',
        'Bei modalen Adverbialen kommt oft ein Adjektiv vor: *Die Person rannte **eilig**.*',
        '**So erkennst du die Form:**\n- **Adverb:** ein einzelnes Wort, das sich nie verändert (*dort, heute, sofort, deshalb*).\n- **Adjektiv:** ein einzelnes Wort, das man steigern kann (*eilig – eiliger, schnell – schneller*).\n- **Präpositionalgruppe:** Präposition + Nomen. Sie beginnt mit einer Präposition (*in, an, nach, mit, wegen, zu …*). Danach folgt ein Nomen mit seinen Begleitern.\n- **Nominalgruppe:** Nomen mit Begleitern, aber ohne Präposition. Meist sind es Zeitangaben: *den ganzen Tag, jeden Morgen, letzte Woche*.\n- **Nebensatz:** Er beginnt mit einer Subjunktion, und das finite Verb steht am Ende. Darum geht es in Akte 3.',
        { box: 'achtung', title: 'Präposition oder Subjunktion?', md: 'Manche Wörter gibt es zweimal. Schau, was danach kommt:\n- *während **des Festes*** – danach kommt nur eine Nominalgruppe → **Präposition**\n- *während **das Fest lief*** – danach kommt ein Satz mit dem Verb am Ende → **Subjunktion**\n\nGenauso: *seit dem Fest* (Präposition) – *seit der Pokal fehlt* (Subjunktion); *nach dem Spiel* (Präposition) – *nachdem das Spiel vorbei war* (Subjunktion).' },
      ] },
      { t: 'task', nr: '12', text: '**Bestimme** die Form des markierten Adverbials.', lz: 'LZ2', items: [
        I.form('m3.12.1', 'Mia fotografierte **dort**.', 'Adverb'),
        I.form('m3.12.2', '**Nach dem Konzert** war die Aula leer.', 'Präpositionalgruppe'),
        I.form('m3.12.3', 'Lina lief **schnell** weg.', 'Adjektiv'),
        I.form('m3.12.4', 'Die AG trainierte **den ganzen Nachmittag**.', 'Nominalgruppe'),
        I.form('m3.12.5', '**Als die Musik begann**, verschwand der Pokal.', 'Nebensatz'),
        I.form('m3.12.6', '**Heute** befragt die Kommissarin alle Zeugen.', 'Adverb'),
        I.form('m3.12.7', 'Der Zeuge sprach **mit zitternder Stimme**.', 'Präpositionalgruppe'),
        I.form('m3.12.8', '**Jeden Morgen** kontrolliert Herr Brandt die Türen.', 'Nominalgruppe'),
      ] },
      { t: 'task', nr: '13', text: '**Ordne** jedes Adverbial ein: Welche Funktion hat es, und welche Form?', lz: 'LZ2', items: [
        ['m3.13.1', '**Wegen des Lärms** ging Herr Oswald hinaus.', 'kausal', 'Präpositionalgruppe'],
        ['m3.13.2', '**Deshalb** rief Mia die Kommissarin an.', 'kausal', 'Adverb'],
        ['m3.13.3', 'Die Person schlich **leise** davon.', 'modal', 'Adjektiv'],
        ['m3.13.4', '**Letzte Woche** war der Pokal noch neu.', 'temporal', 'Nominalgruppe'],
        ['m3.13.5', '**Hier** stand der Pokal.', 'lokal', 'Adverb'],
        ['m3.13.6', 'Tom ging **zum Training**.', 'final', 'Präpositionalgruppe'],
        ['m3.13.7', '**Mit dem Handy** rief Mia die Kommissarin an.', 'instrumental', 'Präpositionalgruppe'],
      ].map(([id, s, f, fo]) => I.sel(id, s, [{ label: 'Funktion', options: LJ.FUNKTIONEN, answer: f, errFn: 'func' }, { label: 'Form', options: LJ.FORMEN, answer: fo }])) },
      { t: 'task', nr: '14', text: '**Entscheide**, ob das markierte Wort eine Präposition oder eine Subjunktion ist.', lz: 'LZ2', items: [
        ['m3.14.1', '**Während** des Festes war es laut.', 'Präposition'],
        ['m3.14.2', '**Während** Mia fotografierte, rannte eine Person vorbei.', 'Subjunktion'],
        ['m3.14.3', '**Seit** dem Schulfest fehlt der Pokal.', 'Präposition'],
        ['m3.14.4', '**Seit** der Pokal fehlt, ist die AG traurig.', 'Subjunktion'],
        ['m3.14.5', '**Nach** dem Spiel feierten alle.', 'Präposition'],
        ['m3.14.6', 'Die Kommissarin wartet, **bis** alle da sind.', 'Subjunktion'],
      ].map(([id, s, a]) => I.ch(id, s, ['Präposition', 'Subjunktion'], a, { err: { Präposition: 'F4', Subjunktion: 'F4' } })) },
      { t: 'page', nr: null, title: 'Merken: Formen des Adverbials', blocks: [
        { box: 'merken', title: 'Formen des Adverbials', md: 'Ein Adverbial kann verschieden gebaut sein:\n- **Adverb:** *dort, heute, sofort, deshalb*\n- **Adjektiv:** *schnell, leise, eilig*\n- **Präpositionalgruppe** (Präposition + Nomen): *in der Aula, wegen des Regens, zum Training*\n- **Nominalgruppe:** *den ganzen Tag, jeden Morgen*\n- **Nebensatz:** *als das Fest begann, weil es regnete*\n\nFolgt auf *während, seit* oder *bis* nur eine Nominalgruppe, ist es eine **Präposition**. Folgt ein Satz mit dem Verb am Ende, ist es eine **Subjunktion**.' },
      ] },
      { t: 'task', nr: '15', text: '**Wähle** ein Adverbial mit derselben Funktion, aber in der angegebenen Form.', lz: 'LZ2', items: [
        I.ch('m3.15.1', 'Herr Brandt kam **gestern** *(Adverb)*. → Präpositionalgruppe:', BAUSTEINE, 'am Freitag', { fb: '*am Freitag* ist wie *gestern* temporal.' }),
        I.ch('m3.15.2', 'Die Person rannte **eilig** *(Adjektiv)*. → Präpositionalgruppe:', ['mit großer Eile', 'den ganzen Flur', 'deshalb'], 'mit großer Eile', { fb: '*mit großer Eile* ist wie *eilig* modal.' }),
        I.ch('m3.15.3', 'Mia wartete **am Abend** *(Präpositionalgruppe)*. → Nominalgruppe:', ['den ganzen Abend', 'abends', 'in der Aula'], 'den ganzen Abend', { fb: '*den ganzen Abend* ist temporal und eine Nominalgruppe.' }),
        I.ch('m3.15.4', '**Wegen des Regens** blieben alle drinnen *(Präpositionalgruppe)*. → Adverb:', ['deshalb', 'drinnen', 'heute'], 'deshalb', { fb: 'Der neue Satz lautet: *Deshalb blieben alle drinnen.*' }),
      ] },
      { t: 'self', ziele: ['Ich kann die Form eines Adverbials bestimmen.', 'Ich kann Präpositionen und Subjunktionen unterscheiden.'] },
      { t: 'check', id: 'c2', nr: 'Check', text: '**Stopp!** Bearbeite die fünf Aufgaben ohne Lupe.', express: 4, ue: 3, lz: 'LZ2',
        A: [
          I.form('m3.c2A.1', 'Tom wartete **draußen**.', 'Adverb'),
          I.form('m3.c2A.2', '**Nach der Pause** ging das Spiel weiter.', 'Präpositionalgruppe'),
          I.form('m3.c2A.3', 'Die Fans feierten **die ganze Nacht**.', 'Nominalgruppe'),
          I.ch('m3.c2A.4', 'Präposition oder Subjunktion? **Seit** Lina hier wohnt, fährt sie Bus.', ['Präposition', 'Subjunktion'], 'Subjunktion', { err: { Präposition: 'F4' } }),
          I.sel('m3.c2A.5', 'Herr Oswald spielte **laut**.', [{ label: 'Funktion', options: LJ.FUNKTIONEN, answer: 'modal', errFn: 'func' }, { label: 'Form', options: LJ.FORMEN, answer: 'Adjektiv' }]),
        ],
        B: [
          I.form('m3.c2B.1', 'Mia kam **sofort**.', 'Adverb'),
          I.form('m3.c2B.2', 'Die Kommissarin kam **mit dem Fahrrad**.', 'Präpositionalgruppe'),
          I.form('m3.c2B.3', '**Als es dunkel wurde**, ging das Licht an.', 'Nebensatz'),
          I.ch('m3.c2B.4', 'Präposition oder Subjunktion? **Während** der Pause blieb die Tür offen.', ['Präposition', 'Subjunktion'], 'Präposition', { err: { Subjunktion: 'F4' } }),
          I.sel('m3.c2B.5', 'Lina blieb **wegen der Hausaufgaben** zu Hause.', [{ label: 'Funktion', options: LJ.FUNKTIONEN, answer: 'kausal', errFn: 'func' }, { label: 'Form', options: LJ.FORMEN, answer: 'Präpositionalgruppe' }]),
        ],
        ueStep: { t: 'task', nr: 'Ü2', titel: 'Übungsrunde', text: '**Bearbeite** die sechs Übungen. Die Lupe hilft dir.', lz: 'LZ2', items: [
          I.form('m3.u2.1', '**Morgen** kommt die Polizei.', 'Adverb', { hint: 'Ein Wort, das sich nie verändert?' }),
          I.form('m3.u2.2', 'Tom lief **mit der Tasche** weg.', 'Präpositionalgruppe', { hint: 'Womit beginnt die Gruppe?' }),
          I.form('m3.u2.3', 'Herr Brandt sprach **freundlich**.', 'Adjektiv', { hint: 'Kannst du steigern: freundlicher?' }),
          I.form('m3.u2.4', 'Die AG übte **jeden Dienstag**.', 'Nominalgruppe', { hint: 'Nomen mit Begleiter, aber ohne Präposition.' }),
          I.form('m3.u2.5', '**Bevor das Fest begann**, putzte Tom den Pokal.', 'Nebensatz', { hint: 'Steht ein Verb am Ende?' }),
          I.ch('m3.u2.6', 'Präposition oder Subjunktion? **Bis** Montag bleibt die Halle zu.', ['Präposition', 'Subjunktion'], 'Präposition', { err: { Subjunktion: 'F4' }, hint: 'Was folgt nach *bis*: ein Nomen oder ein Satz?' }),
        ] },
        zw: { titel: 'Zweiter Weg 2', steps: [
          { t: 'page', nr: 'Z5', text: '**Sieh** dir den Wegweiser an. **Klicke** dich durch die beiden Beispiele.', title: 'M8 Der Formen-Wegweiser', blocks: [
            'Schau dir zuerst das **erste Wort** des Adverbials an. Dann folge den Fragen:',
            { img: 'wegweiser' },
            '1. **Ist das Adverbial ein Satz mit eigenem Verb am Ende?** → **Nebensatz** (*als das Fest begann*)\n2. **Beginnt es mit einer Präposition** wie *in, an, auf, mit, nach, wegen, zu*? → **Präpositionalgruppe** (*in der Aula*)\n3. **Besteht es aus Nomen und Begleiter, aber ohne Präposition?** → **Nominalgruppe** (*den ganzen Tag*)\n4. **Ist es nur ein Wort?** Kannst du es steigern (*leise – leiser*)? → **Adjektiv**. Bleibt es immer gleich (*dort, heute*)? → **Adverb**',
            { anim: 'schritte', titel: 'Zwei Beispiele', schritte: ['*mit großer Eile* – kein Verb, beginnt mit *mit* (Präposition) → **Präpositionalgruppe**.', '*leise* – ein Wort, *leiser* geht → **Adjektiv**.'] },
          ] },
          { t: 'task', nr: 'Z6', text: '**Folge** dem Wegweiser. Welche Form hat das Adverbial?', lz: 'LZ2', wegweiser: true, items: [
            I.form('m3.z6.1', '*auf dem Sportplatz*', 'Präpositionalgruppe', { fb: 'beginnt mit *auf*' }),
            I.form('m3.z6.2', '*bald*', 'Adverb', { fb: '*balder* geht nicht.' }),
            I.form('m3.z6.3', '*langsam*', 'Adjektiv', { fb: '*langsamer* geht.' }),
            I.form('m3.z6.4', '*jeden Abend*', 'Nominalgruppe'),
            I.form('m3.z6.5', '*nachdem Tom gegangen war*', 'Nebensatz', { fb: 'Das Verb *war* steht am Ende.' }),
          ] },
          { t: 'task', nr: 'Z7', text: '**Bestimme** die Form. Den Wegweiser kannst du jederzeit aufklappen.', lz: 'LZ2', wegweiser: true, items: [
            I.form('m3.z7.1', 'Mia stand **oben**.', 'Adverb'),
            I.form('m3.z7.2', 'Die Person rannte **durch den Flur**.', 'Präpositionalgruppe'),
            I.form('m3.z7.3', 'Lina antwortete **ehrlich**.', 'Adjektiv'),
            I.form('m3.z7.4', '**Den ganzen Morgen** regnete es.', 'Nominalgruppe'),
            I.form('m3.z7.5', 'Tom kam zurück, **als alle feierten**.', 'Nebensatz'),
          ] },
        ] } },
      { t: 'clue', nr: 2, md: 'Um 17:20 Uhr rannte eine Person eilig mit einer großen Sporttasche aus dem Lehrerzimmer.' },
    ],
  });
})();
