# Tasks: Rename Game to Multis

**Input**: Design documents from `/specs/018-rename-to-multis/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: No new project initialization needed — this feature modifies existing files only. This phase is intentionally empty.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Export the language storage key constant so it can be imported by the migration module. This blocks US2 migration implementation.

- [X] T001 Export language storage key as `LANG_STORAGE_KEY` from `frontend/src/i18n/LanguageContext.tsx` (rename private `STORAGE_KEY` to exported `LANG_STORAGE_KEY` and update all references within the file)

**Checkpoint**: All three storage key constants are now importable — migration module can be built.

---

## Phase 3: User Story 1 — Brand Name in UI (Priority: P1) 🎯 MVP

**Goal**: All user-visible text displays "Multis!" instead of "Turbotiply!"

**Independent Test**: Open the app, verify browser tab title is "Multis!" and welcome page heading reads "Multis!" in both views. Switch languages — name must not change.

### Implementation for User Story 1

- [X] T002 [P] [US1] Update `<title>` tag from "Turbotiply!" to "Multis!" in `frontend/index.html`
- [X] T003 [US1] Update both `<h1>` brand headings from "Turbotiply!" to "Multis!" in `frontend/src/pages/WelcomePage.tsx`

**Checkpoint**: User Story 1 complete — brand name displays as "Multis!" in browser tab and welcome screen.

---

## Phase 4: User Story 2 — Data Preservation via Storage Key Migration (Priority: P1)

**Goal**: Returning users' player profiles, scores, and language preferences are preserved when storage keys change from `turbotiply_*` to `multis_*`.

**Independent Test**: Pre-populate localStorage/sessionStorage with data under old keys, load the app, verify all data appears under new keys and old keys are removed.

### Tests for User Story 2

- [X] T004 [US2] Write migration tests in `frontend/tests/services/storageMigration.test.ts` — cover: old keys migrated, old keys removed, idempotent re-run, new keys not overwritten, mixed state, empty storage, storage unavailable (per contract)

### Implementation for User Story 2

- [X] T005 [US2] Create `migrateStorageKeys()` function in `frontend/src/services/storageMigration.ts` — import key constants from playerStorage, sessionManager, and LanguageContext; implement read-copy-delete with new-key-takes-precedence per contract
- [X] T006 [US2] Update `STORAGE_KEY` from `'turbotiply_players'` to `'multis_players'` in `frontend/src/services/playerStorage.ts`
- [X] T007 [P] [US2] Update test key string from `'__turbotiply_test__'` to `'__multis_test__'` in `frontend/src/services/playerStorage.ts`
- [X] T008 [P] [US2] Update `SESSION_KEY` from `'turbotiply_session'` to `'multis_session'` in `frontend/src/services/sessionManager.ts`
- [X] T009 [P] [US2] Update `LANG_STORAGE_KEY` from `'turbotiply_lang'` to `'multis_lang'` in `frontend/src/i18n/LanguageContext.tsx`
- [X] T010 [US2] Wire `migrateStorageKeys()` call into `frontend/src/main.tsx` — import and call synchronously before `createRoot().render()`

### Test File Updates for User Story 2

- [X] T011 [P] [US2] Update hardcoded `'turbotiply_session'` to `'multis_session'` in `frontend/tests/integration/gameplayFlow.test.tsx`
- [X] T012 [P] [US2] Update hardcoded `'turbotiply_session'` to `'multis_session'` in `frontend/tests/pages/MainPage.test.tsx`
- [X] T013 [P] [US2] Update hardcoded `'turbotiply_session'` to `'multis_session'` in `frontend/tests/integration/improveMode.test.tsx`
- [X] T014 [P] [US2] Update hardcoded `'turbotiply_session'` to `'multis_session'` in `frontend/tests/integration/scoreDisplayFlow.test.tsx`
- [X] T015 [P] [US2] Update hardcoded `'turbotiply_session'` to `'multis_session'` in `frontend/tests/hooks/useSession.test.tsx`
- [X] T016 [P] [US2] Update hardcoded `'turbotiply_session'` to `'multis_session'` in `frontend/tests/integration/sessionLifecycle.test.tsx`
- [X] T017 [P] [US2] Update hardcoded `'turbotiply_session'` to `'multis_session'` in `frontend/tests/components/Header.test.tsx`

**Checkpoint**: User Story 2 complete — storage keys migrated, all tests use new key names, migration runs at startup.

---

## Phase 5: User Story 3 — Internal References Consistency (Priority: P2)

**Goal**: All source code comments, JSDoc, and developer documentation reference "Multis" / "multis" instead of "Turbotiply" / "turbotiply".

**Independent Test**: Run `grep -ri "turbotiply" frontend/ .github/ .specify/memory/ specs/018-*` — zero results expected.

### Implementation for User Story 3

- [X] T018 [P] [US3] Update JSDoc comment referencing `"turbotiply_players"` to `"multis_players"` in `frontend/src/types/player.ts`
- [X] T019 [P] [US3] Update comment referencing `turbotiply_lang` to `multis_lang` in `frontend/src/i18n/LanguageContext.tsx`
- [X] T020 [P] [US3] Update heading from `# Turbotiply Constitution` to `# Multis Constitution` in `.specify/memory/constitution.md`
- [X] T021 [P] [US3] Update all `turbotiply_*` key references and heading to `multis_*` in `.github/agents/copilot-instructions.md`

