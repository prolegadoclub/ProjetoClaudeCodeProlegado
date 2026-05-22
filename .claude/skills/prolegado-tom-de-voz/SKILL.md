---
name: prolegado-tom-de-voz
description: Use this skill whenever you write any text that appears in the Prolegado app — buttons, labels, error messages, success messages, notifications, empty states, onboarding, tooltips, placeholders, celebration messages, or any copy. Triggers on: "write the text", "what should the button say", "error message", "success message", "notification text", "escreve o texto", "mensagem de erro", "celebração", "notificação", or any request involving UI copy. Always read this skill before writing any visible text in the app. Do NOT use generic app copy — everything must sound like Prolegado.
---

# Prolegado — Tom de Voz

Este skill define como a Prolegado escreve em todo texto do app.
Cada palavra no app é uma extensão da marca. Nunca use copy genérico.

---

## A personalidade em uma frase

A Prolegado é **um amigo próximo que acredita em você mais do que você acredita em si mesmo** — e não tem medo de falar a verdade com carinho.

Encorajadora, parceira, direta. Nunca condescendente, nunca fria, nunca exagerada.

---

## Regras absolutas (NUNCA violar)

1. **Zero emojis** — em nenhum texto do app. Nunca. Nem em celebrações.
2. **"Você" com intimidade** — como um amigo próximo, não como atendente de banco.
3. **Nunca culpar o usuário** — erros acontecem, o app acolhe e move pra frente.
4. **Nunca gritar** — sem CAPS LOCK em mensagens, sem exagero de exclamações.
5. **Português BR** — sem anglicismos desnecessários, sem "awesome", "incrível demais".
6. **Frases curtas** — o app fala pouco e diz muito. Máximo 2 linhas em qualquer mensagem.
7. **Imperativo com afeto** — "Bora", "Faz", "Vem" — direto mas nunca seco.

---

## Tratamento

| Situação | Forma correta | Errado |
|---|---|---|
| Padrão | "Você" íntimo | "Você" formal / "Sr(a)" |
| Motivação | "Bora", "Vamos", "Vem" | "Venha", "Participe" |
| Erro | "Ih, travou aqui" | "Ocorreu um erro" |
| Sucesso | "Bora!" | "Operação concluída" |

---

## Botões — texto oficial

Estes são os textos aprovados. Use-os exatamente assim, sem alterar.

| Ação | Texto do botão |
|---|---|
| Fazer check-in | **Check-in de hoje** |
| Entrar em desafio | **Entrar no desafio** |
| Criar desafio | **Criar desafio** |
| Salvar alterações | **Salvar** |
| Cancelar | **Cancelar** |
| Voltar | **Voltar** |
| Confirmar | **Confirmar** |
| Sair / Logout | **Sair** |
| Ver mais | **Ver tudo** |
| Compartilhar | **Compartilhar** |
| Editar | **Editar** |
| Excluir | **Excluir** |
| Tentar de novo | **Tentar de novo** |
| Fazer upgrade de plano | **Quero o Premium** |
| Pular (onboarding) | **Agora não** |
| Começar onboarding | **Vamos começar** |

---

## Mensagens de sistema

### Check-in

| Momento | Texto |
|---|---|
| Check-in confirmado | "Bora! Check-in confirmado." |
| Já fez check-in hoje | "Você já fez o check-in de hoje. Volta amanhã." |
| Lembrete de check-in (notificação) | "Ei, o check-in de hoje ainda está esperando você." |

### Streak

| Momento | Texto |
|---|---|
| 7 dias de streak | "7 dias seguidos. Você está no caminho." |
| 30 dias de streak | "30 dias seguidos. A constância virou sua identidade." |
| 100 dias de streak | "100 dias. Isso já é quem você é." |
| Streak zerado | "Poxa, você quebrou o streak. Mas tudo bem, recomeça hoje." |

### Erros técnicos

| Situação | Texto |
|---|---|
| Erro genérico | "Ih, travou aqui. Dá um toque e tenta novamente." |
| Sem conexão | "Sem internet no momento. Verifica a conexão e tenta de novo." |
| Timeout / lentidão | "Demorou mais que o esperado. Tenta de novo." |
| Erro ao salvar | "Não conseguimos salvar. Tenta de novo em instantes." |

### Formulários e validação

| Situação | Texto |
|---|---|
| Campo obrigatório vazio | "Preenche esse campo para continuar." |
| Email inválido | "Esse email não parece certo. Confere aí." |
| Senha muito curta | "A senha precisa ter pelo menos 8 caracteres." |
| Senhas não conferem | "As senhas não são iguais. Verifica." |
| Username já existe | "Esse nome já está em uso. Tenta outro." |
| Username inválido | "Use apenas letras, números e underscore." |

### Estados vazios (quando não tem conteúdo ainda)

