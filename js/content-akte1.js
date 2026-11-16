/* Modul I (Dienstantritt) und Modul II (Akte 1) */
(function () {
  const { I } = LJ;

  LJ.modules.push({
    id: 'm1', nr: 'I', kurz: 'Dienstantritt', titel: 'Was weißt du schon?',
    leitfrage: 'Was weißt du noch über Sätze und Satzglieder?',
    ziele: ['das Prädikat und die Satzglieder eines Satzes **bestimmen**.', 'Hauptsatz und Nebensatz **unterscheiden**.'],
    steps: [
      { t: 'page', nr: '1', text: '**Lies** dir die Nachricht der Kommissarin durch.', title: 'M1 Willkommen in der Detektei!', blocks: [
        'Hallo und willkommen im Team! Ich bin Kommissarin Kaya Wendt.',
        'Wir haben einen neuen Fall: Beim Schulfest am Freitag ist der Pokal der Fußball-AG verschwunden. Er sollte um 18 Uhr bei der Siegerehrung überreicht werden. Doch das Regal im Lehrerzimmer war leer.',
        'Gute Ermittlerinnen und Ermittler stellen genaue Fragen: **Wo? Wann? Warum? Wie? Womit? Wozu?** Genau diese Fragen helfen dir auch in der Grammatik. Mit ihnen findest du nämlich die Adverbiale – das sind die Satzglieder, die Umstände angeben.',
        '**So arbeitest du:**\n- Du bearbeitest fünf Akten und am Ende den Abschlussfall.\n- Für jede richtige Antwort bekommst du Punkte. Im ersten Versuch gibt es mehr.\n- Die **Lupe** zeigt dir einen Tipp. Sie kostet aber 2 Punkte.\n- Am Ende jeder Akte steht ein **Check**. Danach weiß die App, wie es für dich am besten weitergeht.\n- Für jede bestandene Akte bekommst du ein Abzeichen und einen Hinweis zum Fall.',
        'Zuerst prüfen wir, was du aus Klasse 5 und 6 noch weißt. Keine Sorge: Dieser Start-Check zählt nicht für die Note.',
      ] },
      { t: 'check', id: 'start', nr: '2', titel: 'Start-Check', text: '**Bearbeite** den Start-Check. Er hat acht kurze Aufgaben.', express: 6, ue: null, A: [
        I.tap('m1.2.1', '**Tippe** das Prädikat an.', '{Der Hausmeister} [schließt] {die Turnhalle} [ab.]', { fb: 'Das Prädikat ist zweiteilig: *schließt … ab*.' }),
        I.tap('m1.2.2', '**Tippe** das Prädikat an.', '{Lina} [hat] {den Pokal} [gesehen.]', { fb: 'Das Prädikat ist zweiteilig: *hat … gesehen*.' }),
        I.ch('m1.2.3', '**Teile** den Satz in Satzglieder ein. Welche Einteilung stimmt?\n\n*Die Schülerinnen der 8b feiern in der Aula.*', ['Die Schülerinnen der 8b | feiern | in der Aula', 'Die Schülerinnen | der 8b feiern | in der Aula', 'Die Schülerinnen der 8b feiern | in | der Aula'], 'Die Schülerinnen der 8b | feiern | in der Aula'),
        I.tap('m1.2.4', '**Tippe** das Subjekt an.', '{Am Abend} {suchte} [Herr Brandt] {den Schlüssel.}'),
        I.tap('m1.2.5', '**Tippe** das Akkusativobjekt an.', '{Am Abend} {suchte} {Herr Brandt} [den Schlüssel.]'),
        I.tap('m1.2.6', '**Tippe** das Dativobjekt an.', '{Mia} {zeigt} [der Kommissarin] {ein Foto.}'),
        I.ch('m1.2.7', '**Entscheide**: Hauptsatz oder Nebensatz?\n\n*weil das Licht ausging*', ['Hauptsatz', 'Nebensatz'], 'Nebensatz', { fb: 'Subjunktion *weil*, das finite Verb steht am Ende.' }),
        I.ch('m1.2.8', '**Entscheide**: Hauptsatz oder Nebensatz?\n\n*Das Licht ging aus.*', ['Hauptsatz', 'Nebensatz'], 'Hauptsatz', { fb: 'Das finite Verb *ging* steht an zweiter Stelle.' }),
      ], zw: { titel: 'Auffrischung: Satzglieder', steps: [
        { t: 'page', nr: 'Z1', text: '**Lies** dir die Auffrischung durch.', title: 'M2 Satzglieder auffrischen', blocks: [
          '**Das Prädikat ist der Kern.** Es ist das Verb im Satz. Manchmal besteht es aus zwei Teilen: *Herr Brandt **schließt** die Tür **ab**.* Die beiden Teile bilden eine Klammer um den Satz (Verbklammer).',
          '**Die Umstellprobe zeigt die Satzglieder.** Was du gemeinsam umstellen kannst, ist ein Satzglied:\n- *Lina | sah | den Pokal | im Regal.*\n- *Im Regal | sah | Lina | den Pokal.*',
          '**Satzglieder erfragst du vom Prädikat aus:**\n- Subjekt: *Wer oder was sah den Pokal?* → *Lina*\n- Akkusativobjekt: *Wen oder was sah Lina?* → *den Pokal*\n- Dativobjekt: *Wem zeigt Mia das Foto?* → *der Kommissarin*',
          '**Hauptsatz oder Nebensatz?** Im Hauptsatz steht das finite Verb (das Verb mit Personalendung) an zweiter Stelle: *Das Licht **ging** aus.* Im Nebensatz steht es am Ende: *weil das Licht aus**ging***. Ein Nebensatz kann nicht allein stehen.',
          { anim: 'umstellen', satz: ['Lina', 'sah', 'den Pokal', 'im Regal'], neu: ['im Regal', 'sah', 'Lina', 'den Pokal'] },
        ] },
        { t: 'task', nr: 'Z1', text: 'Übungen zur Auffrischung', lz: 'LZ1', items: [
          I.tap('m1.z1.1', '**Tippe** das Prädikat an.', '{Mia} [ruft] {die Kommissarin} [an.]'),
          I.order('m1.z1.2', '**Stelle** den Satz um, sodass *in der Pause* vorne steht.', ['In der Pause', 'trainiert', 'die AG', '.'], [['In der Pause', 'trainiert', 'die AG', '.']]),
          I.tap('m1.z1.3', '**Tippe** das Subjekt an.', '{Gestern} {hat} [Tom] {den Pokal} {geputzt.}'),
          I.tap('m1.z1.4', '**Tippe** das Akkusativobjekt an.', '{Gestern} {hat} {Tom} [den Pokal] {geputzt.}'),
          I.tap('m1.z1.5', '**Tippe** das Dativobjekt an.', '{Herr Oswald} {gibt} [dem Chor] {die Noten.}'),
          I.ch('m1.z1.6', '**Entscheide**: Hauptsatz oder Nebensatz?\n\n*als die Glocke läutete*', ['Hauptsatz', 'Nebensatz'], 'Nebensatz'),
        ] },
      ] } },
    ],
  });

  const wsAkte1 = { box: 'wortspeicher', md: '| Begriff | Erklärung |\n| --- | --- |\n| adverbiale Bestimmung (kurz: Adverbial) | Satzglied, das die Umstände angibt: Ort, Zeit, Grund, Art und Weise, Mittel, Zweck |\n| Weglassprobe | Du lässt ein Satzglied weg. Bleibt der Satz vollständig, ist es oft ein Adverbial. |\n| lokal | adverbiale Bestimmung des Ortes (Lokaladverbial): Wo? Wohin? Woher? |\n| temporal | adverbiale Bestimmung der Zeit (Temporaladverbial): Wann? Wie lange? Seit wann? |\n| kausal | adverbiale Bestimmung des Grundes (Kausaladverbial): Warum? Weshalb? |\n| modal | adverbiale Bestimmung der Art und Weise (Modaladverbial): Wie? Auf welche Weise? |\n| instrumental | adverbiale Bestimmung des Mittels (Instrumentaladverbial): Womit? Wodurch? |\n| final | **neu:** adverbiale Bestimmung des Zwecks (Finaladverbial): Wozu? Mit welchem Ziel? |' };

  LJ.modules.push({
    id: 'm2', nr: 'II', akte: 1, kurz: 'Akte 1', titel: 'Wo, wann, warum? Adverbiale erkennen',
    leitfrage: 'Welche Satzglieder geben die Umstände einer Handlung an?',
    ziele: ['Adverbiale mit W-Fragen und der Weglassprobe **erkennen**.', 'Adverbiale nach ihrer Funktion (lokal, temporal, kausal, modal, instrumental, final) **bestimmen**.', 'Adverbiale von Objekten **unterscheiden**.'],
    wortspeicher: wsAkte1,
    steps: [
      { t: 'page', nr: '3', text: '**Lies** die erste Zeugenaussage.', title: 'M3 Akte 1: Die Aussage des Hausmeisters', blocks: [
        'Herr Brandt, der Hausmeister, berichtet:',
        { box: 'zitat', md: '„Am Freitag habe ich um 17 Uhr die Turnhalle abgeschlossen. Danach bin ich wegen eines Anrufs schnell ins Büro gegangen. Den Pokal habe ich vorher im Lehrerzimmer gesehen.“' },
        'Die Kommissarin notiert: *Wann? Wo? Warum? Wie?* Die Antworten stecken in den adverbialen Bestimmungen.',
      ] },
      { t: 'page', nr: '4', text: '**Lies** dir die Erklärung durch. **Klicke** dich durch das Beispiel.', title: 'M4 Was ist ein Adverbial?', blocks: [
        'Der Satz *Herr Brandt schloss die Turnhalle ab.* ist vollständig. Die Kommissarin weiß aber noch zu wenig. Sie fragt nach:',
        { anim: 'wachsen', basis: ['Herr Brandt', 'schloss', 'die Turnhalle', 'ab.'], schritte: [
          { frage: 'Wann?', teil: 'am Freitag', f: 'temporal', pos: 2 },
          { frage: 'Warum?', teil: 'wegen des Gewitters', f: 'kausal', pos: 3 },
          { frage: 'Wie?', teil: 'schnell', f: 'modal', pos: 4 },
        ] },
        'Die neuen Satzglieder kennst du aus Klasse 6: Es sind **adverbiale Bestimmungen**. Kurz sagt man auch **Adverbiale**. Sie geben die Umstände an: Ort, Zeit, Grund, Art und Weise, Mittel oder Zweck.',
        '**So erkennst du ein Adverbial:**\n1. **W-Frage:** Es antwortet auf *wo?*, *wann?*, *warum?*, *wie?*, *womit?* oder *wozu?*.\n2. **Weglassprobe:** Du kannst es meistens weglassen. Der Satz bleibt trotzdem vollständig.\n3. **Umstellprobe:** Es ist ein Satzglied. Du kannst es als Ganzes an den Satzanfang stellen: ***Am Freitag** schloss Herr Brandt die Turnhalle ab.*',
        '**Die sechs Funktionen:**\n\n| Funktion | adverbiale Bestimmung … | Frage | Beispiel |\n| --- | --- | --- | --- |\n| lokal | des Ortes | Wo? Wohin? Woher? | *im Lehrerzimmer*, *zur Turnhalle* |\n| temporal | der Zeit | Wann? Wie lange? Seit wann? | *am Freitag*, *zwei Stunden*, *seit Montag* |\n| kausal | des Grundes | Warum? Weshalb? | *wegen des Gewitters*, *aus Angst* |\n| modal | der Art und Weise | Wie? Auf welche Weise? | *schnell*, *sorgfältig* |\n| instrumental | des Mittels | Womit? Wodurch? | *mit dem Schlüssel*, *durch einen Trick* |\n| final (**neu**) | des Zwecks | Wozu? Mit welchem Ziel? | *zum Schutz*, *für das Turnier* |',
        { box: 'achtung', title: 'Objekt oder Adverbial?', md: 'Auch Objekte kannst du erfragen – aber mit *wen?*, *wem?* oder *was?*. Neu ist nur **final**; die anderen fünf kennst du schon aus Klasse 6. *Lina sucht **ihren Schlüssel**.* (Wen oder was? → Objekt) – *Lina sucht **im Klassenzimmer**.* (Wo? → Adverbial)' },
      ] },
      { t: 'task', nr: '5', text: '**Tippe** in jedem Satz alle Adverbiale an. Die Weglassprobe hilft dir.', lz: 'LZ1', items: [
        I.tap('m2.5.1', '', '{Die Siegerehrung} {beginnt} [um 18 Uhr.]', { hint: 'Wann beginnt die Siegerehrung?' }),
        I.tap('m2.5.2', '', '{Die Fußball-AG} {wartete} [ungeduldig.]', { hint: 'Wie wartete die AG?' }),
        I.tap('m2.5.3', '', '{Mia} {fotografierte} [in der Aula.]', { hint: 'Wo fotografierte Mia?' }),
        I.tap('m2.5.4', '', '[Wegen des Regens] {feierten} {alle} [drinnen.]', { hint: 'Es sind zwei: Warum? Und wo?' }),
        I.tap('m2.5.5', '', '{Der Pokal} {stand} [seit Montag] [im Regal.]', { hint: 'Es sind zwei: Seit wann? Und wo?' }),
        I.tap('m2.5.6', '', '{Lina} {lief} [zur Bushaltestelle.]', { hint: 'Wohin lief Lina?' }),
      ] },
      { t: 'task', nr: '6', text: '**Bestimme** die Funktion des markierten Adverbials. **Wähle** zuerst die passende Frage, dann die Funktion.', lz: 'LZ2', items: [
        I.fq('m2.6.1', '**Am Freitagabend** war die Aula voll.', 'Wann?', 'temporal'),
        I.fq('m2.6.2', 'Herr Oswald spielte **fröhlich** Klavier.', 'Wie?', 'modal'),
        I.fq('m2.6.3', '**Aus Angst vor Ärger** schwieg der Zeuge.', 'Warum?', 'kausal'),
        I.fq('m2.6.4', 'Die Kommissarin fuhr **zur Schule**.', 'Wohin?', 'lokal'),
        I.fq('m2.6.5', '**Zum Schutz vor Dieben** schloss Herr Brandt die Tür ab.', 'Wozu?', 'final'),
        I.fq('m2.6.6', 'Lina wartete **zwei Stunden**.', 'Wie lange?', 'temporal'),
        I.fq('m2.6.7', '**Wegen der lauten Musik** hörte niemand etwas.', 'Warum?', 'kausal'),
        I.fq('m2.6.8', 'Der Pokal stand **hinter dem Vorhang**.', 'Wo?', 'lokal'),
        I.fq('m2.6.9', 'Herr Brandt öffnete die Tür **mit dem Generalschlüssel**.', 'Womit?', 'instrumental'),
        I.fq('m2.6.10', 'Die AG trainierte **für das Turnier**.', 'Wozu?', 'final'),
      ] },
      { t: 'task', nr: '7', text: '**Entscheide**, ob das markierte Satzglied ein Objekt oder ein Adverbial ist.', lz: 'LZ1', items: [
        I.ch('m2.7.1', 'Lina sucht **ihren Schlüssel**.', ['Objekt', 'Adverbial'], 'Objekt', { err: { Adverbial: 'F1' }, fb: 'Wen oder was sucht Lina? → Objekt' }),
        I.ch('m2.7.2', 'Lina sucht **im Klassenzimmer**.', ['Objekt', 'Adverbial'], 'Adverbial', { err: { Objekt: 'F1' }, fb: 'Wo sucht Lina? → Adverbial' }),
        I.ch('m2.7.3', 'Mia hilft **der Kommissarin**.', ['Objekt', 'Adverbial'], 'Objekt', { err: { Adverbial: 'F1' }, fb: 'Wem hilft Mia? → Objekt' }),
        I.ch('m2.7.4', 'Mia hilft **gern**.', ['Objekt', 'Adverbial'], 'Adverbial', { err: { Objekt: 'F1' }, fb: 'Wie hilft Mia? → Adverbial' }),
        I.ch('m2.7.5', 'Herr Brandt schließt **am Abend** ab.', ['Objekt', 'Adverbial'], 'Adverbial', { err: { Objekt: 'F1' }, fb: 'Wann schließt er ab? → Adverbial' }),
        I.ch('m2.7.6', 'Herr Brandt schließt **die Turnhalle** ab.', ['Objekt', 'Adverbial'], 'Objekt', { err: { Adverbial: 'F1' }, fb: 'Wen oder was schließt er ab? → Objekt' }),
      ] },
      { t: 'page', nr: null, title: 'Merken: Adverbiale', blocks: [
        { box: 'merken', title: 'Adverbiale', md: '**Adverbiale Bestimmungen** (kurz: Adverbiale) sind Satzglieder. Sie geben die Umstände einer Handlung an. Du erkennst sie an der W-Frage und mit der Weglassprobe.\n- **lokal** (des Ortes) – Wo? Wohin? Woher?\n- **temporal** (der Zeit) – Wann? Wie lange? Seit wann?\n- **kausal** (des Grundes) – Warum? Weshalb?\n- **modal** (der Art und Weise) – Wie? Auf welche Weise?\n- **instrumental** (des Mittels) – Womit? Wodurch?\n- **final** (des Zwecks) – Wozu? Mit welchem Ziel?\n\nFragst du mit *wen?*, *wem?* oder *was?*, ist es kein Adverbial, sondern ein Objekt.' },
      ] },
      { t: 'task', nr: '8', text: '**Erweitere** den Satz *Der Zeuge erzählte.* Wähle dazu aus den Bausteinen ein temporales, ein lokales und ein kausales Adverbial aus. Die App baut den Satz zusammen.', lz: 'LZ1', items: [
        I.sel('m2.8.1', 'Bausteine: *gestern · im Lehrerzimmer · wegen der Aufregung · leise · zur Erinnerung · nach dem Fest · aus Neugier · in der Aula*', [
          { label: 'temporal', options: ['gestern', 'im Lehrerzimmer', 'wegen der Aufregung', 'leise', 'zur Erinnerung', 'nach dem Fest', 'aus Neugier', 'in der Aula'], answer: ['gestern', 'nach dem Fest'] },
          { label: 'kausal', options: ['gestern', 'im Lehrerzimmer', 'wegen der Aufregung', 'leise', 'zur Erinnerung', 'nach dem Fest', 'aus Neugier', 'in der Aula'], answer: ['wegen der Aufregung', 'aus Neugier'] },
          { label: 'lokal', options: ['gestern', 'im Lehrerzimmer', 'wegen der Aufregung', 'leise', 'zur Erinnerung', 'nach dem Fest', 'aus Neugier', 'in der Aula'], answer: ['im Lehrerzimmer', 'in der Aula'] },
        ], { build: 'Der Zeuge erzählte {0} {1} {2}.' }),
        I.open('m2.8.2', '**Schreibe** einen eigenen Satz über den Fall mit mindestens zwei Adverbialen.', { beispiel: 'Am Freitag suchte die Kommissarin gründlich im Lehrerzimmer.' }),
      ] },
      { t: 'self', ziele: ['Ich kann adverbiale Bestimmungen mit W-Fragen und der Weglassprobe erkennen.', 'Ich kann Adverbiale nach ihrer Funktion bestimmen.', 'Ich kann Adverbiale von Objekten unterscheiden.'] },
      { t: 'check', id: 'c1', nr: 'Check', text: '**Stopp!** Jetzt zeigst du, was du in Akte 1 gelernt hast. Bearbeite die fünf Aufgaben ohne Lupe.', express: 4, ue: 3, lz: 'LZ1',
        A: [
          I.tap('m2.c1A.1', '**Tippe** das Adverbial an.', '[Nach dem Spiel] {jubelten} {die Fans.}'),
          I.tap('m2.c1A.2', '**Tippe** das Adverbial an.', '{Die Kommissarin} {las} {den Bericht} [aufmerksam.]'),
          I.fn('m2.c1A.3', '**Wegen eines Staus** kam der Bus zu spät.', 'kausal', { lz: 'LZ2' }),
          I.fn('m2.c1A.4', 'Die Spuren führten **in den Keller**.', 'lokal', { lz: 'LZ2' }),
          I.ch('m2.c1A.5', 'Objekt oder Adverbial? Mia fragt **den Hausmeister**.', ['Objekt', 'Adverbial'], 'Objekt', { err: { Adverbial: 'F1' } }),
        ],
        B: [
          I.tap('m2.c1B.1', '**Tippe** das Adverbial an.', '{Lina} {wartete} [neben der Schule.]'),
          I.tap('m2.c1B.2', '**Tippe** das Adverbial an.', '{Der Pokal} {glänzte} [hell.]'),
          I.fn('m2.c1B.3', 'Die Klasse traf sich **zur Planung des Festes**.', 'final', { lz: 'LZ2' }),
          I.fn('m2.c1B.4', 'Tom öffnete die Tür **mit einer Karte**.', 'instrumental', { lz: 'LZ2' }),
          I.ch('m2.c1B.5', 'Objekt oder Adverbial? Die AG trainiert **am Mittwoch**.', ['Objekt', 'Adverbial'], 'Adverbial', { err: { Objekt: 'F1' } }),
        ],
        ueStep: { t: 'task', nr: 'Ü1', titel: 'Übungsrunde', text: '**Bearbeite** die sieben Übungen. Die Lupe hilft dir, wenn du unsicher bist.', lz: 'LZ2', items: [
          I.tap('m2.u1.1', '**Tippe** das Adverbial an.', '[Gestern] {blieb} {die Aula} {geschlossen.}', { hint: 'Wann blieb die Aula geschlossen?', lz: 'LZ1' }),
          I.fn('m2.u1.2', 'Mia rannte **aus dem Gebäude**.', 'lokal', { hint: 'Frag: Woher rannte Mia?' }),
          I.fn('m2.u1.3', '**Aus Neugier** öffnete Lina die Kiste.', 'kausal', { hint: 'Frag: Warum öffnete Lina die Kiste?' }),
          I.fn('m2.u1.4', 'Der Detektiv arbeitet **gründlich**.', 'modal', { hint: 'Frag: Wie arbeitet der Detektiv?' }),
          I.fn('m2.u1.5', '**Für die Ermittlung** braucht die Kommissarin Fotos.', 'final', { hint: 'Frag: Wozu braucht sie Fotos?' }),
          I.ch('m2.u1.6', 'Objekt oder Adverbial? Die Kommissarin sucht **einen Zeugen**.', ['Objekt', 'Adverbial'], 'Objekt', { err: { Adverbial: 'F1' }, hint: 'Passt wen? Dann ist es ein Objekt.', lz: 'LZ1' }),
          I.fn('m2.u1.7', 'Mia notierte die Uhrzeit **mit einem Bleistift**.', 'instrumental', { hint: 'Frag: Womit notierte Mia die Uhrzeit?' }),
        ] },
        zw: { titel: 'Zweiter Weg 1', steps: [
          { t: 'page', nr: 'Z2', text: '**Lies** dir die Ermittler-Methode durch. **Klicke** dich durch das Beispiel.', title: 'M5 Die Ermittler-Methode: Satzglieder Schritt für Schritt bestimmen', blocks: [
            { box: 'methode', title: 'Satzglieder bestimmen', md: '1. **Prädikat finden** – Welches Wort sagt, was passiert? Achte auf zweiteilige Prädikate.\n2. **Umstellen** – Welche Wörter kannst du gemeinsam an den Satzanfang stellen? Jede Gruppe ist ein Satzglied.\n3. **Fragen** – Frag vom Prädikat aus: *Wer?* → Subjekt. *Wen? Wem? Was?* → Objekt. *Wo? Wann? Warum? Wie? Womit? Wozu?* → Adverbial.\n4. **Weglassen** – Lass das Satzglied weg. Bleibt der Satz vollständig, ist es meistens ein Adverbial.' },
            { anim: 'schritte', titel: 'Beispiel: *Am Freitag fotografierte Mia in der Aula.*', schritte: [
              'Prädikat: ***fotografierte***',
              'Umstellen: *Mia | fotografierte | am Freitag | in der Aula.* → vier Satzglieder',
              'Fragen: *Wer fotografierte?* → *Mia* (Subjekt). *Wann fotografierte Mia?* → *am Freitag* (Adverbial, temporal). *Wo fotografierte Mia?* → *in der Aula* (Adverbial, lokal).',
              'Weglassen: *Mia fotografierte.* – Der Satz ist vollständig. *Am Freitag* und *in der Aula* sind also Adverbiale.',
            ] },
          ] },
          { t: 'task', nr: 'Z3', text: '**Wähle** für jedes markierte Satzglied die passende Frage.', lz: 'LZ2', items: [
            I.ch('m2.z3.1', '**Am Morgen** kam die Kommissarin.', ['Wann?', 'Wo?', 'Warum?'], 'Wann?', { fb: 'Wann? → temporal' }),
            I.ch('m2.z3.2', 'Tom trainierte **auf dem Sportplatz**.', ['Wann?', 'Wo?', 'Wer?'], 'Wo?', { fb: 'Wo? → lokal' }),
            I.ch('m2.z3.3', '**Wegen des Lärms** wachte Herr Brandt auf.', ['Warum?', 'Wie?', 'Wo?'], 'Warum?', { fb: 'Warum? → kausal' }),
            I.ch('m2.z3.4', 'Lina rief **laut**.', ['Wie?', 'Wann?', 'Wozu?'], 'Wie?', { fb: 'Wie? → modal' }),
            I.ch('m2.z3.5', 'Mia kam **für ein Foto** zurück.', ['Wozu?', 'Warum?', 'Wo?'], 'Wozu?', { fb: 'Wozu? → final' }),
            I.ch('m2.z3.6', 'Herr Brandt öffnete die Tür **mit dem Generalschlüssel**.', ['Womit?', 'Wann?', 'Warum?'], 'Womit?', { fb: 'Womit? → instrumental' }),
          ] },
          { t: 'task', nr: 'Z4', text: '**Wende** die Ermittler-Methode an. **Tippe** das Adverbial an und **wähle** dann seine Funktion. Das Prädikat ist fett gedruckt.', lz: 'LZ2', items: [
            I.tap('m2.z4.1a', '', '{Die Fans} {**warteten**} [vor dem Tor.]'), I.fn('m2.z4.1b', 'Die Fans warteten **vor dem Tor**.', 'lokal'),
            I.tap('m2.z4.2a', '', '{Herr Oswald} {**sang**} [leise.]'), I.fn('m2.z4.2b', 'Herr Oswald sang **leise**.', 'modal'),
            I.tap('m2.z4.3a', '', '[Seit Dienstag] {**fehlt**} {ein Schlüssel.}'), I.fn('m2.z4.3b', '**Seit Dienstag** fehlt ein Schlüssel.', 'temporal'),
            I.tap('m2.z4.4a', '', '[Aus Müdigkeit] {**schlief**} {Lina} {ein.}'), I.fn('m2.z4.4b', '**Aus Müdigkeit** schlief Lina ein.', 'kausal'),
            I.tap('m2.z4.5a', '', '{Tom} {**kam**} [zum Aufräumen.]'), I.fn('m2.z4.5b', 'Tom kam **zum Aufräumen**.', 'final'),
          ] },
        ] } },
      { t: 'clue', nr: 1, md: 'Der Pokal stand am Freitag um 17 Uhr noch im Lehrerzimmer. Herr Brandt war danach im Büro.' },
    ],
  });
})();
