// Dashboard — CRUD e gerenciamento

let currentSabadoId = null;
let sabadoImageFile = null;
let currentSabadoImageUrl = '';
let sabadoStorageUrlToDelete = '';
let sabadoImageMarkedForRemoval = false;
let dashboardReady = false;

function checkAuth() {
  if (typeof onAuthStateChanged !== 'function') {
    setTimeout(checkAuth, 100);
    return;
  }

  onAuthStateChanged(async (user) => {
    if (!user) {
      window.location.href = '/admin/login.html';
      return;
    }

    const email = user.email || '';
    const userEmailEl = document.getElementById('userEmail');
    const userBadge = document.getElementById('userBadge');
    const userAvatar = document.getElementById('userAvatar');

    if (userEmailEl) userEmailEl.textContent = email;
    if (userAvatar) {
      userAvatar.textContent = email.split('@')[0].slice(0, 2).toUpperCase() || 'RC';
    }
    if (userBadge) userBadge.hidden = false;

    if (!dashboardReady) {
      dashboardReady = true;
      try {
        if (typeof ensureFeaturedDocExists === 'function') {
          await ensureFeaturedDocExists();
        }
      } catch (e) {
        console.warn('Criar card featured no Supabase:', e.message);
      }
      loadSabados();
    }
  });
}

function initMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const toggle = document.getElementById('menuToggle');

  const closeMenu = () => {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('visible');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    sidebar?.classList.add('open');
    overlay?.classList.add('visible');
    toggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  toggle?.addEventListener('click', () => {
    if (sidebar?.classList.contains('open')) closeMenu();
    else openMenu();
  });

  overlay?.addEventListener('click', closeMenu);

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
}

document.addEventListener('DOMContentLoaded', function () {
  async function inicializarDashboard() {
    if (typeof getAllSaturdays !== 'function') {
      setTimeout(inicializarDashboard, 100);
      return;
    }

    initMobileMenu();

    document.getElementById('logoutBtn')?.addEventListener('click', logout);

    document.querySelectorAll('.menu-item').forEach((item) => {
      item.addEventListener('click', function () {
        document.querySelectorAll('.menu-item').forEach((i) => i.classList.remove('active'));
        this.classList.add('active');
        if (window.innerWidth <= 900) {
          document.getElementById('sidebar')?.classList.remove('open');
          document.getElementById('sidebarOverlay')?.classList.remove('visible');
          document.body.style.overflow = '';
        }
      });
    });

    document.getElementById('sabadoImage')?.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (!file) return;
      sabadoImageFile = file;
      sabadoImageMarkedForRemoval = false;
      const reader = new FileReader();
      reader.onload = (event) => {
        const preview = document.getElementById('sabadoPreview');
        preview.src = event.target.result;
        preview.classList.add('active');
        updateRemoveImageButton();
      };
      reader.readAsDataURL(file);
    });

    document.getElementById('sabadoRemoveImage')?.addEventListener('click', () => removeModalImage());
    document.getElementById('sabadoImageUrl')?.addEventListener('input', () => {
      sabadoImageMarkedForRemoval = false;
      previewImageFromUrl('sabadoImageUrl', 'sabadoPreview');
      updateRemoveImageButton();
    });
    document.getElementById('sabadoForm')?.addEventListener('submit', saveSabado);

    document.getElementById('sabadoModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'sabadoModal') closeSabadoModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.getElementById('sabadoModal')?.classList.contains('active')) {
        closeSabadoModal();
      }
    });

    showSetupWarnings();
    checkAuth();
  }

  inicializarDashboard();
});

