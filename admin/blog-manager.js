// Painel administrativo — gerenciamento de posts do blog (compartilhado entre páginas)

let currentBlogPostId = null;
let blogFeaturedImageFile = null;
let currentBlogImageUrl = '';
let blogImageMarkedForRemoval = false;
let quillEditor = null;

function initializeQuillEditor() {
  if (quillEditor) return;

  const editorEl = document.getElementById('blogEditor');
  if (!editorEl) {
    setTimeout(initializeQuillEditor, 100);
    return;
  }

  quillEditor = new Quill('#blogEditor', {
    theme: 'snow',
    placeholder: 'Escreva o conteúdo do seu post aqui...',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['link', 'image'],
        ['clean']
      ]
    }
  });
}

async function loadBlogPosts() {
  try {
    renderBlogPostsList(await getBlogPosts(false));
  } catch (error) {
    console.error('Erro ao carregar posts:', error);
    showMessage('Erro ao carregar posts do blog', 'error');
  }
}

function renderBlogPostsList(posts) {
  const container = document.getElementById('blogPostsList');
  if (!container) return;

  if (!posts.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>Nenhum post ainda</h3>
        <p>Crie seu primeiro post para começar!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = posts
    .map((post) => {
      const date = new Date(post.created_at).toLocaleDateString('pt-BR');
      const status = post.published ? '✓ Publicado' : '○ Rascunho';
      const excerpt = post.excerpt || post.content?.slice(0, 100) || '';
      const thumb = post.featured_image_url
        ? `<img src="${escapeHtml(post.featured_image_url)}" alt="" class="blog-post-thumbnail" loading="lazy">`
        : '<div class="blog-post-thumbnail blog-post-thumbnail-placeholder">Sem imagem</div>';

      return `
        <article class="blog-post-item">
          ${thumb}
          <div class="blog-post-body">
            <div class="blog-post-header">
              <h3 class="blog-post-title">${escapeHtml(post.title)}</h3>
              <span class="blog-post-status ${post.published ? 'published' : 'draft'}">${status}</span>
            </div>
            <p class="blog-post-excerpt">${escapeHtml(excerpt)}</p>
            <div class="blog-post-meta">
              <span>${date}</span>
              ${post.author ? `<span>Por ${escapeHtml(post.author)}</span>` : ''}
            </div>
            <div class="blog-post-actions">
              <button type="button" class="btn-small btn-edit" onclick="editBlogPost('${post.id}')">Editar</button>
              <button type="button" class="btn-small btn-delete" onclick="deleteBlogPost('${post.id}')">Deletar</button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

function openBlogPostModal(postData = null) {
  currentBlogPostId = postData?.id || null;
  document.getElementById('blogPostModalTitle').textContent = postData ? 'Editar Post' : 'Novo Post';

  document.getElementById('blogPostForm').reset();
  resetBlogImageState();
  quillEditor?.setContents([]);

  if (postData) {
    document.getElementById('blogTitle').value = postData.title || '';
    document.getElementById('blogExcerpt').value = postData.excerpt || '';
    document.getElementById('blogAuthor').value = postData.author || '';
    document.getElementById('blogFeaturedImageAlt').value = postData.featured_image_alt || '';
    document.getElementById('blogPublished').checked = postData.published !== false;

    if (postData.featured_image_url) setBlogFeaturedImage(postData.featured_image_url);
    if (postData.content && quillEditor) {
      try {
        quillEditor.root.innerHTML = postData.content;
      } catch (e) {
        console.warn('Erro ao carregar conteúdo no Quill:', e);
      }
    }
  } else {
    document.getElementById('blogPublished').checked = true;
  }

  document.getElementById('blogPostModal').classList.add('active');
  document.body.classList.add('modal-open');
}

function closeBlogPostModal() {
  document.getElementById('blogPostModal').classList.remove('active');
  document.body.classList.remove('modal-open');
  currentBlogPostId = null;
  resetBlogImageState();
}

function resetBlogImageState() {
  blogFeaturedImageFile = null;
  currentBlogImageUrl = '';
  blogImageMarkedForRemoval = false;

  const preview = document.getElementById('blogFeaturedPreview');
  if (preview) {
    preview.classList.remove('active');
    preview.removeAttribute('src');
  }
  const fileInput = document.getElementById('blogFeaturedImage');
  if (fileInput) fileInput.value = '';

  updateBlogRemoveImageButton();
}

function setBlogFeaturedImage(imageUrl) {
  const preview = document.getElementById('blogFeaturedPreview');
  currentBlogImageUrl = imageUrl || '';
  blogImageMarkedForRemoval = false;

  if (imageUrl && preview) {
    preview.src = imageUrl;
    preview.classList.add('active');
  }
  updateBlogRemoveImageButton();
}

function updateBlogRemoveImageButton() {
  const preview = document.getElementById('blogFeaturedPreview');
  const btn = document.getElementById('blogRemoveFeaturedImage');
  if (!btn) return;
  btn.classList.toggle('visible', preview?.classList.contains('active'));
}

function removeBlogFeaturedImage() {
  const hasPreview = document.getElementById('blogFeaturedPreview')?.classList.contains('active');
  if (!hasPreview && !blogImageMarkedForRemoval) return;
  if (!confirm('Remover esta imagem destacada?')) return;

  blogImageMarkedForRemoval = true;
  blogFeaturedImageFile = null;
  resetBlogImagePreview();
  updateBlogRemoveImageButton();
}

function resetBlogImagePreview() {
  const preview = document.getElementById('blogFeaturedPreview');
  if (preview) {
    preview.classList.remove('active');
    preview.removeAttribute('src');
  }
  const fileInput = document.getElementById('blogFeaturedImage');
  if (fileInput) fileInput.value = '';
}

async function editBlogPost(postId) {
  try {
    const post = await getBlogPostById(postId);
    if (post) openBlogPostModal(post);
    else showMessage('Post não encontrado', 'error');
  } catch (error) {
    console.error('Erro ao editar post:', error);
    showMessage('Erro ao carregar post', 'error');
  }
}

async function deleteBlogPost(postId) {
  if (!confirm('Tem certeza que deseja deletar este post? Esta ação não pode ser desfeita.')) return;

  try {
    const post = await getBlogPostById(postId);
    await removeBlogImageIfStored(post?.featured_image_url);
    await deleteBlogPostFromDb(postId);
    showMessage('Post deletado com sucesso!');
    loadBlogPosts();
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    showMessage('Erro ao deletar post', 'error');
  }
}

async function removeBlogImageIfStored(imageUrl) {
  if (!imageUrl || !isSupabaseStorageUrl(imageUrl)) return;
  try {
    await deleteImageFromStorage(imageUrl);
  } catch (e) {
    console.warn('Erro ao deletar imagem do storage:', e);
  }
}

async function resolveBlogFeaturedImageUrl() {
  if (blogImageMarkedForRemoval) {
    await removeBlogImageIfStored(currentBlogImageUrl);
    return '';
  }

  if (!blogFeaturedImageFile) return currentBlogImageUrl;

  try {
    const path = `blog/${Date.now()}_${blogFeaturedImageFile.name}`;
    const newUrl = await uploadImage(blogFeaturedImageFile, path);
    if (currentBlogImageUrl && currentBlogImageUrl !== newUrl) {
      await removeBlogImageIfStored(currentBlogImageUrl);
    }
    return newUrl;
  } catch (error) {
    console.warn('Upload falhou:', error);
    throw new Error('Erro ao fazer upload da imagem');
  }
}

async function saveBlogPost(e) {
  e.preventDefault();

  const loading = document.getElementById('blogLoading');
  loading.style.display = 'block';

  try {
    const title = document.getElementById('blogTitle').value.trim();
    const content = quillEditor ? quillEditor.root.innerHTML : '';
    if (!title || !content) throw new Error('Título e conteúdo são obrigatórios');

    const postData = {
      title,
      excerpt: document.getElementById('blogExcerpt').value.trim(),
      author: document.getElementById('blogAuthor').value.trim(),
      content,
      featured_image_url: await resolveBlogFeaturedImageUrl(),
      featured_image_alt: document.getElementById('blogFeaturedImageAlt').value.trim(),
      published: document.getElementById('blogPublished').checked
    };

    if (currentBlogPostId) {
      await updateBlogPost(currentBlogPostId, postData);
      showMessage('Post atualizado com sucesso!');
    } else {
      await createBlogPost(postData);
      showMessage('Post criado com sucesso!');
    }

    closeBlogPostModal();
    loadBlogPosts();
  } catch (error) {
    console.error('Erro ao salvar post:', error);
    showMessage('Erro ao salvar post: ' + (error?.message || ''), 'error');
  } finally {
    loading.style.display = 'none';
  }
}

// Liga os eventos de UI do blog (input de imagem, formulário, modal, atalhos).
function initBlogManager() {
  document.getElementById('blogFeaturedImage')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    blogFeaturedImageFile = file;
    blogImageMarkedForRemoval = false;
    const reader = new FileReader();
    reader.onload = (event) => {
      const preview = document.getElementById('blogFeaturedPreview');
      preview.src = event.target.result;
      preview.classList.add('active');
      updateBlogRemoveImageButton();
    };
    reader.readAsDataURL(file);
  });

  document
    .getElementById('blogRemoveFeaturedImage')
    ?.addEventListener('click', removeBlogFeaturedImage);
  document.getElementById('blogPostForm')?.addEventListener('submit', saveBlogPost);
  document.getElementById('newBlogPostBtn')?.addEventListener('click', () => openBlogPostModal());

  document.getElementById('blogPostModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'blogPostModal') closeBlogPostModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('blogPostModal')?.classList.contains('active')) {
      closeBlogPostModal();
    }
  });
}

window.initBlogManager = initBlogManager;
window.initializeQuillEditor = initializeQuillEditor;
window.loadBlogPosts = loadBlogPosts;
window.openBlogPostModal = openBlogPostModal;
window.closeBlogPostModal = closeBlogPostModal;
window.editBlogPost = editBlogPost;
window.deleteBlogPost = deleteBlogPost;
window.removeBlogFeaturedImage = removeBlogFeaturedImage;
