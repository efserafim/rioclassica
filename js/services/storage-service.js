function sanitizeStorageFileName(name) {
  const base = (name || 'imagem').split(/[/\\]/).pop();
  const extMatch = base.match(/(\.[a-zA-Z0-9]{1,8})$/);
  const ext = extMatch ? extMatch[1].toLowerCase() : '';
  const stem = ext ? base.slice(0, -ext.length) : base;
  const safeStem = stem
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, 80);
  return (safeStem || 'imagem') + (ext || '.jpg');
}

async function uploadImage(file, storagePath) {
  await window.aguardarAuth();

  const { data: { session } } = await window.supabaseClient.auth.getSession();
  if (!session) {
    throw new Error('Faça login para enviar imagens.');
  }

  const client = window.supabaseClient;
  const parts = storagePath.split('/');
  const folder = parts.slice(0, -1).join('/');
  const fileName = sanitizeStorageFileName(parts[parts.length - 1]);
  const path = folder ? `${folder}/${fileName}` : fileName;

  const { error } = await client.storage.from(window.STORAGE_BUCKET).upload(path, file, {
    upsert: false,
    cacheControl: '3600',
    contentType: file.type || 'image/jpeg'
  });

  if (error) {
    console.error('Storage upload:', path, error);
    const msg =
      typeof formatSupabaseError === 'function'
        ? formatSupabaseError(error)
        : error.message || 'Erro no upload';
    throw new Error(msg);
  }

  const { data } = client.storage.from(window.STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function getStoragePathFromPublicUrl(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') return null;

  const bucket = window.STORAGE_BUCKET || 'rioclassica';
  try {
    const url = new URL(imageUrl, window.location.origin);
    const marker = `/object/public/${bucket}/`;
    const idx = url.pathname.indexOf(marker);
    if (idx !== -1) {
      return decodeURIComponent(url.pathname.slice(idx + marker.length));
    }
  } catch {
    const legacy = imageUrl.match(new RegExp(`/object/public/${bucket}/(.+)$`));
    if (legacy) return decodeURIComponent(legacy[1]);
  }

  return null;
}

function isSupabaseStorageUrl(imageUrl) {
  return !!getStoragePathFromPublicUrl(imageUrl);
}

async function deleteImageFromStorage(imageUrl) {
  const path = getStoragePathFromPublicUrl(imageUrl);
  if (!path) return false;

  await window.aguardarAuth();
  const { data: { session } } = await window.supabaseClient.auth.getSession();
  if (!session) {
    throw new Error('Faça login para remover imagens do Storage.');
  }

  const { error } = await window.supabaseClient.storage.from(window.STORAGE_BUCKET).remove([path]);
  if (error) throw error;
  return true;
}

window.uploadImage = uploadImage;
window.getStoragePathFromPublicUrl = getStoragePathFromPublicUrl;
window.isSupabaseStorageUrl = isSupabaseStorageUrl;
window.deleteImageFromStorage = deleteImageFromStorage;
