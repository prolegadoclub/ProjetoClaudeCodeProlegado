# Prolegado Design System — Skill para Claude Code

Esta é a primeira skill oficial do Prolegado. Ela ensina o Claude Code a respeitar a identidade visual e o design system de produto da marca em **todo** trabalho de frontend.

## O que tem aqui dentro

```
prolegado-design-system/
├── SKILL.md          ← O cérebro da skill (lido automaticamente pelo Claude)
├── tokens.css        ← Variáveis CSS prontas pra importar nos seus projetos
├── README.md         ← Este arquivo
└── assets/
    ├── logos/        ← 3 variações do símbolo "P" (laranja, off-white, preto)
    └── symbols/      ← 7 símbolos da marca (Prêmio, Raio, Animador, Bandeira,
                        Pose, Comunidade, Pódio) × 3 cores cada = 21 arquivos
```

## Como instalar no Claude Code (passo a passo)

A skill precisa ficar em uma pasta específica pra o Claude Code achar automaticamente.

### Opção 1 — Skill global (vale pra todos os seus projetos)

No terminal, no seu Mac/PC:

```bash
mkdir -p ~/.claude/skills
mv /caminho/para/prolegado-design-system ~/.claude/skills/
```

Pronto. Toda vez que você abrir o Claude Code em qualquer projeto, essa skill vai estar disponível.

### Opção 2 — Skill por projeto (só vale dentro do projeto do app)

Dentro da pasta do projeto do app Prolegado:

```bash
mkdir -p .claude/skills
mv /caminho/para/prolegado-design-system .claude/skills/
```

Use essa opção se quiser manter a skill versionada junto com o código do app (commitada no Git).

**Recomendação pra você**: comece com a Opção 1 (global). Quando o projeto do app estiver maduro e com Git configurado, você pode mover pra Opção 2 e versionar junto com o time.

## Como saber se está funcionando

Abre o Claude Code, vai pra qualquer pasta, e pede algo assim:

> "Cria uma tela de login do Prolegado"

Se a skill está ativa, o Claude vai:
- Usar a fonte Parabolica para o título
- Usar Inter pra o resto do texto
- Usar laranja `#fd6413` no botão principal
- Aplicar border-radius médio
- Deixar a tela espaçada e acolhedora

Se ele inventar cores ou fontes diferentes, **a skill não está sendo lida** — confere o caminho da pasta.

## Como usar o tokens.css em um projeto novo

Quando você criar um app React, Next.js, ou Vite, copie o `tokens.css` para a pasta `src/styles/` (ou similar) e no topo do seu CSS global coloque:

```css
@import './styles/tokens.css';
```

Daí em qualquer componente você pode usar:

```css
.meu-botao {
  background: var(--prolegado-criatividade);
  color: var(--prolegado-clareza);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-5);
}
```

Se você usa Tailwind, peça pro Claude Code "extender o tailwind.config.js com os tokens do Prolegado" — ele vai fazer isso lendo o `tokens.css`.

## Quando atualizar esta skill

Atualize sempre que:
- Surgir uma nova cor oficial (improvável, mas possível)
- A Tríade mudar de novo
- Vocês definirem novos componentes-padrão (ex: como o card de desafio deve sempre ser)
- Surgirem novos símbolos da marca

Como atualizar: edite o `SKILL.md` e/ou `tokens.css`. Claude lê a versão mais recente toda vez que abre.

## Observações importantes

- A Parabolica é uma fonte que **não é gratuita no Google Fonts**. Você precisa ter os arquivos `.woff2` ou `.otf` dela e carregar manualmente via `@font-face`. Se o time de design não tiver o arquivo, fala com a Jéssica antes de iniciar qualquer projeto que vá pra produção.
- A Inter é gratuita. Carrega via Google Fonts: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`
- Os símbolos da marca estão em PNG. Em algum momento vale a pena converter pra SVG (qualidade infinita, peso menor) — peça pro Claude Code fazer isso quando o app estiver mais avançado.

---

Criado em 2026-05-22 com base na nova identidade visual oficial do Prolegado.