function showSetupWarnings() {
  const key = window.SUPABASE_ANON_KEY || '';
  const container = document.getElementById('messageContainer');
  if (!container || !key.includes('COLE_AQUI')) return;

  const el = document.createElement('div');
  el.className = 'message error active';
  el.textContent = 'Configure js/config/supabase-config.js com URL e chave do Supabase. Depois Ctrl+F5.';
  container.prepend(el);
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function showMessage(message, type = 'success') {
  showToast(message, type);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}

function previewImageFromUrl(inputId, previewId) {
  const url = document.getElementById(inputId)?.value?.trim();
  const preview = document.getElementById(previewId);
  if (!preview) return;
  if (!url) {
    preview.classList.remove('active');
    preview.removeAttribute('src');
    return;
  }
  preview.onerror = () => preview.classList.remove('active');
  preview.onload = () => preview.classList.add('active');
  preview.src = url;
}

function getImageModalIds() {
  return {
    previewId: 'sabadoPreview',
    urlInputId: 'sabadoImageUrl',
    fileInputId: 'sabadoImage',
    removeBtnId: 'sabadoRemoveImage'
  };
}

function updateRemoveImageButton() {
  const { previewId, removeBtnId } = getImageModalIds();
  const preview = document.getElementById(previewId);
  const btn = document.getElementById(removeBtnId);
  if (!btn) return;
  btn.classList.toggle('visible', preview?.classList.contains('active'));
}

function resetImageModalState() {
  const { previewId, urlInputId, fileInputId } = getImageModalIds();

  sabadoImageFile = null;
  currentSabadoImageUrl = '';
  sabadoStorageUrlToDelete = '';
  sabadoImageMarkedForRemoval = false;

  const preview = document.getElementById(previewId);
  if (preview) {
    preview.classList.remove('active');
    preview.removeAttribute('src');
  }
  const urlInput = document.getElementById(urlInputId);
  if (urlInput) urlInput.value = '';
  const fileInput = document.getElementById(fileInputId);
  if (fileInput) fileInput.value = '';
  updateRemoveImageButton();
}

function setModalImage(imageUrl) {
  const { previewId, urlInputId } = getImageModalIds();
  const preview = document.getElementById(previewId);
  const urlInput = document.getElementById(urlInputId);

  currentSabadoImageUrl = imageUrl || '';
  sabadoStorageUrlToDelete = isSupabaseStorageUrl(currentSabadoImageUrl) ? currentSabadoImageUrl : '';
  sabadoImageMarkedForRemoval = false;

  if (urlInput) urlInput.value = imageUrl || '';
  if (imageUrl && preview) {
    preview.src = imageUrl;
    preview.classList.add('active');
  }
  updateRemoveImageButton();
}

function removeModalImage() {
  const hasPreview = document
    .getElementById(getImageModalIds().previewId)
    ?.classList.contains('active');

  if (!hasPreview && !sabadoImageMarkedForRemoval) return;

  if (
    !confirm(
      'Remover esta foto? Ao salvar, ela sai do site. Se estiver no Supabase Storage, o arquivo também será apagado.'
    )
  ) {
    return;
  }

  sabadoImageMarkedForRemoval = true;
  sabadoImageFile = null;

  const { previewId, urlInputId, fileInputId } = getImageModalIds();
  const preview = document.getElementById(previewId);
  if (preview) {
    preview.classList.remove('active');
    preview.removeAttribute('src');
  }
  document.getElementById(urlInputId).value = '';
  document.getElementById(fileInputId).value = '';
  updateRemoveImageButton();
}

async function applyImageChangesOnSave({
  type: _type,
  file,
  urlInputId,
  storageFolder,
  markedForRemoval,
  storageUrlToDelete,
  previousUrl
}) {
  if (markedForRemoval) {
    if (storageUrlToDelete && typeof deleteImageFromStorage === 'function') {
      try {
        await deleteImageFromStorage(storageUrlToDelete);
      } catch (error) {
        console.warn('Erro ao excluir imagem do Storage:', error);
        showMessage('Registro sem foto, mas o arquivo no Storage pode não ter sido removido.', 'error');
      }
    }
    return '';
  }

  const urlFromField = document.getElementById(urlInputId)?.value?.trim() || '';
  let newUrl = '';

  if (file) {
    try {
      const timestamp = Date.now();
      const path = `${storageFolder}/${timestamp}_${file.name}`;
      newUrl = await uploadImage(file, path);

      const oldStorage =
        storageUrlToDelete || (isSupabaseStorageUrl(previousUrl) ? previousUrl : '');
      if (oldStorage && oldStorage !== newUrl && typeof deleteImageFromStorage === 'function') {
        try {
          await deleteImageFromStorage(oldStorage);
        } catch (error) {
          console.warn('Erro ao remover imagem antiga do Storage:', error);
        }
      }
      return newUrl;
    } catch (error) {
      console.warn('Upload Storage falhou:', error);
      if (urlFromField) {
        showMessage('Upload falhou — usamos o link da imagem informado.', 'success');
        return urlFromField;
      }
      throw new Error(
        error?.message || 'Erro no Supabase Storage. Verifique o bucket rioclassica e as políticas.'
      );
    }
  }

  newUrl = urlFromField || previousUrl || '';

  if (
    previousUrl &&
    newUrl !== previousUrl &&
    isSupabaseStorageUrl(previousUrl) &&
    typeof deleteImageFromStorage === 'function'
  ) {
    try {
      await deleteImageFromStorage(previousUrl);
    } catch (error) {
      console.warn('Erro ao remover imagem antiga do Storage:', error);
    }
  }

  return newUrl;
}

function openSabadoModal(saturdayData = null) {
  currentSabadoId = saturdayData?.id || null;
  document.getElementById('sabadoModalTitle').textContent = saturdayData
    ? 'Editar card Evento Surpresa'
    : 'Novo Sábado';

  document.getElementById('sabadoForm').reset();
  resetImageModalState();

  if (saturdayData) {
    document.getElementById('sabadoBadge').value = saturdayData.badge || 'EVENTO SURPRESA';
    document.getElementById('sabadoTitle').value = saturdayData.title || '';
    document.getElementById('sabadoDesc').value = saturdayData.description || '';
    document.getElementById('sabadoDuration').value = saturdayData.duration || '';
    document.getElementById('sabadoLanguages').value = saturdayData.languages || '';
    document.getElementById('sabadoMaxPeople').value = saturdayData.maxPeople || '';
    document.getElementById('sabadoButtonText').value =
      saturdayData.buttonText || 'Reservar agora';
    document.getElementById('sabadoNote').value =
      saturdayData.note || '*Vagas estritamente limitadas - Confirme sua participação via WhatsApp';
    document.getElementById('sabadoWhatsappLink').value = saturdayData.whatsappLink || '';
    document.getElementById('sabadoExplanation').value = saturdayData.explanation || '';
    document.getElementById('sabadoImageAlt').value = saturdayData.imageAlt || '';

    if (saturdayData.imageUrl) {
      setModalImage(saturdayData.imageUrl);
    }
  }

  document.getElementById('sabadoModal').classList.add('active');
  document.body.classList.add('modal-open');
}

function closeSabadoModal() {
  document.getElementById('sabadoModal').classList.remove('active');
  document.body.classList.remove('modal-open');
  currentSabadoId = null;
  resetImageModalState();
}

async function saveSabado(e) {
  e.preventDefault();

  const loading = document.getElementById('sabadoLoading');
  loading.style.display = 'block';

  try {
    const imageUrl = await applyImageChangesOnSave({
      type: 'sabado',
      file: sabadoImageFile,
      urlInputId: 'sabadoImageUrl',
      storageFolder: 'sabados',
      markedForRemoval: sabadoImageMarkedForRemoval,
      storageUrlToDelete: sabadoStorageUrlToDelete,
      previousUrl: currentSabadoImageUrl
    });

    const sabadoData = {
      badge: document.getElementById('sabadoBadge').value.trim() || 'EVENTO SURPRESA',
      title: document.getElementById('sabadoTitle').value,
      description: document.getElementById('sabadoDesc').value,
      duration: document.getElementById('sabadoDuration').value,
      languages: document.getElementById('sabadoLanguages').value,
      maxPeople: document.getElementById('sabadoMaxPeople').value,
      buttonText: document.getElementById('sabadoButtonText').value,
      note: document.getElementById('sabadoNote').value,
      whatsappLink: document.getElementById('sabadoWhatsappLink').value,
      explanation: document.getElementById('sabadoExplanation').value,
      imageAlt: document.getElementById('sabadoImageAlt').value.trim(),
      imageUrl,
      id: currentSabadoId
    };

    const featuredId =
      window.FEATURED_SABADO_ID ||
      document.getElementById('featuredSabadoCard')?.dataset?.featuredId;

    if (!currentSabadoId) {
      sabadoData.featured = false;
    } else if (currentSabadoId === featuredId) {
      sabadoData.featured = true;
      sabadoData.id = featuredId;
    }

    await window.saveSaturday(sabadoData);
    showMessage(
      currentSabadoId
        ? 'Card salvo! O site atualiza automaticamente.'
        : 'Novo sábado salvo no Supabase!'
    );

    loading.style.display = 'none';
    closeSabadoModal();
    loadSabados();
  } catch (error) {
    loading.style.display = 'none';
    console.error('Erro ao salvar sábado:', error);
    showMessage('Erro ao salvar.' + (error?.message ? ' ' + error.message : ''), 'error');
  }
}

async function loadFeaturedSabadoCard(sabados) {
  const container = document.getElementById('featuredSabadoCard');
  if (!container) return;

  const featured = sabados.find((s) => s.featured) || sabados[0];

  if (!featured) {
    container.innerHTML =
      '<div class="empty-state"><h3>Nenhum card configurado</h3><p>O card em destaque será criado automaticamente ao salvar.</p></div>';
    return;
  }

  container.dataset.featuredId = featured.id || window.FEATURED_SABADO_ID || 'featured-sabado';

  const imgBlock = featured.imageUrl
    ? `<img src="${escapeHtml(featured.imageUrl)}" alt="" class="item-image" loading="lazy">`
    : '<div class="item-image item-image-placeholder">Sem imagem</div>';

  const excerpt = featured.description?.slice(0, 140) || '';
  const more = featured.description?.length > 140 ? '…' : '';

  container.innerHTML = `
    <article class="item-card">
      ${imgBlock}
      <div class="item-body">
        <div class="item-subtitle">${escapeHtml(featured.badge || 'EVENTO SURPRESA')}</div>
        <h3 class="item-title">${escapeHtml(featured.title)}</h3>
        <p class="item-excerpt">${escapeHtml(excerpt)}${more}</p>
        <div class="item-actions">
          <button type="button" class="btn-edit" id="editFeaturedSabadoBtn">Editar card do site</button>
        </div>
      </div>
    </article>
  `;

  document.getElementById('editFeaturedSabadoBtn')?.addEventListener('click', () =>
    editSabado(featured.id)
  );
}

async function loadSabados() {
  try {
    const sabados = await getAllSaturdays();
    await loadFeaturedSabadoCard(sabados);
  } catch (error) {
    console.error('Erro ao carregar sábados:', error);
    showMessage(error.message || 'Erro ao carregar sábados', 'error');
  }
}

async function editSabado(sabadoId) {
  try {
    const sabados = await getAllSaturdays();
    const sabado = sabados.find((s) => s.id === sabadoId);
    if (sabado) {
      openSabadoModal(sabado);
    } else {
      showMessage('Sábado não encontrado', 'error');
    }
  } catch (error) {
    console.error('Erro ao editar:', error);
    showMessage('Erro ao carregar sábado', 'error');
  }
}

window.closeSabadoModal = closeSabadoModal;
window.editSabado = editSabado;
