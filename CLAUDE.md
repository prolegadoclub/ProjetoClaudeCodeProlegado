# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack project — stack not yet defined. Update this file once the technologies are chosen.

## Git & GitHub Configuration

- **User:** LucasProlegado
- **Email:** prolegadoclub@gmail.com
- **Git binary (Windows):** `C:\Program Files\Git\cmd\git.exe` (reopen terminal after install to use `git` directly)
- **GitHub repo:** https://github.com/prolegadoclub/ProjetoClaudeCodeProlegado
- **GitHub CLI:** `gh` (authenticated as `prolegadoclub`, installed via winget)
- **Remote:** `origin` → HTTPS, branch `master`

## Auto-sync to GitHub

A `Stop` hook in `.claude/settings.json` runs automatically at the end of every Claude response.
It checks for uncommitted changes and, if any exist, commits and pushes them to GitHub:

```powershell
git status --porcelain   # detect changes
git add -A
git commit -m "auto: update <timestamp>"
git push origin
```

To manage the hook: open `/hooks` in Claude Code, or edit `.claude/settings.json` directly.
To push manually: `git push origin` in the project terminal.

## Commands

> Fill in once the stack is defined.

```bash
# Install dependencies
# <command here>

# Run development server
# <command here>

# Run tests
# <command here>

# Build for production
# <command here>

# Lint
# <command here>
```

## Architecture

> Document the high-level architecture here once the project structure is established.
>
> Suggested sections:
> - **Frontend** — framework, routing, state management
> - **Backend** — framework, API style (REST/GraphQL), auth strategy
> - **Database** — engine, ORM/query layer, migration tool
> - **Shared** — monorepo layout, shared types/utils if any