**Checkpoint**: User Story 3 complete — full-text search for old name returns zero results in active codebase.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation across all stories

- [X] T022 Run full test suite (`cd frontend && npm test`) and verify all tests pass
- [X] T023 Run quickstart.md validation — verify implementation matches documented flow

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 2)**: No dependencies — can start immediately. BLOCKS US2 migration (Phase 4).
- **User Story 1 (Phase 3)**: No dependencies on other phases — can start immediately, in parallel with Phase 2.
- **User Story 2 (Phase 4)**: Depends on Phase 2 (T001 — exported key constant). T004 tests written first, then T005 implementation, then T006–T009 key renames, then T010 wiring, then T011–T017 test updates.
- **User Story 3 (Phase 5)**: No dependencies on other phases — can start in parallel with everything else (different files).
- **Polish (Phase 6)**: Depends on all user stories being complete.

### User Story Dependencies

- **US1 (P1)**: Independent — touches only `index.html` and `WelcomePage.tsx`
- **US2 (P1)**: Depends on T001 (foundational). Internal ordering: tests → migration module → key renames → wiring → test updates
- **US3 (P2)**: Independent — touches only comments, JSDoc, and documentation files

### Within User Story 2

- T004 (tests) MUST be written and FAIL before T005 (implementation)
- T005 (migration module) before T010 (wiring into main.tsx)
- T006–T009 (key renames) can happen in parallel after T005
- T011–T017 (test file updates) can happen in parallel after T006–T009

### Parallel Opportunities

- T002 + T003 (US1) can run in parallel with T001 (Foundational) and T018–T021 (US3)
- T007 + T008 + T009 can run in parallel (different files)
- T011–T017 can all run in parallel (different test files)
- T018–T021 can all run in parallel (different files)

---

## Parallel Example: Maximum Parallelism

```bash
# Batch 1 — all independent, different files:
Task T001: Export LANG_STORAGE_KEY in LanguageContext.tsx
Task T002: Update <title> in index.html
Task T003: Update <h1> headings in WelcomePage.tsx
Task T018: Update JSDoc in player.ts
Task T020: Update heading in constitution.md
Task T021: Update references in copilot-instructions.md

# Batch 2 — depends on T001:
Task T004: Write migration tests in storageMigration.test.ts

# Batch 3 — depends on T004:
Task T005: Implement migrateStorageKeys() in storageMigration.ts

# Batch 4 — depends on T005, all parallel (different files):
Task T006: Rename STORAGE_KEY in playerStorage.ts
Task T007: Rename test key in playerStorage.ts
Task T008: Rename SESSION_KEY in sessionManager.ts
Task T009: Rename LANG_STORAGE_KEY in LanguageContext.tsx
Task T019: Update comment in LanguageContext.tsx

# Batch 5 — depends on T006-T009:
Task T010: Wire migration into main.tsx

# Batch 6 — depends on T008, all parallel (different files):
Task T011: Update gameplayFlow.test.tsx
Task T012: Update MainPage.test.tsx
Task T013: Update improveMode.test.tsx
Task T014: Update scoreDisplayFlow.test.tsx
Task T015: Update useSession.test.tsx
Task T016: Update sessionLifecycle.test.tsx
Task T017: Update Header.test.tsx

# Batch 7 — depends on all above:
Task T022: Run full test suite
Task T023: Run quickstart validation
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 3: User Story 1 (T002, T003) — brand name updated
2. **STOP and VALIDATE**: Open app, verify "Multis!" displays correctly
3. This is deployable as a standalone rename, though returning users lose data until US2 ships

### Incremental Delivery

1. User Story 1 (T002–T003) → Brand visible immediately → Deploy/Demo (MVP!)
2. Foundational (T001) + User Story 2 (T004–T017) → Data migration works → Deploy/Demo
3. User Story 3 (T018–T021) → Internal consistency → Deploy/Demo
4. Polish (T022–T023) → Full validation → Final deploy

### Sequential Strategy (Single Developer)

1. T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009 → T010
2. T011–T017 (batch)
3. T018–T021 (batch)
4. T022 → T023

---

## Notes

- Total tasks: **23**
- Tasks per user story: US1 = 2, US2 = 14 (including tests), US3 = 4, Foundational = 1, Polish = 2
- Parallel opportunities: 6 batches can be parallelized (see example above)
- Each user story is independently testable
- Suggested MVP scope: User Story 1 (just 2 tasks — immediate brand visibility)
- All tasks follow checklist format: checkbox, ID, labels, file paths
