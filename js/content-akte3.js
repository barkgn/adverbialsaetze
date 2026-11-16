/* Modul IV (Akte 3): Adverbialsätze */
(function () {
  const { I } = LJ;
  const R = (a) => ({ label: 'Regel', options: LJ.KOMMAREGELN, answer: a });
  const FELD = (a) => ({ label: 'Feld des Nebensatzes', options: ['Vorfeld', 'Mittelfeld', 'Nachfeld'], answer: a });
  const KS = (id, s, a) => I.ch(id, s, ['Konjunktion', 'Subjunktion'], a, { err: { Konjunktion: 'F5', Subjunktion: 'F5' } });
  const ns = (id, s) => I.tap(id, '**Markiere** den Nebensatz.', s, { lz: 'LZ3' });
  const fe = (id, s, rows) => I.sel(id, s, rows.map(([teil, feld]) => ({ label: teil, options: LJ.FELDER, answer: feld })), { lz: 'LZ3' });

  LJ.modules.push({
    id: 'm4', nr: 'IV', akte: 3, kurz: 'Akte 3', titel: 'Weil, als, damit: Adverbialsätze',
    leitfrage: 'Wie kann ein ganzer Nebensatz die Aufgabe eines Adverbials übernehmen?',
    ziele: ['Hauptsatz und Nebensatz in einem Satzgefüge **unterscheiden**.', 'Konjunktionen und Subjunktionen **unterscheiden**.', 'Kommas zwischen Hauptsatz und Nebensatz richtig **setzen** und **begründen**.', 'Adverbialsätze nach ihrer Funktion **bestimmen**.', 'die Stellung eines Adverbialsatzes im Feldermodell **beschreiben**.'],
    wortspeicher: { box: 'wortspeicher', md: '| Begriff | Erklärung |\n| --- | --- |\n| finites Verb | das Verb mit Personalendung: *sie **kam**, er **hat** gesehen* |\n| Hauptsatz | finites Verb an zweiter Stelle; kann allein stehen |\n| Nebensatz | beginnt meist mit einer Subjunktion; finites Verb am Ende; kann nicht allein stehen |\n| Satzgefüge | Hauptsatz + Nebensatz |\n| Satzreihe | Hauptsatz + Hauptsatz |\n| Konjunktion (nebenordnende Konjunktion) | verbindet gleichrangige Sätze: *und, oder, aber, denn, sondern* |\n| Subjunktion (unterordnende Konjunktion) | leitet einen Nebensatz ein: *weil, da, als, nachdem, bevor, damit, indem …* |\n| Adverbialsatz | Nebensatz (Gliedsatz), der die Aufgabe einer adverbialen Bestimmung hat |\n| Vorfeld / Nachfeld | Platz vor der linken Verbklammer / nach der rechten Verbklammer im Feldermodell |' },
    steps: [
      { t: 'repeat', nr: '16', n: 2, text: '**Bearbeite** die zwei Wiederholungskarten aus Akte 1 und 2.' },
      { t: 'page', nr: '17', text: '**Lies** Linas Aussage.', title: 'M9 Akte 3: Linas Aussage', blocks: [
        'Lina aus der 8b ist auf Mias Foto im Flur zu sehen. Sie sagt:',
        { box: 'zitat', md: '„Ich war um 17:15 Uhr im Lehrerzimmer, **weil ich Herrn Oswald Noten bringen wollte**. **Als ich hereinkam**, war niemand da. Ich bin schnell wieder gegangen, **damit ich den Bus noch erwische**. Eine Sporttasche hatte ich nicht dabei.“' },
        'Die Kommissarin markiert drei Nebensätze. Sie verraten Grund, Zeit und Ziel.',
      ] },
      { t: 'page', nr: '18', teil: 'Teil A: Nebensätze erkennen und Kommas setzen', text: '**Lies** dir die Erklärung durch.', title: 'M10 Hauptsatz, Nebensatz und das Komma', blocks: [
        '**Der Hauptsatz** kann allein stehen. Sein finites Verb steht an zweiter Stelle: *Lina **ging** nach Hause.*',
        '**Der Nebensatz** kann nicht allein stehen. Er beginnt meist mit einer **Subjunktion** (z. B. *weil, als, damit*). Das finite Verb steht **am Ende**: *…, **weil** sie müde **war**.*',
        'Hauptsatz und Nebensatz zusammen bilden ein **Satzgefüge**: *Lina ging nach Hause, **weil** sie müde **war**.*',
        { anim: 'verbwandert', haupt: ['Sie', 'war', 'müde.'], neben: ['weil', 'sie', 'müde', 'war.'] },
        '**Konjunktion oder Subjunktion?** Konjunktionen wie *und, oder, aber, denn, sondern* verbinden zwei Hauptsätze. Das ist eine **Satzreihe**. Das Verb bleibt an zweiter Stelle:\n- *Lina ging, **denn** sie **war** müde.* → Konjunktion, Verb an zweiter Stelle\n- *Lina ging, **weil** sie müde **war**.* → Subjunktion, Verb am Ende',
        '**Das Komma:**\n- Zwischen Hauptsatz und Nebensatz steht **immer** ein Komma – egal, ob der Nebensatz vorne oder hinten steht: *Als ich hereinkam, war niemand da.*\n- Ein eingeschobener Nebensatz bekommt **zwei** Kommas: *Lina ging, als niemand da war, schnell wieder.*\n- Vor *aber, denn, sondern* steht ein Komma. Vor *und* und *oder* brauchst du meistens keins.',
      ] },
      { t: 'task', nr: '19', text: '**Markiere** in jedem Satz den Nebensatz. **Tippe** danach das finite Verb im Nebensatz an.', lz: 'LZ3', items: [
        ns('m4.19.1a', '{Lina ging nach Hause,} [weil sie müde war.]'), I.tapW('m4.19.1b', '**Tippe** das finite Verb im Nebensatz an.', 'Lina ging nach Hause, weil sie müde war.', ['war']),
        ns('m4.19.2a', '[Als die Glocke läutete,] {rannten alle in die Aula.}'), I.tapW('m4.19.2b', '**Tippe** das finite Verb im Nebensatz an.', 'Als die Glocke läutete, rannten alle in die Aula.', ['läutete']),
        ns('m4.19.3a', '{Herr Oswald suchte die Noten,} [bevor das Konzert begann.]'), I.tapW('m4.19.3b', '**Tippe** das finite Verb im Nebensatz an.', 'Herr Oswald suchte die Noten, bevor das Konzert begann.', ['begann']),
        ns('m4.19.4a', '[Nachdem Mia das Foto gemacht hatte,] {schickte sie es der Kommissarin.}'), I.tapW('m4.19.4b', '**Tippe** das finite Verb im Nebensatz an.', 'Nachdem Mia das Foto gemacht hatte, schickte sie es der Kommissarin.', ['hatte'], { fb: 'Bei *gemacht hatte* ist *hatte* das finite Verb (mit Personalendung).' }),
        ns('m4.19.5a', '{Die Fans warteten draußen,} [bis der Bus kam.]'), I.tapW('m4.19.5b', '**Tippe** das finite Verb im Nebensatz an.', 'Die Fans warteten draußen, bis der Bus kam.', ['kam']),
        ns('m4.19.6a', '{Herr Brandt ging,} [als alle Türen zu waren,] {nach Hause.}'), I.tapW('m4.19.6b', '**Tippe** das finite Verb im Nebensatz an.', 'Herr Brandt ging, als alle Türen zu waren, nach Hause.', ['waren']),
      ] },
      { t: 'task', nr: '20', text: '**Entscheide**: Ist das markierte Wort eine Konjunktion oder eine Subjunktion? Schau dir dazu das Verb im zweiten Satz an.', lz: 'LZ3', items: [
        KS('m4.20.1', 'Mia blieb, **denn** sie wollte fotografieren.', 'Konjunktion'),
        KS('m4.20.2', 'Mia blieb, **weil** sie fotografieren wollte.', 'Subjunktion'),
        KS('m4.20.3', 'Lina rief an, **aber** niemand nahm ab.', 'Konjunktion'),
        KS('m4.20.4', '**Da** der Bus wartete, beeilte sich Lina.', 'Subjunktion'),
        KS('m4.20.5', 'Herr Brandt schloss ab **und** ging nach Hause.', 'Konjunktion'),
        KS('m4.20.6', 'Die AG jubelte, **als** der Pokal überreicht wurde.', 'Subjunktion'),
      ] },
      { t: 'task', nr: '21', text: '**Setze** die fehlenden Kommas. **Tippe** dazu in die Lücke zwischen zwei Wörtern. Manchmal fehlt kein Komma. **Wähle** danach die passende Regel.', lz: 'LZ5', items: [
        I.comma('m4.21.1', 'Lina rannte los, weil der Bus kam.', { extra: R('Hauptsatz – Nebensatz') }),
        I.comma('m4.21.2', 'Als es dunkel wurde, gingen die Gäste.', { extra: R('Hauptsatz – Nebensatz') }),
        I.comma('m4.21.3', 'Herr Brandt kontrollierte, nachdem alle gegangen waren, die Türen.', { extra: R('eingeschobener Nebensatz') }),
        I.comma('m4.21.4', 'Mia lachte, denn das Foto war lustig.', { extra: R('Satzreihe mit denn/aber') }),
        I.comma('m4.21.5', 'Die Kommissarin wartete, bis Lina kam.', { extra: R('Hauptsatz – Nebensatz') }),
        I.comma('m4.21.6', 'Wir bleiben hier und warten.', { extra: R('kein Komma'), fb: 'Zwei Prädikate mit *und* – kein Nebensatz, also kein Komma.' }),
      ] },
      { t: 'check', id: 'c3a', nr: 'Check: Nebensätze und Kommas', text: '**Stopp!** Bearbeite die fünf Aufgaben ohne Lupe.', express: 4, ue: 3, lz: 'LZ3',
        A: [
          ns('m4.c3aA.1', '{Tom lachte,} [als er das Foto sah.]'),
          ns('m4.c3aA.2', '[Bevor die Musik anfing,] {war der Pokal weg.}'),
          KS('m4.c3aA.3', 'Lina ging, **denn** es war spät.', 'Konjunktion'),
          I.comma('m4.c3aA.4', 'Weil es regnete, blieben alle drinnen.', { lz: 'LZ5' }),
          I.comma('m4.c3aA.5', 'Mia rief, nachdem sie das Foto gesehen hatte, die Kommissarin an.', { lz: 'LZ5' }),
        ],
        B: [
          ns('m4.c3aB.1', '{Die AG war traurig,} [weil der Pokal fehlte.]'),
          ns('m4.c3aB.2', '[Nachdem alle gegangen waren,] {schloss Herr Brandt ab.}'),
          KS('m4.c3aB.3', 'Tom blieb, **weil** er helfen wollte.', 'Subjunktion'),
          I.comma('m4.c3aB.4', 'Herr Oswald spielte Klavier, während die Gäste aßen.', { lz: 'LZ5' }),
          I.comma('m4.c3aB.5', 'Lina kam herein und legte die Noten hin.', { lz: 'LZ5' }),
        ],
        ueStep: { t: 'task', nr: 'Ü3', titel: 'Übungsrunde', text: '**Bearbeite** die sechs Übungen. Die Lupe hilft dir.', lz: 'LZ3', items: [
          ns('m4.u3.1', '{Die Gäste klatschten,} [als der Chor fertig war.]'),
          ns('m4.u3.2', '[Weil Tom fehlte,] {spielte die AG zu zehnt.}'),
          KS('m4.u3.3', 'Herr Brandt suchte, **aber** er fand nichts.', 'Konjunktion'),
          KS('m4.u3.4', '**Nachdem** Lina gegangen war, kam Tom.', 'Subjunktion'),
          I.comma('m4.u3.5', 'Mia wartete, bis die Kommissarin kam.', { lz: 'LZ5', hint: 'Wo beginnt der Nebensatz?' }),
          I.comma('m4.u3.6', 'Tom hat, als niemand hinsah, den Pokal eingepackt.', { lz: 'LZ5', hint: 'Der Nebensatz steht mitten im Satz.' }),
        ].map((it, i) => (it.hint ? it : { ...it, hint: i < 2 ? 'Wo steht ein Verb ganz am Ende?' : 'Wo steht das Verb im zweiten Satz?' })) },
        zw: { titel: 'Zweiter Weg 3a', steps: [
          { t: 'page', nr: 'Z8', text: '**Lies** dir die drei Schritte durch. **Klicke** dich durch das Beispiel.', title: 'M11 Den Nebensatz in drei Schritten finden', blocks: [
            { anim: 'schritte', titel: '*Lina ging nach Hause, weil sie müde war.*', schritte: [
              '**Suche das Verb, das ganz am Ende eines Satzteils steht.** *Lina ging nach Hause, weil sie müde **war**.*',
              '**Geh von diesem Verb nach vorne bis zur Subjunktion.** *→ **weil** sie müde war.* Das ist der Nebensatz.',
              '**Setze das Komma** an die Grenze zwischen Hauptsatz und Nebensatz: *Lina ging nach Hause**,** weil sie müde war.*',
            ] },
            { box: 'tipp', title: 'Die häufigsten Subjunktionen', md: '*weil, da, als, wenn, während, nachdem, bevor, seit, bis, damit, indem, ohne dass, dass, ob*\n\nSteht eines dieser Wörter am Anfang eines Satzteils und das Verb am Ende, hast du einen Nebensatz gefunden.' },
          ] },
          { t: 'task', nr: 'Z9', text: '**Finde** den Nebensatz mit den drei Schritten. **Tippe** zuerst das Verb am Ende und die Subjunktion an. **Setze** danach das Komma.', lz: 'LZ5', items: [
            ['m4.z9.1', 'Lina lief schnell weil der Bus kam.', ['weil', 'kam'], 'Lina lief schnell, weil der Bus kam.'],
            ['m4.z9.2', 'Als Mia kam war der Pokal weg.', ['Als', 'kam'], 'Als Mia kam, war der Pokal weg.'],
            ['m4.z9.3', 'Herr Oswald war froh weil die Noten da waren.', ['weil', 'waren'], 'Herr Oswald war froh, weil die Noten da waren.'],
            ['m4.z9.4', 'Bevor die Gäste kamen putzte Tom den Pokal.', ['Bevor', 'kamen'], 'Bevor die Gäste kamen, putzte Tom den Pokal.'],
            ['m4.z9.5', 'Die AG wartete bis der Trainer pfiff.', ['bis', 'pfiff'], 'Die AG wartete, bis der Trainer pfiff.'],
          ].flatMap(([id, s, w, t]) => [I.tapW(id + 'a', '**Tippe** das Verb am Ende und die Subjunktion an.', s, w, { lz: 'LZ3' }), I.comma(id + 'b', t)]) },
        ] } },
      { t: 'page', nr: '22', teil: 'Teil B: Adverbialsätze bestimmen', text: '**Lies** dir die Erklärung durch.', title: 'M12 Der Nebensatz als Adverbial', blocks: [
        'Die Kommissarin fragt: *Wann rannten alle in die Aula?* Die Antwort kann ein Adverbial sein: ***Um 18 Uhr** rannten alle in die Aula.* Sie kann aber auch ein ganzer Nebensatz sein: ***Als die Glocke läutete**, rannten alle in die Aula.*',
        'Der Nebensatz übernimmt hier die Aufgabe eines Adverbials. Darum heißt er **Adverbialsatz**. Das kennst du schon aus Klasse 6. Du bestimmst seine Funktion wie bei einem Adverbial: mit der W-Frage. Oft verrät dir auch die Subjunktion die Funktion.',
        '| Adverbialsatz | Frage | Subjunktionen | Beispiel |\n| --- | --- | --- | --- |\n| Lokalsatz | Wo? Wohin? Woher? | *wo, wohin, woher* | *Tom wartete dort, **wo** der Bus hält.* |\n| Temporalsatz | Wann? Wie lange? Seit wann? | *als, wenn, während, nachdem, bevor, seit, bis, sobald* | ***Als** die Glocke läutete, rannten alle los.* |\n| Kausalsatz | Warum? Weshalb? | *weil, da* | *Lina ging, **weil** der Bus kam.* |\n| Modalsatz | Wie? Auf welche Weise? Wodurch? | *indem, ohne dass* | *Tom öffnete die Tür, **indem** er den Schlüssel benutzte.* |\n| Finalsatz | Wozu? Mit welchem Ziel? | *damit* | *Lina rennt, **damit** sie den Bus erwischt.* |',
        { box: 'achtung', title: 'Ein Wort – mehrere Bedeutungen', md: '- *als*: ***Als** Mia kam, …* (temporal) – aber: *Tom ist größer **als** Lina.* (Vergleich, kein Nebensatz)\n- *während*: ***Während** Mia fotografierte, …* (temporal: gleichzeitig). Manchmal zeigt *während* auch einen Gegensatz: *Lina ging, **während** Mia blieb.*\n- *da*: ***Da** es regnete, …* (kausal: weil) – aber: *Der Pokal steht **da**.* (Adverb, lokal)\n- *seit*: *seit dem Fest* (Präposition) – *seit der Pokal fehlt* (Subjunktion)\n- *indem*: Ein *indem*-Satz nennt oft das Mittel (*Wodurch?*). Bei den Adverbialsätzen zählen wir ihn trotzdem zu den **Modalsätzen**.' },
      ] },
      { t: 'task', nr: '23', text: '**Bestimme** die Funktion des Adverbialsatzes. **Wähle** zuerst die passende Frage, dann die Funktion.', lz: 'LZ3', items: [
        I.fq('m4.23.1', 'Lina ging, **weil sie den Bus erreichen wollte**.', 'Warum?', 'kausal'),
        I.fq('m4.23.2', '**Als Herr Brandt abschloss**, war es 17 Uhr.', 'Wann?', 'temporal'),
        I.fq('m4.23.3', 'Mia kam früher, **damit sie gute Fotos machen konnte**.', 'Wozu?', 'final'),
        I.fq('m4.23.4', 'Herr Oswald beruhigte die Kinder, **indem er Musik spielte**.', 'Wie?', 'modal'),
        I.fq('m4.23.5', 'Die Kommissarin suchte dort, **wo der Pokal zuletzt stand**.', 'Wo?', 'lokal'),
        I.fq('m4.23.6', '**Da die Tür offen war**, ging Lina hinein.', 'Warum?', 'kausal'),
        I.fq('m4.23.7', '**Bevor das Fest begann**, putzte Tom den Pokal.', 'Wann?', 'temporal'),
        I.fq('m4.23.8', 'Die AG übt jeden Tag, **damit sie das Turnier gewinnt**.', 'Wozu?', 'final'),
        I.fq('m4.23.9', 'Lina verließ das Zimmer, **ohne dass sie jemand sah**.', 'Wie?', 'modal'),
        I.fq('m4.23.10', '**Seit der Pokal fehlt**, ist die Stimmung schlecht.', 'Seit wann?', 'temporal'),
      ].map((it) => (it.id === 'm4.23.4' ? { ...it, rows: [{ ...it.rows[0], answer: ['Wie?', 'Womit?'] }, it.rows[1]] } : it)) },
      { t: 'task', nr: '24', text: '**Wähle** die passende Subjunktion, damit der Satz die angegebene Funktion hat.', lz: 'LZ3', items: [
        I.ch('m4.24.1', '___ es regnete, blieben alle drinnen. *(kausal)*', ['Weil', 'Damit', 'Bevor'], 'Weil'),
        I.ch('m4.24.2', '___ die Siegerehrung begann, war der Pokal weg. *(temporal)*', ['Als', 'Weil', 'Indem'], 'Als'),
        I.ch('m4.24.3', 'Mia schreibt alles auf, ___ sie nichts vergisst. *(final)*', ['damit', 'da', 'als'], 'damit', { err: { da: 'F2' } }),
        I.ch('m4.24.4', 'Herr Brandt öffnete die Tür, ___ er den Generalschlüssel benutzte. *(modal)*', ['indem', 'seit', 'weil'], 'indem'),
        I.ch('m4.24.5', 'Die Kommissarin wartete, ___ alle Zeugen da waren. *(temporal)*', ['bis', 'damit', 'wo'], 'bis'),
        I.ch('m4.24.6', 'Lina wartete dort, ___ der Bus hält. *(lokal)*', ['wo', 'als', 'weil'], 'wo'),
      ] },
      { t: 'page', nr: '25', text: '**Lies** dir die Erklärung zum Feldermodell durch.', title: 'M13 Wo steht der Adverbialsatz?', blocks: [
        'Du kennst das Feldermodell aus Klasse 5 und 6. Ein Adverbialsatz kann an verschiedenen Stellen stehen:',
        '| Vorfeld | linke Verbklammer | Mittelfeld | rechte Verbklammer | Nachfeld |\n| --- | --- | --- | --- | --- |\n| *Als die Glocke läutete,* | *rannten* | *alle in die Aula.* | | |\n| *Alle* | *rannten* | *in die Aula,* | | *als die Glocke läutete.* |\n| *Alle* | *rannten,* | *als die Glocke läutete, in die Aula.* | | |',
        'Steht der Adverbialsatz im **Vorfeld**, folgt direkt danach das finite Verb des Hauptsatzes: *Als die Glocke läutete, **rannten** alle …*',
      ] },
      { t: 'task', nr: '25', text: '**Ordne** jeden Satzteil dem passenden Feld zu.', lz: 'LZ3', items: [
        fe('m4.25.1', '*Weil es regnete, hat das Fest drinnen stattgefunden.*', [['Weil es regnete,', 'Vorfeld'], ['hat', 'linke Verbklammer'], ['das Fest drinnen', 'Mittelfeld'], ['stattgefunden.', 'rechte Verbklammer']]),
        fe('m4.25.2', '*Lina ist gegangen, bevor die Musik begann.*', [['Lina', 'Vorfeld'], ['ist', 'linke Verbklammer'], ['gegangen,', 'rechte Verbklammer'], ['bevor die Musik begann.', 'Nachfeld']]),
        fe('m4.25.3', '*Als Mia kam, war der Pokal schon weg.*', [['Als Mia kam,', 'Vorfeld'], ['war', 'linke Verbklammer'], ['der Pokal schon weg.', 'Mittelfeld']]),
        fe('m4.25.4', '*Herr Brandt hat die Tür abgeschlossen, damit niemand hineingeht.*', [['Herr Brandt', 'Vorfeld'], ['hat', 'linke Verbklammer'], ['die Tür', 'Mittelfeld'], ['abgeschlossen,', 'rechte Verbklammer'], ['damit niemand hineingeht.', 'Nachfeld']]),
      ] },
      { t: 'task', nr: '26', text: '**Stelle** den Satz so um, dass der Adverbialsatz im Vorfeld steht. **Schreibe** den neuen Satz in das Textfeld und denk an das Komma.', lz: 'LZ5', items: [
        I.text('m4.26.1', 'Die AG jubelte, als der Schiedsrichter pfiff.', ['Als der Schiedsrichter pfiff, jubelte die AG.'], { vorfeldVerb: 'jubelte' }),
        I.text('m4.26.2', 'Mia blieb in der Aula, weil sie fotografieren wollte.', ['Weil sie fotografieren wollte, blieb Mia in der Aula.', 'Weil Mia fotografieren wollte, blieb sie in der Aula.'], { vorfeldVerb: 'blieb' }),
        I.text('m4.26.3', 'Die Kommissarin las den Bericht, bevor sie Lina befragte.', ['Bevor sie Lina befragte, las die Kommissarin den Bericht.', 'Bevor die Kommissarin Lina befragte, las sie den Bericht.'], { vorfeldVerb: 'las' }),
      ] },
      { t: 'page', nr: null, title: 'Merken: Adverbialsätze', blocks: [
        { box: 'merken', title: 'Adverbialsätze', md: 'Ein **Adverbialsatz** ist ein Nebensatz, der die Aufgabe eines Adverbials hat.\n- Du erkennst ihn an der **Subjunktion** am Anfang und am **finiten Verb am Ende**.\n- Seine Funktion bestimmst du mit der W-Frage: **lokal** (*wo*), **temporal** (*als, nachdem, bevor, während, seit, bis*), **kausal** (*weil, da*), **modal** (*indem, ohne dass*), **final** (*damit*).\n- Zwischen Hauptsatz und Nebensatz steht **immer ein Komma**. Ein eingeschobener Nebensatz bekommt zwei Kommas.\n- Steht der Adverbialsatz im Vorfeld, folgt direkt das finite Verb des Hauptsatzes.' },
      ] },
      { t: 'self', ziele: ['Ich kann Hauptsatz und Nebensatz in einem Satzgefüge unterscheiden.', 'Ich kann Konjunktionen und Subjunktionen unterscheiden.', 'Ich kann Kommas zwischen Hauptsatz und Nebensatz richtig setzen und begründen.', 'Ich kann Adverbialsätze nach ihrer Funktion bestimmen.', 'Ich kann die Stellung eines Adverbialsatzes im Feldermodell beschreiben.'] },
      { t: 'check', id: 'c3b', nr: 'Check: Adverbialsätze bestimmen', text: '**Stopp!** Bearbeite die fünf Aufgaben ohne Lupe.', express: 4, ue: 3, lz: 'LZ3',
        A: [
          I.fn('m4.c3bA.1', 'Tom kam zu spät, **weil der Bus Verspätung hatte**.', 'kausal'),
          I.fn('m4.c3bA.2', '**Nachdem das Spiel vorbei war**, gab es Kuchen.', 'temporal'),
          I.fn('m4.c3bA.3', 'Herr Oswald übt lange, **damit das Konzert gelingt**.', 'final'),
          I.ch('m4.c3bA.4', '**Wähle** die passende Subjunktion *(modal)*: Mia half, ___ sie die Stühle aufstellte.', ['indem', 'weil', 'bis'], 'indem'),
          I.comma('m4.c3bA.5', 'Lina rief an, bevor sie losfuhr.', { extra: FELD('Nachfeld'), lz: 'LZ5' }),
        ],
        B: [
          I.fn('m4.c3bB.1', '**Als der Pokal fehlte**, rief Herr Oswald die Kommissarin.', 'temporal'),
          I.fn('m4.c3bB.2', '**Da Lina keinen Schlüssel hatte**, wartete sie draußen.', 'kausal'),
          I.fn('m4.c3bB.3', 'Tom wartete dort, **wo die Fahrräder stehen**.', 'lokal'),
          I.ch('m4.c3bB.4', '**Wähle** die passende Subjunktion *(final)*: Mia notiert die Zeit, ___ sie sie nicht vergisst.', ['damit', 'weil', 'als'], 'damit', { err: { weil: 'F2' } }),
          I.comma('m4.c3bB.5', 'Während die Gäste aßen, spielte die Band.', { extra: FELD('Vorfeld'), lz: 'LZ5' }),
        ],
        ueStep: { t: 'task', nr: 'Ü4', titel: 'Übungsrunde', text: '**Bearbeite** die sechs Übungen. Die Lupe hilft dir.', lz: 'LZ3', items: [
          I.fn('m4.u4.1', '**Weil der Chor sang**, war es laut.', 'kausal'),
          I.fn('m4.u4.2', '**Bevor Tom ging**, sprach er mit Herrn Oswald.', 'temporal'),
          I.fn('m4.u4.3', 'Lina beeilt sich, **damit sie pünktlich ist**.', 'final', { hint: '*damit* zeigt ein Ziel.' }),
          I.fn('m4.u4.4', 'Die Kommissarin fand die Spur, **indem sie die Fotos verglich**.', 'modal'),
          I.fn('m4.u4.5', 'Mia suchte dort, **wo sie das Foto gemacht hatte**.', 'lokal'),
          I.ch('m4.u4.6', '**Wähle** die passende Subjunktion *(temporal)*: ___ die Polizei kam, war Tom schon weg.', ['Als', 'Damit', 'Weil'], 'Als'),
        ].map((it) => (it.hint ? it : { ...it, hint: 'Frag den Hauptsatz: Wann? Warum? Wozu? Wie? Wo?' })) },
        zw: { titel: 'Zweiter Weg 3b', steps: [
          { t: 'page', nr: 'Z10', text: '**Lies** dir den Ersatz-Trick durch.', title: 'M14 Der Ersatz-Trick', blocks: [
            'Ersetze den ganzen Adverbialsatz durch ein einziges Wort. Welches Wort passt, verrät dir die Funktion:',
            '| Ersatzwort | Funktion |\n| --- | --- |\n| *dort* | lokal |\n| *dann* | temporal |\n| *deshalb* | kausal |\n| *so* oder *dadurch* | modal |\n| *dazu* | final |',
            { anim: 'ersatz', satz: 'Lina ging nach Hause,', ns: 'weil sie müde war.', wort: 'deshalb', neu: 'Lina ging deshalb nach Hause.', f: 'kausal' },
            '**Beispiel:** *Tom kam früher, **damit er helfen konnte**.* → *Tom kam **dazu** früher.* Das passt. Der Nebensatz ist also **final**.',
          ] },
          { t: 'task', nr: 'Z11', text: '**Ersetze** den Adverbialsatz durch eines der Ersatzwörter. **Wähle** dann die Funktion.', lz: 'LZ3', items: [
            ['m4.z11.1', '**Als der Chor sang**, verließ Lina den Raum.', 'dann', 'temporal'],
            ['m4.z11.2', 'Mia blieb, **weil sie noch Fotos machen wollte**.', 'deshalb', 'kausal'],
            ['m4.z11.3', 'Tom wartete, **wo die Busse halten**.', 'dort', 'lokal'],
            ['m4.z11.4', 'Herr Brandt sparte Zeit, **indem er den Generalschlüssel nahm**.', 'so / dadurch', 'modal'],
            ['m4.z11.5', 'Die AG trainiert hart, **damit sie gewinnt**.', 'dazu', 'final'],
          ].map(([id, s, w, f]) => I.sel(id, s, [{ label: 'Ersatzwort', options: ['dort', 'dann', 'deshalb', 'so / dadurch', 'dazu'], answer: w }, { label: 'Funktion', options: LJ.FUNKTIONEN, answer: f, errFn: 'func' }])) },
        ] } },
      { t: 'clue', nr: 3, md: 'Lina war um 17:15 Uhr im Lehrerzimmer, weil sie Noten bringen wollte. Sie hatte keine Sporttasche dabei. Die Person auf dem Foto war also nicht Lina.' },
    ],
  });
})();
