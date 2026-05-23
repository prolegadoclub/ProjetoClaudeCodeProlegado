# CLAUDE.md — Briefing do Projeto Prolegado

Este arquivo é lido automaticamente pelo Claude Code toda vez que ele abre esta pasta.
Ele descreve O QUE é o Prolegado, como o produto funciona, e o que precisa ser construído.

Para regras visuais (cores, fontes, componentes), consulte a skill:
`.claude/skills/prolegado-design-system/SKILL.md`

---

## O que é o Prolegado

O Prolegado é uma plataforma mobile (iOS e Android) de desafios comportamentais com comunidade.
A missão é combater a "Cultura do Depois" — o adiamento e o conformismo — estruturando
ambiente, sistema e disciplina para que pessoas sustentem a constância como identidade.

**Nome**: Prolegado = Próposito + Legado
**Grito de guerra**: "Faça Hoje!"
**Tríade de pilares**: Ambiente → Desenvolvimento → Evolução

---

## Stack técnico

- **Mobile**: React Native (iOS + Android)
- **Backend**: Supabase (banco de dados PostgreSQL, autenticação, edge functions, storage)
- **Links de convite**: formato curto `app.prolegado.com/desafio/ABC123`
- **Design system**: ver skill `prolegado-design-system`

---

## Tipos de usuário

### Participante
- Entra em desafios (públicos ou via convite)
- Faz check-in diário nos desafios em que está
- Publica posts no feed (público ou só no desafio)
- Acumula XP do app (não do desafio — do app em si)
- Troca XP por recompensas reais (produtos Prolegado, parceiros)
- Pode ter badge de verificado se tiver plano premium (R$17,90/mês)

### Criador
- Cria e gerencia desafios
- Define se o desafio é público ou privado (convite por link)
- Pode adicionar aulas e conteúdo (área de cursos) se tiver plano que inclua isso
- Paga plano premium (R$17,90/mês) para desbloquear funcionalidades avançadas de criação
- O plano premium é voltado principalmente ao criador — é o que desbloqueia poder de criação
  e funcionalidades completas do app

> Um usuário pode ser participante e criador ao mesmo tempo.

---

## Monetização

| Plano | Preço | Para quem | O que desbloqueia |
|---|---|---|---|
| Gratuito | R$0 | Todos | Participar de desafios, feed básico, perfil |
| Premium | R$17,90/mês | Criadores e usuários engajados | Criar desafios com recursos avançados, área de cursos, badge verificado no feed |

> ⚠️ O preço correto é R$17,90/mês. NUNCA escreva R$47, R$97 ou qualquer outro valor.
> Qualquer tela, e-mail, ou copy que mencione preço deve usar R$17,90.

---

## Estrutura de navegação do app

### Aba 1 — Início (Feed)
Feed social da comunidade Prolegado.

**O que aparece:**
- Posts de outros usuários (de desafios, conquistas, check-ins compartilhados)
- Ranking geral de XP do app
- Atividade recente da comunidade

**Regras de post:**
- Ao fazer check-in ou conquista, o usuário pode escolher:
  - Postar **publicamente** no feed geral (visível pra todos)
  - Postar **somente no feed do desafio** (visível só pra quem está naquele desafio)
- Usuário com plano premium tem **badge verificado** no perfil (estilo "chequinha") —
  sinaliza engajamento e credibilidade na comunidade, não apenas pagamento

---

### Aba 2 — Desafios
Três sub-funções dentro desta aba:

**2a. Explorar**
- Pesquisar e descobrir desafios públicos que estão acontecendo
- Filtros por categoria (fitness, desenvolvimento, leitura, financeiro, etc.)
- Entrar num desafio público com um toque

**2b. Meus Desafios**
- Desafios em que o usuário está participando
- Fazer check-in do dia
- Ver progresso, histórico, ranking interno do desafio

**2c. Criar Desafio** (requer plano premium)
- Nome, descrição, duração, categoria
- Visibilidade: **Público** (qualquer um entra) ou **Privado** (somente via link de convite)
- Se privado: gerar link curto `app.prolegado.com/desafio/ABC123`
- Opção de adicionar aulas/conteúdo ao desafio (requer plano com área de cursos)

---

### Aba 3 — Cursos
Área de membros para conteúdo de desenvolvimento pessoal.

- Criadores podem subir aulas em vídeo, textos, materiais
- Participantes acompanham as aulas dentro do desafio ou como conteúdo avulso
- Funcionalidade disponível apenas para criadores com plano que inclui cursos
- Categorias: desenvolvimento pessoal, saúde, produtividade, finanças, etc.

---

### Menu (ícone "sanduíche" / hamburguer)
Acessível pelo header ou aba lateral. Contém:
- FAQ e Central de Ajuda
- Suporte / Fale Conosco
- Termos de uso e Política de privacidade
- Sobre o Prolegado
- Sair da conta

---

### Perfil
- Editar dados pessoais (nome, foto, bio)
- Ver XP acumulado e progresso de recompensas
- Escolher tema do app: **claro** (padrão) ou **escuro**
- Gerenciar plano (assinar, cancelar, ver benefícios)
- Ver conquistas e badges desbloqueados
- Histórico de desafios concluídos

---

## Sistema de XP e Recompensas

O XP é do **app**, não do desafio individual. É uma camada de gamificação global.

**Como ganhar XP:**
- Fazer check-in diário
- Completar um desafio
- Streak (dias consecutivos de check-in)
- Interagir com a comunidade (posts, comentários, reações)
- Convidar amigos que entram no app

**O que fazer com XP:**
- Resgatar recompensas reais: produtos físicos da Prolegado (canecas, camisetas, etc.)
- Recompensas de parceiros (aula em academia, desconto em produto parceiro, etc.)
- O catálogo de recompensas será gerenciado pelo time Prolegado

**Usuário premium:**
- Pode ter multiplicador de XP (a definir — não implementar ainda, apenas deixar arquitetura preparada)
- Tem badge verificado visível no feed

---

## Sistema de Check-in

O check-in é o coração do produto. Regras:

- Cada desafio tem um check-in por dia
- O usuário registra que fez a atividade do desafio naquele dia
- Pode anexar foto, texto ou apenas marcar como feito (depende das regras do criador)
- Check-in valida o streak do dia
- Check-in pode ser postado no feed público ou só no desafio (escolha do usuário no momento)
- Criador pode configurar se o check-in precisa de aprovação manual ou é automático

---

## Filosofia de produto (influencia decisões de UX)

- **Constância acima de perfeição**: o app deve celebrar consistência, não só resultados extremos
- **Comunidade como motor**: o feed e o social são tão importantes quanto o desafio em si
- **Sem culpa**: se o usuário perdeu um dia, o app não pune — encoraja a vol