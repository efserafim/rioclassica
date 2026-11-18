function formatSupabaseError(error) {
  const msg = error?.message || String(error);
  const code = error?.code || '';
  const status = error?.status || error?.statusCode;

  if (msg.includes('No suitable key') || msg.includes('wrong key type')) {
    return (
      'Chave Supabase inválida. Em Project Settings → API, use a chave anon (eyJ...) em supabase-config.js.'
    );
  }

  if (
    status === 404 ||
    code === 'PGRST205' ||
    msg.includes('Could not find the table') ||
    msg.includes('does not exist')
  ) {
    return 'Tabela não encontrada. Execute supabase/schema.sql no SQL Editor do Supabase.';
  }

  if (status === 401 || status === 403) {
    return (
      'Sem permissão (' +
      status +
      '). Faça login no admin, rode schema.sql e confira as políticas RLS (leitura pública, escrita authenticated).'
    );
  }

  if (
    msg.includes('row-level security') ||
    msg.includes('violates policy') ||
    msg.includes('new row violates')
  ) {
    return (
      'Storage sem permissão. No Supabase → SQL Editor, execute a seção Storage em supabase/schema.sql ' +
      '(bucket rioclassica + políticas INSERT/UPDATE/DELETE para authenticated). Depois faça login de novo no admin.'
    );
  }

  if (msg.includes('Bucket not found') || msg.includes('bucket_id')) {
    return 'Bucket "rioclassica" não encontrado. Execute supabase/schema.sql ou crie o bucket no painel Storage.';
  }

  if (msg.includes('already exists') || msg.includes('Duplicate') || code === '23505') {
    return 'Arquivo já existe no Storage. Salve de novo (será gerado outro nome) ou apague o arquivo antigo no painel Storage.';
  }

  if (status === 400 && msg.includes('mime')) {
    return 'Tipo de arquivo não permitido. Use JPG, PNG ou WebP.';
  }

  return msg;
}

window.formatSupabaseError = formatSupabaseError;
