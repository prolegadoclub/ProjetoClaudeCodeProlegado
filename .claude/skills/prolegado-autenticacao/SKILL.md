---
name: prolegado-autenticacao
description: Use this skill whenever you implement anything related to authentication, login, register, logout, session, onboarding, or user account in the Prolegado app. Triggers on: "login", "cadastro", "logout", "sessão", "autenticação", "onboarding", "primeiro acesso", "Google login", "Apple login", "recuperar senha", "auth", or any feature involving user identity. Always read this skill before implementing any auth flow. Do NOT invent auth logic — everything is defined here.
---

# Prolegado — Autenticação e Sessão

Stack de autenticação: **Supabase Auth**
Biblioteca React Native: `@supabase/supabase-js`

---

## Métodos de login disponíveis

| Método | Como implementar |
|---|---|
| Email + senha | `supabase.auth.signInWithPassword({ email, password })` |
| Cadastro email + senha | `supabase.auth.signUp({ email, password, options: { data: { full_name, username } } })` |
| Google | `supabase.auth.signInWithOAuth({ provider: 'google' })` |
| Apple | `supabase.auth.signInWithOAuth({ provider: 'apple' })` |
| Logout | `supabase.auth.signOut()` |
| Recuperar senha | `supabase.auth.resetPasswordForEmail(email)` |

---

## Sessão

- **Persistente**: o usuário fica logado até fazer logout manualmente
- Supabase gerencia o token automaticamente — não implementar refresh manual
- Ao abrir o app, verificar sessão com `supabase.auth.getSession()`
- Escutar mudanças de sessão com `supabase.auth.onAuthStateChange()`

### Inicialização do app

```javascript
// No App.tsx ou equivalente
useEffect(() => {
  // Verificar sessão existente
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
  });

  // Escutar mudanças (login, logout, token refresh)
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setSession(session);
    }
  );

  return () => subscription.unsubscribe();
}, []);
```

---

## Fluxo de navegação por estado de sessão

```
App abre
├── SplashScreen (2 segundos)
└── Verificar sessão
    ├── Sem sessão → LoginScreen
    └── Com sessão
        ├── Primeiro acesso (profile.created_at < 1 min) → OnboardingScreen
        └── Acesso normal → FeedScreen (aba Início)
```

---

## Fluxo de cadastro completo

```
1. RegisterScreen
   → Campos: nome completo, username, email, senha, confirmar senha
   → Validações (ver abaixo)
   → supabase.auth.signUp()

2. Supabase cria o usuário em auth.users
   → Trigger handle_new_user() cria perfil em profiles automaticamente
   → username e full_name passados via options.data

3. App detecta nova sessão via onAuthStateChange

4. Redireciona para OnboardingScreen (primeiro acesso)

5. Após onboarding → FeedScreen
```

---

## Fluxo de login

```
1. LoginScreen
   → Email + senha OU botão Google OU botão Apple

2. Email/senha:
   → supabase.auth.signInWithPassword()
   → Sucesso: onAuthStateChange dispara → FeedScreen
   → Erro: exibir mensagem (ver tom de voz)

3. Google / Apple:
   → supabase.auth.signInWithOAuth({ provider })
   → Abre browser/modal nativo para autenticação
   → Retorna para o app com sessão ativa
   → Se primeiro acesso: OnboardingScreen
   → Se retorno: FeedScreen
```

---

## Onboarding (primeiro acesso)

3 slides explicando o app. Aparece UMA VEZ — após concluir, nunca mais.

### Como detectar primeiro acesso
```javascript
// Verificar se o perfil foi criado há menos de 2 minutos
const isFirstAccess = new Date() - new Date(profile.created_at) < 120000;
// OU salvar flag em AsyncStorage após onboarding concluído
```

### Conteúdo dos 3 slides

**Slide 1 — O que é o Prolegado**
- Ícone: símbolo "P" da marca
- Título: "Aqui a constância é identidade."
- Texto: "Desafios diários, comunidade real e desenvolvimento que transforma hábito em estilo de vida."

**Slide 2 — Como funciona**
- Ícone: símbolo Bandeira
- Título: "Entre num desafio. Faça hoje."
- Texto: "Escolha um desafio, faça check-in todo dia e acompanhe sua evolução com a comunidade."

**Slide 3 — PL Points**
- Ícone: símbolo Prêmio
- Título: "Cada ação vira ponto. Cada ponto vira recompensa."
- Texto: "Ganhe PL Points fazendo check-ins, assistindo aulas e postando. Troque por recompensas reais."

