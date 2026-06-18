// Blog — Página pública (listagem com paginação + modal de leitura)

const POSTS_PER_PAGE = 8;

let allBlogPosts = [];
let currentPage = 1;

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

async function loadBlogPostsPublic() {
  const container = document.getElementById('blogPostsContainer');
  if (!container) return;

  try {
    await waitForBlogService();
    if (typeof getBlogPosts !== 'function') {
      throw new Error('Serviço de blog não disponível');
    }

    allBlogPosts = await getBlogPosts(true);

    if (!allBlogPosts.length) {
      renderEmptyState(container);
      renderPagination(0);
      return;
    }

    currentPage = 1;
    renderCurrentPage();
  } catch (error) {
    console.error('Erro ao carregar posts:', error);
    renderErrorState(container, error);
    renderPagination(0);
  }
}

function renderCurrentPage() {
  const totalPages = Math.ceil(allBlogPosts.length / POSTS_PER_PAGE);
  currentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = allBlogPosts.slice(start, start + POSTS_PER_PAGE);

  renderBlogGrid(pagePosts);
  renderPagination(totalPages);
}

function goToPage(page) {
  currentPage = page;
  renderCurrentPage();
  document.querySelector('.blog-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  container.innerHTML = `
    <div class="blog-empty-state">
      <div class="blog-empty-icon">📝</div>
      <h3>Nenhum artigo publicado ainda</h3>
      <p>Em breve, histórias e reflexões sobre a cultura carioca serão compartilhadas aqui.</p>
    </div>
  `;
}

function renderErrorState(container, _error) {
  container.innerHTML = `
    <div class="blog-error-state">
      <div class="blog-error-icon">⚠️</div>
      <h3>Desculpe, não conseguimos carregar os artigos</h3>
      <p>Por favor, tente novamente mais tarde.</p>
      <button type="button" onclick="location.reload()" class="btn btn-primary">Recarregar</button>
    </div>
  `;
}

function renderBlogGrid(posts) {
  const container = document.getElementById('blogPostsContainer');
  if (!container) return;

  container.innerHTML = posts
    .map((post) => {
      const date = new Date(post.created_at).toLocaleDateString('pt-BR');
      const excerpt = post.excerpt || post.content?.replace(/<[^>]*>/g, '')?.slice(0, 120) || '';
      const image = post.featured_image_url
        ? `<img src="${escapeHtml(post.featured_image_url)}" alt="${escapeHtml(
            post.featured_image_alt || post.title
          )}" class="blog-card-image" loading="lazy">`
        : '<div class="blog-card-image blog-card-image-placeholder">📸</div>';

      return `
        <article class="blog-card" onclick="openBlogPost('${post.id}')">
          <div class="blog-card-image-wrapper">
            ${image}
            <div class="blog-card-overlay"></div>
          </div>
          <div class="blog-card-content">
            <div class="blog-card-meta">
              <time datetime="${post.created_at}" class="blog-card-date">${date}</time>
              ${post.author ? `<span class="blog-card-author">Por ${escapeHtml(post.author)}</span>` : ''}
            </div>
            <h2 class="blog-card-title">${escapeHtml(post.title)}</h2>
            <p class="blog-card-excerpt">${escapeHtml(excerpt)}${excerpt.length > 120 ? '...' : ''}</p>
            <div class="blog-card-footer">
              <span class="blog-card-cta">Ler artigo →</span>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

function openBlogPost(postId) {
  const post = allBlogPosts.find((p) => p.id === postId);
  if (!post) return;

  const detailContainer = document.getElementById('postDetail');
  if (!detailContainer) return;

  const date = new Date(post.created_at).toLocaleDateString('pt-BR');

  detailContainer.innerHTML = `
    <div class="post-detail-header">
      ${
        post.featured_image_url
          ? `<img src="${escapeHtml(post.featured_image_url)}" alt="${escapeHtml(
              post.featured_image_alt || post.title
            )}" class="post-detail-image">`
          : ''
      }
      <div class="post-detail-header-content">
        <div class="post-detail-meta">
          <time datetime="${post.created_at}">${date}</time>
          ${post.author ? `<span>Por ${escapeHtml(post.author)}</span>` : ''}
        </div>
        <h1 id="postModalTitle">${escapeHtml(post.title)}</h1>
      </div>
    </div>
    <div class="post-detail-content">
      ${post.content || ''}
    </div>
  `;

  document.getElementById('postModal').classList.add('active');
  document.body.classList.add('modal-open');
  window.scrollTo(0, 0);
}

function closeBlogModal() {
  document.getElementById('postModal').classList.remove('active');
  document.body.classList.remove('modal-open');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  loadBlogPostsPublic();

  const postModal = document.getElementById('postModal');
  postModal?.addEventListener('click', (e) => {
    if (e.target.id === 'postModal') closeBlogModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('postModal')?.classList.contains('active')) {
      closeBlogModal();
    }
  });
});

window.openBlogPost = openBlogPost;
window.closeBlogModal = closeBlogModal;
window.goToPage = goToPage;
