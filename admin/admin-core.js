// Painel administrativo — utilidades compartilhadas (auth, layout, notificações)

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function showMessage(message, type = 'success') {
  showToast(message, type);
}

function showSetupWarnings() {
  const key = window.SUPABASE_ANON_KEY || '';
  const container = document.getElementById('messageContainer');
  if (!container || !key.includes('COLE_AQUI')) return;

  const el = document.createElement('div');
  el.className = 'message error active';
  el.textContent = 'Configure js/config/supabase-config.js com URL e chave do Supabase. Depois Ctrl+F5.';
  container.prepend(el);
}

function initMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const toggle = document.getElementById('menuToggle');

  const setMenu = (open) => {
    sidebar?.classList.toggle('open', open);
    overlay?.classList.toggle('visible', open);
    toggle?.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  toggle?.addEventListener('click', () => setMenu(!sidebar?.classList.contains('open')));
  overlay?.addEventListener('click', () => setMenu(false));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setMenu(false);
  });
}

// Exige login: redireciona para o login se não autenticado, preenche o badge
// do usuário e executa onReady() uma única vez quando há sessão válida.
function requireAuth(onReady) {
  if (typeof onAuthStateChanged !== 'function') {
    setTimeout(() => requireAuth(onReady), 100);
    return;
  }

  let started = false;

  onAuthStateChanged(async (user) => {
    if (!user) {
      window.location.href = '/admin/login.html';
      return;
    }

    const email = user.email || '';
    const userEmailEl = document.getElementById('userEmail');
    const userAvatar = document.getElementById('userAvatar');
    const userBadge = document.getElementById('userBadge');

    if (userEmailEl) userEmailEl.textContent = email;
    if (userAvatar) userAvatar.textContent = email.split('@')[0].slice(0, 2).toUpperCase() || 'RC';
    if (userBadge) userBadge.hidden = false;

    if (started) return;
    started = true;
    try {
      await onReady?.();
    } catch (e) {
      console.warn('Falha ao inicializar o painel:', e?.message || e);
    }
  });
}

window.escapeHtml = escapeHtml;
window.showToast = showToast;
window.showMessage = showMessage;
window.showSetupWarnings = showSetupWarnings;
window.initMobileMenu = initMobileMenu;
window.requireAuth = requireAuth;
