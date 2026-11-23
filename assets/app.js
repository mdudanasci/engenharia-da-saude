/* =========================================================
   Engenharia da Saúde · Gestão de Home Care
   Técnicas de enfermagem · Pacientes · Escalas mensais
   ========================================================= */
(function () {
  'use strict';

  const KEY = 'engenhariaSaude.admin.v2';

  const MODALITY = {
    '12h': { label: '12 horas', short: '12h', techs: 2, desc: '2 técnicas por dia · cobertura de 12h' },
    '24h': { label: '24 horas', short: '24h', techs: 4, desc: '4 técnicas por dia · cobertura integral' }
  };

  const SHIFTS = {
    D: { short: 'D', label: 'Diurno', time: '07h–19h', color: '#2a86d8', soft: '#e8f3fd' },
    N: { short: 'N', label: 'Noturno', time: '19h–07h', color: '#7c5cd6', soft: '#f0ebfd' },
    '24': { short: '24', label: '24 horas', time: '24h', color: '#16a3a3', soft: '#e4f7f7' }
  };

  const ROLES = ['Técnica(o) de enfermagem', 'Enfermeira(o)', 'Auxiliar de enfermagem', 'Cuidador(a)', 'Fisioterapeuta'];
  const PLANS = ['Unimed', 'Bradesco Saúde', 'SulAmérica', 'Particular', 'Outro'];

  // Datas comemorativas da saúde, da enfermagem e do cuidado com o idoso
  const DATAS = [
    { m: 1, d: 1, name: 'Confraternização Universal', tag: 'Feriado' },
    { m: 1, d: 24, name: 'Dia Nacional do Aposentado', tag: 'Idoso' },
    { m: 2, d: 4, name: 'Dia Mundial do Câncer', tag: 'Saúde' },
    { m: 3, d: 8, name: 'Dia Internacional da Mulher', tag: 'Datas' },
    { m: 3, d: 21, name: 'Dia Nacional da Síndrome de Down', tag: 'Saúde' },
    { m: 3, d: 24, name: 'Dia Mundial da Tuberculose', tag: 'Saúde' },
    { m: 4, d: 2, name: 'Dia Mundial da Conscientização do Autismo', tag: 'Saúde' },
    { m: 4, d: 7, name: 'Dia Mundial da Saúde', tag: 'Saúde' },
    { m: 5, d: 5, name: 'Dia Nacional do Uso Racional de Medicamentos', tag: 'Saúde' },
    { m: 5, d: 12, name: 'Dia do Enfermeiro · Dia Internacional da Enfermagem', tag: 'Enfermagem' },
    { m: 5, d: 15, name: 'Dia Internacional da Família', tag: 'Família' },
    { m: 5, d: 20, name: 'Dia Nacional do Técnico e Auxiliar de Enfermagem', tag: 'Enfermagem' },
    { m: 5, d: 31, name: 'Dia Mundial sem Tabaco', tag: 'Saúde' },
    { m: 6, d: 14, name: 'Dia Mundial do Doador de Sangue', tag: 'Saúde' },
    { m: 6, d: 15, name: 'Dia Mundial de Conscientização da Violência contra a Pessoa Idosa', tag: 'Idoso' },
    { m: 6, d: 21, name: 'Dia Nacional de Controle da Asma', tag: 'Saúde' },
    { m: 7, d: 26, name: 'Dia dos Avós', tag: 'Idoso' },
    { m: 7, d: 28, name: 'Dia Mundial de Luta contra as Hepatites Virais', tag: 'Saúde' },
    { m: 8, d: 8, name: 'Dia Nacional de Combate ao Colesterol', tag: 'Saúde' },
    { m: 8, d: 29, name: 'Dia Nacional de Combate ao Fumo', tag: 'Saúde' },
    { m: 9, d: 21, name: 'Dia Nacional de Luta da Pessoa com Deficiência', tag: 'Datas' },
    { m: 9, d: 27, name: 'Dia Nacional do Doador de Órgãos', tag: 'Saúde' },
    { m: 9, d: 29, name: 'Dia Mundial do Coração', tag: 'Saúde' },
    { m: 10, d: 1, name: 'Dia Nacional e Internacional do Idoso', tag: 'Idoso' },
    { m: 10, d: 10, name: 'Dia Mundial da Saúde Mental', tag: 'Saúde' },
    { m: 10, d: 12, name: 'Dia das Crianças · Nossa Senhora Aparecida', tag: 'Feriado' },
    { m: 10, d: 16, name: 'Dia Mundial da Alimentação', tag: 'Saúde' },
    { m: 10, d: 18, name: 'Dia do Médico', tag: 'Saúde' },
    { m: 10, d: 20, name: 'Dia Mundial da Osteoporose', tag: 'Idoso' },
    { m: 10, d: 29, name: 'Dia Mundial do AVC', tag: 'Saúde' },
    { m: 11, d: 14, name: 'Dia Mundial do Diabetes', tag: 'Saúde' },
    { m: 11, d: 17, name: 'Dia Mundial da Prematuridade', tag: 'Saúde' },
    { m: 11, d: 20, name: 'Dia Nacional da Consciência Negra', tag: 'Feriado' },
    { m: 12, d: 1, name: 'Dia Mundial de Luta contra a AIDS', tag: 'Saúde' },
    { m: 12, d: 3, name: 'Dia Internacional da Pessoa com Deficiência', tag: 'Datas' },
    { m: 12, d: 25, name: 'Natal', tag: 'Feriado' }
  ];

  const TAG_STYLE = {
    'Enfermagem': { color: '#e81f76', soft: '#fdeaf2' },
    'Idoso': { color: '#d98a00', soft: '#fff4dd' },
    'Saúde': { color: '#2a86d8', soft: '#e8f3fd' },
    'Família': { color: '#7c5cd6', soft: '#f0ebfd' },
    'Datas': { color: '#16a3a3', soft: '#e4f7f7' },
    'Feriado': { color: '#1fa85a', soft: '#e6f7ee' }
  };

  const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const WEEKDAYS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

  /* ---------------- Utilidades ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = (p) => p + Date.now().toString(36).slice(-4) + Math.random().toString(36).slice(2, 6);
  const icon = (name, cls = '') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const pad2 = (n) => String(n).padStart(2, '0');

  const todayISO = (d = new Date()) => {
    const x = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return x.toISOString().slice(0, 10);
  };
  const ymOf = (dateStr) => dateStr.slice(0, 7);
  const daysInMonth = (ym) => {
    const [y, m] = ym.split('-').map(Number);
    return new Date(y, m, 0).getDate();
  };
  const monthLabel = (ym) => {
    const [y, m] = ym.split('-').map(Number);
    const name = MONTHS[m - 1] || '';
    return `${name.charAt(0).toUpperCase()}${name.slice(1)} ${y}`;
  };
  const monthShort = (ym) => {
    const [y, m] = ym.split('-').map(Number);
    return `${MONTHS[m - 1].slice(0, 3)}/${y}`;
  };
  const shiftMonth = (ym, delta) => {
    const [y, m] = ym.split('-').map(Number);
    const d = new Date(y, m - 1 + delta, 1);
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
  };
  const fmtDate = (iso) => {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  };
  const weekdayOf = (iso) => WEEKDAYS[new Date(iso + 'T12:00:00').getDay()];
  const money = (n) => (Number(n) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const parseMoney = (s) => {
    const cleaned = String(s || '').replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.');
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : null;
  };
  const relTime = (iso) => {
    const diff = (Date.now() - new Date(iso).getTime()) / 60000;
    if (diff < 1) return 'agora mesmo';
    if (diff < 60) return `há ${Math.round(diff)} min`;
    if (diff < 1440) return `há ${Math.round(diff / 60)} h`;
    if (diff < 2880) return 'ontem';
    return `há ${Math.round(diff / 1440)} dias`;
  };
  const age = (birth) => {
    if (!birth) return null;
    const b = new Date(birth + 'T12:00:00');
    const t = new Date();
    let a = t.getFullYear() - b.getFullYear();
    if (t.getMonth() < b.getMonth() || (t.getMonth() === b.getMonth() && t.getDate() < b.getDate())) a--;
    return a;
  };
  const initials = (name) => {
    const parts = String(name || '?').trim().split(/\s+/);
    return ((parts[0]?.[0] || '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
  };
  const avatarStyle = (name) => {
    let h = 0;
    for (const ch of String(name)) h = (h * 31 + ch.charCodeAt(0)) % 360;
    return `background:linear-gradient(140deg,hsl(${h} 88% 91%),hsl(${(h + 45) % 360} 82% 83%));color:hsl(${h} 48% 30%)`;
  };
  const avatar = (name, size = '') => `<span class="avatar ${size}" style="${avatarStyle(name)}">${esc(initials(name))}</span>`;
  const weight = (shift) => (shift === '24' ? 2 : shift ? 1 : 0);
  const onlyDigits = (s) => String(s || '').replace(/\D/g, '');

  function maskPhone(v) {
    const n = String(v).replace(/\D/g, '').slice(0, 11);
    if (n.length <= 10) return n.replace(/^(\d{0,2})(\d{0,4})(\d{0,4}).*/, (m, a, b, c) => [a && `(${a}`, a && a.length === 2 ? ') ' : '', b, c && `-${c}`].filter(Boolean).join(''));
    return n.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
  }
  function maskCPF(v) {
    const n = String(v).replace(/\D/g, '').slice(0, 11);
    return n.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2}).*/, '$1.$2.$3-$4').replace(/[-.]$/, '');
  }
  function maskCoren(v) {
    return String(v).replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').slice(0, 12);
  }

  /* ---------------- Persistência ---------------- */
  function defaultNotebooks(d) {
    const patients = (d.patients || []).filter((p) => p.status === 'ativo');
    const techs = (d.technicians || []).filter((t) => t.status === 'ativo');
    const mk = (name, pi, ti, status, notes) => ({
      id: uid('nb_'), name,
      patientId: patients[pi]?.id || '', technicianId: techs[ti]?.id || '',
      start: todayISO(), status, notes, files: [], createdAt: todayISO()
    });
    return [
      mk('Caderno de sinais vitais', 0, 0, 'Em uso', 'Aferições diárias'),
      mk('Caderno de medicações', 1, 1, 'Em uso', 'Conferência de horários'),
      mk('Caderno de curativos', 2, 2, 'Conferido', 'Evolução das feridas'),
      mk('Pasta de exames', 0, 3, 'Arquivado', 'Exames do mês')
    ];
  }

  function loadData() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d && Array.isArray(d.patients) && Array.isArray(d.technicians) && Array.isArray(d.shifts)) {
          if (!Array.isArray(d.notebooks)) d.notebooks = defaultNotebooks(d);
          return d;
        }
      }
    } catch (err) {
      console.warn('Não foi possível ler os dados salvos.', err);
    }
    const seedData = seed();
    try { localStorage.setItem(KEY, JSON.stringify(seedData)); } catch (err) { /* ignora */ }
    return seedData;
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state.data));
      return true;
    } catch (err) {
      toast('Não foi possível salvar. O armazenamento do navegador está cheio.', 'error');
      return false;
    }
  }

  function log(kind, text) {
    state.data.activity.unshift({ id: uid('l_'), kind, text, at: new Date().toISOString() });
    state.data.activity = state.data.activity.slice(0, 60);
  }

  /* ---------------- Acesso local (cadastro e login) ---------------- */
  const USERS_KEY = 'engenhariaSaude.users.v1';
  const SESSION_KEY = 'engenhariaSaude.session.v1';

  function loadUsers() {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (err) { return []; }
  }
  function saveUsers(list) {
    try { localStorage.setItem(USERS_KEY, JSON.stringify(list)); return true; }
    catch (err) { toast('Não foi possível salvar o cadastro neste navegador.', 'error'); return false; }
  }
  function sessionUser() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      return loadUsers().find((u) => u.id === s.userId) || null;
    } catch (err) { return null; }
  }
  function setSession(user) {
    try { localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id, at: new Date().toISOString() })); } catch (err) { /* ignora */ }
  }
  function clearSession() {
    try { localStorage.removeItem(SESSION_KEY); } catch (err) { /* ignora */ }
  }
  function randomSalt() {
    const arr = new Uint8Array(12);
    if (window.crypto && crypto.getRandomValues) crypto.getRandomValues(arr);
    else for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256);
    return Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  async function hashPassword(password, salt) {
    const text = `${salt}:${password}`;
    if (window.crypto && crypto.subtle) {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
    }
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
    return 'fb' + (h >>> 0).toString(16);
  }

  function authFail(msg) {
    const form = $('#authForm');
    if (!form) return;
    const wrap = form.parentElement;
    let box = wrap.querySelector('.auth-alert');
    if (!box) {
      box = document.createElement('div');
      box.className = 'auth-alert';
      form.prepend(box);
    }
    box.textContent = msg;
  }

  function renderAuth(mode = 'login', message = '') {
    const users = loadUsers();
    const first = users.length === 0;
    if (first) mode = 'register';
    const isRegister = mode === 'register';
    const root = $('#authRoot');
    $('.app').hidden = true;
    root.hidden = false;
    document.body.style.overflow = '';

    root.innerHTML = `<div class="auth-wrap">
      <div class="auth-card">
        <aside class="auth-side">
          <img class="auth-logo" src="assets/favicon.png" alt="Engenharia da Saúde" />
          <h1>Engenharia <em>da Saúde</em></h1>
          <p>Gestão de home care, pacientes e escalas em um só lugar.</p>
          <ul class="auth-list">
            <li>${icon('users')} Pacientes em 12h ou 24h</li>
            <li>${icon('table')} Escalas mensais em planilha</li>
            <li>${icon('id')} Técnicas com COREN e valores</li>
          </ul>
          <div class="auth-side-foot">${icon('heart')} Cuidar é nossa maior missão.</div>
        </aside>

        <div class="auth-form">
          <div class="auth-brand"><img src="assets/favicon.png" alt="" /> Engenharia da Saúde</div>
          ${first ? '' : `<div class="auth-tabs">
            <button class="${isRegister ? '' : 'active'}" data-auth-mode="login">Entrar</button>
            <button class="${isRegister ? 'active' : ''}" data-auth-mode="register">Criar conta</button>
          </div>`}
          <h2>${first ? 'Crie a conta de administração' : isRegister ? 'Criar sua conta' : 'Bem-vinda de volta'}</h2>
          <p class="auth-sub">${first
            ? 'Este é o primeiro acesso neste navegador. A conta criada será a administradora.'
            : isRegister ? 'Preencha seus dados para acessar o sistema.'
            : 'Entre com seu e-mail e senha para continuar.'}</p>
          ${message ? `<div class="auth-alert">${esc(message)}</div>` : ''}

          <form class="auth-form-el" id="authForm" data-mode="${mode}" novalidate>
            ${isRegister ? `<div class="field"><label>Nome completo</label><input name="name" autocomplete="name" placeholder="Seu nome completo" /></div>` : ''}
            <div class="field"><label>E-mail</label><input name="email" type="email" autocomplete="email" placeholder="voce@empresa.com" /></div>
            ${isRegister ? `<div class="field"><label>Função</label><select name="role">
                <option value="Administração">Administração</option>
                <option value="Coordenação">Coordenação</option>
                <option value="Técnica(o) de enfermagem">Técnica(o) de enfermagem</option>
              </select></div>
              <div class="field"><label>Telefone</label><input name="phone" placeholder="(51) 99999-9999" /></div>` : ''}
            <div class="field"><label>Senha</label><input name="password" type="password" autocomplete="${isRegister ? 'new-password' : 'current-password'}" placeholder="mínimo 6 caracteres" /></div>
            ${isRegister ? `<div class="field"><label>Confirmar senha</label><input name="password2" type="password" autocomplete="new-password" placeholder="repita a senha" /></div>` : ''}
            <button class="btn btn-primary btn-lg btn-block" type="submit">${first ? 'Criar conta e entrar' : isRegister ? 'Criar conta' : 'Entrar'}</button>
          </form>

          <div class="auth-note">${icon('shield')} Acesso local: as contas e os dados ficam salvos neste navegador. A senha é guardada de forma criptografada.</div>
        </div>
      </div>
    </div>`;

    bindAuth();
  }

  function bindAuth() {
    const root = $('#authRoot');
    $$('[data-auth-mode]', root).forEach((b) => b.addEventListener('click', () => renderAuth(b.dataset.authMode)));

    const form = $('#authForm', root);
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const mode = form.dataset.mode;
      const data = collect(form);
      const email = (data.email || '').trim().toLowerCase();
      const users = loadUsers();

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { authFail('Informe um e-mail válido.'); return; }

      if (mode === 'login') {
        const user = users.find((x) => x.email.toLowerCase() === email);
        if (!user) { authFail('Não encontramos uma conta com esse e-mail neste navegador.'); return; }
        if (!data.password) { authFail('Informe sua senha.'); return; }
        const hash = await hashPassword(data.password, user.salt);
        if (hash !== user.hash) { authFail('Senha incorreta. Tente novamente.'); return; }
        setSession(user);
        enterApp(user);
        return;
      }

      if (!data.name || data.name.trim().length < 3) { authFail('Informe seu nome completo.'); return; }
      if (!data.password || data.password.length < 6) { authFail('A senha precisa ter pelo menos 6 caracteres.'); return; }
      if (data.password !== data.password2) { authFail('As senhas não conferem.'); return; }
      if (users.some((x) => x.email.toLowerCase() === email)) { authFail('Já existe uma conta com esse e-mail.'); return; }

      const salt = randomSalt();
      const hash = await hashPassword(data.password, salt);
      const user = {
        id: uid('u_'), name: data.name.trim(), email,
        role: users.length === 0 ? 'Administração' : (data.role || 'Técnica(o) de enfermagem'),
        phone: data.phone || '', coren: '', salt, hash, createdAt: new Date().toISOString()
      };
      users.push(user);
      if (!saveUsers(users)) return;
      setSession(user);
      enterApp(user);
    });
  }

  function enterApp(user) {
    const root = $('#authRoot');
    root.hidden = true;
    root.innerHTML = '';
    $('.app').hidden = false;
    render();
    toast(`Bem-vinda, ${esc(user.name.split(' ')[0])}!`);
  }

  function logout() {
    clearSession();
    closeModal();
    renderAuth('login', 'Você saiu da sua conta.');
  }

  function openProfile() {
    const u = sessionUser();
    if (!u) return;
    const body = `<form id="formProfile" novalidate>
      <div class="profile-hero">
        ${avatar(u.name, 'lg')}
        <div><h3>${esc(u.name)}</h3><p>${esc(u.email)} · ${esc(u.role)}</p></div>
      </div>
      <div class="form-grid">
        ${field('name', 'Nome completo', { value: u.name, full: true, required: true })}
        ${field('role', 'Função', { value: u.role, options: ['Administração', 'Coordenação', 'Técnica(o) de enfermagem'] })}
        ${field('phone', 'Telefone', { value: u.phone, placeholder: '(51) 99999-9999' })}
        ${field('coren', 'COREN/RS', { value: u.coren, placeholder: 'Opcional' })}
        ${field('email', 'E-mail de acesso', { value: u.email, type: 'email', full: true, required: true })}
        <div class="profile-sep">Alterar senha · opcional</div>
        ${field('current', 'Senha atual', { type: 'password', full: true, placeholder: 'Confirme a senha atual para trocar' })}
        ${field('newPass', 'Nova senha', { type: 'password', placeholder: 'mínimo 6 caracteres' })}
        ${field('newPass2', 'Confirmar nova senha', { type: 'password', placeholder: 'repita a nova senha' })}
      </div>
    </form>`;

    openModal({
      title: 'Meu cadastro', subtitle: 'Seus dados de acesso e perfil.', iconName: 'id', size: 'lg', body,
      foot: `<button class="btn btn-danger" data-action="logout">${icon('x')} Sair da conta</button>
             <span class="spacer"></span>
             <button class="btn btn-ghost" data-action="close-modal">Cancelar</button>
             <button class="btn btn-primary" type="submit" form="formProfile">${icon('check')} Salvar</button>`
    });
  }

  async function saveProfile(form) {
    if (!validate(form, ['name', 'email'])) return;
    const u = sessionUser();
    if (!u) return;
    const f = collect(form);
    const email = f.email.trim().toLowerCase();
    const users = loadUsers();
    if (users.some((x) => x.id !== u.id && x.email.toLowerCase() === email)) {
      toast('Já existe outra conta com esse e-mail.', 'error');
      return;
    }

    const idx = users.findIndex((x) => x.id === u.id);
    if (idx < 0) return;
    const updated = { ...users[idx] };

    if (f.newPass || f.newPass2 || f.current) {
      if (!f.current) { toast('Informe a senha atual para trocar a senha.', 'error'); return; }
      const cur = await hashPassword(f.current, updated.salt);
      if (cur !== updated.hash) { toast('Senha atual incorreta.', 'error'); return; }
      if (!f.newPass || f.newPass.length < 6) { toast('A nova senha precisa ter pelo menos 6 caracteres.', 'error'); return; }
      if (f.newPass !== f.newPass2) { toast('As senhas novas não conferem.', 'error'); return; }
      const salt = randomSalt();
      updated.salt = salt;
      updated.hash = await hashPassword(f.newPass, salt);
    }

    updated.name = f.name;
    updated.role = f.role;
    updated.phone = f.phone;
    updated.coren = f.coren;
    updated.email = email;
    users[idx] = updated;
    if (!saveUsers(users)) return;

    closeModal();
    render();
    toast('Cadastro atualizado com sucesso.');
  }

  /* ---------------- Dados de exemplo (base: planilha CONTROLE DE ESCALAS) ---------------- */
  function seed() {
    const T = [
      ['f1', 'Marilia Siqueira Garcez', '195.039', 180, 'Técnica(o) de enfermagem', ''],
      ['f2', 'Patricia Luana da Silva Santos', '378.490', 180, 'Técnica(o) de enfermagem', ''],
      ['f3', 'Damaris Pires de Quadros Rodrigues', '1.559.144', 180, 'Técnica(o) de enfermagem', ''],
      ['f4', 'Luciana Souza', '228.847', 540, 'Técnica(o) de enfermagem', 'Folguista'],
      ['f5', 'Jane Adriana da Silva', '557.691', 15, 'Técnica(o) de enfermagem', 'Adaptação 2h'],
      ['f6', 'Andressa Barbosa Goulart', '1.993.331', 180, 'Técnica(o) de enfermagem', ''],
      ['f7', 'Daiane Firminio de Souza', '1.803.415', 180, 'Técnica(o) de enfermagem', ''],
      ['f8', 'Aline Garcia Eberhardt', '2.466.442', 180, 'Técnica(o) de enfermagem', ''],
      ['f9', 'Andreia Oliveira dos Santos', '1.910.066', 180, 'Técnica(o) de enfermagem', ''],
      ['f10', 'Graziele Marques Soares', '149.769', 180, 'Técnica(o) de enfermagem', ''],
      ['f11', 'Juslei Luize dos Santos Oribes', '', 180, 'Técnica(o) de enfermagem', 'Folguista'],
      ['f12', 'Marina Duarte', '123.456', 220, 'Enfermeira(o)', 'Coordenação'],
      ['f13', 'Camila Ribeiro', '567.890', 220, 'Enfermeira(o)', ''],
      ['f14', 'Jéssica Almeida', '678.901', 160, 'Auxiliar de enfermagem', '']
    ].map((r) => ({
      id: r[0], name: r[1], coren: r[2], shiftValue: r[3], role: r[4], notes: r[5],
      cpf: '', rg: '', birth: '', phone: '', email: '', address: '', city: 'Porto Alegre',
      admission: '', status: 'ativo', createdAt: todayISO()
    }));

    const P = [
      ['p1', 'Ada Santana', '24h', ['f1', 'f2', 'f3', 'f4'], 'Unimed', 'Cuidados paliativos · acamada', 'Filha — Renata Santana · (51) 99120-3344'],
      ['p2', 'Celia Borba', '24h', ['f6', 'f7', 'f8', 'f9'], 'Bradesco Saúde', 'Pós-AVC · dependente para AVDs', 'Filho — Marcelo Borba · (51) 99843-1122'],
      ['p3', 'Helena Martins de Souza', '12h', ['f10', 'f11'], 'Particular', 'Parkinson · apoio diurno', 'Filha — Carla Souza · (51) 99110-2233'],
      ['p4', 'Antônio Carlos Ferreira', '12h', ['f12', 'f13'], 'Unimed', 'Alzheimer em estágio moderado', 'Esposa — Nilda Ferreira · (51) 99432-1187'],
      ['p5', 'Maria Aparecida Lima', '24h', ['f14', 'f6', 'f7', 'f8'], 'SulAmérica', 'Pós-operatório de artroplastia de quadril', 'Filho — Diego Lima · (51) 99654-0091'],
      ['p6', 'João Batista Nunes', '12h', ['f5', 'f9'], 'Unimed', 'DPOC · dependente de oxigênio', 'Filha — Paula Nunes · (51) 99881-6620']
    ].map((r) => ({
      id: r[0], name: r[1], modality: r[2], technicianIds: r[3], plan: r[4], condition: r[5], emergency: r[6],
      cpf: '', birth: '', phone: '', address: '', city: 'Porto Alegre', notes: '', status: 'ativo',
      createdAt: todayISO()
    }));

    const ym = ymOf(todayISO());
    const shifts = [];
    const distribute = (patientId, technicianId, count) => {
      const dim = daysInMonth(ym);
      for (let i = 0; i < count; i++) {
        const day = Math.floor((i * dim) / count) + 1;
        shifts.push({
          id: `s_${patientId}_${technicianId}_${day}`,
          patientId, technicianId,
          date: `${ym}-${pad2(day)}`,
          shift: i % 2 === 0 ? 'D' : 'N'
        });
      }
    };

    // Ada Santana — números da planilha
    distribute('p1', 'f1', 8);
    distribute('p1', 'f2', 6);
    distribute('p1', 'f3', 10);
    distribute('p1', 'f4', 4);
    distribute('p1', 'f5', 2);
    // Celia Borba — números da planilha
    distribute('p2', 'f6', 11);
    distribute('p2', 'f7', 18);
    distribute('p2', 'f8', 13);
    distribute('p2', 'f9', 14);
    distribute('p2', 'f10', 4);
    // Demais pacientes
    distribute('p3', 'f10', 16);
    distribute('p3', 'f11', 14);
    distribute('p4', 'f12', 16);
    distribute('p4', 'f13', 14);
    distribute('p5', 'f14', 20);
    distribute('p5', 'f6', 15);
    distribute('p5', 'f7', 13);
    distribute('p5', 'f8', 12);
    distribute('p6', 'f5', 16);
    distribute('p6', 'f9', 14);

    return {
      version: 2,
      technicians: T,
      patients: P,
      shifts,
      notebooks: [
        { id: 'nb1', name: 'Caderno de sinais vitais', patientId: 'p1', technicianId: 'f1', start: `${ym}-01`, status: 'Em uso', notes: 'Aferições diárias · manhã e noite', files: [], createdAt: todayISO() },
        { id: 'nb2', name: 'Caderno de medicações', patientId: 'p2', technicianId: 'f6', start: `${ym}-01`, status: 'Em uso', notes: 'Conferência de horários e doses', files: [], createdAt: todayISO() },
        { id: 'nb3', name: 'Caderno de curativos', patientId: 'p3', technicianId: 'f10', start: `${ym}-01`, status: 'Conferido', notes: 'Evolução das feridas', files: [], createdAt: todayISO() },
        { id: 'nb4', name: 'Pasta de exames', patientId: 'p1', technicianId: 'f2', start: `${ym}-01`, status: 'Arquivado', notes: 'Exames de outubro', files: [], createdAt: todayISO() }
      ],
      activity: [
        { id: 'l1', kind: 'add', text: 'Escala de <strong>Ada Santana</strong> importada da planilha de setembro.', at: new Date(Date.now() - 14 * 60000).toISOString() },
        { id: 'l2', kind: 'check', text: 'Plantões de <strong>Celia Borba</strong> conferidos — 60 plantões no mês.', at: new Date(Date.now() - 52 * 60000).toISOString() },
        { id: 'l3', kind: 'edit', text: 'Valor do plantão de <strong>Luciana Souza</strong> ajustado para R$ 540,00.', at: new Date(Date.now() - 130 * 60000).toISOString() },
        { id: 'l4', kind: 'star', text: 'Nova técnica cadastrada: <strong>Juslei Luize dos Santos Oribes</strong>.', at: new Date(Date.now() - 5 * 3600000).toISOString() },
        { id: 'l5', kind: 'move', text: 'Paciente <strong>Maria Aparecida Lima</strong> passou para 24 horas (4 técnicas).', at: new Date(Date.now() - 26 * 3600000).toISOString() }
      ]
    };
  }

  /* ---------------- Estado ---------------- */
  const state = {
    view: 'dashboard',
    data: loadData(),
    month: ymOf(todayISO()),
    calMonth: ymOf(todayISO()),
    calDay: todayISO(),
    scalePatientId: null,
    patientQuery: '',
    patientFilter: 'todos',
    techQuery: '',
    techFilter: 'ativos',
    notebookQuery: '',
    selectedPatients: new Set(),
    selectedTechs: new Set(),
    importRows: [],
    importPatientId: null
  };

  const getTech = (id) => state.data.technicians.find((t) => t.id === id);
  const getPatient = (id) => state.data.patients.find((p) => p.id === id);
  if (!state.scalePatientId || !getPatient(state.scalePatientId)) {
    state.scalePatientId = state.data.patients[0]?.id || null;
  }

  const monthShifts = (ym) => state.data.shifts.filter((s) => s.date.startsWith(ym));
  const patientMonthShifts = (pid, ym) => state.data.shifts.filter((s) => s.patientId === pid && s.date.startsWith(ym));

  function scaleRows(patient, ym) {
    const ids = new Set(patient.technicianIds || []);
    patientMonthShifts(patient.id, ym).forEach((s) => ids.add(s.technicianId));
    return [...ids].map(getTech).filter(Boolean).map((tech) => {
      const byDay = {};
      patientMonthShifts(patient.id, ym).filter((s) => s.technicianId === tech.id).forEach((s) => { byDay[s.date] = s.shift; });
      const count = Object.values(byDay).reduce((n, sh) => n + weight(sh), 0);
      return { tech, byDay, count, total: count * (Number(tech.shiftValue) || 0) };
    }).sort((a, b) => b.count - a.count || a.tech.name.localeCompare(b.tech.name, 'pt-BR'));
  }

  function monthCost(ym, patientId) {
    return monthShifts(ym)
      .filter((s) => !patientId || s.patientId === patientId)
      .reduce((sum, s) => sum + (Number(getTech(s.technicianId)?.shiftValue) || 0) * weight(s.shift), 0);
  }

  function monthCount(ym, patientId) {
    return monthShifts(ym)
      .filter((s) => !patientId || s.patientId === patientId)
      .reduce((n, s) => n + weight(s.shift), 0);
  }

  /* ---------------- Componentes ---------------- */
  function pageHead({ eyebrow, title, sub, actions, iconName = 'sparkles' }) {
    return `<section class="page-head">
      <div>
        <span class="eyebrow">${icon(iconName)} ${esc(eyebrow)}</span>
        <h1 class="page-title">${title}</h1>
        ${sub ? `<p class="page-sub">${sub}</p>` : ''}
      </div>
      <div class="page-actions">${actions || ''}</div>
    </section>`;
  }

  function emptyState({ iconName = 'search', title, text, action }) {
    return `<div class="empty">
      <div class="empty-icon">${icon(iconName)}</div>
      <h3>${esc(title)}</h3>
      <p>${esc(text)}</p>
      ${action || ''}
    </div>`;
  }

  function modalityPill(mod) {
    const m = MODALITY[mod] || MODALITY['12h'];
    return `<span class="pill ${mod === '24h' ? 'pill-pink' : 'pill-blue'}">${icon('clock')} ${m.short}</span>`;
  }

  function shiftBadge(shift, small) {
    const s = SHIFTS[shift];
    if (!s) return '';
    const cls = shift === '24' ? 's24' : shift;
    return `<span class="shift-badge ${cls} ${small ? 'sm' : ''}" title="${s.label} · ${s.time}">${s.short}</span>`;
  }

  function statusPill(status) {
    return status === 'ativo'
      ? '<span class="pill pill-green"><span class="pdot"></span>Ativo</span>'
      : '<span class="pill pill-gray"><span class="pdot"></span>Inativo</span>';
  }

  /* =========================================================
     PAINEL
     ========================================================= */
  function viewDashboard() {
    const d = state.data;
    const ym = ymOf(todayISO());
    const today = todayISO();
    const patients = d.patients.filter((p) => p.status === 'ativo');
    const techs = d.technicians.filter((t) => t.status === 'ativo');
    const todays = d.shifts.filter((s) => s.date === today).sort((a, b) => a.shift.localeCompare(b.shift));
    const agendaPreview = todays.slice(0, 6);
    const countMonth = monthCount(ym);
    const costMonth = monthCost(ym);
    const p24 = patients.filter((p) => p.modality === '24h').length;
    const p12 = patients.length - p24;
    const hour = new Date().getHours();
    const greet = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
    const me = sessionUser();
    const firstName = (me?.name || 'Marina').trim().split(/\s+/)[0];

    const kpis = [
      { icon: 'users', label: 'Pacientes ativos', value: patients.length, unit: 'em cuidado', hint: `${p24} em 24h · ${p12} em 12h`, color: '#e81f76', soft: '#fdeaf2' },
      { icon: 'id', label: 'Técnicas na equipe', value: techs.length, unit: 'profissionais', hint: `${d.technicians.length} cadastradas no total`, color: '#7c5cd6', soft: '#f0ebfd' },
      { icon: 'table', label: 'Plantões no mês', value: countMonth, unit: 'plantões', hint: `${monthLabel(ym)} · ${todays.length} hoje`, color: '#2a86d8', soft: '#e8f3fd' },
      { icon: 'money', label: 'Custo da escala', value: money(costMonth), unit: '', hint: 'Somatório dos plantões do mês', color: '#1fa85a', soft: '#e6f7ee' }
    ];

    const kpiHTML = kpis.map((k) => `
      <article class="kpi" style="--kpi-color:${k.color};--kpi-soft:${k.soft};--kpi-grad:linear-gradient(90deg,${k.color},${k.color}55)">
        <div class="kpi-top"><span class="kpi-icon">${icon(k.icon)}</span><span class="kpi-trend flat">${esc(monthShort(ym))}</span></div>
        <div class="kpi-value">${typeof k.value === 'number' ? k.value : `<span class="money-lg">${k.value}</span>`}${k.unit ? `<small>${esc(k.unit)}</small>` : ''}</div>
        <div class="kpi-label">${esc(k.label)}</div>
        <div class="kpi-hint">${esc(k.hint)}</div>
      </article>`).join('');

    const todayHTML = todays.length ? agendaPreview.map((s) => {
      const p = getPatient(s.patientId);
      const t = getTech(s.technicianId);
      return `<div class="agenda-item" data-action="open-scale" data-patient="${s.patientId}">
        <div class="agenda-time">${shiftBadge(s.shift)}<small>${SHIFTS[s.shift]?.time || ''}</small></div>
        ${avatar(p?.name || '—', 'sm')}
        <div class="agenda-main">
          <strong>${esc(p?.name || 'Paciente removido')}</strong>
          <span>${icon('id')} ${esc(t?.name || 'Técnica removida')} · ${esc(MODALITY[p?.modality]?.short || '')}</span>
        </div>
      </div>`;
    }).join('') + (todays.length > agendaPreview.length ? `<div class="agenda-more"><button class="link-btn" data-nav="scales">+ ${todays.length - agendaPreview.length} plantão(ões) hoje · ver escala ${icon('arrow')}</button></div>` : '') : emptyState({
      iconName: 'calendar', title: 'Nenhum plantão hoje',
      text: 'Abra a escala do mês para lançar os plantões da equipe.',
      action: `<button class="btn btn-primary btn-sm" data-nav="scales">${icon('table')} Abrir escala</button>`
    });

    const modalityCounts = [
      ['24h', patients.filter((p) => p.modality === '24h').length, '#e81f76'],
      ['12h', patients.filter((p) => p.modality === '12h').length, '#2a86d8']
    ];
    const totalMod = patients.length || 1;
    const donutHTML = donutChart(modalityCounts.map(([k, v, c]) => ({ key: MODALITY[k].short, value: v, color: c })), totalMod, 'pacientes');

    const days = [];
    for (let i = 6; i >= 0; i--) {
      const dt = new Date();
      dt.setDate(dt.getDate() - i);
      const iso = todayISO(dt);
      days.push({ iso, count: d.shifts.filter((s) => s.date === iso).reduce((n, s) => n + weight(s.shift), 0) });
    }
    const maxDay = Math.max(1, ...days.map((x) => x.count));
    const barsHTML = days.map((x) => `
      <div class="bar-col" title="${fmtDate(x.iso)} · ${x.count} plantão(ões)">
        <span class="bar-val">${x.count}</span>
        <div class="bar ${x.count === 0 ? 'soft' : ''}" style="height:${Math.max(5, (x.count / maxDay) * 100)}%"></div>
        <span class="bar-label">${weekdayOf(x.iso)}</span>
      </div>`).join('');

    const activityHTML = d.activity.slice(0, 5).map((l) => {
      const map = {
        add: ['plus', '#e81f76', '#fdeaf2'], check: ['check', '#1fa85a', '#e6f7ee'],
        edit: ['edit', '#2a86d8', '#e8f3fd'], move: ['arrow', '#7c5cd6', '#f0ebfd'],
        star: ['star', '#d98a00', '#fff4dd'], alert: ['alert', '#d4392c', '#fdeceb']
      };
      const [ic, c, soft] = map[l.kind] || map.add;
      return `<div class="tl-item">
        <span class="tl-icon" style="background:${soft};color:${c}">${icon(ic)}</span>
        <div class="tl-body"><p>${l.text}</p><small>${relTime(l.at)}</small></div>
      </div>`;
    }).join('');

    return `
      ${pageHead({
        eyebrow: 'Painel de hoje',
        title: `${greet}, ${esc(firstName)}. <em>Vamos cuidar?</em>`,
        sub: todays.length
          ? `${todays.length} plantão${todays.length === 1 ? '' : 's'} hoje · ${monthCount(ym)} plantões em ${monthLabel(ym).toLowerCase()}.`
          : `Escala de ${monthLabel(ym).toLowerCase()} pronta para receber os plantões.`,
        actions: `<button class="btn btn-ghost" data-action="new-patient">${icon('plus')} Novo paciente</button>
                  <button class="btn btn-primary" data-action="new-technician">${icon('plus')} Nova técnica</button>`
      })}

      <div class="grid grid-4">${kpiHTML}</div>

      <div class="grid grid-dash mt-16">
        <section class="card">
          <div class="card-head">
            <div><h3>Plantões de hoje</h3><p>${fmtDate(today)} · ${todays.length} plantão${todays.length === 1 ? '' : 's'}</p></div>
            <button class="link-btn" data-nav="scales">Abrir escala ${icon('arrow')}</button>
          </div>
          <div class="agenda-list">${todayHTML}</div>
        </section>

        <section class="card">
          <div class="card-head"><div><h3>Modalidades</h3><p>Pacientes por tipo de acompanhamento</p></div></div>
          <div class="card-body">${donutHTML}</div>
        </section>
      </div>

      <div class="grid grid-dash mt-16">${calendarCard()}${datesCard()}</div>

      <div class="grid grid-dash mt-16">
        <section class="card">
          <div class="card-head"><div><h3>Últimos 7 dias</h3><p>Plantões lançados por dia</p></div></div>
          <div class="card-body"><div class="bars">${barsHTML}</div></div>
        </section>

        <section class="card">
          <div class="card-head"><div><h3>Atividade recente</h3><p>O que mudou na escala</p></div></div>
          <div class="card-body"><div class="timeline">${activityHTML || '<p class="page-sub">Nenhuma atividade ainda.</p>'}</div></div>
        </section>
      </div>

      <div class="summary-bar" style="margin-top:18px">
        <span class="sum-pill"><span class="pdot" style="background:#e81f76"></span> <b>${patients.length}</b> pacientes</span>
        <span class="sum-pill"><span class="pdot" style="background:#7c5cd6"></span> <b>${techs.length}</b> técnicas ativas</span>
        <span class="sum-pill"><span class="pdot" style="background:#2a86d8"></span> <b>${countMonth}</b> plantões no mês</span>
        <span class="sum-pill"><span class="pdot" style="background:#1fa85a"></span> <b>${money(costMonth)}</b> em escala</span>
      </div>`;
  }

  function donutChart(entries, total, label) {
    const R = 54, C = 2 * Math.PI * R;
    let acc = 0;
    const segs = entries.map((e) => {
      if (!e.value || !total) return '';
      const len = (e.value / total) * C;
      const draw = Math.max(len - 3, 0.5);
      const off = -acc;
      acc += len;
      return `<circle class="seg" cx="82" cy="82" r="${R}" stroke="${e.color}" stroke-dasharray="${draw} ${C - draw}" stroke-dashoffset="${off}"/>`;
    }).join('');
    const legend = entries.map((e) => `<div class="legend-row"><span class="lg-dot" style="background:${e.color}"></span>${esc(e.key)}<span class="lg-val">${e.value}</span></div>`).join('');
    return `<div class="donut-wrap">
      <div class="donut">
        <svg viewBox="0 0 164 164"><circle class="track" cx="82" cy="82" r="${R}"/>${segs}</svg>
        <div class="donut-center"><div><strong>${total}</strong><span>${esc(label)}</span></div></div>
      </div>
      <div class="legend">${legend}</div>
    </div>`;
  }

  /* ---------------- Calendário de datas comemorativas ---------------- */
  function eventsOn(iso) {
    const parts = iso.split('-').map(Number);
    const m = parts[1], d = parts[2];
    return DATAS.filter((e) => e.m === m && e.d === d);
  }

  function nextDates(count) {
    const base = new Date(todayISO() + 'T12:00:00');
    const start = new Date(base.getFullYear(), base.getMonth(), base.getDate());
    const out = [];
    DATAS.forEach((e) => {
      let dt = new Date(start.getFullYear(), e.m - 1, e.d);
      if (dt < start) dt = new Date(start.getFullYear() + 1, e.m - 1, e.d);
      out.push({ ...e, date: dt, days: Math.round((dt - start) / 86400000) });
    });
    return out.sort((a, b) => a.date - b.date).slice(0, count);
  }

  function calendarCard() {
    const [y, m] = state.calMonth.split('-').map(Number);
    const dim = new Date(y, m, 0).getDate();
    const firstDow = new Date(y, m - 1, 1).getDay();
    const prevDim = new Date(y, m - 1, 0).getDate();
    const prevDate = new Date(y, m - 2, 1);
    const nextDate = new Date(y, m, 1);

    const cells = [];
    for (let i = firstDow - 1; i >= 0; i--) {
      cells.push({ y: prevDate.getFullYear(), m: prevDate.getMonth() + 1, d: prevDim - i, out: true });
    }
    for (let d = 1; d <= dim; d++) cells.push({ y, m, d, out: false });
    let nd = 1;
    while (cells.length % 7 !== 0) {
      cells.push({ y: nextDate.getFullYear(), m: nextDate.getMonth() + 1, d: nd++, out: true });
    }

    const toISO = (c) => `${c.y}-${pad2(c.m)}-${pad2(c.d)}`;
    const today = todayISO();

    const cellsHTML = cells.map((c) => {
      const date = toISO(c);
      const evs = eventsOn(date);
      const dots = evs.slice(0, 3).map((e) => `<i class="cal-dot" style="background:${TAG_STYLE[e.tag]?.color || '#e81f76'}"></i>`).join('');
      const cls = [c.out ? 'out' : '', date === today ? 'today' : '', date === state.calDay ? 'selected' : '', evs.length ? 'has-date' : ''].filter(Boolean).join(' ');
      return `<button class="cal-cell ${cls}" data-action="cal-day" data-date="${date}" title="${evs.length ? esc(evs.map((e) => e.name).join(' · ')) : fmtDate(date)}">
        <span class="cal-num">${c.d}</span>
        <span class="cal-dots">${dots}</span>
      </button>`;
    }).join('');

    const sel = state.calDay && state.calDay.slice(0, 7) === state.calMonth ? state.calDay : null;
    const selEvs = sel ? eventsOn(sel) : [];
    const isToday = sel === today;

    return `<section class="card">
      <div class="card-head">
        <div><h3>Calendário do cuidado</h3><p>Datas comemorativas da saúde e da enfermagem</p></div>
        <button class="link-btn" data-action="cal-today">Hoje ${icon('arrow')}</button>
      </div>
      <div class="card-body">
        <div class="cal-nav">
          <button class="icon-btn tiny-nav prev" data-action="cal-prev" title="Mês anterior">${icon('chevron')}</button>
          <strong>${monthLabel(state.calMonth)}</strong>
          <button class="icon-btn tiny-nav next" data-action="cal-next" title="Próximo mês">${icon('chevron')}</button>
        </div>
        <div class="cal-grid">
          ${['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d) => `<span class="cal-dow">${d}</span>`).join('')}
          ${cellsHTML}
        </div>
        <div class="cal-foot">
          ${sel
            ? `<span class="cal-foot-date">${isToday ? 'Hoje' : 'Dia'} ${fmtDate(sel).slice(0, 5)}</span>
               <span class="cal-foot-text">${selEvs.length ? selEvs.map((e) => esc(e.name)).join(' · ') : 'Nenhuma data comemorativa'}</span>`
            : `<span class="cal-foot-text">Clique em um dia marcado para ver a data comemorativa.</span>`}
        </div>
      </div>
    </section>`;
  }

  function datesCard() {
    const parts = state.calMonth.split('-').map(Number);
    const m = parts[1];
    const today = todayISO();
    const monthEvs = DATAS.filter((e) => e.m === m).sort((a, b) => a.d - b.d);

    const rows = monthEvs.map((e) => {
      const date = `${state.calMonth}-${pad2(e.d)}`;
      const isToday = date === today;
      return `<button class="date-item ${isToday ? 'today' : ''}" data-action="cal-open" data-date="${date}">
        <span class="date-day">${pad2(e.d)}</span>
        <span class="date-main"><strong>${esc(e.name)}</strong><small>${esc(e.tag)}${isToday ? ' · hoje' : ''}</small></span>
        ${isToday ? '<span class="pill pill-pink">Hoje</span>' : ''}
      </button>`;
    }).join('');

    const upcoming = nextDates(3).map((e) => {
      const date = `${e.date.getFullYear()}-${pad2(e.m)}-${pad2(e.d)}`;
      const label = e.days === 0 ? 'hoje' : e.days === 1 ? 'amanhã' : `em ${e.days} dias`;
      return `<button class="date-item" data-action="cal-open" data-date="${date}">
        <span class="date-day">${pad2(e.d)}</span>
        <span class="date-main"><strong>${esc(e.name)}</strong><small>${fmtDate(date).slice(0, 5)} · ${label}</small></span>
      </button>`;
    }).join('');

    return `<section class="card">
      <div class="card-head"><div><h3>Datas de ${MONTHS[m - 1]}</h3><p>${monthEvs.length} data(s) comemorativa(s) no mês</p></div></div>
      <div class="card-body">
        <div class="date-list">${rows || '<p class="page-sub">Nenhuma data comemorativa neste mês.</p>'}</div>
        <div class="date-sub">Próximas datas · a partir de hoje</div>
        <div class="date-list">${upcoming}</div>
      </div>
    </section>`;
  }

  /* =========================================================
     ESCALAS — planilha mensal por paciente
     ========================================================= */
  function viewScales() {
    const d = state.data;
    const patients = d.patients.filter((p) => p.status === 'ativo');
    const patient = getPatient(state.scalePatientId) || patients[0];

    if (!patient) {
      return `${pageHead({ eyebrow: 'Controle de escalas', title: 'Escalas <em>do mês</em>', sub: 'Cadastre um paciente para começar a montar a escala.', actions: `<button class="btn btn-primary" data-action="new-patient">${icon('plus')} Novo paciente</button>` })}
        <section class="card">${emptyState({ iconName: 'users', title: 'Nenhum paciente cadastrado', text: 'Cadastre o primeiro paciente para lançar os plantões da equipe.' })}</section>`;
    }

    state.scalePatientId = patient.id;
    const ym = state.month;
    const dim = daysInMonth(ym);
    const rows = scaleRows(patient, ym);
    const totalCount = rows.reduce((n, r) => n + r.count, 0);
    const totalCost = rows.reduce((n, r) => n + r.total, 0);
    const teamSize = (patient.technicianIds || []).length;
    const required = MODALITY[patient.modality]?.techs || 2;
    const teamOk = teamSize === required;

    const currentMonth = ymOf(todayISO());
    const isCurrent = ym === currentMonth;

    const dayMeta = [];
    for (let day = 1; day <= dim; day++) {
      const iso = `${ym}-${pad2(day)}`;
      const dow = new Date(iso + 'T12:00:00').getDay();
      dayMeta.push({ day, iso, dow, weekend: dow === 0 || dow === 6, today: iso === todayISO() });
    }

    const dayTotals = dayMeta.map((m) => rows.reduce((n, r) => n + weight(r.byDay[m.iso]), 0));

    const headCells = dayMeta.map((m) => `<th class="day-th ${m.weekend ? 'weekend' : ''} ${m.today ? 'today' : ''}">
        <span class="dnum">${pad2(m.day)}</span><span class="dwk">${WEEKDAYS[m.dow]}</span>
      </th>`).join('');

    const bodyRows = rows.length ? rows.map((r, i) => {
      const days = dayMeta.map((m) => {
        const shift = r.byDay[m.iso];
        const s = SHIFTS[shift];
        return `<td class="day-td ${m.weekend ? 'weekend' : ''} ${m.today ? 'today' : ''}">
          <button class="shift-cell ${shift ? 'on ' + (shift === '24' ? 's24' : shift) : ''}" data-action="toggle-shift" data-tech="${r.tech.id}" data-date="${m.iso}"
            title="${esc(r.tech.name)} · ${fmtDate(m.iso)}${s ? ` · ${s.label} (${s.time})` : ' · clique para lançar plantão'}">${shift ? s.short : ''}</button>
        </td>`;
      }).join('');

      return `<tr>
        <td class="col-num sticky">${i + 1}</td>
        <td class="col-tech sticky">
          <div class="cell-person">${avatar(r.tech.name, 'sm')}<span class="who"><strong title="${esc(r.tech.name)}">${esc(r.tech.name)}</strong><small>${esc(r.tech.role || '')}</small></span></div>
        </td>
        <td class="col-coren">${esc(r.tech.coren || '—')}</td>
        <td class="col-count"><b>${r.count}</b></td>
        <td class="col-money">${money(r.tech.shiftValue)}</td>
        <td class="col-money total">${money(r.total)}</td>
        <td class="col-obs">${r.tech.notes ? `<span class="tag">${esc(r.tech.notes)}</span>` : ''}</td>
        ${days}
      </tr>`;
    }).join('') : `<tr><td class="col-num sticky"></td><td class="col-tech sticky" colspan="6">
        <div class="sheet-empty">Nenhuma técnica vinculada a este paciente. <button class="link-btn" data-action="edit-patient" data-id="${patient.id}">Montar equipe ${icon('arrow')}</button></div>
      </td><td colspan="${dim}"></td></tr>`;

    return `
      ${pageHead({
        eyebrow: 'Controle de escalas',
        title: 'Escalas <em>do mês</em>',
        sub: 'A mesma lógica da sua planilha: profissional, COREN, plantões, valores e os dias marcados. Clique em uma célula para lançar o plantão.',
        actions: `<button class="btn btn-ghost" data-action="import-sheet">${icon('upload')} Importar da planilha</button>
                  <button class="btn btn-primary" data-action="export-scale">${icon('download')} Exportar escala</button>`
      })}

      <div class="scale-toolbar">
        <label class="scale-patient">
          <span class="sp-label">Paciente</span>
          <select id="scalePatient">
            ${patients.map((p) => `<option value="${p.id}" ${p.id === patient.id ? 'selected' : ''}>${esc(p.name)} · ${MODALITY[p.modality]?.short || ''}</option>`).join('')}
          </select>
        </label>

        <div class="month-nav">
          <button class="icon-btn tiny-nav prev" data-action="month-prev" title="Mês anterior">${icon('chevron')}</button>
          <strong>${monthLabel(ym)}</strong>
          <button class="icon-btn tiny-nav next" data-action="month-next" title="Próximo mês">${icon('chevron')}</button>
          ${isCurrent ? '' : `<button class="btn btn-ghost btn-sm" data-action="month-today">Hoje</button>`}
        </div>

        <span class="spacer"></span>
        ${modalityPill(patient.modality)}
        <button class="btn btn-ghost btn-sm" data-action="edit-patient" data-id="${patient.id}">${icon('users')} Equipe ${teamSize}/${required}${teamOk ? '' : ' !'}</button>
      </div>

      <div class="summary-bar" style="margin-bottom:14px">
        <span class="sum-pill"><b>${rows.length}</b> técnicas na escala</span>
        <span class="sum-pill"><span class="pdot" style="background:#2a86d8"></span> <b>${totalCount}</b> plantões</span>
        <span class="sum-pill"><span class="pdot" style="background:#1fa85a"></span> <b>${money(totalCost)}</b> em valores</span>
        <span class="sum-pill"><span class="pdot" style="background:#7c5cd6"></span> <b>${rows.length ? Math.round((totalCount / dim) * 10) / 10 : 0}</b> plantões/dia</span>
        ${teamOk ? '' : `<span class="sum-pill warn-pill">${icon('alert')} equipe incompleta: ${teamSize} de ${required} técnicas</span>`}
      </div>

      <div class="sheet-card">
        <div class="sheet-scroll">
          <table class="sheet">
            <thead>
              <tr>
                <th class="col-num sticky">Nº</th>
                <th class="col-tech sticky">Profissional</th>
                <th class="col-coren">COREN/RS</th>
                <th class="col-count">Plantões</th>
                <th class="col-money">Valor</th>
                <th class="col-money">Total</th>
                <th class="col-obs">OBS</th>
                ${headCells}
              </tr>
            </thead>
            <tbody>${bodyRows}</tbody>
            <tfoot>
              <tr>
                <td class="col-num sticky"></td>
                <td class="col-tech sticky">Total do mês</td>
                <td class="col-coren"></td>
                <td class="col-count">${totalCount}</td>
                <td class="col-money"></td>
                <td class="col-money total">${money(totalCost)}</td>
                <td class="col-obs"></td>
                ${dayTotals.map((n, i) => `<td class="day-td ${dayMeta[i].weekend ? 'weekend' : ''}">${n || ''}</td>`).join('')}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div class="sheet-legend">
        <span class="legend-item"><i class="lg-chip D">D</i> Diurno · 07h–19h</span>
        <span class="legend-item"><i class="lg-chip N">N</i> Noturno · 19h–07h</span>
        <span class="legend-item"><i class="lg-chip s24">24</i> 24 horas (conta 2 plantões)</span>
        <span class="legend-hint">${icon('sparkles')} Clique na célula: D → N → 24h → limpar</span>
      </div>`;
  }

  /* =========================================================
     PACIENTES
     ========================================================= */
  function viewPatients() {
    const d = state.data;
    const ym = ymOf(todayISO());
    const q = state.patientQuery.trim().toLowerCase();
    let list = d.patients.slice();
    if (state.patientFilter === '24h' || state.patientFilter === '12h') list = list.filter((p) => p.modality === state.patientFilter);
    if (state.patientFilter === 'ativos') list = list.filter((p) => p.status === 'ativo');
    if (q) list = list.filter((p) => [p.name, p.cpf, p.phone, p.plan, p.condition, p.city].join(' ').toLowerCase().includes(q));
    list.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

    const sel = state.selectedPatients;
    const allSel = list.length > 0 && list.every((p) => sel.has(p.id));
    const selCount = sel.size;
    const selectedPatients = d.patients.filter((p) => sel.has(p.id));
    const allActive = selectedPatients.length > 0 && selectedPatients.every((p) => p.status === 'ativo');

    const rows = list.map((p) => {
      const team = (p.technicianIds || []).map(getTech).filter(Boolean);
      const required = MODALITY[p.modality]?.techs || 2;
      const count = monthCount(ym, p.id);
      const cost = monthCost(ym, p.id);
      const teamHTML = team.length
        ? `<div class="avatar-stack">${team.slice(0, 4).map((t) => `<span title="${esc(t.name)}">${avatar(t.name, 'xs')}</span>`).join('')}</div>
           <small class="${team.length === required ? 'ok' : 'warn'}">${team.length}/${required} técnicas</small>`
        : `<small class="warn">sem equipe</small>`;
      return `<tr data-action="view-patient" data-id="${p.id}">
        <td class="check-col"><label class="check-wrap"><input type="checkbox" class="row-check" data-select-patient="${p.id}" ${sel.has(p.id) ? 'checked' : ''} /></label></td>
        <td>
          <div class="cell-person">${avatar(p.name)}
            <span class="who"><strong>${esc(p.name)}</strong>
            <small>${p.condition ? esc(p.condition) : 'Acompanhamento domiciliar'}</small></span>
          </div>
        </td>
        <td>${esc(p.phone || '—')}<br><small style="color:var(--muted-2)">${esc(p.plan || 'Particular')}</small></td>
        <td>${modalityPill(p.modality)}</td>
        <td>${teamHTML}</td>
        <td><b>${count}</b> plantões<br><small style="color:var(--muted-2)">${money(cost)}</small></td>
        <td>${statusPill(p.status)}</td>
        <td>
          <div class="row-actions">
            <button class="act-btn" data-action="open-scale" data-patient="${p.id}" title="Abrir escala">${icon('table')}</button>
            <button class="act-btn" data-action="edit-patient" data-id="${p.id}" title="Editar paciente">${icon('edit')}</button>
            <button class="act-btn danger" data-action="delete-patient" data-id="${p.id}" title="Excluir paciente">${icon('trash')}</button>
          </div>
        </td>
      </tr>`;
    }).join('');

    const table = list.length ? `<div class="table-wrap"><table class="data">
      <thead><tr>
        <th class="check-col"><label class="check-wrap"><input type="checkbox" class="select-all" data-select-all="patients" ${allSel ? 'checked' : ''} /></label></th>
        <th>Paciente</th><th>Contato / convênio</th><th>Modalidade</th><th>Equipe</th><th>Escala do mês</th><th>Status</th><th style="text-align:right">Ações</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table></div>` : emptyState({
      iconName: q ? 'search' : 'users',
      title: q ? 'Nenhum paciente encontrado' : 'Nenhum paciente por aqui',
      text: q ? `Não encontramos resultados para "${q}".` : 'Cadastre o primeiro paciente para montar a escala de cuidado.',
      action: q
        ? `<button class="btn btn-ghost btn-sm" data-action="clear-patient-search">Limpar busca</button>`
        : `<button class="btn btn-primary btn-sm" data-action="new-patient">${icon('plus')} Cadastrar paciente</button>`
    });

    return `
      ${pageHead({
        eyebrow: 'Cadastro de pacientes',
        title: 'Pacientes <em>sob cuidado</em>',
        sub: 'Cada paciente com sua modalidade (12h ou 24h) e a equipe de técnicas responsável.',
        actions: `<button class="btn btn-ghost" data-action="export-patients">${icon('download')} Exportar</button>
                  <button class="btn btn-primary" data-action="new-patient">${icon('plus')} Novo paciente</button>`
      })}

      <div class="summary-bar" style="margin-bottom:16px">
        <span class="sum-pill"><b>${d.patients.length}</b> pacientes</span>
        <span class="sum-pill"><span class="pdot" style="background:#e81f76"></span> <b>${d.patients.filter((p) => p.modality === '24h').length}</b> em 24h</span>
        <span class="sum-pill"><span class="pdot" style="background:#2a86d8"></span> <b>${d.patients.filter((p) => p.modality === '12h').length}</b> em 12h</span>
        <span class="sum-pill"><span class="pdot" style="background:#1fa85a"></span> <b>${d.patients.filter((p) => p.status === 'ativo').length}</b> ativos</span>
      </div>

      <div class="toolbar">
        <label class="field-search">${icon('search')}<input id="patientSearch" placeholder="Buscar por nome, CPF, convênio..." value="${esc(state.patientQuery)}" autocomplete="off" /></label>
        <div class="chips">
          ${[['todos', 'Todos'], ['24h', '24h'], ['12h', '12h'], ['ativos', 'Ativos']].map(([v, l]) => `<button class="chip ${state.patientFilter === v ? 'active' : ''}" data-action="filter-patients" data-value="${v}">${l}</button>`).join('')}
        </div>
        <span class="spacer"></span>
        <span class="sum-pill">${list.length} exibido${list.length === 1 ? '' : 's'}</span>
      </div>

      ${selCount ? `<div class="bulk-bar">
        <span class="bulk-count"><b>${selCount}</b> selecionado${selCount === 1 ? '' : 's'}</span>
        <button class="btn btn-ghost btn-sm" data-action="bulk-patients-export">${icon('download')} Exportar</button>
        <button class="btn btn-ghost btn-sm" data-action="bulk-patients-status">${icon('check')} ${allActive ? 'Inativar' : 'Ativar'}</button>
        <button class="btn btn-danger btn-sm" data-action="bulk-patients-delete">${icon('trash')} Excluir</button>
        <span class="spacer"></span>
        <button class="link-btn" data-action="clear-selection">Limpar seleção</button>
      </div>` : ''}

      <section class="card">${table}</section>`;
  }

  /* =========================================================
     TÉCNICAS DE ENFERMAGEM (cadastro)
     ========================================================= */
  function viewTechniques() {
    const d = state.data;
    const ym = ymOf(todayISO());
    const q = state.techQuery.trim().toLowerCase();
    let list = d.technicians.slice();
    if (state.techFilter === 'ativos') list = list.filter((t) => t.status === 'ativo');
    if (state.techFilter === 'inativos') list = list.filter((t) => t.status === 'inativo');
    if (q) list = list.filter((t) => [t.name, t.coren, t.cpf, t.phone, t.role, t.email].join(' ').toLowerCase().includes(q));
    list.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

    const sel = state.selectedTechs;
    const allSel = list.length > 0 && list.every((t) => sel.has(t.id));
    const selCount = sel.size;
    const selectedTechs = d.technicians.filter((t) => sel.has(t.id));
    const allActive = selectedTechs.length > 0 && selectedTechs.every((t) => t.status === 'ativo');

    const rows = list.map((t) => {
      const shifts = d.shifts.filter((s) => s.technicianId === t.id && s.date.startsWith(ym));
      const count = shifts.reduce((n, s) => n + weight(s.shift), 0);
      const patients = new Set(shifts.map((s) => s.patientId));
      return `<tr data-action="view-technician" data-id="${t.id}">
        <td class="check-col"><label class="check-wrap"><input type="checkbox" class="row-check" data-select-tech="${t.id}" ${sel.has(t.id) ? 'checked' : ''} /></label></td>
        <td>
          <div class="cell-person">${avatar(t.name)}
            <span class="who"><strong>${esc(t.name)}</strong><small>${esc(t.role || 'Técnica de enfermagem')}</small></span>
          </div>
        </td>
        <td><b style="font-variant-numeric:tabular-nums">${esc(t.coren || '—')}</b></td>
        <td>${esc(t.phone || '—')}<br><small style="color:var(--muted-2)">${esc(t.email || 'sem e-mail')}</small></td>
        <td>${money(t.shiftValue)}</td>
        <td>${patients.size} paciente${patients.size === 1 ? '' : 's'}</td>
        <td><b>${count}</b> plantões<br><small style="color:var(--muted-2)">${money(count * (Number(t.shiftValue) || 0))}</small></td>
        <td>${statusPill(t.status)}</td>
        <td>
          <div class="row-actions">
            <button class="act-btn" data-action="open-scale-tech" data-id="${t.id}" title="Ver escala">${icon('table')}</button>
            <button class="act-btn" data-action="edit-technician" data-id="${t.id}" title="Editar técnica">${icon('edit')}</button>
            <button class="act-btn danger" data-action="delete-technician" data-id="${t.id}" title="Excluir técnica">${icon('trash')}</button>
          </div>
        </td>
      </tr>`;
    }).join('');

    const table = list.length ? `<div class="table-wrap"><table class="data">
      <thead><tr>
        <th class="check-col"><label class="check-wrap"><input type="checkbox" class="select-all" data-select-all="techs" ${allSel ? 'checked' : ''} /></label></th>
        <th>Técnica</th><th>COREN/RS</th><th>Contato</th><th>Valor plantão</th><th>Pacientes</th><th>Escala do mês</th><th>Status</th><th style="text-align:right">Ações</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table></div>` : emptyState({
      iconName: q ? 'search' : 'id',
      title: q ? 'Nenhuma técnica encontrada' : 'Cadastre a primeira técnica',
      text: q ? `Não encontramos resultados para "${q}".` : 'Inclua nome, COREN, identidade e valor do plantão — ou importe direto da planilha.',
      action: `<button class="btn btn-primary btn-sm" data-action="import-sheet">${icon('upload')} Importar da planilha</button>`
    });

    return `
      ${pageHead({
        eyebrow: 'Cadastro de técnicas',
        title: 'Técnicas de <em>enfermagem</em>',
        sub: 'Ficha completa de cada profissional: identidade, COREN, contato e valor do plantão.',
        actions: `<button class="btn btn-ghost" data-action="import-sheet">${icon('upload')} Importar planilha</button>
                  <button class="btn btn-primary" data-action="new-technician">${icon('plus')} Nova técnica</button>`
      })}

      <div class="summary-bar" style="margin-bottom:16px">
        <span class="sum-pill"><b>${d.technicians.length}</b> cadastradas</span>
        <span class="sum-pill"><span class="pdot" style="background:#1fa85a"></span> <b>${d.technicians.filter((t) => t.status === 'ativo').length}</b> ativas</span>
        <span class="sum-pill"><span class="pdot" style="background:#2a86d8"></span> <b>${monthCount(ym)}</b> plantões no mês</span>
        <span class="sum-pill"><span class="pdot" style="background:#e81f76"></span> <b>${d.technicians.filter((t) => !t.cpf).length}</b> sem identidade preenchida</span>
      </div>

      <div class="toolbar">
        <label class="field-search">${icon('search')}<input id="techSearch" placeholder="Buscar por nome, COREN, CPF..." value="${esc(state.techQuery)}" autocomplete="off" /></label>
        <div class="chips">
          ${[['ativos', 'Ativas'], ['inativos', 'Inativas'], ['todas', 'Todas']].map(([v, l]) => `<button class="chip ${state.techFilter === v ? 'active' : ''}" data-action="filter-tech" data-value="${v}">${l}</button>`).join('')}
        </div>
        <span class="spacer"></span>
        <span class="sum-pill">${list.length} exibida${list.length === 1 ? '' : 's'}</span>
      </div>

      ${selCount ? `<div class="bulk-bar">
        <span class="bulk-count"><b>${selCount}</b> selecionada${selCount === 1 ? '' : 's'}</span>
        <button class="btn btn-ghost btn-sm" data-action="bulk-techs-export">${icon('download')} Exportar</button>
        <button class="btn btn-ghost btn-sm" data-action="bulk-techs-status">${icon('check')} ${allActive ? 'Inativar' : 'Ativar'}</button>
        <button class="btn btn-danger btn-sm" data-action="bulk-techs-delete">${icon('trash')} Excluir</button>
        <span class="spacer"></span>
        <button class="link-btn" data-action="clear-selection">Limpar seleção</button>
      </div>` : ''}

      <section class="card">${table}</section>`;
  }

  /* =========================================================
     CADERNOS · organização + documentos escaneados
     ========================================================= */
  const NOTEBOOK_STATUS = ['Em uso', 'Conferido', 'Arquivado', 'Pendente'];

  function viewNotebooks() {
    const d = state.data;
    const q = state.notebookQuery.trim().toLowerCase();
    let list = (d.notebooks || []).slice();
    if (q) {
      list = list.filter((n) => [n.name, getPatient(n.patientId)?.name, getTech(n.technicianId)?.name, n.notes, n.status].join(' ').toLowerCase().includes(q));
    }
    const patients = d.patients.filter((p) => p.status === 'ativo');
    const techs = d.technicians.filter((t) => t.status === 'ativo');
    const totalFiles = (d.notebooks || []).reduce((sum, n) => sum + (n.files || []).length, 0);
    const inUse = (d.notebooks || []).filter((n) => n.status === 'Em uso').length;

    const rows = list.map((n, i) => {
      const files = n.files || [];
      return `<tr data-id="${n.id}">
        <td class="nb-num">${i + 1}</td>
        <td class="nb-name"><input class="cell-input" data-nb-id="${n.id}" data-nb-field="name" value="${esc(n.name)}" placeholder="Nome do caderno" /></td>
        <td>
          <select class="cell-input" data-nb-id="${n.id}" data-nb-field="patientId">
            <option value="">—</option>
            ${patients.map((p) => `<option value="${p.id}" ${n.patientId === p.id ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}
          </select>
        </td>
        <td>
          <select class="cell-input" data-nb-id="${n.id}" data-nb-field="technicianId">
            <option value="">—</option>
            ${techs.map((t) => `<option value="${t.id}" ${n.technicianId === t.id ? 'selected' : ''}>${esc(t.name)}</option>`).join('')}
          </select>
        </td>
        <td><input type="date" class="cell-input" data-nb-id="${n.id}" data-nb-field="start" value="${esc(n.start || '')}" /></td>
        <td>
          <select class="cell-input" data-nb-id="${n.id}" data-nb-field="status">
            ${NOTEBOOK_STATUS.map((s) => `<option ${n.status === s ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </td>
        <td><input class="cell-input" data-nb-id="${n.id}" data-nb-field="notes" value="${esc(n.notes || '')}" placeholder="Anotações" /></td>
        <td class="nb-files">
          <button class="file-chip ${files.length ? '' : 'empty'}" data-action="open-notebook-files" data-id="${n.id}" title="Ver arquivos escaneados">${icon('file')} ${files.length}</button>
          <button class="act-btn" data-action="scan-notebook" data-id="${n.id}" title="Escanear documento">${icon('camera')}</button>
        </td>
        <td class="nb-actions">
          <button class="act-btn danger" data-action="delete-notebook" data-id="${n.id}" title="Excluir caderno">${icon('trash')}</button>
        </td>
      </tr>`;
    }).join('');

    const table = list.length ? `<div class="table-wrap"><table class="data nb-table">
      <thead><tr>
        <th class="nb-num">Nº</th><th>Caderno</th><th>Paciente</th><th>Responsável</th><th>Início</th><th>Situação</th><th>Observações</th><th>Arquivos</th><th></th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table></div>` : emptyState({
      iconName: q ? 'search' : 'book',
      title: q ? 'Nenhum caderno encontrado' : 'Nenhum caderno por aqui',
      text: q ? `Não encontramos resultados para "${q}".` : 'Crie o primeiro caderno ou escaneie um documento para começar.',
      action: q
        ? `<button class="btn btn-ghost btn-sm" data-action="clear-notebook-search">Limpar busca</button>`
        : `<button class="btn btn-primary btn-sm" data-action="new-notebook">${icon('plus')} Novo caderno</button>`
    });

    return `
      ${pageHead({
        eyebrow: 'Organização de documentos',
        title: 'Cadernos <em>da equipe</em>',
        sub: 'Planilha editável para organizar os cadernos de cada paciente — clique nas células para preencher. Escaneie documentos e guarde tudo aqui.',
        actions: `<button class="btn btn-ghost" data-action="export-notebooks">${icon('download')} Exportar</button>
                  <button class="btn btn-primary" data-action="new-notebook">${icon('plus')} Novo caderno</button>`
      })}

      <div class="summary-bar" style="margin-bottom:16px">
        <span class="sum-pill"><b>${(d.notebooks || []).length}</b> cadernos</span>
        <span class="sum-pill"><span class="pdot" style="background:#2a86d8"></span> <b>${inUse}</b> em uso</span>
        <span class="sum-pill"><span class="pdot" style="background:#e81f76"></span> <b>${totalFiles}</b> arquivo(s) escaneado(s)</span>
      </div>

      <div class="toolbar">
        <label class="field-search">${icon('search')}<input id="notebookSearch" placeholder="Buscar caderno, paciente..." value="${esc(state.notebookQuery)}" autocomplete="off" /></label>
        <span class="spacer"></span>
        <span class="sum-pill">${list.length} exibido${list.length === 1 ? '' : 's'}</span>
      </div>

      <section class="card">${table}</section>

      <div class="nb-hint">${icon('camera')} Para escanear, use o ícone de câmera na coluna <strong>Arquivos</strong>. As imagens ficam salvas neste navegador (não vão para a nuvem).</div>`;
  }

  /* =========================================================
     RELATÓRIOS
     ========================================================= */
  function viewReports() {
    const d = state.data;
    const ym = state.month;
    const total = monthCount(ym);
    const cost = monthCost(ym);
    const activeTechs = d.technicians.filter((t) => t.status === 'ativo').length;

    const byPatient = d.patients.map((p) => ({ name: p.name, color: p.modality === '24h' ? '#e81f76' : '#2a86d8', count: monthCount(ym, p.id), cost: monthCost(ym, p.id) }))
      .sort((a, b) => b.cost - a.cost);
    const maxPatient = Math.max(1, ...byPatient.map((x) => x.cost));

    const byTech = d.technicians.map((t) => {
      const n = d.shifts.filter((s) => s.technicianId === t.id && s.date.startsWith(ym)).reduce((a, s) => a + weight(s.shift), 0);
      return { name: t.name, color: '#7c5cd6', count: n, value: n * (Number(t.shiftValue) || 0) };
    }).filter((x) => x.count > 0).sort((a, b) => b.count - a.count).slice(0, 8);
    const maxTech = Math.max(1, ...byTech.map((x) => x.count));

    const mods = [
      { key: '24 horas', value: d.patients.filter((p) => p.modality === '24h').length, color: '#e81f76' },
      { key: '12 horas', value: d.patients.filter((p) => p.modality === '12h').length, color: '#2a86d8' }
    ];

    const hbar = (rows, max, mode) => rows.length ? rows.map((r) => `
      <div class="hbar">
        <div class="hbar-top"><span>${esc(r.name)}</span><b>${mode === 'money' ? money(r.cost) : r.count}</b></div>
        <div class="hbar-track"><i style="width:${Math.max(3, ((mode === 'money' ? r.cost : r.count) / max) * 100)}%;background:${r.color}"></i></div>
      </div>`).join('') : '<p class="page-sub">Sem dados para este mês.</p>';

    return `
      ${pageHead({
        eyebrow: 'Análise do cuidado',
        title: 'Relatórios e <em>indicadores</em>',
        sub: `Leitura de ${monthLabel(ym).toLowerCase()}: plantões, custo por paciente e distribuição da equipe.`,
        actions: `<button class="btn btn-ghost" data-action="backup-json">${icon('download')} Backup</button>
                  <button class="btn btn-primary" data-action="export-scale">${icon('download')} Exportar escala</button>`
      })}

      <div class="grid grid-4">
        <article class="kpi" style="--kpi-color:#2a86d8;--kpi-soft:#e8f3fd"><div class="kpi-top"><span class="kpi-icon">${icon('table')}</span><span class="kpi-trend flat">${monthShort(ym)}</span></div><div class="kpi-value">${total}</div><div class="kpi-label">Plantões no mês</div><div class="kpi-hint">${d.shifts.filter((s) => s.date.startsWith(ym)).length} lançamentos</div></article>
        <article class="kpi" style="--kpi-color:#1fa85a;--kpi-soft:#e6f7ee"><div class="kpi-top"><span class="kpi-icon">${icon('money')}</span></div><div class="kpi-value"><span class="money-lg">${money(cost)}</span></div><div class="kpi-label">Custo da escala</div><div class="kpi-hint">Valor dos plantões do mês</div></article>
        <article class="kpi" style="--kpi-color:#7c5cd6;--kpi-soft:#f0ebfd"><div class="kpi-top"><span class="kpi-icon">${icon('id')}</span></div><div class="kpi-value">${activeTechs}</div><div class="kpi-label">Técnicas ativas</div><div class="kpi-hint">${d.technicians.length} no cadastro</div></article>
        <article class="kpi" style="--kpi-color:#e81f76;--kpi-soft:#fdeaf2"><div class="kpi-top"><span class="kpi-icon">${icon('users')}</span></div><div class="kpi-value">${d.patients.length}</div><div class="kpi-label">Pacientes</div><div class="kpi-hint">${d.patients.filter((p) => p.modality === '24h').length} em 24h</div></article>
      </div>

      <div class="grid grid-2 mt-16">
        <section class="card"><div class="card-head"><div><h3>Custo por paciente</h3><p>Valores do mês</p></div></div><div class="card-body">${hbar(byPatient, maxPatient, 'money')}</div></section>
        <section class="card"><div class="card-head"><div><h3>Plantões por técnica</h3><p>Top 8 do mês</p></div></div><div class="card-body">${hbar(byTech, maxTech, 'count')}</div></section>
      </div>

      <div class="grid grid-2 mt-16">
        <section class="card"><div class="card-head"><div><h3>Modalidades de acompanhamento</h3><p>12h × 24h</p></div></div><div class="card-body">${donutChart(mods, d.patients.length || 1, 'pacientes')}</div></section>
        <section class="card"><div class="card-head"><div><h3>Exportar dados</h3><p>Leve as informações para o Excel</p></div></div><div class="card-body" style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" data-action="export-patients">${icon('download')} Pacientes (CSV)</button>
          <button class="btn btn-ghost btn-sm" data-action="export-technicians">${icon('download')} Técnicas (CSV)</button>
          <button class="btn btn-ghost btn-sm" data-action="export-scale">${icon('download')} Escala (CSV)</button>
          <button class="btn btn-ghost btn-sm" data-action="backup-json">${icon('download')} Backup completo</button>
          <button class="btn btn-ghost btn-sm" data-action="import-sheet">${icon('upload')} Importar planilha</button>
        </div></section>
      </div>`;
  }

  /* =========================================================
     MODAIS
     ========================================================= */
  function openModal({ title, subtitle, iconName = 'sparkles', size = '', body, foot = '', onMount }) {
    const root = $('#modalRoot');
    root.innerHTML = `<div class="modal-overlay">
      <div class="modal ${size}" role="dialog" aria-modal="true" aria-label="${esc(title)}">
        <div class="modal-head">
          <span class="modal-icon">${icon(iconName)}</span>
          <div style="min-width:0"><h2>${esc(title)}</h2>${subtitle ? `<p>${esc(subtitle)}</p>` : ''}</div>
          <button class="modal-close" data-action="close-modal" aria-label="Fechar">${icon('x')}</button>
        </div>
        <div class="modal-body">${body}</div>
        ${foot ? `<div class="modal-foot">${foot}</div>` : ''}
      </div>
    </div>`;
    document.body.style.overflow = 'hidden';
    const overlay = root.firstElementChild;
    overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) closeModal(); });
    if (onMount) onMount(overlay);
    const first = overlay.querySelector('.modal-body input, .modal-body select, .modal-body textarea');
    if (first) setTimeout(() => first.focus({ preventScroll: true }), 80);
  }

  let modalCleanup = null;

  function closeModal() {
    if (modalCleanup) {
      try { modalCleanup(); } catch (err) { /* ignora */ }
      modalCleanup = null;
    }
    $('#modalRoot').innerHTML = '';
    document.body.style.overflow = '';
  }

  function toast(message, type = 'success') {
    const map = { success: 'check', error: 'alert', info: 'bell' };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<span class="t-icon">${icon(map[type] || 'check')}</span><span>${message}</span>`;
    $('#toasts').appendChild(el);
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 260); }, 3600);
  }

  function field(name, label, opts = {}) {
    const { value = '', type = 'text', placeholder = '', full = false, options = null, required = false, hint = '', textarea = false, rows = 3, min, max, step } = opts;
    const req = required ? ' <span class="req">*</span>' : '';
    let control;
    if (options) {
      control = `<select name="${name}">${options.map((o) => {
        const v = typeof o === 'string' ? o : o.value;
        const l = typeof o === 'string' ? o : o.label;
        return `<option value="${esc(v)}" ${String(value) === String(v) ? 'selected' : ''}>${esc(l)}</option>`;
      }).join('')}</select>`;
    } else if (textarea) {
      control = `<textarea name="${name}" rows="${rows}" placeholder="${esc(placeholder)}">${esc(value)}</textarea>`;
    } else {
      control = `<input name="${name}" type="${type}" value="${esc(value)}" placeholder="${esc(placeholder)}" ${min !== undefined ? `min="${min}"` : ''} ${max !== undefined ? `max="${max}"` : ''} ${step ? `step="${step}"` : ''} />`;
    }
    return `<div class="field ${full ? 'full' : ''}">
      <label>${esc(label)}${req}</label>
      ${control}
      ${hint ? `<span class="hint">${esc(hint)}</span>` : ''}
      <span class="err">Campo obrigatório.</span>
    </div>`;
  }

  function collect(form) {
    const o = {};
    new FormData(form).forEach((v, k) => { o[k] = typeof v === 'string' ? v.trim() : v; });
    return o;
  }

  function validate(form, required) {
    $$('.field', form).forEach((f) => f.classList.remove('invalid'));
    let ok = true;
    required.forEach((name) => {
      const input = form.elements[name];
      if (!input) return;
      if (!String(input.value || '').trim()) {
        ok = false;
        input.closest('.field')?.classList.add('invalid');
      }
    });
    if (!ok) {
      toast('Preencha os campos obrigatórios destacados.', 'error');
      form.querySelector('.field.invalid input, .field.invalid select, .field.invalid textarea')?.focus();
    }
    return ok;
  }

  /* ---------- Técnica (profissional) ---------- */
  function openTechnicianForm(t) {
    const isEdit = !!t;
    const body = `<form id="formTechnician" data-id="${t?.id || ''}" novalidate>
      <div class="form-grid">
        <div class="form-section-title">Identidade</div>
        ${field('name', 'Nome completo', { value: t?.name, placeholder: 'Ex.: Marilia Siqueira Garcez', full: true, required: true })}
        ${field('cpf', 'CPF', { value: t?.cpf, placeholder: '000.000.000-00' })}
        ${field('rg', 'RG / documento', { value: t?.rg, placeholder: '00.000.000-0' })}
        ${field('birth', 'Data de nascimento', { value: t?.birth, type: 'date', max: todayISO() })}
        ${field('phone', 'Telefone / WhatsApp', { value: t?.phone, placeholder: '(51) 99999-9999' })}
        ${field('email', 'E-mail', { value: t?.email, type: 'email', placeholder: 'nome@email.com' })}
        ${field('admission', 'Data de admissão', { value: t?.admission, type: 'date' })}
        ${field('address', 'Endereço', { value: t?.address, placeholder: 'Rua, número — bairro', full: true })}
        ${field('city', 'Cidade', { value: t?.city || 'Porto Alegre' })}

        <div class="form-section-title">Registro profissional</div>
        ${field('coren', 'COREN/RS', { value: t?.coren, placeholder: 'Ex.: 195.039', required: true, hint: 'Registro no Conselho Regional de Enfermagem' })}
        ${field('role', 'Função', { value: t?.role || ROLES[0], options: ROLES, required: true })}
        ${field('shiftValue', 'Valor do plantão (R$)', { value: t?.shiftValue ?? 180, type: 'number', min: 0, step: '0.01', required: true })}
        ${field('status', 'Status', { value: t?.status || 'ativo', options: [{ value: 'ativo', label: 'Ativa' }, { value: 'inativo', label: 'Inativa' }] })}
        ${field('notes', 'Observações', { value: t?.notes, placeholder: 'Folguista, adaptação, restrições...', textarea: true, full: true })}
      </div>
    </form>`;

    openModal({
      title: isEdit ? 'Editar técnica' : 'Nova técnica de enfermagem',
      subtitle: isEdit ? 'Atualize identidade, COREN e valor do plantão.' : 'Preencha a ficha completa da profissional.',
      iconName: 'id', size: 'lg', body,
      foot: `<button class="btn btn-ghost" data-action="close-modal">Cancelar</button>
             <button class="btn btn-primary" type="submit" form="formTechnician">${icon('check')} ${isEdit ? 'Salvar alterações' : 'Cadastrar técnica'}</button>`,
      onMount(overlay) {
        const phone = overlay.querySelector('[name="phone"]');
        phone.addEventListener('input', () => { phone.value = maskPhone(phone.value); });
        const cpf = overlay.querySelector('[name="cpf"]');
        cpf.addEventListener('input', () => { cpf.value = maskCPF(cpf.value); });
        const coren = overlay.querySelector('[name="coren"]');
        coren.addEventListener('input', () => { coren.value = maskCoren(coren.value); });
      }
    });
  }

  function saveTechnician(form) {
    if (!validate(form, ['name', 'coren', 'role', 'shiftValue'])) return;
    const f = collect(form);
    const id = form.dataset.id;
    const existing = id ? getTech(id) : null;
    const obj = {
      name: f.name, cpf: f.cpf, rg: f.rg, birth: f.birth, phone: f.phone, email: f.email,
      admission: f.admission, address: f.address, city: f.city,
      coren: f.coren, role: f.role, shiftValue: Number(f.shiftValue) || 0,
      status: f.status, notes: f.notes
    };
    if (existing) {
      Object.assign(existing, obj);
      log('edit', `Ficha de <strong>${esc(obj.name)}</strong> atualizada.`);
      toast('Técnica atualizada com sucesso.');
    } else {
      state.data.technicians.push({ id: uid('f_'), createdAt: todayISO(), ...obj });
      log('add', `Técnica <strong>${esc(obj.name)}</strong> cadastrada.`);
      toast('Técnica cadastrada com sucesso.');
    }
    save(); closeModal(); render();
  }

  function openTechnicianDetail(id) {
    const t = getTech(id);
    if (!t) return;
    const ym = ymOf(todayISO());
    const shifts = state.data.shifts.filter((s) => s.technicianId === id && s.date.startsWith(ym));
    const count = shifts.reduce((n, s) => n + weight(s.shift), 0);
    const patients = [...new Set(shifts.map((s) => s.patientId))].map(getPatient).filter(Boolean);

    const body = `
      <div class="detail-hero">
        ${avatar(t.name, 'lg')}
        <div style="min-width:0">
          <h3>${esc(t.name)}</h3>
          <p>${esc(t.role || 'Técnica de enfermagem')} · COREN/RS ${esc(t.coren || '—')}</p>
          <div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap">
            ${statusPill(t.status)}
            <span class="tag">${money(t.shiftValue)} / plantão</span>
            ${t.notes ? `<span class="tag">${esc(t.notes)}</span>` : ''}
          </div>
        </div>
      </div>

      <div class="detail-grid">
        <div class="detail-item"><span class="di-icon">${icon('id')}</span><div class="di-body"><small>CPF</small><p>${esc(t.cpf || 'não informado')}</p></div></div>
        <div class="detail-item"><span class="di-icon">${icon('id')}</span><div class="di-body"><small>RG</small><p>${esc(t.rg || 'não informado')}</p></div></div>
        <div class="detail-item"><span class="di-icon">${icon('calendar')}</span><div class="di-body"><small>Nascimento</small><p>${t.birth ? `${fmtDate(t.birth)}${age(t.birth) ? ` (${age(t.birth)} anos)` : ''}` : 'não informado'}</p></div></div>
        <div class="detail-item"><span class="di-icon">${icon('phone')}</span><div class="di-body"><small>Telefone</small><p>${esc(t.phone || 'não informado')}</p></div></div>
        <div class="detail-item"><span class="di-icon">${icon('bell')}</span><div class="di-body"><small>E-mail</small><p>${esc(t.email || 'não informado')}</p></div></div>
        <div class="detail-item"><span class="di-icon">${icon('pin')}</span><div class="di-body"><small>Endereço</small><p>${esc([t.address, t.city].filter(Boolean).join(' · ') || 'não informado')}</p></div></div>
      </div>

      <div class="detail-block">
        <h4>Escala de ${monthLabel(ym).toLowerCase()}</h4>
        <div class="detail-stats">
          <div><strong>${count}</strong><span>plantões</span></div>
          <div><strong>${money(count * (Number(t.shiftValue) || 0))}</strong><span>a receber</span></div>
          <div><strong>${patients.length}</strong><span>paciente(s)</span></div>
        </div>
      </div>

      <div class="history">
        <h4>Pacientes atendidos · ${patients.length}</h4>
        ${patients.length ? patients.map((p) => {
          const n = shifts.filter((s) => s.patientId === p.id).reduce((a, s) => a + weight(s.shift), 0);
          return `<div class="history-row">
            ${avatar(p.name, 'sm')}
            <div class="hr-main"><strong>${esc(p.name)}</strong><small>${MODALITY[p.modality]?.label || ''}</small></div>
            <span class="pill pill-gray">${n} plantões</span>
          </div>`;
        }).join('') : '<p class="page-sub">Nenhum plantão lançado neste mês.</p>'}
      </div>`;

    openModal({
      title: 'Ficha da técnica', subtitle: `Cadastrada em ${fmtDate(t.createdAt)}`, iconName: 'id', size: 'lg', body,
      foot: `<button class="btn btn-danger" data-action="delete-technician" data-id="${t.id}">${icon('trash')} Excluir</button>
             <span class="spacer"></span>
             <button class="btn btn-ghost" data-action="edit-technician" data-id="${t.id}">${icon('edit')} Editar</button>
             <button class="btn btn-primary" data-action="open-scale-tech" data-id="${t.id}">${icon('table')} Ver escala</button>`
    });
  }

  /* ---------- Cadernos: arquivos e scanner ---------- */
  function getNotebook(id) { return (state.data.notebooks || []).find((n) => n.id === id); }

  let idbPromise = null;
  function idbOpen() {
    if (!window.indexedDB) return Promise.reject(new Error('IndexedDB indisponível'));
    if (idbPromise) return idbPromise;
    idbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open('engenhariaArquivos', 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains('arquivos')) db.createObjectStore('arquivos');
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return idbPromise;
  }

  async function idbPut(id, blob) {
    const db = await idbOpen();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('arquivos', 'readwrite');
      tx.objectStore('arquivos').put(blob, id);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  }

  async function idbGet(id) {
    const db = await idbOpen();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('arquivos', 'readonly');
      const req = tx.objectStore('arquivos').get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  async function idbDel(id) {
    const db = await idbOpen();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('arquivos', 'readwrite');
      tx.objectStore('arquivos').delete(id);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  }

  function addNotebook() {
    if (!Array.isArray(state.data.notebooks)) state.data.notebooks = [];
    const nb = {
      id: uid('nb_'), name: '', patientId: '', technicianId: '',
      start: todayISO(), status: 'Em uso', notes: '', files: [], createdAt: new Date().toISOString()
    };
    state.data.notebooks.push(nb);
    save(); render();
    setTimeout(() => {
      const el = document.querySelector(`[data-nb-id="${nb.id}"][data-nb-field="name"]`);
      if (el) el.focus();
    }, 60);
  }

  function deleteNotebook(id) {
    const nb = getNotebook(id);
    if (!nb) return;
    confirmDialog({
      title: 'Excluir caderno?',
      message: `O caderno <strong>${esc(nb.name || 'sem nome')}</strong> e os arquivos anexados serão removidos.`,
      onConfirm() {
        (nb.files || []).forEach((f) => { idbDel(f.id).catch(() => {}); });
        state.data.notebooks = state.data.notebooks.filter((n) => n.id !== id);
        log('alert', `Caderno <strong>${esc(nb.name || 'sem nome')}</strong> removido.`);
        save(); closeModal(); render();
        toast('Caderno excluído.', 'info');
      }
    });
  }

  function exportNotebooks() {
    const rows = [['Nº', 'Caderno', 'Paciente', 'Responsável', 'Início', 'Situação', 'Observações', 'Arquivos']];
    (state.data.notebooks || []).forEach((n, i) => rows.push([
      i + 1, n.name, getPatient(n.patientId)?.name || '', getTech(n.technicianId)?.name || '',
      fmtDate(n.start), n.status, n.notes, (n.files || []).length
    ]));
    download(`cadernos-engenharia-da-saude-${todayISO()}.csv`, csv(rows), 'text/csv;charset=utf-8');
    toast('CSV de cadernos exportado.');
  }

  function openScanner(notebookId) {
    const nb = getNotebook(notebookId);
    if (!nb) return;

    let stream = null;
    let pages = [];
    const urls = [];

    const stopCamera = () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
        stream = null;
      }
    };
    modalCleanup = () => {
      stopCamera();
      urls.forEach((u) => URL.revokeObjectURL(u));
    };

    openModal({
      title: 'Escanear documento',
      subtitle: `Anexar ao caderno "${nb.name || 'sem nome'}"`,
      iconName: 'scan', size: 'lg',
      body: `<div class="scan-tabs">
          <button class="active" data-scan-tab="camera">${icon('camera')} Câmera</button>
          <button data-scan-tab="file">${icon('file')} Arquivo</button>
        </div>
        <div class="scan-pane" id="scanCameraPane">
          <div class="scan-video-wrap">
            <video id="scanVideo" autoplay playsinline muted></video>
            <div class="scan-empty" id="scanEmpty">${icon('camera')}<p>Clique em <strong>Ativar câmera</strong> e posicione o documento na frente dela.</p></div>
          </div>
          <div class="scan-actions">
            <button class="btn btn-ghost btn-sm" id="scanStart">${icon('camera')} Ativar câmera</button>
            <button class="btn btn-soft btn-sm" id="scanCapture" disabled>${icon('scan')} Capturar página</button>
          </div>
          <p class="scan-hint">Dica: luz por cima, documento apoiado na mesa e enquadrado inteiro.</p>
        </div>
        <div class="scan-pane" id="scanFilePane" hidden>
          <label class="scan-drop">
            <input type="file" id="scanInput" accept="image/*,application/pdf" multiple hidden />
            ${icon('upload')}
            <strong>Escolher arquivos</strong>
            <span>Imagens (JPG/PNG) ou PDF · até 10 MB cada</span>
          </label>
        </div>
        <div class="scan-preview" id="scanPreview"></div>`,
      foot: `<span class="scan-count" id="scanCount">0 página(s)</span><span class="spacer"></span>
             <button class="btn btn-ghost" data-action="close-modal">Cancelar</button>
             <button class="btn btn-primary" id="scanSave" disabled>${icon('check')} Salvar anexos</button>`
    });

    const video = $('#scanVideo');
    const startBtn = $('#scanStart');
    const captureBtn = $('#scanCapture');
    const preview = $('#scanPreview');
    const saveBtn = $('#scanSave');
    const countEl = $('#scanCount');

    const renderPreview = () => {
      preview.innerHTML = pages.map((p, i) => `
        <div class="scan-thumb">
          ${p.type && p.type.startsWith('image') ? `<img src="${p.url}" alt="" />` : `<span class="pdf-icon">PDF</span>`}
          <button class="scan-remove" data-remove="${i}" title="Remover">×</button>
          <small>${esc(p.name)}</small>
        </div>`).join('');
      countEl.textContent = `${pages.length} página(s)`;
      saveBtn.disabled = pages.length === 0;
    };

    const addPage = (blob, name) => {
      const url = URL.createObjectURL(blob);
      urls.push(url);
      pages.push({ blob, name, type: blob.type || 'image/jpeg', url });
      renderPreview();
    };

    $$('[data-scan-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        $$('[data-scan-tab]').forEach((b) => b.classList.toggle('active', b === btn));
        $('#scanCameraPane').hidden = btn.dataset.scanTab !== 'camera';
        $('#scanFilePane').hidden = btn.dataset.scanTab !== 'file';
      });
    });

    startBtn.addEventListener('click', async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        toast('Este navegador não expõe a câmera. Use a aba "Arquivo".', 'error');
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
          audio: false
        });
        video.srcObject = stream;
        await video.play().catch(() => {});
        $('#scanEmpty').hidden = true;
        captureBtn.disabled = false;
        startBtn.innerHTML = `${icon('camera')} Trocar câmera`;
      } catch (err) {
        toast('Não foi possível ligar a câmera. Autorize o acesso ou use a aba "Arquivo".', 'error');
      }
    });

    captureBtn.addEventListener('click', () => {
      if (!video.videoWidth) return;
      const canvas = document.createElement('canvas');
      const maxW = 1600;
      const scale = Math.min(1, maxW / video.videoWidth);
      canvas.width = Math.round(video.videoWidth * scale);
      canvas.height = Math.round(video.videoHeight * scale);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) addPage(blob, `pagina-${pages.length + 1}.jpg`);
      }, 'image/jpeg', 0.85);
    });

    $('#scanInput').addEventListener('change', (e) => {
      Array.from(e.target.files || []).forEach((file) => {
        if (file.size > 10 * 1024 * 1024) { toast(`${file.name}: acima de 10 MB.`, 'error'); return; }
        addPage(file, file.name);
      });
      e.target.value = '';
    });

    preview.addEventListener('click', (e) => {
      const btn = e.target.closest('.scan-remove');
      if (!btn) return;
      const i = Number(btn.dataset.remove);
      if (pages[i]) {
        URL.revokeObjectURL(pages[i].url);
        pages.splice(i, 1);
        renderPreview();
      }
    });

    saveBtn.addEventListener('click', async () => {
      if (!pages.length) return;
      saveBtn.disabled = true;
      saveBtn.innerHTML = 'Salvando...';
      try {
        for (const p of pages) {
          const id = uid('file_');
          await idbPut(id, p.blob);
          nb.files = nb.files || [];
          nb.files.push({
            id, name: p.name, type: p.type, size: p.blob.size,
            at: new Date().toISOString()
          });
        }
        save();
        stopCamera();
        closeModal();
        render();
        toast(`${pages.length} arquivo(s) anexado(s) ao caderno.`);
      } catch (err) {
        console.error(err);
        toast('Não foi possível salvar os arquivos neste navegador.', 'error');
        saveBtn.disabled = false;
        saveBtn.innerHTML = `${icon('check')} Salvar anexos`;
      }
    });
  }

  async function openNotebookFiles(notebookId) {
    const nb = getNotebook(notebookId);
    if (!nb) return;
    const files = nb.files || [];
    if (!files.length) {
      toast('Nenhum arquivo escaneado neste caderno.', 'info');
      return;
    }

    const items = [];
    const urls = [];
    for (const f of files) {
      let url = null;
      try {
        const blob = await idbGet(f.id);
        if (blob) {
          url = URL.createObjectURL(blob);
          urls.push(url);
        }
      } catch (err) { /* ignora */ }
      items.push({ meta: f, url });
    }
    modalCleanup = () => urls.forEach((u) => URL.revokeObjectURL(u));

    const body = `<div class="file-grid">
      ${items.map((it) => `
        <div class="file-item">
          <div class="file-thumb">
            ${it.url && it.meta.type?.startsWith('image') ? `<img src="${it.url}" alt="" />` : `<span class="pdf-icon">${it.meta.type === 'application/pdf' ? 'PDF' : '?'}</span>`}
          </div>
          <div class="file-meta">
            <strong>${esc(it.meta.name)}</strong>
            <small>${Math.max(1, Math.round((it.meta.size || 0) / 1024))} KB · ${fmtDate((it.meta.at || '').slice(0, 10))}</small>
          </div>
          <div class="file-actions">
            ${it.url ? `<a class="act-btn" href="${it.url}" target="_blank" rel="noopener" title="Abrir">${icon('chevron')}</a>` : ''}
            <button class="act-btn danger" data-action="delete-file" data-nb="${nb.id}" data-file="${it.meta.id}" title="Excluir">${icon('trash')}</button>
          </div>
        </div>`).join('')}
    </div>`;

    openModal({
      title: 'Arquivos do caderno',
      subtitle: `${nb.name || 'Sem nome'} · ${files.length} arquivo(s)`,
      iconName: 'file', size: 'lg', body,
      foot: `<button class="btn btn-primary" data-action="close-modal">Fechar</button>`
    });
  }

  /* ---------- Paciente ---------- */
  function openPatientForm(p) {
    const isEdit = !!p;
    const techs = state.data.technicians.filter((t) => t.status === 'ativo' || (p?.technicianIds || []).includes(t.id));
    const selected = new Set(p?.technicianIds || []);
    const modality = p?.modality || '12h';
    const limit = MODALITY[modality].techs;

    const teamOpts = techs.map((t) => `
      <label class="team-opt ${selected.has(t.id) ? 'selected' : ''}">
        <input type="checkbox" name="technicianIds" value="${t.id}" ${selected.has(t.id) ? 'checked' : ''} />
        ${avatar(t.name, 'sm')}
        <span class="to-main"><strong>${esc(t.name)}</strong><small>COREN ${esc(t.coren || '—')} · ${esc(t.role || '')}</small></span>
        <span class="to-check">${icon('check')}</span>
      </label>`).join('');

    const body = `<form id="formPatient" data-id="${p?.id || ''}" novalidate>
      <div class="form-grid">
        <div class="form-section-title">Identificação</div>
        ${field('name', 'Nome completo', { value: p?.name, placeholder: 'Ex.: Ada Santana', full: true, required: true })}
        ${field('cpf', 'CPF', { value: p?.cpf, placeholder: '000.000.000-00' })}
        ${field('birth', 'Data de nascimento', { value: p?.birth, type: 'date', max: todayISO() })}
        ${field('phone', 'Telefone / WhatsApp', { value: p?.phone, placeholder: '(51) 99999-9999', required: true })}
        ${field('plan', 'Convênio', { value: p?.plan || 'Particular', options: PLANS })}
        ${field('address', 'Endereço', { value: p?.address, placeholder: 'Rua, número — bairro', full: true })}
        ${field('city', 'Cidade', { value: p?.city || 'Porto Alegre' })}
        ${field('condition', 'Condição clínica / diagnóstico', { value: p?.condition, placeholder: 'Ex.: acamada após AVC · cuidados paliativos' })}
        ${field('emergency', 'Contato de emergência', { value: p?.emergency, placeholder: 'Nome e telefone do familiar', full: true })}

        <div class="form-section-title">Modalidade e equipe</div>
        <div class="field full">
          <label>Modalidade de acompanhamento <span class="req">*</span></label>
          <div class="modality-picker" id="modalityPicker">
            ${['12h', '24h'].map((m) => `<label class="mod-opt ${modality === m ? 'selected' : ''}">
              <input type="radio" name="modality" value="${m}" ${modality === m ? 'checked' : ''} />
              <span><strong>${MODALITY[m].label}</strong><small>${MODALITY[m].desc}</small></span>
            </label>`).join('')}
          </div>
        </div>

        <div class="field full" id="teamField">
          <label>Técnicas escaladas <span class="req">*</span> <span class="team-counter" id="teamCounter">0/${limit}</span></label>
          <div class="team-picker" id="teamPicker">${teamOpts || '<p class="page-sub" style="margin:8px">Nenhuma técnica cadastrada. <button type="button" class="link-btn" data-action="new-technician">Cadastrar técnica</button></p>'}</div>
          <span class="hint" id="teamHint">Selecione ${limit} técnicas para a modalidade de ${MODALITY[modality].label}.</span>
        </div>

        ${field('status', 'Status', { value: p?.status || 'ativo', options: [{ value: 'ativo', label: 'Ativo' }, { value: 'inativo', label: 'Inativo' }] })}
        ${field('notes', 'Observações', { value: p?.notes, placeholder: 'Rotina da casa, alergias, orientações...', textarea: true, full: true })}
      </div>
    </form>`;

    openModal({
      title: isEdit ? 'Editar paciente' : 'Novo paciente',
      subtitle: isEdit ? 'Atualize os dados, a modalidade e a equipe.' : 'Cadastre o paciente e monte a equipe de técnicas.',
      iconName: 'users', size: 'lg', body,
      foot: `<button class="btn btn-ghost" data-action="close-modal">Cancelar</button>
             <button class="btn btn-primary" type="submit" form="formPatient">${icon('check')} ${isEdit ? 'Salvar alterações' : 'Cadastrar paciente'}</button>`,
      onMount(overlay) {
        const phone = overlay.querySelector('[name="phone"]');
        phone.addEventListener('input', () => { phone.value = maskPhone(phone.value); });
        const cpf = overlay.querySelector('[name="cpf"]');
        cpf.addEventListener('input', () => { cpf.value = maskCPF(cpf.value); });

        const form = overlay.querySelector('#formPatient');
        const picker = overlay.querySelector('#teamPicker');
        const counter = overlay.querySelector('#teamCounter');
        const hint = overlay.querySelector('#teamHint');

        const refresh = () => {
          const mod = form.querySelector('[name="modality"]:checked')?.value || '12h';
          const limitNow = MODALITY[mod].techs;
          const boxes = $$('input[name="technicianIds"]', picker);
          let checked = boxes.filter((b) => b.checked);
          if (checked.length > limitNow) {
            checked.slice(limitNow).forEach((b) => { b.checked = false; });
            checked = checked.slice(0, limitNow);
            toast(`A modalidade ${MODALITY[mod].short} aceita no máximo ${limitNow} técnicas.`, 'info');
          }
          $$('.team-opt', picker).forEach((lbl) => {
            const box = lbl.querySelector('input');
            lbl.classList.toggle('selected', box.checked);
            lbl.classList.toggle('disabled', !box.checked && checked.length >= limitNow);
          });
          counter.textContent = `${checked.length}/${limitNow}`;
          counter.classList.toggle('ok', checked.length === limitNow);
          hint.textContent = checked.length === limitNow
            ? `Equipe completa para ${MODALITY[mod].label}.`
            : `Selecione mais ${limitNow - checked.length} técnica(s) para a modalidade de ${MODALITY[mod].label}.`;
          overlay.querySelectorAll('.mod-opt').forEach((l) => l.classList.toggle('selected', l.querySelector('input').checked));
        };

        form.addEventListener('change', (e) => {
          if (e.target.name === 'modality' || e.target.name === 'technicianIds') refresh();
        });
        refresh();
      }
    });
  }

  function savePatient(form) {
    if (!validate(form, ['name', 'phone'])) return;
    const f = collect(form);
    const id = form.dataset.id;
    const existing = id ? getPatient(id) : null;
    const technicianIds = $$('input[name="technicianIds"]:checked', form).map((b) => b.value);
    const modality = f.modality || '12h';
    const limit = MODALITY[modality].techs;
    const available = state.data.technicians.filter((t) => t.status === 'ativo' || technicianIds.includes(t.id)).length;
    const required = Math.min(limit, available);
    if (technicianIds.length !== required) {
      toast(`Selecione ${required} técnica(s) para a modalidade de ${MODALITY[modality].label}.`, 'error');
      form.querySelector('#teamField')?.classList.add('invalid');
      return;
    }

    const obj = {
      name: f.name, cpf: f.cpf, birth: f.birth, phone: f.phone, plan: f.plan,
      address: f.address, city: f.city, condition: f.condition, emergency: f.emergency,
      modality, technicianIds, status: f.status, notes: f.notes
    };

    if (existing) {
      Object.assign(existing, obj);
      log('edit', `Ficha de <strong>${esc(obj.name)}</strong> atualizada.`);
      toast('Paciente atualizado com sucesso.');
    } else {
      const created = { id: uid('p_'), createdAt: todayISO(), ...obj };
      state.data.patients.unshift(created);
      state.scalePatientId = created.id;
      log('add', `Paciente <strong>${esc(obj.name)}</strong> cadastrado (${MODALITY[modality].short}).`);
      toast('Paciente cadastrado com sucesso.');
    }
    save(); closeModal(); render();
  }

  function openPatientDetail(id) {
    const p = getPatient(id);
    if (!p) return;
    const ym = ymOf(todayISO());
    const team = (p.technicianIds || []).map(getTech).filter(Boolean);
    const required = MODALITY[p.modality]?.techs || 2;
    const count = monthCount(ym, p.id);
    const cost = monthCost(ym, p.id);

    const body = `
      <div class="detail-hero">
        ${avatar(p.name, 'lg')}
        <div style="min-width:0">
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.condition || 'Acompanhamento domiciliar')}</p>
          <div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap">
            ${statusPill(p.status)} ${modalityPill(p.modality)}
            <span class="tag">${esc(p.plan || 'Particular')}</span>
            ${age(p.birth) ? `<span class="tag">${age(p.birth)} anos</span>` : ''}
          </div>
        </div>
      </div>

      <div class="detail-stats">
        <div><strong>${count}</strong><span>plantões em ${MONTHS[Number(ym.slice(5)) - 1]}</span></div>
        <div><strong>${money(cost)}</strong><span>custo no mês</span></div>
        <div><strong>${team.length}/${required}</strong><span>técnicas na equipe</span></div>
      </div>

      <div class="history" style="margin-top:6px">
        <h4>Equipe de cuidado</h4>
        ${team.length ? team.map((t) => `<div class="history-row">
          ${avatar(t.name, 'sm')}
          <div class="hr-main"><strong>${esc(t.name)}</strong><small>COREN ${esc(t.coren || '—')} · ${esc(t.role || '')} · ${money(t.shiftValue)}/plantão</small></div>
          <button class="act-btn" data-action="view-technician" data-id="${t.id}" title="Ver ficha">${icon('chevron')}</button>
        </div>`).join('') : '<p class="page-sub">Nenhuma técnica vinculada. Edite o paciente para montar a equipe.</p>'}
        ${team.length < required ? `<p class="warn-text">${icon('alert')} Equipe incompleta: a modalidade ${MODALITY[p.modality].short} pede ${required} técnicas.</p>` : ''}
      </div>

      <div class="detail-grid" style="margin-top:16px">
        <div class="detail-item"><span class="di-icon">${icon('phone')}</span><div class="di-body"><small>Telefone</small><p>${esc(p.phone || '—')}</p></div></div>
        <div class="detail-item"><span class="di-icon">${icon('id')}</span><div class="di-body"><small>CPF</small><p>${esc(p.cpf || '—')}</p></div></div>
        <div class="detail-item"><span class="di-icon">${icon('calendar')}</span><div class="di-body"><small>Nascimento</small><p>${p.birth ? fmtDate(p.birth) : '—'}</p></div></div>
        <div class="detail-item"><span class="di-icon">${icon('alert')}</span><div class="di-body"><small>Emergência</small><p>${esc(p.emergency || '—')}</p></div></div>
        <div class="detail-item" style="grid-column:1/-1"><span class="di-icon">${icon('pin')}</span><div class="di-body"><small>Endereço</small><p>${esc([p.address, p.city].filter(Boolean).join(' · ') || '—')}</p></div></div>
      </div>
      ${p.notes ? `<div class="detail-block"><h4>Observações</h4><p>${esc(p.notes)}</p></div>` : ''}`;

    openModal({
      title: 'Ficha do paciente', subtitle: `Cadastrado em ${fmtDate(p.createdAt)}`, iconName: 'users', size: 'lg', body,
      foot: `<button class="btn btn-danger" data-action="delete-patient" data-id="${p.id}">${icon('trash')} Excluir</button>
             <span class="spacer"></span>
             <button class="btn btn-ghost" data-action="edit-patient" data-id="${p.id}">${icon('edit')} Editar</button>
             <button class="btn btn-primary" data-action="open-scale" data-patient="${p.id}">${icon('table')} Abrir escala</button>`
    });
  }

  /* ---------- Importar planilha ---------- */
  function openImportSheet() {
    state.importRows = [];
    const patients = state.data.patients;
    const body = `
      <div class="import-steps">
        <div class="import-step"><span>1</span><p>Abra a planilha <strong>CONTROLE DE ESCALAS</strong> no Google Sheets ou Excel.</p></div>
        <div class="import-step"><span>2</span><p>Selecione as linhas da tabela (de <em>Profissionais</em> até a última técnica) e copie com <kbd>Ctrl</kbd>+<kbd>C</kbd>.</p></div>
        <div class="import-step"><span>3</span><p>Cole aqui embaixo e clique em <strong>Analisar</strong>. A gente encontra nome, COREN, plantões e valor.</p></div>
      </div>

      <div class="field full" style="margin-top:14px">
        <label>Dados copiados da planilha</label>
        <textarea id="importText" class="import-textarea" placeholder="Cole aqui... Ex.:&#10;1&#9;Marilia Siqueira Garcez&#9;195.039&#9;8&#9;R$ 180,00&#9;&#9;&#9;R$ 1.440,00"></textarea>
        <div class="import-actions">
          <button class="btn btn-ghost btn-sm" data-action="paste-clipboard">${icon('upload')} Colar da área de transferência</button>
          <button class="btn btn-soft btn-sm" data-action="analyze-import">${icon('search')} Analisar</button>
        </div>
      </div>

      <div id="importPreview"></div>

      <div class="import-options" id="importOptions" hidden>
        <label class="check-row"><input type="checkbox" id="importAssign" checked /> Vincular as técnicas ao paciente
          <select id="importPatient" style="height:34px;margin-left:6px;max-width:220px">
            ${patients.map((p) => `<option value="${p.id}" ${p.id === state.scalePatientId ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}
          </select>
        </label>
        <label class="check-row"><input type="checkbox" id="importShifts" checked /> Lançar os plantões no mês de ${monthLabel(state.month).toLowerCase()}</label>
      </div>`;

    openModal({
      title: 'Importar da planilha', subtitle: 'Cadastre as técnicas e os plantões sem digitar tudo de novo.',
      iconName: 'upload', size: 'lg', body,
      foot: `<button class="btn btn-ghost" data-action="close-modal">Cancelar</button>
             <button class="btn btn-primary" id="confirmImport" data-action="confirm-import" disabled>${icon('check')} Importar</button>`
    });
  }

  function parseSheetText(text) {
    const lines = String(text || '').split(/\r?\n/).map((l) => l.replace(/\s+$/, '')).filter((l) => l.trim());
    const out = [];
    const skip = /^(n[ºo°]?|profissionais?|coren(\/rs)?|n[ºo°]?\s*de\s*plant[õo]es|valores?|prod|evolu[çc][ãa]o|total|obs|confer[êe]ncia|paciente|per[íi]odo|controle de escalas)$/i;

    for (const line of lines) {
      let cells = line.includes('\t') ? line.split('\t') : line.split(/\s{2,}|\s*;\s*/);
      cells = cells.map((c) => c.trim());
      if (!cells.length) continue;

      let nameIdx = -1;
      cells.forEach((c, i) => {
        if (c.length < 5) return;
        if (skip.test(c)) return;
        if (/^(paciente|per[íi]odo)\s*:/i.test(c)) return;
        if (!/[A-Za-zÀ-ÿ]{3}/.test(c)) return;
        if (nameIdx === -1 || c.length > cells[nameIdx].length) nameIdx = i;
      });
      if (nameIdx === -1) continue;

      const name = cells[nameIdx].replace(/^\d+\s*[-–]\s*/, '').trim();
      if (name.length < 5) continue;

      const moneyIdx = cells.findIndex((c) => /R\$\s*[\d.]+,\d{2}/.test(c) || /^\d{1,3}(\.\d{3})*,\d{2}$/.test(c));
      let coren = '';
      cells.forEach((c, i) => {
        if (i === nameIdx || i === moneyIdx) return;
        if (/^[\d.\-\/]{4,}$/.test(c) && onlyDigits(c).length >= 4 && onlyDigits(c).length <= 8) {
          if (!coren || onlyDigits(c).length > onlyDigits(coren).length) coren = c;
        }
      });

      let count = null;
      for (let i = moneyIdx > 0 ? moneyIdx - 1 : cells.length - 1; i >= 0; i--) {
        if (i === nameIdx) continue;
        if (/^\d{1,3}$/.test(cells[i])) { count = Number(cells[i]); break; }
      }
      if (count === null) {
        for (let i = 1; i < cells.length; i++) {
          if (i !== nameIdx && /^\d{1,2}$/.test(cells[i])) { count = Number(cells[i]); break; }
        }
      }

      const value = moneyIdx >= 0 ? parseMoney(cells[moneyIdx]) : null;
      const obsCell = cells.find((c, i) => i > nameIdx && /folguista|adapta|f[ée]rias|licen/i.test(c));

      out.push({ name, coren, count, value, obs: obsCell || '' });
    }
    return out;
  }

  function renderImportPreview() {
    const box = $('#importPreview');
    if (!box) return;
    const rows = state.importRows;
    if (!rows.length) {
      box.innerHTML = '';
      $('#importOptions').hidden = true;
      $('#confirmImport').disabled = true;
      return;
    }
    const body = rows.map((r) => {
      const exists = state.data.technicians.find((t) => (r.coren && onlyDigits(t.coren) === onlyDigits(r.coren)) || t.name.toLowerCase() === r.name.toLowerCase());
      return `<tr>
        <td><strong>${esc(r.name)}</strong>${exists ? ' <span class="pill pill-yellow">já cadastrada</span>' : ''}</td>
        <td>${esc(r.coren || '—')}</td>
        <td>${r.count ?? '—'}</td>
        <td>${r.value != null ? money(r.value) : '—'}</td>
      </tr>`;
    }).join('');

    box.innerHTML = `<div class="import-preview">
      <div class="ip-head">${rows.length} técnica(s) encontrada(s) · ${rows.reduce((n, r) => n + (r.count || 0), 0)} plantões</div>
      <div class="mini-table-wrap">
        <table class="mini-table"><thead><tr><th>Profissional</th><th>COREN</th><th>Plantões</th><th>Valor</th></tr></thead><tbody>${body}</tbody></table>
      </div>
    </div>`;
    $('#importOptions').hidden = false;
    $('#confirmImport').disabled = false;
  }

  function confirmImport() {
    const rows = state.importRows;
    if (!rows.length) return;
    const assign = $('#importAssign')?.checked;
    const distribute = $('#importShifts')?.checked;
    const patientId = $('#importPatient')?.value || state.scalePatientId;
    const patient = getPatient(patientId);
    const ym = state.month;
    const dim = daysInMonth(ym);

    let created = 0, updated = 0, launched = 0;
    rows.forEach((r) => {
      let tech = state.data.technicians.find((t) => (r.coren && onlyDigits(t.coren) === onlyDigits(r.coren)) || t.name.toLowerCase() === r.name.toLowerCase());
      if (!tech) {
        tech = {
          id: uid('f_'), name: r.name, coren: r.coren || '', role: 'Técnica(o) de enfermagem',
          shiftValue: r.value ?? 180, notes: r.obs || '', cpf: '', rg: '', birth: '', phone: '', email: '',
          address: '', city: 'Porto Alegre', admission: '', status: 'ativo', createdAt: todayISO()
        };
        state.data.technicians.push(tech);
        created++;
      } else {
        let changed = false;
        if (!tech.coren && r.coren) { tech.coren = r.coren; changed = true; }
        if (r.value != null && Number(tech.shiftValue) !== r.value) { tech.shiftValue = r.value; changed = true; }
        if (r.obs && !tech.notes) { tech.notes = r.obs; changed = true; }
        if (changed) updated++;
      }

      if (assign && patient) {
        const limit = MODALITY[patient.modality]?.techs || 2;
        const team = new Set(patient.technicianIds || []);
        if (team.size < limit) team.add(tech.id);
        patient.technicianIds = [...team];
      }

      if (distribute && patient && r.count > 0) {
        const existing = state.data.shifts.filter((s) => s.patientId === patient.id && s.technicianId === tech.id && s.date.startsWith(ym));
        if (!existing.length) {
          for (let i = 0; i < r.count; i++) {
            const day = Math.floor((i * dim) / r.count) + 1;
            state.data.shifts.push({
              id: uid('s_'), patientId: patient.id, technicianId: tech.id,
              date: `${ym}-${pad2(day)}`, shift: i % 2 === 0 ? 'D' : 'N'
            });
            launched++;
          }
        }
      }
    });

    log('add', `Importação da planilha: <strong>${created}</strong> técnica(s) nova(s) e <strong>${launched}</strong> plantão(ões).`);
    save(); closeModal(); render();
    toast(`Importado: ${created} nova(s) técnica(s)${updated ? `, ${updated} atualizada(s)` : ''}${launched ? ` · ${launched} plantões lançados` : ''}.`);
  }

  /* ---------- Confirmações ---------- */
  function confirmDialog({ title, message, confirmLabel = 'Excluir', onConfirm }) {
    openModal({
      title, subtitle: 'Esta ação não pode ser desfeita.', iconName: 'alert', size: 'sm',
      body: `<p class="page-sub" style="margin:0">${message}</p>`,
      foot: `<button class="btn btn-ghost" data-action="close-modal">Cancelar</button>
             <button class="btn btn-danger" id="confirmAction">${esc(confirmLabel)}</button>`,
      onMount(overlay) {
        overlay.querySelector('#confirmAction').addEventListener('click', onConfirm);
      }
    });
  }

  function deletePatient(id) {
    const p = getPatient(id);
    if (!p) return;
    confirmDialog({
      title: 'Excluir paciente?',
      message: `A ficha de <strong>${esc(p.name)}</strong> e os plantões da escala vinculados a ela serão removidos.`,
      onConfirm() {
        state.data.patients = state.data.patients.filter((x) => x.id !== id);
        state.data.shifts = state.data.shifts.filter((s) => s.patientId !== id);
        if (state.scalePatientId === id) state.scalePatientId = state.data.patients[0]?.id || null;
        log('alert', `Paciente <strong>${esc(p.name)}</strong> removido.`);
        save(); closeModal(); render(); toast('Paciente excluído.', 'info');
      }
    });
  }

  function deleteTechnician(id) {
    const t = getTech(id);
    if (!t) return;
    confirmDialog({
      title: 'Excluir técnica?',
      message: `Remover <strong>${esc(t.name)}</strong> do cadastro? Os plantões lançados para ela também serão apagados.`,
      onConfirm() {
        state.data.technicians = state.data.technicians.filter((x) => x.id !== id);
        state.data.shifts = state.data.shifts.filter((s) => s.technicianId !== id);
        state.data.patients.forEach((p) => { p.technicianIds = (p.technicianIds || []).filter((x) => x !== id); });
        log('alert', `Técnica <strong>${esc(t.name)}</strong> removida do cadastro.`);
        save(); closeModal(); render(); toast('Técnica excluída.', 'info');
      }
    });
  }

  /* ---------- Ações em massa ---------- */
  function bulkStatusPatients() {
    const list = state.data.patients.filter((p) => state.selectedPatients.has(p.id));
    if (!list.length) return;
    const allActive = list.every((p) => p.status === 'ativo');
    list.forEach((p) => { p.status = allActive ? 'inativo' : 'ativo'; });
    state.selectedPatients.clear();
    log('edit', `${list.length} paciente(s) ${allActive ? 'inativado(s)' : 'ativado(s)'}.`);
    save(); render();
    toast(allActive ? 'Pacientes inativados.' : 'Pacientes ativados.', 'info');
  }

  function bulkDeletePatients() {
    const list = state.data.patients.filter((p) => state.selectedPatients.has(p.id));
    if (!list.length) return;
    const ids = new Set(list.map((p) => p.id));
    confirmDialog({
      title: `Excluir ${list.length} paciente(s)?`,
      message: 'As fichas selecionadas e os plantões vinculados a elas serão removidos.',
      onConfirm() {
        state.data.patients = state.data.patients.filter((p) => !ids.has(p.id));
        state.data.shifts = state.data.shifts.filter((s) => !ids.has(s.patientId));
        if (ids.has(state.scalePatientId)) state.scalePatientId = state.data.patients[0]?.id || null;
        state.selectedPatients.clear();
        log('alert', `${list.length} paciente(s) removido(s).`);
        save(); closeModal(); render();
        toast('Pacientes excluídos.', 'info');
      }
    });
  }

  function bulkStatusTechs() {
    const list = state.data.technicians.filter((t) => state.selectedTechs.has(t.id));
    if (!list.length) return;
    const allActive = list.every((t) => t.status === 'ativo');
    list.forEach((t) => { t.status = allActive ? 'inativo' : 'ativo'; });
    state.selectedTechs.clear();
    log('edit', `${list.length} técnica(s) ${allActive ? 'inativada(s)' : 'ativada(s)'}.`);
    save(); render();
    toast(allActive ? 'Técnicas inativadas.' : 'Técnicas ativadas.', 'info');
  }

  function bulkDeleteTechs() {
    const list = state.data.technicians.filter((t) => state.selectedTechs.has(t.id));
    if (!list.length) return;
    const ids = new Set(list.map((t) => t.id));
    confirmDialog({
      title: `Excluir ${list.length} técnica(s)?`,
      message: 'As fichas selecionadas, seus plantões e vínculos com pacientes serão removidos.',
      onConfirm() {
        state.data.technicians = state.data.technicians.filter((t) => !ids.has(t.id));
        state.data.shifts = state.data.shifts.filter((s) => !ids.has(s.technicianId));
        state.data.patients.forEach((p) => { p.technicianIds = (p.technicianIds || []).filter((id) => !ids.has(id)); });
        state.selectedTechs.clear();
        log('alert', `${list.length} técnica(s) removida(s).`);
        save(); closeModal(); render();
        toast('Técnicas excluídas.', 'info');
      }
    });
  }

  /* ---------- Configurações / notificações ---------- */
  function openSettings() {
    const d = state.data;
    const bytes = new Blob([JSON.stringify(d)]).size;
    const body = `
      <div class="detail-block" style="margin-top:0">
        <h4>Seus dados</h4>
        <div class="settings-list">
          <div><span>Pacientes</span><b>${d.patients.length}</b></div>
          <div><span>Técnicas de enfermagem</span><b>${d.technicians.length}</b></div>
          <div><span>Plantões lançados</span><b>${d.shifts.length}</b></div>
          <div><span>Espaço utilizado</span><b>${(bytes / 1024).toFixed(1)} KB</b></div>
        </div>
      </div>
      <p class="page-sub" style="margin-top:14px">Os dados ficam salvos apenas neste navegador. Faça um backup antes de limpar o histórico ou trocar de computador.</p>
      <div class="detail-block">
        <h4>Pessoas com acesso</h4>
        <div class="auth-users">
          ${loadUsers().map((u) => `<div class="auth-user-row">${avatar(u.name, 'sm')}<span class="who"><strong>${esc(u.name)}</strong><small>${esc(u.email)} · ${esc(u.role)}</small></span>${u.id === sessionUser()?.id ? '<span class="pill pill-pink">Você</span>' : ''}</div>`).join('') || '<p class="page-sub">Nenhuma conta cadastrada.</p>'}
        </div>
        <p class="page-sub" style="margin-top:8px">Contas locais deste navegador. Para a equipe acessar de outros computadores, é preciso o modo nuvem.</p>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:14px">
        <button class="btn btn-ghost btn-block" data-action="backup-json">${icon('download')} Baixar backup completo (.json)</button>
        <button class="btn btn-ghost btn-block" data-action="import-json">${icon('upload')} Restaurar backup</button>
        <button class="btn btn-danger btn-block" data-action="reset-data">${icon('trash')} Restaurar dados de exemplo</button>
      </div>`;
    openModal({
      title: 'Configurações e backup', subtitle: 'Engenharia da Saúde · versão 2.0', iconName: 'settings', body,
      foot: `<button class="btn btn-ghost" data-action="close-modal">Fechar</button>`
    });
  }

  function openNotifications() {
    const today = todayISO();
    const todays = state.data.shifts.filter((s) => s.date === today);
    const incomplete = state.data.patients.filter((p) => {
      const need = MODALITY[p.modality]?.techs || 2;
      return (p.technicianIds || []).length < need;
    });
    const rows = todays.map((s) => `<div class="agenda-item" style="padding:10px 0" data-action="open-scale" data-patient="${s.patientId}">
      ${avatar(getPatient(s.patientId)?.name || '—', 'sm')}
      <div class="agenda-main"><strong>${esc(getPatient(s.patientId)?.name || 'Paciente')}</strong>
      <span>${icon('id')} ${esc(getTech(s.technicianId)?.name || '')} · ${SHIFTS[s.shift]?.label || ''} (${SHIFTS[s.shift]?.time || ''})</span></div>
      ${shiftBadge(s.shift)}
    </div>`).join('');

    openModal({
      title: 'Notificações', subtitle: `${todays.length} plantão(ões) hoje · ${incomplete.length} equipe(s) incompleta(s)`, iconName: 'bell',
      body: `${todays.length ? rows : '<p class="page-sub">Nenhum plantão lançado para hoje.</p>'}
        ${incomplete.length ? `<div class="detail-block"><h4>Equipes incompletas</h4>${incomplete.map((p) => `<div class="history-row">
          <div class="hr-main"><strong>${esc(p.name)}</strong><small>${MODALITY[p.modality]?.short} · ${(p.technicianIds || []).length} de ${MODALITY[p.modality]?.techs} técnicas</small></div>
          <button class="act-btn" data-action="edit-patient" data-id="${p.id}">${icon('edit')}</button>
        </div>`).join('')}</div>` : ''}`,
      foot: `<button class="btn btn-primary btn-block" data-action="close-modal">Entendi</button>`
    });
  }

  /* ---------------- Exportação ---------------- */
  function download(filename, content, type = 'text/plain;charset=utf-8') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  function csv(rows) {
    return '\uFEFF' + rows.map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(';')).join('\r\n');
  }

  function exportPatients() {
    writePatientsCsv(state.data.patients, `pacientes-engenharia-da-saude-${todayISO()}.csv`, 'CSV de pacientes exportado.');
  }

  function writePatientsCsv(list, filename, message) {
    const rows = [['Nome', 'CPF', 'Nascimento', 'Telefone', 'Convênio', 'Modalidade', 'Técnicas', 'Condição', 'Endereço', 'Status']];
    list.forEach((p) => rows.push([
      p.name, p.cpf, p.birth, p.phone, p.plan, MODALITY[p.modality]?.label,
      (p.technicianIds || []).map((id) => getTech(id)?.name).filter(Boolean).join(' | '),
      p.condition, p.address, p.status
    ]));
    download(filename, csv(rows), 'text/csv;charset=utf-8');
    if (message) toast(message);
  }

  function exportPatientsList(list) {
    if (!list.length) return;
    writePatientsCsv(list, `pacientes-selecionados-${todayISO()}.csv`, `${list.length} paciente(s) exportado(s).`);
  }

  function exportTechnicians() {
    writeTechniciansCsv(state.data.technicians, `tecnicas-engenharia-da-saude-${todayISO()}.csv`, 'CSV de técnicas exportado.');
  }

  function writeTechniciansCsv(list, filename, message) {
    const rows = [['Nome', 'CPF', 'RG', 'Nascimento', 'COREN/RS', 'Função', 'Telefone', 'E-mail', 'Valor do plantão', 'Status']];
    list.forEach((t) => rows.push([t.name, t.cpf, t.rg, t.birth, t.coren, t.role, t.phone, t.email, t.shiftValue, t.status]));
    download(filename, csv(rows), 'text/csv;charset=utf-8');
    if (message) toast(message);
  }

  function exportTechniciansList(list) {
    if (!list.length) return;
    writeTechniciansCsv(list, `tecnicas-selecionadas-${todayISO()}.csv`, `${list.length} técnica(s) exportada(s).`);
  }

  function exportScale() {
    const p = getPatient(state.scalePatientId);
    if (!p) { toast('Selecione um paciente para exportar.', 'error'); return; }
    const ym = state.month;
    const dim = daysInMonth(ym);
    const rows = scaleRows(p, ym);
    const head = ['Nº', 'Profissional', 'COREN/RS', 'Plantões', 'Valor', 'Total', 'OBS'];
    for (let day = 1; day <= dim; day++) head.push(`${pad2(day)} ${weekdayOf(`${ym}-${pad2(day)}`)}`);
    const data = [head];
    rows.forEach((r, i) => {
      const line = [i + 1, r.tech.name, r.tech.coren, r.count, r.tech.shiftValue, r.total, r.tech.notes || ''];
      for (let day = 1; day <= dim; day++) line.push(SHIFTS[r.byDay[`${ym}-${pad2(day)}`]]?.short || '');
      data.push(line);
    });
    data.push(['', 'Total', '', rows.reduce((n, r) => n + r.count, 0), '', rows.reduce((n, r) => n + r.total, 0), '']);
    download(`escala-${p.name.replace(/\s+/g, '-').toLowerCase()}-${ym}.csv`, csv(data), 'text/csv;charset=utf-8');
    toast('Escala exportada em CSV.');
  }

  function backupJSON() {
    download(`backup-engenharia-da-saude-${todayISO()}.json`, JSON.stringify(state.data, null, 2), 'application/json');
    toast('Backup completo baixado.');
  }

  function importJSON() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.addEventListener('change', () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result));
          if (!parsed || !Array.isArray(parsed.patients) || !Array.isArray(parsed.technicians)) throw new Error('Formato inválido');
          state.data = {
            version: 2,
            patients: parsed.patients,
            technicians: parsed.technicians,
            shifts: Array.isArray(parsed.shifts) ? parsed.shifts : [],
            notebooks: Array.isArray(parsed.notebooks) ? parsed.notebooks : [],
            activity: parsed.activity || []
          };
          save(); closeModal(); render();
          toast('Backup restaurado com sucesso.');
        } catch (err) {
          toast('Arquivo inválido. Selecione um backup gerado pelo sistema.', 'error');
        }
      };
      reader.readAsText(file);
    });
    input.click();
  }

  function resetData() {
    confirmDialog({
      title: 'Restaurar dados de exemplo?',
      message: 'Todos os cadastros atuais serão substituídos pelos dados de demonstração. Baixe um backup antes se precisar guardar o que já existe.',
      confirmLabel: 'Restaurar exemplo',
      onConfirm() {
        state.data = seed();
        state.month = ymOf(todayISO());
        state.scalePatientId = state.data.patients[0]?.id || null;
        save(); closeModal(); render();
        toast('Dados de exemplo restaurados.', 'info');
      }
    });
  }

  /* ---------------- Busca global ---------------- */
  function ensureSearchPop() {
    if ($('#searchPop')) return;
    const pop = document.createElement('div');
    pop.className = 'search-pop';
    pop.id = 'searchPop';
    pop.hidden = true;
    $('.topbar-right').style.position = 'relative';
    $('.topbar-right').appendChild(pop);
  }

  function renderSearchPop(q) {
    const pop = $('#searchPop');
    if (!pop) return;
    q = q.trim().toLowerCase();
    if (q.length < 2) { pop.hidden = true; pop.innerHTML = ''; return; }
    const patients = state.data.patients.filter((p) => [p.name, p.cpf, p.condition, p.phone].join(' ').toLowerCase().includes(q)).slice(0, 4);
    const techs = state.data.technicians.filter((t) => [t.name, t.coren, t.cpf, t.role].join(' ').toLowerCase().includes(q)).slice(0, 4);

    if (!patients.length && !techs.length) {
      pop.innerHTML = `<div class="search-empty">Nenhum resultado para "<strong>${esc(q)}</strong>"</div>`;
      pop.hidden = false;
      return;
    }
    const group = (label, items) => items.length ? `<div class="search-group"><p>${label}</p>${items}</div>` : '';
    pop.innerHTML = [
      group('Pacientes', patients.map((p) => `<button class="search-item" data-action="view-patient" data-id="${p.id}">
        ${avatar(p.name, 'sm')}<span class="si-main"><strong>${esc(p.name)}</strong><small>${MODALITY[p.modality]?.short} · ${esc(p.condition || p.plan || 'Paciente')}</small></span>${icon('chevron')}
      </button>`).join('')),
      group('Técnicas', techs.map((t) => `<button class="search-item" data-action="view-technician" data-id="${t.id}">
        ${avatar(t.name, 'sm')}<span class="si-main"><strong>${esc(t.name)}</strong><small>COREN ${esc(t.coren || '—')} · ${esc(t.role || '')}</small></span>${icon('chevron')}
      </button>`).join(''))
    ].join('');
    pop.hidden = false;
  }

  function closeSearchPop() {
    const pop = $('#searchPop');
    if (pop) pop.hidden = true;
    const input = $('#globalSearch');
    if (input) input.value = '';
  }

  /* =========================================================
     AÇÕES
     ========================================================= */
  const ACTIONS = {
    'import-sheet': () => openImportSheet(),
    'new-patient': () => openPatientForm(),
    'edit-patient': (el) => openPatientForm(getPatient(el.dataset.id)),
    'view-patient': (el) => openPatientDetail(el.dataset.id),
    'delete-patient': (el) => deletePatient(el.dataset.id),
    'filter-patients': (el) => { state.patientFilter = el.dataset.value; render(); },
    'clear-patient-search': () => { state.patientQuery = ''; render(); },
    'open-scale': (el) => {
      const id = el.dataset.patient;
      if (id) state.scalePatientId = id;
      go('scales');
    },
    'open-scale-tech': (el) => {
      const t = getTech(el.dataset.id);
      if (!t) return;
      const shift = state.data.shifts.find((s) => s.technicianId === t.id && s.date.startsWith(state.month));
      if (shift) state.scalePatientId = shift.patientId;
      closeModal();
      go('scales');
    },

    'bulk-patients-export': () => exportPatientsList(state.data.patients.filter((p) => state.selectedPatients.has(p.id))),
    'bulk-patients-status': () => bulkStatusPatients(),
    'bulk-patients-delete': () => bulkDeletePatients(),
    'bulk-techs-export': () => exportTechniciansList(state.data.technicians.filter((t) => state.selectedTechs.has(t.id))),
    'bulk-techs-status': () => bulkStatusTechs(),
    'bulk-techs-delete': () => bulkDeleteTechs(),
    'clear-selection': () => { state.selectedPatients.clear(); state.selectedTechs.clear(); render(); },

    'new-technician': () => openTechnicianForm(),
    'edit-technician': (el) => openTechnicianForm(getTech(el.dataset.id)),
    'view-technician': (el) => openTechnicianDetail(el.dataset.id),
    'delete-technician': (el) => deleteTechnician(el.dataset.id),
    'filter-tech': (el) => { state.techFilter = el.dataset.value; render(); },

    'new-notebook': () => addNotebook(),
    'delete-notebook': (el) => deleteNotebook(el.dataset.id),
    'scan-notebook': (el) => openScanner(el.dataset.id),
    'open-notebook-files': (el) => openNotebookFiles(el.dataset.id),
    'delete-file': async (el) => {
      const nb = getNotebook(el.dataset.nb);
      if (!nb) return;
      nb.files = (nb.files || []).filter((f) => f.id !== el.dataset.file);
      try { await idbDel(el.dataset.file); } catch (err) { /* ignora */ }
      save(); closeModal(); render();
      toast('Arquivo removido.', 'info');
      openNotebookFiles(nb.id);
    },
    'export-notebooks': () => exportNotebooks(),
    'clear-notebook-search': () => { state.notebookQuery = ''; render(); },

    'toggle-shift': (el) => {
      const techId = el.dataset.tech;
      const date = el.dataset.date;
      const patientId = state.scalePatientId;
      if (!patientId) return;
      const existing = state.data.shifts.find((s) => s.patientId === patientId && s.technicianId === techId && s.date === date);
      if (!existing) {
        state.data.shifts.push({ id: uid('s_'), patientId, technicianId: techId, date, shift: 'D' });
      } else if (existing.shift === 'D') {
        existing.shift = 'N';
      } else if (existing.shift === 'N') {
        existing.shift = '24';
      } else {
        state.data.shifts = state.data.shifts.filter((s) => s.id !== existing.id);
      }
      save(); render();
    },

    'month-prev': () => { state.month = shiftMonth(state.month, -1); render(); },
    'month-next': () => { state.month = shiftMonth(state.month, 1); render(); },
    'month-today': () => { state.month = ymOf(todayISO()); render(); },

    'cal-prev': () => { state.calMonth = shiftMonth(state.calMonth, -1); state.calDay = null; render(); },
    'cal-next': () => { state.calMonth = shiftMonth(state.calMonth, 1); state.calDay = null; render(); },
    'cal-today': () => { state.calMonth = ymOf(todayISO()); state.calDay = todayISO(); render(); },
    'cal-day': (el) => { state.calDay = el.dataset.date; state.calMonth = el.dataset.date.slice(0, 7); render(); },
    'cal-open': (el) => { state.calDay = el.dataset.date; state.calMonth = el.dataset.date.slice(0, 7); render(); },

    'analyze-import': () => {
      const text = $('#importText')?.value || '';
      const rows = parseSheetText(text);
      if (!rows.length) {
        toast('Não encontramos linhas com nome e COREN. Confira se copiou a tabela inteira.', 'error');
        state.importRows = [];
        renderImportPreview();
        return;
      }
      state.importRows = rows;
      renderImportPreview();
      toast(`${rows.length} técnica(s) encontrada(s). Confira a prévia.`, 'info');
    },
    'paste-clipboard': async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (!text) { toast('A área de transferência está vazia.', 'info'); return; }
        const area = $('#importText');
        area.value = text;
        toast('Texto colado. Clique em Analisar.', 'info');
      } catch (err) {
        toast('O navegador bloqueou a colagem. Use Ctrl+V na caixa de texto.', 'error');
      }
    },
    'confirm-import': () => confirmImport(),

    'open-settings': () => openSettings(),
    'open-notifications': () => openNotifications(),
    'open-profile': () => openProfile(),
    'logout': () => logout(),
    'close-modal': () => closeModal(),
    'backup-json': () => backupJSON(),
    'import-json': () => importJSON(),
    'reset-data': () => resetData(),
    'export-patients': () => exportPatients(),
    'export-technicians': () => exportTechnicians(),
    'export-scale': () => exportScale()
  };

  /* ---------------- Navegação e render ---------------- */
  const VIEWS = ['dashboard', 'scales', 'notebooks', 'patients', 'techniques', 'reports'];
  const CRUMBS = { dashboard: 'Painel', scales: 'Escalas', notebooks: 'Cadernos', patients: 'Pacientes', techniques: 'Técnicas', reports: 'Relatórios' };

  const views = {
    dashboard: viewDashboard,
    scales: viewScales,
    notebooks: viewNotebooks,
    patients: viewPatients,
    techniques: viewTechniques,
    reports: viewReports
  };

  function go(view) {
    if (!VIEWS.includes(view)) view = 'dashboard';
    state.view = view;
    state.selectedPatients.clear();
    state.selectedTechs.clear();
    closeSearchPop();
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeDrawer();
  }

  function render() {
    const active = document.activeElement;
    const focusId = active && active.id ? active.id : null;
    const pos = active && typeof active.selectionStart === 'number' ? active.selectionStart : null;
    const sheet = $('.sheet-scroll');
    const sheetLeft = sheet ? sheet.scrollLeft : 0;
    const sheetTop = sheet ? sheet.scrollTop : 0;

    $('#app').innerHTML = views[state.view]();
    updateChrome();

    const sheet2 = $('.sheet-scroll');
    if (sheet2) { sheet2.scrollLeft = sheetLeft; sheet2.scrollTop = sheetTop; }

    if (focusId) {
      const el = document.getElementById(focusId);
      if (el) {
        el.focus({ preventScroll: true });
        if (pos !== null && el.setSelectionRange) { try { el.setSelectionRange(pos, pos); } catch (e) { /* noop */ } }
      }
    }
  }

  function updateChrome() {
    $$('.nav-item').forEach((b) => b.classList.toggle('active', b.dataset.nav === state.view));
    const crumb = $('#crumbCurrent');
    if (crumb) crumb.textContent = CRUMBS[state.view] || 'Painel';
    const pCount = $('#navPatientCount'); if (pCount) pCount.textContent = state.data.patients.length;
    const tCount = $('#navTechCount'); if (tCount) tCount.textContent = state.data.technicians.length;
    const nCount = $('#navNotebookCount'); if (nCount) nCount.textContent = (state.data.notebooks || []).length;

    const me = sessionUser();
    const chip = $('.user-chip');
    if (me && chip) {
      chip.title = 'Meu cadastro';
      chip.innerHTML = `${avatar(me.name)}<span class="user-meta"><strong>${esc(me.name.split(' ').slice(0, 2).join(' '))}</strong><small>${esc(me.role)}</small></span>`;
    }
  }

  function openDrawer() {
    $('#sidebar').classList.add('open');
    $('#scrim').hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    if (window.innerWidth > 900) return;
    $('#sidebar').classList.remove('open');
    $('#scrim').hidden = true;
    if (!$('#modalRoot').innerHTML) document.body.style.overflow = '';
  }

  /* ---------------- Eventos ---------------- */
  document.addEventListener('click', (e) => {
    if (e.target.closest('.check-wrap, .select-all')) return;

    const nav = e.target.closest('[data-nav]');
    if (nav) { e.preventDefault(); go(nav.dataset.nav); return; }

    const actionEl = e.target.closest('[data-action]');
    if (actionEl) {
      const handler = ACTIONS[actionEl.dataset.action];
      if (handler) { e.preventDefault(); handler(actionEl, e); return; }
    }

    if (!e.target.closest('#searchPop') && !e.target.closest('.global-search')) {
      const pop = $('#searchPop');
      if (pop && !pop.hidden) pop.hidden = true;
    }
    if (e.target.closest('.global-search') && window.innerWidth <= 860) {
      $('.global-search')?.classList.add('expanded');
      $('#globalSearch')?.focus();
    }
  });

  document.addEventListener('submit', (e) => {
    const form = e.target;
    e.preventDefault();
    if (form.id === 'formPatient') savePatient(form);
    else if (form.id === 'formTechnician') saveTechnician(form);
    else if (form.id === 'formProfile') saveProfile(form);
  });

  document.addEventListener('input', (e) => {
    const t = e.target;
    if (t.id === 'patientSearch') { state.patientQuery = t.value; render(); }
    else if (t.id === 'techSearch') { state.techQuery = t.value; render(); }
    else if (t.id === 'notebookSearch') { state.notebookQuery = t.value; render(); }
    else if (t.id === 'globalSearch') { renderSearchPop(t.value); }
  });

  document.addEventListener('change', (e) => {
    const t = e.target;
    if (t.id === 'scalePatient') { state.scalePatientId = t.value; render(); return; }

    if (t.dataset.nbField) {
      const nb = getNotebook(t.dataset.nbId);
      if (nb) {
        nb[t.dataset.nbField] = t.value;
        save();
      }
      return;
    }

    if (t.dataset.selectPatient) {
      if (t.checked) state.selectedPatients.add(t.dataset.selectPatient);
      else state.selectedPatients.delete(t.dataset.selectPatient);
      render();
      return;
    }
    if (t.dataset.selectTech) {
      if (t.checked) state.selectedTechs.add(t.dataset.selectTech);
      else state.selectedTechs.delete(t.dataset.selectTech);
      render();
      return;
    }
    if (t.dataset.selectAll === 'patients') {
      const ids = $$('[data-select-patient]').map((el) => el.dataset.selectPatient);
      if (t.checked) ids.forEach((id) => state.selectedPatients.add(id));
      else ids.forEach((id) => state.selectedPatients.delete(id));
      render();
      return;
    }
    if (t.dataset.selectAll === 'techs') {
      const ids = $$('[data-select-tech]').map((el) => el.dataset.selectTech);
      if (t.checked) ids.forEach((id) => state.selectedTechs.add(id));
      else ids.forEach((id) => state.selectedTechs.delete(id));
      render();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if ($('#modalRoot').innerHTML) { closeModal(); return; }
      const pop = $('#searchPop');
      if (pop && !pop.hidden) { pop.hidden = true; return; }
      closeDrawer();
    }
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (e.key === '/' && !typing) { e.preventDefault(); $('#globalSearch')?.focus(); }
  });

  $('#menuBtn')?.addEventListener('click', openDrawer);
  $('#scrim')?.addEventListener('click', closeDrawer);

  $('#globalSearch')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = e.target.value.trim();
      if (q) { state.patientQuery = q; go('patients'); }
    }
  });

  ensureSearchPop();
  try { localStorage.removeItem('engenhariaSaude.admin.v1'); } catch (e) { /* versão anterior */ }
  if (sessionUser()) {
    $('.app').hidden = false;
    render();
  } else {
    renderAuth();
  }
})();
