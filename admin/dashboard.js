// Dashboard — card "Evento de Sábado" + integração com o gerenciador de blog

let currentSabadoId = null;
let sabadoImageFile = null;
let currentSabadoImageUrl = '';
let sabadoStorageUrlToDelete = '';
let sabadoImageMarkedForRemoval = false;

const SABADO_IMAGE_IDS = {
  previewId: 'sabadoPreview',
  urlInputId: 'sabadoImageUrl',
  fileInputId: 'sabadoImage',
  removeBtnId: 'sabadoRemoveImage'
};

document.addEventListener('DOMContentLoaded', () => {
  function init() {
    if (typeof getAllSaturdays !== 'function') {
      setTimeout(init, 100);
      return;
    }

    initMobileMenu();
    initSectionTabs();
    initSabadoForm();
    initBlogManager();

    document.getElementById('logoutBtn')?.addEventListener('click', logout);

    showSetupWarnings();
    requireAuth(async () => {
      try {
        await ensureFeaturedDocExists?.();
      } catch (e) {
        console.warn('Criar card featured no Supabase:', e.message);
      }
      loadSabados();
      initializeQuillEditor();
      loadBlogPosts();
    });
  }

  init();
});

function initSectionTabs() {
  document.querySelectorAll('.menu-item').forEach((item) => {
    item.addEventListener('click', function () {
      const section = this.getAttribute('data-section');
      if (!section) return;

      document.querySelectorAll('.menu-item').forEach((i) => i.classList.remove('active'));
      this.classList.add('active');

      document.querySelectorAll('.section').forEach((s) => s.classList.remove('active'));
      document.getElementById(section)?.classList.add('active');

      if (window.innerWidth <= 900) {
        document.getElementById('sidebar')?.classList.remove('open');
        document.getElementById('sidebarOverlay')?.classList.remove('visible');
        document.body.style.overflow = '';
      }
    });
  });
}

