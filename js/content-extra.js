/* Ergänzungen: Punkte-Erklärung, Verständnisfragen nach jeder Erklärung, zusätzliche Tippaufgaben */
(function () {
  const { I } = LJ;
  I.wort = (id, prompt, accepted, o = {}) => ({ id, type: 'text', kurz: true, prompt, accepted, ...o });

  /* Schritt nach einer Seite (Titelanfang) bzw. nach einer Aufgabe (nr) einfügen – auch in Zweiten Wegen */
  function einfuegen(mid, wo, neu) {
    const m = LJ.modules.find((x) => x.id === mid);
    const treffer = (s) => (wo.titel && s.t === 'page' && s.title && s.title.startsWith(wo.titel)) || (wo.nr && s.nr === wo.nr && s.t !== 'page');
    const suche = (steps) => {
      for (let i = 0; i < steps.length; i++) {
        if (treffer(steps[i])) { steps.splice(i + 1, 0, ...[].concat(neu)); return true; }
        if (steps[i].t === 'check' && steps[i].zw && suche(steps[i].zw.steps)) return true;
      }
      return false;
    };
    if (!suche(m.steps)) console.warn('Einfügestelle nicht gefunden', mid, wo);
  }
  const V = (lz, items) => ({ t: 'task', titel: 'Verstanden?', verstaendnis: true, text: '**Beantworte** die Fragen zur Regel. So prüfst du, ob du die Erklärung verstanden hast, bevor es mit den Übungen losgeht.', lz, items });

  /* ── Punkte, Ränge, Abzeichen: am Anfang erklären ── */
  const m1 = LJ.modules.find((x) => x.id === 'm1');
  const seite = m1.steps[0];
  seite.blocks.splice(3, 1,
    '**So arbeitest du:**\n- Du bearbeitest fünf Akten und am Ende den Abschlussfall.\n- Jede Akte beginnt mit einer Erklärung. Danach prüfst du mit ein paar Fragen, ob du die Regel verstanden hast. Dann übst du.\n- Am Ende jeder Akte steht ein **Check**. Danach weiß die App, wie es für dich am besten weitergeht: Wer sicher ist, nimmt den Expressweg. Wer noch unsicher ist, bekommt eine Übungsrunde oder eine neue Erklärung.',
    { box: 'punkte', title: 'Was du sammeln kannst', md: '| Was | Wofür |\n| --- | --- |\n| **10 Punkte** | jede Antwort, die im ersten Versuch richtig ist |\n| **5 Punkte** | wenn es im zweiten Versuch klappt |\n| **−2 Punkte** | wenn du die **Lupe** (einen Tipp) benutzt |\n| **50 Bonuspunkte** und ein **Abzeichen ★** | für jede abgeschlossene Akte |\n| **eine Hinweiskarte** | für jede Akte – mit allen fünf Hinweisen löst du am Ende den Fall |\n| **eine Profi-Akte** | wenn du eine Akte im Expressweg schaffst (4 oder 5 von 5 im Check) |' },
    { box: 'raenge', title: 'Deine Dienstgrade', md: '- **Anwärterin / Anwärter** – zu Beginn\n- **Ermittlerin / Ermittler** – ab 400 Punkten\n- **Kommissarin / Kommissar** – ab 1000 Punkten\n- **Meisterdetektivin / Meisterdetektiv** – wenn du den Fall des verschwundenen Pokals löst\n\nDeine Punkte siehst nur du und deine Lehrkraft. Es gibt keine Rangliste in der Klasse. Die Punkte zählen nicht für die Note – sie zeigen dir, wie weit du schon bist.' });

  /* ── Verständnisfragen ── */
  einfuegen('m1', { titel: 'M2 ' }, V('LZ1', [
    I.ch('v.m2.1', 'Woran erkennst du einen **Hauptsatz**?', ['Das finite Verb steht an zweiter Stelle.', 'Das finite Verb steht am Ende.', 'Er beginnt immer mit dem Subjekt.'], 'Das finite Verb steht an zweiter Stelle.'),
    I.ch('v.m2.2', 'Was zeigt dir die **Umstellprobe**?', ['welche Wörter zusammen ein Satzglied bilden', 'wo das Komma steht', 'welche Wortart ein Wort hat'], 'welche Wörter zusammen ein Satzglied bilden'),
    I.wort('v.m2.3', 'Ergänze: Mit der Frage *Wer oder was?* findest du das ___.', ['Subjekt']),
  ]));

  einfuegen('m2', { titel: 'M4 ' }, V('LZ1', [
    I.ch('v.m4.1', 'Was geben adverbiale Bestimmungen an?', ['die Umstände einer Handlung, z. B. Ort, Zeit, Grund', 'wer etwas tut', 'wen oder was eine Handlung betrifft'], 'die Umstände einer Handlung, z. B. Ort, Zeit, Grund', { fb: 'Wer etwas tut, ist das Subjekt. Wen oder was eine Handlung betrifft, ist ein Objekt.' }),
    I.ch('v.m4.2', 'Mit welcher Probe prüfst du, ob ein Satzglied ein Adverbial ist? Der Satz bleibt dann trotzdem vollständig.', ['Weglassprobe', 'Ersatzprobe', 'Reimprobe'], 'Weglassprobe'),
    I.sel('v.m4.3', '**Ordne** jeder Frage die passende Funktion zu.', [['Warum?', 'kausal'], ['Wozu?', 'final'], ['Womit?', 'instrumental'], ['Wie lange?', 'temporal'], ['Woher?', 'lokal'], ['Wie?', 'modal']].map(([f, a]) => ({ label: f, options: LJ.FUNKTIONEN, answer: a, errFn: 'func' }))),
    I.wort('v.m4.4', 'Ergänze die Regel: Fragst du mit *wen?*, *wem?* oder *was?*, ist das Satzglied kein Adverbial, sondern ein ___.', ['Objekt']),
    I.wort('v.m4.5', 'Welche Funktion ist in Klasse 7 **neu** dazugekommen? Tippe sie ein.', ['final', 'final (des Zwecks)', 'des Zwecks']),
  ]));

  einfuegen('m2', { titel: 'M5 ' }, V('LZ1', [
    I.ch('v.m5.1', 'Was machst du bei der Ermittler-Methode **zuerst**?', ['das Prädikat finden', 'die Funktion bestimmen', 'das Komma setzen'], 'das Prädikat finden'),
    I.wort('v.m5.2', 'Ergänze: Antwortet ein Satzglied auf *wo?*, *wann?*, *warum?*, *wie?*, *womit?* oder *wozu?*, ist es ein ___.', ['Adverbial', 'adverbiale Bestimmung', 'Adverbiale']),
  ]));

  einfuegen('m3', { titel: 'M7 ' }, V('LZ2', [
    I.ch('v.m7.1', 'Woran erkennst du ein **Adjektiv**?', ['Man kann es steigern (schnell – schneller).', 'Es beginnt mit einer Präposition.', 'Es verändert sich nie.'], 'Man kann es steigern (schnell – schneller).'),
    I.wort('v.m7.2', 'Ergänze: Eine Präpositionalgruppe beginnt immer mit einer ___.', ['Präposition']),
    I.wort('v.m7.3', 'Ergänze: Folgt auf *während* ein ganzer Satz mit dem Verb am Ende, ist *während* eine ___.', ['Subjunktion', 'unterordnende Konjunktion']),
    I.ch('v.m7.4', 'Was ist eine **Nominalgruppe** als Adverbial?', ['Nomen mit Begleitern ohne Präposition, z. B. *den ganzen Tag*', 'ein einzelnes Wort wie *dort*', 'ein Satz mit Subjunktion'], 'Nomen mit Begleitern ohne Präposition, z. B. *den ganzen Tag*'),
  ]));

  einfuegen('m3', { titel: 'M8 ' }, V('LZ2', [
    I.ch('v.m8.1', 'Welche Frage stellst du beim Wegweiser **zuerst**?', ['Ist es ein Satz mit Verb am Ende?', 'Kann man es steigern?', 'Ist es ein Nomen?'], 'Ist es ein Satz mit Verb am Ende?'),
    I.wort('v.m8.2', 'Ein einzelnes Wort, das man **nicht** steigern kann (z. B. *dort*), ist ein ___.', ['Adverb']),
  ]));

  einfuegen('m4', { titel: 'M10 ' }, V('LZ3', [
    I.ch('v.m10.1', 'Wo steht das finite Verb im **Nebensatz**?', ['am Ende', 'an zweiter Stelle', 'ganz am Anfang'], 'am Ende'),
    I.wort('v.m10.2', 'Wie heißt das Wort, das einen Nebensatz einleitet (z. B. *weil*, *als*, *damit*)?', ['Subjunktion', 'unterordnende Konjunktion']),
    I.ch('v.m10.3', 'Wann steht zwischen Hauptsatz und Nebensatz ein Komma?', ['immer', 'nur, wenn der Nebensatz hinten steht', 'nur bei langen Sätzen'], 'immer', { lz: 'LZ5' }),
    I.wort('v.m10.4', 'Wie viele Kommas bekommt ein **eingeschobener** Nebensatz? Tippe die Zahl ein.', ['2', 'zwei'], { lz: 'LZ5' }),
    I.ch('v.m10.5', 'Ist *denn* eine Konjunktion oder eine Subjunktion?', ['Konjunktion', 'Subjunktion'], 'Konjunktion', { fb: 'Nach *denn* steht das Verb an zweiter Stelle: *…, denn sie **war** müde.*' }),
  ]));

  einfuegen('m4', { titel: 'M11 ' }, V('LZ5', [
    I.ch('v.m11.1', 'Womit beginnst du, wenn du einen Nebensatz suchst?', ['mit dem Verb, das ganz am Ende eines Satzteils steht', 'mit dem ersten Wort des Satzes', 'mit dem längsten Wort'], 'mit dem Verb, das ganz am Ende eines Satzteils steht'),
    I.wort('v.m11.2', 'Ergänze: Das Komma setzt du an die Grenze zwischen Hauptsatz und ___.', ['Nebensatz']),
  ]));

  einfuegen('m4', { titel: 'M12 ' }, V('LZ3', [
    I.wort('v.m12.1', 'Ergänze: Ein Nebensatz, der die Aufgabe einer adverbialen Bestimmung hat, heißt ___.', ['Adverbialsatz', 'adverbialer Gliedsatz']),
    I.ch('v.m12.2', 'Wie bestimmst du die Funktion eines Adverbialsatzes?', ['mit der W-Frage an den Hauptsatz', 'an der Länge des Nebensatzes', 'an der Stelle des Kommas'], 'mit der W-Frage an den Hauptsatz'),
    I.sel('v.m12.3', '**Ordne** jeder Subjunktion ihre Funktion zu.', [['weil', 'kausal'], ['damit', 'final'], ['nachdem', 'temporal'], ['indem', 'modal'], ['wo', 'lokal']].map(([w, a]) => ({ label: `*${w}*`, options: LJ.FUNKTIONEN, answer: a, errFn: 'func' }))),
  ]));

  einfuegen('m4', { titel: 'M13 ' }, V('LZ3', [
    I.ch('v.m13.1', 'Der Adverbialsatz steht im **Vorfeld**. Was folgt direkt nach dem Komma?', ['das finite Verb des Hauptsatzes', 'das Subjekt des Hauptsatzes', 'noch eine Subjunktion'], 'das finite Verb des Hauptsatzes', { fb: '*Als die Glocke läutete, **rannten** alle los.*' }),
    I.wort('v.m13.2', 'Steht der Nebensatz ganz hinten nach der rechten Verbklammer, steht er im ___.', ['Nachfeld']),
  ]));

  einfuegen('m4', { titel: 'M14 ' }, V('LZ3', [
    I.sel('v.m14.1', '**Ordne** jedem Ersatzwort seine Funktion zu.', [['dort', 'lokal'], ['dann', 'temporal'], ['deshalb', 'kausal'], ['dazu', 'final']].map(([w, a]) => ({ label: `*${w}*`, options: LJ.FUNKTIONEN, answer: a, errFn: 'func' }))),
  ]));

  einfuegen('m5', { titel: 'M16 ' }, V('LZ4', [
    I.wort('v.m16.1', 'Ergänze: Ein Nebensatz, der die Aufgabe des Subjekts hat, heißt ___.', ['Subjektsatz']),
    I.ch('v.m16.2', 'Mit welcher Frage findest du einen **Objektsatz**?', ['Wen oder was …?', 'Wann …?', 'Warum …?'], 'Wen oder was …?'),
    I.ch('v.m16.3', 'Du lässt einen **Objektsatz** weg. Was passiert?', ['Der Rest des Satzes ist unvollständig.', 'Der Satz bleibt vollständig.', 'Das Komma wandert nach vorne.'], 'Der Rest des Satzes ist unvollständig.'),
    I.wort('v.m16.4', 'Mit welchen zwei Wörtern beginnen Subjekt- und Objektsätze oft? Tippe eins davon ein.', ['dass', 'ob']),
  ]));

  einfuegen('m5', { titel: 'M17 ' }, V('LZ4', [
    I.ch('v.m17.1', 'Beim Das-Test passt *deshalb*. Was für ein Nebensatz ist es?', ['Adverbialsatz', 'Subjektsatz', 'Objektsatz'], 'Adverbialsatz'),
  ]));

  einfuegen('m6', { titel: 'M18 ' }, V('LZ6', [
    I.wort('v.m18.1', 'Welche Subjunktion passt zur Präposition *wegen*?', ['weil', 'da']),
    I.wort('v.m18.2', 'Welche Subjunktion passt zur Präposition *nach*?', ['nachdem']),
    I.wort('v.m18.3', 'Welche Subjunktion passt zur Präposition *vor*?', ['bevor']),
    I.ch('v.m18.4', 'Wann verwendest du *um … zu*?', ['wenn beide Teile dasselbe Subjekt haben', 'wenn die Subjekte verschieden sind', 'immer, wenn ein Grund genannt wird'], 'wenn beide Teile dasselbe Subjekt haben'),
    I.ch('v.m18.5', 'Der Hauptsatz steht im Präteritum. Welche Zeitform steht im Nebensatz mit *nachdem*?', ['Plusquamperfekt (hatte gespielt)', 'Präsens (spielt)', 'Futur (wird spielen)'], 'Plusquamperfekt (hatte gespielt)'),
  ]));

  einfuegen('m6', { titel: 'M20 ' }, V('LZ6', [
    I.wort('v.m20.1', 'Welches Verb gehört zum Nomen *die Ankunft*?', ['ankommen']),
    I.ch('v.m20.2', 'Was machst du im dritten Schritt?', ['Subjekt ergänzen, Verb ans Ende, Komma setzen', 'die Präposition ersetzen', 'das Nomen unterstreichen'], 'Subjekt ergänzen, Verb ans Ende, Komma setzen'),
  ]));

  /* ── zusätzliche Tippaufgaben ── */
  einfuegen('m2', { nr: '5' }, { t: 'task', text: '**Schreibe** das Adverbial aus dem Satz heraus. Tippe es genau so ab, wie es im Satz steht.', lz: 'LZ1', items: [
    I.wort('t.m2.1', '*Am Abend kam die Kommissarin.*', ['Am Abend']),
    I.wort('t.m2.2', '*Tom stand ruhig neben der Tür.* – Schreibe das **lokale** Adverbial heraus.', ['neben der Tür']),
    I.wort('t.m2.3', '*Wegen des Lärms schlief Lina schlecht.* – Schreibe das **kausale** Adverbial heraus.', ['Wegen des Lärms']),
    I.wort('t.m2.4', '*Herr Brandt öffnete den Schrank mit einem Dietrich.*', ['mit einem Dietrich']),
    I.wort('t.m2.5', '*Die AG sammelte Geld für einen neuen Ball.* – Schreibe das **finale** Adverbial heraus.', ['für einen neuen Ball']),
  ] });
  einfuegen('m2', { nr: '6' }, { t: 'task', text: '**Tippe** die Funktion des markierten Adverbials ein (lokal, temporal, kausal, modal, instrumental oder final).', lz: 'LZ2', items: [
    I.wort('t.m2.6', 'Mia wartete **seit dem Morgen** auf die Kommissarin.', ['temporal'], { funktion: 'temporal' }),
    I.wort('t.m2.7', '**Aus Neugier** las Tom den Zettel.', ['kausal'], { funktion: 'kausal' }),
    I.wort('t.m2.8', 'Die Kommissarin schrieb **mit einem Kuli**.', ['instrumental'], { funktion: 'instrumental' }),
    I.wort('t.m2.9', 'Lina flüsterte **leise**.', ['modal'], { funktion: 'modal' }),
  ] });

  einfuegen('m3', { nr: '12' }, { t: 'task', text: '**Tippe** die Form des markierten Adverbials ein (Adverb, Adjektiv, Präpositionalgruppe, Nominalgruppe oder Nebensatz).', lz: 'LZ2', items: [
    I.wort('t.m3.1', 'Die Fans jubelten **laut**.', ['Adjektiv'], { form: 'Adjektiv' }),
    I.wort('t.m3.2', 'Wir treffen uns **morgen**.', ['Adverb'], { form: 'Adverb' }),
    I.wort('t.m3.3', 'Mia wartete **vor der Turnhalle**.', ['Präpositionalgruppe'], { form: 'Präpositionalgruppe' }),
    I.wort('t.m3.4', 'Tom trainierte **jeden Tag**.', ['Nominalgruppe'], { form: 'Nominalgruppe' }),
  ] });
  einfuegen('m3', { nr: '14' }, { t: 'task', text: '**Entscheide**: Ist das markierte Wort eine Präposition oder eine Subjunktion? Schau, was danach folgt, und tippe das passende Fachwort ein.', lz: 'LZ2', items: [
    I.wort('t.m3.5', '**Seit** dem Umzug fährt Lina mit dem Bus.', ['Präposition'], { fb: 'Nach *seit* folgt nur *dem Umzug* – kein Verb. Also Präposition.' }),
    I.wort('t.m3.6', '**Bis** die Polizei kommt, wartet Mia.', ['Subjunktion', 'unterordnende Konjunktion'], { fb: 'Nach *bis* folgt *die Polizei kommt* – ein Satz mit dem Verb am Ende. Also Subjunktion.' }),
    I.wort('t.m3.7', '**Während** der Pause war es ruhig.', ['Präposition'], { fb: 'Nach *während* folgt nur *der Pause*. Also Präposition.' }),
  ] });

  einfuegen('m4', { nr: '19' }, { t: 'task', text: '**Schreibe** den Nebensatz heraus (ohne Komma).', lz: 'LZ3', items: [
    I.wort('t.m4.1', '*Lina rannte los, weil der Bus schon da war.*', ['weil der Bus schon da war']),
    I.wort('t.m4.2', '*Als die Musik aufhörte, war der Pokal weg.*', ['Als die Musik aufhörte', 'als die Musik aufhörte']),
    I.wort('t.m4.3', '*Herr Brandt wartete, bis alle gegangen waren.*', ['bis alle gegangen waren']),
  ] });
  einfuegen('m4', { nr: '21' }, { t: 'task', text: '**Schreibe** den Satz mit allen nötigen Kommas ab.', lz: 'LZ5', items: [
    I.text('t.m4.4', '*Tom lachte weil das Foto lustig war.*', ['Tom lachte, weil das Foto lustig war.'], { kommaSatz: true }),
    I.text('t.m4.5', '*Bevor das Fest begann putzte Tom den Pokal.*', ['Bevor das Fest begann, putzte Tom den Pokal.'], { kommaSatz: true }),
    I.text('t.m4.6', '*Mia hat als alle feierten ein Foto gemacht.*', ['Mia hat, als alle feierten, ein Foto gemacht.'], { kommaSatz: true }),
  ] });
  einfuegen('m4', { nr: '24' }, { t: 'task', text: '**Tippe** eine passende Subjunktion ein, sodass der Satz die angegebene Funktion hat.', lz: 'LZ3', items: [
    I.wort('t.m4.7', '___ der Wecker klingelte, stand Lina auf. *(temporal)*', ['als', 'sobald', 'nachdem', 'wenn'], { luecke: true }),
    I.wort('t.m4.8', 'Tom blieb zu Hause, ___ er krank war. *(kausal)*', ['weil', 'da'], { luecke: true }),
    I.wort('t.m4.9', 'Mia sprach laut, ___ alle sie hörten. *(final)*', ['damit'], { luecke: true }),
    I.wort('t.m4.10', 'Herr Oswald lernte das Lied, ___ er es jeden Tag übte. *(modal)*', ['indem'], { luecke: true }),
  ] });

  einfuegen('m5', { nr: '31' }, { t: 'task', text: '**Mach** den Das-Test: Ersetze den Nebensatz durch *das* und **schreibe** den neuen Satz.', lz: 'LZ4', items: [
    I.text('t.m5.1', '*Dass der Pokal fehlt, ärgert Tom.*', ['Das ärgert Tom.'], { kommaSatz: true }),
    I.text('t.m5.2', '*Mia weiß, dass Tom den Pokal hat.*', ['Mia weiß das.'], { kommaSatz: true }),
    I.text('t.m5.3', '*Herr Oswald glaubt, dass Lina ehrlich ist.*', ['Herr Oswald glaubt das.'], { kommaSatz: true }),
  ] });

  einfuegen('m6', { nr: '35' }, { t: 'task', text: '**Forme** um. **Schreibe** den ganzen Satz.', lz: 'LZ6', items: [
    I.text('t.m6.1', '*Wegen des Gewitters blieb die Turnhalle zu.* → *Weil …*', ['Weil es gewitterte, blieb die Turnhalle zu.', 'Weil es ein Gewitter gab, blieb die Turnhalle zu.', 'Da es gewitterte, blieb die Turnhalle zu.'], { subs: ['weil', 'da'], verbs: ['gewitterte', 'gab', 'war'], vorfeldVerb: 'blieb' }),
    I.text('t.m6.2', '*Während des Spiels sangen die Fans.* → *Während …*', ['Während das Spiel lief, sangen die Fans.', 'Während sie spielten, sangen die Fans.', 'Während die Mannschaft spielte, sangen die Fans.'], { subs: ['während'], verbs: ['lief', 'spielten', 'spielte', 'dauerte'], vorfeldVerb: 'sangen' }),
    I.text('t.m6.3', '*Weil es regnete, fiel das Fest aus.* → **Präpositionalgruppe:** *Wegen …*', ['Wegen des Regens fiel das Fest aus.'], {}),
    I.text('t.m6.4', '*Tom ging zur Werkstatt. Er wollte den Pokal gravieren lassen.* → Verbinde mit *um … zu*.', ['Tom ging zur Werkstatt, um den Pokal gravieren zu lassen.'], { subs: ['um'], verbs: ['lassen'] }),
  ] });

  /* Checks: je eine Tippaufgabe statt einer Auswahl in Fassung A und B */
  const ck = (mid, id) => LJ.modules.find((x) => x.id === mid).steps.find((s) => s.id === id);
  const tausch = (c, f, idx, item) => { c[f][idx] = item; };
  tausch(ck('m2', 'c1'), 'A', 1, I.wort('m2.c1A.2t', '**Schreibe** das Adverbial heraus: *Die Kommissarin las den Bericht aufmerksam.*', ['aufmerksam']));
  tausch(ck('m2', 'c1'), 'B', 1, I.wort('m2.c1B.2t', '**Schreibe** das Adverbial heraus: *Der Pokal glänzte hell.*', ['hell']));
  tausch(ck('m3', 'c2'), 'A', 2, I.wort('m3.c2A.3t', '**Tippe** die Form ein: Die Fans feierten **die ganze Nacht**.', ['Nominalgruppe'], { form: 'Nominalgruppe' }));
  tausch(ck('m3', 'c2'), 'B', 2, I.wort('m3.c2B.3t', '**Tippe** die Form ein: **Als es dunkel wurde**, ging das Licht an.', ['Nebensatz', 'Adverbialsatz'], { form: 'Nebensatz' }));
  tausch(ck('m4', 'c3a'), 'A', 3, I.text('m4.c3aA.4t', '**Schreibe** den Satz mit Komma ab: *Weil es regnete blieben alle drinnen.*', ['Weil es regnete, blieben alle drinnen.'], { kommaSatz: true, lz: 'LZ5' }));
  tausch(ck('m4', 'c3a'), 'B', 3, I.text('m4.c3aB.4t', '**Schreibe** den Satz mit Komma ab: *Herr Oswald spielte Klavier während die Gäste aßen.*', ['Herr Oswald spielte Klavier, während die Gäste aßen.'], { kommaSatz: true, lz: 'LZ5' }));
  tausch(ck('m4', 'c3b'), 'A', 3, I.wort('m4.c3bA.4t', '**Tippe** eine passende Subjunktion ein *(modal)*: Mia half, ___ sie die Stühle aufstellte.', ['indem'], { luecke: true }));
  tausch(ck('m4', 'c3b'), 'B', 3, I.wort('m4.c3bB.4t', '**Tippe** eine passende Subjunktion ein *(final)*: Mia notiert die Zeit, ___ sie sie nicht vergisst.', ['damit'], { luecke: true }));
  tausch(ck('m6', 'c5'), 'A', 3, I.text('m6.c5A.4t', '**Verbinde** mit einem **kausalen** Adverbialsatz: *Herr Brandt war müde. Er hatte lange gearbeitet.*', ['Herr Brandt war müde, weil er lange gearbeitet hatte.', 'Weil Herr Brandt lange gearbeitet hatte, war er müde.', 'Herr Brandt war müde, da er lange gearbeitet hatte.'], { subs: ['weil', 'da'], verbs: ['hatte'], lz: 'LZ7' }));
  tausch(ck('m6', 'c5'), 'B', 3, I.text('m6.c5B.4t', '**Verbinde** mit einem **finalen** Adverbialsatz: *Lina schrieb sich die Zeit auf. Sie wollte sie nicht vergessen.*', ['Lina schrieb sich die Zeit auf, damit sie sie nicht vergaß.', 'Lina schrieb sich die Zeit auf, damit sie sie nicht vergisst.', 'Lina schrieb sich die Zeit auf, um sie nicht zu vergessen.'], { subs: ['damit', 'um'], verbs: ['vergaß', 'vergisst', 'vergessen'], lz: 'LZ7' }));
})();
