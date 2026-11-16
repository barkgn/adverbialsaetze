/* Erklärungen: gezielter Tipp nach dem ersten Fehler und ausführliche Begründung nach der Auflösung
 * Aufbau der Begründung: „Warum deine Antwort nicht stimmt“ + „So findest du es heraus“ (Probe am konkreten Satz) */
(function () {
  const C = window.CORE;
  const E = (C.ERKL = {});
  const FR = { lokal: 'Wo? Wohin? Woher?', temporal: 'Wann? Wie lange? Seit wann?', kausal: 'Warum?', modal: 'Wie? Auf welche Weise?', instrumental: 'Womit? Wodurch?', final: 'Wozu?' };
  const FR1 = { lokal: 'Wo?', temporal: 'Wann?', kausal: 'Warum?', modal: 'Wie?', instrumental: 'Womit?', final: 'Wozu?' };
  const frage1 = (A, mark) => {
    if (A !== 'lokal') return FR1[A];
    const m = String(mark || '').toLowerCase();
    if (/^(aus|von)\b/.test(m)) return 'Woher?';
    if (/^(ins|zur|zum|nach|in den|in die|auf den|auf die|an den|an die|bis)\b/.test(m)) return 'Wohin?';
    return 'Wo?';
  };
  const WAS = { lokal: 'einen Ort oder eine Richtung', temporal: 'einen Zeitpunkt oder eine Dauer', kausal: 'einen Grund', modal: 'die Art und Weise', instrumental: 'ein Mittel oder Werkzeug', final: 'einen Zweck oder ein Ziel' };
  const ERSATZ = { lokal: 'dort', temporal: 'dann', kausal: 'deshalb', modal: 'so', final: 'dazu', instrumental: 'damit' };
  const SUBS = { temporal: 'als, nachdem, bevor, während, bis, sobald', kausal: 'weil, da', final: 'damit', modal: 'indem, ohne dass', lokal: 'wo, wohin' };
  const SUBFN = { weil: 'kausal', da: 'kausal', als: 'temporal', nachdem: 'temporal', bevor: 'temporal', während: 'temporal', wenn: 'temporal', seit: 'temporal', seitdem: 'temporal', bis: 'temporal', sobald: 'temporal', damit: 'final', indem: 'modal', wo: 'lokal', wohin: 'lokal', woher: 'lokal' };
  const SUBJ = Object.keys(SUBFN).concat(['dass', 'ob', 'obwohl', 'ohne']);
  const KLEIN = new Set('am im in ins nach wegen seit um aus mit zur zum für vor bei beim gestern heute morgen der die das den dem des ein eine einen einem einer alle jeden jede letzte letzten während bis auf unter hier dort deshalb er sie es wir ihr ich du man nachdem bevor als weil damit dann danach jetzt schnell leise'.split(' '));

  const markiert = (p) => { const m = String(p || '').match(/\*\*([^*]+)\*\*/g); return m ? m[m.length - 1].replace(/\*\*/g, '').trim() : ''; };
  const erstes = (s) => String(s).split(/\s+/)[0].replace(/[.,]/g, '');
  const letztes = (s) => { const w = String(s).replace(/[.,!?]+$/, '').split(/\s+/); return w[w.length - 1]; };
  const opts = (it) => (it.options || []).join('|');
  const istFunc = (it) => it.errFn === 'func' || opts(it) === LJ.FUNKTIONEN.join('|');
  const istForm = (it) => opts(it) === LJ.FORMEN.join('|');
  const istGlied = (it) => opts(it) === LJ.GLIED.join('|');
  const gross1 = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const klein1 = (s) => (KLEIN.has(String(s).split(/\s+/)[0].toLowerCase()) ? s.charAt(0).toLowerCase() + s.slice(1) : s);
  const ohnePunkt = (s) => String(s).replace(/[.,!?]+$/, '').trim();
  const sauber = (s) => String(s).replace(/\*+/g, '').replace(/\s+/g, ' ').replace(/\s+([,.])/g, '$1').replace(/,\s*\./g, '.').replace(/^,\s*/, '').trim();

  /* der Satz mit der Markierung (ohne Vorspann wie „Objekt oder Adverbial?“) */
  function satzMitMarke(p) {
    const zeilen = String(p || '').split('\n').filter((l) => l.includes('**'));
    let z = zeilen.length ? zeilen[zeilen.length - 1] : String(p || '');
    z = z.replace(/^[^*]*?\?\s+(?=[^?]*\*\*)/, '');
    return z.trim();
  }
  const luecke = (p) => sauber(satzMitMarke(p).replace(/\*\*[^*]+\*\*/, '___'));
  function ersetze(p, wort) {
    const z = satzMitMarke(p); const start = /^\*\*/.test(z.replace(/^\*(?!\*)/, ''));
    let r = sauber(z.replace(/,?\s*\*\*[^*]+\*\*\s*,?/, (m) => (/^,/.test(m) && /,$/.test(m) ? ` ${wort} ` : /^,/.test(m) ? ` ${wort}` : ` ${wort} `)));
    return start ? gross1(r.replace(/^\s*/, '')) : r;
  }
  function ohne(p, v2) {
    const z = satzMitMarke(p); const start = /^\*?\*\*/.test(z);
    let r = sauber(z.replace(/,?\s*\*\*[^*]+\*\*\s*,?/, ' ')).replace(/\s+\./, '.');
    if (!start) return r;
    if (!v2) return '… ' + r;
    const w = r.replace(/\.$/, '').split(/\s+/);
    let n = 1; if (/^(der|die|das|den|dem|ein|eine|einen)$/i.test(w[1] || '') || (/^[A-ZÄÖÜ]/.test(w[1] || '') && /^[A-ZÄÖÜ]/.test(w[2] || ''))) n = 2;
    return gross1([...w.slice(1, 1 + n), w[0], ...w.slice(1 + n)].join(' ')) + '.';
  }
  /* Adverbialsatz durch ein Wort ersetzen: vorne direkt, hinten nach dem finiten Verb */
  function ersetzeAdv(p, wort) {
    const z = satzMitMarke(p);
    if (/^\*?\*\*/.test(z)) return ersetze(p, gross1(wort)).replace(/^./, (c) => c.toUpperCase());
    const r = ohne(p).replace(/\.$/, ''); if (new RegExp('\\b' + wort + '\\b').test(r)) return null;
    const w = r.split(/\s+/); const n = /^[A-ZÄÖÜ]/.test(w[1] || '') ? 2 : 1;
    return [...w.slice(0, n + 1), wort, ...w.slice(n + 1)].join(' ') + '.';
  }
  /* Tap-Sätze: Einheiten */
  const einheiten = (it) => C.parseTap(it.s).map((u) => ({ ...u, t: u.t.replace(/\*/g, '') }));
  function satzAus(teile) {
    if (!teile.length) return '';
    const t = teile.map((x, i) => (i === 0 ? gross1(ohnePunkt(x)) : ohnePunkt(i === 0 ? x : klein1(x))));
    return t.join(' ').replace(/\s+,/g, ',') + '.';
  }
  /* Satz ohne bestimmte Einheiten; rutscht das Verb nach vorne, rückt das nächste Satzglied davor */
  function satzOhne(units, wegIdx) {
    const rest = units.map((u, i) => ({ u, i })).filter(({ i }) => !wegIdx.includes(i));
    let teile = rest.map(({ u }) => u.t);
    if (wegIdx.includes(0) && rest.length >= 2 && rest[0].i === 1) teile = [klein1(teile[1]), teile[0], ...teile.slice(2)];
    return satzAus(teile.map((t, k) => (k === 0 ? t : klein1(t))));
  }
  /* Satzglied an den Anfang stellen (Umstellprobe) */
  function nachVorne(units, idx) {
    if (idx === 0) return null;
    const verbIdx = idx === 1 ? 2 : 1;
    const rest = units.filter((_, i) => i !== idx && i !== verbIdx).map((u) => klein1(u.t));
    return satzAus([units[idx].t, units[verbIdx].t, ...rest]);
  }
  const kursiv = (s) => `*${String(s).replace(/\*/g, '')}*`;

  /* ── Funktion ── */
  function funcBegruendung(A, X, prompt) {
    const mark = markiert(prompt); const lz = luecke(prompt);
    const zeilen = [];
    if (X && X !== A && FR[X]) {
      zeilen.push('### Warum nicht *' + X + '*?', `*${X}* würde auf *${FR[X]}* antworten. Probier es: *${FR1[X]}* → passt nicht, denn *${mark}* nennt nicht ${WAS[X]}, sondern ${WAS[A]}.`);
      const f = LJ.funcErr(X, A); if (f) zeilen.push(LJ.fehler[f]);
    }
    zeilen.push('### So findest du es heraus');
    const schritte = [`Stell die W-Fragen an die Lücke: *${lz}*`, `Die passende Frage ist **${frage1(A, mark)}** → *${mark}*. Diese Frage gehört zu **${A}**.`];
    const sub = erstes(mark).toLowerCase();
    if (SUBFN[sub] && mark.split(/\s+/).length > 2) schritte.push(`Die Subjunktion *${sub}* verrät es zusätzlich: Sie leitet einen ${{ kausal: 'Kausalsatz', temporal: 'Temporalsatz', final: 'Finalsatz', modal: 'Modalsatz', lokal: 'Lokalsatz' }[SUBFN[sub]]} ein.`);
    const ers = ERSATZ[A] && A !== 'instrumental' && SUBFN[sub] ? ersetzeAdv(prompt, ERSATZ[A]) : null;
    if (ers) schritte.push(`Ersatz-Trick: *${ers}* – das passt.`);
    zeilen.push(schritte.map((s, i) => `${i + 1}. ${s}`).join('\n'));
    return zeilen.join('\n');
  }

  /* ── Form ── */
  const steigern = (w) => (/e$/.test(w) ? w + 'r' : w + 'er');
  function formNicht(X, A, mark) {
    const viele = mark.split(/\s+/).length > 1;
    return ({
      Adverb: viele ? `Ein Adverb ist ein **einzelnes Wort**. *${mark}* besteht aber aus mehreren Wörtern.` : `Ein Adverb kann man nicht steigern. *${mark}* kann man aber steigern: *${steigern(mark)}*.`,
      Adjektiv: viele ? `Ein Adjektiv ist ein **einzelnes Wort**. *${mark}* besteht aber aus mehreren Wörtern.` : `Ein Adjektiv kann man steigern. *${steigern(mark)}* gibt es aber nicht – *${mark}* verändert sich nie.`,
      Präpositionalgruppe: A === 'Nebensatz' ? `*${erstes(mark)}* ist hier keine Präposition, sondern eine Subjunktion: Danach folgt ein ganzer Satz mit dem Verb *${letztes(mark)}* am Ende.` : viele ? `Eine Präpositionalgruppe beginnt mit einer Präposition. *${erstes(mark)}* ist aber keine Präposition.` : `Eine Präpositionalgruppe hat mindestens zwei Wörter: Präposition + Nomen.`,
      Nominalgruppe: A === 'Präpositionalgruppe' ? `Eine Nominalgruppe hat **keine** Präposition am Anfang. Hier steht aber die Präposition *${erstes(mark)}* vorne.` : A === 'Nebensatz' ? `In *${mark}* steckt ein eigenes Verb (*${letztes(mark)}*). Eine Nominalgruppe hat kein Verb.` : `Eine Nominalgruppe besteht aus einem Nomen mit Begleiter. *${mark}* ist nur ein Wort und kein Nomen.`,
      Nebensatz: `Ein Nebensatz braucht ein eigenes Verb am Ende. In *${mark}* gibt es kein Verb.`,
    })[X] || '';
  }
  function formWeg(A, mark) {
    const viele = mark.split(/\s+/).length > 1;
    const s = [];
    s.push(`Ist es ein Satz mit eigenem Verb am Ende? ${A === 'Nebensatz' ? `**Ja**: *${letztes(mark)}* steht am Ende, vorne die Subjunktion *${erstes(mark)}*.` : '**Nein**, es gibt kein Verb.'}`);
    if (A !== 'Nebensatz') s.push(`Beginnt es mit einer Präposition? ${A === 'Präpositionalgruppe' ? `**Ja**: *${erstes(mark)}* ist eine Präposition.` : viele ? `**Nein**: *${erstes(mark)}* ist keine Präposition.` : '**Nein.**'}`);
    if (!['Nebensatz', 'Präpositionalgruppe'].includes(A)) s.push(`Ist es ein Nomen mit Begleiter? ${A === 'Nominalgruppe' ? `**Ja**: *${letztes(mark)}* ist ein Nomen, *${erstes(mark)}* sein Begleiter.` : '**Nein**, es ist nur ein Wort.'}`);
    if (A === 'Adjektiv' || A === 'Adverb') s.push(`Kann man es steigern? ${A === 'Adjektiv' ? `**Ja**: *${mark} – ${steigern(mark)}*.` : `**Nein**: *${steigern(mark)}* gibt es nicht.`}`);
    return '### So findest du es heraus – mit dem Wegweiser\n' + s.map((x, i) => `${i + 1}. ${x}`).join('\n') + `\n\n→ Also: **${A}**.`;
  }
  function formBegruendung(A, X, mark) {
    const t = [];
    if (X && X !== A && LJ.FORMEN.includes(X)) t.push('### Warum nicht *' + X + '*?', formNicht(X, A, mark));
    t.push(formWeg(A, mark));
    return t.join('\n');
  }

  /* ── Gliedsatz ── */
  const subFn = (mark) => SUBFN[erstes(mark).toLowerCase()];
  function gliedBegruendung(A, X, prompt) {
    const mark = markiert(prompt); const rest = ohne(prompt, A === 'Adverbialsatz');
    const t = [];
    if (X && X !== A && LJ.GLIED.includes(X)) {
      t.push('### Warum nicht *' + X + '*?');
      if (X === 'Adverbialsatz') t.push(`Einen Adverbialsatz könntest du weglassen. Hier geht das nicht: *${rest}* – da fehlt etwas.`);
      else if (A === 'Adverbialsatz') t.push(`Ein ${X} lässt sich nicht weglassen. Hier schon: *${rest}* ist ein vollständiger Satz.`);
      else if (X === 'Subjektsatz') t.push(`Der Hauptsatz hat schon ein Subjekt. Der Nebensatz antwortet auf *Wen oder was?* – das ist ein Objekt.`);
      else t.push(`Ohne den Nebensatz fehlt dem Satz das **Subjekt**: *Wer oder was …?* → der Nebensatz.`);
    }
    t.push('### So findest du es heraus');
    const s = [];
    s.push(`**Weglassprobe:** *${rest}* ${A === 'Adverbialsatz' ? '✔ – der Satz ist vollständig.' : '✘ – da fehlt etwas.'}`);
    if (A === 'Adverbialsatz') {
      const f = subFn(mark);
      const ers = f ? ersetzeAdv(prompt, ERSATZ[f]) : null;
      if (ers) s.push(`**Ersatzprobe:** *${ers}* ✔ – *${ERSATZ[f]}* passt, *das* nicht. Die Frage ist *${FR1[f]}* → ${f}.`);
      else if (f) s.push(`**Frage:** *${FR1[f]}* → der Nebensatz. Das ist eine Frage nach den Umständen (${f}).`);
      else s.push('**Frage:** Der Nebensatz antwortet auf eine W-Frage nach den Umständen (*Wann? Warum? Wozu? …*).');
    } else {
      s.push(`**Das-Test:** *${ersetze(prompt, 'das')}* ✔ – *das* ist hier ${A === 'Subjektsatz' ? 'das **Subjekt** (*Wer oder was?*)' : 'ein **Objekt** (*Wen oder was?*)'}.`);
    }
    t.push(s.map((x, i) => `${i + 1}. ${x}`).join('\n'), `→ Also: **${A}**.`);
    return t.join('\n');
  }

  /* ── Tap-Aufgaben ── */
  const artVon = (t) => {
    t = String(t || '');
    if (/Subjunktion/.test(t) && /Verb/.test(t)) return 'subverb';
    if (/Nebensatz|Adverbialsatz/.test(t)) return /finite Verb|Verb am Ende/.test(t) ? 'verb' : 'ns';
    if (/finite Verb|Verb am Ende/.test(t)) return 'verb';
    if (/Adverbial/.test(t)) return 'adv';
    if (/Prädikat/.test(t)) return 'praed';
    if (/Akkusativobjekt/.test(t)) return 'akk';
    if (/Dativobjekt/.test(t)) return 'dat';
    if (/Subjekt/.test(t)) return 'subj';
    return null;
  };
  const art = (it, auftrag) => artVon(it.prompt) || artVon(auftrag) || 'adv';
  function tapErklaerung(it, v, auftrag) {
    const units = einheiten(it); const tapIdx = units.map((u, i) => (u.tap ? i : -1)).filter((i) => i > -1);
    const sel = new Set((v || []).map((k) => tapIdx[k]));
    const ok = units.map((u, i) => (u.tap && u.ok ? i : -1)).filter((i) => i > -1);
    const falsch = [...sel].filter((i) => !units[i].ok); const fehlt = ok.filter((i) => !sel.has(i));
    const a = art(it, auftrag); const t = []; let vis = null;
    const verbI = units.length > 1 ? 1 : 0; const verb = units[verbI] ? ohnePunkt(units[verbI].t) : '';
    if (a === 'adv') {
      if (falsch.length || fehlt.length) {
        t.push('### Was nicht stimmt');
        falsch.forEach((i) => t.push(`- ${kursiv(ohnePunkt(units[i].t))} ist kein Adverbial. Lässt du es weg, ist der Satz unvollständig: *${satzOhne(units, [i])}* ✘`));
        fehlt.forEach((i) => t.push(`- ${kursiv(ohnePunkt(units[i].t))} hast du übersehen. Lässt du es weg, bleibt der Satz vollständig: *${satzOhne(units, [i])}* ✔`));
      }
      t.push('### So findest du es heraus');
      const s = ['Frag nach den Umständen: *Wo? Wann? Warum? Wie? Womit? Wozu?*' + (it.hint ? ` (Hier: ${it.hint.replace(/^Es sind zwei:\s*/, '')})` : '')];
      s.push(`**Weglassprobe:** Ohne alle Adverbiale heißt der Satz *${satzOhne(units, ok)}* – er ist trotzdem vollständig.`);
      const zeige = ok.find((i) => i > 0);
      if (zeige != null) s.push(`**Umstellprobe:** ${kursiv(ohnePunkt(units[zeige].t))} kannst du als Ganzes nach vorne stellen: *${nachVorne(units, zeige)}*`);
      t.push(s.map((x, i) => `${i + 1}. ${x}`).join('\n'));
      vis = { vis: 'satzbild', klein: true, titel: 'Richtig markiert:', teile: units.map((u) => [ohnePunkt(u.t), u.ok && u.tap ? 'temporal' : 'sg', u.ok && u.tap ? 'Adverbial' : '']) };
      vis.teile.forEach((x) => { if (x[1] === 'temporal') x[1] = 'ns'; });
    } else if (a === 'praed') {
      const teile = ok.map((i) => ohnePunkt(units[i].t));
      t.push('### Was nicht stimmt');
      falsch.forEach((i) => t.push(`- ${kursiv(ohnePunkt(units[i].t))} gehört nicht zum Prädikat. Es ist ein eigenes Satzglied – du kannst es umstellen.`));
      if (teile.length > 1 && fehlt.length) t.push(`- Das Prädikat hat hier **zwei Teile**: *${teile.join(' … ')}*. ${fehlt.length === teile.length ? 'Du hast beide nicht gefunden.' : `Den Teil *${ohnePunkt(units[fehlt[0]].t)}* hast du übersehen.`}`);
      else if (fehlt.length) t.push(`- Das Prädikat ist *${teile[0]}*.`);
      t.push('### So findest du es heraus');
      const s = [`Das finite Verb steht im Hauptsatz an **zweiter Stelle**: *${teile[0]}*.`];
      if (teile.length > 1) s.push(`Schau ans Satzende: *${teile[teile.length - 1]}* gehört dazu. Die beiden Teile bilden eine **Verbklammer**: *${teile.join(' … ')}*.`);
      const um = units.length > 3 && !ok.includes(2) ? satzAus([units[2].t, units[1].t, klein1(units[0].t), ...units.slice(3).map((u) => u.t)]) : null;
      if (um) s.push(`**Probe:** Stell den Satz um. Das Prädikat bleibt an seinem Platz, alles andere wandert: *${um}*`);
      t.push(s.map((x, i) => `${i + 1}. ${x}`).join('\n'));
    } else if (a === 'subj' || a === 'akk' || a === 'dat') {
      const ziel = ok[0]; const z = ohnePunkt(units[ziel].t);
      const fw = a === 'subj' ? 'Wer oder was' : a === 'akk' ? 'Wen oder was' : 'Wem';
      const name = a === 'subj' ? 'Subjekt' : a === 'akk' ? 'Akkusativobjekt' : 'Dativobjekt';
      const vIdx = ziel === 1 ? 2 : 1;
      const frage = `${fw} ${ohnePunkt(units[vIdx].t)} ${units.filter((_, i) => i !== ziel && i !== vIdx).map((u) => klein1(ohnePunkt(u.t))).join(' ')}?`;
      if (falsch.length) { t.push('### Was nicht stimmt'); falsch.forEach((i) => t.push(`- ${kursiv(ohnePunkt(units[i].t))} passt nicht auf die Frage *${fw} …?*.`)); }
      t.push('### So findest du es heraus', `1. Frag vom Prädikat aus: *${frage}* → *${z}*`);
      if (a === 'subj') t.push(`2. **Probe:** Das Subjekt passt in der Person zum Verb. Setzt du *${z}* in die Mehrzahl, muss sich auch *${ohnePunkt(units[vIdx].t)}* ändern.`);
      else t.push(`2. Merke: *Wer?* → Subjekt · *Wen oder was?* → Akkusativobjekt · *Wem?* → Dativobjekt`);
      t.push(`→ Also: *${z}* ist das **${name}**.`);
    } else if (a === 'ns') {
      const nsI = ok[0]; const n = ohnePunkt(units[nsI].t); const hs = units.filter((_, i) => i !== nsI).map((u) => ohnePunkt(u.t)).join(' ');
      const hsW = hs.split(/\s+/); const hsVerb = nsI === 0 ? hsW[0] : hsW[1];
      if (falsch.length) t.push('### Was nicht stimmt', `*${hs}* ist der **Hauptsatz**: Er kann allein stehen, und sein finites Verb *${hsVerb}* steht ${nsI === 0 ? 'direkt nach dem Komma' : 'an zweiter Stelle'}.`);
      t.push('### So findest du es heraus', `1. Such das Verb ganz am Ende eines Satzteils: *${letztes(n)}*.`, `2. Geh nach vorne bis zur Subjunktion: *${erstes(n)}*. Von dort bis *${letztes(n)}* reicht der Nebensatz.`, `3. Probe: *${gross1(n)}.* kann nicht allein stehen – das ist typisch für einen Nebensatz.`);
      vis = { vis: 'satzbild', klein: true, teile: units.map((u, i) => [ohnePunkt(u.t), i === nsI ? 'ns' : 'hs']) };
    } else if (a === 'verb' || a === 'subverb') {
      const woerter = units.map((u) => u.t.replace(/[.,]/g, ''));
      const richtige = ok.map((i) => woerter[i]);
      const sIdx = woerter.findIndex((w) => SUBJ.includes(w.toLowerCase()));
      const verbW = richtige.find((w) => !SUBJ.includes(w.toLowerCase())) || richtige[0];
      const vIdx = woerter.lastIndexOf(verbW);
      const nsTeil = sIdx > -1 && vIdx > sIdx ? woerter.slice(sIdx, vIdx + 1).join(' ') : '';
      if (falsch.length) { t.push('### Was nicht stimmt'); falsch.forEach((i) => t.push(`- *${woerter[i]}* ${SUBJ.includes(woerter[i].toLowerCase()) && a === 'verb' ? 'ist die Subjunktion, nicht das Verb.' : i < sIdx || (sIdx > -1 && i > vIdx) ? 'gehört zum Hauptsatz.' : 'ist hier nicht gesucht.'}`)); }
      t.push('### So findest du es heraus');
      const s = [`Das finite Verb im Nebensatz steht **ganz am Ende**: *${verbW}*. Es hat eine Personalendung.`];
      if (sIdx > -1) s.push(`Vorne steht die Subjunktion *${woerter[sIdx]}*. Sie öffnet den Nebensatz${nsTeil ? `: *${nsTeil}*` : ''}.`);
      s.push('Das finite Verb des Hauptsatzes steht dagegen an zweiter Stelle bzw. direkt nach dem Komma.');
      t.push(s.map((x, i) => `${i + 1}. ${x}`).join('\n'));
    }
    return { md: t.join('\n'), vis };
  }

  /* ── Komma ── */
  function kommaErklaerung(it, v) {
    const { words, gaps } = C.commaParse(it.target);
    const sel = (v && v.gaps) || [];
    const t = [];
    const fehlt = gaps.filter((g) => !sel.includes(g)); const zuviel = sel.filter((g) => !gaps.includes(g));
    if (fehlt.length || zuviel.length) {
      t.push('### Was nicht stimmt');
      fehlt.forEach((g) => t.push(`- Zwischen *${words[g]}* und *${words[g + 1]}* fehlt ein Komma.`));
      zuviel.forEach((g) => t.push(`- Nach *${words[g]}* gehört kein Komma hin.${/^(und|oder)$/i.test(words[g + 1] || '') ? ' Vor *und* und *oder* steht zwischen zwei Hauptsätzen meist keins.' : ' Dort endet kein Teilsatz.'}`));
    }
    const teile = it.target.replace(/[.]$/, '').split(/,\s*/);
    t.push('### So findest du es heraus');
    if (teile.length === 1) t.push(`Der Satz *${it.target}* hat nur **ein** finites Verb und keinen Nebensatz. Also: kein Komma.`);
    else {
      const zeilen = teile.map((p) => {
        const w = p.split(/\s+/); const sub = SUBJ.includes(w[0].toLowerCase());
        return sub ? `- *${p}* → **Nebensatz**: beginnt mit der Subjunktion *${w[0]}*, das Verb *${w[w.length - 1]}* steht am Ende.` : /^(denn|aber|sondern)$/i.test(w[0]) ? `- *${p}* → **Hauptsatz** mit der Konjunktion *${w[0]}* (Verb an zweiter Stelle).` : `- *${p}* → **Hauptsatz**${teile.length === 3 && p === teile[2] ? ' (zweiter Teil)' : ''}.`;
      });
      t.push('Zerlege den Satz in seine Teilsätze:', ...zeilen, teile.length === 3 ? 'Der Nebensatz ist **eingeschoben** – er bekommt vorne und hinten ein Komma.' : 'Zwischen den Teilsätzen steht ein Komma.');
    }
    const REGEL = { 'Hauptsatz – Nebensatz': 'Zwischen Hauptsatz und Nebensatz steht ein Komma.', 'eingeschobener Nebensatz': 'Der Nebensatz steht mitten im Hauptsatz und bekommt vorne und hinten ein Komma.', 'Satzreihe mit denn/aber': 'Zwei Hauptsätze, die mit *denn* oder *aber* verbunden sind, trennt ein Komma.', 'kein Komma': 'Es gibt keinen Nebensatz und keine Konjunktion mit Komma – also kein Komma.' };
    if (it.extra && v && v.extra !== it.extra.answer) {
      const A = it.extra.answer;
      if (REGEL[A]) t.push(`\n**Regel:** richtig ist *${A}*. ${REGEL[A]}${v.extra && REGEL[v.extra] ? ` (*${v.extra}* würde bedeuten: ${REGEL[v.extra]})` : ''}`);
      else t.push(`\nDer Nebensatz steht im **${A}**${A === 'Vorfeld' ? ' – ganz vorne, vor dem finiten Verb des Hauptsatzes' : A === 'Nachfeld' ? ' – ganz hinten, nach dem Hauptsatz' : ' – eingeschoben in den Hauptsatz'}.`);
    }
    return t.join('\n');
  }

  /* ── Satzglied-Einteilung (Umstellprobe) ── */
  function einteilung(it, v) {
    const R = it.answer.split(' | '); const X = String(v || '').split(' | ');
    const t = ['### Warum nicht so?'];
    const falsch = X.filter((g) => !R.includes(g));
    const g = falsch.find((x) => X.indexOf(x) > 0) || falsch[0];
    if (g) {
      const rest = X.filter((x) => x !== g).map((x) => klein1(x));
      t.push(`In deiner Einteilung ist *${g}* ein Satzglied. Stell es probehalber nach vorne: *${satzAus([g, ...rest])}* ✘ – das ergibt keinen sinnvollen Satz. Also gehören diese Wörter nicht so zusammen.`);
    }
    t.push('### So findest du es heraus – mit der Umstellprobe', 'Was du **gemeinsam** an eine andere Stelle schieben kannst, ist **ein** Satzglied.');
    const um = R.length >= 3 ? satzAus([R[R.length - 1], R[1], klein1(R[0]), ...R.slice(2, -1)]) : null;
    if (um) t.push(`1. Stell um: *${um}* ✔`, `2. *${R[0]}* bleibt dabei zusammen. Also ist das **ein** Satzglied.`, `3. Das finite Verb *${R[1]}* bleibt an zweiter Stelle.`);
    return { md: t.join('\n'), vis: { vis: 'satzbild', klein: true, titel: 'Richtige Einteilung:', teile: R.map((x) => [x, 'sg', '']) } };
  }

  /* nach dem ersten Fehlversuch: Hinweis, ohne die Lösung zu verraten */
  E.hinweis = function (it, v, auftrag, g) {
    const mark = markiert(it.prompt);
    if (g && g.msg) return g.msg;
    if (it.type === 'choice') {
      if (istFunc(it) && FR[v]) return `*${v}* würde auf die Frage *${FR1[v]}* antworten. Setz die Frage in die Lücke: *${luecke(it.prompt)}* – passt *${mark}* als Antwort? ${LJ.funcErr(v, it.answer) ? '\n\n' + LJ.fehler[LJ.funcErr(v, it.answer)] : ''}`;
      if (istForm(it)) return formHinweis(it.answer, mark);
      if (istGlied(it)) return `Lass den Nebensatz weg: *${ohne(it.prompt, it.answer === 'Adverbialsatz')}* – ist der Rest vollständig? Dann ist es ein Adverbialsatz. Wenn nicht: Ersetze ihn durch *das* und frag *Wer oder was?* (Subjekt) oder *Wen oder was?* (Objekt).`;
      if (/ \| /.test(opts(it))) return LJ.fehler.F3;
      if (opts(it) === 'Objekt|Adverbial') return `Setz die Fragen in die Lücke: *${luecke(it.prompt)}* – passt *wen? wem? was?* oder *wo? wann? warum? wie?*`;
      const e = it.err && it.err[v]; if (e) return LJ.fehler[e];
      return 'Lies den Satz noch einmal genau und vergleiche mit der Regel.';
    }
    if (it.type === 'selects') {
      const i = it.rows.findIndex((r, k) => !(Array.isArray(r.answer) ? r.answer.includes(v[k]) : v[k] === r.answer));
      const r = it.rows[i];
      if (r && r.errFn === 'func' && FR[v[i]]) return `Prüfe *${r.label.replace(/\*/g, '')}*: ${v[i]} würde auf *${FR[v[i]]}* antworten. Passt das?`;
      if (r && r.label === 'Frage') return `Prüfe zuerst die Frage: Setz die Fragewörter in die Lücke: *${luecke(it.prompt)}*`;
      if (r) return `Prüfe noch einmal: *${r.label.replace(/\*/g, '')}*.` + (it.errAll ? ' ' + LJ.fehler[it.errAll] : '');
    }
    if (it.type === 'tap') {
      const u = C.parseTap(it.s).filter((x) => x.tap); const sel = new Set(v || []);
      const zuviel = u.some((x, i) => !x.ok && sel.has(i)); const fehlt = u.some((x, i) => x.ok && !sel.has(i));
      const a = art(it, auftrag);
      if (a === 'adv') return zuviel ? 'Mindestens eins deiner markierten Satzglieder ist kein Adverbial. Mach die Weglassprobe: Wenn ohne es etwas Wichtiges fehlt, ist es Subjekt, Objekt oder Prädikat.' : 'Es fehlt noch mindestens ein Adverbial. Frag nach Ort, Zeit, Grund, Art und Weise, Mittel und Zweck.';
      if (a === 'ns') return 'Der Nebensatz beginnt mit einer Subjunktion (z. B. *weil, als, damit*) und endet mit dem finiten Verb.';
      if (a === 'verb' || a === 'subverb') return 'Das finite Verb hat eine Personalendung. Im Nebensatz steht es ganz am Ende.' + (fehlt && !zuviel ? ' Es fehlt noch etwas.' : '');
      if (a === 'praed') return 'Das Prädikat kann aus zwei Teilen bestehen, die eine Klammer bilden (z. B. *schließt … ab*). Schau auch ans Satzende.';
      if (a === 'subj') return 'Frag vom Prädikat aus: *Wer oder was* tut etwas?';
      if (a === 'akk') return 'Frag vom Prädikat aus: *Wen oder was …?*';
      if (a === 'dat') return 'Frag vom Prädikat aus: *Wem …?*';
    }
    if (it.type === 'comma') return g && g.err === 'F7' ? LJ.fehler.F7 : LJ.fehler.F6 + ' Suche die Subjunktion – dort beginnt der Nebensatz.';
    if (it.type === 'order') return 'Im Nebensatz steht das finite Verb am Ende. Das Komma trennt Hauptsatz und Nebensatz.';
    if (it.type === 'text') {
      if (it.kurz) {
        if (it.funktion && FR[String(v).trim().toLowerCase()]) return `*${String(v).trim()}* würde auf *${FR[String(v).trim().toLowerCase()]}* antworten. Passt diese Frage zu *${mark}*?`;
        if (it.funktion) return 'Tippe eine der sechs Funktionen ein: lokal, temporal, kausal, modal, instrumental, final.';
        if (it.form) return formHinweis(it.form, mark) + ' Mögliche Formen: Adverb, Adjektiv, Präpositionalgruppe, Nominalgruppe, Nebensatz.';
        if (it.luecke) { const f = (String(it.prompt).match(/\*\((\w+)\)\*/) || [])[1]; return f && SUBS[f] ? `Gesucht ist eine Subjunktion für **${f}**. Denk an die Tabelle: Welche Subjunktionen gehören dazu?` : 'Gesucht ist eine Subjunktion.'; }
        if (/heraus/.test(auftrag || '') || /heraus/.test(it.prompt || '')) return 'Schreib das ganze Satzglied ab – genau so, wie es im Satz steht, mit allen kleinen Wörtern (z. B. *der*, *mit*, *am*).';
        return 'Schau noch einmal in die Erklärung oben. Achte auf die Schreibweise.';
      }
      if (g && g.err && LJ.fehler[g.err]) return LJ.fehler[g.err] + (it.kommaSatz ? ' Vergleiche deinen Satz Wort für Wort.' : '');
      return 'Prüfe: Steht am Anfang des Nebensatzes eine passende Subjunktion? Steht das finite Verb am Ende? Ist das Komma gesetzt?';
    }
    return null;
  };
  const formHinweis = (A, mark) => ({
    Adverb: 'Ist es nur ein Wort? Kannst du es steigern? Wenn nicht, ist es kein Adjektiv.',
    Adjektiv: LJ.fehler.F8,
    Präpositionalgruppe: `Schau auf das erste Wort: *${erstes(mark)}*. Was für ein Wort ist das?`,
    Nominalgruppe: 'Gibt es eine Präposition am Anfang? Wenn nicht: Nomen mit Begleiter …',
    Nebensatz: 'Steht in dem markierten Teil ein eigenes Verb ganz am Ende?',
  })[A] || '';

  /* nach der Auflösung: warum falsch, wie richtig – liefert Text oder { md, vis } */
  E.erklaerung = function (it, v, auftrag) {
    const mark = markiert(it.prompt);
    let t = '';
    if (it.type === 'choice') {
      const o = opts(it);
      if (istFunc(it)) t = funcBegruendung(it.answer, v, it.prompt);
      else if (istForm(it)) t = formBegruendung(it.answer, v, mark);
      else if (istGlied(it)) t = gliedBegruendung(it.answer, v, it.prompt);
      else if (/ \| /.test(o)) return einteilung(it, v);
      else if (o === 'Hauptsatz|Nebensatz') {
        const s = ((String(it.prompt).match(/\*([^*]+)\*\s*$/) || [])[1] || '').trim(); const w = ohnePunkt(s).split(/\s+/);
        t = it.answer === 'Nebensatz' ? `### So findest du es heraus\n1. Am Anfang steht die Subjunktion *${w[0]}*.\n2. Das finite Verb *${w[w.length - 1]}* steht **am Ende**.\n3. Probe: *${s}* kann nicht allein stehen – es fehlt etwas.\n\n→ Also: **Nebensatz**.` : `### So findest du es heraus\n1. Das finite Verb *${w[1]}* steht an **zweiter Stelle**.\n2. Probe: *${s}* kann allein stehen.\n\n→ Also: **Hauptsatz**.`;
      } else if (o === 'Konjunktion|Subjunktion') {
        const s = satzMitMarke(it.prompt); const nach = sauber(s.split(/\*\*[^*]+\*\*/)[1] || '').replace(/[.,].*$/, '').trim().split(/\s+/);
        t = it.answer === 'Subjunktion' ? `### So findest du es heraus\nSchau auf das Verb nach *${mark}*: *${mark} ${nach.join(' ')}* – das finite Verb *${nach[nach.length - 1]}* steht **am Ende**. Der Teil ist ein Nebensatz. → **Subjunktion**` : `### So findest du es heraus\nSchau auf das Verb nach *${mark}*: *${mark} ${nach.join(' ')}* – das finite Verb *${nach[1] || nach[0]}* steht an **zweiter Stelle**, wie im Hauptsatz. → **Konjunktion**`;
        if (v && v !== it.answer) t = `### Warum nicht *${v}*?\n${v === 'Konjunktion' ? 'Nach einer Konjunktion (*und, oder, aber, denn, sondern*) bleibt das Verb an zweiter Stelle. Hier ist es ans Ende gewandert.' : 'Nach einer Subjunktion müsste das Verb ans Ende wandern. Hier steht es aber an zweiter Stelle.'}\n` + t;
      } else if (o === 'Präposition|Subjunktion') {
        const s = satzMitMarke(it.prompt); const nach = sauber(s.split(/\*\*[^*]+\*\*/)[1] || '');
        if (it.answer === 'Subjunktion') { const ns = nach.split(',')[0].replace(/\.$/, '').trim(); t = `### So findest du es heraus\nNach *${mark}* folgt ein ganzer Satz: *${mark.toLowerCase()} ${ns}*. Das finite Verb *${letztes(ns)}* steht am Ende, danach kommt das Komma. → **Subjunktion**\n\nVergleiche: *${mark.toLowerCase()} des Festes* – da folgt nur ein Nomen mit Begleiter (Präposition).`; }
        else { const ng = nach.split(/\s+/).slice(0, 2).join(' ').replace(/[.,]$/, ''); t = `### So findest du es heraus\nNach *${mark}* folgt nur eine Nominalgruppe (*${ng}*), kein eigener Satz mit Verb am Ende. → **Präposition**\n\nWäre es eine Subjunktion, müsste ein Satz mit dem Verb am Ende folgen, z. B. *${mark.toLowerCase()} das Fest lief*.`; }
        if (v && v !== it.answer) t = `### Warum nicht *${v}*?\n${LJ.fehler.F4}\n` + t;
      } else if (o === 'Objekt|Adverbial') {
        const lz = luecke(it.prompt);
        t = it.answer === 'Objekt' ? `### So findest du es heraus\n1. Setz die Fragen in die Lücke: *${lz}*\n2. *Wen oder was?* (bzw. *Wem?*) → *${mark}* passt. Eine Frage nach den Umständen (*wo? wann? warum? wie?*) passt nicht.\n3. Weglassprobe: *${ohne(it.prompt)}* – da fehlt etwas.\n\n→ Also: **Objekt**.` : `### So findest du es heraus\n1. Setz die Fragen in die Lücke: *${lz}*\n2. Eine W-Frage nach den Umständen passt${it.fb ? ` (${it.fb.replace(/\s*→\s*Adverbial\.?$/, '')})` : ''}. *Wen oder was?* passt nicht.\n3. Weglassprobe: *${ohne(it.prompt, true)}* – der Satz bleibt vollständig.\n\n→ Also: **Adverbial**.`;
        if (v && v !== it.answer) t = `### Warum nicht *${v}*?\n${v === 'Objekt' ? 'Ein Objekt erfragst du mit *wen?*, *wem?* oder *was?*. Diese Fragen passen hier nicht.' : 'Ein Adverbial antwortet auf *wo? wann? warum? wie? womit? wozu?*. Hier passt aber *wen?* oder *was?*.'}\n` + t;
        return t;
      } else if (o === 'um … zu|damit') t = it.answer === 'damit' ? '### So findest du es heraus\n1. Wer tut etwas im Hauptsatz, wer im Nebensatz? Die Subjekte sind **verschieden** (oder im Nebensatz steht ein eigenes Subjekt mit Verb am Ende).\n2. Bei verschiedenen Subjekten geht nur **damit**.' : '### So findest du es heraus\n1. Wer tut etwas im Hauptsatz, wer im Nebensatz? Es ist **dieselbe Person**.\n2. Nach der Lücke folgt ein Infinitiv mit *zu* – dann passt **um … zu**.';
      else if ((it.options || []).every((x) => SUBFN[String(x).toLowerCase()])) {
        const f = (String(it.prompt).match(/\*\((\w+)\)\*/) || [])[1] || SUBFN[String(it.answer).toLowerCase()];
        t = `### So findest du es heraus\nGesucht ist eine Subjunktion für **${f}** (*${FR[f] || ''}*).\n` + it.options.map((x) => `- *${x}* leitet einen ${{ kausal: 'Kausalsatz (Warum?)', temporal: 'Temporalsatz (Wann?)', final: 'Finalsatz (Wozu?)', modal: 'Modalsatz (Wie?)', lokal: 'Lokalsatz (Wo?)' }[SUBFN[String(x).toLowerCase()]]} ein${String(x) === String(it.answer) ? ' ✔' : ''}.`).join('\n') + `\n\n→ Also: **${it.answer}**.`;
      } else if (it.err && v && it.err[v] && LJ.fehler[it.err[v]]) t = `### Warum nicht so?\n${LJ.fehler[it.err[v]]}\n\nRichtig ist: **${C.loesungText(it)}**`;
      else t = `Richtig ist: **${C.loesungText(it)}**.`;
    } else if (it.type === 'selects') {
      const falsche = it.rows.map((r, k) => ({ r, k })).filter(({ r, k }) => !(Array.isArray(r.answer) ? r.answer.includes(v[k]) : v[k] === r.answer));
      const FELD2 = { Vorfeld: 'Ins Vorfeld gehört, was vor dem finiten Verb steht.', 'linke Verbklammer': 'In die linke Verbklammer gehört nur das finite Verb.', Mittelfeld: 'Ins Mittelfeld gehört, was zwischen den beiden Verbklammern steht.', 'rechte Verbklammer': 'In die rechte Verbklammer gehört der zweite Teil des Prädikats.', Nachfeld: 'Ins Nachfeld gehört, was nach dem Prädikat ganz am Ende steht.' };
      const FELD = { Vorfeld: 'steht vor dem finiten Verb, ganz vorne', 'linke Verbklammer': 'ist das finite Verb', Mittelfeld: 'steht zwischen den beiden Verbklammern', 'rechte Verbklammer': 'ist der zweite Teil des Prädikats', Nachfeld: 'steht hinter der rechten Verbklammer, ganz am Ende' };
      t = falsche.map(({ r, k }) => {
        const A = Array.isArray(r.answer) ? r.answer[0] : r.answer; const lab = r.label.replace(/\*/g, '');
        if (r.errFn === 'func') return `### ${lab}: richtig ist *${A}*\n` + funcBegruendung(A, v[k], it.prompt).replace(/^###\s*(.*)$/gm, '**$1**');
        if (lab === 'Form') return `### Form: richtig ist *${A}*\n` + formBegruendung(A, v[k], mark).replace(/^###\s*(.*)$/gm, '**$1**');
        if (lab === 'Gliedsatz') return `### Gliedsatz: richtig ist *${A}*\n` + (mark && !/Ohne Nebensatz/.test(it.prompt) ? gliedBegruendung(A, v[k], it.prompt).replace(/^###\s*(.*)$/gm, '**$1**') : (A === 'Adverbialsatz' ? 'Der Nebensatz lässt sich weglassen oder durch *dann, deshalb, dazu …* ersetzen.' : `Der Nebensatz lässt sich nicht weglassen. Mit *das* ersetzt, ist *das* ${A === 'Subjektsatz' ? 'das Subjekt' : 'ein Objekt'}.`));
        if (lab === 'Frage') return `### Frage: richtig ist *${A}*\nSetz die Fragewörter in die Lücke: *${luecke(it.prompt)}* → **${A}** → *${mark}*`;
        if (lab === 'Rest') return `### Rest: richtig ist *${A}*\n${A === 'vollständig' ? 'Der Rest ist ein ganzer Satz: Subjekt und Prädikat sind da, nichts Wichtiges fehlt.' : 'Dem Rest fehlt etwas Wichtiges: Frag *Wer oder was?* bzw. *Wen oder was?* – die Antwort war der Nebensatz.'}`;
        if (lab === 'Ersatzwort') return `### Ersatzwort: richtig ist *${A}*\nSetz die Wörter für den Nebensatz ein. Nur mit *${A}* ergibt der Satz einen Sinn.`;
        if (FELD[A]) return `- *${lab}*: richtig ist **${A}** – dieser Teil ${FELD[A]}.${v[k] && FELD2[v[k]] ? ` (${FELD2[v[k]]})` : ''}`;
        return `- *${lab}*: richtig ist **${A}**${v[k] ? ` (nicht *${v[k]}*)` : ''}.`;
      }).join('\n');
    } else if (it.type === 'tap') return tapErklaerung(it, v, auftrag);
    else if (it.type === 'comma') t = kommaErklaerung(it, v);
    else if (it.type === 'order') {
      const r = it.accepted[0]; const sIdx = r.findIndex((x) => SUBJ.includes(erstes(x).toLowerCase()));
      t = `Richtig ist: *${r.join(' ').replace(/\s+,/g, ',')}*`;
      if (sIdx > -1) t += `\n\n### So findest du es heraus\n1. Der Nebensatz beginnt mit der Subjunktion *${erstes(r[sIdx])}*.\n2. Im Nebensatz steht das finite Verb **am Ende**: *${letztes(r[r.length - 1])}*.\n3. Zwischen Hauptsatz und Nebensatz steht ein Komma.`;
      else if (r.length > 2) t += `\n\n### So findest du es heraus\nIm Hauptsatz steht das finite Verb an **zweiter Stelle**: *${r[1]}*. Davor steht genau ein Satzglied.`;
    } else if (it.type === 'text') {
      if (it.kurz) {
        const A = it.accepted[0]; const eing = String(v || '').trim();
        if (it.funktion) t = funcBegruendung(A, eing.toLowerCase(), it.prompt);
        else if (it.form) t = formBegruendung(it.form, LJ.FORMEN.find((f) => f.toLowerCase() === eing.toLowerCase()) || null, mark);
        else if (it.luecke) { const f = (String(it.prompt).match(/\*\((\w+)\)\*/) || [])[1]; t = `Passend ist zum Beispiel: **${it.accepted.join('**, **')}**.` + (f && SUBS[f] ? `\n\nFür **${f}** passen die Subjunktionen *${SUBS[f]}*.${SUBFN[eing.toLowerCase()] && SUBFN[eing.toLowerCase()] !== f ? ` *${eing}* leitet dagegen einen ${SUBFN[eing.toLowerCase()]}en Nebensatz ein.` : ''}` : ''); }
        else {
          t = `Richtig ist: **${A}**.`;
          const soll = A.toLowerCase().replace(/[.,]/g, '').split(/\s+/); const ist = eing.toLowerCase().replace(/[.,]/g, '').split(/\s+/).filter(Boolean);
          const fehlt = soll.filter((w) => !ist.includes(w)); const zuviel = ist.filter((w) => !soll.includes(w));
          if (eing && (fehlt.length || zuviel.length)) t += '\n\n### Was nicht stimmt\n' + (fehlt.length ? `- Es fehlt: *${fehlt.join(' ')}*\n` : '') + (zuviel.length ? `- Zu viel oder anders geschrieben: *${zuviel.join(' ')}*` : '');
          if (eing && !fehlt.length && !zuviel.length && eing !== A) t += '\n\nAchte auf die Groß- und Kleinschreibung.';
        }
      } else {
        const c = C.satzCheck(it, v);
        const zeilen = [];
        if (it.subs) zeilen.push(`${c.hasSub ? '✔' : '✘'} passende Subjunktion am Anfang des Nebensatzes (z. B. *${it.subs.slice(0, 3).join(', ')}*)`);
        if (it.verbs) zeilen.push(`${c.verbOk ? '✔' : '✘'} finites Verb am Ende des Nebensatzes (*${it.verbs[0]}*)`);
        zeilen.push(`${c.hasComma ? '✔' : '✘'} Komma zwischen Hauptsatz und Nebensatz`);
        if (it.vorfeldVerb) zeilen.push(`${c.vorfeldOk ? '✔' : '✘'} nach dem Nebensatz im Vorfeld sofort das finite Verb (*${it.vorfeldVerb}*)`);
        t = `So wäre es richtig: *${it.accepted[0]}*` + (zeilen.length ? '\n\n### Prüfe deinen Satz\n' + zeilen.map((z) => '- ' + z).join('\n') : '');
      }
    }
    if (it.fb && !(t.includes(it.fb))) t += (t ? '\n\n' : '') + it.fb;
    return t;
  };
})();
