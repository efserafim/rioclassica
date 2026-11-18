const FEATURED_SABADO_ID = 'featured-sabado';

const DEFAULT_FEATURED_SABADO = {
  featured: true,
  badge: 'EVENTO SURPRESA',
  title: 'Qual será o tema deste Sábado?',
  description:
    'A cada semana, Rioclássica revela um novo tema: desde o Centro do Rio Imperial até confeitarias históricas da belle époque, igrejas barrocas ou encontros literários. Descubra qual será a próxima experiência!',
  duration: 'Aproximadamente 3h30min',
  languages: 'PT / EN / ES / FR',
  maxPeople: 'Máx. 12 pessoas',
  buttonText: 'Reservar agora',
  note: '*Vagas estritamente limitadas - Confirme sua participação via WhatsApp',
  whatsappLink:
    'https://wa.me/21990234090?text=Olá%20Riocl%C3%A1ssica!%20Gostaria%20de%20saber%20qual%20é%20o%20tema%20da%20Experiência%20de%20Sábado%20da%20próxima%20semana.',
  imageUrl: '/assets/image/Paço_Imperial_-_Rio_de_Janeiro_-_20220826172010.jpg',
  imageAlt: 'Paço Imperial - Rio de Janeiro',
  explanation:
    'Cada sábado é uma surpresa! Rioclássica revela um roteiro inédito selecionado para proporcionar uma experiência única e memorável.'
};

async function fetchSaturdaysFromSupabase(client) {
  const { data, error } = await client
    .from('sabados')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(formatSupabaseError(error));
  return (data || []).map(sabadoFromRow);
}

async function getAllSaturdays() {
  const client = await aguardarSupabase();
  return fetchSaturdaysFromSupabase(client);
}

async function getFeaturedSaturday() {
  const client = await aguardarSupabase();

  const { data, error } = await client
    .from('sabados')
    .select('*')
    .eq('id', FEATURED_SABADO_ID)
    .maybeSingle();

  if (error) throw new Error(formatSupabaseError(error));
  if (data) return sabadoFromRow(data);

  const { data: featuredList, error: featuredError } = await client
    .from('sabados')
    .select('*')
    .eq('featured', true)
    .limit(1);

  if (featuredError) throw new Error(formatSupabaseError(featuredError));
  if (featuredList?.[0]) return sabadoFromRow(featuredList[0]);

  const all = await fetchSaturdaysFromSupabase(client);
  return all[0] || null;
}

async function ensureFeaturedDocExists() {
  const { data: { session } } = await window.supabaseClient.auth.getSession();
  if (!session) return;

  const client = window.supabaseClient;
  const { data } = await client
    .from('sabados')
    .select('id')
    .eq('id', FEATURED_SABADO_ID)
    .maybeSingle();

  if (data) return;

  const row = sabadoToRow({
    ...DEFAULT_FEATURED_SABADO,
    id: FEATURED_SABADO_ID,
    featured: true
  });
  row.created_at = new Date().toISOString();

  const { error } = await client.from('sabados').insert(row);
  if (error) throw new Error(formatSupabaseError(error));
}

async function saveSaturday(saturdayData) {
  const client = window.supabaseClient;

  const isFeatured = saturdayData.featured === true || saturdayData.id === FEATURED_SABADO_ID;
  const docId = isFeatured ? FEATURED_SABADO_ID : saturdayData.id;

  const payload = sabadoToRow({
    ...saturdayData,
    id: docId,
    featured: isFeatured
  });

  if (docId) {
    const { error } = await client.from('sabados').upsert(payload, { onConflict: 'id' });
    if (error) throw new Error(formatSupabaseError(error));
    return docId;
  }

  delete payload.id;
  payload.created_at = new Date().toISOString();
  const { data, error } = await client.from('sabados').insert(payload).select('id').single();
  if (error) throw new Error(formatSupabaseError(error));
  return data.id;
}

async function deleteSaturday(saturdayId) {
  if (saturdayId === FEATURED_SABADO_ID) {
    throw new Error('Não é possível excluir o card em destaque.');
  }
  const client = window.supabaseClient;
  const { error } = await client.from('sabados').delete().eq('id', saturdayId);
  if (error) throw new Error(formatSupabaseError(error));
}

window.FEATURED_SABADO_ID = FEATURED_SABADO_ID;
window.getAllSaturdays = getAllSaturdays;
window.getFeaturedSaturday = getFeaturedSaturday;
window.ensureFeaturedDocExists = ensureFeaturedDocExists;
window.saveSaturday = saveSaturday;
window.deleteSaturday = deleteSaturday;
