---
name: prolegado-design-system
description: Use this skill whenever you build, edit, or style any user-facing surface for the Prolegado Club app, web, or product — screens, components, buttons, forms, cards, navigation, marketing pages, landing pages, emails, or any visual artifact representing the brand. Triggers on: "create a screen", "build a component", "design a UI", "fazer uma tela", "criar componente", "página do app", "interface", "Prolegado", "design system", or any frontend work for the product. Encodes the official Prolegado brand identity (colors, typography, logo, symbols) AND the product design system (spacing, radius, shadows, components, motion, semantic colors, gamification visuals). Always load this skill before touching any visual layer of the Prolegado product. Do NOT use for non-Prolegado projects.
---

# Prolegado Design System

This skill encodes the official visual identity and product design system of **Prolegado Club**. Every visual artifact for the brand or product MUST follow these rules.

## Brand Foundation (NEVER violate)

**What Prolegado is**
A movement that ruptures with the culture of "depois" (procrastination) and "conformismo" (conformism). The brand structures **environment, system, and discipline** so people return to trusting their own word and sustain **constância** as identity and sustainable lifestyle.

**Battle cry**: "Faça Hoje!" — secondary: "Sua energia merece direção, vamos juntos!"

**Brand name origin**: Prolegado = Próposito + Legado. The word **Desafio** is the activation derivative.

**Tríade (3 pillars)** — use this exact wording, do NOT substitute:
1. **Ambiente**
2. **Desenvolvimento**
3. **Evolução**

> ⚠️ Older brand documents may list "Físico" as pillar 3. That is **outdated**. The current and correct pillar is **Evolução** (since the physical is a consequence, not the goal itself). If you see "Físico" in any legacy material, treat it as deprecated.

**Atributos** (use as content tags, never as pillars): Comunidade, Constância, Desafio, Hábitos, Saúde, Bem-estar.

## Voice & Tone (visual implications)

- **No emojis** in UI copy, buttons, headers, or system messages. Use the brand's own symbols (see Symbols section) for visual punctuation.
- **No exclamation overuse**. "Faça Hoje!" is the brand cry — outside that specific phrase, use exclamations sparingly.
- **Direct, motivational, never preachy**. Imperatives are fine ("Faça check-in", "Comece agora") — guilt-tripping is not.
- **Portuguese (BR) by default** for all user-facing text.

---

## Design Tokens

The complete token set lives in `tokens.css`. Always import or replicate it verbatim — never approximate colors or radii from memory.

### Colors

The brand uses three named colors with conceptual meaning. Do NOT introduce new primary colors.

| Token | Hex | Concept | Use |
|---|---|---|---|
| `--prolegado-criatividade` | `#fd6413` | Criatividade | Primary action, brand presence, accent. THE laranja. |
| `--prolegado-clareza` | `#fff7ea` | Clareza | Light background, body surface, light-mode default. |
| `--prolegado-constancia` | `#211d1e` | Constância | Dark background, body text on light, dark-mode default. |

**Old `#FF6500` is DEPRECATED.** Always use `#fd6413`.

**Semantic colors** — harmonize with the laranja, never gritantes:

| Token | Hex | Use |
|---|---|---|
| `--prolegado-success` | `#4a9d5f` | Sage green. Check-in confirmed, action completed. |
| `--prolegado-error` | `#c94a3a` | Warm terracotta-red. Validation errors, destructive confirmations. |
| `--prolegado-warning` | `#e89b3c` | Warm amber. Caution, expiring streak, missing data. |
| `--prolegado-info` | `#5a7a9d` | Muted steel blue. Informational notices, system tips. |

### Typography

**Decisão de produto**: o app usa fontes nativas do sistema para toda interface, garantindo sensação familiar e nativa para o usuário. Parabolica é reservada para momentos de marca de alto impacto.

| Contexto | Fonte | Motivo |
|---|---|---|
| Títulos de impacto, botões principais, números grandes, splash | **Parabolica** | Presença de marca |
| Todo o resto (corpo, formulários, labels, navegação, captions) | **Fonte do sistema** | Sensação nativa, familiar ao usuário |

