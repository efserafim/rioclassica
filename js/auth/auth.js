// Autenticação — Supabase Auth (e-mail/senha)

async function aguardarAuth() {
  await aguardarSupabase();
  return window.supabaseClient.auth;
}

async function getSession() {
  await aguardarSupabase();
  const { data, error } = await window.supabaseClient.auth.getSession();
  if (error) throw error;
  return data.session;
}

async function signInWithEmail(email, password) {
  await aguardarSupabase();
  const { data, error } = await window.supabaseClient.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data;
}

async function logout() {
  try {
    await aguardarSupabase();
    await window.supabaseClient.auth.signOut();
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
  window.location.href = '/admin/login.html';
}

function onAuthStateChanged(callback) {
  aguardarSupabase().then(() => {
    window.supabaseClient.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ?? null);
    });
  });
}

function getAuthErrorMessage(error) {
  const msg = error?.message || '';
  const map = {
    'Invalid login credentials': 'E-mail ou senha incorretos.',
    'Email not confirmed': 'Confirme o e-mail no Supabase (ou desative confirmação no painel).',
    'User not found': 'Usuário não encontrado. Crie o admin em Supabase → Authentication → Users.'
  };
  return map[msg] || msg || 'Erro ao fazer login.';
}

window.aguardarAuth = aguardarAuth;
window.getSession = getSession;
window.signInWithEmail = signInWithEmail;
window.logout = logout;
window.onAuthStateChanged = onAuthStateChanged;
window.getAuthErrorMessage = getAuthErrorMessage;
