# CLAUDE.md — Prolegado App

Este arquivo é lido automaticamente pelo Claude Code toda vez que você abre esta pasta.
Ele descreve o produto, as decisões tomadas, e como trabalhar neste projeto.

---

## O que é o Prolegado

Prolegado é uma plataforma mobile de desafios comportamentais com comunidade.
A missão é romper com a "Cultura do Depois" — o hábito de procrastinar e se conformar.
O app estrutura ambiente, sistema e disciplina para que pessoas voltem a confiar na própria palavra
e sustentem a constância como identidade e estilo de vida.

**Frase da marca**: "Faça Hoje!"
**Nome**: Prolegado = Próposito + Legado

**A Tríade (3 pilares — use sempre essa ordem e esses nomes exatos):**
1. Ambiente
2. Desenvolvimento
3. Evolução

> Atenção: documentos antigos podem usar "Físico" como 3º pilar. Está ERRADO e DESATUALIZADO.
> O pilar correto é EVOLUÇÃO.

---

## Stack técnico

- **Mobile**: React Native (iOS e Android)
- **Backend**: Supabase (banco de dados PostgreSQL, autenticação, Edge Functions)
- **Design system**: skill `prolegado-design-system` (leia antes de criar qualquer tela)

Antes de criar qualquer tela ou componente visual, leia a skill `prolegado-design-system`.
Ela define cores, fontes, espaçamento, ícones, símbolos, animações e tudo mais.

---

## Dois tipos de usuário

### 1. Participante
- Entra em desafios criados por outros
- Faz check-in diário
- Acumula PL Points
- Sobe de nível no app
- Posta no feed (público ou só no desafio)
- Assiste aulas na aba de Cursos

### 2. Criador
- Cria seus próprios desafios
- Define se o desafio é público ou privado (via link de convite)
- Pode adicionar conteúdo de aulas ao desafio (requer plano pago)
- Qualquer usuário pode criar desafios — não precisa pagar para isso

---

## Planos e monetização

| Plano | Preço | O que permite |
|---|---|---|
| **Gratuito** | R$0 | Participar de 1 desafio por vez, criar desafios ilimitados, acumular PL Points, ver próprios níveis |
| **Premium** | R$17,90/mês | Participar de até 3 desafios simultâneos, badge verificado no feed, XP bônus |
| **PR (máximo)** | A definir | Desafios ilimitados simultâneos, máximo de PL Points, recompensas físicas exclusivas |

> Nota: criadores que quiserem adicionar aulas/conteúdo aos seus desafios precisam de plano pago.
> O preço específico desse plano de criador ainda será definido.

---

## Sistema de gamificação — PL Points

### O que são PL Points
PL Points (Prolegado Points) são a moeda interna do app.
Não são pontos de um desafio específico — são pontos do APP como um todo,
que refletem o quanto a pessoa está engajada com o Prolegado ao longo do tempo.

### Como ganhar PL Points
| Ação | PL Points |
|---|---|
| Check-in diário em desafio | A definir |
| Streak de 7 dias consecutivos | Bônus multiplicador |
| Streak de 30 dias consecutivos | Bônus maior |
| Assistir aula completa | A definir |
| Postar no feed | A definir (limitado por dia) |
| Entrar em novo desafio | Bônus de estreia |
| Ter plano Premium ativo | Multiplicador de XP |

> Os valores exatos de PL Points por ação ainda serão definidos.
> Use "A definir" no código — não invente valores.

### Níveis do app (provisório — nomes podem mudar)
| Nível | Nome | 
|---|---|
| 1 | Iniciante |
| 2 | Ativo |
| 3 | Sem Pausa |
| 4 | Elite |
| 5 | Prolegado |

Cada nível tem uma barra de progresso visível no perfil do usuário.
Quem chega ao nível 5 "virou o Prolegado" — é o ponto máximo de engajamento.

### Recompensas reais
PL Points acumulados podem ser trocados por recompensas físicas e digitais
(ex: caneca Prolegado, aula em academia parceira, produtos da marca).
O catálogo de recompensas será definido futuramente.

---

## Sistema de check-in e streaks

### Lógica do check-in
- Check-in é feito 1 vez por dia dentro de um desafio
- O streak conta dias **consecutivos** de check-in
- Perder um dia **não apaga o histórico total** — apenas reseta o streak ativo
- O app deve celebrar o streak, nunca punir a quebra com linguagem negativa

### Modalidades de desafio (o criador escolhe ao criar)
| Modalidade | Como funciona |
|---|---|
| **Por dias** | Conta quantos dias consecutivos a pessoa fez check-in |
| **Por pontos** | Conta quantos pontos a pessoa acumulou dentro do desafio |

### Visualização de atividade (inspirado no GitHub)
No perfil do usuário, um calendário visual mostra os dias com check-in.
Dias com check-in = quadrado cheio na cor laranja `#fd6413`.
Dias sem check-in = quadrado vazio.
Isso torna a consistência **visível** — a pessoa vê o padrão da própria disciplina.

---

## Estrutura de navegação do app

