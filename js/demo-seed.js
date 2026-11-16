/* Beispielklasse für den Demo-Modus (erfundene Fortschritte, keine echten Daten) */
window.DEMO_SEED = function (classId, uuid) {
  const tage = (min) => new Date(Date.now() - min * 60000).toISOString();
  const leer = () => { const mod = {}; LJ.modules.forEach((m, i) => (mod[m.id] = { st: i === 0 ? 'active' : 'locked', step: 0, item: 0, sub: null, checks: {}, rep: {} })); return { v: 1, ts: Date.now(), mod, ans: {}, pts: 0, lupe: {}, self: {}, clues: [], badges: [], pt: null, profil: {}, profi: {}, fertig: false, streak: 0 }; };
  // Profil: wie weit, Check-Ergebnisse je Modul [A, B?, Weg]
  const profile = [
    { code: 'LUCHS-4821', bis: 5, checks: { start: [8], c1: [5], c2: [4], c3a: [5], c3b: [4], c4: [5], c5: [4] }, akt: 6, min: 3, pt: 18 },
    { code: 'OTTER-2290', bis: 3, checks: { start: [7], c1: [3, 5], c2: [4], c3a: [4] }, akt: 3, step: 12, min: 1 },
    { code: 'FALKE-7314', bis: 2, checks: { start: [5], c1: [2, 2], c2: [3, 3] }, akt: 3, step: 4, min: 2, streak: 3 },
    { code: 'IGEL-5508', bis: 4, checks: { start: [8], c1: [4], c2: [5], c3a: [3, 4], c3b: [4], c4: [4] }, akt: 5, step: 2, min: 25 },
    { code: 'ROBBE-1147', bis: 1, checks: { start: [6], c1: [4] }, akt: 2, step: 3, min: 6 },
    { code: 'PANDA-6603', bis: 0, checks: { start: [4] }, akt: 1, step: 2, min: 50 },
  ];
  const wegVon = (a, ex, ue) => (a >= ex ? 'express' : ue != null && a >= ue ? 'ue' : 'zw');
  const fehlerPool = ['F2', 'F6', 'F1', 'F11', 'F10', 'VERB', 'F4', 'F9'];
  return profile.map((p, pi) => {
    const s = leer(); const id = uuid();
    LJ.modules.forEach((m, i) => {
      const ms = s.mod[m.id];
      if (i <= p.bis) ms.st = 'done'; else if (i === p.akt) { ms.st = 'active'; ms.step = p.step || 0; } else ms.st = 'locked';
      m.steps.filter((x) => x.t === 'check').forEach((c) => {
        const r = p.checks[c.id]; if (!r) return;
        const path = c.id === 'start' ? (r[0] >= c.express ? 'express' : 'zw') : wegVon(r[0], c.express, c.ue);
        ms.checks[c.id] = { phase: 'done', A: r[0], B: r[1] ?? null, path, help: r[1] != null && r[1] < (c.ue || c.express) };
      });
      if (ms.st === 'done' && m.akte) { s.badges.push(m.id); s.clues.push(m.akte); }
    });
    s.pts = 120 * (p.bis + 1) + pi * 13; s.streak = p.streak || 0;
    if (p.pt != null) s.pt = { start: tage(40), a: {}, fertig: true, sum: p.pt, erg: [3, 4, 2, 3, 2, 2, 2], lz: { LZ1: [3, 3], LZ2: [6, 6], LZ3: [3, 3], LZ4: [2, 2], LZ5: [2, 2], LZ6: [1, 2], LZ7: [1, 2] } };
    const answers = [];
    for (let k = 0; k < 12 + pi * 3; k++) {
      const ok = (k + pi) % 3 !== 0;
      answers.push({ id: uuid(), student_id: id, item_id: ['m2.6.' + ((k % 10) + 1), 'm3.12.' + ((k % 8) + 1), 'm4.21.' + ((k % 6) + 1)][k % 3], value: null, correct: ok, attempt: ok ? 1 : 2, points: ok ? 10 : 0, err: ok ? null : fehlerPool[(k + pi) % fehlerPool.length], review: false, created_at: tage(p.min + 60 - k) });
    }
    if (pi === 0) answers.push({ id: uuid(), student_id: id, item_id: 'm6.40.1', value: 'Am Freitag fand das Schulfest statt. Nachdem Herr Brandt die Turnhalle abgeschlossen hatte, ging er ins Büro, weil er einen Anruf bekam. Da Lina den Bus erreichen musste, ging sie schnell wieder. Tom holte den Pokal, damit der Name eingraviert wurde.', correct: true, attempt: 1, points: 10, err: null, review: true, created_at: tage(30) });
    const test = pi === 0 ? { student_id: id, variant: 'A', started_at: tage(20), submitted_at: tage(2), manual: {}, answers: { 'tA.1': [0, 2, 3], 'tA.2a': 'instrumental', 'tA.2b': 'final', 'tA.2c': 'lokal', 'tA.2d': 'modal', 'tA.3a': 'Adverb', 'tA.3b': 'Nominalgruppe', 'tA.4a1': [0], 'tA.4a2': 'temporal', 'tA.4b1': [1], 'tA.4b2': 'kausal', 'tA.4c1': [1], 'tA.4c2': 'kausal', 'tA.5a': { gaps: [3] }, 'tA.5b': { gaps: [2, 6] }, 'tA.6a': 'Objektsatz', 'tA.6b': 'Subjektsatz', 'tA.7a': 'Nachdem wir gegessen haben, gingen wir in den Park.', 'tA.7b': 'Als die Klasse am Bahnhof ankam, war der Zug schon weg.' } } : null;
    return { student: { id, class_id: classId, code: p.code, test_variant: 'A', state: s, updated_at: tage(p.min) }, answers, test };
  });
};
