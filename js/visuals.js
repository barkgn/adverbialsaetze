/* Zeichnungen (SVG) und kleine Animationen ohne Ton */
(function () {
  const C = window.CORE; const { h } = C;
  const V = (window.VIS = {});

  V.titelbild = () => h('div', { class: 'titelbild', html: `
<svg viewBox="0 0 320 180" role="img" aria-label="Aktenmappe mit Lupe und Notizzettel">
  <rect x="0" y="0" width="320" height="180" fill="#e4eef1"/>
  <path d="M40 50h70l14 14h136v96H40z" fill="#1e5a6e"/>
  <path d="M48 70h204v82H48z" fill="#f6f1e4" stroke="#c4c9cf"/>
  <g font-family="Atkinson Hyperlegible, Arial" font-size="13" font-weight="700" fill="#1d232b">
    <text x="62" y="92">Wo?</text><text x="108" y="92">Wann?</text><text x="166" y="92">Warum?</text>
    <text x="62" y="116">Wie?</text><text x="108" y="116">Womit?</text><text x="174" y="116">Wozu?</text>
  </g>
  <path d="M222 132c0 9 7 12 12 12s12-3 12-12v-9h-24z M226 123h16 M229 144v5h10v-5" fill="none" stroke="#8e959e" stroke-width="3" stroke-dasharray="5 4"/>
  <circle cx="250" cy="58" r="26" fill="#fff" fill-opacity=".55" stroke="#1d232b" stroke-width="7"/>
  <path d="M269 77l26 26" stroke="#1d232b" stroke-width="10" stroke-linecap="round"/>
</svg>` });

  const motiv = {
    regal: '<rect x="20" y="20" width="120" height="70" fill="none" stroke="#545c66" stroke-width="3"/><path d="M20 55h120" stroke="#545c66" stroke-width="3"/><path d="M70 30h20v6c0 8-4 12-10 12s-10-4-10-12z M80 48v4 M74 52h12" fill="#b88300" stroke="#8a5a00" stroke-width="2"/><text x="112" y="80" font-size="10" fill="#545c66">17:10</text>',
    person: '<rect x="96" y="14" width="44" height="80" fill="#e4eef1" stroke="#545c66" stroke-width="3"/><circle cx="60" cy="30" r="9" fill="#1d232b"/><path d="M60 40l-8 24 M60 40l10 20 M52 64l-10 18 M52 64l14 16 M56 48l-14 6 M62 46l14 -4" stroke="#1d232b" stroke-width="5" stroke-linecap="round"/><path d="M20 40h18 M14 52h18 M20 64h18" stroke="#8e959e" stroke-width="3" stroke-linecap="round"/>',
    tasche: '<circle cx="64" cy="28" r="9" fill="#1d232b"/><path d="M64 38v30 M64 68l-10 20 M64 68l10 20 M64 46l-14 10" stroke="#1d232b" stroke-width="5" stroke-linecap="round"/><rect x="70" y="44" width="54" height="26" rx="6" fill="#1e5a6e"/><path d="M84 44v-6h26v6" fill="none" stroke="#1e5a6e" stroke-width="3"/>',
    uhr: '<circle cx="60" cy="52" r="34" fill="#fff" stroke="#1d232b" stroke-width="4"/><path d="M60 52V30 M60 52l-8 -14" stroke="#1d232b" stroke-width="4" stroke-linecap="round"/><rect x="104" y="18" width="36" height="74" fill="none" stroke="#545c66" stroke-width="3"/><path d="M104 18l-18 8v58l18 8" fill="#e4eef1" stroke="#545c66" stroke-width="3"/>',
  };
  V.fotos = (blk) => h('div', { class: 'fotos' }, blk.bilder.map((b, i) => h('figure', { class: 'foto' },
    h('div', { class: 'foto-bild', html: `<svg viewBox="0 0 160 106" role="img" aria-label="Zeichnung zu Foto ${i + 1}"><rect width="160" height="106" fill="#f3f4f6"/>${motiv[b.motiv] || ''}</svg>` }),
    h('figcaption', { html: `<b>Foto ${i + 1}:</b> ${C.inl(b.text)}` }))));

  V.wegweiser = () => h('div', { class: 'wegweiser', html: `
<svg viewBox="0 0 620 300" role="img" aria-label="Entscheidungsbaum zur Form des Adverbials">
  <defs><marker id="pf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#545c66"/></marker></defs>
  <g font-family="Atkinson Hyperlegible, Arial" font-size="13" fill="#1d232b">
    ${[['Satz mit Verb am Ende?', 20], ['Beginnt mit Präposition?', 90], ['Nomen mit Begleiter?', 160], ['Kann man es steigern?', 230]].map(([t, y]) => `<rect x="10" y="${y}" width="230" height="44" rx="6" fill="#e4eef1" stroke="#1e5a6e" stroke-width="2"/><text x="125" y="${y + 27}" text-anchor="middle" font-weight="700">${t}</text>`).join('')}
    ${[['Nebensatz', 20], ['Präpositionalgruppe', 90], ['Nominalgruppe', 160], ['Adjektiv', 230]].map(([t, y]) => `<path d="M240 ${y + 22}H380" stroke="#545c66" stroke-width="2" marker-end="url(#pf)"/><text x="300" y="${y + 16}" text-anchor="middle" font-size="12" fill="#2e7d4f" font-weight="700">ja</text><rect x="384" y="${y + 2}" width="200" height="40" fill="#fff" stroke="#1d232b" stroke-width="2"/><text x="484" y="${y + 27}" text-anchor="middle" font-weight="700">${t}</text>`).join('')}
    ${[64, 134, 204].map((y) => `<path d="M125 ${y}V${y + 24}" stroke="#545c66" stroke-width="2" marker-end="url(#pf)"/><text x="138" y="${y + 17}" font-size="12" fill="#a8431f" font-weight="700">nein</text>`).join('')}
    <path d="M125 274V290H380" stroke="#545c66" stroke-width="2" fill="none" marker-end="url(#pf)"/><text x="300" y="285" text-anchor="middle" font-size="12" fill="#a8431f" font-weight="700">nein</text>
    <rect x="384" y="272" width="200" height="26" fill="#fff" stroke="#1d232b" stroke-width="2"/><text x="484" y="290" text-anchor="middle" font-weight="700">Adverb</text>
  </g>
</svg>` });

  /* Animationen: Schritt für Schritt per Klick */
  V.anim = function (a) {
    if (V.anim2 && V.anim2[a.anim]) return V.anim2[a.anim](a);
    const box = h('div', { class: 'anim' });
    if (a.anim === 'schritte') {
      let n = 1;
      const liste = h('ol', { class: 'schritte' });
      const btn = h('button', { type: 'button', class: 'btn klein' }, 'Nächster Schritt');
      const zeige = () => { liste.innerHTML = ''; a.schritte.slice(0, n).forEach((s) => liste.appendChild(h('li', { class: 'neu', html: C.inl(s) }))); btn.hidden = n >= a.schritte.length; };
      btn.onclick = () => { n++; zeige(); };
      if (a.titel) box.appendChild(h('p', { class: 'anim-titel', html: C.inl(a.titel) }));
      box.append(liste, btn); zeige();
    } else if (a.anim === 'wachsen') {
      let n = 0;
      const satz = h('p', { class: 'satz gross' }); const frage = h('p', { class: 'anim-frage' });
      const btn = h('button', { type: 'button', class: 'btn klein' }, 'Nächste Frage');
      const zeige = () => {
        // Reihenfolge wie im Beispielsatz: Herr Brandt schloss [am Freitag] [wegen des Gewitters] [schnell] die Turnhalle ab.
        const ziel = [a.basis[0], a.basis[1]]; a.schritte.slice(0, n).forEach((s) => ziel.push({ t: s.teil, f: s.f })); ziel.push(a.basis[2], a.basis[3]);
        satz.innerHTML = ziel.map((x) => (typeof x === 'string' ? C.esc(x) : `<span class="fk" style="--fk:${C.FARBE[x.f]}">${C.esc(x.t)}</span>`)).join(' ');
        frage.innerHTML = n ? `<b>${C.esc(a.schritte[n - 1].frage)}</b> → <span class="fk" style="--fk:${C.FARBE[a.schritte[n - 1].f]}">${C.esc(a.schritte[n - 1].teil)}</span> (${C.esc(a.schritte[n - 1].f)})` : 'Klicke auf „Nächste Frage“.';
        btn.hidden = n >= a.schritte.length;
      };
      btn.onclick = () => { n++; zeige(); };
      box.append(satz, frage, btn); zeige();
    } else if (a.anim === 'umstellen') {
      let neu = false;
      const satz = h('p', { class: 'satz gross' });
      const btn = h('button', { type: 'button', class: 'btn klein' }, 'Umstellen');
      const zeige = () => { const t = neu ? a.neu : a.satz; satz.innerHTML = t.map((x, i) => `<span class="sg">${C.esc(i === 0 ? x[0].toUpperCase() + x.slice(1) : x)}</span>`).join(' ') + '.'; btn.textContent = neu ? 'Zurück' : 'Umstellen'; };
      btn.onclick = () => { neu = !neu; satz.classList.remove('wackeln'); void satz.offsetWidth; satz.classList.add('wackeln'); zeige(); };
      box.append(satz, btn); zeige();
    } else if (a.anim === 'verbwandert') {
      let ns = false;
      const satz = h('p', { class: 'satz gross' });
      const btn = h('button', { type: 'button', class: 'btn klein' }, 'Zum Nebensatz machen');
      const zeige = () => {
        const t = ns ? a.neben : a.haupt;
        satz.innerHTML = t.map((w) => (/^(war|war\.)$/.test(w) ? `<span class="verb">${C.esc(w)}</span>` : /^weil$/.test(w) ? `<span class="sub">${C.esc(w)}</span>` : C.esc(w))).join(' ');
        btn.textContent = ns ? 'Zurück zum Hauptsatz' : 'Zum Nebensatz machen';
      };
      btn.onclick = () => { ns = !ns; satz.classList.remove('wackeln'); void satz.offsetWidth; satz.classList.add('wackeln'); zeige(); };
      box.append(h('p', { class: 'anim-titel' }, 'Achte auf das finite Verb:'), satz, btn); zeige();
    } else if (a.anim === 'ersatz') {
      let an = false;
      const satz = h('p', { class: 'satz gross' }); const info = h('p', { class: 'anim-frage' });
      const btn = h('button', { type: 'button', class: 'btn klein' }, `Durch „${a.wort}“ ersetzen`);
      const zeige = () => {
        satz.innerHTML = an ? C.esc(a.neu).replace(a.wort, `<span class="fk" style="--fk:${C.FARBE[a.f]}">${a.wort}</span>`) : `${C.esc(a.satz)} <span class="ns">${C.esc(a.ns)}</span>`;
        info.innerHTML = an ? `Das passt. Der Nebensatz ist also <b>${a.f}</b>.` : '';
        btn.textContent = an ? 'Zurück' : `Durch „${a.wort}“ ersetzen`;
      };
      btn.onclick = () => { an = !an; zeige(); };
      box.append(satz, info, btn); zeige();
    } else if (a.anim === 'weglassen') {
      a.beispiele.forEach((b) => {
        let weg = false;
        const satz = h('p', { class: 'satz' }); const btn = h('button', { type: 'button', class: 'btn klein' }, 'Nebensatz weglassen');
        const zeige = () => {
          satz.innerHTML = weg ? `<span class="${b.ok ? 'ok' : 'nok'}">${C.esc(b.haupt)}.</span> ${b.ok ? '✔ vollständig' : '✘ unvollständig'}` : `${C.esc(b.haupt)}<span class="ns">${C.esc(b.ns)}</span>.`;
          btn.textContent = weg ? 'Zurück' : 'Nebensatz weglassen';
        };
        btn.onclick = () => { weg = !weg; zeige(); };
        box.append(h('div', { class: 'weglass' }, satz, btn)); zeige();
      });
    }
    return box;
  };
})();
