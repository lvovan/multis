# Rename Contract

**Feature**: 018-rename-to-multis  
**Date**: 2026-02-17

## Module: Text Replacements

### Purpose

Documents all literal string and text replacements required across the codebase. No new APIs or interfaces — this is a find-and-replace contract.

### UI Text Changes

| File | Location | Old Value | New Value |
|------|----------|-----------|-----------|
| `frontend/index.html` | `<title>` tag | `Turbotiply!` | `Multis!` |
| `frontend/src/pages/WelcomePage.tsx` | `<h1>` (new-player form) | `Turbotiply!` | `Multis!` |
| `frontend/src/pages/WelcomePage.tsx` | `<h1>` (player-list view) | `Turbotiply!` | `Multis!` |

### Storage Key Constants

| File | Constant | Old Value | New Value |
|------|----------|-----------|-----------|
| `frontend/src/services/playerStorage.ts` | `STORAGE_KEY` | `'turbotiply_players'` | `'multis_players'` |
| `frontend/src/services/playerStorage.ts` | test key string | `'__turbotiply_test__'` | `'__multis_test__'` |
| `frontend/src/services/sessionManager.ts` | `SESSION_KEY` | `'turbotiply_session'` | `'multis_session'` |
| `frontend/src/i18n/LanguageContext.tsx` | `STORAGE_KEY` | `'turbotiply_lang'` | `'multis_lang'` |

### Comments & JSDoc

| File | Change |
|------|--------|
| `frontend/src/types/player.ts` | JSDoc: `"turbotiply_players"` → `"multis_players"` |
| `frontend/src/i18n/LanguageContext.tsx` | Comment: `turbotiply_lang` → `multis_lang` |

### Test Files

All test files referencing hardcoded storage key strings must be updated:

| File | Old String | New String |
|------|-----------|-----------|
| `frontend/tests/integration/gameplayFlow.test.tsx` | `'turbotiply_session'` | `'multis_session'` |
| `frontend/tests/pages/MainPage.test.tsx` | `'turbotiply_session'` | `'multis_session'` |
| `frontend/tests/integration/improveMode.test.tsx` | `'turbotiply_session'` | `'multis_session'` |
| `frontend/tests/integration/scoreDisplayFlow.test.tsx` | `'turbotiply_session'` | `'multis_session'` |
| `frontend/tests/hooks/useSession.test.tsx` | `'turbotiply_session'` | `'multis_session'` |
| `frontend/tests/integration/sessionLifecycle.test.tsx` | `'turbotiply_session'` | `'multis_session'` |
| `frontend/tests/components/Header.test.tsx` | `'turbotiply_session'` | `'multis_session'` |

### Developer Documentation

| File | Change |
|------|--------|
| `.specify/memory/constitution.md` | Heading: `# Turbotiply Constitution` → `# Multis Constitution` |
| `.github/agents/copilot-instructions.md` | All references to `turbotiply_*` keys → `multis_*` keys; heading update |

### Verification

After all changes, the following command should return zero results (excluding specs/002–017):

```
grep -ri "turbotiply" frontend/ .github/ .specify/memory/ specs/018-*
```