**Fonte do sistema no React Native:**
- iOS: San Francisco (SF Pro) — aplicada automaticamente
- Android: Roboto — aplicada automaticamente
- Para usar: `fontFamily: undefined` ou simplesmente não especificar fontFamily

**Parabolica** deve ser carregada via `expo-font` usando os arquivos `.ttf` fornecidos pela equipe de design (Jéssica). Não está disponível no Google Fonts.

NUNCA instalar Inter, Manrope, Space Grotesk ou qualquer outra fonte de terceiros para corpo de texto — usar sempre a fonte nativa do sistema.

**Type scale** (mobile-first):

| Token | Size | Line height | Family | Use |
|---|---|---|---|---|
| `--text-display` | 40px / 2.5rem | 1.1 | Parabolica Bold | Splash, hero, "Faça Hoje!" |
| `--text-h1` | 28px / 1.75rem | 1.2 | Parabolica Bold | Títulos de página |
| `--text-h2` | 22px / 1.375rem | 1.25 | Parabolica Bold | Headers de seção |
| `--text-h3` | 18px / 1.125rem | 1.3 | Parabolica Bold | Títulos de card |
| `--text-button` | 16px / 1rem | 1 | Parabolica Bold | Botões primários e CTAs |
| `--text-number` | 56px / 3.5rem | 1 | Parabolica Bold | Números grandes (streak, PL Points) |
| `--text-body` | 16px / 1rem | 1.5 | Sistema | Corpo de texto padrão |
| `--text-body-sm` | 14px / 0.875rem | 1.5 | Sistema | Texto secundário, captions |
| `--text-caption` | 12px / 0.75rem | 1.4 | Sistema | Labels, timestamps, metadata |
| `--text-number-display` | 56px / 3.5rem | 1 | Parabolica Bold | Big numbers (streak, score, points) |

### Spacing

8px base scale. Use these tokens — no arbitrary px values.

| Token | Value | Common use |
|---|---|---|
| `--space-1` | 4px | Tight grouping (icon to label) |
| `--space-2` | 8px | Small gap |
| `--space-3` | 12px | Default inner padding small |
| `--space-4` | 16px | Default inner padding |
| `--space-5` | 24px | Section gap small |
| `--space-6` | 32px | Section gap |
| `--space-7` | 48px | Section gap large |
| `--space-8` | 64px | Hero spacing |

The product vibe is **acolhedora, espaçada, calma**. When in doubt, USE MORE SPACE. Density is the wrong default for Prolegado.

### Border radius (Medium curve — balance)

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 8px | Inputs, small chips |
| `--radius-md` | 12px | Buttons, smaller cards |
| `--radius-lg` | 16px | Cards, modals |
| `--radius-xl` | 24px | Featured cards, sheets |
| `--radius-full` | 9999px | Avatars, pill buttons, badges |

### Shadows (soft, never harsh)

Acolhedor = soft shadows. Never use hard drop shadows or neumorphism.

| Token | Value |
|---|---|
| `--shadow-sm` | `0 1px 2px rgba(33, 29, 30, 0.04)` |
| `--shadow-md` | `0 4px 12px rgba(33, 29, 30, 0.06)` |
| `--shadow-lg` | `0 8px 24px rgba(33, 29, 30, 0.08)` |
| `--shadow-orange-glow` | `0 4px 20px rgba(253, 100, 19, 0.25)` (use SPARINGLY — only on CTAs of high importance, e.g. "Faça Check-in", level-up celebration) |

### Motion

Vibe: **expressões claras**. Celebrate wins loudly against a calm base.

| Token | Value | Use |
|---|---|---|
| `--ease-out-soft` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default for all transitions |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Achievement reveals, badge unlocks |
| `--duration-fast` | `150ms` | Hover, tap feedback |
| `--duration-base` | `250ms` | Page transitions, modal open |
| `--duration-slow` | `400ms` | Celebrations, reveals |

**Required celebration moments** (use Framer Motion / react-native-reanimated):
- Check-in completed → confetti burst in `--prolegado-criatividade` + button scale spring
- Streak milestone (7, 30, 100 days) → badge reveal with `--ease-spring`
- Level up → full-screen takeover with brand symbol animation
- Goal hit → haptic feedback (mobile) + symbol pulse

