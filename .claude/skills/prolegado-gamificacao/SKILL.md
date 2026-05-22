---
name: prolegado-gamificacao
description: Use this skill whenever you implement anything related to points, levels, streaks, badges, rewards, celebrations, or rankings in the Prolegado app. Triggers on: "PL Points", "nível", "streak", "badge", "conquista", "ranking", "gamificação", "celebração", "recompensa", "progressão", or any feature involving the points and progression system. Always read this skill before implementing any gamification logic. Do NOT invent point values, level thresholds, or badge conditions — everything is defined here.
---

# Prolegado — Sistema de Gamificação

---

## PL Points (Prolegado Points)

PL Points são a moeda interna do app. Acumulam ao longo de toda a vida do usuário no app — não resetam, não expiram, só crescem.

**Importante:** PL Points são GLOBAIS (do app inteiro). São diferentes dos pontos dentro de um desafio específico (coluna `points_in_challenge` na tabela `challenge_participants`).

---

## Tabela de pontos por ação

| Ação | PL Points | Observação |
|---|---|---|
| Check-in diário | **20 PL** | Ação principal — vale mais que tudo |
| Assistir aula completa | **15 PL** | Por aula, não por curso |
| Postar no feed | **5 PL** | Máximo 3 posts por dia (15 PL/dia) |
| Entrar em novo desafio | **10 PL** | Bônus de estreia, uma vez por desafio |
| Completar desafio | **50 PL** | Bônus ao concluir o desafio inteiro |
| Bônus streak 7 dias | **30 PL** | Uma vez ao atingir 7 dias consecutivos |
| Bônus streak 30 dias | **100 PL** | Uma vez ao atingir 30 dias consecutivos |
| Bônus streak 100 dias | **300 PL** | Uma vez ao atingir 100 dias consecutivos |
| Multiplicador Premium | **1.5x** | Aplica em TODAS as ações acima |
| Multiplicador PR | **2x** | Aplica em TODAS as ações acima |

**Exemplo prático:** usuário Premium faz check-in = 20 × 1.5 = 30 PL Points.

---

## Níveis

Ritmo: **fácil e rápido** — usuário constante chega ao nível 5 em 3 a 6 meses.
Referência: usuário fazendo check-in diário + 1 aula por semana + posts ocasionais.

| Nível | Nome | PL Points necessários (acumulados) | Estimativa com uso constante |
|---|---|---|---|
| 1 | **Iniciante** | 0 — 499 | Primeiras semanas |
| 2 | **Ativo** | 500 — 1.999 | ~1 mês |
| 3 | **Sem Pausa** | 2.000 — 5.999 | ~2-3 meses |
| 4 | **Elite** | 6.000 — 14.999 | ~4-5 meses |
| 5 | **Prolegado** | 15.000+ | ~6 meses |

> Nomes dos níveis são provisórios — podem ser atualizados sem mudar os thresholds.

**Como calcular o nível atual:**
```javascript
function calcularNivel(plPoints) {
  if (plPoints >= 15000) return 5;
  if (plPoints >= 6000) return 4;
  if (plPoints >= 2000) return 3;
  if (plPoints >= 500) return 2;
  return 1;
}
```

**Como calcular progresso dentro do nível:**
```javascript
const thresholds = [0, 500, 2000, 6000, 15000];

function calcularProgresso(plPoints, nivel) {
  if (nivel === 5) return 1; // nível máximo, barra cheia
  const inicio = thresholds[nivel - 1];
  const fim = thresholds[nivel];
  return (plPoints - inicio) / (fim - inicio); // 0 a 1
}
```

---

## Streaks

### Definição
Streak = dias **consecutivos** com pelo menos 1 check-in em qualquer desafio ativo.

### Regras
- Conta por **dia de calendário** (meia-noite a meia-noite, fuso do usuário)
- Perder um dia **reseta o streak atual** para 0 — mas o `longest_streak` é preservado
- O app **nunca pune** a quebra com linguagem negativa — veja `prolegado-tom-de-voz`
- Bônus de PL Points nos marcos são creditados **uma única vez** por marco
- Se o usuário já atingiu streak 30 antes, bateu 0 e voltou a 30 — recebe o bônus de novo

