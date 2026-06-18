// Conversão entre colunas Postgres (snake_case) e objetos do app (camelCase)

function normalizeImageUrl(url) {
  if (!url) return null;
  const trimmed = String(url).trim();
  if (/^(https?:|data:)/i.test(trimmed)) return trimmed;
  if (trimmed.startsWith('/')) return trimmed;
  return '/' + trimmed.replace(/^\.?\//, '');
}

function sabadoFromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    featured: row.featured,
    badge: row.badge,
    title: row.title,
    description: row.description,
    duration: row.duration,
    languages: row.languages,
    maxPeople: row.max_people,
    buttonText: row.button_text,
    note: row.note,
    whatsappLink: row.whatsapp_link,
    explanation: row.explanation,
    imageUrl: normalizeImageUrl(row.image_url),
    imageAlt: row.image_alt,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function sabadoToRow(data) {
  const row = {
    featured: !!data.featured,
    badge: data.badge ?? null,
    title: data.title ?? '',
    description: data.description ?? null,
    duration: data.duration ?? null,
    languages: data.languages ?? null,
    max_people: data.maxPeople ?? null,
    button_text: data.buttonText ?? null,
    note: data.note ?? null,
    whatsapp_link: data.whatsappLink ?? null,
    explanation: data.explanation ?? null,
    image_url: normalizeImageUrl(data.imageUrl),
    image_alt: data.imageAlt ?? null,
    updated_at: new Date().toISOString()
  };
  if (data.id) row.id = data.id;
  return row;
}

function roteiroFromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    duration: row.duration,
    languages: row.languages,
    whatsappLink: row.whatsapp_link,
    imageUrl: normalizeImageUrl(row.image_url),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function roteiroToRow(data) {
  const row = {
    title: data.title ?? '',
    subtitle: data.subtitle ?? null,
    description: data.description ?? null,
    duration: data.duration ?? null,
    languages: data.languages ?? null,
    whatsapp_link: data.whatsappLink ?? null,
    image_url: normalizeImageUrl(data.imageUrl),
    updated_at: new Date().toISOString()
  };
  if (data.id) row.id = data.id;
  return row;
}

window.normalizeImageUrl = normalizeImageUrl;
window.sabadoFromRow = sabadoFromRow;
window.sabadoToRow = sabadoToRow;
window.roteiroFromRow = roteiroFromRow;
window.roteiroToRow = roteiroToRow;
