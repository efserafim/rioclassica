// Blog: listagem com busca, destaque e leitura em modal

const POSTS_PER_PAGE = 8;

let allBlogPosts = [];
let filteredBlogPosts = [];
let currentPage = 1;
let searchQuery = '';
let blogScrollLockY = 0;
let blogModalHistoryActive = false;
let currentOpenPostId = null;
let blogToastTimer = null;

function lockPageScroll() {
  blogScrollLockY = window.scrollY || document.documentElement.scrollTop || 0;
  document.body.style.top = `-${blogScrollLockY}px`;
  document.body.classList.add('modal-open');
}

function unlockPageScroll() {
  document.body.classList.remove('modal-open');
  document.body.style.top = '';
  window.scrollTo(0, blogScrollLockY);
}

function waitForBlogService() {
  return new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      if (typeof getBlogPosts === 'function') {
        clearInterval(checkInterval);
        resolve();
      }
    }, 100);

    setTimeout(() => {
      clearInterval(checkInterval);
      resolve();
    }, 5000);
  });
}

function getPlainText(html) {
  return String(html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getExcerpt(post, length = 140) {
  const text = getPlainText(post.excerpt || post.content);
  if (!text) return '';
  if (text.length <= length) return text;
  return `${text.slice(0, length).trim()}…`;
}

function formatPostDate(value) {
  try {
    return new Date(value).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return '';
  }
}

function formatPostAuthor(author) {
  const value = String(author || '').trim();
  if (!value) return 'Rioclássica';
  if (/chatgpt|openai|ia|ai/i.test(value)) return 'Rioclássica';
  return value;
}

function estimateReadingMinutes(post) {
  const words = getPlainText(post.content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 190));
}

function showBlogToast(message) {
  const toast = document.getElementById('blogToast');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  toast.classList.add('is-visible');
  clearTimeout(blogToastTimer);
  blogToastTimer = setTimeout(() => {
    toast.classList.remove('is-visible');
    toast.hidden = true;
  }, 2200);
}

function getAdjacentPosts(postId) {
  const list = filteredBlogPosts.length ? filteredBlogPosts : allBlogPosts;
  const index = list.findIndex((p) => p.id === postId);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? list[index - 1] : null,
    next: index < list.length - 1 ? list[index + 1] : null
  };
}

function updateReadingProgress() {
  const content = document.getElementById('blogModalContent');
  const bar = document.getElementById('blogReadProgress');
  if (!content || !bar) return;
  const max = content.scrollHeight - content.clientHeight;
  const value = max > 0 ? (content.scrollTop / max) * 100 : 0;
  bar.style.width = `${Math.min(100, Math.max(0, value))}%`;
}

async function copyBlogPostLink(postId) {
  const url = `${window.location.origin}${window.location.pathname}?post=${encodeURIComponent(postId)}`;
  try {
    await navigator.clipboard.writeText(url);
    showBlogToast('Link do artigo copiado');
  } catch {
    showBlogToast('Não foi possível copiar o link');
  }
}

function togglePostImageZoom(button) {
  const media = button?.closest('.post-detail-media');
  if (!media) return;
  const expanded = media.classList.toggle('is-zoomed');
  button.setAttribute('aria-pressed', expanded ? 'true' : 'false');
  button.setAttribute('aria-label', expanded ? 'Reduzir imagem' : 'Ampliar imagem');
}

