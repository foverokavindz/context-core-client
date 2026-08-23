---
name: code-review
description: Review the current Git diff or specified files for correctness, security, performance, and React or TypeScript issues. Use after a feature is implemented, before a pull request, or when the user asks for a code review. This workflow is read-only and does not fix findings.
---

# Code Review

Review code without editing it.

## Scope

Read the repository's applicable `AGENTS.md` instructions first. By default, review the current Git diff against the base branch. If the user specifies files, a commit range, or a pull request range, review that scope instead.

Do not review generated files, lockfiles, vendored dependencies, or unrelated existing changes unless the user explicitly includes them.

If the requested diff or file set is empty, say so and stop. Do not invent findings.

## Review Priorities

Check in this order:

1. Correctness: logic errors, edge cases, loading and error states, races, and stale closures.
2. React: hook rules and dependencies, derived state, list keys, and avoidable render or remount behavior.
3. TypeScript: unsafe `any`, unjustified assertions or suppressions, and types that disagree with runtime data.
4. Security: unsafe HTML, exposed secrets or tokens, and unsanitized input in URLs, queries, or evaluation contexts.
5. Performance: expensive render work, unnecessary requests, missing deduplication, and material bundle-size regressions.
6. Testing: behavior changes without meaningful coverage and tests coupled to implementation details.
7. Project conventions: only flag a style issue when it violates `AGENTS.md`, a configured linter or formatter, or a clear local convention.

## Severity

- **Blocker** - A bug, security issue, data-loss risk, or broken behavior that must be fixed before merge.
- **Should fix** - A concrete problem that is likely to cause maintenance or product issues.
- **Nit** - A minor optional improvement. Use sparingly.

## Output

Return one structured report:

```markdown
## Code Review Summary
<One or two sentence verdict>

## Blockers
- `path/to/file.tsx:42` - <issue> - <why it matters> - <concise suggested fix>

## Should Fix
- `path/to/file.tsx:17` - <issue> - <concise suggested fix>

## Nits
- `path/to/file.tsx:8` - <issue>

## What's Good
- <One to three specific positives, only when useful>
```

Omit empty sections. Cite exact file paths and line numbers. Lead with findings and keep the summary concise. Do not edit files unless the user separately asks for fixes.
