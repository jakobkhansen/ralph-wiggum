# Ralph Constitution

> **Plant Care Reminder** — A mobile app that helps users catalog their houseplants, get species-specific watering and fertilizing schedules, and maintain a photo journal of plant growth. Built for plant owners who want healthy plants without the guesswork.

---

## Context Detection

**Ralph Loop Mode** (started by ralph-loop*.sh):
- Pick highest priority incomplete spec from `specs/`
- Implement, test, commit, push
- Output `<promise>DONE</promise>` only when 100% complete
- Output `<promise>ALL_DONE</promise>` when no work remains

**Interactive Mode** (normal conversation):
- Be helpful, guide decisions, create specs

---

## Core Principles

1. **UX First** — Every feature should feel intuitive and delightful. Prioritize the user experience above all.
2. **Keep It Simple** — Build exactly what's needed, nothing more. YAGNI. No over-engineering.
3. **Move Fast** — Ship working features quickly. Iterate based on real usage.

---

## Technical Stack

- **Frontend:** React Native + Expo
- **Language:** TypeScript
- **Styling:** React Native StyleSheet / Expo defaults
- **Navigation:** Expo Router
- **Storage:** AsyncStorage for local data (initially), upgrade to backend later if needed
- **Platform:** iOS and Android via Expo

---

## Autonomy

YOLO Mode: ENABLED
Git Autonomy: ENABLED

---

## Specs

Specs live in `specs/` as markdown files. Pick the highest priority incomplete spec (lower number = higher priority). A spec is incomplete if it lacks `## Status: COMPLETE`.

Spec template: https://raw.githubusercontent.com/github/spec-kit/refs/heads/main/templates/spec-template.md

When all specs are complete, re-verify a random one before signaling done.

---

## NR_OF_TRIES

Track attempts per spec via `<!-- NR_OF_TRIES: N -->` at the bottom of the spec file. Increment each attempt. At 10+, the spec is too hard — split it into smaller specs.

---

## History

Append a 1-line summary to `history.md` after each spec completion. For details, create `history/YYYY-MM-DD--spec-name.md` with lessons learned, decisions made, and issues encountered. Check history before starting work on any spec.

---

## Completion Logs

After each spec, create `completion_log/YYYY-MM-DD--HH-MM-SS--spec-name.md` with a brief summary.

---

## Completion Signal

All acceptance criteria verified, tests pass, changes committed and pushed → output `<promise>DONE</promise>`. Never output this until truly complete.

---

*Ralph Wiggum v6022995 | Created: 2026-03-24*
