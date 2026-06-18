// Página de administração do blog — apenas inicialização (CRUD em blog-manager.js)

document.addEventListener('DOMContentLoaded', () => {
  function init() {
    if (typeof getBlogPosts !== 'function') {
      setTimeout(init, 100);
      return;
    }

    initMobileMenu();
    initSidebarLinks();
    initBlogManager();

    document.getElementById('logoutBtn')?.addEventListener('click', logout);

    showSetupWarnings();
    requireAuth(async () => {
      initializeQuillEditor();
      loadBlogPosts();
    });
  }

  init();
});

function initSidebarLinks() {
  document.querySelectorAll('.menu-item').forEach((item) => {
    item.addEventListener('click', function () {
      if (this.href) return;
      document.querySelectorAll('.menu-item').forEach((i) => i.classList.remove('active'));
      this.classList.add('active');
      if (window.innerWidth <= 900) {
        document.getElementById('sidebar')?.classList.remove('open');
        document.getElementById('sidebarOverlay')?.classList.remove('visible');
        document.body.style.overflow = '';
      }
    });
  });
}