### Navegação do onboarding
- Indicadores de progresso (bolinhas) no rodapé
- Botão "Próximo" em cada slide
- No último slide: botão "Vamos começar" → FeedScreen
- Botão "Agora não" (skip) disponível do slide 1 em diante → FeedScreen

---

## Validações de formulário

### Cadastro

| Campo | Regra | Mensagem de erro |
|---|---|---|
| Nome completo | Obrigatório, mínimo 2 chars | "Preenche esse campo para continuar." |
| Username | Obrigatório, 3-20 chars, só letras/números/underscore, único | "Use apenas letras, números e underscore." / "Esse nome já está em uso. Tenta outro." |
| Email | Obrigatório, formato válido | "Esse email não parece certo. Confere aí." |
| Senha | Obrigatório, mínimo 8 chars | "A senha precisa ter pelo menos 8 caracteres." |
| Confirmar senha | Deve ser igual à senha | "As senhas não são iguais. Verifica." |

### Login

| Campo | Regra | Mensagem de erro |
|---|---|---|
| Email | Obrigatório | "Preenche esse campo para continuar." |
| Senha | Obrigatório | "Preenche esse campo para continuar." |
| Credenciais inválidas | — | "Email ou senha incorretos. Tenta de novo." |

---

## Recuperação de senha

```
1. ForgotPasswordScreen
   → Campo: email
   → supabase.auth.resetPasswordForEmail(email, {
       redirectTo: 'prolegado://reset-password'
     })

2. Após envio (independente de o email existir ou não):
   → Mostrar mensagem inline: "Enviamos um link para o seu email. Confere a caixa de entrada."
   → NÃO navegar — usuário permanece na tela
   → Botão "Voltar para o login" aparece

3. Usuário clica no link do email
   → App abre via deep link prolegado://reset-password
   → Tela de nova senha: campo senha + confirmar senha
   → supabase.auth.updateUser({ password: novaSenha })
   → Sucesso: "Senha atualizada. Pode entrar." → LoginScreen
```

---

## Logout

```javascript
// Em SettingsScreen — sempre pedir confirmação antes
Alert.alert(
  'Sair',
  'Tem certeza que quer sair?',
  [
    { text: 'Cancelar', style: 'cancel' },
    {
      text: 'Sair',
      style: 'destructive',
      onPress: async () => {
        await supabase.auth.signOut();
        // onAuthStateChange cuida do redirect para LoginScreen
      }
    }
  ]
);
```

---

## Proteção de rotas

Toda tela dentro do `MainNavigator` requer sessão ativa.
Se o token expirar ou o usuário for deslogado, redirecionar para `LoginScreen`.

```javascript
// No navigator principal
const { session } = useSession(); // hook que escuta onAuthStateChange

if (!session) {
  return <AuthNavigator />;
}

return <MainNavigator />;
```

---

## Deep links

| URL | Destino |
|---|---|
| `prolegado://reset-password` | Tela de redefinição de senha |
| `prolegado://desafio/:invite_code` | ChallengeDetailScreen do desafio privado |

Configurar no `app.json` (Expo) ou `AndroidManifest.xml` / `Info.plist` (bare React Native).

---

## Erros comuns do Supabase Auth e como tratar

| Código do erro | Mensagem para o usuário |
|---|---|
| `invalid_credentials` | "Email ou senha incorretos. Tenta de novo." |
| `email_not_confirmed` | "Confirma seu email antes de entrar. Confere a caixa de entrada." |
| `user_already_exists` | "Esse email já está cadastrado. Tenta fazer login." |
| `weak_password` | "A senha precisa ter pelo menos 8 caracteres." |
| Qualquer outro erro | "Ih, travou aqui. Dá um toque e tenta novamente." |

---

## Variáveis de ambiente necessárias

```
SUPABASE_URL=https://fvrkjuxoxbfapkhyeouw.supabase.co
SUPABASE_ANON_KEY=[pegar no painel do Supabase: Settings → API → anon public]
```

Nunca usar a `service_role` key no app mobile — só no backend/Edge Functions.
Salvar as variáveis em `.env` e adicionar `.env` ao `.gitignore`.

---

## O que não está definido ainda (não inventar)

- Verificação de email obrigatória ou opcional após cadastro
- Login com Facebook ou outros providers
- Autenticação com número de telefone (SMS)

Se precisar de qualquer um desses, perguntar ao usuário antes de implementar.