### Campos no banco
- `profiles.current_streak` — streak global ativo
- `profiles.longest_streak` — maior streak já registrado
- `challenge_participants.current_streak` — streak dentro de um desafio específico
- `challenge_participants.longest_streak` — maior streak naquele desafio

### Lógica de atualização após check-in
```javascript
// Após inserir o check-in com sucesso:
// 1. Verificar se o check-in de ontem existe
// 2. Se sim: incrementar streak
// 3. Se não: resetar streak para 1
// 4. Atualizar longest_streak se current > longest
// 5. Verificar se bateu marco (7, 30, 100) e creditar bônus

async function atualizarStreak(userId, challengeId) {
  const ontem = new Date();
  ontem.setDate(ontem.getDate() - 1);
  
  const { data: checkinOntem } = await supabase
    .from('checkins')
    .select('id')
    .eq('user_id', userId)
    .eq('checked_at', ontem.toISOString().split('T')[0])
    .single();

  const novoStreak = checkinOntem ? profile.current_streak + 1 : 1;
  const novoLongest = Math.max(novoStreak, profile.longest_streak);

  await supabase
    .from('profiles')
    .update({
      current_streak: novoStreak,
      longest_streak: novoLongest
    })
    .eq('id', userId);

  // Verificar marcos
  const marcos = [7, 30, 100];
  if (marcos.includes(novoStreak)) {
    await creditarBonusStreak(userId, novoStreak);
  }
}
```

---

## Badges

### Sistema
Badges são desbloqueadas automaticamente quando a condição é atingida.
O catálogo completo está na tabela `badges` no banco — não hardcode badges no frontend.

### Badges iniciais (já no banco)

| Slug | Nome | Condição | Símbolo da marca |
|---|---|---|---|
| `first_checkin` | Primeiro Passo | 1 check-in | bandeira |
| `streak_7` | Semana Inteira | Streak de 7 dias | raio |
| `streak_30` | Mês Completo | Streak de 30 dias | raio |
| `streak_100` | 100 Dias | Streak de 100 dias | raio |
| `level_2` | Ficando Ativo | Chegou ao nível 2 | pose |
| `level_3` | Sem Pausa | Chegou ao nível 3 | pose |
| `level_5` | Virou Prolegado | Chegou ao nível 5 | premio |
| `challenges_3` | Multitarefa | 3 desafios simultâneos | comunidade |
| `community_10` | Voz da Comunidade | 10 posts no feed | animador |

### Quando verificar badges
Verificar após cada ação relevante:
- Após check-in → verificar `first_checkin`, `streak_7`, `streak_30`, `streak_100`
- Após subir de nível → verificar `level_2`, `level_3`, `level_5`
- Após entrar em desafio → verificar `challenges_3`
- Após postar no feed → verificar `community_10`

### Como desbloquear badge
```javascript
async function verificarEDesbloquearBadge(userId, badgeSlug) {
  // Verificar se já tem essa badge
  const { data: jatem } = await supabase
    .from('user_badges')
    .select('id')
    .eq('user_id', userId)
    .eq('badge_id', /* id da badge pelo slug */)
    .single();

  if (jatem) return; // já tem, não faz nada

  // Inserir badge
  await supabase
    .from('user_badges')
    .insert({ user_id: userId, badge_id: badgeId });

  // Criar notificação
  await supabase
    .from('notifications')
    .insert({
      user_id: userId,
      type: 'badge_earned',
      title: 'Nova conquista',
      body: `Você desbloqueou: ${badge.name}.`,
      data: { badge_slug: badgeSlug }
    });

  // Disparar celebração na UI
  triggerBadgeCelebration(badge);
}
```

---

## Celebrações (UI)

A interface base é calma. As celebrações são expressivas e memoráveis.
Cada evento tem uma celebração específica — nunca omitir.

| Evento | Celebração na UI |
|---|---|
| Check-in feito | Botão escala para 1.1x com spring, depois volta. Texto muda para "Bora! Check-in confirmado." + PL Points aparecem voando (+20 PL) |
| Streak de 7 dias | Badge animada aparece no centro da tela com símbolo Raio + confete laranja por 2s |
| Streak de 30 dias | Tela inteira em laranja por 1s + símbolo Raio grande animado + texto "30 dias seguidos. A constância virou sua identidade." |
| Streak de 100 dias | Mesmo que 30 dias + haptic feedback intenso + notificação push |
| Novo nível | Tela inteira com símbolo da marca correspondente ao nível animado + nome do nível aparece em Parabolica Bold grande |
| Badge desbloqueada | Modal flutuante na parte inferior da tela com ícone da badge + nome + "Conquista desbloqueada" |
| Desafio concluído | Tela de parabéns fullscreen com ranking final + PL Points ganhos |

