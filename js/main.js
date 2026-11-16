/* Start: Anmeldung und Weiche Schüler / Lehrkraft */
(async function () {
  const C = window.CORE; const { h } = C;
  STUDENT.init();
  const store = window.makeStore(); window.STORE = store;
  const root = document.getElementById('app');
  window.addEventListener('hashchange', () => location.reload());

  if (location.hash === '#lehrkraft') return TEACHER.start(store, root);

  const gespeichert = LS.get('detektei-code', null);
  if (gespeichert) {
    try { const inf = await store.studentLogin(gespeichert); return STUDENT.start(store, root, inf.code, inf); } catch (e) { LS.del('detektei-code'); }
  }
  startseite();

  function startseite(fehler) {
    const eingabe = h('input', { type: 'text', class: 'code-in', placeholder: 'z. B. LUCHS-4821', autocomplete: 'off', autocapitalize: 'characters', spellcheck: 'false', 'aria-label': 'Dein Code' });
    const msg = h('p', { class: 'schlecht' }, fehler || '');
    const los = async (e) => {
      e.preventDefault(); msg.textContent = '';
      const code = normCode(eingabe.value); if (!code) { msg.textContent = 'Bitte gib deinen Code ein.'; return; }
      try { const inf = await store.studentLogin(code); LS.set('detektei-code', inf.code); STUDENT.start(store, root, inf.code, inf); }
      catch (er) { msg.textContent = er.message || 'Anmeldung hat nicht geklappt.'; }
    };
    root.innerHTML = '';
    root.append(h('main', { class: 'start' },
      h('div', { class: 'start-bild' }, VIS.titelbild()),
      h('p', { class: 'reihe' }, 'Lernjob · Deutsch Klasse 7'),
      h('h1', null, LJ.meta.titel),
      h('p', { class: 'unter' }, LJ.meta.untertitel),
      store.demo ? h('div', { class: 'box box-info demo' }, h('span', { class: 'box-label' }, 'Demo-Modus'), C.mdEl('Diese Fassung speichert alles nur in diesem Browser. Zum Ausprobieren: Code **DEMO-0000** oder Lehrkraft-Bereich mit der Demo-Lehrkraft.')) : null,
      h('section', { class: 'karte schmal' }, h('h2', null, 'Ich bin Schülerin / Schüler'),
        h('form', { class: 'formular', onsubmit: los }, h('label', null, 'Dein Code', eingabe), msg, h('button', { class: 'btn primaer gross', type: 'submit' }, 'Los geht’s'))),
      h('p', { class: 'mitte' }, h('a', { href: '#lehrkraft' }, 'Lehrkraft-Bereich'))));
    eingabe.focus();
  }
})();
