/* Speicherung: DemoStore (nur dieser Browser) und SupabaseStore (Datenbank).
 * Beide haben dieselben Funktionen; die App merkt nicht, welcher aktiv ist. */
(function () {
  const TIERE = ['LUCHS', 'DACHS', 'FUCHS', 'OTTER', 'BIBER', 'ADLER', 'FALKE', 'EULE', 'HIRSCH', 'WOLF', 'BAER', 'IGEL', 'MARDER', 'ROBBE', 'DELFIN', 'TIGER', 'LOEWE', 'PANDA', 'KOALA', 'ZEBRA', 'ELCH', 'RABE', 'SPECHT', 'STORCH', 'MOEWE', 'HUMMEL', 'KRANICH', 'GECKO', 'LEMUR', 'PINGUIN', 'WIESEL', 'FROSCH'];
  const neuerCode = () => `${TIERE[Math.floor(Math.random() * TIERE.length)]}-${String(Math.floor(1000 + Math.random() * 9000))}`;
  const normCode = (c) => String(c || '').trim().toUpperCase().replace(/\s+/g, '').replace(/–/g, '-');
  const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36));
  const ls = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* voll oder gesperrt */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* egal */ } },
  };
  window.LS = ls;

  /* ───────────── Demo ───────────── */
  class DemoStore {
    constructor() {
      this.demo = true;
      this.key = 'detektei-demo-db-v2';
      this.mem = null;
      this.db = ls.get(this.key, null) || this.seed();
      this.session = ls.get('detektei-demo-session', null);
    }
    save() { ls.set(this.key, this.db); }
    seed() {
      const db = { teachers: [{ id: 'demo', email: 'demo@kgn.schule', name: 'Demo-Lehrkraft', is_admin: true }], invites: [], classes: [], students: [], answers: [], test_results: [] };
      const k = { id: uuid(), teacher_id: 'demo', name: '7a (Demo)', test_open: false, created_at: new Date().toISOString() };
      db.classes.push(k);
      db.students.push({ id: uuid(), class_id: k.id, code: 'DEMO-0000', test_variant: 'A', state: {}, updated_at: new Date().toISOString() });
      (window.DEMO_SEED ? window.DEMO_SEED(k.id, uuid) : []).forEach((s) => { db.students.push(s.student); db.answers.push(...s.answers); if (s.test) db.test_results.push(s.test); });
      this.db = db; ls.set(this.key, db);
      return db;
    }
    reset() { ls.del(this.key); ls.del('detektei-demo-session'); this.db = this.seed(); this.session = null; }
    async info() { return { mode: 'demo' }; }

    /* Schülerinnen und Schüler */
    stu(code) { return this.db.students.find((s) => s.code === normCode(code)); }
    async studentLogin(code) {
      const s = this.stu(code); if (!s) throw new Error('Diesen Code gibt es nicht. Prüfe die Schreibweise.');
      const k = this.db.classes.find((c) => c.id === s.class_id);
      const t = this.db.test_results.find((r) => r.student_id === s.id) || null;
      return { id: s.id, code: s.code, class_name: k ? k.name : '', test_open: !!(k && k.test_open), test_variant: s.test_variant || 'A', state: s.state || {}, test: t };
    }
    async studentSave(code, state) { const s = this.stu(code); if (!s) return; s.state = state; s.updated_at = new Date().toISOString(); this.save(); }
    async studentLog(code, events) { const s = this.stu(code); if (!s) return; events.forEach((e) => this.db.answers.push({ id: uuid(), student_id: s.id, ...e, created_at: e.ts || new Date().toISOString() })); this.save(); }
    async studentTest(code, action, answers) {
      const s = this.stu(code); if (!s) throw new Error('Code unbekannt');
      const k = this.db.classes.find((c) => c.id === s.class_id);
      let t = this.db.test_results.find((r) => r.student_id === s.id);
      if (action === 'start') {
        if (!k.test_open && !t) throw new Error('Der Test ist noch nicht freigeschaltet.');
        if (!t) { t = { student_id: s.id, variant: s.test_variant || 'A', answers: {}, started_at: new Date().toISOString(), submitted_at: null, manual: {} }; this.db.test_results.push(t); }
      } else if (t && !t.submitted_at) {
        t.answers = answers || {};
        if (action === 'submit') t.submitted_at = new Date().toISOString();
      }
      this.save(); return t;
    }

    /* Lehrkräfte */
    async teacherSession() { return this.session ? this.db.teachers.find((t) => t.id === this.session) || null : null; }
    async teacherSignIn() { this.session = 'demo'; ls.set('detektei-demo-session', 'demo'); return this.teacherSession(); }
    async teacherSignUp() { throw new Error('Im Demo-Modus gibt es nur die Demo-Lehrkraft.'); }
    async teacherSignOut() { this.session = null; ls.del('detektei-demo-session'); }
    async listClasses() { return this.db.classes.filter((c) => c.teacher_id === this.session); }
    async createClass(name) { const k = { id: uuid(), teacher_id: this.session, name, test_open: false, created_at: new Date().toISOString() }; this.db.classes.push(k); this.save(); return k; }
    async renameClass(id, name) { const k = this.db.classes.find((c) => c.id === id); k.name = name; this.save(); }
    async deleteClass(id) { const ids = this.db.students.filter((s) => s.class_id === id).map((s) => s.id); this.db.students = this.db.students.filter((s) => s.class_id !== id); this.db.answers = this.db.answers.filter((a) => !ids.includes(a.student_id)); this.db.test_results = this.db.test_results.filter((a) => !ids.includes(a.student_id)); this.db.classes = this.db.classes.filter((c) => c.id !== id); this.save(); }
    async createStudents(classId, n) {
      const codes = [];
      for (let i = 0; i < n; i++) { let c; do { c = neuerCode(); } while (this.db.students.some((s) => s.code === c)); this.db.students.push({ id: uuid(), class_id: classId, code: c, test_variant: 'A', state: {}, updated_at: null }); codes.push(c); }
      this.save(); return codes;
    }
    async listStudents(classId) { return this.db.students.filter((s) => s.class_id === classId).map((s) => ({ ...s })); }
    async deleteStudent(id) { this.db.students = this.db.students.filter((s) => s.id !== id); this.save(); }
    async getAnswers(studentId) { return this.db.answers.filter((a) => a.student_id === studentId); }
    async resetStudent(id) { const s = this.db.students.find((x) => x.id === id); s.state = {}; s.updated_at = null; this.db.answers = this.db.answers.filter((a) => a.student_id !== id); this.db.test_results = this.db.test_results.filter((a) => a.student_id !== id); this.save(); }
    async setTestOpen(classId, open) { this.db.classes.find((c) => c.id === classId).test_open = open; this.save(); }
    async setVariant(studentId, v) { this.db.students.find((s) => s.id === studentId).test_variant = v; this.save(); }
    async listTestResults(classId) { const ids = this.db.students.filter((s) => s.class_id === classId).map((s) => s.id); return this.db.test_results.filter((r) => ids.includes(r.student_id)); }
    async saveManual(studentId, manual) { const t = this.db.test_results.find((r) => r.student_id === studentId); if (t) { t.manual = manual; this.save(); } }
    async reopenTest(studentId) { this.db.test_results = this.db.test_results.filter((r) => r.student_id !== studentId); this.save(); }
    async getTestKey(variant) { return window.TESTS_FULL ? window.TESTS_FULL[variant] : null; }
    async createInvite() { const c = 'LK-' + Math.random().toString(36).slice(2, 8).toUpperCase(); this.db.invites.push({ code: c, created_at: new Date().toISOString() }); this.save(); return c; }
    async listInvites() { return this.db.invites; }
    async listTeachers() { return this.db.teachers; }
  }

  /* ───────────── Supabase ───────────── */
  class SupabaseStore {
    constructor(url, key) {
      this.demo = false;
      this.sb = window.supabase.createClient(url, key, { auth: { persistSession: true } });
    }
    async info() { return { mode: 'supabase' }; }
    async rpc(fn, args) { const { data, error } = await this.sb.rpc(fn, args); if (error) throw new Error(error.message); return data; }
    async q(p) { const { data, error } = await p; if (error) throw new Error(error.message); return data; }

    async studentLogin(code) { const d = await this.rpc('student_login', { p_code: normCode(code) }); if (!d) throw new Error('Diesen Code gibt es nicht. Prüfe die Schreibweise.'); return d; }
    async studentSave(code, state) { await this.rpc('student_save', { p_code: normCode(code), p_state: state }); }
    async studentLog(code, events) { await this.rpc('student_log', { p_code: normCode(code), p_events: events }); }
    async studentTest(code, action, answers) { return this.rpc('student_test', { p_code: normCode(code), p_action: action, p_answers: answers || {} }); }

    async teacherSession() {
      const { data } = await this.sb.auth.getSession(); if (!data.session) return null;
      const rows = await this.q(this.sb.from('teachers').select('*').eq('id', data.session.user.id));
      return rows[0] || { id: data.session.user.id, email: data.session.user.email, pending: true };
    }
    async teacherSignIn(email, pw) {
      const { error } = await this.sb.auth.signInWithPassword({ email, password: pw }); if (error) throw new Error(error.message === 'Invalid login credentials' ? 'E-Mail oder Passwort stimmt nicht.' : error.message);
      const t = await this.teacherSession();
      if (t && t.pending) { const ok = await this.rpc('claim_admin', {}); if (ok) return this.teacherSession(); }
      return t;
    }
    async teacherSignUp(email, pw, name, invite) {
      const { data, error } = await this.sb.auth.signUp({ email, password: pw, options: { emailRedirectTo: location.origin + location.pathname } }); if (error) throw new Error(error.message);
      if (!data.session) return { confirm: true };
      if (invite) await this.rpc('redeem_invite', { p_code: invite.trim().toUpperCase(), p_name: name || '' });
      else await this.rpc('claim_admin', {});
      return this.teacherSession();
    }
    async redeemInvite(invite, name) { await this.rpc('redeem_invite', { p_code: invite.trim().toUpperCase(), p_name: name || '' }); return this.teacherSession(); }
    async teacherSignOut() { await this.sb.auth.signOut(); }
    async listClasses() { return this.q(this.sb.from('classes').select('*').order('created_at')); }
    async createClass(name) { const t = await this.teacherSession(); const r = await this.q(this.sb.from('classes').insert({ name, teacher_id: t.id }).select()); return r[0]; }
    async renameClass(id, name) { await this.q(this.sb.from('classes').update({ name }).eq('id', id)); }
    async deleteClass(id) { await this.q(this.sb.from('classes').delete().eq('id', id)); }
    async createStudents(classId, n) { return this.rpc('create_students', { p_class: classId, p_n: n }); }
    async listStudents(classId) { return this.q(this.sb.from('students').select('*').eq('class_id', classId).order('created_at')); }
    async deleteStudent(id) { await this.q(this.sb.from('students').delete().eq('id', id)); }
    async getAnswers(studentId) { return this.q(this.sb.from('answers').select('*').eq('student_id', studentId).order('created_at').limit(5000)); }
    async resetStudent(id) { await this.rpc('reset_student', { p_student: id }); }
    async setTestOpen(classId, open) { await this.q(this.sb.from('classes').update({ test_open: open }).eq('id', classId)); }
    async setVariant(studentId, v) { await this.q(this.sb.from('students').update({ test_variant: v }).eq('id', studentId)); }
    async listTestResults(classId) { const st = await this.listStudents(classId); if (!st.length) return []; return this.q(this.sb.from('test_results').select('*').in('student_id', st.map((s) => s.id))); }
    async saveManual(studentId, manual) { await this.q(this.sb.from('test_results').update({ manual }).eq('student_id', studentId)); }
    async reopenTest(studentId) { await this.q(this.sb.from('test_results').delete().eq('student_id', studentId)); }
    async getTestKey(variant) { const r = await this.q(this.sb.from('test_keys').select('data').eq('variant', variant)); return r[0] ? r[0].data : null; }
    async createInvite() { return this.rpc('create_invite', {}); }
    async listInvites() { return this.q(this.sb.from('invites').select('*').order('created_at', { ascending: false })); }
    async listTeachers() { return this.q(this.sb.from('teachers').select('*').order('created_at')); }
  }

  window.makeStore = function () {
    const c = window.DETEKTEI_CONFIG || {};
    if (c.supabaseUrl && c.supabaseAnonKey && window.supabase) return new SupabaseStore(c.supabaseUrl, c.supabaseAnonKey);
    return new DemoStore();
  };
  window.normCode = normCode;
})();