**Button press**: scale to 0.97, 100ms ease-out. Always.

---

## Component Rules

### Buttons

Three variants:

**Primary** (main CTAs: Faça Check-in, Começar Desafio)
- Background: `--prolegado-criatividade`
- Text: `--prolegado-clareza`
- Border radius: `--radius-md`
- Padding: `--space-3` vertical, `--space-5` horizontal
- Font: Parabolica Bold, `--text-button`
- Active state: scale 0.97
- Optional `--shadow-orange-glow` on hero CTAs ONLY

**Secondary** (supporting actions)
- Background: transparent
- Border: 2px solid `--prolegado-constancia` (light mode) or `--prolegado-clareza` (dark mode)
- Text: matches border color

**Ghost** (tertiary, "Cancelar", "Voltar a ver depois")
- Background: transparent
- Text: `--prolegado-constancia` at 70% opacity
- No border

NEVER use gradients on buttons. NEVER use multiple colors in one button.

### Cards

- Background: `--prolegado-clareza` (light) or a slightly elevated dark surface `#2a2627` (dark mode — derive from `--prolegado-constancia`)
- Border radius: `--radius-lg`
- Padding: `--space-5`
- Shadow: `--shadow-md`
- Border: optional 1px solid at 8% opacity for definition

### Inputs

- Background: transparent or `--prolegado-clareza` (dark mode: lighter than surface)
- Border: 1.5px solid at 15% opacity of `--prolegado-constancia`
- Focus: border becomes `--prolegado-criatividade`, no outline
- Border radius: `--radius-sm`
- Padding: `--space-3` vertical, `--space-4` horizontal
- Font: Inter Regular, `--text-body`
- Label: above the field, Inter Medium, `--text-caption`, color at 70% opacity

### Navigation (bottom tab bar — mobile)

- Background: `--prolegado-clareza` with `--shadow-md` upward
- Active tab icon: filled variant in `--prolegado-criatividade`
- Inactive: outline variant at 50% opacity of `--prolegado-constancia`
- Label below icon: `--text-caption`, Inter Medium

---

## Iconography

Two separate icon systems — DO NOT MIX:

### 1. Interface icons (UI/navigation)

- Library: **Lucide** (`lucide-react` for web, `lucide-react-native` for mobile)
- Default style: **outline**, stroke 2px
- Active states: switch to **filled** equivalent (creates feedback without extra color)
- Use for: voltar, fechar, menu, busca, perfil, configurações, notificação, calendário, câmera, etc.

```jsx
// Example
import { ArrowLeft, Bell, Search } from 'lucide-react';
<ArrowLeft strokeWidth={2} size={24} />
```

### 2. Brand symbols (conceptual, for special moments)

These are the **7 official Prolegado symbols**. Located in `assets/symbols/`. Each has 3 color variants: `-orange.png`, `-offwhite.png`, `-black.png`.

| Symbol | File prefix | Meaning | When to use |
|---|---|---|---|
| Prêmio | `premio-` | Conquest, milestone | Badge unlock, achievement screen |
| Raio | `raio-` | Energy, impact, momentum | Streak active, performance boost |
| Animador | `animador-` | Celebration, joy | Goal hit, level up, member spotlight |
| Bandeira | `bandeira-` | Marker, challenge start | New challenge, milestone marker |
| Pose | `pose-` | Movement, action | Workout active, training mode |
| Comunidade | `comunidade-` | Group, belonging | Community spaces, group challenges |
| Pódio | `podio-` | Ranking, top performers | Leaderboard, rankings screen |

Brand symbols are **filled, never outlined**. Always use them at minimum 64×64px so the detail reads.

---

## Logo Usage

Files in `assets/logos/`.

**Variants available**: `symbol-orange.png`, `symbol-offwhite.png`, `symbol-black.png` (the standalone "P" symbol)

**Lockup combinations approved**:
- Symbol orange + wordmark dark on `--prolegado-clareza` background
- Symbol dark + wordmark dark on `--prolegado-criatividade` background
- Symbol offwhite + wordmark offwhite on `--prolegado-criatividade` background
- Symbol offwhite + wordmark offwhite on `--prolegado-constancia` background
- Symbol orange + wordmark offwhite on `--prolegado-constancia` background

