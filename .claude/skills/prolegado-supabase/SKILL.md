---
name: prolegado-supabase
description: Use this skill whenever you write any code that touches the Prolegado database — queries, inserts, updates, Edge Functions, RLS policies, migrations, or any Supabase integration. Triggers on: "save to database", "fetch from supabase", "create table", "query", "insert checkin", "get user", "edge function", "migration", or anything involving data persistence. Always read this skill before writing any SQL or Supabase client code. Do NOT invent table or column names — everything is documented here.
---

# Prolegado — Schema do Supabase

**Project ID**: `fvrkjuxoxbfapkhyeouw`
**Região**: `sa-east-1` (São Paulo)
**Stack**: Supabase (PostgreSQL 17 + Auth + RLS + Edge Functions)

---

## Regras gerais (NUNCA violar)

1. **Nunca use nomes inventados** — todas as tabelas e colunas estão documentadas aqui. Se precisar de algo que não existe, crie uma migration e documente.
2. **Nunca delete registros** — use `deleted_at = NOW()` para soft delete. Exceção: `post_likes` e `user_badges` (podem ser deletados fisicamente).
3. **Sempre use `uuid_generate_v4()`** para IDs novos.
4. **RLS está ativo em todas as tabelas** — sempre teste as políticas ao criar queries.
5. **`updated_at` é automático** — triggers já cuidam disso, não precisa setar manualmente.
6. **Perfil é criado automaticamente** via trigger `on_auth_user_created` quando o usuário se cadastra.
7. **Código de convite é gerado automaticamente** via trigger `set_invite_code` em desafios privados.

---

## Tabelas

### `profiles`
Perfil do usuário. Extende `auth.users`. Criado automaticamente no cadastro.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | UUID PK | Mesmo ID do `auth.users` |
| `username` | TEXT UNIQUE | Nome de usuário único |
| `full_name` | TEXT | Nome completo |
| `avatar_url` | TEXT | URL da foto de perfil |
| `bio` | TEXT | Bio do usuário |
| `plan` | TEXT | `free` \| `premium` \| `pr` |
| `pl_points` | INTEGER | Prolegado Points totais acumulados |
| `level` | INTEGER | 1 a 5 (1=Iniciante → 5=Prolegado) |
| `current_streak` | INTEGER | Streak global ativo (dias consecutivos no app) |
| `longest_streak` | INTEGER | Maior streak já registrado |
| `theme` | TEXT | `light` \| `dark` |
| `is_verified` | BOOLEAN | Badge verificado (Premium) |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | Automático via trigger |
| `deleted_at` | TIMESTAMPTZ | Soft delete |

**Níveis (provisório — nomes podem mudar):**
- 1 = Iniciante
- 2 = Ativo
- 3 = Sem Pausa
- 4 = Elite
- 5 = Prolegado

---

### `challenges`
Desafios criados pelos usuários.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | UUID PK | |
| `creator_id` | UUID FK → profiles | Quem criou |
| `title` | TEXT | Nome do desafio |
| `description` | TEXT | Descrição |
| `cover_url` | TEXT | Imagem de capa |
| `modality` | TEXT | `days` \| `points` |
| `visibility` | TEXT | `public` \| `private` |
| `invite_code` | TEXT UNIQUE | Gerado automaticamente se privado. Ex: `ABC123` |
| `duration_days` | INTEGER | Duração em dias (padrão: 30) |
| `status` | TEXT | `draft` \| `active` \| `finished` \| `archived` |
| `participant_count` | INTEGER | Contador de participantes |
| `has_courses` | BOOLEAN | Se tem aulas vinculadas |
| `starts_at` | TIMESTAMPTZ | Início do desafio |
| `ends_at` | TIMESTAMPTZ | Fim do desafio |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | Automático |
| `deleted_at` | TIMESTAMPTZ | Soft delete |

**Link de convite**: `app.com/desafio/[invite_code]`

---