### Animações obrigatórias
- Todos os botões: `scale(0.97)` no press, 100ms `ease-out`
- Celebrações de streak/nível: usar `--ease-spring` (cubic-bezier(0.34, 1.56, 0.64, 1))
- Confete: partículas na cor `--prolegado-criatividade` (#fd6413)
- Duração das celebrações: 2-4 segundos, depois some sozinho

---

## Ranking

### Ranking global (aba Início)
- Ordenado por `pl_points DESC` na tabela `profiles`
- Exibe: posição, avatar, username, nível, PL Points
- Top 3 usa símbolo `podio` da marca
- Posição 1: símbolo laranja, opacidade 100%
- Posição 2: símbolo laranja, opacidade 70%
- Posição 3: símbolo laranja, opacidade 50%
- Posição do usuário logado sempre visível (mesmo se não estiver no top)

### Ranking do desafio (ChallengeDetailScreen e ChallengeProgressScreen)
- Ordenado por `points_in_challenge DESC` ou por `current_streak DESC` (dependendo da modalidade)
- Modalidade `days` → ordenar por `current_streak`
- Modalidade `points` → ordenar por `points_in_challenge`

---

## Limites por plano

| Ação | free | premium | pr |
|---|---|---|---|
| Desafios simultâneos | 1 | 3 | ilimitado |
| Multiplicador de PL Points | 1x | 1.5x | 2x |
| Badge verificado no feed | não | sim | sim |

### Como verificar limite antes de entrar em desafio
```javascript
async function verificarLimiteDesafios(userId, plano) {
  const { count } = await supabase
    .from('challenge_participants')
    .select('id', { count: 'exact' })
    .eq('user_id', userId)
    .eq('status', 'active');

  const limites = { free: 1, premium: 3, pr: Infinity };
  
  if (count >= limites[plano]) {
    // Mostrar modal de upsell — nunca navegar para fora do app
    mostrarUpsell(plano);
    return false;
  }
  return true;
}
```

---

## Fluxo completo de um check-in

Este é o fluxo que o código deve seguir toda vez que o usuário faz check-in:

```
1. Verificar se já fez check-in hoje neste desafio
   → Se sim: mostrar "Você já fez o check-in de hoje. Volta amanhã."
   → Se não: continuar

2. Inserir na tabela checkins
   → user_id, challenge_id, checked_at = hoje, pl_points_earned

3. Calcular PL Points
   → base = 20
   → multiplicador = plano do usuário (1x / 1.5x / 2x)
   → total = base × multiplicador

4. Creditar PL Points no perfil
   → UPDATE profiles SET pl_points = pl_points + total WHERE id = user_id

5. Verificar se subiu de nível
   → Calcular nível antes e depois
   → Se mudou: disparar celebração de nível + criar notificação

6. Atualizar streak
   → Verificar check-in de ontem
   → Incrementar ou resetar current_streak
   → Atualizar longest_streak se necessário
   → Verificar marcos (7, 30, 100 dias) e creditar bônus

7. Atualizar challenge_participants
   → Incrementar total_checkins
   → Atualizar current_streak e longest_streak do desafio
   → Incrementar points_in_challenge (mesmo valor do PL Points)

8. Verificar badges
   → first_checkin, streak_7, streak_30, streak_100

9. Disparar celebração na UI
   → Animação do botão
   → Mostrar PL Points ganhos
   → Se streak marco: celebração especial

10. Opcional: oferecer postar no feed
    → "Quer compartilhar com a comunidade?"
```

---

## O que não está definido ainda (não inventar)

- Catálogo de recompensas físicas e digitais (canecas, aulas em academia, etc.)
- Preço e mecânica de resgate de recompensas
- Novas badges além das 9 iniciais
- Sistema de comentários em posts (tabela ainda não criada)
- Notificações push externas (só in-app por enquanto)

Se precisar de qualquer um desses, perguntar ao usuário antes de implementar.
