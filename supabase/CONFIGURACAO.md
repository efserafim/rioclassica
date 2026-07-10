# Rio Clássica — Supabase (login + banco + fotos)

Tudo em um só lugar: **Supabase**. Firebase foi removido.

## 1. Projeto Supabase

URL e chave em `js/config/supabase-config.js` (Settings → API).

## 2. Banco de dados

SQL Editor → executar `supabase/schema.sql`.

## 3. Storage

- Bucket: `rioclassica` (público)
- **Importante:** execute no SQL Editor a seção **Storage** no final de `supabase/schema.sql` (cria o bucket e as políticas RLS em `storage.objects`).
- Policies necessárias: `SELECT` público; `INSERT`, `UPDATE` e `DELETE` para `authenticated` (sem `UPDATE`, uploads com upsert falham com 400).

### Erro 400 ao enviar foto

1. Confirme login no admin (`/admin/login.html`).
2. Supabase → **SQL Editor** → rode só o bloco Storage de `schema.sql`.
3. Storage → bucket `rioclassica` → marque **Public bucket**.
4. Ctrl+F5 no dashboard e tente de novo; a mensagem de erro no painel deve indicar a causa (RLS, bucket ausente, etc.).

## 4. Login do admin

1. **Authentication → Providers** → ative **Email**
2. Para testes locais: desative **Confirm email** (opcional)
3. **Authentication → Users → Add user** → e-mail e senha do admin

Use esse e-mail/senha em `/admin/login.html`.

## 5. Estrutura do código

```
js/config/supabase-config.js   → URL + chave
js/core/                       → cliente Supabase
js/services/                   → sábados, roteiros, imagens
js/auth/auth.js                → login / logout
admin/login.html               → entrada
admin/dashboard.html           → painel
```

## 6. Testar

1. Site: http://localhost:8080/
2. Login: http://localhost:8080/admin/login.html
3. Salvar texto e enviar foto no dashboard

Se der erro 401: confira se está logado e se rodou `schema.sql`.
