/* Detektei – Lernjob Adverbiale und Adverbialsätze (D7)
 * Inhalt aus der Obsidian-Notiz „D7 LJ Adverbialsätze“. Grundbausteine und Helfer. */
(function () {
  const LJ = (window.LJ = { modules: [], profi: [], meta: {} });

  LJ.meta = {
    titel: 'Der Fall des verschwundenen Pokals',
    untertitel: 'Adverbiale und Adverbialsätze',
    leitfrage: 'Wie geben Sätze Auskunft über Ort, Zeit, Grund, Art und Weise, Mittel und Zweck?',
  };

  const FUNKTIONEN = ['lokal', 'temporal', 'kausal', 'modal', 'instrumental', 'final'];
  const FRAGEN = ['Wo?', 'Wohin?', 'Woher?', 'Wann?', 'Wie lange?', 'Seit wann?', 'Warum?', 'Wie?', 'Womit?', 'Wozu?'];
  const FORMEN = ['Adverb', 'Adjektiv', 'Präpositionalgruppe', 'Nominalgruppe', 'Nebensatz'];
  const GLIED = ['Adverbialsatz', 'Subjektsatz', 'Objektsatz'];
  const FELDER = ['Vorfeld', 'linke Verbklammer', 'Mittelfeld', 'rechte Verbklammer', 'Nachfeld'];
  const KOMMAREGELN = ['Hauptsatz – Nebensatz', 'eingeschobener Nebensatz', 'Satzreihe mit denn/aber', 'kein Komma'];
  Object.assign(LJ, { FUNKTIONEN, FRAGEN, FORMEN, GLIED, FELDER, KOMMAREGELN });

  LJ.lernziele = {
    LZ1: 'Ich kann adverbiale Bestimmungen mit W-Fragen und der Weglassprobe erkennen.',
    LZ2: 'Ich kann Adverbiale nach ihrer Funktion und nach ihrer Form bestimmen.',
    LZ3: 'Ich kann Adverbialsätze als Nebensätze erkennen und ihre Subjunktion und Funktion bestimmen.',
    LZ4: 'Ich kann Adverbialsätze von Subjekt- und Objektsätzen unterscheiden.',
    LZ5: 'Ich kann Kommas zwischen Hauptsatz und Nebensatz richtig setzen und begründen.',
    LZ6: 'Ich kann Präpositionalgruppen in Adverbialsätze umformen und umgekehrt.',
    LZ7: 'Ich kann Sätze mit passenden Subjunktionen verknüpfen und einen Text damit überarbeiten.',
  };
  LJ.lernzielKurz = { LZ1: 'Adverbiale erkennen', LZ2: 'Funktion und Form bestimmen', LZ3: 'Adverbialsätze bestimmen', LZ4: 'Gliedsätze unterscheiden', LZ5: 'Kommas setzen', LZ6: 'Umformen', LZ7: 'Verknüpfen und schreiben' };

  /* Rückmeldungen bei typischen Fehlern (F1–F11) */
  LJ.fehler = {
    F1: 'Frag noch einmal genau. Passt *wen?*, *wem?* oder *was?* Dann ist es ein Objekt. Adverbiale antworten auf *wo?*, *wann?*, *warum?*, *wie?*, *womit?* oder *wozu?*.',
    F2: '*Warum?* fragt nach dem Grund. *Wozu?* fragt nach dem Ziel, also nach dem, was erreicht werden soll. *damit* und *um … zu* zeigen immer ein Ziel.',
    F3: 'Ein Satzglied bleibt beim Umstellen zusammen. Probier die Umstellprobe: Welche Wörter kannst du gemeinsam an den Satzanfang stellen?',
    F4: 'Schau, was danach kommt. Nur ein Nomen mit Begleitern? Dann ist es eine Präposition. Ein ganzer Satz mit dem Verb am Ende? Dann ist es eine Subjunktion.',
    F5: 'Wo steht das finite Verb im zweiten Satz? An zweiter Stelle → Konjunktion. Am Ende → Subjunktion.',
    F6: 'Zwischen Hauptsatz und Nebensatz steht immer ein Komma – auch wenn der Nebensatz vorne steht. Ein eingeschobener Nebensatz bekommt zwei Kommas.',
    F7: 'Vor *und* und *oder* steht hier kein Komma. Prüfe: Folgt wirklich ein Nebensatz mit dem Verb am Ende?',
    F8: 'Kannst du das Wort steigern (*schnell – schneller*) oder vor ein Nomen stellen (*der schnelle Läufer*)? Dann ist es ein Adjektiv.',
    F9: 'Lass den Nebensatz weg. Ist der Satz dann noch vollständig? Dann ist es ein Adverbialsatz.',
    F10: 'Frag den Hauptsatz: *Wann?* oder *Warum?* Ersetze den Nebensatz durch *dann* oder *deshalb*. Was passt?',
    F11: '*Wie?* fragt nach der Art und Weise (*schnell, sorgfältig*). *Womit?* oder *Wodurch?* fragt nach einem Mittel oder Werkzeug (*mit dem Schlüssel*).',
    VERB: 'Im Nebensatz steht das finite Verb am Ende.',
    VORFELD: 'Nach dem Adverbialsatz im Vorfeld kommt sofort das finite Verb.',
    ZU: 'Bei *um … zu* braucht der Infinitiv ein *zu*.',
  };

  LJ.funcErr = function (chosen, correct) {
    const s = new Set([chosen, correct]);
    if (s.has('kausal') && s.has('final')) return 'F2';
    if (s.has('modal') && s.has('instrumental')) return 'F11';
    if (s.has('temporal') && s.has('kausal')) return 'F10';
    return null;
  };

  /* Wörter eines Satzes als antippbare Einheiten: richtige Wörter in correct (Reihenfolge egal) */
  function woerter(satz, correct) {
    const rest = correct.slice();
    return satz.split(' ').map((w) => {
      const kern = w.replace(/[.,!?;:„“"]/g, '');
      const i = rest.indexOf(kern);
      if (i > -1) { rest.splice(i, 1); return `[${w}]`; }
      return `{${w}}`;
    }).join(' ');
  }

  /* Item-Fabrik. Gemeinsame Felder: id, lz, hint (Lupe), fb (Erklärung nach der Auflösung), err (Antwort → Fehlercode) */
  LJ.I = {
    tap: (id, prompt, s, o = {}) => ({ id, type: 'tap', prompt, s, ...o }),
    tapW: (id, prompt, satz, correct, o = {}) => ({ id, type: 'tap', prompt, s: woerter(satz, correct), ...o }),
    ch: (id, prompt, options, answer, o = {}) => ({ id, type: 'choice', prompt, options, answer, ...o }),
    fn: (id, satz, answer, o = {}) => ({ id, type: 'choice', prompt: satz, options: FUNKTIONEN, answer, errFn: 'func', ...o }),
    fq: (id, satz, frage, answer, o = {}) => ({ id, type: 'selects', prompt: satz, rows: [{ label: 'Frage', options: FRAGEN, answer: frage }, { label: 'Funktion', options: FUNKTIONEN, answer, errFn: 'func' }], ...o }),
    form: (id, satz, answer, o = {}) => ({ id, type: 'choice', prompt: satz, options: FORMEN, answer, err: answer === 'Adjektiv' ? { Adverb: 'F8' } : answer === 'Adverb' ? { Adjektiv: 'F8' } : {}, ...o }),
    glied: (id, satz, answer, o = {}) => ({ id, type: 'choice', prompt: satz, options: GLIED, answer, err: answer === 'Adverbialsatz' ? { Subjektsatz: 'F9', Objektsatz: 'F9' } : { Adverbialsatz: 'F9' }, ...o }),
    sel: (id, prompt, rows, o = {}) => ({ id, type: 'selects', prompt, rows, ...o }),
    comma: (id, target, o = {}) => ({ id, type: 'comma', target, ...o }),
    order: (id, prompt, tiles, accepted, o = {}) => ({ id, type: 'order', prompt, tiles, accepted, ...o }),
    text: (id, prompt, accepted, o = {}) => ({ id, type: 'text', prompt, accepted, ...o }),
    open: (id, prompt, o = {}) => ({ id, type: 'open', prompt, ...o }),
  };
  LJ.woerter = woerter;
})();