function initSabadoForm() {
  document.getElementById('sabadoImage')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    sabadoImageFile = file;
    sabadoImageMarkedForRemoval = false;
    const reader = new FileReader();
    reader.onload = (event) => {
      const preview = document.getElementById(SABADO_IMAGE_IDS.previewId);
      preview.src = event.target.result;
      preview.classList.add('active');
      updateRemoveImageButton();
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('sabadoRemoveImage')?.addEventListener('click', removeModalImage);
  document.getElementById('sabadoImageUrl')?.addEventListener('input', () => {
    sabadoImageMarkedForRemoval = false;
    previewImageFromUrl(SABADO_IMAGE_IDS.urlInputId, SABADO_IMAGE_IDS.previewId);
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

function updateRemoveImageButton() {
  const preview = document.getElementById(SABADO_IMAGE_IDS.previewId);
  const btn = document.getElementById(SABADO_IMAGE_IDS.removeBtnId);
  if (!btn) return;
  btn.classList.toggle('visible', preview?.classList.contains('active'));
}

function resetImageModalState() {
  sabadoImageFile = null;
  currentSabadoImageUrl = '';
  sabadoStorageUrlToDelete = '';
  sabadoImageMarkedForRemoval = false;

  const preview = document.getElementById(SABADO_IMAGE_IDS.previewId);
  if (preview) {
    preview.classList.remove('active');
    preview.removeAttribute('src');
  }
  const urlInput = document.getElementById(SABADO_IMAGE_IDS.urlInputId);
  if (urlInput) urlInput.value = '';
  const fileInput = document.getElementById(SABADO_IMAGE_IDS.fileInputId);
  if (fileInput) fileInput.value = '';
  updateRemoveImageButton();
}

function setModalImage(imageUrl) {
  const preview = document.getElementById(SABADO_IMAGE_IDS.previewId);
  const urlInput = document.getElementById(SABADO_IMAGE_IDS.urlInputId);

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
  const preview = document.getElementById(SABADO_IMAGE_IDS.previewId);
  if (!preview?.classList.contains('active') && !sabadoImageMarkedForRemoval) return;

  if (
    !confirm(
      'Remover esta foto? Ao salvar, ela sai do site. Se estiver no Supabase Storage, o arquivo também será apagado.'
    )
  ) {
    return;
  }

  sabadoImageMarkedForRemoval = true;
  sabadoImageFile = null;

  if (preview) {
    preview.classList.remove('active');
    preview.removeAttribute('src');
  }
  document.getElementById(SABADO_IMAGE_IDS.urlInputId).value = '';
  document.getElementById(SABADO_IMAGE_IDS.fileInputId).value = '';
  updateRemoveImageButton();
}

async function resolveSabadoImageUrl() {
  if (sabadoImageMarkedForRemoval) {
    if (sabadoStorageUrlToDelete) {
      try {
        await deleteImageFromStorage(sabadoStorageUrlToDelete);
      } catch (error) {
        console.warn('Erro ao excluir imagem do Storage:', error);
        showMessage('Registro sem foto, mas o arquivo no Storage pode não ter sido removido.', 'error');
      }
    }
    return '';
  }

  const urlFromField = document.getElementById(SABADO_IMAGE_IDS.urlInputId)?.value?.trim() || '';

  if (sabadoImageFile) {
    try {
      const path = `sabados/${Date.now()}_${sabadoImageFile.name}`;
      const newUrl = await uploadImage(sabadoImageFile, path);

      const oldStorage =
        sabadoStorageUrlToDelete ||
        (isSupabaseStorageUrl(currentSabadoImageUrl) ? currentSabadoImageUrl : '');
      if (oldStorage && oldStorage !== newUrl) {
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

  const newUrl = urlFromField || currentSabadoImageUrl || '';
  if (
    currentSabadoImageUrl &&
    newUrl !== currentSabadoImageUrl &&
    isSupabaseStorageUrl(currentSabadoImageUrl)
  ) {
    try {
      await deleteImageFromStorage(currentSabadoImageUrl);
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
    document.getElementById('sabadoButtonText').value = saturdayData.buttonText || 'Reservar agora';
    document.getElementById('sabadoNote').value =
      saturdayData.note || '*Vagas estritamente limitadas - Confirme sua participação via WhatsApp';
    document.getElementById('sabadoWhatsappLink').value = saturdayData.whatsappLink || '';
    document.getElementById('sabadoExplanation').value = saturdayData.explanation || '';
    document.getElementById('sabadoImageAlt').value = saturdayData.imageAlt || '';

    if (saturdayData.imageUrl) setModalImage(saturdayData.imageUrl);
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
    const imageUrl = await resolveSabadoImageUrl();

    const featuredId =
      window.FEATURED_SABADO_ID || document.getElementById('featuredSabadoCard')?.dataset?.featuredId;

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

    if (!currentSabadoId) {
      sabadoData.featured = false;
    } else if (currentSabadoId === featuredId) {
      sabadoData.featured = true;
      sabadoData.id = featuredId;
    }

    await window.saveSaturday(sabadoData);
    showMessage(
      currentSabadoId ? 'Card salvo! O site atualiza automaticamente.' : 'Novo sábado salvo no Supabase!'
    );

    closeSabadoModal();
    loadSabados();
  } catch (error) {
    console.error('Erro ao salvar sábado:', error);
    showMessage('Erro ao salvar.' + (error?.message ? ' ' + error.message : ''), 'error');
  } finally {
    loading.style.display = 'none';
  }
}

function renderFeaturedSabadoCard(sabados) {
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

  document
    .getElementById('editFeaturedSabadoBtn')
    ?.addEventListener('click', () => editSabado(featured.id));
}

async function loadSabados() {
  try {
    renderFeaturedSabadoCard(await getAllSaturdays());
  } catch (error) {
    console.error('Erro ao carregar sábados:', error);
    showMessage(error.message || 'Erro ao carregar sábados', 'error');
  }
}

async function editSabado(sabadoId) {
  try {
    const sabados = await getAllSaturdays();
    const sabado = sabados.find((s) => s.id === sabadoId);
    if (sabado) openSabadoModal(sabado);
    else showMessage('Sábado não encontrado', 'error');
  } catch (error) {
    console.error('Erro ao editar:', error);
    showMessage('Erro ao carregar sábado', 'error');
  }
}

window.closeSabadoModal = closeSabadoModal;
window.editSabado = editSabado;
