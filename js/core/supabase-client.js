// Cliente Supabase único: site (leitura) + admin (login + escrita)

const STORAGE_BUCKET = 'rioclassica';

function isSupabaseConfigured() {
  const url = window.SUPABASE_URL || '';
  const key = window.SUPABASE_ANON_KEY || '';
  return (
    url.startsWith('https://') &&
    url.includes('.supabase.co') &&
    key.length > 20 &&
    !url.includes('SEU_PROJECT') &&
    !key.includes('COLE_AQUI') &&
    !key.includes('SUA_')
  );
}

function createSupabaseClient() {
  if (!window.supabase?.createClient) {
    throw new Error('SDK Supabase não carregado.');
  }
  if (!isSupabaseConfigured()) {
    throw new Error('Configure js/config/supabase-config.js com URL e chave do Supabase.');
  }

  return window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      storageKey: 'rioclassica-supabase-auth'
    }
  });
}

function initSupabaseClients() {
  window.supabaseClient = createSupabaseClient();
  window.supabasePublic = window.supabaseClient;
  window.createAuthenticatedSupabaseClient = function () {
    return window.supabaseClient;
  };
}

function aguardarSupabase() {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const tick = () => {
      attempts += 1;
      if (window.supabaseClient && isSupabaseConfigured()) {
        resolve(window.supabaseClient);
        return;
      }
      if (attempts > 100) {
        reject(new Error('Supabase não inicializou. Verifique supabase-config.js.'));
        return;
      }
      setTimeout(tick, 100);
    };
    tick();
  });
}

window.STORAGE_BUCKET = STORAGE_BUCKET;
window.isSupabaseConfigured = isSupabaseConfigured;
window.initSupabaseClients = initSupabaseClients;
window.aguardarSupabase = aguardarSupabase;

if (isSupabaseConfigured() && window.supabase?.createClient) {
  initSupabaseClients();
}