function normalizeSearch(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function applySearchFilter() {
  const q = normalizeSearch(searchQuery);
  if (!q) {
    filteredBlogPosts = [...allBlogPosts];
    return;
  }

  filteredBlogPosts = allBlogPosts.filter((post) => {
    const haystack = normalizeSearch(
      [post.title, post.excerpt, post.author, getPlainText(post.content)].join(' ')
    );
    return haystack.includes(q);
  });
}

function updateResultCount() {
  const el = document.getElementById('blogResultCount');
  if (!el) return;

  if (!allBlogPosts.length) {
    el.textContent = 'Novas histórias em breve';
    return;
  }

  if (searchQuery.trim()) {
    const n = filteredBlogPosts.length;
    el.textContent =
      n === 0
        ? 'Nenhum artigo encontrado para essa busca'
        : `${n} ${n === 1 ? 'artigo encontrado' : 'artigos encontrados'}`;
    return;
  }

  const n = allBlogPosts.length;
  el.textContent = `${n} ${n === 1 ? 'artigo publicado' : 'artigos publicados'}`;
}

async function loadBlogPostsPublic() {
  const container = document.getElementById('blogPostsContainer');
  if (!container) return;

  try {
    await waitForBlogService();
    if (typeof getBlogPosts !== 'function') {
      throw new Error('Serviço de blog não disponível');
    }

    allBlogPosts = await getBlogPosts(true);
    applySearchFilter();
    currentPage = 1;
    renderBlogView();
  } catch (error) {
    console.error('Erro ao carregar posts:', error);
    renderErrorState(container, error);
    renderFeatured(null);
    renderPagination(0);
    updateResultCount();
  }
}

function renderBlogView() {
  updateResultCount();

  if (!filteredBlogPosts.length) {
    renderFeatured(null);
    if (searchQuery.trim()) {
      renderSearchEmptyState(document.getElementById('blogPostsContainer'));
    } else {
      renderEmptyState(document.getElementById('blogPostsContainer'));
    }
    renderPagination(0);
    return;
  }

  const showFeatured = !searchQuery.trim() && currentPage === 1;
  const featured = showFeatured ? filteredBlogPosts[0] : null;
  const listPosts = showFeatured ? filteredBlogPosts.slice(1) : filteredBlogPosts;

  renderFeatured(featured);

  const totalPages = Math.max(1, Math.ceil(listPosts.length / POSTS_PER_PAGE));
  currentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = listPosts.slice(start, start + POSTS_PER_PAGE);

  renderBlogGrid(pagePosts);
  renderPagination(totalPages);
}

function goToPage(page) {
  currentPage = page;
  renderBlogView();
  document.getElementById('artigos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getPaginationItems(current, total) {
  const items = [];
  const delta = 1;
  for (let i = 1; i <= total; i++) {
    const isEdge = i === 1 || i === total;
    const isNearCurrent = i >= current - delta && i <= current + delta;
    if (isEdge || isNearCurrent) {
      items.push(i);
    } else if (items[items.length - 1] !== '...') {
      items.push('...');
    }
  }
  return items;
}

function renderPagination(totalPages) {
  const container = document.getElementById('blogPagination');
  if (!container) return;

  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  const prevDisabled = currentPage === 1 ? 'disabled' : '';
  const nextDisabled = currentPage === totalPages ? 'disabled' : '';

  const numbers = getPaginationItems(currentPage, totalPages)
    .map((item) => {
      if (item === '...') return '<span class="page-ellipsis" aria-hidden="true">…</span>';
      const active = item === currentPage;
      return `<button type="button" class="page-btn ${active ? 'active' : ''}" ${
        active ? 'aria-current="page"' : ''
      } onclick="goToPage(${item})">${item}</button>`;
    })
    .join('');

  container.innerHTML = `
    <button type="button" class="page-btn page-nav" ${prevDisabled} onclick="goToPage(${
    currentPage - 1
  })" aria-label="Página anterior">‹</button>
    ${numbers}
    <button type="button" class="page-btn page-nav" ${nextDisabled} onclick="goToPage(${
    currentPage + 1
  })" aria-label="Próxima página">›</button>
  `;
}

function renderEmptyState(container) {
  if (!container) return;
  container.innerHTML = `
    <div class="blog-empty-state">
      <h3>Nenhum artigo publicado ainda</h3>
      <p>Em breve, histórias e reflexões sobre a cultura carioca serão compartilhadas aqui.</p>
      <a href="/#sabados" class="btn btn-primary">Ver experiências</a>
    </div>
  `;
}

function renderSearchEmptyState(container) {
  if (!container) return;
  container.innerHTML = `
    <div class="blog-empty-state">
      <h3>Nada encontrado</h3>
      <p>Tente outra palavra ou limpe a busca para ver todos os artigos.</p>
      <button type="button" class="btn btn-primary" onclick="clearBlogSearch()">Limpar busca</button>
    </div>
  `;
}

function renderErrorState(container, _error) {
  if (!container) return;
  container.innerHTML = `
    <div class="blog-error-state">
      <h3>Não foi possível carregar os artigos</h3>
      <p>Verifique sua conexão e tente novamente.</p>
      <button type="button" onclick="location.reload()" class="btn btn-primary">Recarregar</button>
    </div>
  `;
}

function renderFeatured(post) {
  const mount = document.getElementById('blogFeatured');
  if (!mount) return;

  if (!post) {
    mount.hidden = true;
    mount.innerHTML = '';
    return;
  }

  const date = formatPostDate(post.created_at);
  const excerpt = getExcerpt(post, 180);
  const image = post.featured_image_url
    ? `<img src="${escapeHtml(post.featured_image_url)}" alt="${escapeHtml(
        post.featured_image_alt || post.title
      )}" class="blog-featured-image" loading="eager">`
    : '<div class="blog-featured-image blog-featured-image-placeholder" aria-hidden="true"></div>';

  mount.hidden = false;
  mount.innerHTML = `
    <article class="blog-featured-card">
      <button type="button" class="blog-featured-media" onclick="openBlogPost('${post.id}')" aria-label="Ler ${escapeHtml(
    post.title
  )}">
        ${image}
      </button>
      <div class="blog-featured-body">
        <p class="blog-featured-label">Em destaque</p>
        <div class="blog-card-meta">
          <time datetime="${post.created_at}">${date}</time>
          ${post.author ? `<span>Por ${escapeHtml(post.author)}</span>` : ''}
        </div>
        <h2 class="blog-featured-title">
          <button type="button" onclick="openBlogPost('${post.id}')">${escapeHtml(post.title)}</button>
        </h2>
        <p class="blog-featured-excerpt">${escapeHtml(excerpt)}</p>
        <button type="button" class="blog-card-cta-btn" onclick="openBlogPost('${post.id}')">Ler artigo</button>
      </div>
    </article>
  `;
}

function renderBlogGrid(posts) {
  const container = document.getElementById('blogPostsContainer');
  if (!container) return;

  if (!posts.length) {
    container.innerHTML = `
      <div class="blog-empty-state blog-empty-state--compact">
        <h3>Você chegou ao fim desta página</h3>
        <p>Volte para a primeira página ou explore o artigo em destaque.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = posts
    .map((post) => {
      const date = formatPostDate(post.created_at);
      const excerpt = getExcerpt(post, 130);
      const image = post.featured_image_url
        ? `<img src="${escapeHtml(post.featured_image_url)}" alt="${escapeHtml(
            post.featured_image_alt || post.title
          )}" class="blog-card-image" loading="lazy">`
        : '<div class="blog-card-image blog-card-image-placeholder" aria-hidden="true"></div>';

      return `
        <article class="blog-card">
          <button type="button" class="blog-card-media" onclick="openBlogPost('${post.id}')" aria-label="Abrir ${escapeHtml(
        post.title
      )}">
            <div class="blog-card-image-wrapper">
              ${image}
              <div class="blog-card-overlay"></div>
            </div>
          </button>
          <div class="blog-card-content">
            <div class="blog-card-meta">
              <time datetime="${post.created_at}" class="blog-card-date">${date}</time>
              ${post.author ? `<span class="blog-card-author">Por ${escapeHtml(post.author)}</span>` : ''}
            </div>
            <h2 class="blog-card-title">
              <button type="button" onclick="openBlogPost('${post.id}')">${escapeHtml(post.title)}</button>
            </h2>
            <p class="blog-card-excerpt">${escapeHtml(excerpt)}</p>
            <div class="blog-card-footer">
              <button type="button" class="blog-card-cta-btn" onclick="openBlogPost('${post.id}')">Ler artigo</button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

function openBlogPost(postId, options = {}) {
  const { skipHistory = false } = options;
  const post = allBlogPosts.find((p) => p.id === postId);
  if (!post) return;

  const detailContainer = document.getElementById('postDetail');
  if (!detailContainer) return;

  const date = formatPostDate(post.created_at);
  const author = formatPostAuthor(post.author);
  const minutes = estimateReadingMinutes(post);
  const waText = encodeURIComponent(`Li no Blog Rioclássica: ${post.title}`);
  const { prev, next } = getAdjacentPosts(post.id);
  currentOpenPostId = post.id;

  detailContainer.innerHTML = `
    <div class="post-detail-header${post.featured_image_url ? ' has-image' : ''}">
      ${
        post.featured_image_url
          ? `<figure class="post-detail-media">
              <button type="button" class="post-detail-image-btn" onclick="togglePostImageZoom(this)" aria-label="Ampliar imagem" aria-pressed="false">
                <img src="${escapeHtml(post.featured_image_url)}" alt="${escapeHtml(
                  post.featured_image_alt || post.title
                )}" class="post-detail-image">
                <span class="post-detail-image-hint">Toque para ampliar</span>
              </button>
            </figure>`
          : ''
      }
      <div class="post-detail-header-content">
        <p class="post-detail-kicker">Blog Rioclássica</p>
        <h1 id="postModalTitle">${escapeHtml(post.title)}</h1>
        <div class="post-detail-meta">
          <time datetime="${post.created_at}">${date}</time>
          <span class="post-detail-meta-sep" aria-hidden="true">·</span>
          <span>${escapeHtml(author)}</span>
          <span class="post-detail-meta-sep" aria-hidden="true">·</span>
          <span>${minutes} min de leitura</span>
        </div>
        <div class="post-detail-share" role="group" aria-label="Compartilhar artigo">
          <button type="button" class="post-share-btn" onclick="copyBlogPostLink('${post.id}')">Copiar link</button>
          <a class="post-share-btn post-share-btn--wa" href="https://wa.me/?text=${waText}%20${encodeURIComponent(
            `${window.location.origin}${window.location.pathname}?post=${post.id}`
          )}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
    </div>
    <div class="post-detail-content">
      ${post.content || ''}
    </div>
    <nav class="post-detail-nav" aria-label="Outros artigos">
      ${
        prev
          ? `<button type="button" class="post-nav-card post-nav-card--prev" onclick="openBlogPost('${prev.id}')">
              <span class="post-nav-label">Anterior</span>
              <span class="post-nav-title">${escapeHtml(prev.title)}</span>
            </button>`
          : `<span class="post-nav-card post-nav-card--empty" aria-hidden="true"></span>`
      }
      ${
        next
          ? `<button type="button" class="post-nav-card post-nav-card--next" onclick="openBlogPost('${next.id}')">
              <span class="post-nav-label">Próximo</span>
              <span class="post-nav-title">${escapeHtml(next.title)}</span>
            </button>`
          : `<span class="post-nav-card post-nav-card--empty" aria-hidden="true"></span>`
      }
    </nav>
    <div class="post-detail-actions">
      <button type="button" class="post-detail-back" onclick="closeBlogModal()">← Voltar aos artigos</button>
      <a class="btn btn-primary" href="https://wa.me/21990234090?text=${waText}" target="_blank" rel="noopener noreferrer">Conversar no WhatsApp</a>
    </div>
  `;

  const modal = document.getElementById('postModal');
  modal?.classList.add('active');
  modal?.classList.remove('is-closing');
  lockPageScroll();

  if (!skipHistory && !blogModalHistoryActive) {
    history.pushState({ blogModal: true, postId: post.id }, '', `?post=${encodeURIComponent(post.id)}`);
    blogModalHistoryActive = true;
  } else if (!skipHistory && blogModalHistoryActive) {
    history.replaceState({ blogModal: true, postId: post.id }, '', `?post=${encodeURIComponent(post.id)}`);
  }

  const modalContent = document.getElementById('blogModalContent');
  if (modalContent) {
    modalContent.scrollTop = 0;
    updateReadingProgress();
  }

  requestAnimationFrame(() => {
    detailContainer.classList.remove('is-ready');
    void detailContainer.offsetWidth;
    detailContainer.classList.add('is-ready');
  });
}

function closeBlogModal(skipHistoryBack = false) {
  const modal = document.getElementById('postModal');
  if (!modal?.classList.contains('active') || modal.classList.contains('is-closing')) return;

  modal.classList.add('is-closing');
  currentOpenPostId = null;

  window.setTimeout(() => {
    modal.classList.remove('active', 'is-closing');
    unlockPageScroll();
    const bar = document.getElementById('blogReadProgress');
    if (bar) bar.style.width = '0%';
  }, 180);

  if (!blogModalHistoryActive) return;

  if (skipHistoryBack) {
    blogModalHistoryActive = false;
    if (window.location.search.includes('post=')) {
      history.replaceState({}, '', window.location.pathname);
    }
    return;
  }

  blogModalHistoryActive = false;
  history.back();
}

function clearBlogSearch() {
  const input = document.getElementById('blogSearchInput');
  if (input) input.value = '';
  searchQuery = '';
  applySearchFilter();
  currentPage = 1;
  renderBlogView();
  input?.focus();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}

function setupBlogSearch() {
  const input = document.getElementById('blogSearchInput');
  if (!input) return;

  let timer = null;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      searchQuery = input.value;
      applySearchFilter();
      currentPage = 1;
      renderBlogView();
    }, 180);
  });
}

function openPostFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('post');
  if (!postId || !allBlogPosts.length) return;
  openBlogPost(postId, { skipHistory: true });
  blogModalHistoryActive = true;
}

document.addEventListener('DOMContentLoaded', () => {
  setupBlogSearch();
  loadBlogPostsPublic().then(() => {
    openPostFromQuery();
  });

  const postModal = document.getElementById('postModal');
  const modalContent = document.getElementById('blogModalContent');

  postModal?.addEventListener('click', (e) => {
    if (e.target.id === 'postModal') closeBlogModal();
  });

  modalContent?.addEventListener('scroll', () => {
    updateReadingProgress();
  }, { passive: true });

  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('postModal');
    if (!modal?.classList.contains('active') || modal.classList.contains('is-closing')) return;

    if (e.key === 'Escape') {
      closeBlogModal();
      return;
    }

    if (!currentOpenPostId) return;
    const { prev, next } = getAdjacentPosts(currentOpenPostId);
    if (e.key === 'ArrowLeft' && prev) openBlogPost(prev.id);
    if (e.key === 'ArrowRight' && next) openBlogPost(next.id);
  });

  window.addEventListener('popstate', () => {
    if (document.getElementById('postModal')?.classList.contains('active')) {
      closeBlogModal(true);
    }
  });
});

window.openBlogPost = openBlogPost;
window.closeBlogModal = closeBlogModal;
window.goToPage = goToPage;
window.clearBlogSearch = clearBlogSearch;
window.copyBlogPostLink = copyBlogPostLink;
window.togglePostImageZoom = togglePostImageZoom;