### `challenge_participants`
Quem está participando de qual desafio. UNIQUE(user_id, challenge_id) — evita duplicatas.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | UUID PK | |
| `user_id` | UUID FK → profiles | |
| `challenge_id` | UUID FK → challenges | |
| `status` | TEXT | `active` \| `abandoned` \| `completed` |
| `current_streak` | INTEGER | Streak NESTE desafio |
| `longest_streak` | INTEGER | Maior streak neste desafio |
| `total_checkins` | INTEGER | Total de check-ins neste desafio |
| `points_in_challenge` | INTEGER | Pontos NESTE desafio (≠ PL Points globais) |
| `joined_at` | TIMESTAMPTZ | Quando entrou |
| `completed_at` | TIMESTAMPTZ | Quando completou |
| `deleted_at` | TIMESTAMPTZ | Soft delete |

---

### `checkins`
Um check-in por usuário por desafio por dia. UNIQUE(user_id, challenge_id, checked_at).

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | UUID PK | |
| `user_id` | UUID FK → profiles | |
| `challenge_id` | UUID FK → challenges | |
| `note` | TEXT | Nota opcional (pode virar post no feed) |
| `pl_points_earned` | INTEGER | PL Points creditados por este check-in |
| `checked_at` | DATE | Data do check-in (um por dia) |
| `created_at` | TIMESTAMPTZ | |

**Como verificar se já fez check-in hoje:**
```sql
SELECT id FROM checkins
WHERE user_id = $1
  AND challenge_id = $2
  AND checked_at = CURRENT_DATE;
```

---

### `feed_posts`
Posts do feed da comunidade (aba Início).

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | UUID PK | |
| `user_id` | UUID FK → profiles | Autor |
| `challenge_id` | UUID FK → challenges | Desafio relacionado (opcional) |
| `checkin_id` | UUID FK → checkins | Se veio de um check-in |
| `content` | TEXT | Texto do post |
| `visibility` | TEXT | `public` \| `challenge_only` |
| `likes_count` | INTEGER | Contador de curtidas |
| `comments_count` | INTEGER | Contador de comentários |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | Automático |
| `deleted_at` | TIMESTAMPTZ | Soft delete |

---

### `post_likes`
Curtidas nos posts. UNIQUE(post_id, user_id).

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | UUID PK | |
| `post_id` | UUID FK → feed_posts | |
| `user_id` | UUID FK → profiles | |
| `created_at` | TIMESTAMPTZ | |

---

### `courses`
Cursos de desenvolvimento pessoal (aba Cursos).

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | UUID PK | |
| `creator_id` | UUID FK → profiles | |
| `challenge_id` | UUID FK → challenges | Se vinculado a um desafio (opcional) |
| `title` | TEXT | |
| `description` | TEXT | |
| `cover_url` | TEXT | |
| `category` | TEXT | Ex: fitness, finanças, hábitos, mentalidade |
| `is_free` | BOOLEAN | Se o acesso é gratuito |
| `lesson_count` | INTEGER | Contador de aulas |
| `status` | TEXT | `draft` \| `published` \| `archived` |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | Automático |
| `deleted_at` | TIMESTAMPTZ | Soft delete |

---

### `lessons`
Aulas dentro de um curso.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | UUID PK | |
| `course_id` | UUID FK → courses | |
| `title` | TEXT | |
| `description` | TEXT | |
| `content_url` | TEXT | URL do vídeo/áudio/texto |
| `content_type` | TEXT | `video` \| `text` \| `audio` |
| `duration_seconds` | INTEGER | Duração em segundos |
| `order_index` | INTEGER | Ordem dentro do curso |
| `pl_points_reward` | INTEGER | PL Points ganhos ao completar |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | Automático |
| `deleted_at` | TIMESTAMPTZ | Soft delete |

---

### `lesson_progress`
Progresso do usuário em cada aula. UNIQUE(user_id, lesson_id).

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | UUID PK | |
| `user_id` | UUID FK → profiles | |
| `lesson_id` | UUID FK → lessons | |
| `course_id` | UUID FK → courses | Redundante mas útil para queries |
| `completed` | BOOLEAN | Se concluiu |
| `pl_points_earned` | INTEGER | PL Points creditados |
| `completed_at` | TIMESTAMPTZ | Quando completou |
| `created_at` | TIMESTAMPTZ | |

---

