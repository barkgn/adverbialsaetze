/* Erklärungen auf mehreren Seiten zum Durchklicken (ersetzen die einseitigen Erklärungen) und Merkblatt mit Themen */
(function () {
  const alle = [];
  const sammle = (steps) => steps.forEach((s) => { alle.push(s); if (s.t === 'check' && s.zw) sammle(s.zw.steps); });
  LJ.modules.forEach((m) => sammle(m.steps));
  function setze(prefix, seiten) {
    const st = alle.find((s) => s.t === 'page' && s.title && s.title.startsWith(prefix));
    if (!st) { console.warn('Seite nicht gefunden', prefix); return; }
    st.seiten = seiten;
    if (st.text && !/mit „Weiter“/.test(st.text)) st.text = /\*\*Klicke\*\* dich durch/.test(st.text) ? st.text.replace(/\*\*Klicke\*\* dich durch[^.]*\./, '**Klicke** dich mit „Weiter“ durch die Seiten und probiere die Beispiele aus.') : st.text + ' **Klicke** dich mit „Weiter“ durch die Seiten.';
  }
  const S = (titel, ...blocks) => ({ titel, blocks });
  const sb = (teile, o = {}) => ({ vis: 'satzbild', teile, ...o });
  const sp = (md) => ({ sprech: md });
  const merken = (title, md) => ({ box: 'merken', title, md });
  const achtung = (title, md) => ({ box: 'achtung', title, md });
  const tipp = (title, md) => ({ box: 'tipp', title, md });
  const morph = (titel, zustaende) => ({ anim: 'morph', titel, zustaende: zustaende.map(([teile, text]) => ({ teile, text })) });

  /* ── M1 Willkommen ── */
  const m1 = LJ.modules[0].steps[0];
  setze('M1 ', [
    S('Der Fall', { vis: 'titelbildBlock' },
      sp('Hallo und willkommen im Team! Ich bin **Kommissarin Kaya Wendt**. Schön, dass du mir hilfst.'),
      'Wir haben einen neuen Fall: Beim Schulfest am Freitag ist der **Pokal der Fußball-AG** verschwunden. Er sollte um 18 Uhr bei der Siegerehrung überreicht werden. Doch das Regal im Lehrerzimmer war leer.',
      'In fünf Akten sammelst du Zeugenaussagen, Fotos und Hinweise. Am Ende weißt du, wer den Pokal genommen hat – und warum.'),
    S('Dein wichtigstes Werkzeug: genaue Fragen',
      sp('Gute Ermittlerinnen und Ermittler fragen immer nach den **Umständen**: Wo ist es passiert? Wann? Warum? Wie? Womit? Wozu?'),
      { vis: 'chips', titel: 'Diese sechs Fragen brauchst du ständig:', gruppen: [['lokal', ['Wo?']], ['temporal', ['Wann?']], ['kausal', ['Warum?']], ['modal', ['Wie?']], ['instrumental', ['Womit?']], ['final', ['Wozu?']]].map(([f, w]) => [f, w, f]) },
      'Genau diese Fragen helfen dir auch in der Grammatik. Mit ihnen findest du die **adverbialen Bestimmungen** – die Satzglieder, die Umstände angeben. Darum geht es in diesem Lernjob.'),
    S('So arbeitest du',
      'Jede Akte läuft gleich ab:',
      { vis: 'ablauf', schritte: ['**Erklärung** lesen – auf mehreren Seiten zum Durchklicken', '**Verstanden?** – ein paar Fragen zur Regel', '**Üben** – mit Lupe und Rückmeldung', '**Check** – fünf Aufgaben ohne Lupe'] },
      'Nach dem Check entscheidet die App, wie es für dich weitergeht:',
      { vis: 'vergleich', links: { titel: '4 oder 5 von 5 richtig', md: '**Expressweg:** Du bist sicher und gehst direkt zur nächsten Akte. Dazu gibt es eine Profi-Akte.' }, rechts: { titel: '3 oder weniger richtig', md: '**Übungsrunde** oder **zweiter Weg:** Du bekommst weitere Übungen oder das Thema noch einmal anders erklärt. Danach kommt der Check mit neuen Sätzen.' } },
      'Bei falschen Antworten bekommst du zuerst einen **Tipp** und einen zweiten Versuch. Danach erklärt dir die App, warum es falsch war und wie du es hättest herausfinden können.'),
    S('Punkte und Abzeichen', m1.blocks.find((b) => b.box === 'punkte')),
    S('Deine Dienstgrade', { vis: 'raenge' }, m1.blocks.find((b) => b.box === 'raenge'),
      sp('Zuerst prüfen wir, was du aus Klasse 5 und 6 noch weißt. Keine Sorge: Dieser **Start-Check** zählt nicht für die Note.')),
  ]);

  /* ── M2 Satzglieder auffrischen ── */
  setze('M2 ', [
    S('Das Prädikat ist der Kern',
      'Jeder Satz hat ein **Prädikat**. Es sagt, was passiert oder was jemand tut. Das Prädikat ist immer ein Verb.',
      sb([['Herr Brandt', 'sg', ''], ['schließt', 'praed'], ['die Tür', 'sg', ''], ['ab', 'praed'], ['.']], { titel: 'Ein zweiteiliges Prädikat:' }),
      'Manchmal besteht das Prädikat aus **zwei Teilen**. Sie bilden eine Klammer um den Satz – die **Verbklammer**: *schließt … ab*, *hat … gesehen*, *ruft … an*.',
      tipp('So findest du das Prädikat', '1. Welches Wort sagt, was passiert? *schließt*\n2. Steht am Satzende noch ein Teil, der dazugehört? *ab* → *abschließen*\n3. Probe: Ändere die Person. *Die Hausmeister **schließen** die Tür **ab**.* Das Wort, das sich mitändert, ist das finite Verb.')),
    S('Die Umstellprobe',
      'Ein Satz besteht aus **Satzgliedern**. Ein Satzglied kann aus einem Wort bestehen (*Lina*) oder aus mehreren Wörtern (*den Pokal*, *im Regal*).',
      'Mit der **Umstellprobe** findest du heraus, welche Wörter zusammengehören: Was du gemeinsam an eine andere Stelle schieben kannst, ist **ein** Satzglied.',
      { anim: 'umstellen', titel: 'Probier es aus:', varianten: [['Lina', 'sah', 'den Pokal', 'im Regal'], ['im Regal', 'sah', 'Lina', 'den Pokal'], ['den Pokal', 'sah', 'Lina', 'im Regal']], verb: 'sah', falsch: { teile: ['den', 'sah', 'Lina', 'Pokal', 'im Regal'], info: '*den* und *Pokal* kann man nicht trennen. Sie bilden zusammen ein Satzglied.' } },
      'Das Verb **bleibt** dabei an zweiter Stelle. Alles andere wandert.'),
    S('Satzglieder erfragen',
      'Welches Satzglied ist welches? Das findest du mit Fragen heraus. Du fragst immer **vom Prädikat aus**:',
      sb([['Mia', 'subj'], ['zeigt', 'praed'], ['der Kommissarin', 'dat'], ['ein Foto', 'akk'], ['.']]),
      '| Frage | Satzglied | Antwort |\n| --- | --- | --- |\n| *Wer oder was zeigt …?* | Subjekt | *Mia* |\n| *Wem zeigt Mia das Foto?* | Dativobjekt | *der Kommissarin* |\n| *Wen oder was zeigt Mia?* | Akkusativobjekt | *ein Foto* |',
      tipp('Das Subjekt passt zum Verb', 'Setzt du das Subjekt in die Mehrzahl, ändert sich das Verb mit: *Mia **zeigt** …* → *Mia und Tom **zeigen** …* So erkennst du das Subjekt sicher.')),
    S('Hauptsatz oder Nebensatz?',
      'Im **Hauptsatz** steht das finite Verb (das Verb mit Personalendung) an **zweiter Stelle**. Im **Nebensatz** steht es **am Ende**.',
      { anim: 'verbwandert', haupt: ['Das Licht', 'ging', 'aus.'], neben: ['weil', 'das Licht', 'aus', 'ging.'], verb: 'ging', sub: 'weil' },
      'Ein Nebensatz kann **nicht allein stehen**: *weil das Licht ausging* – da fehlt noch etwas. Er beginnt meistens mit einem Wort wie *weil, als, dass, damit*.'),
  ]);

  /* ── M4 Was ist ein Adverbial? ── */
  setze('M4 ', [
    S('Die Kommissarin fragt nach',
      'Der Satz *Herr Brandt schloss die Turnhalle ab.* ist vollständig. Die Kommissarin weiß aber noch zu wenig. Klicke dich durch ihre Fragen:',
      { anim: 'wachsen', basis: ['Herr Brandt', 'schloss', 'die Turnhalle', 'ab.'], schritte: [{ frage: 'Wann?', teil: 'am Freitag', f: 'temporal' }, { frage: 'Warum?', teil: 'wegen des Gewitters', f: 'kausal' }, { frage: 'Wie?', teil: 'schnell', f: 'modal' }] },
      'Mit jeder Antwort wird der Satz genauer. Die neuen Satzglieder kennst du aus Klasse 6: Es sind **adverbiale Bestimmungen**, kurz **Adverbiale**.'),
    S('Adverbiale geben Umstände an',
      'Subjekt, Prädikat und Objekte sagen, **wer was tut**. Die Adverbiale sagen, **unter welchen Umständen** es passiert.',
      sb([['Am Freitag', 'temporal'], ['schloss', 'praed'], ['Herr Brandt', 'subj'], ['wegen des Gewitters', 'kausal'], ['schnell', 'modal'], ['die Turnhalle', 'akk'], ['ab', 'praed'], ['.']], { unter: 'Kern des Satzes: Subjekt, Prädikat, Objekt. Dazu kommen drei Adverbiale.' }),
      'Ein Adverbial kann aus einem Wort bestehen (*schnell*) oder aus mehreren (*wegen des Gewitters*). Es ist trotzdem **ein** Satzglied.'),
    S('Drei Proben, mit denen du Adverbiale erkennst',
      '**1. Die W-Frage:** Ein Adverbial antwortet auf *wo?*, *wann?*, *warum?*, *wie?*, *womit?* oder *wozu?*.',
      '**2. Die Weglassprobe:** Ein Adverbial kannst du meistens weglassen. Der Satz bleibt trotzdem vollständig. Probier es aus:',
      { anim: 'weglassprobe', teile: [{ t: 'Herr Brandt', info: 'das Subjekt' }, { t: 'schloss', info: 'das Prädikat' }, { t: 'am Freitag', weg: true }, { t: 'schnell', weg: true }, { t: 'die Turnhalle', info: 'das Objekt' }, { t: 'ab', info: 'ein Teil des Prädikats' }] },
      '**3. Die Umstellprobe:** Ein Adverbial ist ein Satzglied. Du kannst es als Ganzes an den Satzanfang stellen: ***Schnell** schloss Herr Brandt am Freitag die Turnhalle ab.*'),
    S('Die sechs Funktionen',
      'Je nachdem, auf welche Frage ein Adverbial antwortet, hat es eine andere **Funktion**. Fünf kennst du aus Klasse 6, **final** ist neu.',
      { vis: 'funktionen' },
      tipp('Merkhilfe', 'Die Funktion erkennst du an der Frage: Stell die Frage an den Satz. Passt die Antwort, hast du die Funktion gefunden.')),
    S('Alle sechs auf einen Blick',
      '| Funktion | adverbiale Bestimmung … | Frage | Beispiel |\n| --- | --- | --- | --- |\n| lokal | des Ortes | Wo? Wohin? Woher? | *im Lehrerzimmer*, *zur Turnhalle* |\n| temporal | der Zeit | Wann? Wie lange? Seit wann? | *am Freitag*, *zwei Stunden*, *seit Montag* |\n| kausal | des Grundes | Warum? Weshalb? | *wegen des Gewitters*, *aus Angst* |\n| modal | der Art und Weise | Wie? Auf welche Weise? | *schnell*, *sorgfältig* |\n| instrumental | des Mittels | Womit? Wodurch? | *mit dem Schlüssel*, *durch einen Trick* |\n| final (**neu**) | des Zwecks | Wozu? Mit welchem Ziel? | *zum Schutz*, *für das Turnier* |',
      achtung('kausal oder final?', '*Warum?* fragt nach dem **Grund** – nach dem, was vorher da war: *Wegen des Regens blieben alle drinnen.*\n\n*Wozu?* fragt nach dem **Ziel** – nach dem, was erreicht werden soll: *Zum Schutz vor Regen spannten sie ein Zelt.*')),
    S('Objekt oder Adverbial?',
      'Auch Objekte kannst du erfragen – aber mit anderen Fragen. Achte genau auf das Fragewort:',
      { vis: 'vergleich', links: { titel: 'Objekt', f: 'akk', md: 'Fragen: *Wen? Wem? Was?*\n\n*Lina sucht **ihren Schlüssel**.*\n\n→ *Wen oder was sucht Lina?*\n\nLässt du es weg, fehlt etwas: *Lina sucht.* ✘' }, rechts: { titel: 'Adverbial', f: 'lokal', md: 'Fragen: *Wo? Wann? Warum? Wie? Womit? Wozu?*\n\n*Lina sucht **im Klassenzimmer**.*\n\n→ *Wo sucht Lina?*\n\nDer Rest bleibt verständlich: *Lina sucht.* (Man weiß nur nicht, wo.)' } },
      achtung('Vorsicht bei *was*', 'Fragst du mit *was?*, ist es fast immer ein Objekt: *Mia fotografiert **den Pokal**.* (Was fotografiert Mia?) – *Mia fotografiert **in der Aula**.* (Wo?)')),
  ]);

  /* ── M5 Ermittler-Methode ── */
  setze('M5 ', [
    S('Vier Schritte zum Ziel',
      sp('Wenn du unsicher bist, geh immer gleich vor. So arbeiten Profis.'),
      { vis: 'ablauf', senkrecht: true, schritte: ['**Prädikat finden** – Welches Wort sagt, was passiert? Achte auf zweiteilige Prädikate (*schließt … ab*).', '**Umstellen** – Welche Wörter kannst du gemeinsam an den Satzanfang stellen? Jede Gruppe ist ein Satzglied.', '**Fragen** – Frag vom Prädikat aus: *Wer?* → Subjekt. *Wen? Wem? Was?* → Objekt. *Wo? Wann? Warum? Wie? Womit? Wozu?* → Adverbial.', '**Weglassen** – Lass das Satzglied weg. Bleibt der Satz vollständig, ist es meistens ein Adverbial.'] }),
    S('Beispiel Schritt für Schritt',
      morph('*Am Freitag fotografierte Mia in der Aula.*', [
        [['Am Freitag fotografierte Mia in der Aula.'], 'Das ist der Satz. Klicke auf „Nächster Schritt“.'],
        [[['Am Freitag'],['fotografierte','fv'],['Mia in der Aula.']], '**Schritt 1 – Prädikat:** Was passiert? *fotografierte*. Es steht an zweiter Stelle.'],
        [[['Am Freitag','sgk'],['fotografierte','fv'],['Mia','sgk'],['in der Aula','sgk'],'.'], '**Schritt 2 – Umstellen:** *Mia fotografierte am Freitag in der Aula.* / *In der Aula fotografierte Mia am Freitag.* → Es gibt vier Satzglieder.'],
        [[['Am Freitag','temporal'],['fotografierte','fv'],['Mia','subjk'],['in der Aula','lokal'],'.'], '**Schritt 3 – Fragen:** *Wer fotografierte?* → *Mia* (Subjekt). *Wann?* → *am Freitag* (temporal). *Wo?* → *in der Aula* (lokal).'],
        [[['Am Freitag','weg'],['fotografierte','fv'],['Mia','subjk'],['in der Aula','weg'],'.'], '**Schritt 4 – Weglassen:** *Mia fotografierte.* Der Satz ist vollständig. *Am Freitag* und *in der Aula* sind also **Adverbiale**.'],
      ])),
    S('Noch ein Beispiel',
      morph('*Herr Brandt öffnete mit dem Generalschlüssel die Tür.*', [
        [[['Herr Brandt'],['öffnete','fv'],['mit dem Generalschlüssel die Tür.']], '**Prädikat:** *öffnete*.'],
        [[['Herr Brandt','sgk'],['öffnete','fv'],['mit dem Generalschlüssel','sgk'],['die Tür','sgk'],'.'], '**Umstellen:** *Mit dem Generalschlüssel öffnete Herr Brandt die Tür.* → *mit dem Generalschlüssel* bleibt zusammen.'],
        [[['Herr Brandt','subjk'],['öffnete','fv'],['mit dem Generalschlüssel','instrumental'],['die Tür','akkk'],'.'], '**Fragen:** *Wer?* → Subjekt. *Wen oder was öffnete er?* → *die Tür* (Objekt). *Womit?* → *mit dem Generalschlüssel* (instrumental).'],
        [[['Herr Brandt','subjk'],['öffnete','fv'],['mit dem Generalschlüssel','weg'],['die Tür','akkk'],'.'], '**Weglassen:** *Herr Brandt öffnete die Tür.* ✔ – Lässt du dagegen *die Tür* weg, fehlt etwas: *Herr Brandt öffnete.* ✘ Darum ist *die Tür* kein Adverbial.'],
      ])),
    S('Typische Stolperfallen',
      achtung('1. Ein Satzglied hat oft mehrere Wörter', '*wegen des starken Gewitters* ist **ein** Adverbial – nicht drei. Die Umstellprobe zeigt dir das.'),
      achtung('2. Das Prädikat hat zwei Teile', '*Lina **ruft** die Kommissarin **an**.* – *an* gehört zum Prädikat. Es ist kein Adverbial.'),
      achtung('3. *Wen?* und *was?* führen zum Objekt', '*Tom sucht **den Schlüssel**.* – *Wen oder was sucht Tom?* → Objekt, kein Adverbial.')),
  ]);

  /* ── M7 Formen des Adverbials ── */
  setze('M7 ', [
    S('Gleiche Aufgabe, andere Bauweise',
      'Adverbiale haben alle dieselbe Aufgabe: Sie geben Umstände an. Sie können aber **ganz verschieden gebaut** sein. Hier antworten alle auf die Frage *Wann fotografierte Mia?*:',
      { vis: 'formen', f: 'temporal', zeilen: [['Adverb', '*gestern*', 'ein Wort, verändert sich nie'], ['Präpositionalgruppe', '*am Freitag*', 'beginnt mit Präposition'], ['Nominalgruppe', '*den ganzen Abend*', 'Nomen mit Begleiter, ohne Präposition'], ['Nebensatz', '*als das Fest begann*', 'Subjunktion + Verb am Ende']] },
      'Die **Funktion** (temporal) bleibt gleich. Nur die **Form** ändert sich. Bei modalen Adverbialen kommt oft noch eine fünfte Form vor: das **Adjektiv** (*Die Person rannte **eilig**.*).'),
    S('Ein Wort: Adverb oder Adjektiv?',
      'Besteht das Adverbial aus nur einem Wort, gibt es zwei Möglichkeiten. Die **Steigerungsprobe** hilft:',
      { vis: 'vergleich', links: { titel: 'Adverb', md: '*dort, hier, heute, gestern, sofort, bald, deshalb, gern*\n\nVerändert sich **nie**.\n\n*dort – dorter* ✘\n\n*heute – heuter* ✘' }, rechts: { titel: 'Adjektiv', md: '*schnell, leise, eilig, laut, sorgfältig*\n\nKann man **steigern** und vor ein Nomen stellen.\n\n*eilig – eiliger* ✔\n\n*die eilige Person* ✔' } }),
    S('Präpositionalgruppe oder Nominalgruppe?',
      'Besteht das Adverbial aus mehreren Wörtern ohne eigenes Verb, schau auf das **erste Wort**:',
      { vis: 'vergleich', links: { titel: 'Präpositionalgruppe', md: 'Beginnt mit einer **Präposition**, danach folgt ein Nomen mit Begleitern.\n\n***in** der Aula*, ***wegen** des Regens*, ***mit** dem Schlüssel*, ***nach** dem Spiel*' }, rechts: { titel: 'Nominalgruppe', md: 'Nomen mit Begleitern, **ohne** Präposition. Meist sind es Zeitangaben.\n\n*den ganzen Tag*, *jeden Morgen*, *letzte Woche*, *einen Moment*' } },
      { vis: 'chips', gruppen: [['sg', ['in', 'an', 'auf', 'aus', 'bei', 'mit', 'nach', 'seit', 'von', 'vor', 'zu', 'durch', 'für', 'wegen', 'während', 'trotz', 'unter', 'neben'], 'Häufige Präpositionen']] }),
    S('Der Nebensatz als Adverbial',
      'Ein Adverbial kann sogar ein **ganzer Satz** sein – ein Nebensatz mit eigenem Verb:',
      sb([['Mia', 'subj'], ['fotografierte', 'praed'], [','], ['als das Fest begann', 'temporal', 'Adverbial: temporal (Nebensatz)'], ['.']]),
      'Du erkennst ihn an zwei Dingen: Er beginnt mit einer **Subjunktion** (*als, weil, damit …*), und das finite Verb steht **am Ende** (*begann*). Mehr dazu in Akte 3.'),
    S('Achtung: Präposition oder Subjunktion?',
      'Manche Wörter gibt es zweimal – als Präposition und als Subjunktion. Schau, **was danach kommt**:',
      morph('*während*', [
        [[['Während','hl'],'des Festes war es laut.'], '*während* **des Festes**: Danach kommt nur eine Nominalgruppe, kein Verb → **Präposition**. Das Adverbial ist eine Präpositionalgruppe.'],
        [[['Während','hl'],['das Fest lief','nsk'],',','war es laut.'], '*während* **das Fest lief**: Danach kommt ein Satz mit dem Verb *lief* am Ende → **Subjunktion**. Das Adverbial ist ein Nebensatz.'],
      ]),
      'Genauso: *seit dem Fest* (Präposition) – *seit der Pokal fehlt* (Subjunktion); *nach dem Spiel* (Präposition) – *nachdem das Spiel vorbei war* (Subjunktion); *bis Montag* (Präposition) – *bis alle da sind* (Subjunktion).'),
  ]);

  /* ── M8 Formen-Wegweiser ── */
  setze('M8 ', [
    S('Der Wegweiser',
      'Wenn du unsicher bist, welche Form ein Adverbial hat, folge diesem Wegweiser von oben nach unten. Bei der ersten Antwort „ja“ bist du am Ziel.',
      { img: 'wegweiser' }),
    S('Beispiel 1: *mit großer Eile*',
      morph('*mit großer Eile*', [
        [['mit großer Eile'], 'Ist es ein Satz mit eigenem Verb am Ende? **Nein** – es gibt kein Verb.'],
        [[['mit','hl'],'großer Eile'], 'Beginnt es mit einer Präposition? **Ja** – *mit* ist eine Präposition.'],
        [[['mit großer Eile','modal']], 'Also: **Präpositionalgruppe**. (Funktion: *Wie?* → modal)'],
      ])),
    S('Beispiel 2: *leise*',
      morph('*leise*', [
        [['leise'], 'Satz mit Verb? **Nein.** Präposition am Anfang? **Nein.** Nomen mit Begleiter? **Nein** – es ist nur ein Wort.'],
        [['leise → ',['leiser','hl']], 'Kann man es steigern? *leise – leiser – am leisesten* → **Ja**.'],
        [[['leise','modal']], 'Also: **Adjektiv**.'],
      ])),
    S('Beispiel 3: *jeden Abend*',
      morph('*jeden Abend*', [
        [['jeden Abend'], 'Satz mit Verb? **Nein.** Präposition am Anfang? **Nein** – *jeden* ist ein Begleiter, keine Präposition.'],
        [[['jeden','hl'],['Abend','hl']], 'Nomen mit Begleiter? **Ja** – *Abend* ist ein Nomen, *jeden* sein Begleiter.'],
        [[['jeden Abend','temporal']], 'Also: **Nominalgruppe**. (Funktion: *Wann?* → temporal)'],
      ])),
  ]);

  /* ── M10 Hauptsatz, Nebensatz, Komma ── */
  setze('M10 ', [
    S('Der Hauptsatz',
      'Ein **Hauptsatz** kann allein stehen. Sein finites Verb steht an **zweiter Stelle**.',
      sb([['Lina', 'sg', '1. Stelle'], ['ging', 'fv', '2. Stelle'], ['nach Hause', 'sg', ''], ['.']]),
      'Das **finite Verb** ist das Verb mit der Personalendung: *ich geh**e**, du geh**st**, sie ging*. Bei zweiteiligen Prädikaten ist es der erste Teil: *Lina **ist** nach Hause gegangen.*'),
    S('Der Nebensatz',
      'Ein **Nebensatz** kann nicht allein stehen. Er beginnt meist mit einer **Subjunktion** (*weil, als, damit …*). Das finite Verb steht **am Ende**.',
      { anim: 'verbwandert', haupt: ['Sie', 'war', 'müde.'], neben: ['weil', 'sie', 'müde', 'war.'], verb: 'war', sub: 'weil' },
      sb([['weil', 'sub'], ['sie müde', 'sg', ''], ['war', 'fv'], ['.']], { klein: true })),
    S('Das Satzgefüge',
      'Hauptsatz und Nebensatz zusammen bilden ein **Satzgefüge**. Der Nebensatz kann **hinten** oder **vorne** stehen:',
      { vis: 'kommabild', zeilen: [{ titel: 'Nebensatz hinten', teile: [['hs', 'Lina ging nach Hause'], [','], ['ns', '**weil** sie müde **war**']] }, { titel: 'Nebensatz vorne', teile: [['ns', '**Als** ich **hereinkam**'], [','], ['hs', 'war niemand da']] }] },
      'Steht der Nebensatz vorne, folgt direkt danach das finite Verb des Hauptsatzes: *Als ich hereinkam, **war** niemand da.*'),
    S('Konjunktion oder Subjunktion?',
      'Zwei Wortarten verbinden Sätze. Der Unterschied zeigt sich am **Verb**:',
      { vis: 'vergleich', links: { titel: 'Konjunktion', md: '*und, oder, aber, denn, sondern*\n\nverbindet **zwei Hauptsätze** (Satzreihe). Das Verb bleibt an zweiter Stelle.\n\n*Lina ging, **denn** sie **war** müde.*' }, rechts: { titel: 'Subjunktion', md: '*weil, da, als, nachdem, bevor, damit, indem, dass …*\n\nleitet einen **Nebensatz** ein (Satzgefüge). Das Verb wandert ans Ende.\n\n*Lina ging, **weil** sie müde **war**.*' } },
      tipp('Probe', 'Schau auf das Verb nach dem Verbindungswort: Steht es an zweiter Stelle, ist es eine Konjunktion. Steht es am Ende, ist es eine Subjunktion.')),
    S('Das Komma',
      'Zwischen Hauptsatz und Nebensatz steht **immer** ein Komma – egal, wo der Nebensatz steht.',
      { vis: 'kommabild', zeilen: [{ titel: 'Nebensatz hinten: ein Komma', teile: [['hs', 'Niemand war da'], [','], ['ns', 'als ich hereinkam']] }, { titel: 'Nebensatz vorne: ein Komma', teile: [['ns', 'Als ich hereinkam'], [','], ['hs', 'war niemand da']] }, { titel: 'Nebensatz eingeschoben: zwei Kommas', teile: [['hs', 'Lina ging'], [','], ['ns', 'als niemand da war'], [','], ['hs', 'schnell wieder']] }] },
      achtung('und, oder, aber, denn', 'Vor *aber, denn, sondern* steht ein Komma. Vor *und* und *oder* brauchst du zwischen zwei Hauptsätzen meistens **keins**: *Lina kam herein und niemand war da.*')),
  ]);

  /* ── M11 Den Nebensatz finden ── */
  setze('M11 ', [
    S('Drei Schritte',
      { vis: 'ablauf', schritte: ['**Verb am Ende suchen** – Welches Verb steht ganz am Ende eines Satzteils?', '**Nach vorne bis zur Subjunktion gehen** – Dort beginnt der Nebensatz.', '**Komma setzen** – an die Grenze zwischen Hauptsatz und Nebensatz.'] },
      'Klicke auf „Weiter“. Dann siehst du die drei Schritte an einem Beispiel.'),
    S('Beispiel',
      morph('*Lina ging nach Hause weil sie müde war*', [
        [['Lina ging nach Hause weil sie müde war.'], 'Hier fehlt das Komma. Wo beginnt der Nebensatz?'],
        [['Lina ging nach Hause weil sie müde',['war','fv'],'.'], '**Schritt 1:** Das Verb *war* steht ganz am Ende. Es ist das finite Verb eines Nebensatzes.'],
        [['Lina ging nach Hause',['weil','subk'],['sie müde','nsk'],['war','fv'],'.'], '**Schritt 2:** Geh von *war* nach vorne, bis du eine Subjunktion findest: *weil*. Von *weil* bis *war* reicht der Nebensatz.'],
        [[['Lina ging nach Hause','hsk'],',',['weil sie müde war','nsk'],'.'], '**Schritt 3:** Das Komma kommt **vor** die Subjunktion – an die Grenze zwischen Hauptsatz und Nebensatz.'],
      ]),
      morph('*Als Mia kam war der Pokal weg*', [
        [['Als Mia',['kam','fv'],'war der Pokal weg.'], '**Schritt 1:** *kam* steht am Ende des ersten Satzteils.'],
        [[['Als','subk'],['Mia','nsk'],['kam','fv'],'war der Pokal weg.'], '**Schritt 2:** Der Nebensatz beginnt mit *Als* und endet mit *kam*.'],
        [[['Als Mia kam','nsk'],',',['war der Pokal weg','hsk'],'.'], '**Schritt 3:** Das Komma steht **nach** dem Nebensatz, direkt vor dem finiten Verb *war* des Hauptsatzes.'],
      ])),
    S('Die häufigsten Subjunktionen',
      'Steht eines dieser Wörter am Anfang eines Satzteils und das Verb am Ende, hast du einen Nebensatz gefunden:',
      { vis: 'chips', gruppen: [['temporal', ['als', 'wenn', 'während', 'nachdem', 'bevor', 'seit', 'bis', 'sobald'], 'Zeit'], ['kausal', ['weil', 'da'], 'Grund'], ['final', ['damit'], 'Zweck'], ['modal', ['indem', 'ohne dass'], 'Art und Weise'], ['sg', ['dass', 'ob'], 'Sonstige']] }),
  ]);

  /* ── M12 Der Nebensatz als Adverbial ── */
  setze('M12 ', [
    S('Aus dem Adverbial wird ein Satz',
      'Die Kommissarin fragt: *Wann rannten alle in die Aula?* Die Antwort kann ein kurzes Adverbial sein – oder ein ganzer Nebensatz:',
      morph('', [
        [[['Um 18 Uhr','temporal'],'rannten alle in die Aula.'], 'Ein **Adverbial** (Präpositionalgruppe): *Wann?* → *um 18 Uhr*'],
        [[['Als die Glocke läutete','temporal'],',','rannten alle in die Aula.'], 'Ein **Nebensatz** übernimmt dieselbe Aufgabe: *Wann?* → *als die Glocke läutete*'],
      ]),
      'Der Nebensatz hat hier die Aufgabe eines Adverbials. Darum heißt er **Adverbialsatz**. Das kennst du schon aus Klasse 6.'),
    S('Die Funktion bestimmen',
      'Die Funktion eines Adverbialsatzes bestimmst du genau wie beim Adverbial: mit der **W-Frage** an den Hauptsatz.',
      sb([['Lina ging', 'hs'], [','], ['weil der Bus kam', 'kausal', 'Adverbialsatz: kausal'], ['.']], { unter: '*Warum ging Lina?* → *weil der Bus kam* → kausal' }),
      'Oft verrät dir schon die **Subjunktion** die Funktion:',
      { vis: 'chips', gruppen: [['lokal', ['wo', 'wohin', 'woher'], 'lokal'], ['temporal', ['als', 'wenn', 'während', 'nachdem', 'bevor', 'seit', 'bis', 'sobald'], 'temporal'], ['kausal', ['weil', 'da'], 'kausal'], ['modal', ['indem', 'ohne dass'], 'modal'], ['final', ['damit', 'um … zu'], 'final']] }),
    S('Die Adverbialsätze im Überblick',
      '| Adverbialsatz | Frage | Subjunktionen | Beispiel |\n| --- | --- | --- | --- |\n| Lokalsatz | Wo? Wohin? Woher? | *wo, wohin, woher* | *Tom wartete dort, **wo** der Bus hält.* |\n| Temporalsatz | Wann? Wie lange? Seit wann? | *als, wenn, während, nachdem, bevor, seit, bis, sobald* | ***Als** die Glocke läutete, rannten alle los.* |\n| Kausalsatz | Warum? Weshalb? | *weil, da* | *Lina ging, **weil** der Bus kam.* |\n| Modalsatz | Wie? Auf welche Weise? Wodurch? | *indem, ohne dass* | *Tom öffnete die Tür, **indem** er den Schlüssel benutzte.* |\n| Finalsatz | Wozu? Mit welchem Ziel? | *damit* | *Lina rennt, **damit** sie den Bus erwischt.* |',
      tipp('Und instrumental?', 'Einen eigenen „Instrumentalsatz“ gibt es nicht. Ein *indem*-Satz nennt oft das Mittel (*Wodurch?*). Wir zählen ihn trotzdem zu den **Modalsätzen**.')),
    S('Achtung: ein Wort – mehrere Bedeutungen',
      achtung('als', '***Als** Mia kam, …* (temporal, Subjunktion) – aber: *Tom ist größer **als** Lina.* (Vergleich, kein Nebensatz)'),
      achtung('während', '***Während** Mia fotografierte, …* (temporal: gleichzeitig). Manchmal zeigt *während* auch einen Gegensatz: *Lina ging, **während** Mia blieb.*'),
      achtung('da', '***Da** es regnete, …* (kausal, wie *weil*) – aber: *Der Pokal steht **da**.* (Adverb, lokal)'),
      achtung('seit', '*seit dem Fest* (Präposition) – *seit der Pokal fehlt* (Subjunktion)')),
  ]);

  /* ── M13 Feldermodell ── */
  setze('M13 ', [
    S('Das Feldermodell',
      'Du kennst das Feldermodell aus Klasse 5 und 6. Das Prädikat bildet eine **Klammer**. Um sie herum liegen drei Felder:',
      { vis: 'felder', zeilen: [['*Lina*', '*ist*', '*schnell nach Hause*', '*gegangen.*', ''], ['*Alle*', '*rannten*', '*in die Aula.*', '', '']], unter: 'Linke Verbklammer = finites Verb. Rechte Verbklammer = zweiter Teil des Prädikats (wenn es einen gibt).' }),
    S('Der Adverbialsatz wandert',
      'Ein Adverbialsatz kann in verschiedenen Feldern stehen. Der Nebensatz ist farbig markiert:',
      { vis: 'felder', zeilen: [['!*Als die Glocke läutete,*', '*rannten*', '*alle in die Aula.*', '', ''], ['*Alle*', '*rannten*', '*in die Aula,*', '', '!*als die Glocke läutete.*'], ['*Alle*', '*rannten,*', '!*als die Glocke läutete,* *in die Aula.*', '', '']] },
      '- **Vorfeld:** Der Adverbialsatz steht ganz vorne.\n- **Nachfeld:** Er steht nach der rechten Verbklammer, ganz hinten.\n- **Mittelfeld:** Er ist eingeschoben – dann braucht er zwei Kommas.'),
    S('Die Vorfeld-Regel',
      'Steht der Adverbialsatz im **Vorfeld**, folgt direkt danach das finite Verb des Hauptsatzes:',
      morph('', [
        [['Alle',['rannten','fv'],'in die Aula',',',['als die Glocke läutete','temporal'],'.'], 'Der Adverbialsatz steht im Nachfeld.'],
        [[['Als die Glocke läutete','temporal'],',',['rannten','fv'],'alle in die Aula.'], 'Jetzt steht er im Vorfeld. Direkt nach dem Komma kommt das finite Verb *rannten*. Das Subjekt *alle* rutscht dahinter.'],
      ]),
      achtung('Häufiger Fehler', '*Als die Glocke läutete, alle rannten in die Aula.* ✘\n\n*Als die Glocke läutete, **rannten** alle in die Aula.* ✔\n\nNach dem Nebensatz im Vorfeld kommt **sofort** das finite Verb.')),
  ]);

  /* ── M14 Ersatz-Trick ── */
  setze('M14 ', [
    S('Ein Wort statt eines ganzen Satzes',
      'Ersetze den ganzen Adverbialsatz durch **ein einziges Wort**. Welches Wort passt, verrät dir die Funktion:',
      { vis: 'chips', gruppen: [['lokal', ['dort'], 'lokal'], ['temporal', ['dann', 'da'], 'temporal'], ['kausal', ['deshalb', 'darum'], 'kausal'], ['modal', ['so', 'dadurch'], 'modal'], ['final', ['dazu'], 'final']] },
      { anim: 'ersatz', satz: 'Lina ging nach Hause,', ns: 'weil sie müde war.', wort: 'deshalb', neu: 'Lina ging deshalb nach Hause.', f: 'kausal' }),
    S('Noch mehr Beispiele',
      morph('*Tom kam früher, damit er helfen konnte.*', [
        [['Tom kam früher',',',['damit er helfen konnte','nsk'],'.'], 'Welches Ersatzwort passt?'],
        [['Tom kam',['deshalb','weg'],'früher.'], '*deshalb*? Klingt möglich – aber der Nebensatz nennt keinen Grund, sondern ein **Ziel**.'],
        [['Tom kam',['dazu','final'],'früher.'], '*dazu* passt genau: Tom kam früher – **wozu**? Um zu helfen. → **final**'],
      ]),
      morph('*Als Mia kam, war der Pokal weg.*', [
        [[['Als Mia kam','nsk'],',','war der Pokal weg.'], 'Welches Ersatzwort passt?'],
        [[['Dann','temporal'],'war der Pokal weg.'], '*Dann* passt → **temporal**.'],
      ]),
      morph('*Tom wartete dort, wo die Fahrräder stehen.*', [
        [['Tom wartete dort',',',['wo die Fahrräder stehen','nsk'],'.'], 'Welches Ersatzwort passt?'],
        [['Tom wartete',['dort','lokal'],'.'], '*dort* passt → **lokal**.'],
      ])),
  ]);

  /* ── M16 Gliedsätze ── */
  setze('M16 ', [
    S('Nebensätze können mehr',
      'Nebensätze können nicht nur Adverbiale sein. Sie können auch die Aufgabe des **Subjekts** oder eines **Objekts** übernehmen. Alle diese Nebensätze heißen **Gliedsätze**, weil sie ein Satzglied sind.',
      { vis: 'baum' }),
    S('Der Subjektsatz',
      'Vergleiche die beiden Sätze. Der Nebensatz steht genau dort, wo vorher das Subjekt stand:',
      sb([['Der Diebstahl', 'subj'], ['wundert', 'praed'], ['Herrn Oswald', 'akk'], ['.']], { klein: true }),
      sb([['Dass der Pokal fehlt', 'subjsatz'], [','], ['wundert', 'praed'], ['Herrn Oswald', 'akk'], ['.']], { klein: true }),
      '- **Frage:** *Wer oder was wundert Herrn Oswald?* → *Dass der Pokal fehlt.*\n- **Ersatzprobe:** ***Das** wundert Herrn Oswald.* – *Das* ist hier das Subjekt.'),
    S('Der Objektsatz',
      'Hier steht der Nebensatz dort, wo sonst das Akkusativobjekt steht:',
      sb([['Herr Oswald', 'subj'], ['weiß', 'praed'], ['die Antwort', 'akk'], ['.']], { klein: true }),
      sb([['Herr Oswald', 'subj'], ['weiß', 'praed'], [','], ['dass Tom gefragt hat', 'objsatz'], ['.']], { klein: true }),
      '- **Frage:** *Wen oder was weiß Herr Oswald?* → *dass Tom gefragt hat.*\n- **Ersatzprobe:** *Herr Oswald weiß **das**.* – *Das* ist hier das Objekt.',
      tipp('ob und Fragewörter', 'Auch Nebensätze mit *ob* oder einem Fragewort sind oft Objektsätze: *Die Kommissarin fragt, **ob** Tom einen Schlüssel hatte.* – *Ich weiß nicht, **wozu** er ihn brauchte.*')),
    S('Adverbialsatz oder nicht?',
      'Die **Weglassprobe** zeigt den Unterschied. Klicke auf „Nebensatz weglassen“:',
      { anim: 'weglassen', beispiele: [{ haupt: 'Mia lachte', ns: ', als sie das Foto sah', ok: true }, { haupt: 'Herr Oswald weiß', ns: ', dass Tom gefragt hat', ok: false }] },
      { vis: 'vergleich', links: { titel: 'Adverbialsatz', f: 'temporal', md: 'Kann **meistens weg**. Der Rest bleibt ein vollständiger Satz.\n\nFrage: *Wo? Wann? Warum? Wie? Wozu?*' }, rechts: { titel: 'Subjekt- oder Objektsatz', f: 'akk', md: 'Kann **nicht weg**. Sonst fehlt ein wichtiges Satzglied.\n\nFrage: *Wer? Wen? Was?*' } }),
  ]);

  /* ── M17 Das-Test ── */
  setze('M17 ', [
    S('Der Das-Test',
      'Ersetze den Nebensatz durch **das** oder durch eines der Ersatzwörter aus Akte 3. Was passt?',
      { vis: 'ablauf', senkrecht: true, schritte: ['Passt **das**, und *das* ist das **Subjekt** (*Das wundert alle.*) → **Subjektsatz**', 'Passt **das**, und *das* ist ein **Objekt** (*Mia weiß das.*) → **Objektsatz**', 'Passt **dort, dann, deshalb, so** oder **dazu** → **Adverbialsatz**'] }),
    S('Beispiele',
      morph('*Mia weiß, dass Tom den Pokal hat.*', [
        [['Mia weiß',',',['dass Tom den Pokal hat','nsk'],'.'], 'Ersetze den Nebensatz.'],
        [['Mia weiß',['das','akkk'],'.'], '*Mia weiß das.* – *Wen oder was weiß Mia?* → *das* ist das Objekt → **Objektsatz**.'],
      ]),
      morph('*Dass der Pokal fehlt, ärgert Tom.*', [
        [[['Dass der Pokal fehlt','nsk'],',','ärgert Tom.'], 'Ersetze den Nebensatz.'],
        [[['Das','subjk'],'ärgert Tom.'], '*Das ärgert Tom.* – *Wer oder was ärgert Tom?* → *das* ist das Subjekt → **Subjektsatz**.'],
      ]),
      morph('*Lina ging, weil der Bus kam.*', [
        [['Lina ging',',',['weil der Bus kam','nsk'],'.'], 'Ersetze den Nebensatz.'],
        [['Lina ging',['das','weg'],'.'], '*Lina ging das.* ✘ – Das ergibt keinen Sinn.'],
        [['Lina ging',['deshalb','kausal'],'.'], '*Lina ging deshalb.* ✔ → **Adverbialsatz** (kausal).'],
      ])),
  ]);

  /* ── M18 Umformen ── */
  setze('M18 ', [
    S('Gleiche Information, andere Form',
      'Du kannst dieselbe Information als **Präpositionalgruppe** oder als **Adverbialsatz** ausdrücken:',
      { vis: 'vergleich', links: { titel: 'Präpositionalgruppe', f: 'kausal', md: '***Wegen des Regens** blieben alle drinnen.*\n\nkurz und sachlich – gut für Berichte und Notizen' }, rechts: { titel: 'Adverbialsatz', f: 'kausal', md: '***Weil es regnete**, blieben alle drinnen.*\n\ngenauer und lebendiger – gut für Erzählungen' } }),
    S('In drei Schritten umformen',
      morph('*Wegen des Regens blieben alle drinnen.*', [
        [[['Wegen','hl'],'des Regens blieben alle drinnen.'], '**Schritt 1 – Präposition → Subjunktion:** Welche Subjunktion passt zu *wegen*? → *weil*'],
        [[['Weil','subk'],['des Regens','hl'],'blieben alle drinnen.'], '**Schritt 2 – Nomen → Verb:** *der Regen* → *regnen*'],
        [[['Weil','subk'],['es','neu'],['regnete','fv'],',','blieben alle drinnen.'], '**Schritt 3 – Satz bauen:** Wer oder was regnet? → *es*. Das finite Verb ans Ende (*regnete*). Komma setzen.'],
        [[['Weil es regnete','kausal'],',','blieben alle drinnen.'], '**Fertig!** Funktion und Inhalt sind gleich geblieben – nur die Form hat sich geändert.'],
      ])),
    S('Die passenden Paare',
      '| Präposition | Subjunktion | Beispiel |\n| --- | --- | --- |\n| *wegen* | *weil, da* | *wegen des Regens → weil es regnete* |\n| *während* | *während* | *während des Spiels → während sie spielten* |\n| *nach* | *nachdem* | *nach dem Spiel → nachdem sie gespielt hatten* |\n| *vor* | *bevor* | *vor dem Fest → bevor das Fest begann* |\n| *seit* | *seit, seitdem* | *seit dem Umzug → seit sie umgezogen ist* |\n| *zu, für* | *damit* / *um … zu* | *zum Schutz → damit nichts passiert* |\n| *durch, mit* | *indem* | *durch genaues Fragen → indem sie genau fragte* |',
      tipp('Nomen → Verb', '*die Ankunft → ankommen*, *das Training → trainieren*, *der Anruf → anrufen*, *die Kälte → kalt sein*, *die Angst → Angst haben*')),
    S('nachdem braucht die Vorvergangenheit',
      'Was im Nebensatz mit *nachdem* passiert, ist **vorher** geschehen:',
      { vis: 'zeitleiste', punkte: [['*Sie **hatten gespielt**.*', 'zuerst · Plusquamperfekt'], ['*Sie **feierten**.*', 'danach · Präteritum']] },
      achtung('Zeitform', 'Steht der Hauptsatz im Präteritum, steht der *nachdem*-Satz im **Plusquamperfekt**: *Nachdem sie **gespielt hatten**, feierten sie.*')),
    S('um … zu oder damit?',
      'Bei finalen Nebensätzen hast du zwei Möglichkeiten. Entscheidend ist das **Subjekt**:',
      { vis: 'vergleich', links: { titel: 'um … zu', f: 'final', md: '**Gleiches** Subjekt in beiden Teilen:\n\n*Mia kam früher, **um** Fotos **zu** machen.*\n\nMia kommt – Mia macht Fotos.' }, rechts: { titel: 'damit', f: 'final', md: '**Verschiedene** Subjekte:\n\n*Mia kam früher, **damit** Tom Fotos machen konnte.*\n\nMia kommt – Tom macht Fotos.' } },
      tipp('Immer möglich', '*damit* geht auch bei gleichem Subjekt: *Mia kam früher, damit sie Fotos machen konnte.* – *um … zu* klingt dann aber kürzer.')),
  ]);

  /* ── M20 Umformen Schritt für Schritt ── */
  setze('M20 ', [
    S('Beispiel 1: *Wegen der Kälte*',
      morph('*Wegen der Kälte trug Lina eine Mütze.*', [
        [[['Wegen','hl'],'der Kälte trug Lina eine Mütze.'], '**Schritt 1 – Präposition → Subjunktion:** *wegen* → *weil*'],
        [[['Weil','subk'],['der Kälte','hl'],'trug Lina eine Mütze.'], '**Schritt 2 – Nomen → Verb oder Adjektiv:** *die Kälte* → *kalt sein*'],
        [[['Weil','subk'],['es kalt','neu'],['war','fv'],',','trug Lina eine Mütze.'], '**Schritt 3 – Satz bauen:** Wer oder was ist kalt? → *es*. Das finite Verb *war* ans Ende. Komma setzen.'],
        [[['Weil es kalt war','kausal'],',','trug Lina eine Mütze.'], '**Ergebnis:** *Weil es kalt war, trug Lina eine Mütze.*'],
      ])),
    S('Beispiel 2: *Nach dem Training*',
      morph('*Nach dem Training duschte Tom.*', [
        [[['Nach','hl'],'dem Training duschte Tom.'], '**Schritt 1:** *nach* → *nachdem*'],
        [[['Nachdem','subk'],['dem Training','hl'],'duschte Tom.'], '**Schritt 2:** *das Training* → *trainieren*'],
        [[['Nachdem','subk'],['Tom','neu'],['trainiert hatte','fv'],',','duschte er.'], '**Schritt 3:** Wer trainiert? → *Tom*. Weil das Training **vorher** war: Plusquamperfekt *trainiert hatte*. Im Hauptsatz steht jetzt *er*.'],
        [[['Nachdem Tom trainiert hatte','temporal'],',','duschte er.'], '**Ergebnis:** *Nachdem Tom trainiert hatte, duschte er.*'],
      ])),
    S('Beispiel 3: *Zum Schutz*',
      morph('*Zum Schutz vor Regen spannten sie ein Zelt.*', [
        [[['Zum','hl'],'Schutz vor Regen spannten sie ein Zelt.'], '**Schritt 1:** *zum* (Zweck) → *damit* oder *um … zu*'],
        [[['Damit','subk'],['der Regen','neu'],['niemanden nass macht','fv'],',','spannten sie ein Zelt.'], '**Schritt 2 und 3:** Das Subjekt im Nebensatz ist *der Regen* – ein anderes als im Hauptsatz (*sie*). Darum *damit*.'],
        [[['Um sich vor Regen zu schützen','final'],',','spannten sie ein Zelt.'], '**Oder:** Gleiches Subjekt (*sie* schützen sich) → *um … zu*.'],
      ])),
  ]);

  /* ── M21 Test ── */
  setze('M21 ', [
    S('So läuft der Test',
      'Der Test findet in der App statt. Deine Lehrkraft schaltet ihn frei.',
      { vis: 'ablauf', schritte: ['**20 Minuten** Zeit', '**keine Lupe** und keine Rückmeldung', '**ein Versuch** pro Aufgabe', 'Aufgaben wie im **Probetest**'] }),
    S('Tipps für den Test',
      sp('Geh bei jeder Aufgabe ruhig nach deinem Plan vor. Das hast du in den Akten trainiert.'),
      { vis: 'ablauf', senkrecht: true, schritte: ['Finde zuerst das **Prädikat**.', 'Stell die **W-Frage**: *Wo? Wann? Warum? Wie? Womit? Wozu?*', 'Schau beim Nebensatz auf die **Subjunktion** und auf das **Verb am Ende**.', 'Denk an das **Komma** zwischen Hauptsatz und Nebensatz.'] }),
  ]);

  /* ── Ausführliche Merken-Kästen (Merkblatt und App) ── */
  const M_SATZGLIEDER = merken('Die Satzglieder', 'Ein Satz besteht aus **Satzgliedern**. Ein Satzglied kann ein einzelnes Wort sein (*Mia*) oder aus mehreren Wörtern bestehen (*der Kommissarin*).\n\n| Satzglied | So fragst du | Beispiel |\n| --- | --- | --- |\n| **Prädikat** | Was tut jemand? Was geschieht? | *Mia **zeigt** der Kommissarin ein Foto.* |\n| **Subjekt** | Wer oder was …? | ***Mia** zeigt der Kommissarin ein Foto.* → *Wer zeigt …?* |\n| **Akkusativobjekt** | Wen oder was …? | *Mia zeigt der Kommissarin **ein Foto**.* → *Wen oder was zeigt Mia?* |\n| **Dativobjekt** | Wem …? | *Mia zeigt **der Kommissarin** ein Foto.* → *Wem zeigt Mia das Foto?* |\n\n**Das Prädikat** ist der Kern des Satzes. Es wird von einem Verb gebildet. Im Hauptsatz steht das finite Verb – das Verb mit der Personalendung – immer an zweiter Stelle. Manchmal besteht das Prädikat aus zwei Teilen. Sie bilden dann eine Klammer um den Satz, die **Verbklammer**: *Herr Brandt **schließt** die Tür **ab**.* – *Lina **hat** den Pokal **gesehen**.*\n\n**Das Subjekt** passt in der Person zum Prädikat. Setzt du es in die Mehrzahl, ändert sich auch das Verb: *Mia **zeigt** …* → *Mia und Tom **zeigen** …*\n\n**Die Objekte** ergänzen das Prädikat. Manche Verben brauchen ein Objekt (*Mia zeigt …* – wem? was?), andere nicht (*Mia lacht.*).');
  const M_PROBEN = merken('So bestimmst du Satzglieder', '1. **Prädikat suchen:** Welches Wort sagt, was passiert? Schau auch ans Satzende, ob dort ein zweiter Teil steht.\n2. **Umstellprobe:** Stell den Satz um. Was du gemeinsam an eine andere Stelle schieben kannst, ist **ein** Satzglied. *Mia | zeigt | der Kommissarin | ein Foto.* → *Ein Foto | zeigt | Mia | der Kommissarin.* Das finite Verb bleibt dabei an zweiter Stelle.\n3. **Frageprobe:** Frag vom Prädikat aus: *Wer oder was?* → Subjekt · *Wen oder was?* → Akkusativobjekt · *Wem?* → Dativobjekt.');
  const M_HSNS = merken('Hauptsatz, Nebensatz und Komma', '**Der Hauptsatz** kann allein stehen. Sein finites Verb steht an zweiter Stelle: *Lina **ging** nach Hause.*\n\n**Der Nebensatz** kann nicht allein stehen. Er hängt von einem Hauptsatz ab. Meist wird er von einer **Subjunktion** eingeleitet (z. B. *weil, als, dass, damit*), und sein finites Verb steht **am Ende**: *…, weil sie müde **war**.*\n\n**Satzgefüge und Satzreihe:** Verbindest du einen Hauptsatz mit einem Nebensatz, entsteht ein **Satzgefüge**: *Lina ging nach Hause, weil sie müde war.* Verbindest du zwei Hauptsätze, entsteht eine **Satzreihe**: *Lina ging nach Hause, denn sie war müde.*\n\n**Konjunktion oder Subjunktion?** Konjunktionen (*und, oder, aber, denn, sondern*) verbinden zwei gleichrangige Sätze. Das finite Verb bleibt dabei an zweiter Stelle. Subjunktionen (*weil, da, als, nachdem, bevor, damit, indem, dass, ob …*) leiten einen Nebensatz ein. Das finite Verb wandert dann ans Ende.\n\n**Die Kommaregeln:**\n1. Zwischen Hauptsatz und Nebensatz steht **immer** ein Komma – egal, ob der Nebensatz hinten oder vorne steht: *Niemand war da, als ich hereinkam.* – *Als ich hereinkam, war niemand da.*\n2. Ist der Nebensatz in den Hauptsatz **eingeschoben**, steht vor und nach ihm ein Komma: *Lina ging, als niemand da war, schnell wieder.*\n3. Verbinden *aber, denn* oder *sondern* zwei Hauptsätze, steht davor ein Komma: *Tom wollte helfen, aber er hatte keine Zeit.*\n4. Verbinden *und* oder *oder* zwei Hauptsätze, brauchst du meistens **kein** Komma: *Lina kam herein und niemand war da.*\n\n**So findest du die Stelle für das Komma:** Such das Verb, das ganz am Ende eines Satzteils steht. Geh von dort nach vorne bis zur Subjunktion. Dort beginnt der Nebensatz – an seinem Anfang und an seinem Ende steht ein Komma, wenn dort der Hauptsatz weitergeht.');
  const M_ADVSATZ = merken('Adverbialsätze', 'Ein **Adverbialsatz** ist ein Nebensatz, der die Aufgabe eines Adverbials übernimmt. Er gibt also die Umstände an: Ort, Zeit, Grund, Art und Weise oder Zweck. Vergleiche:\n- ***Um 18 Uhr** rannten alle in die Aula.* → Adverbial (temporal)\n- ***Als die Glocke läutete**, rannten alle in die Aula.* → Adverbialsatz (temporal)\n\nDu erkennst ihn an der **Subjunktion** am Anfang und am **finiten Verb am Ende**. Seine Funktion bestimmst du mit der **W-Frage** an den Hauptsatz. Oft verrät sie auch schon die Subjunktion. Zur Probe kannst du den ganzen Nebensatz durch ein **Ersatzwort** ersetzen.\n\n| Adverbialsatz | Frage | Subjunktionen | Beispiele | Ersatzwort |\n| --- | --- | --- | --- | --- |\n| Lokalsatz | Wo? Wohin? Woher? | *wo, wohin, woher* | *Tom wartete dort, **wo die Fahrräder stehen**.* | *dort* |\n| Temporalsatz | Wann? Wie lange? Seit wann? | *als, wenn, während, nachdem, bevor, seit, bis, sobald* | ***Als die Glocke läutete**, rannten alle los.* – *Tom putzte den Pokal, **bevor die Gäste kamen**.* – *Die AG wartete, **bis der Trainer pfiff**.* | *dann* |\n| Kausalsatz | Warum? Weshalb? | *weil, da* | *Lina ging, **weil der Bus kam**.* – ***Da es regnete**, feierten alle drinnen.* | *deshalb* |\n| Modalsatz | Wie? Auf welche Weise? Wodurch? | *indem, ohne dass* | *Tom öffnete die Tür, **indem er den Schlüssel benutzte**.* – *Lina ging, **ohne dass jemand sie sah**.* | *so, dadurch* |\n| Finalsatz | Wozu? Mit welchem Ziel? | *damit* | *Lina rennt, **damit sie den Bus erwischt**.* – *Herr Oswald übt lange, **damit das Konzert gelingt**.* | *dazu* |\n\n**Stellung und Komma:** Ein Adverbialsatz kann vorne (Vorfeld), hinten (Nachfeld) oder eingeschoben (Mittelfeld) stehen. Steht er vorne, folgt direkt danach das finite Verb des Hauptsatzes: *Weil es regnete, **feierten** alle drinnen.* Zwischen Hauptsatz und Adverbialsatz steht immer ein Komma.');
  const M_UMFORMEN = merken('Umformen', 'Viele Informationen kannst du auf zwei Arten ausdrücken: kurz als **Präpositionalgruppe** oder genauer als **Adverbialsatz**. Die Funktion bleibt dabei gleich:\n- ***Wegen des Regens** blieben alle drinnen.* (kausal, Präpositionalgruppe)\n- ***Weil es regnete**, blieben alle drinnen.* (kausal, Adverbialsatz)\n\n**Von der Präpositionalgruppe zum Adverbialsatz** – in drei Schritten:\n1. Ersetze die **Präposition** durch eine passende **Subjunktion**: *wegen → weil*.\n2. Mache aus dem **Nomen** ein **Verb** (oder ein Adjektiv mit *sein*): *der Regen → regnen*, *die Kälte → kalt sein*.\n3. Baue einen vollständigen Nebensatz: Ergänze, wer oder was etwas tut, stelle das finite Verb ans Ende und setze das Komma: *Weil es regnete, …*\n\n| Präpositionalgruppe | Adverbialsatz |\n| --- | --- |\n| ***Wegen der Kälte** trug Lina eine Mütze.* | ***Weil es kalt war**, trug Lina eine Mütze.* |\n| ***Während des Spiels** war es laut.* | ***Während sie spielten**, war es laut.* |\n| ***Nach dem Training** duschte Tom.* | ***Nachdem Tom trainiert hatte**, duschte er.* |\n| ***Vor dem Fest** putzte Tom den Pokal.* | ***Bevor das Fest begann**, putzte Tom den Pokal.* |\n| ***Seit dem Schulfest** fehlt der Pokal.* | ***Seit das Schulfest vorbei ist**, fehlt der Pokal.* |\n| ***Zum Gravieren** brachte Tom den Pokal weg.* | ***Damit der Pokal graviert wurde**, brachte Tom ihn weg.* |\n| ***Durch genaues Fragen** fand die Kommissarin die Lösung.* | ***Indem sie genau fragte**, fand die Kommissarin die Lösung.* |\n\n**Vom Adverbialsatz zur Präpositionalgruppe** gehst du rückwärts: Die Subjunktion wird zur Präposition, das Verb wird zum Nomen, Subjekt und Komma fallen weg: ***Weil Lina Angst hatte**, rief sie die Kommissarin.* → ***Aus Angst** rief Lina die Kommissarin.*\n\n**Achte auf zwei Dinge:**\n- **nachdem:** Was im Nebensatz steht, ist vorher passiert. Steht der Hauptsatz im Präteritum, steht der *nachdem*-Satz im Plusquamperfekt: *Nachdem sie **gespielt hatten**, feierten sie.*\n- **um … zu oder damit:** Haben Hauptsatz und Nebensatz **dasselbe Subjekt**, kannst du *um … zu* verwenden: *Mia kam früher, **um** Fotos **zu** machen.* Sind die Subjekte **verschieden**, brauchst du *damit*: *Mia kam früher, **damit** Tom Fotos machen konnte.*');

  /* in der App: Merken-Kästen der Akten ersetzen bzw. ergänzen */
  const seiteVon = (prefix) => alle.find((x) => x.t === 'page' && x.title && x.title.startsWith(prefix));
  const pAdv = seiteVon('Merken: Adverbialsätze'); if (pAdv) pAdv.blocks = [M_ADVSATZ];
  const pUmf = seiteVon('Merken: Umformen'); if (pUmf) pUmf.blocks = [M_UMFORMEN];
  const pM4 = seiteVon('M4 '); if (pM4 && pM4.seiten) pM4.seiten.unshift(S('Erinnerung: die Satzglieder', 'Bevor es um die Adverbiale geht, frischen wir kurz auf, welche Satzglieder du schon kennst.', M_SATZGLIEDER, sb([['Mia', 'subj'], ['zeigt', 'praed'], ['der Kommissarin', 'dat'], ['ein Foto', 'akk'], ['.']])));
  const pM2 = seiteVon('M2 '); if (pM2 && pM2.seiten) pM2.seiten.push(S('Alles auf einen Blick', M_SATZGLIEDER, M_PROBEN));
  const pM10 = seiteVon('M10 '); if (pM10 && pM10.seiten) pM10.seiten.push(S('Das Wichtigste auf einen Blick', M_HSNS));
  const pM18 = seiteVon('M18 '); if (pM18 && pM18.seiten) pM18.seiten.splice(3, 0, S('Und umgekehrt',
    'Du kannst auch einen Adverbialsatz in eine Präpositionalgruppe umformen. Dann gehst du rückwärts vor:',
    morph('*Weil Lina Angst hatte, rief sie die Kommissarin.*', [
      [[['Weil', 'hl'], 'Lina Angst hatte', ',', 'rief sie die Kommissarin.'], '**Schritt 1 – Subjunktion → Präposition:** Welche Präposition passt zu *weil*? → *wegen* oder *aus*'],
      [[['Aus', 'subk'], ['Lina Angst hatte', 'hl'], ',', 'rief sie die Kommissarin.'], '**Schritt 2 – Verb → Nomen:** *Angst haben* → *die Angst*'],
      [[['Aus Angst', 'kausal'], 'rief', ['Lina', 'neu'], 'die Kommissarin.'], '**Schritt 3 – Satz anpassen:** Subjekt und Komma des Nebensatzes fallen weg. Das finite Verb *rief* rückt direkt hinter die Präpositionalgruppe, *Lina* steht dahinter.'],
    ]),
    tipp('Wann welche Form?', 'Die Präpositionalgruppe ist kürzer – gut für Notizen und sachliche Berichte. Der Adverbialsatz ist genauer und lebendiger – gut für Erzählungen. In einem guten Text wechselst du ab.')));

  /* ── Merkblatt mit Themen-Unterseiten ── */
  const merkVon = (titel) => { for (const s of alle) if (s.t === 'page' && s.blocks) for (const b of s.blocks) if (b.box === 'merken' && b.title === titel) return b; return null; };
  LJ.merkblatt = [
    S('Die Satzglieder', M_SATZGLIEDER, sb([['Mia', 'subj'], ['zeigt', 'praed'], ['der Kommissarin', 'dat'], ['ein Foto', 'akk'], ['.']]), M_PROBEN),
    S('Adverbiale: die sechs Funktionen', merkVon('Adverbiale'), { vis: 'funktionen', statisch: true, ohneNeu: true }),
    S('Formen des Adverbials', merkVon('Formen des Adverbials'),
      { vis: 'formen', titel: 'Beispiel: *Wann?*', f: 'temporal', zeilen: [['Adverb', '*gestern*'], ['Präpositionalgruppe', '*am Freitag*'], ['Nominalgruppe', '*den ganzen Abend*'], ['Nebensatz', '*als das Fest begann*']] }),
    S('Hauptsatz, Nebensatz, Komma', M_HSNS,
      { vis: 'kommabild', zeilen: [{ titel: 'Nebensatz hinten', teile: [['hs', 'Lina ging nach Hause'], [','], ['ns', 'weil sie müde war']] }, { titel: 'Nebensatz vorne', teile: [['ns', 'Als ich hereinkam'], [','], ['hs', 'war niemand da']] }, { titel: 'Nebensatz eingeschoben', teile: [['hs', 'Lina ging'], [','], ['ns', 'als niemand da war'], [','], ['hs', 'schnell wieder']] }] }),
    S('Adverbialsätze', M_ADVSATZ,
      { vis: 'felder', titel: 'Der Adverbialsatz im Feldermodell', zeilen: [['!*Als die Glocke läutete,*', '*rannten*', '*alle in die Aula.*', '', ''], ['*Alle*', '*rannten*', '*in die Aula,*', '', '!*als die Glocke läutete.*']] }),
    S('Gliedsätze', merkVon('Gliedsätze im Überblick'), { vis: 'baum' }),
    S('Umformen', M_UMFORMEN),
  ].filter((s) => s.blocks.every(Boolean));
})();
