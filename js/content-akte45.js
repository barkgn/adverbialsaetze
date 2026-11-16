/* Modul V (Akte 4) und Modul VI (Akte 5) */
(function () {
  const { I } = LJ;
  const UZ = (id, s, a, o = {}) => I.ch(id, s, ['um … zu', 'damit'], a, { hint: 'Haben beide Teile dasselbe Subjekt? Steht am Ende ein Infinitiv mit zu?', ...o });

  LJ.modules.push({
    id: 'm5', nr: 'V', akte: 4, kurz: 'Akte 4', titel: 'Wer sagt was? Subjekt- und Objektsätze',
    leitfrage: 'Welche Aufgaben können Nebensätze im Satz noch übernehmen?',
    ziele: ['Subjekt- und Objektsätze **erkennen**.', 'Adverbialsätze von Subjekt- und Objektsätzen **unterscheiden**.'],
    wortspeicher: { box: 'wortspeicher', md: '| Begriff | Erklärung |\n| --- | --- |\n| Gliedsatz | Nebensatz, der ein Satzglied ist: Adverbialsatz, Subjektsatz oder Objektsatz |\n| Subjektsatz | Nebensatz, der die Aufgabe des Subjekts hat (Wer oder was?) |\n| Objektsatz | Nebensatz, der die Aufgabe eines Objekts hat (meist: Wen oder was?) |\n| Ersatzprobe | Du ersetzt einen Satzteil durch ein anderes Wort, z. B. durch *das*, und prüfst, ob der Satz noch funktioniert. |' },
    steps: [
      { t: 'repeat', nr: '27', n: 2, text: '**Bearbeite** die zwei Wiederholungskarten aus Akte 1–3.' },
      { t: 'page', nr: '28', text: '**Lies** die Aussage von Herrn Oswald.', title: 'M15 Akte 4: Die Aussage des Musiklehrers', blocks: [
        'Herr Oswald erinnert sich:',
        { box: 'zitat', md: '„Ich weiß noch genau, **dass Tom mich am Freitag nach dem Schlüssel fürs Lehrerzimmer gefragt hat**. **Wozu er ihn brauchte**, hat er nicht gesagt. **Dass der Pokal jetzt fehlt**, wundert mich sehr.“' },
        'Die Kommissarin stutzt. Diese Nebensätze antworten nicht auf *wann?* oder *warum?*. Was machen sie dann im Satz?',
      ] },
      { t: 'page', nr: '29', text: '**Lies** dir die Erklärung durch.', title: 'M16 Nebensätze als Subjekt oder Objekt', blocks: [
        'Nebensätze können nicht nur Adverbiale sein. Sie können auch die Aufgabe des **Subjekts** oder eines **Objekts** übernehmen. Alle diese Nebensätze heißen **Gliedsätze**, weil sie ein Satzglied sind.',
        '**Subjektsatz:** *Dass der Pokal fehlt, wundert Herrn Oswald.*\n- Frage: *Wer oder was wundert Herrn Oswald?* → *Dass der Pokal fehlt.*\n- Ersatzprobe: ***Das** wundert Herrn Oswald.* – *Das* ist hier das Subjekt.',
        '**Objektsatz:** *Herr Oswald weiß, dass Tom nach dem Schlüssel gefragt hat.*\n- Frage: *Wen oder was weiß Herr Oswald?* → *dass Tom nach dem Schlüssel gefragt hat.*\n- Ersatzprobe: *Herr Oswald weiß **das**.* – *Das* ist hier das Objekt.',
        'Auch Nebensätze mit *ob* oder einem Fragewort sind oft Objektsätze: *Die Kommissarin fragt, **ob** Tom einen Schlüssel hatte.*',
        '**So unterscheidest du sie vom Adverbialsatz:**\n- **Weglassprobe:** Einen Adverbialsatz kannst du meistens weglassen: *Mia lachte, als sie das Foto sah.* → *Mia lachte.* ✔\n- Einen Subjekt- oder Objektsatz kannst du nicht weglassen: *Herr Oswald weiß, dass Tom gefragt hat.* → *Herr Oswald weiß.* ✘ Der Satz ist unvollständig.\n- **Frage:** *Wer? Wen? Was?* → Subjekt- oder Objektsatz. *Wo? Wann? Warum? Wie? Wodurch? Wozu?* → Adverbialsatz.',
        { anim: 'weglassen', beispiele: [{ haupt: 'Mia lachte', ns: ', als sie das Foto sah', ok: true }, { haupt: 'Herr Oswald weiß', ns: ', dass Tom gefragt hat', ok: false }] },
      ] },
      { t: 'task', nr: '30', text: '**Bestimme**, ob der markierte Nebensatz ein Adverbialsatz, ein Subjektsatz oder ein Objektsatz ist.', lz: 'LZ4', items: [
        I.glied('m5.30.1', 'Tom erzählt, **dass er den Pokal mitgenommen hat**.', 'Objektsatz', { fb: 'Wen oder was erzählt Tom?' }),
        I.glied('m5.30.2', '**Dass Tom den Pokal hat**, überrascht alle.', 'Subjektsatz', { fb: 'Wer oder was überrascht alle?' }),
        I.glied('m5.30.3', 'Tom nahm den Pokal mit, **weil die Gravur fehlte**.', 'Adverbialsatz', { fb: 'kausal: Warum nahm Tom den Pokal mit?' }),
        I.glied('m5.30.4', 'Die Kommissarin fragt, **ob Tom einen Schlüssel hatte**.', 'Objektsatz'),
        I.glied('m5.30.5', '**Wer den Pokal gesehen hat**, soll sich melden.', 'Subjektsatz', { fb: 'Wer soll sich melden?' }),
        I.glied('m5.30.6', '**Als Tom zurückkam**, war das Fest schon vorbei.', 'Adverbialsatz', { fb: 'temporal: Wann war das Fest vorbei?' }),
        I.glied('m5.30.7', 'Herr Oswald glaubt, **dass Tom ehrlich ist**.', 'Objektsatz'),
        I.glied('m5.30.8', '**Dass niemand gefragt wurde**, war ein Fehler.', 'Subjektsatz'),
      ] },
      { t: 'task', nr: '31', text: '**Mach** die Weglassprobe. Die App zeigt dir den Satz ohne Nebensatz. **Entscheide**, ob der Rest vollständig ist, und **bestimme** dann den Gliedsatz.', lz: 'LZ4', items: [
        ['m5.31.1', 'Mia lachte, als sie das Foto sah.', 'Mia lachte.', 'vollständig', 'Adverbialsatz'],
        ['m5.31.2', 'Mia weiß, dass Tom den Pokal hat.', 'Mia weiß.', 'unvollständig', 'Objektsatz'],
        ['m5.31.3', 'Lina rannte weg, weil der Bus kam.', 'Lina rannte weg.', 'vollständig', 'Adverbialsatz'],
        ['m5.31.4', 'Dass der Pokal wieder da ist, freut alle.', '… freut alle.', 'unvollständig', 'Subjektsatz'],
      ].map(([id, s, ohne, v, g]) => I.sel(id, `*${s}*\n\nOhne Nebensatz: **${ohne}**`, [{ label: 'Rest', options: ['vollständig', 'unvollständig'], answer: v }, { label: 'Gliedsatz', options: LJ.GLIED, answer: g }], { errAll: 'F9' })) },
      { t: 'page', nr: null, title: 'Merken: Gliedsätze im Überblick', blocks: [
        { box: 'merken', title: 'Gliedsätze im Überblick', md: '**Gliedsätze** sind Nebensätze, die ein Satzglied sind.\n\n| Gliedsatz | Frage | Weglassen? | Beispiel |\n| --- | --- | --- | --- |\n| Subjektsatz | Wer oder was? | nein | ***Dass der Pokal fehlt**, wundert alle.* |\n| Objektsatz | Wen oder was? | nein | *Mia weiß, **dass Tom ihn hat**.* |\n| Adverbialsatz | Wo? Wann? Warum? Wie? Wodurch? Wozu? | meistens ja | *Lina ging, **weil der Bus kam**.* |\n\nSubjekt- und Objektsätze beginnen oft mit *dass*, *ob* oder einem Fragewort.' },
      ] },
      { t: 'self', ziele: ['Ich kann Subjekt- und Objektsätze erkennen.', 'Ich kann Adverbialsätze von Subjekt- und Objektsätzen unterscheiden.'] },
      { t: 'check', id: 'c4', nr: 'Check', text: '**Stopp!** Bearbeite die fünf Aufgaben ohne Lupe. Bestimme jeweils den markierten Nebensatz.', express: 4, ue: 3, lz: 'LZ4',
        A: [
          I.glied('m5.c4A.1', 'Lina sagt, **dass sie keine Tasche hatte**.', 'Objektsatz'),
          I.glied('m5.c4A.2', '**Weil es spät war**, ging Herr Brandt nach Hause.', 'Adverbialsatz'),
          I.glied('m5.c4A.3', '**Dass Mia so viele Fotos gemacht hat**, hilft der Kommissarin.', 'Subjektsatz'),
          I.glied('m5.c4A.4', 'Tom überlegt, **ob er alles erzählen soll**.', 'Objektsatz'),
          I.glied('m5.c4A.5', 'Mia wartete, **bis die Kommissarin kam**.', 'Adverbialsatz'),
        ],
        B: [
          I.glied('m5.c4B.1', '**Dass Tom einen Schlüssel hatte**, ist verdächtig.', 'Subjektsatz'),
          I.glied('m5.c4B.2', 'Die AG hofft, **dass der Pokal bald zurückkommt**.', 'Objektsatz'),
          I.glied('m5.c4B.3', 'Lina ging, **damit sie den Bus erwischt**.', 'Adverbialsatz'),
          I.glied('m5.c4B.4', 'Herr Oswald fragt sich, **wer die Tür offen gelassen hat**.', 'Objektsatz'),
          I.glied('m5.c4B.5', '**Nachdem Tom gegangen war**, kam Lina.', 'Adverbialsatz'),
        ],
        ueStep: { t: 'task', nr: 'Ü5', titel: 'Übungsrunde', text: '**Bestimme** den Gliedsatz. Die Lupe hilft dir.', lz: 'LZ4', items: [
          I.glied('m5.u5.1', 'Die Kommissarin vermutet, **dass Tom etwas weiß**.', 'Objektsatz'),
          I.glied('m5.u5.2', '**Wer zu spät kommt**, muss draußen warten.', 'Subjektsatz'),
          I.glied('m5.u5.3', 'Herr Brandt schloss ab, **nachdem alle gegangen waren**.', 'Adverbialsatz'),
          I.glied('m5.u5.4', 'Mia fragt, **ob sie die Fotos veröffentlichen darf**.', 'Objektsatz'),
          I.glied('m5.u5.5', '**Dass die Tür offen war**, fiel niemandem auf.', 'Subjektsatz'),
          I.glied('m5.u5.6', 'Tom lächelte, **weil alles gut ausging**.', 'Adverbialsatz'),
        ].map((it) => ({ ...it, hint: 'Lass den Nebensatz weg. Ist der Rest vollständig?' })) },
        zw: { titel: 'Zweiter Weg 4', steps: [
          { t: 'page', nr: 'Z12', text: '**Lies** dir den Das-Test durch.', title: 'M17 Der Das-Test', blocks: [
            'Ersetze den Nebensatz durch **das** oder durch eines der Ersatzwörter aus Akte 3 (*dort, dann, deshalb, so, dazu*).\n- Passt **das**, und es ist das Subjekt (*Das wundert alle.*) → **Subjektsatz**\n- Passt **das**, und es ist ein Objekt (*Mia weiß das.*) → **Objektsatz**\n- Passt **dort, dann, deshalb, so** oder **dazu** → **Adverbialsatz**',
            { anim: 'schritte', titel: 'Zwei Beispiele', schritte: ['*Mia weiß, dass Tom den Pokal hat.* → *Mia weiß **das**.* *Wen oder was weiß Mia?* → *das* → **Objektsatz**.', '*Lina ging, weil der Bus kam.* → *Lina ging **deshalb**.* → **Adverbialsatz**.'] },
          ] },
          { t: 'task', nr: 'Z13', text: '**Wähle** das passende Ersatzwort und **bestimme** dann den Gliedsatz.', lz: 'LZ4', items: [
            ['m5.z13.1', '*Dass der Pokal fehlt, ärgert Tom.*', ['das', 'deshalb'], 'das', 'Subjektsatz'],
            ['m5.z13.2', '*Herr Oswald glaubt, dass Lina ehrlich ist.*', ['das', 'dann'], 'das', 'Objektsatz'],
            ['m5.z13.3', '*Als die Glocke läutete, rannten alle los.*', ['das', 'dann'], 'dann', 'Adverbialsatz'],
            ['m5.z13.4', '*Die AG weiß, wer den Pokal hat.*', ['das', 'dort'], 'das', 'Objektsatz'],
            ['m5.z13.5', '*Tom kam, damit er helfen konnte.*', ['das', 'dazu'], 'dazu', 'Adverbialsatz'],
          ].map(([id, s, o, w, g]) => I.sel(id, s, [{ label: 'Ersatzwort', options: o, answer: w }, { label: 'Gliedsatz', options: LJ.GLIED, answer: g }])) },
        ] } },
      { t: 'clue', nr: 4, md: 'Tom ist der Kapitän der Fußball-AG. Er hat Herrn Oswald am Freitag nach dem Schlüssel fürs Lehrerzimmer gefragt. Wozu er ihn brauchte, ist noch unklar.' },
    ],
  });

  /* Prüfungen für selbst geschriebene Satzgefüge: subs = erlaubte Subjunktionen, verbs = mögliche finite Verben am Ende des Nebensatzes */
  LJ.modules.push({
    id: 'm6', nr: 'VI', akte: 5, kurz: 'Akte 5', titel: 'Aus kurz wird genau: umformen und schreiben',
    leitfrage: 'Wie kannst du Zusammenhänge mit Adverbialsätzen deutlich machen?',
    ziele: ['Präpositionalgruppen in Adverbialsätze **umformen** und umgekehrt.', '*um … zu* und *damit* richtig **verwenden**.', 'Sätze mit passenden Subjunktionen **verknüpfen** und einen Text damit **überarbeiten**.'],
    steps: [
      { t: 'repeat', nr: '32', n: 2, text: '**Bearbeite** die zwei Wiederholungskarten aus Akte 1–4.' },
      { t: 'page', nr: '33', text: '**Lies** dir die Erklärung durch. **Klicke** dich durch das Beispiel.', title: 'M18 Gleiche Information, andere Form', blocks: [
        'Du kannst dieselbe Information als **Präpositionalgruppe** oder als **Adverbialsatz** ausdrücken:\n- *Wegen des Regens blieben alle drinnen.* – kurz und sachlich\n- *Weil es regnete, blieben alle drinnen.* – genauer und lebendiger',
        '**So formst du um:**\n1. **Präposition → Subjunktion:** Wähle die passende Subjunktion (siehe Tabelle).\n2. **Nomen → Verb:** *der Regen → regnen*, *die Ankunft → ankommen*, *das Training → trainieren*.\n3. **Satz bauen:** Ergänze, wer etwas tut. Stell das finite Verb ans Ende. Setz das Komma.',
        { anim: 'schritte', titel: '*Wegen des Regens blieben alle drinnen.*', schritte: ['*wegen* → ***weil***', '*der Regen* → ***regnen***', 'Wer? → *es*; Verb ans Ende; Komma: ***Weil es regnete, blieben alle drinnen.***'] },
        '| Präposition | Subjunktion | Beispiel |\n| --- | --- | --- |\n| *wegen* | *weil, da* | *wegen des Regens → weil es regnete* |\n| *während* | *während* | *während des Spiels → während sie spielten* |\n| *nach* | *nachdem* | *nach dem Spiel → nachdem sie gespielt hatten* |\n| *vor* | *bevor* | *vor dem Fest → bevor das Fest begann* |\n| *seit* | *seit, seitdem* | *seit dem Umzug → seit sie umgezogen ist* |\n| *zu, für* | *damit* / *um … zu* | *zum Schutz → damit nichts passiert* |\n| *durch, mit* | *indem* | *durch genaues Fragen → indem sie genau fragte* |',
        { box: 'achtung', title: 'nachdem braucht die Vorvergangenheit', md: 'Was im Nebensatz mit *nachdem* passiert, ist **vorher** geschehen. Steht der Hauptsatz im Präteritum, steht der Nebensatz im Plusquamperfekt: *Nachdem sie **gespielt hatten**, feierten sie.*' },
        { box: 'tipp', title: 'um … zu oder damit?', md: '- **um … zu**, wenn beide Teile dasselbe Subjekt haben: *Mia kam früher, **um** Fotos **zu** machen.* (Mia kommt, Mia macht Fotos.)\n- **damit**, wenn die Subjekte verschieden sind: *Mia kam früher, **damit** Tom Fotos machen konnte.* (Mia kommt, Tom macht Fotos.)\n- *damit* geht auch bei gleichem Subjekt: *Mia kam früher, damit sie Fotos machen konnte.*' },
      ] },
      { t: 'task', nr: '34', text: '**Wähle** die richtige Umformung. Nur eine ist ganz richtig.', lz: 'LZ6', items: [
        I.ch('m6.34.1', '*Wegen des Gewitters fiel das Spiel aus.*', ['Weil es gewitterte, fiel das Spiel aus.', 'Weil es gewitterte fiel das Spiel aus.', 'Weil gewitterte es, fiel das Spiel aus.'], 'Weil es gewitterte, fiel das Spiel aus.', { err: { 'Weil es gewitterte fiel das Spiel aus.': 'F6', 'Weil gewitterte es, fiel das Spiel aus.': 'VERB' } }),
        I.ch('m6.34.2', '*Nach der Siegerehrung gingen alle nach Hause.*', ['Nachdem die Siegerehrung war vorbei, gingen alle nach Hause.', 'Nachdem die Siegerehrung vorbei war, gingen alle nach Hause.', 'Bevor die Siegerehrung vorbei war, gingen alle nach Hause.'], 'Nachdem die Siegerehrung vorbei war, gingen alle nach Hause.', { err: { 'Nachdem die Siegerehrung war vorbei, gingen alle nach Hause.': 'VERB' } }),
        I.ch('m6.34.3', '*Zur Aufklärung des Falls befragte die Kommissarin alle Zeugen.*', ['Um den Fall aufklären, befragte die Kommissarin alle Zeugen.', 'Weil sie den Fall aufklärte, befragte die Kommissarin alle Zeugen.', 'Um den Fall aufzuklären, befragte die Kommissarin alle Zeugen.'], 'Um den Fall aufzuklären, befragte die Kommissarin alle Zeugen.', { err: { 'Um den Fall aufklären, befragte die Kommissarin alle Zeugen.': 'ZU', 'Weil sie den Fall aufklärte, befragte die Kommissarin alle Zeugen.': 'F2' } }),
        I.ch('m6.34.4', '*Während des Konzerts verließ Lina den Raum.*', ['Während das Konzert lief, verließ Lina den Raum.', 'Während das Konzert lief verließ Lina den Raum.', 'Während lief das Konzert, verließ Lina den Raum.'], 'Während das Konzert lief, verließ Lina den Raum.', { err: { 'Während das Konzert lief verließ Lina den Raum.': 'F6', 'Während lief das Konzert, verließ Lina den Raum.': 'VERB' } }),
        I.ch('m6.34.5', '*Durch genaues Fragen fand die Kommissarin die Lösung.*', ['Damit sie genau fragte, fand die Kommissarin die Lösung.', 'Indem sie genau fragte, fand die Kommissarin die Lösung.', 'Indem sie fragte genau, fand die Kommissarin die Lösung.'], 'Indem sie genau fragte, fand die Kommissarin die Lösung.', { err: { 'Indem sie fragte genau, fand die Kommissarin die Lösung.': 'VERB' } }),
      ] },
      { t: 'task', nr: '35', text: '**Forme** die Präpositionalgruppe in einen Adverbialsatz um. **Schreibe** den ganzen Satz in das Textfeld. Der Satzanfang hilft dir.', lz: 'LZ6', items: [
        I.text('m6.35.1', '*Wegen der Hitze öffnete Herr Brandt die Fenster.* → *Weil …*', ['Weil es heiß war, öffnete Herr Brandt die Fenster.', 'Da es heiß war, öffnete Herr Brandt die Fenster.', 'Weil es so heiß war, öffnete Herr Brandt die Fenster.'], { subs: ['weil', 'da'], verbs: ['war'], vorfeldVerb: 'öffnete' }),
        I.text('m6.35.2', '*Vor dem Spiel wärmte sich die AG auf.* → *Bevor …*', ['Bevor das Spiel begann, wärmte sich die AG auf.', 'Bevor das Spiel anfing, wärmte sich die AG auf.', 'Bevor das Spiel losging, wärmte sich die AG auf.', 'Bevor sie spielte, wärmte sich die AG auf.'], { subs: ['bevor'], verbs: ['begann', 'anfing', 'losging', 'spielte', 'spielten'], vorfeldVerb: 'wärmte' }),
        I.text('m6.35.3', '*Nach dem Konzert räumte der Chor auf.* → *Nachdem …*', ['Nachdem das Konzert vorbei war, räumte der Chor auf.', 'Nachdem das Konzert zu Ende war, räumte der Chor auf.', 'Nachdem der Chor gesungen hatte, räumte er auf.'], { subs: ['nachdem'], verbs: ['war', 'hatte', 'hatten'], vorfeldVerb: 'räumte' }),
      ] },
      { t: 'task', nr: '36', text: '**Forme** den Adverbialsatz in eine Präpositionalgruppe um. **Wähle** die passende Lösung.', lz: 'LZ6', items: [
        I.ch('m6.36.1', '*Weil es stark regnete, blieb die Tür zu.*', ['Wegen des starken Regens blieb die Tür zu.', 'Mit starkem Regen blieb die Tür zu.'], 'Wegen des starken Regens blieb die Tür zu.'),
        I.ch('m6.36.2', '*Als das Fest begann, war der Pokal noch da.*', ['Zu Beginn des Festes war der Pokal noch da.', 'Wegen des Festes war der Pokal noch da.'], 'Zu Beginn des Festes war der Pokal noch da.'),
        I.ch('m6.36.3', '*Damit die Fotos gelingen, braucht Mia gutes Licht.*', ['Für gute Fotos braucht Mia gutes Licht.', 'Nach guten Fotos braucht Mia gutes Licht.'], 'Für gute Fotos braucht Mia gutes Licht.'),
      ] },
      { t: 'task', nr: '37', text: '**Entscheide**: *um … zu* oder *damit*?', lz: 'LZ6', items: [
        UZ('m6.37.1', 'Tom ging zur Werkstatt, ___ den Pokal gravieren zu lassen.', 'um … zu'),
        UZ('m6.37.2', 'Tom ging zur Werkstatt, ___ der Name eingraviert wird.', 'damit'),
        UZ('m6.37.3', 'Mia beeilte sich, ___ das Foto noch zu machen.', 'um … zu'),
        UZ('m6.37.4', 'Herr Brandt lässt das Licht an, ___ niemand stolpert.', 'damit'),
        UZ('m6.37.5', 'Lina ruft an, ___ ihre Mutter Bescheid weiß.', 'damit'),
      ] },
      { t: 'task', nr: '38', text: '**Verbinde** die beiden Hauptsätze zu einem Satzgefüge. **Wähle** zuerst die Subjunktion mit der angegebenen Funktion. **Schreibe** dann den ganzen Satz in das Textfeld.', lz: 'LZ7', items: [
        I.ch('m6.38.1a', '*Tom war nervös. Er hatte den Pokal ohne Erlaubnis mitgenommen.* *(kausal)*', ['weil', 'damit', 'bis'], 'weil'),
        I.text('m6.38.1b', '*Tom war nervös. Er hatte den Pokal ohne Erlaubnis mitgenommen.* *(kausal)*', ['Tom war nervös, weil er den Pokal ohne Erlaubnis mitgenommen hatte.', 'Weil Tom den Pokal ohne Erlaubnis mitgenommen hatte, war er nervös.', 'Tom war nervös, da er den Pokal ohne Erlaubnis mitgenommen hatte.'], { subs: ['weil', 'da'], verbs: ['hatte'] }),
        I.ch('m6.38.2a', '*Die Kommissarin fand die Lösung. Sie verglich alle Aussagen.* *(modal)*', ['indem', 'weil', 'als'], 'indem'),
        I.text('m6.38.2b', '*Die Kommissarin fand die Lösung. Sie verglich alle Aussagen.* *(modal)*', ['Die Kommissarin fand die Lösung, indem sie alle Aussagen verglich.', 'Indem die Kommissarin alle Aussagen verglich, fand sie die Lösung.'], { subs: ['indem'], verbs: ['verglich'] }),
        I.ch('m6.38.3a', '*Tom brachte den Pokal zur Werkstatt. Der Name der Siegermannschaft sollte eingraviert werden.* *(final)*', ['damit', 'weil', 'nachdem'], 'damit', { err: { weil: 'F2' } }),
        I.text('m6.38.3b', '*Tom brachte den Pokal zur Werkstatt. Der Name der Siegermannschaft sollte eingraviert werden.* *(final)*', ['Tom brachte den Pokal zur Werkstatt, damit der Name der Siegermannschaft eingraviert wurde.', 'Tom brachte den Pokal zur Werkstatt, damit der Name der Siegermannschaft eingraviert wird.', 'Tom brachte den Pokal zur Werkstatt, damit der Name der Siegermannschaft eingraviert werden konnte.'], { subs: ['damit'], verbs: ['wurde', 'wird', 'konnte', 'kann'] }),
        I.ch('m6.38.4a', '*Die AG feierte. Der Pokal war wieder da.* *(temporal)*', ['als', 'weil', 'damit'], 'als', { err: { weil: 'F10' } }),
        I.text('m6.38.4b', '*Die AG feierte. Der Pokal war wieder da.* *(temporal)*', ['Die AG feierte, als der Pokal wieder da war.', 'Als der Pokal wieder da war, feierte die AG.', 'Nachdem der Pokal wieder da war, feierte die AG.', 'Die AG feierte, nachdem der Pokal wieder da war.'], { subs: ['als', 'nachdem', 'sobald'], verbs: ['war'] }),
      ] },
      { t: 'page', nr: '39', text: '**Lies** den Ermittlungsbericht. Er besteht nur aus Hauptsätzen und klingt deshalb holprig.', title: 'M19 Der holprige Ermittlungsbericht', blocks: [
        { box: 'zitat', md: 'Am Freitag fand das Schulfest statt. Der Pokal stand im Lehrerzimmer. Um 17 Uhr schloss Herr Brandt die Turnhalle ab. Er bekam einen Anruf. Er ging ins Büro. Lina brachte Herrn Oswald Noten. Sie musste den Bus erreichen. Sie ging schnell wieder. Tom holte um 17:20 Uhr den Pokal. Der Name der Siegermannschaft sollte eingraviert werden. Er hatte niemandem Bescheid gesagt. Alle suchten den Pokal.' },
      ] },
      { t: 'task', nr: '40', text: '**Überarbeite** den Bericht im Textfeld. **Verbinde** dazu an mindestens vier Stellen zwei Sätze mit einem Adverbialsatz. **Verwende** mindestens drei verschiedene Funktionen. **Achte** auf die Kommas.', lz: 'LZ7', items: [
        I.open('m6.40.1', '', { vorlage: 'Am Freitag fand das Schulfest statt. Der Pokal stand im Lehrerzimmer. Um 17 Uhr schloss Herr Brandt die Turnhalle ab. Er bekam einen Anruf. Er ging ins Büro. Lina brachte Herrn Oswald Noten. Sie musste den Bus erreichen. Sie ging schnell wieder. Tom holte um 17:20 Uhr den Pokal. Der Name der Siegermannschaft sollte eingraviert werden. Er hatte niemandem Bescheid gesagt. Alle suchten den Pokal.', gross: true, hint: 'Gute Satzpaare: „Er bekam einen Anruf. / Er ging ins Büro.“ · „Sie musste den Bus erreichen. / Sie ging schnell wieder.“ · „Tom holte den Pokal. / Der Name sollte eingraviert werden.“ · „Er hatte niemandem Bescheid gesagt. / Alle suchten den Pokal.“', lupeGratis: true,
          checkliste: ['Ich habe mindestens vier Adverbialsätze verwendet.', 'Ich habe mindestens drei verschiedene Funktionen verwendet (z. B. temporal, kausal, final).', 'In jedem Nebensatz steht das finite Verb am Ende.', 'Zwischen Hauptsatz und Nebensatz steht immer ein Komma.', 'Nicht jeder Satz beginnt gleich.'],
          beispiel: 'Am Freitag fand das Schulfest statt. Der Pokal stand im Lehrerzimmer. Nachdem Herr Brandt um 17 Uhr die Turnhalle abgeschlossen hatte, ging er ins Büro, weil er einen Anruf bekam. Lina brachte Herrn Oswald Noten. Da sie den Bus erreichen musste, ging sie schnell wieder. Um 17:20 Uhr holte Tom den Pokal, damit der Name der Siegermannschaft eingraviert wurde. Weil er niemandem Bescheid gesagt hatte, suchten alle den Pokal.', zaehlen: true }),
      ] },
      { t: 'page', nr: null, title: 'Merken: Umformen', blocks: [
        { box: 'merken', title: 'Umformen', md: '- **Präpositionalgruppe → Adverbialsatz:** Präposition durch Subjunktion ersetzen, Nomen zum Verb machen, Subjekt ergänzen, finites Verb ans Ende, Komma setzen: *wegen des Regens → weil es regnete*.\n- **um … zu** bei gleichem Subjekt, **damit** bei verschiedenem Subjekt.\n- Mit Adverbialsätzen machst du Zusammenhänge deutlich: Zeit, Grund, Art und Weise, Zweck.' },
      ] },
      { t: 'self', ziele: ['Ich kann Präpositionalgruppen in Adverbialsätze umformen und umgekehrt.', 'Ich kann *um … zu* und *damit* richtig verwenden.', 'Ich kann Sätze mit passenden Subjunktionen verknüpfen und einen Text damit überarbeiten.'] },
      { t: 'check', id: 'c5', nr: 'Check', text: '**Stopp!** Bearbeite die fünf Aufgaben ohne Lupe.', express: 4, ue: 3, lz: 'LZ6',
        A: [
          I.ch('m6.c5A.1', '**Wähle** die richtige Umformung: *Wegen der Kälte trug Lina eine Mütze.*', ['Weil es kalt war, trug Lina eine Mütze.', 'Weil es kalt war trug Lina eine Mütze.', 'Damit es kalt war, trug Lina eine Mütze.'], 'Weil es kalt war, trug Lina eine Mütze.', { err: { 'Weil es kalt war trug Lina eine Mütze.': 'F6', 'Damit es kalt war, trug Lina eine Mütze.': 'F2' } }),
          I.ch('m6.c5A.2', '**Wähle** die richtige Umformung: *Vor der Siegerehrung putzte Tom den Pokal.*', ['Bevor die Siegerehrung begann, putzte Tom den Pokal.', 'Nachdem die Siegerehrung begann, putzte Tom den Pokal.', 'Bevor begann die Siegerehrung, putzte Tom den Pokal.'], 'Bevor die Siegerehrung begann, putzte Tom den Pokal.', { err: { 'Bevor begann die Siegerehrung, putzte Tom den Pokal.': 'VERB' } }),
          UZ('m6.c5A.3', '*um … zu* oder *damit*? Mia fragt nach, ___ sie alles richtig versteht.', 'damit', { hint: undefined }),
          I.ch('m6.c5A.4', '**Wähle** die passende Subjunktion *(kausal)*: *Herr Brandt war müde. Er hatte lange gearbeitet.*', ['weil', 'damit', 'bis'], 'weil', { err: { damit: 'F2' }, lz: 'LZ7' }),
          I.comma('m6.c5A.5', 'Tom hat, nachdem er den Pokal geholt hatte, die Werkstatt angerufen.', { lz: 'LZ5' }),
        ],
        B: [
          I.ch('m6.c5B.1', '**Wähle** die richtige Umformung: *Nach dem Training duschte die AG.*', ['Nachdem sie trainiert hatte, duschte die AG.', 'Nachdem sie hatte trainiert, duschte die AG.', 'Bevor sie trainiert hatte, duschte die AG.'], 'Nachdem sie trainiert hatte, duschte die AG.', { err: { 'Nachdem sie hatte trainiert, duschte die AG.': 'VERB' } }),
          I.ch('m6.c5B.2', '**Wähle** die richtige Umformung: *Durch lautes Rufen weckte Mia alle auf.*', ['Indem Mia laut rief, weckte sie alle auf.', 'Weil Mia laut rief weckte sie alle auf.', 'Damit Mia laut rief, weckte sie alle auf.'], 'Indem Mia laut rief, weckte sie alle auf.', { err: { 'Weil Mia laut rief weckte sie alle auf.': 'F6' } }),
          UZ('m6.c5B.3', '*um … zu* oder *damit*? Herr Oswald spielt leise, ___ alle zuhören können.', 'damit', { hint: undefined }),
          I.ch('m6.c5B.4', '**Wähle** die passende Subjunktion *(final)*: *Lina schrieb sich die Zeit auf. Sie wollte sie nicht vergessen.*', ['damit', 'weil', 'als'], 'damit', { err: { weil: 'F2' }, lz: 'LZ7' }),
          I.comma('m6.c5B.5', 'Weil die Tür offen war, ging Tom hinein.', { lz: 'LZ5' }),
        ],
        ueStep: { t: 'task', nr: 'Ü6', titel: 'Übungsrunde', text: '**Bearbeite** die sechs Übungen. Die Lupe hilft dir.', lz: 'LZ6', items: [
          I.ch('m6.u6.1', '**Wähle** die passende Subjunktion zu *wegen*.', ['weil', 'bevor', 'indem'], 'weil', { hint: '*wegen* nennt einen Grund.' }),
          I.ch('m6.u6.2', '**Wähle** die passende Subjunktion zu *nach*.', ['nachdem', 'damit', 'seit'], 'nachdem', { hint: '*nach* sagt: Das ist vorher passiert.' }),
          I.ch('m6.u6.3', '**Wähle** das passende Verb zum Nomen *die Ankunft*.', ['ankommen', 'anrufen', 'aufräumen'], 'ankommen', { hint: 'Wer ankommt, hat eine …' }),
          I.ch('m6.u6.4', '**Wähle** die richtige Umformung: *Während der Pause spielte Tom Fußball.*', ['Während die Pause dauerte spielte Tom Fußball.', 'Während dauerte die Pause, spielte Tom Fußball.', 'Während die Pause dauerte, spielte Tom Fußball.'], 'Während die Pause dauerte, spielte Tom Fußball.', { err: { 'Während die Pause dauerte spielte Tom Fußball.': 'F6', 'Während dauerte die Pause, spielte Tom Fußball.': 'VERB' }, hint: 'Verb am Ende und Komma!' }),
          UZ('m6.u6.5', 'Tom rennt, ___ den Bus zu erwischen.', 'um … zu'),
          UZ('m6.u6.6', 'Mia winkt, ___ Lina sie sieht.', 'damit'),
        ] },
        zw: { titel: 'Zweiter Weg 5', steps: [
          { t: 'page', nr: 'Z14', text: '**Sieh** dir an, wie die Kommissarin Schritt für Schritt umformt.', title: 'M20 Umformen in drei Schritten – Schritt für Schritt', blocks: [
            '**Ausgangssatz:** *Wegen der Kälte trug Lina eine Mütze.*',
            { anim: 'schritte', titel: 'Klicke dich durch die drei Schritte.', schritte: ['**Präposition → Subjunktion:** *wegen* → ***weil***', '**Nomen → Verb oder Adjektiv:** *die Kälte* → ***kalt sein***', '**Satz bauen:** Wer oder was? → *es*. Finites Verb ans Ende → *weil es kalt **war***. Komma setzen.', '**Ergebnis:** ***Weil es kalt war, trug Lina eine Mütze.***'] },
          ] },
          { t: 'task', nr: 'Z15', text: '**Ordne** jedem Nomen das passende Verb oder Adjektiv zu.', lz: 'LZ6', items: [
            I.sel('m6.z15.1', 'Nomen → Verb oder Adjektiv', [['das Training', 'trainieren'], ['die Hitze', 'heiß sein'], ['der Anruf', 'anrufen'], ['das Ende', 'enden'], ['die Angst', 'Angst haben'], ['der Beginn', 'beginnen']].map(([n, v]) => ({ label: n, options: ['anrufen', 'trainieren', 'enden', 'Angst haben', 'heiß sein', 'beginnen'], answer: v }))),
          ] },
          { t: 'task', nr: 'Z16', text: '**Forme** um. **Baue** den Adverbialsatz aus den Bausteinen.', lz: 'LZ6', items: [
            I.order('m6.z16.1', '*Wegen der Hitze blieben alle im Schatten.*', ['Weil', 'es', 'heiß', 'war,', 'blieben alle im Schatten.'], [['Weil', 'es', 'heiß', 'war,', 'blieben alle im Schatten.']]),
            I.order('m6.z16.2', '*Nach dem Anruf ging Herr Brandt ins Büro.*', ['Nachdem', 'ihn', 'jemand', 'angerufen', 'hatte,', 'ging Herr Brandt ins Büro.'], [['Nachdem', 'ihn', 'jemand', 'angerufen', 'hatte,', 'ging Herr Brandt ins Büro.'], ['Nachdem', 'jemand', 'ihn', 'angerufen', 'hatte,', 'ging Herr Brandt ins Büro.']]),
            I.order('m6.z16.3', '*Vor dem Beginn des Spiels sangen die Fans.*', ['Bevor', 'das Spiel', 'begann,', 'sangen die Fans.'], [['Bevor', 'das Spiel', 'begann,', 'sangen die Fans.']]),
          ] },
        ] } },
      { t: 'clue', nr: 5, md: 'In der Werkstatt am Marktplatz liegt eine Nachricht von Tom. Darauf steht: „Ich habe den Pokal geholt, damit der Name rechtzeitig eingraviert wird.“' },
    ],
  });
})();
