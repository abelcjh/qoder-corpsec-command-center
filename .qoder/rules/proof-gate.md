---
description: Deterministic CorpSec proof and closure rules for Credence
alwaysApply: true
---

# Credence Proof Gate

Use these rules whenever editing CorpSec domain logic, proof packets, scheduled jobs, send logs, submission copy, or AI Workbench behavior.

## Deterministic middle

- Client/company records, staff department scope, statutory rules, working-day recurrence, proof freshness, and packet IDs are the source of truth.
- AI may summarize or draft wording only at the edge; AI must not decide legal/compliance closure.
- Closure outcomes must stay typed and auditable: `BLOCK`, `NEEDS_REVIEW`, or `READY_FOR_SIGNOFF` before licensed reviewer action.
- Proof freshness should stay explainable as `Current`, `Expiring`, or `Stale` from retained evidence timestamps/cadence.

## Reviewer-safe packet fields

A proof packet should expose only safe, judge-readable fields unless a human intentionally opens more detail:

- entity/company label and rule/deadline;
- staff owner and recipient role/channel;
- source/provider/message ID field when fixture-backed or available;
- message/evidence snapshot and unresolved-risk note;
- freshness status and deterministic packet ID / chain head;
- authority controls such as staff identity, no-send boundary, human-review policy, deterministic rule authority, and no-secret export.

## Verification expectation

If any proof/status wording or UI is changed, add or update verifier assertions in `scripts/verify.mts`, then run:

```bash
npm run build && npm run verify
```

Do not leave docs claiming a proof surface that the source or verifier no longer contains.
