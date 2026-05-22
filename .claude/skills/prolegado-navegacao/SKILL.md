---
name: prolegado-navegacao
description: Use this skill whenever you create, edit, or connect any screen in the Prolegado app. Triggers on: "criar tela", "nova tela", "navegar para", "voltar", "bottom tab", "header", "stack navigator", "fluxo de telas", "onboarding", "criar tela de perfil", or any screen or navigation work. Always read this skill before building any screen so the navigation structure is consistent across the app. Do NOT invent screen names or navigation flows — everything is documented here.
---

# Prolegado — Estrutura de Navegação

Stack: React Native com **React Navigation** (stack + bottom tabs).
Todas as telas usam o design system `prolegado-design-system`.
Todos os textos seguem `prolegado-tom-de-voz`.

---

## Visão geral da estrutura

```
App
├── SplashScreen              ← primeira tela, logo animado
├── AuthNavigator             ← usuário não logado
│   ├── LoginScreen
│   ├── RegisterScreen
│   └── ForgotPasswordScreen
└── MainNavigator             ← usuário logado (Bottom Tab)
    ├── InicioTab             ← aba 1
    │   └── FeedScreen
    │       ├── PostDetailScreen
    │       └── UserProfileScreen
    ├── ExplorarTab           ← aba 2
    │   └── ExplorarScreen
    │       └── ChallengeDetailScreen
    ├── DesafiosTab           ← aba 3
    │   └── DesafiosScreen
    │       ├── CheckinScreen
    │       ├── ChallengeProgressScreen
    │       ├── CreateChallengeScreen
    │       └── ChallengeHistoryScreen
    ├── CursosTab             ← aba 4
    │   └── CursosScreen
    │       ├── CourseDetailScreen
    │       └── LessonScreen
    └── PerfilTab             ← aba 5
        └── PerfilScreen
            ├── EditProfileScreen
            ├── BadgesScreen
            ├── SettingsScreen
            └── DrawerMenu    ← abre pelo hambúrguer no header
                ├── FAQScreen
                ├── SupportScreen
                └── AboutScreen
```

---

## Bottom Tab Bar (menu inferior)

5 abas, nessa ordem exata:

| Posição | Label | Ícone Lucide (outline) | Ícone ativo (filled) |
|---|---|---|---|
| 1 | **Início** | `Home` | `Home` filled |
| 2 | **Explorar** | `Search` | `Search` filled |
| 3 | **Desafios** | `Flag` | `Flag` filled |
| 4 | **Cursos** | `BookOpen` | `BookOpen` filled |
| 5 | **Perfil** | `User` | `User` filled |

