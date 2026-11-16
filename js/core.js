/* Kern: Hilfsfunktionen, Markdown, Bewertung, Aufgaben-Bausteine */
(function () {
  const C = (window.CORE = {});

  /* ── DOM ── */
  C.h = function (tag, attrs, ...kids) {
    const e = document.createElement(tag);
    if (attrs) for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? '' : v);
    }
    kids.flat(Infinity).forEach((k) => { if (k == null || k === false) return; e.appendChild(typeof k === 'string' || typeof k === 'number' ? document.createTextNode(String(k)) : k); });
    return e;
  };
  C.esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  C.inl = (s) => C.esc(s).replace(/\*\*\*([^*]+)\*\*\*/g, '<b><i>$1</i></b>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/\*([^*]+)\*/g, '<i>$1</i>');
  C.md = function (src) {
    const lines = String(src || '').split('\n');
    let out = '', i = 0;
    const flushPara = (buf) => { if (buf.length) out += `<p>${buf.map(C.inl).join('<br>')}</p>`; };
    let para = [];
    while (i < lines.length) {
      const l = lines[i];
      if (/^\s*$/.test(l)) { flushPara(para); para = []; i++; continue; }
      if (/^\|/.test(l)) {
        flushPara(para); para = [];
        const rows = []; while (i < lines.length && /^\|/.test(lines[i])) rows.push(lines[i++]);
        const cells = (r) => r.replace(/^\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());
        const head = cells(rows[0]); const body = rows.slice(2).map(cells);
        out += `<div class="tab-wrap"><table class="kt-tab"><thead><tr>${head.map((c) => `<th>${C.inl(c)}</th>`).join('')}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${C.inl(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
        continue;
      }
      if (/^- /.test(l)) { flushPara(para); para = []; const it = []; while (i < lines.length && /^- /.test(lines[i])) it.push(lines[i++].slice(2)); out += `<ul>${it.map((x) => `<li>${C.inl(x)}</li>`).join('')}</ul>`; continue; }
      if (/^\d+\. /.test(l)) { flushPara(para); para = []; const it = []; while (i < lines.length && /^\d+\. /.test(lines[i])) it.push(lines[i++].replace(/^\d+\. /, '')); out += `<ol>${it.map((x) => `<li>${C.inl(x)}</li>`).join('')}</ol>`; continue; }
      if (/^#{2,3} /.test(l)) { flushPara(para); para = []; out += `<h4>${C.inl(l.replace(/^#+ /, ''))}</h4>`; i++; continue; }
      para.push(l); i++;
    }
    flushPara(para);
    return out;
  };
  C.mdEl = (src, cls) => C.h('div', { class: 'md ' + (cls || ''), html: C.md(src) });

  /* stabiler Zufall je Aufgabe */
  C.seeded = function (seed) { let x = 0; for (const ch of String(seed)) x = (x * 31 + ch.charCodeAt(0)) >>> 0; return () => { x = (x * 1664525 + 1013904223) >>> 0; return x / 4294967296; }; };
  C.shuffle = (arr, seed) => { const r = C.seeded(seed); const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  /* Farben der Funktionen (gleich im ganzen Lernjob) */
  C.FARBE = { lokal: '#2e7d4f', temporal: '#2f5fa8', kausal: '#a8431f', modal: '#7a3e9d', instrumental: '#8a5a00', final: '#0f7480' };

  /* ── Aufgabentypen: Hilfen ── */
  C.parseTap = function (s) {
    const units = []; const re = /\[([^\]]+)\]|\{([^}]+)\}|([^[{]+)/g; let m;
    while ((m = re.exec(s))) {
      if (m[1] != null) units.push({ t: m[1], tap: true, ok: true });
      else if (m[2] != null) units.push({ t: m[2], tap: true, ok: false });
      else if (m[3].trim()) units.push({ t: m[3].trim(), tap: false });
    }
    return units;
  };
  C.commaParse = function (target) {
    const toks = target.split(' ');
    const words = toks.map((w) => w.replace(/,$/, ''));
    const gaps = []; toks.forEach((w, i) => { if (/,$/.test(w)) gaps.push(i); });
    return { words, gaps };
  };
  const norm = (s) => String(s || '').replace(/[„“"]/g, '').replace(/\s+/g, ' ').replace(/\s+([,.])/g, '$1').trim().replace(/[.!]$/, '').toLowerCase();
  const ohneKomma = (s) => norm(s).replace(/,/g, '');
  const woerterVon = (s) => String(s || '').replace(/[„“".!?]/g, '').split(/\s+/).filter(Boolean);

  /* Satzgefüge-Prüfung für freie Antworten */
  C.satzCheck = function (item, text) {
    const t = String(text || '').trim();
    const w = woerterVon(t.replace(/,/g, ' , '));
    const lw = w.map((x) => x.toLowerCase());
    const subs = (item.subs || []).map((x) => x.toLowerCase());
    let si = -1;
    for (let i = 0; i < lw.length; i++) if (subs.includes(lw[i]) && (i === 0 || lw[i - 1] === ',')) { si = i; break; }
    const hasSub = si > -1;
    const hasComma = lw.includes(',');
    let verbOk = false;
    if (hasSub) {
      let end = lw.indexOf(',', si); if (end === -1) end = lw.length;
      const letztes = lw[end - 1];
      verbOk = (item.verbs || []).map((x) => x.toLowerCase()).includes(letztes);
    }
    let vorfeldOk = true;
    if (item.vorfeldVerb && lw.length) {
      const k = lw.indexOf(',');
      vorfeldOk = k > -1 && lw[k + 1] === item.vorfeldVerb.toLowerCase();
    }
    return { hasSub, hasComma, verbOk, vorfeldOk };
  };

  /* ── Bewertung ── liefert { ok, err, review } */
  C.grade = function (item, v) {
    switch (item.type) {
      case 'tap': {
        const u = C.parseTap(item.s).filter((x) => x.tap);
        const sel = new Set(v || []);
        const ok = u.every((x, i) => x.ok === sel.has(i));
        return { ok, err: null };
      }
      case 'choice': {
        const ok = Array.isArray(item.answer) ? item.answer.includes(v) : v === item.answer;
        let err = null;
        if (!ok) err = (item.err && item.err[v]) || (item.errFn === 'func' ? LJ.funcErr(v, item.answer) : null);
        return { ok, err };
      }
      case 'selects': {
        const vals = v || [];
        let err = null; let ok = true;
        item.rows.forEach((r, i) => {
          const good = Array.isArray(r.answer) ? r.answer.includes(vals[i]) : vals[i] === r.answer;
          if (!good) { ok = false; if (!err) err = (r.errFn === 'func' ? LJ.funcErr(vals[i], r.answer) : null) || item.errAll || null; }
        });
        return { ok, err };
      }
      case 'comma': {
        const { gaps } = C.commaParse(item.target);
        const sel = (v && v.gaps) || [];
        const missing = gaps.some((g) => !sel.includes(g));
        const extra = sel.some((g) => !gaps.includes(g));
        let ok = !missing && !extra;
        let err = missing ? 'F6' : extra ? 'F7' : null;
        if (ok && item.extra) { ok = v.extra === item.extra.answer; if (!ok) err = null; }
        return { ok, err };
      }
      case 'order': {
        const ok = item.accepted.some((a) => a.join('|') === (v || []).join('|'));
        return { ok, err: null };
      }
      case 'text': {
        const n = norm(v);
        if (!n) return { ok: false, err: null, leer: true };
        if (item.accepted.some((a) => norm(a) === n)) return { ok: true };
        if (item.kurz) return { ok: false, err: null };
        if (item.accepted.some((a) => ohneKomma(a) === ohneKomma(v))) return { ok: false, err: 'F6' };
        const c = C.satzCheck(item, v);
        if (item.subs) {
          if (!c.hasSub) return { ok: false, err: null, msg: `Verwende eine passende Subjunktion (z. B. *${item.subs.join('*, *')}*) am Anfang des Nebensatzes.` };
          if (!c.hasComma) return { ok: false, err: 'F6' };
          if (!c.verbOk) return { ok: false, err: 'VERB' };
          if (!c.vorfeldOk) return { ok: false, err: 'VORFELD' };
          return { ok: true, review: true };
        }
        if (!c.vorfeldOk && c.hasComma) return { ok: false, err: 'VORFELD' };
        return { ok: false, err: c.hasComma ? null : 'F6' };
      }
      case 'open': return { ok: !!String(v || '').trim(), review: true };
      default: return { ok: false };
    }
  };

  /* Punkte im Test bzw. Probetest je Aufgabe */
  C.scoreTask = function (task, answers) {
    const A = answers || {};
    const items = task.items;
    let p = 0; const detail = [];
    if (task.score === 'tapCount') {
      const it = items[0]; const u = C.parseTap(it.s).filter((x) => x.tap); const sel = new Set(A[it.id] || []);
      let r = 0, f = 0; u.forEach((x, i) => { if (sel.has(i)) { if (x.ok) r++; else f++; } });
      p = Math.max(0, r - f); detail.push({ id: it.id, p, max: task.punkte });
    } else if (task.score === 'pairs') {
      for (let i = 0; i < items.length; i += 2) {
        const ok = C.grade(items[i], A[items[i].id]).ok && C.grade(items[i + 1], A[items[i + 1].id]).ok;
        p += ok ? 1 : 0; detail.push({ id: items[i].id, p: ok ? 1 : 0, max: 1 });
      }
    } else if (task.score === 'text2') {
      items.forEach((it) => {
        const v = A[it.id]; let q = 0;
        if (it.accepted.some((a) => norm(a) === norm(v))) q = 2;
        else if (String(v || '').trim()) { const c = C.satzCheck(it, v); q = (c.hasSub ? 1 : 0) + (c.hasSub && c.hasComma && c.verbOk ? 1 : 0); }
        p += q; detail.push({ id: it.id, p: q, max: 2, review: true });
      });
    } else {
      items.forEach((it) => { const ok = C.grade(it, A[it.id]).ok; p += ok ? 1 : 0; detail.push({ id: it.id, p: ok ? 1 : 0, max: 1 }); });
    }
    return { p: Math.min(p, task.punkte), max: task.punkte, detail };
  };
  C.note = function (p) { return p >= 17.5 ? '1' : p >= 15 ? '2' : p >= 12.5 ? '3' : p >= 10 ? '4' : p >= 5 ? '5' : '6'; };

  /* Lösung als Text (für Anzeige und Dashboard) */
  C.loesungText = function (item) {
    switch (item.type) {
      case 'tap': return C.parseTap(item.s).filter((x) => x.tap && x.ok).map((x) => x.t.replace(/[.,]$/, '')).join(' · ');
      case 'choice': return Array.isArray(item.answer) ? item.answer.join(' / ') : item.answer;
      case 'selects': return item.rows.map((r) => `${r.label.replace(/\*/g, '')}: ${Array.isArray(r.answer) ? r.answer.join(' / ') : r.answer}`).join(' · ');
      case 'comma': return item.target + (item.extra ? ` (${item.extra.answer})` : '');
      case 'order': return item.accepted[0].join(' ');
      case 'text': return item.accepted[0];
      case 'open': return item.beispiel || '';
      default: return '';
    }
  };
  C.antwortText = function (item, v) {
    if (v == null) return '–';
    switch (item.type) {
      case 'tap': { const u = C.parseTap(item.s).filter((x) => x.tap); return (v || []).map((i) => (u[i] ? u[i].t.replace(/[.,]$/, '') : '?')).join(' · ') || '–'; }
      case 'selects': return item.rows.map((r, i) => `${r.label.replace(/\*/g, '')}: ${v[i] || '–'}`).join(' · ');
      case 'comma': { const { words } = C.commaParse(item.target); return words.map((w, i) => w + ((v.gaps || []).includes(i) ? ',' : '')).join(' ') + (v.extra ? ` (${v.extra})` : ''); }
      case 'order': return (v || []).join(' ');
      default: return String(v);
    }
  };

  /* ── Widgets ── jedes Widget: { el, get(), set(v), lock(), showSolution() } */
  C.widget = function (item, opts = {}) {
    const W = C.widgets[item.type]; if (!W) return { el: C.h('p', null, 'Unbekannter Aufgabentyp'), get: () => null, set() {}, lock() {}, showSolution() {} };
    return W(item, opts);
  };
  C.widgets = {
    tap(item, o) {
      const units = C.parseTap(item.s); let ti = -1;
      const sel = new Set(o.value || []);
      const wrap = C.h('div', { class: 'satz tap' });
      const btns = [];
      units.forEach((u) => {
        if (!u.tap) { wrap.appendChild(C.h('span', { class: 'satz-txt', html: C.inl(u.t) })); return; }
        ti++; const idx = ti;
        const b = C.h('button', { type: 'button', class: 'tap-u' + (sel.has(idx) ? ' an' : ''), html: C.inl(u.t), 'aria-pressed': sel.has(idx) ? 'true' : 'false', onclick: () => { if (b.disabled) return; sel.has(idx) ? sel.delete(idx) : sel.add(idx); b.classList.toggle('an', sel.has(idx)); b.setAttribute('aria-pressed', sel.has(idx)); o.onChange && o.onChange(); } });
        b._u = u; btns.push(b); wrap.appendChild(b);
      });
      return {
        el: wrap, get: () => [...sel].sort((a, b) => a - b),
        lock: () => btns.forEach((b) => (b.disabled = true)),
        showSolution: () => btns.forEach((b) => { if (b._u.ok) b.classList.add('loesung'); if (b.classList.contains('an') && !b._u.ok) b.classList.add('falsch'); }),
      };
    },
    choice(item, o) {
      let val = o.value ?? null;
      const wrap = C.h('div', { class: 'optionen' + (item.options.length > 3 || item.options.some((x) => x.length > 30) ? ' spalte' : '') });
      const btns = item.options.map((opt) => {
        const b = C.h('button', { type: 'button', class: 'opt' + (val === opt ? ' an' : ''), html: C.inl(opt), onclick: () => { if (b.disabled) return; val = opt; btns.forEach((x) => x.classList.toggle('an', x === b)); o.onChange && o.onChange(); } });
        b._v = opt; if (item.errFn === 'func' && C.FARBE[opt]) b.style.setProperty('--fk', C.FARBE[opt]);
        wrap.appendChild(b); return b;
      });
      return {
        el: wrap, get: () => val,
        lock: () => btns.forEach((b) => (b.disabled = true)),
        showSolution: () => btns.forEach((b) => { const good = Array.isArray(item.answer) ? item.answer.includes(b._v) : b._v === item.answer; if (good) b.classList.add('loesung'); else if (b._v === val) b.classList.add('falsch'); }),
      };
    },
    selects(item, o) {
      const vals = (o.value || []).slice();
      const wrap = C.h('div', { class: 'selects' });
      const sels = item.rows.map((r, i) => {
        const s = C.h('select', { 'aria-label': r.label.replace(/\*/g, ''), onchange: () => { vals[i] = s.value || null; o.onChange && o.onChange(); } },
          C.h('option', { value: '' }, '– wählen –'), r.options.map((op) => C.h('option', { value: op, selected: vals[i] === op }, op)));
        const z = C.h('label', { class: 'sel-zeile' }, C.h('span', { class: 'sel-label', html: C.inl(r.label) }), s, C.h('span', { class: 'sel-lsg' }));
        wrap.appendChild(z); s._z = z; s._r = r; return s;
      });
      return {
        el: wrap, get: () => sels.map((s) => s.value || null),
        lock: () => sels.forEach((s) => (s.disabled = true)),
        showSolution: () => sels.forEach((s) => { const r = s._r; const good = Array.isArray(r.answer) ? r.answer.includes(s.value) : s.value === r.answer; s._z.classList.add(good ? 'gut' : 'schlecht'); if (!good) s._z.querySelector('.sel-lsg').textContent = '→ ' + (Array.isArray(r.answer) ? r.answer.join(' / ') : r.answer); }),
      };
    },
    comma(item, o) {
      const { words, gaps } = C.commaParse(item.target);
      const v = o.value || {}; const sel = new Set(v.gaps || []); let extra = v.extra || null;
      const wrap = C.h('div', { class: 'komma-wrap' });
      const satz = C.h('div', { class: 'satz komma' });
      const gapBtns = [];
      words.forEach((w, i) => {
        satz.appendChild(C.h('span', { class: 'kw' }, w));
        if (i < words.length - 1) {
          const g = C.h('button', { type: 'button', class: 'gap' + (sel.has(i) ? ' an' : ''), 'aria-label': `Komma nach „${w}“`, onclick: () => { if (g.disabled) return; sel.has(i) ? sel.delete(i) : sel.add(i); g.classList.toggle('an', sel.has(i)); o.onChange && o.onChange(); } }, C.h('span', null, ','));
          g._i = i; gapBtns.push(g); satz.appendChild(g);
        }
      });
      wrap.appendChild(satz);
      let exSel = null;
      if (item.extra) {
        exSel = C.h('select', { onchange: () => { extra = exSel.value || null; o.onChange && o.onChange(); } }, C.h('option', { value: '' }, '– wählen –'), item.extra.options.map((op) => C.h('option', { value: op, selected: extra === op }, op)));
        wrap.appendChild(C.h('label', { class: 'sel-zeile' }, C.h('span', { class: 'sel-label' }, item.extra.label), exSel, C.h('span', { class: 'sel-lsg' })));
      }
      return {
        el: wrap, get: () => ({ gaps: [...sel].sort((a, b) => a - b), extra }),
        lock: () => { gapBtns.forEach((g) => (g.disabled = true)); if (exSel) exSel.disabled = true; },
        showSolution: () => {
          gapBtns.forEach((g) => { if (gaps.includes(g._i)) g.classList.add('loesung'); else if (g.classList.contains('an')) g.classList.add('falsch'); });
          if (exSel && exSel.value !== item.extra.answer) exSel.parentNode.querySelector('.sel-lsg').textContent = '→ ' + item.extra.answer;
        },
      };
    },
    order(item, o) {
      let seq = (o.value || []).slice();
      const pool = C.shuffle(item.tiles.map((t, i) => ({ t, i })), item.id);
      const wrap = C.h('div', { class: 'order' });
      const zeile = C.h('div', { class: 'order-zeile', 'aria-label': 'Dein Satz' });
      const vorrat = C.h('div', { class: 'order-vorrat' });
      let locked = false;
      const used = () => { const u = []; const copy = seq.slice(); pool.forEach((p) => { const k = copy.indexOf(p.t); if (k > -1) { u.push(p.i); copy.splice(k, 1); } }); return u; };
      const render = () => {
        zeile.innerHTML = ''; vorrat.innerHTML = '';
        if (!seq.length) zeile.appendChild(C.h('span', { class: 'order-leer' }, 'Klicke unten die Bausteine in der richtigen Reihenfolge an.'));
        seq.forEach((t, k) => zeile.appendChild(C.h('button', { type: 'button', class: 'tile in', html: C.inl(t), onclick: () => { if (locked) return; seq.splice(k, 1); render(); o.onChange && o.onChange(); } })));
        const u = used();
        pool.forEach((p) => { if (u.includes(p.i)) return; vorrat.appendChild(C.h('button', { type: 'button', class: 'tile', html: C.inl(p.t), onclick: () => { if (locked) return; seq.push(p.t); render(); o.onChange && o.onChange(); } })); });
      };
      render();
      wrap.append(zeile, vorrat);
      return { el: wrap, get: () => seq.slice(), lock: () => { locked = true; wrap.classList.add('locked'); }, showSolution: () => { wrap.appendChild(C.h('p', { class: 'lsg-zeile', html: '→ ' + C.inl(item.accepted[0].join(' ')) })); } };
    },
    text(item, o) {
      const ta = item.kurz ? C.h('input', { type: 'text', class: 'eingabe kurz', placeholder: 'Hier eintippen …', spellcheck: 'false', autocomplete: 'off', oninput: () => o.onChange && o.onChange(), onkeydown: (e) => { if (e.key === 'Enter' && o.onEnter) { e.preventDefault(); o.onEnter(); } } })
        : C.h('textarea', { class: 'eingabe', rows: 2, placeholder: 'Schreibe hier den ganzen Satz …', spellcheck: 'false', oninput: () => o.onChange && o.onChange() });
      ta.value = o.value || '';
      const wrap = C.h('div', { class: 'text-wrap' }, ta);
      return { el: wrap, get: () => ta.value, lock: () => (ta.disabled = true), showSolution: () => wrap.appendChild(C.h('p', { class: 'lsg-zeile', html: '→ ' + C.inl(item.accepted[0]) })) };
    },
    open(item, o) {
      const ta = C.h('textarea', { class: 'eingabe' + (item.gross ? ' gross' : ''), rows: item.gross ? 12 : 4, placeholder: 'Schreibe hier …', oninput: () => o.onChange && o.onChange() });
      ta.value = o.value != null ? o.value : item.vorlage || '';
      const wrap = C.h('div', { class: 'text-wrap' }, ta);
      return { el: wrap, get: () => ta.value, lock: () => (ta.disabled = true), showSolution: () => { if (item.beispiel) wrap.appendChild(C.h('div', { class: 'beispiel' }, C.h('b', null, 'Beispiellösung zum Vergleich: '), C.h('span', { html: C.inl(item.beispiel) }))); } };
    },
  };

  /* Zeit */
  C.zeitSeit = function (iso) {
    if (!iso) return '–';
    const s = (Date.now() - new Date(iso).getTime()) / 1000;
    if (s < 90) return 'gerade eben';
    if (s < 3600) return `vor ${Math.round(s / 60)} Min.`;
    if (s < 86400) return `vor ${Math.round(s / 3600)} Std.`;
    return new Date(iso).toLocaleDateString('de-DE');
  };
})();

/* Eigene Dialoge (funktionieren auch dort, wo der Browser confirm/alert/prompt sperrt) */
(function () {
  const C = window.CORE; const { h } = C;
  function dialog(text, art, vorgabe) {
    return new Promise((resolve) => {
      const inp = art === 'eingabe' ? h('input', { type: 'text', value: vorgabe || '' }) : null;
      const zu = (wert) => { hinter.remove(); resolve(wert); };
      const ok = h('button', { class: 'btn primaer', onclick: () => zu(art === 'eingabe' ? inp.value : true) }, art === 'info' ? 'OK' : art === 'eingabe' ? 'Übernehmen' : 'Ja');
      const ab = art === 'info' ? null : h('button', { class: 'btn', onclick: () => zu(art === 'eingabe' ? null : false) }, 'Abbrechen');
      const hinter = h('div', { class: 'dialog-hinter', role: 'dialog', 'aria-modal': 'true' }, h('div', { class: 'dialog' }, C.mdEl(text), inp, h('div', { class: 'aktionen' }, ok, ab)));
      document.body.appendChild(hinter); (inp || ok).focus();
      hinter.addEventListener('keydown', (e) => { if (e.key === 'Escape') zu(art === 'info' ? true : art === 'eingabe' ? null : false); if (e.key === 'Enter' && inp) zu(inp.value); });
    });
  }
  C.frage = (t) => dialog(t, 'frage');
  C.info = (t) => dialog(t, 'info');
  C.eingabe = (t, v) => dialog(t, 'eingabe', v);
  C.drucken = () => { try { window.print(); } catch (e) { C.info('Drucken ist in dieser Ansicht nicht möglich.'); } };
})();
