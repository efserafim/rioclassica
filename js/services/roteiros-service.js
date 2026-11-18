async function getAllRoteiros() {
  const client = await aguardarSupabase();
  const { data, error } = await client
    .from('roteiros')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(formatSupabaseError(error));
  return (data || []).map(roteiroFromRow);
}

async function saveRoteiro(roteiroData) {
  const client = window.supabaseClient;
  const payload = roteiroToRow(roteiroData);

  if (roteiroData.id) {
    const { error } = await client.from('roteiros').upsert(payload, { onConflict: 'id' });
    if (error) throw new Error(formatSupabaseError(error));
    return roteiroData.id;
  }

  delete payload.id;
  payload.created_at = new Date().toISOString();
  const { data, error } = await client.from('roteiros').insert(payload).select('id').single();
  if (error) throw new Error(formatSupabaseError(error));
  return data.id;
}

async function deleteRoteiro(roteiroId) {
  const client = window.supabaseClient;
  const { error } = await client.from('roteiros').delete().eq('id', roteiroId);
  if (error) throw new Error(formatSupabaseError(error));
}

window.getAllRoteiros = getAllRoteiros;
window.saveRoteiro = saveRoteiro;
window.deleteRoteiro = deleteRoteiro;