### Abas na parte inferior (4 abas)
1. **Início** — feed da comunidade
2. **Desafios** — explorar, participar, criar
3. **Cursos** — área de membros com aulas
4. **Perfil** — dados pessoais, níveis, configurações

### Menu hambúrguer (ícone de 3 riscos no canto superior da tela)
Abre um painel lateral com:
- FAQ
- Suporte
- Informações gerais
- Configurações extras

> Importante: o menu hambúrguer NÃO fica nas abas de baixo.
> Ele fica no canto superior direito (ou esquerdo) do header de cada tela.

---

## Detalhamento de cada aba

### ABA 1 — Início (Feed)

O feed é o coração social do app. Exibe:
- Posts da comunidade (qualquer usuário pode postar)
- Atividade recente dos desafios que o usuário participa
- Ranking geral do app (PL Points)

**Posts no feed:**
Ao criar um post, o usuário escolhe a visibilidade:
- **Público**: aparece no feed geral, qualquer usuário do app vê
- **Só no desafio**: aparece apenas para quem está participando daquele desafio específico

**Badge verificado:**
Usuários com plano Premium têm um badge visível no feed (similar ao check azul do Instagram).
Esse badge sinaliza engajamento e compromisso com a plataforma.

---

### ABA 2 — Desafios

Tem 3 sub-seções:

**2a. Explorar**
- Lista de desafios públicos ativos
- Busca por nome, categoria, criador
- Filtros (duração, modalidade, número de participantes)

**2b. Meus Desafios**
- Desafios em que o usuário está participando
- Check-in diário feito aqui
- Progresso, streak, ranking dentro do desafio

**2c. Criar Desafio**
- Qualquer usuário pode criar (gratuito e pago)
- Campos: nome, descrição, duração, modalidade (dias ou pontos), imagem de capa
- Visibilidade: público ou privado (privado gera link de convite automático)
- Se privado: sistema gera link curto no formato `app.com/desafio/ABC123`
- Opção de adicionar aulas/conteúdo (requer plano de criador pago)

---

### ABA 3 — Cursos

Área de membros com conteúdo de desenvolvimento pessoal.
Criadores com plano adequado podem subir aulas em vídeo, texto, áudio.

O participante:
- Assiste aulas no próprio app
- Ganha PL Points por aula concluída
- Vê progresso do curso (% assistido, aulas concluídas)

Categorias de conteúdo possíveis: fitness, finanças, produtividade, mentalidade, hábitos.

---

### ABA 4 — Perfil

O perfil é onde a pessoa vê sua evolução no app.

Contém:
- Foto e nome do usuário
- Nível atual (ex: "Ativo") com barra de progresso até o próximo nível
- PL Points totais acumulados
- Calendário visual de check-ins (grid de quadradinhos por dia — inspirado no GitHub)
- Conquistas e badges desbloqueadas
- Streak atual e maior streak já registrado
- Desafios participados (histórico)
- Botão de editar perfil (nome, foto, bio)
- Seletor de tema (claro / escuro)
- Plano atual e opção de fazer upgrade

---

## Momentos de celebração (OBRIGATÓRIOS no app)

O app deve celebrar wins de forma expressiva. Nunca silenciosamente.

| Evento | Celebração |
|---|---|
| Check-in feito | Animação de confirmação + feedback háptico |
| Streak de 7 dias | Badge especial + confete laranja |
| Streak de 30 dias | Animação full-screen + notificação comemorativa |
| Novo nível desbloqueado | Tela inteira com símbolo da marca animado |
| Desafio concluído | Tela de parabéns com ranking final |
| Badge conquistada | Pop-up com símbolo da marca relevante |

A lógica é: **interface base calma e espaçada → celebrações expressivas e memoráveis**.
O contraste é intencional. A festa precisa merecer atenção.

---

## Regras de conteúdo e tom de voz

- **Sem emojis** em textos de UI, botões, headers ou mensagens do sistema
- **Português BR** em todo texto do app
- Tom **direto e motivacional**, nunca culpabilizador
- Se o usuário quebrou o streak, o app NÃO diz "Você falhou" — diz algo como "Novo começo. Bora?"
- Imperativas são bem-vindas: "Faça seu check-in", "Comece agora", "Veja seu progresso"

---

## O que ainda não está definido (não invente — pergunte)

- Valores exatos de PL Points por ação
- Preço do plano de criador com cursos
- Nomes finais dos níveis (os atuais são provisórios)
- Catálogo de recompensas físicas
- Categorias exatas dos cursos
- Telas de onboarding (primeiro acesso)

Se você precisar de qualquer uma dessas informações para completar uma tarefa,
**pergunte ao usuário** antes de inventar um valor.

---

## Por onde começar (primeira feature a construir)

**Sistema de check-in** — é o coração do produto.

Fluxo mínimo:
1. Usuário abre o app e vê o desafio ativo na aba Desafios
2. Toca em "Fazer check-in"
3. Confirmação com animação
4. Streak atualiza
5. PL Points adicionados
6. Feed atualiza com a atividade

Construa isso primeiro. Tudo o mais vem depois.