**Clear space**: minimum equal to the height of the letter "O" in the wordmark, on all sides.

**FORBIDDEN — never do these**:
- Don't distort (no stretching, no skewing)
- Don't change the font of the wordmark
- Don't substitute or remove elements
- Don't use colors outside the palette (no blue, magenta, etc.)
- Don't rotate
- Don't alter element proportions

---

## Gamification visuals

User wants **full gamification** (points, levels, badges, streaks, achievements visible). Components needed:

- **Streak counter**: big number with `--text-number-display`, flame or `raio-` symbol next to it, color `--prolegado-criatividade` when streak is active
- **Progress bars**: track in `--prolegado-clareza` darkened, fill in `--prolegado-criatividade`, rounded `--radius-full`
- **Badges**: circular, use brand symbols inside, ring around using `--shadow-orange-glow` for newly-unlocked state
- **Level indicator**: Parabolica Bold number, suffix "nível" in Inter Medium caption
- **Leaderboard**: top 3 use `podio-` symbol, gold/silver/bronze NOT used — use `--prolegado-criatividade` for #1, descending opacity for #2 and #3

**Celebration moments earn the loudness**:
- The base interface stays calm and spacious.
- When a user hits a milestone, GO BIG: full-screen takeovers, confetti, brand symbols, haptic feedback, sound (optional).
- The contrast is the point. Calm by default → celebration when earned.

---

## Light & Dark Mode

App supports both. **Default starting mode**: light (`--prolegado-clareza` background).

**Light mode**:
- Background: `--prolegado-clareza` (`#fff7ea`)
- Surface (cards): pure white `#ffffff` OR `--prolegado-clareza` with subtle border
- Primary text: `--prolegado-constancia` (`#211d1e`)
- Secondary text: `--prolegado-constancia` at 70% opacity
- Brand accent: `--prolegado-criatividade`

**Dark mode**:
- Background: `--prolegado-constancia` (`#211d1e`)
- Surface (cards): `#2a2627` (lifted)
- Primary text: `--prolegado-clareza` (`#fff7ea`)
- Secondary text: `--prolegado-clareza` at 70% opacity
- Brand accent: `--prolegado-criatividade` (unchanged)

Implement via CSS variables that swap on `[data-theme="dark"]` (web) or theme context (React Native).

---

## Anti-patterns — NEVER DO

These will break brand consistency. Refuse to ship them.

1. ❌ Using `#FF6500` or any orange other than `#fd6413`
2. ❌ Using the Tríade as "Ambiente / Desenvolvimento / Físico" — it's **Evolução**
3. ❌ Adding emojis to UI copy
4. ❌ Using fonts other than Parabolica + Inter
5. ❌ Generic Material Design or iOS default styling (everything must FEEL Prolegado)
6. ❌ Glassmorphism, neumorphism, heavy gradients — the brand is flat with confident color blocking
7. ❌ Sharp corners everywhere (`border-radius: 0`) — medium curve is the system
8. ❌ Hard black `#000000` — always use `--prolegado-constancia` (`#211d1e`)
9. ❌ Multiple primary colors competing in one screen — laranja is THE accent, neutrals carry the rest
10. ❌ Dense layouts — the brand breathes. When in doubt, add space.
11. ❌ Stock photography that doesn't match the community feel — prefer authentic photos of real members training, or the brand symbols
12. ❌ Putting brand symbols at small sizes (under 48px) — they lose detail

---

## Quick reference for the agent

When asked to build a Prolegado UI element:

1. Read `tokens.css` (in same folder as this skill) — never reproduce values from memory
2. Use Parabolica for anything with weight (titles, buttons, numbers) and Inter for everything else
3. Default to **light mode** unless the user specifies dark
4. Use spacing tokens, never arbitrary px
5. Use Lucide outline icons for UI; brand symbols for celebratory moments
6. Add motion for ALL feedback (button press, page transitions, celebrations)
7. Keep base calm, make celebrations loud
8. Re-read this skill if you're about to do anything in the "anti-patterns" list

If in doubt about a design choice not covered here, ASK the user. Don't invent brand-level decisions.
