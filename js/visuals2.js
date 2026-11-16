/* Weitere Grafiken und Animationen für die Erklärseiten (ohne Ton) */
(function () {
  const C = window.CORE; const { h } = C; const V = window.VIS;

  /* Rollen im Satzbild: Farbe und Beschriftung */
  const ROLLE = {
    praed: ['#8a5a00', 'Prädikat'], subj: ['#37474f', 'Subjekt'], akk: ['#ad1457', 'Akkusativobjekt'], dat: ['#ad1457', 'Dativobjekt'], obj: ['#ad1457', 'Objekt'],
    hs: ['#545c66', 'Hauptsatz'], ns: ['#1e5a6e', 'Nebensatz'], sub: ['#1e5a6e', 'Subjunktion'], fv: ['#8a5a00', 'finites Verb'], sg: ['#8e959e', ''],
    subjsatz: ['#37474f', 'Subjektsatz'], objsatz: ['#ad1457', 'Objektsatz'],
  };
  const NAME = { lokal: 'Adverbial: lokal', temporal: 'Adverbial: temporal', kausal: 'Adverbial: kausal', modal: 'Adverbial: modal', instrumental: 'Adverbial: instrumental', final: 'Adverbial: final' };
  const farbe = (r) => (C.FARBE[r] || (ROLLE[r] && ROLLE[r][0]) || '#8e959e');
  const label = (r, eigen) => (eigen != null ? eigen : NAME[r] || (ROLLE[r] && ROLLE[r][1]) || '');
  V.rolleFarbe = farbe;

  /* Satzbild: Satzglieder als Kästchen mit Beschriftung darunter */
  V.satzbild = function (b) {
    return h('figure', { class: 'satzbild' + (b.klein ? ' klein' : '') },
      b.titel ? h('figcaption', { class: 'anim-titel', html: C.inl(b.titel) }) : null,
      h('div', { class: 'sb-reihe' }, b.teile.map(([t, r, eigen]) => (t === ',' || t === '.' ? h('span', { class: 'sb-zeichen' + (t === ',' ? ' komma' : '') }, t)
        : h('span', { class: 'sb-teil' + (r === 'sg' ? ' neutral' : ''), style: `--c:${farbe(r)}` }, h('span', { class: 'sb-txt', html: C.inl(t) }), h('span', { class: 'sb-lab' }, label(r, eigen)))))),
      b.unter ? h('p', { class: 'sb-unter', html: C.inl(b.unter) }) : null);
  };

  /* Sprechblase der Kommissarin */
  const GESICHT = '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="31" fill="#e4eef1"/><path d="M14 26c2-12 34-12 36 0z" fill="#1e5a6e"/><rect x="10" y="24" width="44" height="5" rx="2" fill="#1e5a6e"/><circle cx="32" cy="38" r="13" fill="#f2c9a5"/><circle cx="27" cy="37" r="1.8" fill="#1d232b"/><circle cx="37" cy="37" r="1.8" fill="#1d232b"/><path d="M27 43c3 2.5 7 2.5 10 0" stroke="#1d232b" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
  V.sprech = (b) => h('div', { class: 'sprech' }, h('div', { class: 'sprech-bild', html: GESICHT }), h('div', { class: 'sprech-blase' }, h('span', { class: 'sprech-name' }, b.wer || 'Kommissarin Wendt'), C.mdEl(b.md)));

  /* Sechs Funktionen als Karten zum Aufklappen */
  const ICON = {
    lokal: '<path d="M24 6c-7 0-12 5-12 12 0 9 12 22 12 22s12-13 12-22c0-7-5-12-12-12z" fill="none" stroke="currentColor" stroke-width="3.5"/><circle cx="24" cy="18" r="4.5" fill="currentColor"/>',
    temporal: '<circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" stroke-width="3.5"/><path d="M24 14v10l7 5" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>',
    kausal: '<path d="M27 6L13 27h10l-3 15 15-22H25z" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linejoin="round"/>',
    modal: '<path d="M6 30c5-10 9-10 13 0s8 10 12 0 8-10 11 0" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><path d="M8 16h14M8 22h8" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>',
    instrumental: '<circle cx="15" cy="24" r="8" fill="none" stroke="currentColor" stroke-width="3.5"/><path d="M23 24h19M36 24v7M42 24v5" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>',
    final: '<circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="24" cy="24" r="10" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="24" cy="24" r="3.5" fill="currentColor"/>',
  };
  V.icon = (f, gr) => `<svg viewBox="0 0 48 48" width="${gr || 36}" height="${gr || 36}" aria-hidden="true" style="color:${C.FARBE[f]}">${ICON[f] || ''}</svg>`;
  const FKARTE = {
    lokal: ['des Ortes', 'Wo? Wohin? Woher?', 'Der Pokal stand **im Lehrerzimmer**.', 'einen Ort oder eine Richtung'],
    temporal: ['der Zeit', 'Wann? Wie lange? Seit wann?', '**Am Freitag** fand das Schulfest statt.', 'einen Zeitpunkt oder eine Dauer'],
    kausal: ['des Grundes', 'Warum? Weshalb?', '**Wegen eines Anrufs** ging Herr Brandt ins Büro.', 'einen Grund'],
    modal: ['der Art und Weise', 'Wie? Auf welche Weise?', 'Die Person rannte **eilig** davon.', 'die Art und Weise'],
    instrumental: ['des Mittels', 'Womit? Wodurch?', 'Tom öffnete die Tür **mit dem Schlüssel**.', 'ein Mittel oder Werkzeug'],
    final: ['des Zwecks', 'Wozu? Mit welchem Ziel?', 'Tom holte den Pokal **zum Gravieren**.', 'einen Zweck oder ein Ziel'],
  };
  V.FKARTE = FKARTE;
  V.funktionen = function (b) {
    const grid = h('div', { class: 'fkarten' + (b.statisch ? ' statisch' : '') });
    LJ.FUNKTIONEN.forEach((f) => {
      const [des, frage, bsp, was] = FKARTE[f];
      const rueck = h('div', { class: 'fk-rueck' }, h('p', { class: 'fk-was' }, `nennt ${was}`), h('p', { class: 'fk-bsp', html: C.inl(bsp).replace(/<b>/g, `<b style="color:${C.FARBE[f]};border-bottom:3px solid ${C.FARBE[f]}">`) }));
      const k = h('button', { type: 'button', class: 'fkarte', style: `--fk:${C.FARBE[f]}`, 'aria-expanded': 'false' },
        h('span', { class: 'fk-icon', html: V.icon(f) }), h('span', { class: 'fk-name' }, f + (f === 'final' && !b.ohneNeu ? ' (neu)' : '')), h('span', { class: 'fk-des' }, 'adverbiale Bestimmung ' + des), h('span', { class: 'fk-frage' }, frage), rueck);
      k.onclick = () => { const an = k.classList.toggle('offen'); k.setAttribute('aria-expanded', an ? 'true' : 'false'); };
      if (b.statisch) k.classList.add('offen');
      grid.appendChild(k);
    });
    return h('div', null, b.statisch ? null : h('p', { class: 'anim-titel' }, 'Klicke auf eine Karte. Dann siehst du ein Beispiel.'), grid);
  };

  /* Formenleiter: gleiche Funktion, verschiedene Bauweisen */
  V.formen = (b) => h('figure', { class: 'formenleiter' },
    b.titel ? h('figcaption', { class: 'anim-titel', html: C.inl(b.titel) }) : null,
    b.zeilen.map(([form, bsp, info], i) => h('div', { class: 'fl-zeile' }, h('span', { class: 'fl-form' }, form),
      h('span', { class: 'fl-balken', style: `--w:${30 + i * 17}%;--fk:${C.FARBE[b.f] || '#1e5a6e'}`, html: C.inl(bsp) }), info ? h('span', { class: 'fl-info', html: C.inl(info) }) : null)));

  /* Feldermodell */
  V.felder = function (b) {
    const kopf = ['Vorfeld', 'linke Verbklammer', 'Mittelfeld', 'rechte Verbklammer', 'Nachfeld'];
    return h('figure', { class: 'felder' }, b.titel ? h('figcaption', { class: 'anim-titel', html: C.inl(b.titel) }) : null,
      h('div', { class: 'tab-wrap' }, h('table', { class: 'felder-tab' }, h('thead', null, h('tr', null, kopf.map((k, i) => h('th', { class: i === 1 || i === 3 ? 'klammer' : '' }, k)))),
        h('tbody', null, b.zeilen.map((z) => h('tr', null, z.map((c, i) => { const ns = /^!/.test(c || ''); return h('td', { class: (i === 1 || i === 3 ? 'klammer ' : '') + (ns ? 'ns-feld' : ''), html: C.inl(String(c || '').replace(/^!/, '')) }); })))))),
      b.unter ? h('p', { class: 'sb-unter', html: C.inl(b.unter) }) : null);
  };

  /* Kommabild: Satzgefüge als Kästchen mit Komma */
  V.kommabild = (b) => h('div', { class: 'kommabild' }, b.zeilen.map((z) => h('div', { class: 'kb-zeile' },
    z.titel ? h('p', { class: 'kb-titel', html: C.inl(z.titel) }) : null,
    h('div', { class: 'kb-reihe' }, z.teile.map(([art, t]) => (art === ',' ? h('span', { class: 'kb-komma' }, ',') : h('span', { class: 'kb-box ' + art }, h('span', { class: 'kb-art' }, art === 'ns' ? 'Nebensatz' : 'Hauptsatz'), h('span', { class: 'kb-txt', html: C.inl(t) }))))))));

  /* Baum der Gliedsätze */
  V.baum = () => h('div', { class: 'baum' },
    h('div', { class: 'baum-wurzel' }, h('b', null, 'Gliedsatz'), h('span', null, 'ein Nebensatz, der ein Satzglied ist')),
    h('div', { class: 'baum-aeste' }, [
      ['subjsatz', 'Subjektsatz', 'Wer oder was?', 'nicht weglassbar', '***Dass der Pokal fehlt**, wundert alle.*'],
      ['objsatz', 'Objektsatz', 'Wen oder was?', 'nicht weglassbar', '*Mia weiß, **dass Tom ihn hat**.*'],
      ['ns', 'Adverbialsatz', 'Wo? Wann? Warum? Wie? Wozu?', 'meistens weglassbar', '*Lina ging, **weil der Bus kam**.*'],
    ].map(([r, n, f, w, bsp]) => h('div', { class: 'baum-ast', style: `--c:${farbe(r)}` }, h('b', null, n), h('span', { class: 'baum-frage' }, f), h('span', { class: 'baum-weg' }, w), h('span', { class: 'baum-bsp', html: C.inl(bsp) }),
      r === 'ns' ? h('span', { class: 'baum-fn' }, ['lokal', 'temporal', 'kausal', 'modal', 'final'].map((x) => h('span', { class: 'chip', style: `--fk:${C.FARBE[x]}` }, x))) : null))));

  /* Vergleich in zwei Spalten */
  V.vergleich = (b) => h('div', { class: 'vergleich' }, [b.links, b.rechts].map((s) => h('div', { class: 'vg-spalte', style: s.f ? `--c:${farbe(s.f)}` : '' }, h('p', { class: 'vg-titel', html: C.inl(s.titel) }), C.mdEl(s.md))));

  /* Chips: Wörter nach Gruppen */
  V.chips = (b) => h('div', { class: 'chipgruppen' }, b.titel ? h('p', { class: 'anim-titel', html: C.inl(b.titel) }) : null,
    b.gruppen.map(([g, woerter, info]) => h('div', { class: 'cg-zeile' }, h('span', { class: 'cg-name', style: `--fk:${farbe(g)}` }, C.FARBE[g] ? h('span', { html: V.icon(g, 20) }) : null, info || g),
      h('span', { class: 'cg-woerter' }, woerter.map((w) => h('span', { class: 'chip', style: `--fk:${farbe(g)}`, html: C.inl(w) }))))));

  /* Ablauf: Schritte mit Pfeilen */
  V.ablauf = (b) => h('div', { class: 'ablauf' + (b.senkrecht ? ' senkrecht' : '') }, b.schritte.map((s, i) => [i ? h('span', { class: 'ab-pfeil', 'aria-hidden': 'true' }, b.senkrecht ? '↓' : '→') : null,
    h('div', { class: 'ab-schritt' }, h('span', { class: 'ab-nr' }, String(i + 1)), h('div', { class: 'ab-txt', html: C.md(s) }))]));

  /* Dienstgrade als Treppe */
  V.raenge = () => h('div', { class: 'treppe' }, [['Anwärter/in', 'Start'], ['Ermittler/in', 'ab 400 Punkten'], ['Kommissar/in', 'ab 1000 Punkten'], ['Meisterdetektiv/in', 'Fall gelöst']].map(([n, w], i) =>
    h('div', { class: 'stufe', style: `--hoch:${36 + i * 22}px` }, h('span', { class: 'stufe-stern' }, '★'.repeat(i + 1)), h('b', null, n), h('span', null, w))));

  /* Zeitleiste für nachdem / bevor */
  V.zeitleiste = (b) => h('div', { class: 'zeitleiste' }, h('div', { class: 'zl-pfeil' }), b.punkte.map(([t, was]) => h('div', { class: 'zl-punkt' }, h('span', { class: 'zl-was' }, was), h('span', { class: 'zl-txt', html: C.inl(t) }))));

  V.titelbildBlock = () => V.titelbild();

  /* ── Animationen ── */
  const A = (V.anim2 = {});
  const gross1 = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  /* FLIP: Kästchen gleiten an ihre neue Stelle */
  function flip(container, rerender) {
    const alt = new Map(); container.querySelectorAll('[data-k]').forEach((e) => alt.set(e.dataset.k, e.getBoundingClientRect()));
    rerender();
    container.querySelectorAll('[data-k]').forEach((e) => {
      const a = alt.get(e.dataset.k); const n = e.getBoundingClientRect();
      if (!a) { e.classList.add('neu'); return; }
      const dx = a.left - n.left; const dy = a.top - n.top;
      if (!dx && !dy) return;
      e.style.transition = 'none'; e.style.transform = `translate(${dx}px, ${dy}px)`;
      requestAnimationFrame(() => requestAnimationFrame(() => { e.style.transition = 'transform .6s ease'; e.style.transform = ''; }));
    });
  }

  /* Umstellprobe mit mehreren Varianten (Kästchen gleiten) */
  A.umstellen = function (a) {
    const varianten = a.varianten || [a.satz, a.neu];
    const box = h('div', { class: 'anim' }); let n = 0;
    const satz = h('p', { class: 'satz gross umstell' }); const info = h('p', { class: 'anim-frage' });
    const btn = h('button', { type: 'button', class: 'btn klein' }, 'Umstellen');
    const btnF = a.falsch ? h('button', { type: 'button', class: 'btn klein' }, 'Und wenn man Wörter trennt?') : null;
    const zeige = (falsch) => {
      if (falsch) {
        satz.innerHTML = a.falsch.teile.map((x, i) => `<span class="sg schlecht-sg">${C.esc(i === 0 ? gross1(x) : x)}</span>`).join(' ') + '.';
        info.innerHTML = `<span class="schlecht">✘</span> ${C.inl(a.falsch.info || 'Das ergibt keinen Sinn. Die Wörter gehören zusammen – sie bilden ein Satzglied.')}`; return;
      }
      const v = varianten[n];
      satz.innerHTML = v.map((x, i) => `<span class="sg" data-k="${C.esc(x.toLowerCase())}">${C.esc(i === 0 ? gross1(x) : x)}</span>`).join(' ') + '.';
      info.innerHTML = n === 0 ? C.inl(a.start || 'Klicke auf „Umstellen“. Beobachte, welche Wörter zusammenbleiben.') : `Variante ${n + 1}: ` + C.inl(a.info || 'Jedes Kästchen bleibt beim Umstellen zusammen. **Jedes Kästchen ist ein Satzglied.**') + (a.verb ? ` Das finite Verb *${a.verb}* bleibt immer an **zweiter Stelle**.` : '');
    };
    btn.onclick = () => { n = (n + 1) % varianten.length; if (satz.querySelector('.schlecht-sg')) { zeige(); return; } flip(satz, () => zeige()); };
    if (btnF) btnF.onclick = () => zeige(true);
    if (a.titel) box.appendChild(h('p', { class: 'anim-titel', html: C.inl(a.titel) }));
    box.append(satz, info, h('div', { class: 'anim-knoepfe' }, btn, btnF)); zeige();
    return box;
  };

  /* Weglassprobe zum Ausprobieren: Satzglied anklicken = weglassen */
  A.weglassprobe = function (a) {
    const box = h('div', { class: 'anim' }); const weg = new Set();
    const satz = h('p', { class: 'satz gross' }); const info = h('p', { class: 'anim-frage' });
    const zeige = () => {
      satz.innerHTML = '';
      a.teile.forEach((t, i) => { const b = h('button', { type: 'button', class: 'sg wegknopf' + (weg.has(i) ? ' weg' : '') }, i === 0 ? gross1(t.t) : t.t); b.onclick = () => { weg.has(i) ? weg.delete(i) : weg.add(i); zeige(); }; satz.append(b, ' '); });
      satz.append(a.ende || '.');
      if (!weg.size) { info.innerHTML = C.inl(a.start || 'Klicke ein Satzglied an, um es wegzulassen. Klicke noch einmal, um es zurückzuholen.'); return; }
      const rest = a.teile.filter((_, i) => !weg.has(i)).map((t) => t.t); const restSatz = rest.length ? gross1(rest.join(' ')) + (a.ende || '.') : '';
      const fehlt = a.teile.filter((t, i) => weg.has(i) && !t.weg);
      if (fehlt.length) info.innerHTML = `<span class="schlecht">✘ unvollständig:</span> <i>${C.esc(restSatz)}</i><br>${C.inl(fehlt.map((t) => `*${t.t}* ${t.info ? 'ist ' + t.info : 'gehört dazu'}`).join('; '))} – das darfst du nicht weglassen.`;
      else info.innerHTML = `<span class="gut">✔ noch vollständig:</span> <i>${C.esc(restSatz)}</i><br>${C.inl(a.teile.filter((t, i) => weg.has(i)).map((t) => `*${t.t}*`).join(', '))} ${weg.size > 1 ? 'sind Adverbiale' : 'ist ein Adverbial'}.`;
    };
    if (a.titel) box.appendChild(h('p', { class: 'anim-titel', html: C.inl(a.titel) }));
    box.append(satz, info); zeige();
    return box;
  };

  /* Morph: Satz verändert sich Schritt für Schritt, mit Erklärung */
  A.morph = function (a) {
    const box = h('div', { class: 'anim' }); let n = 0;
    const satz = h('p', { class: 'satz gross morph' }); const info = h('div', { class: 'anim-frage' });
    const zur = h('button', { type: 'button', class: 'btn klein' }, '← Zurück'); const vor = h('button', { type: 'button', class: 'btn klein primaer' }, 'Nächster Schritt');
    const zaehl = h('span', { class: 'dezent klein' });
    const teilHtml = ([t, cls]) => {
      if (t === ',' || t === '.') return `<span class="mz${cls ? ' ' + cls : ''}">${t}</span>`;
      if (cls && C.FARBE[cls]) return `<span class="fk" style="--fk:${C.FARBE[cls]}">${C.inl(t)}</span>`;
      return `<span class="mz ${cls || ''}">${C.inl(t)}</span>`;
    };
    const zeige = () => {
      const z = a.zustaende[n];
      satz.innerHTML = z.teile.map((x) => (typeof x === 'string' ? teilHtml([x]) : teilHtml(x))).join(' ').replace(/ (<span class="mz[^"]*">[,.]<\/span>)/g, '$1');
      satz.classList.remove('wackeln'); void satz.offsetWidth; satz.classList.add('wackeln');
      info.innerHTML = C.md(z.text || '');
      zur.disabled = n === 0; vor.hidden = n >= a.zustaende.length - 1; zaehl.textContent = `Schritt ${n + 1} von ${a.zustaende.length}`;
    };
    zur.onclick = () => { if (n > 0) { n--; zeige(); } }; vor.onclick = () => { if (n < a.zustaende.length - 1) { n++; zeige(); } };
    if (a.titel) box.appendChild(h('p', { class: 'anim-titel', html: C.inl(a.titel) }));
    box.append(satz, info, h('div', { class: 'anim-knoepfe' }, zur, vor, zaehl)); zeige();
    return box;
  };

  /* Das finite Verb wandert ans Ende (Kästchen gleiten) */
  A.verbwandert = function (a) {
    const box = h('div', { class: 'anim' }); let ns = false;
    const satz = h('p', { class: 'satz gross umstell' }); const info = h('p', { class: 'anim-frage' });
    const btn = h('button', { type: 'button', class: 'btn klein' }, 'Zum Nebensatz machen');
    const key = (w) => w.toLowerCase().replace(/[.,]/g, '');
    const verb = key(a.verb || 'war'); const sub = key(a.sub || 'weil');
    const zeige = () => {
      const t = ns ? a.neben : a.haupt;
      satz.innerHTML = t.map((w, i) => { const k = key(w); const cls = k === verb ? 'sg verb-sg' : k === sub ? 'sg sub-sg' : 'sg'; return `<span class="${cls}" data-k="${C.esc(k)}">${C.esc(w)}</span>`; }).join(' ');
      const pos = t.findIndex((w) => key(w) === verb) + 1;
      info.innerHTML = ns ? `<b>Nebensatz:</b> Mit <b>${C.esc(a.sub || 'weil')}</b> wandert das finite Verb <b>${C.esc(a.verb || 'war')}</b> ans <b>Ende</b>. Allein stehen kann der Satz jetzt nicht mehr.` : `<b>Hauptsatz:</b> Das finite Verb <b>${C.esc(a.verb || 'war')}</b> steht an <b>${pos}. Stelle</b>.`;
      btn.textContent = ns ? 'Zurück zum Hauptsatz' : 'Zum Nebensatz machen';
    };
    btn.onclick = () => { ns = !ns; flip(satz, zeige); };
    box.append(h('p', { class: 'anim-titel' }, a.titel || 'Achte auf das finite Verb:'), satz, info, btn); zeige();
    return box;
  };
})();