**Regras visuais da tab bar:**
- Fundo: `--prolegado-clareza` no modo claro, `--prolegado-constancia` no escuro
- Ícone ativo: `--prolegado-criatividade` (#fd6413)
- Ícone inativo: `--prolegado-constancia` a 40% de opacidade
- Label ativo: Parabolica Bold, 10px, laranja
- Label inativo: Inter Regular, 10px, cinza
- Sombra suave no topo: `--shadow-md`
- Sem borda superior visível

---

## Header padrão

Todas as telas dentro do MainNavigator têm header com:
- **Esquerda**: logo símbolo "P" pequeno (versão laranja em fundo claro, branca em fundo escuro)
- **Direita**: ícone hambúrguer (`Menu` do Lucide, 24px) que abre o DrawerMenu
- Fundo: mesma cor do background da tela (sem linha separadora)
- Título: NÃO aparece no header — cada tela tem seu próprio título dentro do conteúdo

**Telas sem header** (fullscreen):
- SplashScreen
- LoginScreen
- RegisterScreen
- ForgotPasswordScreen

---

## Telas — detalhamento

### SplashScreen
- Fundo: `--prolegado-criatividade` (laranja)
- Centro: logo símbolo "P" em `--prolegado-clareza`, animação de entrada suave
- Duração: 2 segundos, depois navega para LoginScreen (ou FeedScreen se já logado)
- Sem header, sem tab bar

---

### AuthNavigator

#### LoginScreen
- Campos: email, senha
- Botão principal: "Entrar"
- Link: "Esqueci a senha" → ForgotPasswordScreen
- Link: "Criar conta" → RegisterScreen
- Sem header

#### RegisterScreen
- Campos: nome completo, username, email, senha, confirmar senha
- Botão principal: "Vamos começar"
- Link: "Já tenho conta" → LoginScreen

#### ForgotPasswordScreen
- Campo: email
- Botão principal: "Enviar link"
- Após envio: mensagem de confirmação inline (não navega)
- Botão voltar → LoginScreen

---

### InicioTab — FeedScreen
**O que mostra:** feed de posts da comunidade em ordem cronológica reversa.

Componentes da tela:
- Lista de posts (scroll infinito)
- Cada post: avatar + username + badge verificado (se Premium) + texto + hora + botão de curtir
- Botão flutuante "+" no canto inferior direito → abre modal de criar post
- Pull-to-refresh no topo

**Modal de criar post:**
- Campo de texto
- Seletor de visibilidade: "Público" ou "Só no desafio" (aparece só se estiver em desafio ativo)
- Seletor de desafio (se visibilidade = só no desafio)
- Botão: "Publicar"

**Navegação a partir daqui:**
- Toca no post → PostDetailScreen
- Toca no avatar/username → UserProfileScreen

#### PostDetailScreen
- Mostra o post completo
- Lista de comentários (a implementar futuramente)
- Botão voltar → FeedScreen

#### UserProfileScreen
- Perfil público de outro usuário
- Mostra: avatar, username, nível, PL Points, badges, calendário de check-ins
- Botão voltar

---

### ExplorarTab — ExplorarScreen
**O que mostra:** desafios públicos ativos para descoberta.

Componentes da tela:
- Barra de busca no topo (busca por nome ou criador)
- Seção "Em destaque" — carrossel horizontal com desafios populares
- Filtros: duração (7, 14, 21, 30+ dias), modalidade (dias, pontos)
- Grid de desafios filtrados (scroll vertical)
- Cada card de desafio: capa, título, criador, número de participantes, duração

**Navegação a partir daqui:**
- Toca no card do desafio → ChallengeDetailScreen

#### ChallengeDetailScreen
- Capa do desafio (imagem grande no topo)
- Título, descrição, criador, duração, modalidade, número de participantes
- Ranking dos participantes
- Botão principal: "Entrar no desafio" (verifica limite do plano antes de permitir)
- Se já está participando: botão "Ver meu progresso" → ChallengeProgressScreen
- Botão voltar

---

### DesafiosTab — DesafiosScreen
**O que mostra:** desafios do próprio usuário.

Componentes da tela:
- Seção "Ativos" — desafios em andamento, cada um com streak atual e botão de check-in
- Seção "Concluídos" — histórico de desafios finalizados
- Botão no topo direito: "Criar desafio" → CreateChallengeScreen

**Navegação a partir daqui:**
- Toca em "Check-in de hoje" → CheckinScreen
- Toca no card do desafio → ChallengeProgressScreen
- Toca em "Criar desafio" → CreateChallengeScreen
- Toca em desafio concluído → ChallengeHistoryScreen

#### CheckinScreen
- Nome do desafio no topo
- Streak atual (número grande com símbolo Raio)
- Botão principal: "Check-in de hoje"
- Após check-in: animação de celebração + PL Points ganhos
- Campo opcional: nota do dia (pode virar post no feed)
- Botão voltar → DesafiosScreen

#### ChallengeProgressScreen
- Progresso do usuário no desafio específico
- Calendário de check-ins (grid de dias)
- Streak atual e maior streak
- Pontos acumulados no desafio
- Ranking dos participantes
- Botão voltar

#### CreateChallengeScreen
- Formulário: título, descrição, upload de capa, duração, modalidade
- Toggle: público / privado
- Se privado: aviso de que o link será gerado automaticamente
- Toggle: adicionar aulas (requer plano pago — se não tiver, mostra upsell)
- Botão: "Criar desafio"
- Após criar: navega para ChallengeDetailScreen do novo desafio

#### ChallengeHistoryScreen
- Resumo do desafio concluído
- Estatísticas: total de check-ins, maior streak, pontos ganhos, posição final no ranking
- Botão voltar

---

### CursosTab — CursosScreen
**O que mostra:** cursos disponíveis.

Componentes:
- Seção "Em andamento" — cursos que o usuário já começou
- Seção "Disponíveis" — todos os cursos publicados
- Cada card: capa, título, criador, número de aulas, progresso (se iniciado)

**Navegação a partir daqui:**
- Toca no card → CourseDetailScreen

#### CourseDetailScreen
- Capa, título, descrição, criador
- Lista de aulas em ordem (com duração e status: concluída / não iniciada)
- Barra de progresso geral do curso
- Toca em aula → LessonScreen

#### LessonScreen
- Player de vídeo / leitor de texto / player de áudio (depende do tipo)
- Título da aula
- Botão "Concluir aula" — credita PL Points e marca como concluída
- Navegação entre aulas: anterior / próxima
- Botão voltar → CourseDetailScreen

---

### PerfilTab — PerfilScreen
**O que mostra:** perfil completo do usuário logado.

Componentes:
- Avatar, nome, username, bio
- Badge verificado (se Premium)
- Nível atual + barra de progresso até o próximo nível
- PL Points totais
- Streak atual e maior streak
- Calendário visual de check-ins (grid de quadradinhos por dia)
- Seção de badges conquistadas
- Botão "Editar perfil" → EditProfileScreen
- Botão "Ver todas as conquistas" → BadgesScreen

**Navegação a partir daqui:**
- "Editar perfil" → EditProfileScreen
- "Ver conquistas" → BadgesScreen
- Ícone de configurações (engrenagem) → SettingsScreen
- Hambúrguer no header → DrawerMenu

#### EditProfileScreen
- Campos: foto, nome completo, username, bio
- Botão: "Salvar"
- Botão voltar

#### BadgesScreen
- Grid de todas as badges do sistema
- Conquistadas: coloridas (laranja)
- Não conquistadas: cinza com cadeado
- Toca em badge: modal com nome, descrição e condição para desbloquear

#### SettingsScreen
- Seletor de tema: claro / escuro
- Plano atual + botão de upgrade (se não for PR)
- Botão "Sair" (logout) com confirmação

---

### DrawerMenu (menu lateral)

Abre pelo ícone hambúrguer no header. Desliza da direita.

Itens:
- **FAQ** → FAQScreen
- **Suporte** → SupportScreen
- **Sobre a Prolegado** → AboutScreen
- Fechar (X no canto)

#### FAQScreen
- Lista de perguntas frequentes em accordion (toca para expandir)

#### SupportScreen
- Formulário: assunto + mensagem
- Botão: "Enviar"

#### AboutScreen
- Logo, versão do app, missão da marca, links (Instagram, site)

---

## Regras de navegação

1. **Botão voltar** — sempre no canto superior esquerdo do header da tela filha. Nunca omitir.
2. **Modais** — usar para ações rápidas (criar post, confirmar exclusão). Não usar para fluxos longos.
3. **Deep link** — desafios privados acessados via link (`app.com/desafio/ABC123`) abrem diretamente na ChallengeDetailScreen, verificando autenticação antes.
4. **Redirect pós-login** — se o usuário acessou via deep link antes de logar, redireciona para o destino original após login.
5. **Upsell** — quando o usuário tenta ação que requer plano superior, abre modal de upsell inline. Nunca navega para fora do app.
6. **Tab ativa** — a tab ativa mantém o estado de scroll ao trocar de aba e voltar.

---

## Nomes de telas (usar exatamente esses no código)

```javascript
// Auth
'Splash'
'Login'
'Register'
'ForgotPassword'

// Main Tabs
'Feed'
'Explorar'
'Desafios'
'Cursos'
'Perfil'

// Stacks
'PostDetail'
'UserProfile'
'ChallengeDetail'
'Checkin'
'ChallengeProgress'
'CreateChallenge'
'ChallengeHistory'
'CourseDetail'
'Lesson'
'EditProfile'
'Badges'
'Settings'
'FAQ'
'Support'
'About'
```
