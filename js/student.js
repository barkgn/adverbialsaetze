/* Schüleransicht: Ermittlungsakte, Akten, Checks, Wege, Probetest, Test */
(function () {
  const C = window.CORE; const { h } = C;
  const S = (window.STUDENT = {});

  /* ── Index aller Aufgaben ── */
  const INDEX = {}; const POOL = []; const AUFTRAG = {}; // POOL: {id, lz, mi}
  function indexSteps(steps, mi, lzDef) {
    steps.forEach((st) => {
      const lz = st.lz || lzDef;
      if (st.items) st.items.forEach((it) => { INDEX[it.id] = it; AUFTRAG[it.id] = st.text; if (mi != null && it.type !== 'open') POOL.push({ id: it.id, lz: it.lz || lz, mi }); });
      if (st.t === 'check') {
        [...(st.A || []), ...(st.B || [])].forEach((it) => { INDEX[it.id] = it; AUFTRAG[it.id] = autoAuftrag(it); if (mi != null) POOL.push({ id: it.id, lz: it.lz || st.lz || lz, mi }); });
        if (st.ueStep) indexSteps([st.ueStep], mi, st.lz);
        if (st.zw) indexSteps(st.zw.steps, mi, st.lz);
      }
    });
  }
  function autoAuftrag(it) {
    const o = (it.options || []).join('|');
    if (/^\*\*/.test(it.prompt || '')) return '';
    if (it.type === 'comma') return '**Setze** die fehlenden Kommas.';
    if (o === LJ.FUNKTIONEN.join('|')) return '**Bestimme** die Funktion des markierten Satzteils.';
    if (o === LJ.FORMEN.join('|')) return '**Bestimme** die Form des markierten Adverbials.';
    if (o === LJ.GLIED.join('|')) return '**Bestimme**: Adverbialsatz, Subjektsatz oder Objektsatz?';
    if (o === 'Konjunktion|Subjunktion') return '**Entscheide**: Ist das markierte Wort eine Konjunktion oder eine Subjunktion?';
    if (o === 'Präposition|Subjunktion') return '**Entscheide**: Ist das markierte Wort eine Präposition oder eine Subjunktion?';
    if (o === 'Objekt|Adverbial') return '**Entscheide**: Objekt oder Adverbial?';
    if (it.type === 'selects' && it.rows.some((r) => r.label === 'Form')) return '**Bestimme** Funktion und Form des markierten Adverbials.';
    return '';
  }
  S.init = function () {
    LJ.modules.forEach((m, mi) => indexSteps(m.steps, m.id === 'm7' || m.id === 'm1' ? null : mi, null));
    LJ.PROBETEST.tasks.forEach((t) => t.items.forEach((it) => (INDEX[it.id] = it)));
    LJ.profi.forEach((p) => p.items.forEach((it) => (INDEX[it.id] = it)));
  };
  S.INDEX = INDEX;

  /* ── Zustand ── */
  let store, code, info, state, root, saveTimer, queue = [];
  const RANG = [[0, 'Anwärterin / Anwärter'], [400, 'Ermittlerin / Ermittler'], [1000, 'Kommissarin / Kommissar'], [1600, 'Meisterdetektivin / Meisterdetektiv']];
  S.rang = (p, fertig) => (fertig ? RANG[3][1] : RANG.filter(([g]) => p >= g).pop()[1]);

  function leer() {
    const mod = {}; LJ.modules.forEach((m, i) => (mod[m.id] = { st: i === 0 ? 'active' : 'locked', step: 0, item: 0, sub: null, checks: {}, rep: {} }));
    return { v: 1, ts: Date.now(), mod, ans: {}, pts: 0, lupe: {}, self: {}, clues: [], badges: [], pt: null, profil: {}, profi: {}, fertig: false, streak: 0 };
  }
  const cacheKey = () => 'detektei-state-v2-' + code;
  const queueKey = () => 'detektei-queue-v2-' + code;

  S.start = async function (st, rt, c, inf) {
    store = st; root = rt; code = c; info = inf;
    const server = inf.state && inf.state.v ? inf.state : null;
    const lokal = LS.get(cacheKey(), null);
    state = server && (!lokal || (server.ts || 0) >= (lokal.ts || 0)) ? server : lokal || leer();
    // neue Module (falls Inhalt erweitert wurde)
    LJ.modules.forEach((m) => { if (!state.mod[m.id]) state.mod[m.id] = { st: 'locked', step: 0, item: 0, sub: null, checks: {}, rep: {} }; });
    queue = LS.get(queueKey(), []);
    speichern(true);
    S.zeigeAkte();
  };

  function speichern(sofort) {
    state.ts = Date.now();
    LS.set(cacheKey(), state); LS.set(queueKey(), queue);
    clearTimeout(saveTimer);
    saveTimer = setTimeout(flush, sofort ? 10 : 700);
  }
  async function flush() {
    const ind = document.getElementById('speicher');
    try {
      if (queue.length) { const q = queue.slice(); await store.studentLog(code, q); queue = queue.slice(q.length); LS.set(queueKey(), queue); }
      await store.studentSave(code, state);
      if (ind) { ind.textContent = '✓ gespeichert'; ind.className = 'speicher ok'; }
    } catch (e) {
      if (ind) { ind.textContent = 'offline – wird nachgeholt'; ind.className = 'speicher off'; }
      clearTimeout(saveTimer); saveTimer = setTimeout(flush, 5000);
    }
  }
  function log(key, item, v, g, attempt, punkte, ctx) {
    queue.push({ item_id: key, value: v, correct: !!g.ok, attempt, points: punkte, err: g.err || null, review: !!g.review, ctx: ctx || null, ts: new Date().toISOString() });
  }

  /* ── Rahmen ── */
  function kopf() {
    return h('header', { class: 'app-kopf' },
      h('div', { class: 'kopf-l' }, h('button', { class: 'logo-btn', onclick: () => S.zeigeAkte(), title: 'Zur Übersicht', 'aria-label': 'Zur Übersicht' }, h('span', { class: 'logo-q' }), h('span', { class: 'logo-txt' }, 'Übersicht'))),
      h('div', { class: 'kopf-r' },
        h('span', { class: 'pill' }, `${state.pts} Punkte`),
        h('span', { class: 'pill dezent' }, S.rang(state.pts, state.fertig)),
        h('span', { id: 'speicher', class: 'speicher' }, ''),
        h('button', { class: 'btn text', onclick: async () => { if (await C.frage('Abmelden? Dein Fortschritt ist gespeichert.')) { LS.del('detektei-code'); location.reload(); } } }, 'Abmelden')));
  }
  function seite(...kids) { root.innerHTML = ''; root.append(kopf(), h('main', { class: 'inhalt' }, ...kids)); window.scrollTo(0, 0); }
  function toast(t) { const e = h('div', { class: 'toast' }, t); document.body.appendChild(e); setTimeout(() => e.remove(), 2600); }

  /* ── Ermittlungsakte (Übersicht) ── */
  S.zeigeAkte = function () {
    const mods = LJ.modules.map((m) => {
      const ms = state.mod[m.id];
      const lab = ms.st === 'done' ? 'ansehen' : ms.st === 'active' ? (ms.step || ms.item ? 'weitermachen' : 'beginnen') : 'gesperrt';
      return h('li', { class: 'akte-k ' + ms.st },
        h('div', { class: 'akte-nr' }, akteZeichen(m)),
        h('div', { class: 'akte-txt' }, h('span', { class: 'akte-label' }, m.kurz), h('b', { html: C.inl(m.titel) }), h('span', null, m.leitfrage)),
        h('div', { class: 'akte-st' }, ms.st === 'done' && m.akte ? h('span', { class: 'abzeichen', title: 'Abzeichen' }, '★') : null,
          h('button', { class: 'btn ' + (ms.st === 'active' ? 'primaer' : ''), disabled: ms.st === 'locked', onclick: () => S.zeigeModul(m.id) }, lab)));
    });
    const testBtn = (info.test_open || (info.test && info.test.started_at)) ? h('div', { class: 'kasten test-hinweis' },
      info.test && info.test.submitted_at ? h('p', null, h('b', null, 'Test abgegeben. '), 'Deine Lehrkraft sieht jetzt dein Ergebnis.')
        : [h('p', null, h('b', null, 'Der Test ist freigeschaltet. '), 'Du hast 20 Minuten Zeit. Starte erst, wenn deine Lehrkraft es sagt.'), h('button', { class: 'btn primaer', onclick: () => S.zeigeTest() }, info.test && info.test.started_at ? 'Test fortsetzen' : 'Test starten')]) : null;
    const hinweise = h('section', { class: 'karte' }, h('h3', null, 'Hinweise zum Fall'),
      state.clues.length ? h('ol', { class: 'hinweise' }, state.clues.slice().sort().map((n) => h('li', { html: C.inl(clueText(n)) }))) : h('p', { class: 'dezent' }, 'Noch keine Hinweise. Schließe Akte 1 ab.'));
    const profi = h('section', { class: 'karte' }, h('h3', null, '★ Profi-Akten'),
      h('p', { class: 'dezent' }, 'Freiwillige Vertiefung. Eine Profi-Akte wird frei, wenn du die passende Akte im Expressweg geschafft hast. Nach dem Abschlussfall sind alle frei.'),
      h('ul', { class: 'profi-liste' }, LJ.profi.map((p) => { const frei = profiFrei(p); const fertig = state.profi[p.nr]; return h('li', null, h('button', { class: 'btn ' + (fertig ? '' : 'klein'), disabled: !frei, onclick: () => S.zeigeProfi(p) }, `${p.nr}${fertig ? ' ✓' : frei ? '' : ' 🔒'}`)); })));
    const naechster = RANG.find(([g]) => g > state.pts && g < 1600);
    const vorher = RANG.filter(([g]) => g <= state.pts).pop();
    const pct = naechster ? Math.round(((state.pts - vorher[0]) / (naechster[0] - vorher[0])) * 100) : 100;
    const akten = LJ.modules.filter((m) => m.akte);
    const stand = h('section', { class: 'karte stand' },
      h('div', { class: 'stand-rang' }, h('p', { class: 'reihe' }, 'Dein Dienstgrad'), h('p', { class: 'rang-name' }, S.rang(state.pts, state.fertig)),
        h('div', { class: 'rang-balken', title: `${pct} %` }, h('div', { style: `width:${state.fertig ? 100 : pct}%` })),
        h('p', { class: 'dezent' }, state.fertig ? 'Du hast den Fall gelöst – höchster Dienstgrad!' : naechster ? `${state.pts} Punkte · noch ${naechster[0] - state.pts} bis „${naechster[1]}“` : `${state.pts} Punkte · Löse den Fall, um Meisterdetektivin / Meisterdetektiv zu werden.`)),
      h('div', { class: 'stand-abz' }, h('p', { class: 'reihe' }, 'Abzeichen'), h('p', { class: 'sterne' }, akten.map((m) => h('span', { class: 'stern' + (state.badges.includes(m.id) ? ' an' : ''), title: m.kurz }, '★'))), h('p', { class: 'dezent' }, `${state.badges.length} von ${akten.length} Akten`)),
      h('div', { class: 'stand-hinw' }, h('p', { class: 'reihe' }, 'Hinweise zum Fall'), h('p', { class: 'gross-zahl' }, `${state.clues.length} / 5`), h('p', { class: 'dezent' }, 'Mit allen fünf löst du den Fall.')),
      h('details', { class: 'punkte-info' }, h('summary', null, 'Wofür gibt es Punkte?'), renderBlocks(LJ.modules[0].steps[0].blocks.filter((b) => b.box === 'punkte' || b.box === 'raenge'))));
    seite(
      h('section', { class: 'titel' }, VIS.titelbild(), h('div', null, h('p', { class: 'reihe' }, 'Lernjob · Einheit Grammatik'), h('h1', null, LJ.meta.titel), h('p', { class: 'unter' }, LJ.meta.untertitel), h('p', { class: 'leitfrage' }, 'Leitfrage: ' + LJ.meta.leitfrage), h('p', { class: 'dezent' }, `Code ${code}${info.class_name ? ' · ' + info.class_name : ''}`))),
      testBtn,
      stand,
      h('section', { class: 'karte' }, h('h3', null, 'Deine Ermittlungsakte'), h('ol', { class: 'akten' }, mods)),
      h('div', { class: 'zwei' }, hinweise, profi),
      h('section', { class: 'karte' }, h('h3', null, 'Merkblatt'), h('p', null, 'Alle Merken-Kästen auf einen Blick – zum Wiederholen und Ausdrucken.'), h('button', { class: 'btn', onclick: () => S.zeigeMerkblatt() }, 'Merkblatt öffnen')));
    flush();
  };
  const clueText = (n) => { for (const m of LJ.modules) for (const s of m.steps) if (s.t === 'clue' && s.nr === n) return `**Hinweis ${n}:** ${s.md}`; return ''; };
  function profiFrei(p) {
    if (state.fertig) return true;
    const m = LJ.modules.find((x) => x.id === p.nach); const ms = state.mod[p.nach];
    if (ms.st !== 'done') return false;
    const checks = m.steps.filter((s) => s.t === 'check');
    return checks.every((c) => ms.checks[c.id] && ms.checks[c.id].path === 'express');
  }

  /* ── Modul ── */
  function band(m, ms) {
    const total = m.steps.length; const pct = Math.round((ms.step / total) * 100);
    return h('section', { class: 'band' }, h('div', { class: 'band-nr' }, akteZeichen(m)),
      h('div', { class: 'band-txt' }, h('p', { class: 'band-label' }, m.kurz), h('h2', { html: C.inl(m.titel) }), h('p', { class: 'band-frage' }, m.leitfrage)),
      h('div', { class: 'band-fort', title: `${pct} %` }, h('div', { style: `width:${pct}%` })));
  }
  function infoLeiste(m) {
    const det = [];
    if (m.ziele) det.push(h('details', { class: 'ziele' }, h('summary', null, 'Lernziele'), h('p', null, 'Am Ende dieser Akte kannst du …'), h('ul', null, m.ziele.map((z) => h('li', { html: C.inl(z) })))));
    if (m.wortspeicher) det.push(h('details', { class: 'ziele' }, h('summary', null, 'Wortspeicher'), C.mdEl(m.wortspeicher.md)));
    return det.length ? h('div', { class: 'info-leiste' }, det) : null;
  }

  S.zeigeModul = function (mid) {
    const m = LJ.modules.find((x) => x.id === mid); const ms = state.mod[mid];
    state.akt = mid;
    if (ms.st === 'done') return zeigeRueckblick(m);
    if (ms.step >= m.steps.length) return modulFertig(m);
    const st = ms.sub ? subStep(m, ms) : m.steps[ms.step];
    const inhalt = h('div', { class: 'schritt' });
    seite(band(m, ms), infoLeiste(m), inhalt);
    renderStep(m, ms, st, inhalt);
  };
  function subStep(m, ms) {
    const ck = m.steps[ms.step];
    const steps = ms.sub.kind === 'ue' ? [ck.ueStep] : ck.zw.steps;
    return steps[ms.sub.step];
  }
  function weiterStep(m, ms) {
    ms.item = 0;
    if (ms.sub) {
      const ck = m.steps[ms.step];
      const steps = ms.sub.kind === 'ue' ? [ck.ueStep] : ck.zw.steps;
      ms.sub.step++;
      if (ms.sub.step >= steps.length) { ms.sub = null; const c = ms.checks[ck.id]; c.phase = ck.B ? 'B' : 'done'; if (!ck.B) ms.step++; }
    } else ms.step++;
    speichern();
    S.zeigeModul(m.id);
  }

  function aufgabeKopf(nr, text, titel) {
    return h('div', { class: 'auftrag ohne-nr' }, h('div', { class: 'auftrag-txt' }, titel ? h('p', { class: 'auftrag-titel' }, titel) : null, C.mdEl(text || '')));
  }
  function akteZeichen(m) { return m.akte ? String(m.akte) : m.id === 'm1' ? '▶' : '★'; }

  function renderBlocks(blocks) {
    return blocks.map((b) => {
      if (typeof b === 'string') return C.mdEl(b);
      if (b.box) return h('div', { class: 'box box-' + b.box }, b.title ? h('span', { class: 'box-label', html: C.esc(b.box === 'merken' ? 'Merken' : b.box === 'achtung' ? 'Achtung' : b.box === 'tipp' ? 'Tipp' : b.box === 'methode' ? 'Methode' : b.box === 'wortspeicher' ? 'Wortspeicher' : b.box === 'punkte' ? 'Punkte' : b.box === 'raenge' ? '' : '') + (b.title ? (b.box === 'raenge' ? '' : ' · ') + C.inl(b.title) : '') }) : null, C.mdEl(b.md));
      if (b.anim) return VIS.anim(b);
      if (b.vis) return VIS[b.vis] ? VIS[b.vis](b) : null;
      if (b.sprech) return VIS.sprech({ md: b.sprech, wer: b.wer });
      if (b.img === 'fotos') return VIS.fotos(b);
      if (b.img === 'wegweiser') return VIS.wegweiser();
      return null;
    });
  }

  /* Erklärung auf mehreren Seiten zum Durchklicken */
  function pager(seiten, o) {
    let i = Math.max(0, Math.min(o.start || 0, seiten.length - 1));
    const wrap = h('div', { class: 'pager' });
    const tabs = h('ol', { class: 'pager-tabs' }); const body = h('div', { class: 'pager-body' }); const fuss = h('div', { class: 'pager-fuss' });
    const geh = (k) => { i = k; zeige(true); };
    const zeige = (scroll) => {
      tabs.innerHTML = '';
      seiten.forEach((s, k) => tabs.appendChild(h('li', { class: k === i ? 'aktiv' : k < i ? 'gesehen' : '' }, h('button', { type: 'button', 'aria-current': k === i ? 'step' : null, onclick: () => geh(k) }, h('span', { class: 'pt-nr' }, String(k + 1)), h('span', { class: 'pt-txt', html: C.inl(s.titel) })))));
      body.innerHTML = '';
      body.append(h('h4', { class: 'seiten-titel', html: C.inl(seiten[i].titel) }), ...renderBlocks(seiten[i].blocks).filter(Boolean));
      fuss.innerHTML = '';
      fuss.append(h('button', { type: 'button', class: 'btn', disabled: i === 0, onclick: () => geh(i - 1) }, '← Zurück'), h('span', { class: 'pager-zahl' }, `Seite ${i + 1} von ${seiten.length}`),
        i < seiten.length - 1 ? h('button', { type: 'button', class: 'btn primaer', onclick: () => geh(i + 1) }, 'Weiter →') : (o.fertig ? o.fertig() : h('span')));
      if (o.onSeite) o.onSeite(i);
      if (scroll) wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    wrap.append(tabs, body, fuss); zeige(false);
    return wrap;
  }
  S.pager = pager;
  function erklaerInhalt(p, o) {
    return p.seiten ? pager(p.seiten, o || {}) : renderBlocks(p.blocks);
  }

  function renderStep(m, ms, st, ziel) {
    const weiterBtn = (txt) => h('button', { class: 'btn primaer', onclick: () => weiterStep(m, ms) }, txt || 'Weiter');
    if (st.teil) ziel.appendChild(h('h3', { class: 'teil' }, st.teil));
    switch (st.t) {
      case 'page':
        if (st.text) ziel.appendChild(aufgabeKopf(st.nr, st.text));
        if (st.seiten) {
          ziel.append(h('article', { class: 'material' }, st.title && /^M\d/.test(st.title) ? h('h3', { class: 'mat-titel', html: matTitel(st.title) }) : null,
            pager(st.seiten, { start: ms.item || 0, onSeite: (k) => { if (ms.item !== k) { ms.item = k; speichern(); } }, fertig: () => weiterBtn('Gelesen – weiter') })));
          return;
        }
        ziel.append(h('article', { class: 'material' }, st.title && /^M\d/.test(st.title) ? h('h3', { class: 'mat-titel', html: matTitel(st.title) }) : null, renderBlocks(st.blocks)), h('div', { class: 'aktionen' }, weiterBtn('Gelesen – weiter')));
        return;
      case 'task': case 'repeat': return renderTask(m, ms, st, ziel);
      case 'self': return renderSelf(m, ms, st, ziel, weiterBtn);
      case 'check': return renderCheck(m, ms, st, ziel);
      case 'clue':
        if (!state.clues.includes(st.nr)) { state.clues.push(st.nr); speichern(); }
        ziel.append(h('div', { class: 'hinweis-karte' }, h('p', { class: 'box-label' }, `Hinweis ${st.nr} für den Fall`), C.mdEl(st.md)), h('div', { class: 'aktionen' }, weiterBtn('Akte abschließen')));
        return;
      case 'probetest': return renderProbetest(m, ms, st, ziel);
      case 'profil': return renderProfil(m, ms, st, ziel);
      case 'merkblatt':
        ziel.append(aufgabeKopf(st.nr, st.text), h('div', { class: 'aktionen' }, h('button', { class: 'btn', onclick: () => S.zeigeMerkblatt(m.id) }, 'Merkblatt öffnen'), weiterBtn()));
        return;
      case 'finish':
        if (!state.fertig) { state.fertig = true; speichern(); }
        ziel.append(h('div', { class: 'hinweis-karte fertig' }, h('p', { class: 'box-label' }, 'Fall gelöst!'), C.mdEl(st.md), h('p', { class: 'abzeichen gross' }, '★')), h('div', { class: 'aktionen' }, weiterBtn('Zur Ermittlungsakte')));
        return;
      default: ziel.append(h('p', null, 'Unbekannter Schritt'), weiterBtn());
    }
  }
  const matTitel = (t) => C.inl(String(t).replace(/^M\d+\s+/, '').replace(/^Akte \d+:\s*/, ''));

  /* ── Aufgaben (Übungsmodus) ── */
  function itemsFuer(m, ms, st) {
    if (st.t !== 'repeat') return st.items.map((it) => ({ it, key: it.id }));
    const k = String(ms.step);
    if (!ms.rep[k]) {
      const mi = LJ.modules.indexOf(m);
      const kand = POOL.filter((p) => p.mi < mi);
      const falsch = kand.filter((p) => { const a = state.ans[p.id]; return a && (!a.ok || a.n > 1); });
      const rest = C.shuffle(kand.filter((p) => !falsch.includes(p)), code + m.id);
      const wahl = [...C.shuffle(falsch, code), ...rest].slice(0, st.n).map((p) => p.id);
      ms.rep[k] = wahl; speichern();
    }
    return ms.rep[k].map((id) => ({ it: INDEX[id], key: `w:${m.id}:${id}` })).filter((x) => x.it);
  }

  function renderTask(m, ms, st, ziel) {
    const liste = itemsFuer(m, ms, st);
    if (ms.item >= liste.length) { ms.item = 0; return weiterStep(m, ms); }
    const { it, key } = liste[ms.item];
    ziel.appendChild(aufgabeKopf(st.nr, st.text, st.titel));
    if (st.wegweiser) ziel.appendChild(h('details', { class: 'ziele' }, h('summary', null, 'Wegweiser aufklappen'), VIS.wegweiser()));
    if (st.fall) ziel.appendChild(h('details', { class: 'ziele', open: true }, h('summary', null, 'Alle Hinweise'), h('ol', { class: 'hinweise' }, [1, 2, 3, 4, 5].map((n) => h('li', { html: C.inl(clueText(n)) })))));
    ziel.appendChild(h('p', { class: 'zaehler' }, liste.length > 1 ? `Übung ${ms.item + 1} von ${liste.length}` : ''));
    ziel.appendChild(itemRunner(it, key, { modus: 'lernen', auftrag: st.t === 'repeat', lz: it.lz || st.lz, ctx: m.id, weiter: () => { ms.item++; speichern(); S.zeigeModul(m.id); } }));
  }

  function fehlerText(g, it) {
    if (g.msg) return g.msg;
    if (g.err && LJ.fehler[g.err]) return LJ.fehler[g.err];
    return null;
  }

  /* Ein Item mit Prüfen-Knopf. modus: lernen (2 Versuche, Lupe) · check (1 Versuch, keine Lupe) */
  function itemRunner(it, key, o) {
    const box = h('div', { class: 'item', 'data-id': it.id });
    const alt = state.ans[key];
    let versuche = 0;
    if ((o.auftrag || o.modus === 'check') && AUFTRAG[it.id]) box.appendChild(C.mdEl(AUFTRAG[it.id].replace(/^\*\*Stopp!\*\*[^.]*\.\s*/, ''), 'auftrag-klein'));
    if (it.prompt) box.appendChild(C.mdEl(it.prompt, it.type === 'tap' ? 'prompt' : 'prompt satzzeile'));
    if (it.type === 'open' && it.checkliste) box.appendChild(h('div', { class: 'box box-tipp' }, h('span', { class: 'box-label' }, 'Checkliste – prüfe vor dem Abschicken'), h('ul', null, it.checkliste.map((c) => h('li', null, c)))));
    const w = C.widget(it, { onChange: () => { fb.innerHTML = ''; }, onEnter: () => { if (!pruefen.hidden) pruef(); } });
    box.appendChild(w.el);
    const fb = h('div', { class: 'feedback', role: 'status', 'aria-live': 'polite' });
    const aktionen = h('div', { class: 'aktionen' });
    const pruefen = h('button', { class: 'btn primaer', onclick: () => pruef() }, it.type === 'open' ? 'Abschicken' : 'Prüfen');
    const weiter = h('button', { class: 'btn primaer', hidden: true, onclick: () => o.weiter() }, 'Weiter');
    let lupeBtn = null;
    if (o.modus === 'lernen' && it.hint) {
      lupeBtn = h('button', { class: 'btn lupe', title: it.lupeGratis ? 'Tipp anzeigen' : 'Tipp anzeigen (kostet 2 Punkte)', onclick: () => {
        if (!state.lupe[key] && !it.lupeGratis) { state.pts = Math.max(0, state.pts - 2); state.lupe[key] = true; speichern(); }
        lupeBtn.replaceWith(h('div', { class: 'box box-tipp lupe-tipp' }, h('span', { class: 'box-label' }, 'Lupe'), C.mdEl(it.hint)));
      } }, h('span', { class: 'lupe-ico' }), it.lupeGratis ? 'Lupe' : 'Lupe (−2 Punkte)');
    }
    aktionen.append(lupeBtn || '', pruefen, weiter);
    box.append(fb, aktionen);

    if (alt && alt.fertig) { // schon erledigt (z. B. nach Neuladen)
      w.lock(); if (!alt.ok) w.showSolution(); fb.innerHTML = alt.ok ? '<p class="gut">Schon erledigt.</p>' : '<p>Schon bearbeitet.</p>'; pruefen.hidden = true; weiter.hidden = false; if (lupeBtn) lupeBtn.hidden = true;
    }

    function pruef() {
      const v = w.get();
      const leer = v == null || v === '' || (Array.isArray(v) && (v.length === 0 || v.every((x) => x == null))) || (it.type === 'selects' && v.some((x) => x == null)) || (it.type === 'text' && !String(v).trim()) || (it.type === 'open' && !String(v).trim());
      if (leer && it.type !== 'comma') { fb.innerHTML = '<p class="hinweis">Wähle oder schreibe zuerst eine Antwort.</p>'; return; }
      if (it.type === 'comma' && it.extra && !v.extra) { fb.innerHTML = '<p class="hinweis">Wähle auch die Regel aus.</p>'; return; }
      versuche++;
      const g = C.grade(it, v);
      const maxV = o.modus === 'check' ? 1 : 2;
      let punkte = 0;
      if (g.ok) punkte = versuche === 1 ? 10 : 5;
      const fertig = g.ok || versuche >= maxV;
      if (fertig) {
        const rangVorher = S.rang(state.pts, state.fertig);
        state.pts += punkte;
        if (S.rang(state.pts, state.fertig) !== rangVorher) setTimeout(() => toast('Neuer Dienstgrad: ' + S.rang(state.pts, state.fertig) + ' ★'), 300);
        state.ans[key] = { n: versuche, ok: !!g.ok, p: punkte, e: g.err || null, ts: Date.now(), fertig: true, r: !!g.review };
        state.streak = g.ok ? 0 : (state.streak || 0) + 1;
      }
      log(key, it, v, g, versuche, punkte, o.ctx);
      if (o.onResult && fertig) o.onResult(g.ok);
      fb.innerHTML = '';
      const ft = fehlerText(g, it);
      if (g.ok) {
        w.lock();
        let txt = it.type === 'open' ? '<p class="gut"><b>Abgeschickt.</b> Deine Lehrkraft kann deinen Text lesen.</p>' : `<p class="gut"><b>${versuche === 1 ? 'Richtig!' : 'Jetzt stimmt es!'}</b> +${punkte} Punkte</p>`;
        if (g.review && it.type === 'text') txt += '<p class="dezent">Dein Satz ist nicht genau wie die Musterlösung, aber richtig gebaut. Deine Lehrkraft schaut ihn sich noch an.</p>';
        fb.innerHTML = txt;
        if (it.build) fb.appendChild(C.mdEl('Dein Satz: *' + it.build.replace(/\{(\d)\}/g, (_, i) => v[+i]) + '*'));
        if (it.fb && it.type !== 'open') fb.appendChild(C.mdEl(it.fb, 'dezent'));
        if (it.type === 'open') w.showSolution();
        if (it.type === 'open' && it.zaehlen) { const n = (String(v).match(/\b(weil|da|als|nachdem|bevor|während|damit|indem|seit|bis|sobald|obwohl)\b/gi) || []).length; fb.appendChild(h('p', { class: 'dezent' }, `Die App zählt ${n} Subjunktion(en) und ${(String(v).match(/,/g) || []).length} Komma(s) in deinem Text.`)); }
        pruefen.hidden = true; weiter.hidden = false; if (lupeBtn) lupeBtn.hidden = true;
        celebrate(box);
      } else if (!fertig) {
        const tipp = C.ERKL.hinweis(it, v, AUFTRAG[it.id], g) || ft;
        fb.append(h('p', { class: 'schlecht' }, h('b', null, 'Noch nicht richtig. '), 'Versuch es noch einmal.'), tipp ? h('div', { class: 'tipptext' }, h('span', { class: 'tipp-label' }, 'Tipp'), C.mdEl(tipp)) : '');
      } else {
        w.lock(); if (it.type !== 'text') w.showSolution();
        const erkl = C.ERKL.erklaerung(it, v, AUFTRAG[it.id]);
        fb.append(h('p', { class: 'schlecht' }, h('b', null, o.modus === 'check' ? 'Leider falsch. ' : 'Das war leider nicht richtig. '), it.type === 'text' ? '' : 'Die richtige Lösung ist grün markiert.'), erkl ? h('div', { class: 'erklaerung' }, h('span', { class: 'tipp-label' }, 'So ist es richtig'), typeof erkl === 'string' ? C.mdEl(erkl) : [erkl.vis ? VIS[erkl.vis.vis](erkl.vis) : null, C.mdEl(erkl.md)]) : '');
        pruefen.hidden = true; weiter.hidden = false; if (lupeBtn) lupeBtn.hidden = true;
      }
      speichern();
    }
    return box;
  }
  function celebrate(el) { el.classList.remove('jubel'); void el.offsetWidth; el.classList.add('jubel'); }

  /* ── Selbsteinschätzung ── */
  function renderSelf(m, ms, st, ziel, weiterBtn) {
    const key = m.id + ':' + ms.step; const werte = state.self[key] || [];
    const stufen = ['noch nicht', 'teilweise', 'sicher'];
    ziel.appendChild(aufgabeKopf(null, st.text || '**Schätze** dich selbst ein: Wie sicher bist du?', 'Selbsteinschätzung'));
    const tab = h('table', { class: 'kt-tab selbst' }, h('thead', null, h('tr', null, h('th', null, 'Ich kann …'), stufen.map((s) => h('th', { class: 'mitte' }, s)))),
      h('tbody', null, st.ziele.map((z, i) => h('tr', null, h('td', { html: C.inl(z) }), stufen.map((s, j) => h('td', { class: 'mitte' }, h('input', { type: 'radio', name: 'se' + i, 'aria-label': s, checked: werte[i] === j, onchange: () => { werte[i] = j; state.self[key] = werte; speichern(); } })))))));
    ziel.append(h('div', { class: 'tab-wrap' }, tab), h('p', { class: 'dezent' }, 'Bei „noch nicht“: Sieh dir die Erklärungen noch einmal an oder frag nach.'), h('div', { class: 'aktionen' }, weiterBtn()));
  }

  /* ── Check mit Wegen ── */
  function renderCheck(m, ms, st, ziel) {
    let c = ms.checks[st.id];
    if (!c) { c = ms.checks[st.id] = { phase: 'A', A: null, B: null, path: null }; speichern(); }
    if (c.phase === 'entscheid') return checkEntscheid(m, ms, st, c, ziel);
    if (c.phase === 'done') { ms.step++; speichern(); return S.zeigeModul(m.id); }
    const fass = c.phase === 'B' ? st.B : st.A;
    if (ms.item >= fass.length) {
      const score = fass.filter((it) => state.ans[it.id] && state.ans[it.id].ok).length;
      if (c.phase === 'A') {
        c.A = score;
        c.path = score >= st.express ? 'express' : st.ue != null && score >= st.ue ? 'ue' : 'zw';
        if (st.id === 'start' && c.path !== 'express') c.path = 'zw';
      } else { c.B = score; c.help = score < (st.ue || st.express); }
      c.phase = 'entscheid'; ms.item = 0; speichern();
      return checkEntscheid(m, ms, st, c, ziel);
    }
    ziel.appendChild(aufgabeKopf(null, st.text, (st.titel || st.nr) + (c.phase === 'B' ? ' – zweiter Versuch' : '')));
    ziel.appendChild(h('p', { class: 'zaehler' }, `Aufgabe ${ms.item + 1} von ${fass.length}`));
    const it = fass[ms.item];
    ziel.appendChild(itemRunner(it, it.id, { modus: 'check', ctx: m.id + ':' + st.id + c.phase, weiter: () => { ms.item++; speichern(); S.zeigeModul(m.id); } }));
  }
  function checkEntscheid(m, ms, st, c, ziel) {
    const zweiter = c.B != null;
    const score = zweiter ? c.B : c.A; const n = (zweiter ? st.B : st.A).length;
    let text, knopf;
    if (!zweiter && c.path === 'express') { text = `**Stark! ${score} von ${n} richtig.** Du nimmst den Expressweg.`; knopf = 'Weiter'; }
    else if (!zweiter && c.path === 'ue') { text = `**${score} von ${n} richtig.** Fast geschafft! In einer kurzen Übungsrunde festigst du das Thema. Danach kommt der Check noch einmal mit neuen Sätzen.`; knopf = 'Zur Übungsrunde'; }
    else if (!zweiter && c.path === 'zw') { text = st.id === 'start' ? `**${score} von ${n} richtig.** Wir frischen zuerst kurz die Satzglieder auf. Dann geht es los.` : `**${score} von ${n} richtig.** Kein Problem: Du bekommst das Thema noch einmal anders erklärt und übst mit leichteren Aufgaben. Danach kommt der Check noch einmal mit neuen Sätzen.`; knopf = st.id === 'start' ? 'Zur Auffrischung' : 'Zum zweiten Weg'; }
    else { text = score >= st.express ? `**Super! ${score} von ${n} richtig.** Das sitzt jetzt.` : `**${score} von ${n} richtig.** Es geht trotzdem weiter. Die Aufgaben zu diesem Thema kommen später als Wiederholungskarten noch einmal.`; knopf = 'Weiter'; }
    ziel.append(h('div', { class: 'hinweis-karte check-erg' }, h('p', { class: 'box-label' }, st.nr + ' – Ergebnis'), C.mdEl(text)), h('div', { class: 'aktionen' }, h('button', { class: 'btn primaer', onclick: () => {
      if (!zweiter && (c.path === 'ue' || c.path === 'zw') && (st.ueStep || st.zw)) {
        const kind = c.path === 'ue' && st.ueStep ? 'ue' : 'zw'; c.phase = 'sub'; ms.sub = { kind, step: 0 }; ms.item = 0;
      } else { c.phase = 'done'; ms.step++; ms.item = 0; }
      speichern(); S.zeigeModul(m.id);
    } }, knopf)));
  }

  /* ── Modulende ── */
  function modulFertig(m) {
    const ms = state.mod[m.id]; ms.st = 'done';
    if (m.akte && !state.badges.includes(m.id)) { state.badges.push(m.id); state.pts += 50; }
    const i = LJ.modules.indexOf(m); const next = LJ.modules[i + 1];
    if (next && state.mod[next.id].st === 'locked') state.mod[next.id].st = 'active';
    speichern();
    seite(h('section', { class: 'karte mitte' }, h('p', { class: 'abzeichen gross' }, '★'), h('h2', null, m.akte ? `Akte ${m.akte} abgeschlossen!` : `${m.kurz} abgeschlossen!`), m.akte ? h('p', null, 'Du bekommst ein Abzeichen und 50 Bonuspunkte.') : null,
      h('div', { class: 'aktionen mitte' }, next ? h('button', { class: 'btn primaer', onclick: () => S.zeigeModul(next.id) }, `Weiter mit ${next.kurz}`) : null, h('button', { class: 'btn', onclick: () => S.zeigeAkte() }, 'Zur Ermittlungsakte'))));
  }
  function zeigeRueckblick(m) {
    const seiten = [];
    const sammle = (steps) => steps.forEach((s) => { if (s.t === 'page') seiten.push(s); if (s.t === 'check' && s.zw) sammle(s.zw.steps); });
    sammle(m.steps);
    seite(band(m, { step: m.steps.length }), infoLeiste(m), h('p', { class: 'dezent' }, 'Diese Akte hast du abgeschlossen. Hier kannst du alle Erklärungen noch einmal lesen.'),
      seiten.map((s) => h('article', { class: 'material' }, s.title ? h('h3', { class: 'mat-titel', html: matTitel(s.title) }) : null, erklaerInhalt(s))),
      h('div', { class: 'aktionen' }, h('button', { class: 'btn primaer', onclick: () => S.zeigeAkte() }, 'Zur Ermittlungsakte')));
  }

  /* ── Formular-Modus (Probetest und Test): alle Aufgaben auf einer Seite, keine Rückmeldung ── */
  function formular(tasks, antworten, onChange) {
    return tasks.map((t) => h('section', { class: 'test-aufgabe' },
      h('div', { class: 'auftrag' }, h('div', { class: 'auftrag-nr' }, t.nr), h('div', { class: 'auftrag-txt' }, C.mdEl(t.text)), h('div', { class: 'punkte' }, `${t.punkte} P.`)),
      t.items.map((it) => {
        const w = C.widget(it, { value: antworten[it.id], onChange: () => { antworten[it.id] = w.get(); onChange(); } });
        return h('div', { class: 'item test', 'data-id': it.id }, it.prompt ? C.mdEl(it.prompt, 'prompt') : null, w.el);
      })));
  }
  function timer(startIso, minuten, onAblauf) {
    const el = h('div', { class: 'timer', role: 'timer' });
    const tick = () => {
      const rest = Math.max(0, minuten * 60 - (Date.now() - new Date(startIso).getTime()) / 1000);
      el.textContent = `⏱ ${Math.floor(rest / 60)}:${String(Math.floor(rest % 60)).padStart(2, '0')}`;
      el.classList.toggle('knapp', rest < 180);
      if (rest <= 0) { clearInterval(iv); onAblauf(); }
    };
    const iv = setInterval(() => { if (!document.body.contains(el)) return clearInterval(iv); tick(); }, 1000);
    tick(); return el;
  }

  function renderProbetest(m, ms, st, ziel) {
    const P = LJ.PROBETEST;
    if (!state.pt) state.pt = { start: null, a: {}, fertig: false };
    const pt = state.pt;
    ziel.appendChild(aufgabeKopf(st.nr, st.text));
    if (!pt.start) {
      ziel.append(h('p', null, 'Der Probetest zählt nicht für die Note. Er sieht aber aus wie der echte Test: 20 Minuten, keine Lupe, keine Rückmeldung bis zum Abgeben.'), h('div', { class: 'aktionen' }, h('button', { class: 'btn primaer', onclick: () => { pt.start = new Date().toISOString(); speichern(); S.zeigeModul(m.id); } }, 'Probetest starten')));
      return;
    }
    if (!pt.fertig) {
      const abgeben = () => {
        const erg = P.tasks.map((t) => C.scoreTask(t, pt.a));
        pt.fertig = true; pt.erg = erg.map((e) => e.p); pt.sum = erg.reduce((s, e) => s + e.p, 0);
        const lz = {};
        P.tasks.forEach((t, i) => {
          erg[i].detail.forEach((d) => { const it = INDEX[d.id]; const z = (it && it.lz) || t.lz; lz[z] = lz[z] || [0, 0]; lz[z][0] += d.p; lz[z][1] += d.max; });
        });
        pt.lz = lz; state.pts += pt.sum * 5;
        log('m7.probetest', null, pt.a, { ok: true }, 1, pt.sum, 'm7');
        speichern(); S.zeigeModul(m.id);
      };
      ziel.append(timer(pt.start, P.minuten, abgeben), ...formular(P.tasks, pt.a, () => speichern()), h('div', { class: 'aktionen' }, h('button', { class: 'btn primaer', onclick: async () => { if (await C.frage('Probetest jetzt abgeben?')) abgeben(); } }, 'Abgeben')));
      return;
    }
    // Ergebnis
    ziel.append(h('div', { class: 'hinweis-karte' }, h('p', { class: 'box-label' }, 'Dein Ergebnis'), h('p', { class: 'gross' }, `${pt.sum} von 20 Punkten`), h('p', { class: 'dezent' }, 'Unten siehst du jede Aufgabe mit der richtigen Lösung.')));
    P.tasks.forEach((t, i) => {
      ziel.appendChild(h('section', { class: 'test-aufgabe erg' }, h('div', { class: 'auftrag' }, h('div', { class: 'auftrag-nr' }, t.nr), h('div', { class: 'auftrag-txt' }, C.mdEl(t.text)), h('div', { class: 'punkte' }, `${pt.erg[i]} / ${t.punkte}`)),
        t.items.map((it) => { const ok = C.grade(it, pt.a[it.id]).ok; return h('div', { class: 'erg-zeile ' + (ok ? 'gut' : 'schlecht') }, h('span', { class: 'erg-ico' }, ok ? '✔' : '✘'), h('div', null, it.prompt ? C.mdEl(it.prompt) : null, h('p', { class: 'dezent', html: 'Deine Antwort: ' + C.inl(C.antwortText(it, pt.a[it.id])) }), ok ? null : h('p', { html: '<b>Lösung:</b> ' + C.inl(C.loesungText(it)) }))); })));
    });
    ziel.appendChild(h('div', { class: 'aktionen' }, h('button', { class: 'btn primaer', onclick: () => weiterStep(m, ms) }, 'Zum Fehlerprofil')));
  }

  function renderProfil(m, ms, st, ziel) {
    ziel.appendChild(aufgabeKopf(st.nr, st.text));
    const lz = (state.pt && state.pt.lz) || {};
    const zeilen = Object.keys(LJ.lernziele).map((k) => {
      const [p, mx] = lz[k] || [0, 0];
      const q = mx ? p / mx : null;
      const farbe = q == null ? 'grau' : q >= 0.8 ? 'gruen' : q >= 0.5 ? 'gelb' : 'rot';
      const runde = state.profil[k];
      return h('tr', null, h('td', null, LJ.lernzielKurz[k]), h('td', { class: 'mitte' }, h('span', { class: 'ampel ' + farbe, title: farbe })), h('td', { class: 'mitte' }, mx ? `${p}/${mx}` : '–'),
        h('td', null, farbe === 'gelb' || farbe === 'rot' || farbe === 'grau' ? h('button', { class: 'btn klein' + (runde && runde.fertig ? '' : ' primaer'), onclick: () => wiederholung(m, k, farbe) }, runde && runde.fertig ? 'Noch eine Runde' : 'Wiederholungsrunde') : h('span', { class: 'gut' }, 'sicher ✔')));
    });
    ziel.append(h('div', { class: 'tab-wrap' }, h('table', { class: 'kt-tab' }, h('thead', null, h('tr', null, h('th', null, 'Lernziel'), h('th', null, 'Ampel'), h('th', null, 'Punkte'), h('th', null, ''))), h('tbody', null, zeilen))),
      h('p', { class: 'dezent' }, 'Grün ab 80 %, gelb ab 50 %, sonst rot. Eine Wiederholungsrunde hat 6 Aufgaben zu diesem Lernziel.'),
      h('div', { class: 'aktionen' }, h('button', { class: 'btn primaer', onclick: () => weiterStep(m, ms) }, 'Weiter')));
  }
  function wiederholung(m, lz, farbe) {
    const nr = ((state.profil[lz] && state.profil[lz].n) || 0) + 1;
    const kand = POOL.filter((p) => p.lz === lz);
    const offen = kand.filter((p) => !(state.ans[p.id] && state.ans[p.id].ok && state.ans[p.id].n === 1));
    const ids = C.shuffle(offen.length >= 6 ? offen : kand, code + lz + nr).slice(0, 6).map((p) => p.id);
    state.profil[lz] = { n: nr, ids, item: 0, fertig: false, rot: farbe === 'rot' };
    speichern(); zeigeWiederholung(m, lz);
  }
  const ERKL = { LZ1: 'M5', LZ2: 'M8', LZ3: 'M14', LZ4: 'M17', LZ5: 'M11', LZ6: 'M20', LZ7: 'M20' };
  function findePage(mnr) { for (const m of LJ.modules) { const such = (steps) => { for (const s of steps) { if (s.t === 'page' && s.title && s.title.startsWith(mnr + ' ')) return s; if (s.t === 'check' && s.zw) { const r = such(s.zw.steps); if (r) return r; } } return null; }; const r = such(m.steps); if (r) return r; } return null; }
  function zeigeWiederholung(m, lz) {
    const r = state.profil[lz];
    if (r.item >= r.ids.length) { r.fertig = true; speichern(); return S.zeigeModul(m.id); }
    const inhalt = h('div', { class: 'schritt' });
    seite(band(m, state.mod[m.id]), inhalt);
    inhalt.appendChild(aufgabeKopf(null, `**Wiederholungsrunde:** ${LJ.lernzielKurz[lz]}`, null));
    if (r.rot && r.item === 0) { const p = findePage(ERKL[lz]); if (p) inhalt.appendChild(h('details', { class: 'ziele', open: true }, h('summary', null, 'Noch einmal erklärt: ' + matTitel(p.title).replace(/<[^>]+>/g, '')), erklaerInhalt(p))); }
    inhalt.appendChild(h('p', { class: 'zaehler' }, `Übung ${r.item + 1} von ${r.ids.length}`));
    const id = r.ids[r.item];
    inhalt.appendChild(itemRunner(INDEX[id], `r${r.n}:${lz}:${id}`, { modus: 'lernen', auftrag: true, ctx: 'profil', weiter: () => { r.item++; speichern(); zeigeWiederholung(m, lz); } }));
  }

  /* ── Profi-Akten ── */
  S.zeigeProfi = function (p) {
    const fertigIds = p.items.filter((it) => state.ans[it.id] && state.ans[it.id].fertig).length;
    if (fertigIds >= p.items.length) { state.profi[p.nr] = true; speichern(); }
    const idx = Math.min(fertigIds, p.items.length - 1);
    const it = p.items[idx];
    const inhalt = h('div', { class: 'schritt' });
    seite(h('section', { class: 'band hell' }, h('div', { class: 'band-nr' }, '★'), h('div', { class: 'band-txt' }, h('p', { class: 'band-label' }, 'Profi-Akte'), h('h2', null, 'Für Profis'))), inhalt);
    inhalt.appendChild(aufgabeKopf(null, p.text));
    if (fertigIds >= p.items.length) { inhalt.append(h('p', { class: 'gut' }, 'Profi-Akte erledigt!'), h('div', { class: 'aktionen' }, h('button', { class: 'btn primaer', onclick: () => S.zeigeAkte() }, 'Zur Ermittlungsakte'))); return; }
    inhalt.appendChild(itemRunner(it, it.id, { modus: 'lernen', ctx: 'profi', weiter: () => S.zeigeProfi(p) }));
  };

  /* ── Merkblatt ── */
  S.zeigeMerkblatt = function (zurueck) {
    const themen = LJ.merkblatt || [];
    const zurueckBtn = () => h('button', { class: 'btn', onclick: () => (zurueck ? S.zeigeModul(zurueck) : S.zeigeAkte()) }, '← Zurück');
    seite(h('div', { class: 'merkblatt' },
      h('div', { class: 'aktionen nodruck' }, zurueckBtn(), h('button', { class: 'btn primaer', onclick: () => C.drucken() }, 'Alle Themen drucken / als PDF speichern')),
      h('h1', null, 'Merkblatt: Adverbiale und Adverbialsätze'),
      h('p', { class: 'dezent nodruck' }, 'Wähle oben ein Thema oder blättere mit „Weiter“. Beim Drucken kommen alle Themen untereinander aufs Papier.'),
      h('div', { class: 'nur-bildschirm' }, pager(themen, { fertig: zurueckBtn })),
      h('div', { class: 'nur-druck' }, themen.map((t) => h('section', { class: 'mb-thema' }, h('h2', { html: C.inl(t.titel) }), renderBlocks(t.blocks))))));
  };

  /* ── Test ── */
  S.zeigeTest = async function () {
    const v = info.test_variant || 'A';
    const T = window.TEST_FRAGEN && window.TEST_FRAGEN[v];
    if (!T) { toast('Der Test konnte nicht geladen werden.'); return; }
    let t = info.test;
    if (!t || !t.started_at) {
      if (!await C.frage('Test jetzt starten? Ab jetzt laufen 20 Minuten.')) return;
      try { t = info.test = await store.studentTest(code, 'start'); } catch (e) { toast(e.message); return; }
    }
    if (t.submitted_at) return S.zeigeAkte();
    const antworten = Object.assign({}, LS.get('detektei-test-' + code, {}), t.answers || {});
    let st;
    const sichern = () => { LS.set('detektei-test-' + code, antworten); clearTimeout(st); st = setTimeout(() => store.studentTest(code, 'save', antworten).catch(() => {}), 1500); };
    let abgegeben = false;
    const abgeben = async (auto) => {
      if (abgegeben) return;
      if (!auto && !await C.frage('Test jetzt abgeben? Danach kannst du nichts mehr ändern.')) return;
      abgegeben = true;
      try { info.test = await store.studentTest(code, 'submit', antworten); LS.del('detektei-test-' + code); }
      catch (e) { abgegeben = false; toast('Abgeben hat nicht geklappt – bitte noch einmal versuchen. (' + e.message + ')'); return; }
      seite(h('section', { class: 'karte mitte' }, h('h2', null, 'Test abgegeben'), h('p', null, 'Danke! Deine Lehrkraft sieht jetzt dein Ergebnis.'), h('button', { class: 'btn primaer', onclick: () => S.zeigeAkte() }, 'Zur Ermittlungsakte')));
    };
    seite(h('section', { class: 'pruefkopf' }, h('h1', null, 'Test'), h('p', { class: 'unter' }, T.titel.replace(/^Test: /, '')), h('p', { class: 'dezent' }, `Bearbeitungszeit: ${T.minuten} Min. · Hilfsmittel: keine · Gesamt: 20 VP`)),
      h('div', { class: 'box box-info' }, h('span', { class: 'box-label' }, 'Hinweise'), h('ul', null, h('li', null, 'Lies alle Aufgaben zuerst einmal durch.'), h('li', null, 'Es gibt keine Lupe und keine Rückmeldung. Deine Antworten werden laufend gespeichert.'))),
      timer(t.started_at, T.minuten, () => abgeben(true)), ...formular(T.tasks, antworten, sichern),
      h('div', { class: 'aktionen' }, h('button', { class: 'btn primaer', onclick: () => abgeben(false) }, 'Test abgeben')),
      h('div', { class: 'erfolg' }, h('span', null, '☘ Viel Erfolg!')));
  };
})();
