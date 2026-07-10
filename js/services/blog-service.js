// Blog — CRUD dos posts (tabela blog_posts)

async function getBlogClient() {
  if (typeof aguardarSupabase === 'function') {
    return aguardarSupabase();
  }
  const client = window.supabaseClient;
  if (!client) throw new Error('Cliente Supabase não inicializado');
  return client;
}

function blogError(error, fallback) {
  console.error(fallback, error);
  const message =
    typeof formatSupabaseError === 'function'
      ? formatSupabaseError(error)
      : error?.message || fallback;
  return new Error(message);
}

async function getBlogPosts(publishedOnly = true) {
  const client = await getBlogClient();
  let query = client.from('blog_posts').select('*');
  if (publishedOnly) query = query.eq('published', true);
  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;
  if (error) throw blogError(error, 'Erro ao carregar posts');
  return data || [];
}

async function getBlogPostById(id) {
  const client = await getBlogClient();
  const { data, error } = await client
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw blogError(error, 'Erro ao carregar post');
  return data;
}

async function createBlogPost(postData) {
  const client = await getBlogClient();
  const { data, error } = await client
    .from('blog_posts')
    .insert([postData])
    .select()
    .single();

  if (error) throw blogError(error, 'Erro ao criar post');
  return data;
}

async function updateBlogPost(id, postData) {
  const client = await getBlogClient();
  const { data, error } = await client
    .from('blog_posts')
    .update(postData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw blogError(error, 'Erro ao atualizar post');
  return data;
}

async function deleteBlogPostFromDb(id) {
  const client = await getBlogClient();
  const { error } = await client.from('blog_posts').delete().eq('id', id);
  if (error) throw blogError(error, 'Erro ao deletar post');
}

window.getBlogPosts = getBlogPosts;
window.getBlogPostById = getBlogPostById;
window.createBlogPost = createBlogPost;
window.updateBlogPost = updateBlogPost;
window.deleteBlogPostFromDb = deleteBlogPostFromDb;
