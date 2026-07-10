// Conteúdo dinâmico do site (index) — Supabase + tempo real

(function () {
  const DEFAULT_WHATSAPP =
    'https://wa.me/21990234090?text=Olá%20Riocl%C3%A1ssica!%20Gostaria%20de%20saber%20qual%20é%20o%20tema%20da%20Experiência%20de%20Sábado%20da%20próxima%20semana.';

  let featuredChannel = null;

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text ?? '';
    return div.innerHTML;
  }

  function escapeAttr(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;');
  }

  function sanitizeActionLink(url, fallback = DEFAULT_WHATSAPP) {
    const trimmed = (url || '').trim();
    if (!/^https:\/\//i.test(trimmed)) return fallback;
    try {
      new URL(trimmed);
      return trimmed;
    } catch {
      return fallback;
    }
  }

  function sanitizeButtonLabel(text) {
    const label = (text || '').trim();
    if (!label || /^https?:\/\//i.test(label)) {
      return 'Reservar agora';
    }
    if (/descubra o tema/i.test(label)) {
      return 'Reservar agora';
    }
    return label;
  }

  let lastFeaturedSabado = null;

  function renderSaturdayCard(sabado) {
    const mount = document.getElementById('featured-saturday-mount');
    const explanationEl = document.getElementById('saturday-explanation-mount');
    if (!mount) return;

    if (sabado) lastFeaturedSabado = sabado;

    if (!sabado) {
      mount.innerHTML = `<p style="text-align:center;color:#6d5a47;padding:2rem;">${escapeHtml(typeof t === 'function' ? t('ui.loading') : 'Carregando conteúdo…')}</p>`;
      if (explanationEl) explanationEl.hidden = true;
      return;
    }

    const imageUrl = sabado.imageUrl || '';
    const imageAlt = sabado.imageAlt || sabado.title || 'Experiência de Sábado';
    const imageHtml = imageUrl
      ? `<div class="saturday-card-media"><img src="${escapeAttr(imageUrl)}" alt="${escapeHtml(imageAlt)}" class="saturday-card-photo"></div>`
      : '';

    const ctaLabel = sanitizeButtonLabel(sabado.buttonText);
    const ctaHref = sanitizeActionLink(sabado.whatsappLink);
    const noteText =
      sabado.note || '*Vagas estritamente limitadas - Confirme sua participação via WhatsApp';

    mount.innerHTML = `
      <div class="saturday-card featured">
        ${imageHtml}
        <div class="saturday-content">
          <span class="badge">${escapeHtml(sabado.badge || 'EVENTO SURPRESA')}</span>
          <h3>${escapeHtml(sabado.title || '')}</h3>
          <p class="saturday-description saturday-description--preview">${escapeHtml(sabado.description || '')}</p>
          <div class="saturday-details">
            <span class="detail-item">⏱️ ${escapeHtml(sabado.duration || '3h30min')}</span>
            <span class="detail-item">🌍 ${escapeHtml(sabado.languages || 'PT / EN / ES / FR')}</span>
            <span class="detail-item">👥 ${escapeHtml(sabado.maxPeople || 'Máx. 12 pessoas')}</span>
          </div>
          <div class="saturday-actions">
            <button type="button" class="btn btn-outline saturday-details-btn">${escapeHtml(typeof t === 'function' ? t('ui.viewDetails') : 'Ver detalhes')}</button>
            <a href="${escapeAttr(ctaHref)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-large saturday-cta-btn">
              ${escapeHtml(ctaLabel)}
            </a>
          </div>
        </div>
        <div class="saturday-modal-sources" hidden>
          <p class="saturday-note-source">${escapeHtml(noteText)}</p>
        </div>
      </div>
    `;

    if (explanationEl) {
      const text = (sabado.explanation || '').trim();
      if (text) {
        explanationEl.textContent = text;
        explanationEl.hidden = false;
      } else {
        explanationEl.textContent = '';
        explanationEl.hidden = true;
      }
    }
  }

  function initSaturdayDetailModal() {
    const mount = document.getElementById('featured-saturday-mount');
    const modal = document.getElementById('saturday-detail-modal');
    if (!mount || !modal || modal.dataset.bound === '1') return;

    const badgeEl = document.getElementById('saturday-modal-badge');
    const titleEl = document.getElementById('saturday-modal-title');
    const descEl = document.getElementById('saturday-modal-description');
    const metaEl = document.getElementById('saturday-modal-meta');
    const noteEl = document.getElementById('saturday-modal-note');
    const imageEl = document.getElementById('saturday-modal-image');
    const ctaEl = document.getElementById('saturday-modal-cta');

    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function openModalFromCard(card) {
      if (!card) return;

      const badge = card.querySelector('.badge')?.textContent?.trim() || '';
      const title = card.querySelector('h3')?.textContent?.trim() || '';
      const description = card.querySelector('.saturday-description')?.textContent?.trim() || '';
      const details = card.querySelectorAll('.saturday-details .detail-item');
      const note = card.querySelector('.saturday-note-source')?.textContent?.trim() || '';
      const imgSrc = card.querySelector('.saturday-card-photo')?.getAttribute('src') || '';
      const cta = card.querySelector('.saturday-cta-btn');

      if (badgeEl) {
        badgeEl.textContent = badge;
        badgeEl.hidden = !badge;
      }
      if (titleEl) titleEl.textContent = title;
      if (descEl) descEl.textContent = description;
      if (metaEl) {
        metaEl.innerHTML = '';
        details.forEach((item) => {
          const span = document.createElement('span');
          span.textContent = item.textContent?.trim() || '';
          metaEl.appendChild(span);
        });
        metaEl.hidden = details.length === 0;
      }
      if (noteEl) {
        noteEl.textContent = note;
        noteEl.hidden = !note;
      }
      if (imageEl) {
        if (imgSrc) {
          imageEl.src = imgSrc;
          imageEl.alt = title;
          imageEl.hidden = false;
        } else {
          imageEl.hidden = true;
          imageEl.removeAttribute('src');
        }
      }
      if (ctaEl && cta) {
        ctaEl.href = cta.getAttribute('href') || '#';
        ctaEl.textContent = cta.textContent?.trim() || 'Reservar agora';
      }

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      modal.querySelector('.roteiro-modal-close')?.focus();
    }

    mount.addEventListener('click', (e) => {
      const btn = e.target.closest('.saturday-details-btn');
      if (btn) openModalFromCard(btn.closest('.saturday-card'));
    });

    modal.querySelectorAll('[data-saturday-modal-close]').forEach((el) => {
      el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    modal.dataset.bound = '1';
  }

  function initRoteiroDetailModal() {
    const modal = document.getElementById('roteiro-detail-modal');
    if (!modal || modal.dataset.bound === '1') return;

    const titleEl = document.getElementById('roteiro-modal-title');
    const subtitleEl = document.getElementById('roteiro-modal-subtitle');
    const descEl = document.getElementById('roteiro-modal-description');
    const metaEl = document.getElementById('roteiro-modal-meta');
    const imageEl = document.getElementById('roteiro-modal-image');
    const reserveEl = document.getElementById('roteiro-modal-reserve');

    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function openModalFromCard(card) {
      if (!card) return;

      const title = card.querySelector('.roteiro-title')?.textContent?.trim() || '';
      const subtitle = card.querySelector('.roteiro-subtitle')?.textContent?.trim() || '';
      const description = card.querySelector('.roteiro-description')?.textContent?.trim() || '';
      const metaItems = card.querySelectorAll('.roteiro-meta .meta-item');
      const imgSrc = card.querySelector('.roteiro-image')?.getAttribute('src') || '';
      const reserveHref =
        card.querySelector('.roteiro-actions .btn-accent')?.getAttribute('href') || '#';

      if (titleEl) titleEl.textContent = title;
      if (subtitleEl) {
        subtitleEl.textContent = subtitle;
        subtitleEl.hidden = !subtitle;
      }
      if (descEl) descEl.textContent = description;
      if (metaEl) {
        metaEl.innerHTML = '';
        metaItems.forEach((item) => {
          const span = document.createElement('span');
          span.textContent = item.textContent?.trim() || '';
          metaEl.appendChild(span);
        });
        metaEl.hidden = metaItems.length === 0;
      }
      if (imageEl) {
        if (imgSrc) {
          imageEl.src = imgSrc;
          imageEl.alt = title;
          imageEl.hidden = false;
        } else {
          imageEl.hidden = true;
          imageEl.removeAttribute('src');
        }
      }
      if (reserveEl) {
        reserveEl.href = reserveHref;
        reserveEl.textContent = 'Reservar agora';
      }

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      modal.querySelector('.roteiro-modal-close')?.focus();
    }

    document.querySelectorAll('.roteiro-details-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        openModalFromCard(btn.closest('.roteiro-card'));
      });
    });

    modal.querySelectorAll('[data-roteiro-modal-close]').forEach((el) => {
      el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    modal.dataset.bound = '1';
  }

  async function applyRoteiros() {
    if (typeof getAllRoteiros !== 'function') return;

    const roteiros = await getAllRoteiros();
    if (!roteiros.length) return;

    const cards = [
      { title: 'card-a-title', subtitle: 'card-a-subtitle', desc: 'card-a-desc', duration: 'duration', languages: 'languages', btn: 'request-btn' },
      { title: 'card-b-title', subtitle: 'card-b-subtitle', desc: 'card-b-desc', duration: 'b-duration', languages: 'b-languages', btn: 'request-btn-b' },
      { title: 'card-c-title', subtitle: 'card-c-subtitle', desc: 'card-c-desc', duration: 'c-duration', languages: 'c-languages', btn: 'request-btn-c' },
      { title: 'card-d-title', subtitle: 'card-d-subtitle', desc: 'card-d-desc', duration: 'd-duration', languages: 'd-languages', btn: 'request-btn-d' }
    ];

    const cardEls = document.querySelectorAll('.roteiro-card');

    cards.forEach((ids, i) => {
      const roteiro = roteiros[i];
      if (!roteiro) return;

      const set = (id, text) => {
        const el = document.getElementById(id);
        if (el && text != null) el.textContent = text;
      };

      set(ids.title, roteiro.title);
      set(ids.subtitle, roteiro.subtitle);
      set(ids.desc, roteiro.description);
      set(ids.duration, `⏱️ ${roteiro.duration || '3h a 4h'}`);
      set(ids.languages, `🌍 ${roteiro.languages || 'PT / EN / ES / FR'}`);

      const btn = document.getElementById(ids.btn);
      if (btn && roteiro.whatsappLink?.trim()) {
        const link = sanitizeActionLink(roteiro.whatsappLink, '');
        if (link) btn.href = link;
      }

      if (cardEls[i] && roteiro.imageUrl) {
        const img = cardEls[i].querySelector('.roteiro-image');
        if (img) {
          img.src = roteiro.imageUrl;
          img.alt = roteiro.title || '';
        }
      }
    });
  }

  function subscribeFeaturedSaturday() {
    const docId = window.FEATURED_SABADO_ID || 'featured-sabado';
    const client = window.supabasePublic;
    if (!client) return;

    if (featuredChannel) {
      client.removeChannel(featuredChannel);
      featuredChannel = null;
    }

    featuredChannel = client
      .channel('featured-sabado-live')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sabados', filter: `id=eq.${docId}` },
        async () => {
          renderSaturdayCard(await getFeaturedSaturday());
        }
      )
      .subscribe();
  }

  function mountError(error) {
    const mount = document.getElementById('featured-saturday-mount');
    if (!mount) return;
    mount.innerHTML = `<p style="text-align:center;color:#c33;padding:2rem;">Erro ao carregar: ${escapeHtml(error.message)}. Verifique supabase-config.js e o SQL em supabase/schema.sql.</p>`;
  }

  async function init() {
    try {
      await aguardarSupabase();
      if (!window.supabasePublic) initSupabaseClients();
      renderSaturdayCard(await getFeaturedSaturday());
      subscribeFeaturedSaturday();
      await applyRoteiros();
    } catch (error) {
      console.error('[Rioclássica] Falha ao iniciar:', error);
      mountError(error);
    } finally {
      initRoteiroDetailModal();
      initSaturdayDetailModal();
    }
  }

  window.rioClassicaRefreshSite = async function () {
    renderSaturdayCard(await getFeaturedSaturday());
    await applyRoteiros();
    initRoteiroDetailModal();
    initSaturdayDetailModal();
  };

  window.addEventListener('langchange', () => {
    if (lastFeaturedSabado) renderSaturdayCard(lastFeaturedSabado);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