### `badges`
Catálogo de conquistas do sistema. Já populado com badges iniciais.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | UUID PK | |
| `slug` | TEXT UNIQUE | Identificador único (ex: `streak_7`) |
| `name` | TEXT | Nome exibido ao usuário |
| `description` | TEXT | Descrição da conquista |
| `icon_name` | TEXT | Símbolo da marca a usar: `bandeira` \| `raio` \| `animador` \| `pose` \| `premio` \| `comunidade` \| `podio` |
| `condition_type` | TEXT | Tipo de condição para desbloquear |
| `condition_value` | INTEGER | Valor da condição |

**Badges iniciais disponíveis:**
- `first_checkin` — Primeiro check-in
- `streak_7` — 7 dias consecutivos
- `streak_30` — 30 dias consecutivos
- `streak_100` — 100 dias consecutivos
- `level_2` — Chegou ao nível Ativo
- `level_3` — Chegou ao nível Sem Pausa
- `level_5` — Chegou ao nível Prolegado
- `challenges_3` — 3 desafios simultâneos
- `community_10` — 10 posts no feed

---

### `user_badges`
Badges desbloqueadas por cada usuário. UNIQUE(user_id, badge_id).

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | UUID PK | |
| `user_id` | UUID FK → profiles | |
| `badge_id` | UUID FK → badges | |
| `earned_at` | TIMESTAMPTZ | Quando desbloqueou |

---

### `notifications`
Notificações in-app para o usuário.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | UUID PK | |
| `user_id` | UUID FK → profiles | |
| `type` | TEXT | `badge_earned` \| `streak_milestone` \| `level_up` \| `challenge_invite` \| `checkin_reminder` \| `general` |
| `title` | TEXT | Título da notificação |
| `body` | TEXT | Corpo da mensagem |
| `data` | JSONB | Dados extras (ex: badge_id, challenge_id) |
| `read` | BOOLEAN | Se o usuário já leu |
| `created_at` | TIMESTAMPTZ | |

---

## Funções automáticas (não recriar)

| Função | O que faz |
|---|---|
| `handle_new_user()` | Cria perfil automaticamente no cadastro |
| `handle_updated_at()` | Atualiza `updated_at` automaticamente |
| `generate_invite_code()` | Gera código de 6 letras para desafios privados |

---

## Exemplos de queries comuns

**Buscar perfil completo do usuário logado:**
```javascript
const { data } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.id)
  .single();
```

**Fazer check-in:**
```javascript
const { data, error } = await supabase
  .from('checkins')
  .insert({
    user_id: user.id,
    challenge_id: challengeId,
    pl_points_earned: 10
  });
// Se retornar erro de unique violation, o usuário já fez check-in hoje
```

**Buscar desafios públicos ativos:**
```javascript
const { data } = await supabase
  .from('challenges')
  .select('*, profiles(username, avatar_url, is_verified)')
  .eq('status', 'active')
  .eq('visibility', 'public')
  .order('participant_count', { ascending: false });
```

**Entrar em desafio privado via código:**
```javascript
const { data: challenge } = await supabase
  .from('challenges')
  .select('id')
  .eq('invite_code', code.toUpperCase())
  .single();
```

**Feed público:**
```javascript
const { data } = await supabase
  .from('feed_posts')
  .select('*, profiles(username, avatar_url, is_verified, level)')
  .eq('visibility', 'public')
  .is('deleted_at', null)
  .order('created_at', { ascending: false })
  .limit(20);
```

---

## Limites por plano

| Ação | free | premium | pr |
|---|---|---|---|
| Desafios simultâneos | 1 | 3 | ilimitado |
| Criar desafios | ilimitado | ilimitado | ilimitado |
| Badge verificado no feed | ✗ | ✓ | ✓ |
| Multiplicador de PL Points | 1x | 1.5x | 2x |

Valide o plano ANTES de permitir ações restritas:
```javascript
if (profile.plan === 'free' && activeChallengesCount >= 1) {
  // Mostrar upsell para Premium
}
```

---

## O que ainda não está definido (não invente)

- Valores exatos de PL Points por ação
- Thresholds de PL Points para subir de nível
- Preço do plano PR e do plano de criador com cursos
- Categorias exatas dos cursos
- Tabela de comments (comentários em posts) — ainda não criada

Se precisar de qualquer um desses valores, pergunte ao usuário.
