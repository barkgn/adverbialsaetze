/* Lehrkraft-Bereich: Klassen, Codes, Fortschritt, Test */
(function () {
  const C = window.CORE; const { h } = C;
  const T = (window.TEACHER = {});
  let store, root, me;

  const namen = () => LS.get('detektei-namen', {});
  const setName = (code, n) => { const x = namen(); if (n) x[code] = n; else delete x[code]; LS.set('detektei-namen', x); };

  function kopf() {
    return h('header', { class: 'app-kopf lk' },
      h('div', { class: 'kopf-l' }, h('button', { class: 'logo-btn', onclick: () => T.zeigeStart() }, h('span', { class: 'logo-q' }), h('span', { class: 'logo-txt' }, 'Lehrkraft-Bereich'))),
      h('div', { class: 'kopf-r' }, me ? h('span', { class: 'pill dezent' }, me.name || me.email || '') : null, me && me.is_admin ? h('span', { class: 'pill' }, 'Admin') : null,
        me ? h('button', { class: 'btn text', onclick: async () => { await store.teacherSignOut(); location.hash = ''; location.reload(); } }, 'Abmelden') : null));
  }
  function seite(...kids) { root.innerHTML = ''; root.append(kopf(), h('main', { class: 'inhalt breit' }, ...kids)); window.scrollTo(0, 0); }
  function fehler(e) { C.info(e.message || String(e)); }

  T.start = async function (st, rt) {
    store = st; root = rt;
    try { me = await store.teacherSession(); } catch (e) { me = null; }
    if (!me) return zeigeLogin();
    if (me.pending) return zeigeEinladung();
    T.zeigeStart();
  };

  function zeigeLogin() {
    if (store.demo) {
      return seite(h('section', { class: 'karte schmal' }, h('h2', null, 'Lehrkraft-Bereich (Demo)'), h('p', null, 'Im Demo-Modus gibt es eine Demo-Lehrkraft mit einer Beispielklasse. Alle Daten bleiben nur in diesem Browser.'),
        h('button', { class: 'btn primaer', onclick: async () => { me = await store.teacherSignIn(); T.zeigeStart(); } }, 'Als Demo-Lehrkraft anmelden')));
    }
    const email = h('input', { type: 'email', autocomplete: 'username', required: true });
    const pw = h('input', { type: 'password', autocomplete: 'current-password', required: true });
    const msg = h('p', { class: 'schlecht' });
    seite(h('section', { class: 'karte schmal' }, h('h2', null, 'Anmelden'),
      h('form', { class: 'formular', onsubmit: async (e) => { e.preventDefault(); msg.textContent = ''; try { me = await store.teacherSignIn(email.value.trim(), pw.value); if (!me) throw new Error('Anmeldung fehlgeschlagen.'); if (me.pending) return zeigeEinladung(); T.zeigeStart(); } catch (er) { msg.textContent = er.message; } } },
        h('label', null, 'E-Mail', email), h('label', null, 'Passwort', pw), msg, h('button', { class: 'btn primaer', type: 'submit' }, 'Anmelden')),
      h('p', { class: 'dezent' }, 'Noch kein Konto? ', h('a', { href: '#', onclick: (e) => { e.preventDefault(); zeigeRegistrierung(); } }, 'Mit Einladungscode registrieren'))));
  }
  function zeigeRegistrierung() {
    const name = h('input', { type: 'text', placeholder: 'z. B. Frau Muster' }); const email = h('input', { type: 'email', required: true }); const pw = h('input', { type: 'password', required: true, minlength: 8 }); const inv = h('input', { type: 'text', placeholder: 'LK-XXXXXX' });
    const msg = h('p', { class: 'schlecht' });
    seite(h('section', { class: 'karte schmal' }, h('h2', null, 'Registrieren'),
      h('p', { class: 'dezent' }, 'Den Einladungscode bekommst du von der Kollegin oder dem Kollegen, die bzw. der die App eingerichtet hat. Nur die allererste Lehrkraft (Admin) lässt das Feld leer.'),
      h('form', { class: 'formular', onsubmit: async (e) => { e.preventDefault(); msg.textContent = ''; try { const r = await store.teacherSignUp(email.value.trim(), pw.value, name.value.trim(), inv.value.trim()); if (r && r.confirm) { seite(h('section', { class: 'karte schmal' }, h('h2', null, 'Fast geschafft'), h('p', null, 'Bitte bestätige deine E-Mail-Adresse über den Link in der Mail. Danach meldest du dich an und gibst den Einladungscode ein.'), h('button', { class: 'btn', onclick: zeigeLogin }, 'Zur Anmeldung'))); return; } me = r; if (me.pending) return zeigeEinladung(); T.zeigeStart(); } catch (er) { msg.textContent = er.message; } } },
        h('label', null, 'Name (wird nur Kolleginnen und Kollegen angezeigt)', name), h('label', null, 'E-Mail', email), h('label', null, 'Passwort (mind. 8 Zeichen)', pw), h('label', null, 'Einladungscode', inv), msg, h('button', { class: 'btn primaer', type: 'submit' }, 'Registrieren')),
      h('p', null, h('a', { href: '#', onclick: (e) => { e.preventDefault(); zeigeLogin(); } }, 'Zurück zur Anmeldung'))));
  }
  function zeigeEinladung() {
    const name = h('input', { type: 'text' }); const inv = h('input', { type: 'text', placeholder: 'LK-XXXXXX', required: true }); const msg = h('p', { class: 'schlecht' });
    seite(h('section', { class: 'karte schmal' }, h('h2', null, 'Einladungscode eingeben'), h('p', null, 'Dein Konto ist angelegt. Gib jetzt den Einladungscode ein, um Klassen anlegen zu können.'),
      h('form', { class: 'formular', onsubmit: async (e) => { e.preventDefault(); try { me = await store.redeemInvite(inv.value, name.value); T.zeigeStart(); } catch (er) { msg.textContent = er.message; } } }, h('label', null, 'Name', name), h('label', null, 'Einladungscode', inv), msg, h('button', { class: 'btn primaer', type: 'submit' }, 'Bestätigen'))));
  }

  /* ── Start: Klassen ── */
  T.zeigeStart = async function () {
    let klassen = [];
    try { klassen = await store.listClasses(); } catch (e) { return fehler(e); }
    const name = h('input', { type: 'text', placeholder: 'z. B. 7a', required: true });
    const anzahl = h('input', { type: 'number', min: 0, max: 40, value: 25 });
    const teile = [
      store.demo ? h('div', { class: 'box box-info' }, h('span', { class: 'box-label' }, 'Demo'), C.mdEl('Das ist der Demo-Modus: Alles bleibt in diesem Browser. Die Beispielklasse zeigt, wie Fortschritte aussehen. Mit dem Code **DEMO-0000** kannst du den Lernjob selbst ausprobieren.'), h('button', { class: 'btn klein', onclick: async () => { if (await C.frage('Alle Demo-Daten löschen und neu beginnen?')) { store.reset(); location.reload(); } } }, 'Demo zurücksetzen')) : null,
      h('section', { class: 'karte' }, h('h2', null, 'Meine Klassen'),
        klassen.length ? h('ul', { class: 'klassen' }, klassen.map((k) => h('li', null, h('button', { class: 'btn', onclick: () => T.zeigeKlasse(k) }, k.name), k.test_open ? h('span', { class: 'pill warn' }, 'Test offen') : null))) : h('p', { class: 'dezent' }, 'Noch keine Klasse angelegt.'),
        h('form', { class: 'formular reihe', onsubmit: async (e) => { e.preventDefault(); try { const k = await store.createClass(name.value.trim()); const n = +anzahl.value || 0; if (n) await store.createStudents(k.id, n); T.zeigeKlasse(k, 'codes'); } catch (er) { fehler(er); } } },
          h('label', null, 'Neue Klasse', name), h('label', null, 'Anzahl Codes', anzahl), h('button', { class: 'btn primaer', type: 'submit' }, 'Anlegen'))),
    ];
    if (me && me.is_admin) teile.push(await adminBereich());
    seite(...teile);
  };
  async function adminBereich() {
    const box = h('section', { class: 'karte' }, h('h2', null, 'Kolleginnen und Kollegen einladen'));
    try {
      const [inv, lk] = await Promise.all([store.listInvites(), store.listTeachers()]);
      box.append(h('p', null, 'Erzeuge für jede Kollegin und jeden Kollegen einen Einladungscode. Damit registrieren sie sich selbst und sehen nur ihre eigenen Klassen.'),
        h('button', { class: 'btn primaer', onclick: async () => { try { const c = await store.createInvite(); await C.info('Neuer Einladungscode: **' + c + '**'); T.zeigeStart(); } catch (e) { fehler(e); } } }, 'Einladungscode erzeugen'),
        inv.length ? h('table', { class: 'kt-tab' }, h('thead', null, h('tr', null, h('th', null, 'Code'), h('th', null, 'Status'))), h('tbody', null, inv.map((i) => h('tr', null, h('td', null, h('code', null, i.code)), h('td', null, i.used_by ? 'eingelöst' : 'offen'))))) : null,
        h('h3', null, 'Lehrkräfte'), h('ul', null, lk.map((t) => h('li', null, `${t.name || '–'} (${t.email || ''})${t.is_admin ? ' · Admin' : ''}`))));
    } catch (e) { box.append(h('p', { class: 'schlecht' }, e.message)); }
    return box;
  }

  /* ── Auswertung des Fortschritts ── */
  T.zusammenfassung = function (st) {
    const s = st || {}; const mods = s.mod || {};
    const zellen = LJ.modules.map((m) => {
      const ms = mods[m.id];
      if (!ms || ms.st === 'locked') return { cls: 'z-leer', txt: '', tip: 'noch nicht begonnen' };
      const checks = m.steps.filter((x) => x.t === 'check');
      const cs = checks.map((c) => ms.checks && ms.checks[c.id]).filter(Boolean);
      const hilfe = cs.some((c) => c.help);
      const scores = cs.map((c) => `${c.A ?? '–'}${c.B != null ? '→' + c.B : ''}`).join(' ');
      if (ms.st === 'active') return { cls: hilfe ? 'z-rot' : 'z-aktiv', txt: '…', tip: `in Arbeit (Schritt ${ms.step + 1}/${m.steps.length})${scores ? ' · Check ' + scores : ''}${ms.sub ? ' · ' + (ms.sub.kind === 'ue' ? 'Übungsrunde' : 'Zweiter Weg') : ''}` };
      const allExpress = cs.every((c) => c.path === 'express');
      return { cls: hilfe ? 'z-rot' : allExpress ? 'z-gruen' : 'z-gelb', txt: hilfe ? '!' : allExpress ? '✓' : '✓', tip: `abgeschlossen${scores ? ' · Check ' + scores : ''}${allExpress ? ' · Expressweg' : ''}` };
    });
    const hilfe = LJ.modules.some((m) => { const ms = mods[m.id]; return ms && Object.values(ms.checks || {}).some((c) => c.help); }) || (s.streak || 0) >= 3;
    return { zellen, pts: s.pts || 0, hilfe, streak: s.streak || 0, pt: s.pt && s.pt.fertig ? s.pt.sum : null, fertig: !!s.fertig };
  };

  /* ── Klasse ── */
  T.zeigeKlasse = async function (k, tab = 'uebersicht') {
    let schueler;
    try { schueler = await store.listStudents(k.id); } catch (e) { return fehler(e); }
    const tabs = h('nav', { class: 'tabs' }, [['uebersicht', 'Übersicht'], ['codes', 'Codes & Namen'], ['test', 'Test']].map(([id, l]) => h('button', { class: 'tab' + (tab === id ? ' an' : ''), onclick: () => T.zeigeKlasse(k, id) }, l)));
    const kopfK = h('div', { class: 'klassen-kopf' }, h('button', { class: 'btn text', onclick: () => T.zeigeStart() }, '← Klassen'), h('h2', null, k.name), h('button', { class: 'btn text', onclick: () => T.zeigeKlasse(k, tab) }, '↻ aktualisieren'));
    const inhalt = h('div');
    seite(kopfK, tabs, inhalt);
    if (tab === 'uebersicht') uebersicht(k, schueler, inhalt);
    if (tab === 'codes') codes(k, schueler, inhalt);
    if (tab === 'test') await testTab(k, schueler, inhalt);
  };

  function uebersicht(k, schueler, ziel) {
    const nm = namen();
    const rows = schueler.map((s) => { const z = T.zusammenfassung(s.state); return { s, z }; });
    const inaktiv = (s) => s.updated_at && (Date.now() - new Date(s.updated_at)) / 60000;
    const tab = h('table', { class: 'kt-tab matrix' },
      h('thead', null, h('tr', null, h('th', null, 'Code / Name'), LJ.modules.map((m) => h('th', { class: 'mitte', title: m.titel }, m.kurz)), h('th', { class: 'mitte' }, 'Probetest'), h('th', { class: 'mitte' }, 'Punkte'), h('th', null, 'Hinweis'), h('th', null, 'zuletzt'))),
      h('tbody', null, rows.map(({ s, z }) => h('tr', { class: 'klickbar', onclick: () => T.zeigeSchueler(k, s) },
        h('td', null, h('b', null, nm[s.code] || ''), h('div', { class: 'dezent mono' }, s.code)),
        z.zellen.map((c) => h('td', { class: 'mitte' }, h('span', { class: 'zelle ' + c.cls, title: c.tip }, c.txt))),
        h('td', { class: 'mitte' }, z.pt != null ? `${z.pt}/20` : '–'), h('td', { class: 'mitte' }, z.pts),
        h('td', null, z.hilfe ? h('span', { class: 'pill rot' }, 'braucht Hilfe') : null, z.streak >= 3 ? h('span', { class: 'pill warn' }, `${z.streak}× falsch in Folge`) : null),
        h('td', { class: 'dezent' }, C.zeitSeit(s.updated_at))))));
    const legende = h('p', { class: 'legende' }, h('span', { class: 'zelle z-gruen' }, '✓'), ' Expressweg ', h('span', { class: 'zelle z-gelb' }, '✓'), ' mit Übungsrunde / Zweitem Weg ', h('span', { class: 'zelle z-aktiv' }, '…'), ' in Arbeit ', h('span', { class: 'zelle z-rot' }, '!'), ' braucht Hilfe (zweimal unter 3 im Check) ', h('span', { class: 'zelle z-leer' }, ''), ' noch nicht begonnen. Fahre mit der Maus über ein Feld für Details; klicke auf eine Zeile für die Einzelansicht.');
    ziel.append(schueler.length ? h('div', { class: 'tab-wrap' }, tab) : h('p', null, 'Noch keine Codes. Lege sie unter „Codes & Namen“ an.'), legende);
    if (!store.demo) setTimeout(() => { if (document.body.contains(tab)) T.zeigeKlasse(k, 'uebersicht'); }, 60000);
  }

  function codes(k, schueler, ziel) {
    const nm = namen();
    const n = h('input', { type: 'number', min: 1, max: 40, value: 1 });
    ziel.append(
      h('div', { class: 'box box-info' }, h('span', { class: 'box-label' }, 'Datenschutz'), C.mdEl('Auf dem Server liegen nur die Codes. Die Namen, die du hier einträgst, bleiben **nur in diesem Browser** (und auf den ausgedruckten Kärtchen). An einem anderen Gerät siehst du nur die Codes.')),
      h('div', { class: 'tab-wrap' }, h('table', { class: 'kt-tab' }, h('thead', null, h('tr', null, h('th', null, 'Code'), h('th', null, 'Name (nur lokal)'), h('th', null, ''))),
        h('tbody', null, schueler.map((s) => h('tr', null, h('td', { class: 'mono' }, s.code), h('td', null, h('input', { type: 'text', value: nm[s.code] || '', placeholder: 'Vorname N.', onchange: (e) => setName(s.code, e.target.value.trim()) })),
          h('td', null, h('button', { class: 'btn text', onclick: async () => { if (!await C.frage(`Code ${s.code} mit allen Daten löschen?`)) return; try { await store.deleteStudent(s.id); T.zeigeKlasse(k, 'codes'); } catch (e) { fehler(e); } } }, 'löschen'))))))),
      h('div', { class: 'aktionen' },
        h('button', { class: 'btn primaer', onclick: () => kaertchen(k, schueler) }, 'Code-Kärtchen drucken'),
        h('form', { class: 'formular reihe', onsubmit: async (e) => { e.preventDefault(); try { await store.createStudents(k.id, +n.value); T.zeigeKlasse(k, 'codes'); } catch (er) { fehler(er); } } }, h('label', null, 'Weitere Codes', n), h('button', { class: 'btn', type: 'submit' }, 'Hinzufügen')),
        h('button', { class: 'btn text', onclick: async () => { const nn = await C.eingabe('Neuer Name der Klasse:', k.name); if (nn) { await store.renameClass(k.id, nn); k.name = nn; T.zeigeKlasse(k, 'codes'); } } }, 'Klasse umbenennen'),
        h('button', { class: 'btn text gefahr', onclick: async () => { if (await C.frage(`Klasse ${k.name} mit allen Codes und Daten löschen?`)) { await store.deleteClass(k.id); T.zeigeStart(); } } }, 'Klasse löschen')));
  }
  function kaertchen(k, schueler) {
    const nm = namen(); const url = location.origin + location.pathname;
    root.innerHTML = '';
    root.append(h('div', { class: 'kaertchen-seite' }, h('div', { class: 'aktionen nodruck' }, h('button', { class: 'btn', onclick: () => T.zeigeKlasse(k, 'codes') }, '← Zurück'), h('button', { class: 'btn primaer', onclick: () => C.drucken() }, 'Drucken')),
      h('div', { class: 'kaertchen' }, schueler.map((s) => h('div', { class: 'kaertchen-k' }, h('p', { class: 'k-titel' }, 'Lernjob Adverbialsätze · Deutsch 7'), h('p', { class: 'k-name' }, nm[s.code] || ' '), h('p', { class: 'k-code' }, s.code), h('p', { class: 'k-url' }, url), h('p', { class: 'k-hilfe' }, 'Seite öffnen → „Ich bin Schülerin / Schüler“ → Code eingeben. Bewahre den Code gut auf.'))))));
  }

  /* ── Einzelansicht ── */
  T.zeigeSchueler = async function (k, s) {
    const nm = namen(); const st = s.state || {};
    let ans = [];
    try { ans = await store.getAnswers(s.id); } catch (e) { fehler(e); }
    const z = T.zusammenfassung(st);
    const fehlerZaehl = {}; ans.forEach((a) => { if (a.err && !a.correct) fehlerZaehl[a.err] = (fehlerZaehl[a.err] || 0) + 1; });
    const FK = { F1: 'Objekt statt Adverbial', F2: 'kausal ↔ final', F3: 'Satzglied unvollständig', F4: 'Präposition ↔ Subjunktion', F5: 'Konjunktion ↔ Subjunktion', F6: 'Komma fehlt', F7: 'Komma zu viel', F8: 'Adjektiv ↔ Adverb', F9: 'Adverbialsatz ↔ Subjekt-/Objektsatz', F10: 'temporal ↔ kausal', F11: 'modal ↔ instrumental', VERB: 'Verb nicht am Ende des Nebensatzes', VORFELD: 'Verb nach dem Vorfeld', ZU: 'zu fehlt bei um … zu' };
    const modTab = h('table', { class: 'kt-tab' }, h('thead', null, h('tr', null, h('th', null, 'Modul'), h('th', null, 'Status'), h('th', null, 'Checks (1. → 2. Versuch)'), h('th', null, 'Weg'))),
      h('tbody', null, LJ.modules.map((m) => { const ms = (st.mod || {})[m.id]; const cs = m.steps.filter((x) => x.t === 'check'); return h('tr', null, h('td', { html: `<b>${C.esc(m.kurz)}</b> ${C.inl(m.titel)}` }), h('td', null, !ms || ms.st === 'locked' ? '–' : ms.st === 'done' ? 'abgeschlossen' : `in Arbeit (Schritt ${ms.step + 1}/${m.steps.length})`),
        h('td', null, cs.map((c) => { const r = ms && ms.checks && ms.checks[c.id]; return r ? `${c.nr}: ${r.A ?? '–'}${r.B != null ? ' → ' + r.B : ''}  ` : ''; }).join('')),
        h('td', null, cs.map((c) => { const r = ms && ms.checks && ms.checks[c.id]; return r && r.path ? ({ express: 'Expressweg', ue: 'Übungsrunde', zw: 'Zweiter Weg' })[r.path] + (r.help ? ' · braucht Hilfe' : '') : ''; }).filter(Boolean).join(' / '))); })));
    const texte = ans.filter((a) => a.review && a.correct).map((a) => { const id = a.item_id.split(':').pop(); const it = STUDENT.INDEX[id]; return h('div', { class: 'offen-text' }, h('p', { class: 'dezent' }, `${id} · ${C.zeitSeit(a.created_at)}`), it && it.prompt ? C.mdEl(it.prompt, 'dezent') : null, h('p', null, typeof a.value === 'string' ? a.value : JSON.stringify(a.value))); });
    const verlauf = ans.filter((a) => a.item_id !== 'm7.probetest').slice(-150).reverse().map((a) => { const id = a.item_id.split(':').pop(); const it = STUDENT.INDEX[id]; return h('tr', { class: a.correct ? '' : 'falsch' }, h('td', { class: 'mono dezent' }, a.item_id), h('td', { html: it ? C.inl((it.prompt || '').split('\n').pop()).slice(0, 220) : '' }), h('td', { html: it ? C.inl(C.antwortText(it, a.value)) : '' }), h('td', { class: 'mitte' }, a.correct ? '✔' : '✘'), h('td', { class: 'mitte' }, a.attempt), h('td', null, a.err ? FK[a.err] || a.err : '')); });
    const selbst = Object.entries(st.self || {}).map(([key, w]) => { const [mid, idx] = key.split(':'); const m = LJ.modules.find((x) => x.id === mid); const step = m && m.steps[+idx]; if (!step) return null; return h('div', null, h('p', { class: 'dezent' }, m.kurz), h('ul', null, step.ziele.map((zz, i) => h('li', { html: `${C.inl(zz)} – <b>${['noch nicht', 'teilweise', 'sicher'][w[i]] || '–'}</b>` })))); });
    seite(h('div', { class: 'klassen-kopf' }, h('button', { class: 'btn text', onclick: () => T.zeigeKlasse(k) }, '← ' + k.name), h('h2', null, `${nm[s.code] || ''} ${s.code}`), h('span', { class: 'dezent' }, 'zuletzt aktiv: ' + C.zeitSeit(s.updated_at))),
      h('div', { class: 'kennzahlen' }, h('div', null, h('b', null, z.pts), h('span', null, 'Punkte')), h('div', null, h('b', null, (st.badges || []).length), h('span', null, 'Abzeichen')), h('div', null, h('b', null, z.pt != null ? `${z.pt}/20` : '–'), h('span', null, 'Probetest')), h('div', null, h('b', null, z.hilfe ? 'ja' : 'nein'), h('span', null, 'braucht Hilfe'))),
      h('section', { class: 'karte' }, h('h3', null, 'Akten und Checks'), h('div', { class: 'tab-wrap' }, modTab)),
      h('section', { class: 'karte' }, h('h3', null, 'Fehlerschwerpunkte'), Object.keys(fehlerZaehl).length ? h('ul', null, Object.entries(fehlerZaehl).sort((a, b) => b[1] - a[1]).map(([e, n]) => h('li', null, `${FK[e] || e}: ${n}×`))) : h('p', { class: 'dezent' }, 'Keine typischen Fehler erfasst.')),
      st.pt && st.pt.fertig ? h('section', { class: 'karte' }, h('h3', null, 'Probetest – Lernziele'), h('ul', null, Object.entries(st.pt.lz || {}).map(([lz, [p, mx]]) => h('li', null, `${LJ.lernzielKurz[lz]}: ${p}/${mx}`)))) : null,
      h('section', { class: 'karte' }, h('h3', null, 'Geschriebene Texte zum Ansehen'), texte.length ? texte : h('p', { class: 'dezent' }, 'Noch keine.')),
      selbst.filter(Boolean).length ? h('section', { class: 'karte' }, h('h3', null, 'Selbsteinschätzung'), selbst) : null,
      h('section', { class: 'karte' }, h('h3', null, 'Alle Antworten (neueste zuerst)'), h('div', { class: 'tab-wrap' }, h('table', { class: 'kt-tab klein' }, h('thead', null, h('tr', null, h('th', null, 'Aufgabe'), h('th', null, 'Satz'), h('th', null, 'Antwort'), h('th', null, 'richtig'), h('th', null, 'Versuch'), h('th', null, 'Fehler'))), h('tbody', null, verlauf)))),
      h('div', { class: 'aktionen' }, h('button', { class: 'btn text gefahr', onclick: async () => { if (!await C.frage(`Fortschritt von ${s.code} komplett zurücksetzen? Alle Antworten werden gelöscht.`)) return; try { await store.resetStudent(s.id); T.zeigeKlasse(k); } catch (e) { fehler(e); } } }, 'Fortschritt zurücksetzen')));
  };

  /* ── Test ── */
  async function testTab(k, schueler, ziel) {
    let res = [], keyA = null, keyB = null;
    try { [res, keyA, keyB] = await Promise.all([store.listTestResults(k.id), store.getTestKey('A'), store.getTestKey('B')]); } catch (e) { return fehler(e); }
    const nm = namen();
    const auswerten = (r) => { const key = r.variant === 'B' ? keyB : keyA; if (!key) return null; const tasks = key.tasks.map((t) => ({ t, ...C.scoreTask(t, r.answers || {}) })); const manual = r.manual || {}; const summe = tasks.reduce((s, x) => s + (manual[x.t.nr] != null && manual[x.t.nr] !== '' ? +manual[x.t.nr] : x.p), 0); return { tasks, summe, note: C.note(summe) }; };
    const kopfZeile = h('div', { class: 'test-steuer' },
      h('p', null, k.test_open ? h('b', { class: 'warn' }, 'Der Test ist freigeschaltet.') : 'Der Test ist geschlossen.', ' Schülerinnen und Schüler sehen den Test erst, wenn er freigeschaltet ist. Wer begonnen hat, kann auch nach dem Schließen noch abgeben.'),
      h('button', { class: 'btn ' + (k.test_open ? '' : 'primaer'), onclick: async () => { try { await store.setTestOpen(k.id, !k.test_open); k.test_open = !k.test_open; T.zeigeKlasse(k, 'test'); } catch (e) { fehler(e); } } }, k.test_open ? 'Test schließen' : 'Test freischalten'),
      h('button', { class: 'btn', onclick: () => csv(k, schueler, res, auswerten) }, 'Ergebnisse als CSV'));
    if (!keyA) ziel.append(h('div', { class: 'box box-achtung' }, h('span', { class: 'box-label' }, 'Lösungsschlüssel fehlt'), C.mdEl('Der Lösungsschlüssel für den Test ist nicht in der Datenbank. Führe in Supabase die Datei **testschluessel.sql** aus (siehe Anleitung).')));
    const zeilen = schueler.map((s) => {
      const r = res.find((x) => x.student_id === s.id);
      const a = r && r.submitted_at ? auswerten(r) : null;
      const status = !r ? 'nicht begonnen' : r.submitted_at ? 'abgegeben' : 'läuft seit ' + C.zeitSeit(r.started_at);
      return h('tr', null, h('td', null, h('b', null, nm[s.code] || ''), h('div', { class: 'mono dezent' }, s.code)),
        h('td', null, h('select', { disabled: !!r, onchange: async (e) => { try { await store.setVariant(s.id, e.target.value); s.test_variant = e.target.value; } catch (er) { fehler(er); } } }, h('option', { value: 'A', selected: (s.test_variant || 'A') === 'A' }, 'A'), h('option', { value: 'B', selected: s.test_variant === 'B' }, 'B (Nachschreiben)'))),
        h('td', null, status),
        a ? a.tasks.map((x) => h('td', { class: 'mitte' }, h('input', { class: 'punkt-in', type: 'number', step: '0.5', min: 0, max: x.max, value: (r.manual || {})[x.t.nr] ?? '', placeholder: String(x.p), title: `automatisch: ${x.p} von ${x.max}`, onchange: async (e) => { const m = Object.assign({}, r.manual || {}); if (e.target.value === '') delete m[x.t.nr]; else m[x.t.nr] = +e.target.value; r.manual = m; try { await store.saveManual(s.id, m); T.zeigeKlasse(k, 'test'); } catch (er) { fehler(er); } } }))) : Array.from({ length: 7 }, () => h('td', { class: 'mitte dezent' }, '–')),
        h('td', { class: 'mitte' }, a ? h('b', null, String(a.summe).replace('.', ',')) : '–'), h('td', { class: 'mitte' }, a ? h('b', null, a.note) : '–'),
        h('td', null, r ? h('button', { class: 'btn text', onclick: () => testDetail(k, s, r, auswerten) }, 'Antworten') : null, r ? h('button', { class: 'btn text gefahr', onclick: async () => { if (await C.frage(`Test von ${s.code} zurücksetzen? Die Antworten werden gelöscht und der Test kann neu geschrieben werden.`)) { await store.reopenTest(s.id); T.zeigeKlasse(k, 'test'); } } }, 'zurücksetzen') : null));
    });
    ziel.append(kopfZeile, h('div', { class: 'tab-wrap' }, h('table', { class: 'kt-tab test-tab' }, h('thead', null, h('tr', null, h('th', null, 'Code / Name'), h('th', null, 'Fassung'), h('th', null, 'Status'), ['1 (3)', '2 (4)', '3 (2)', '4 (3)', '5 (2)', '6 (2)', '7 (4)'].map((x) => h('th', { class: 'mitte' }, x)), h('th', { class: 'mitte' }, 'Σ (20)'), h('th', { class: 'mitte' }, 'Note'), h('th', null, ''))), h('tbody', null, zeilen))),
      h('p', { class: 'dezent' }, 'Die Zahlen in grau sind automatisch berechnet. Trage eine Zahl ein, um sie zu ändern (z. B. bei Aufgabe 7). Notenschlüssel: 1 ab 17,5 · 2 ab 15 · 3 ab 12,5 · 4 ab 10 · 5 ab 5 VP.'));
  }
  function testDetail(k, s, r, auswerten) {
    const a = auswerten(r); const nm = namen();
    seite(h('div', { class: 'klassen-kopf' }, h('button', { class: 'btn text', onclick: () => T.zeigeKlasse(k, 'test') }, '← Test'), h('h2', null, `Test ${r.variant}: ${nm[s.code] || ''} ${s.code}`), a ? h('span', { class: 'pill' }, `${String(a.summe).replace('.', ',')} VP · Note ${a.note}`) : null),
      a ? a.tasks.map((x) => h('section', { class: 'test-aufgabe erg' }, h('div', { class: 'auftrag' }, h('div', { class: 'auftrag-nr' }, x.t.nr), h('div', { class: 'auftrag-txt' }, C.mdEl(x.t.text)), h('div', { class: 'punkte' }, `${(r.manual || {})[x.t.nr] ?? x.p} / ${x.max}`)),
        x.t.items.map((it) => { const v = (r.answers || {})[it.id]; const ok = C.grade(it, v).ok; return h('div', { class: 'erg-zeile ' + (ok ? 'gut' : 'schlecht') }, h('span', { class: 'erg-ico' }, ok ? '✔' : '✘'), h('div', null, it.prompt ? C.mdEl(it.prompt) : null, h('p', { html: '<b>Antwort:</b> ' + C.inl(C.antwortText(it, v)) }), h('p', { class: 'dezent', html: 'Erwartet: ' + C.inl(C.loesungText(it)) }))); }))) : h('p', null, 'Noch nicht abgegeben oder Lösungsschlüssel fehlt.'));
  }
  function csv(k, schueler, res, auswerten) {
    const nm = namen();
    const zeilen = [['Code', 'Name', 'Fassung', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'Summe', 'Note', 'abgegeben']];
    schueler.forEach((s) => { const r = res.find((x) => x.student_id === s.id); const a = r && r.submitted_at ? auswerten(r) : null; zeilen.push([s.code, nm[s.code] || '', r ? r.variant : '', ...(a ? a.tasks.map((x) => String((r.manual || {})[x.t.nr] ?? x.p).replace('.', ',')) : Array(7).fill('')), a ? String(a.summe).replace('.', ',') : '', a ? a.note : '', r && r.submitted_at ? new Date(r.submitted_at).toLocaleString('de-DE') : '']); });
    const text = '﻿' + zeilen.map((z) => z.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(';')).join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' })); a.download = `Test_Adverbialsaetze_${k.name.replace(/\W+/g, '_')}.csv`; document.body.appendChild(a); a.click(); a.remove();
  }
})();