| Tela | Texto |
|---|---|
| Feed vazio | "Ainda não tem nada aqui. Entra em um desafio e começa a postar." |
| Sem desafios ativos | "Você não está em nenhum desafio ainda. Que tal começar um?" |
| Sem badges | "Suas conquistas vão aparecer aqui conforme você avança." |
| Sem notificações | "Tudo tranquilo por aqui." |
| Sem cursos | "Nenhum curso disponível ainda. Em breve tem coisa nova." |

### Níveis e PL Points

| Momento | Texto |
|---|---|
| Subiu de nível | "Você chegou ao nível [Nome do Nível]." |
| PL Points ganhos (check-in) | "+[X] PL Points" |
| PL Points ganhos (aula) | "+[X] PL Points pela aula concluída." |
| Próximo nível | "Faltam [X] PL Points para o próximo nível." |

### Badges

| Momento | Texto |
|---|---|
| Badge desbloqueada | "Conquista desbloqueada: [Nome da Badge]." |
| Descrição da badge | Usar a descrição exata cadastrada no banco (tabela `badges`) |

### Desafios

| Momento | Texto |
|---|---|
| Entrou no desafio | "Você entrou em [Nome do Desafio]. Bora começar." |
| Desafio concluído | "Desafio concluído. Você foi até o fim." |
| Desafio criado | "Desafio criado. Compartilha com quem merece." |
| Convite gerado | "Link de convite pronto. É só compartilhar." |
| Limite de desafios (free) | "Você já está em 1 desafio ativo. Para participar de mais, vai precisar do Premium." |
| Limite de desafios (premium) | "Você já está em 3 desafios ativos. Para mais, vai precisar do plano PR." |

### Autenticação

| Momento | Texto |
|---|---|
| Bem-vindo (primeiro acesso) | "Bem-vindo à Prolegado. Aqui a constância é identidade." |
| Login bem-sucedido | "Bem-vindo de volta." |
| Logout | "Até logo. Continue fazendo hoje." |
| Email de recuperação enviado | "Enviamos um link para o seu email. Confere a caixa de entrada." |
| Senha redefinida | "Senha atualizada. Pode entrar." |

---

## Notificações push

Máximo 1 linha de título + 1 linha de corpo. Sem emoji. Sem ponto de exclamação no título.

| Tipo | Título | Corpo |
|---|---|---|
| Lembrete de check-in | "Seu check-in está esperando" | "Faz hoje. Não deixa pra amanhã." |
| Streak em risco | "Você não fez check-in hoje" | "O streak continua se você agir agora." |
| Badge desbloqueada | "Nova conquista" | "Você desbloqueou: [Nome da Badge]." |
| Novo nível | "Você subiu de nível" | "Bem-vindo ao nível [Nome]." |
| Desafio começando | "[Nome do Desafio] começa hoje" | "Bora fazer o primeiro check-in." |
| Desafio encerrando | "[Nome do Desafio] termina em breve" | "Você ainda pode concluir." |

---

## O que nunca escrever

| Errado | Certo |
|---|---|
| "Operação concluída com sucesso!" | "Bora! Check-in confirmado." |
| "Ocorreu um erro inesperado." | "Ih, travou aqui. Tenta de novo." |
| "Parabéns! Você é incrível!" | "30 dias seguidos. A constância virou sua identidade." |
| "Você falhou no desafio." | "Não foi dessa vez. Recomeça quando quiser." |
| "Por favor, preencha todos os campos." | "Preenche esse campo para continuar." |
| "Bem-vindo ao aplicativo Prolegado Club!" | "Bem-vindo à Prolegado." |
| "Clique aqui para começar" | "Vamos começar" |
| Qualquer coisa com emoji | Sem emoji. Sempre. |
| Frases com 3+ exclamações na mesma tela | Uma exclamação por tela, no máximo |

---

## Tom por contexto

| Contexto | Tom | Exemplo |
|---|---|---|
| Ação concluída | Direto, positivo, curto | "Bora! Check-in confirmado." |
| Erro técnico | Leve, sem drama | "Ih, travou aqui. Tenta de novo." |
| Quebrou streak | Acolhedor, move pra frente | "Poxa, você quebrou o streak. Mas tudo bem, recomeça hoje." |
| Celebração de conquista | Firme, significativo | "30 dias seguidos. A constância virou sua identidade." |
| Estado vazio | Encorajador, sem pressão | "Suas conquistas vão aparecer aqui conforme você avança." |
| Upsell (upgrade de plano) | Honesto, sem pressão | "Para participar de mais desafios, vai precisar do Premium." |
| Onboarding | Acolhedor, simples | "Aqui a constância é identidade." |

---

## Teste rápido antes de publicar qualquer texto

Antes de usar um texto no app, passa por essas perguntas:

1. Tem emoji? — Se sim, remove.
2. Tem mais de 2 linhas? — Se sim, corta.
3. Soa como atendente de banco? — Se sim, reescreve.
4. Culpa o usuário? — Se sim, reescreve acolhendo.
5. Poderia ser de qualquer app? — Se sim, reescreve com a cara da Prolegado.

Se passou nas 5 perguntas, pode usar.
