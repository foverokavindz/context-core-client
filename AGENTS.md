# Context Core Client - Agent Guide

This file is the canonical, tool-neutral source of project instructions. It applies to the entire repository. Tool-specific instruction files are compatibility adapters only and must not define competing project rules.

## Project

- React 19 + TypeScript 6 application built with Vite 8.
- Material UI 9 is the primary component and theming library.
- Axios is wrapped by the transport layer in `src/api/`.
- React Router owns client-side routing.

## Commands

- Install dependencies: `npm install`
- Start development: `npm run dev`
- Lint: `npm run lint`
- Type-check and build: `npm run build`
- Preview the production build: `npm run preview`
- There is currently no automated test script in `package.json`.

Run `npm run lint` and `npm run build` after code changes unless the task is documentation-only or the user asks for a narrower check.

## Working Conventions

- Preserve unrelated work in the working tree. Do not revert or overwrite changes outside the task.
- Follow the existing TypeScript style and the repository's Oxlint and TypeScript configuration.
- Use `import type` for type-only imports because `verbatimModuleSyntax` is enabled.
- Reuse the theme in `src/theme/theme.ts` and its tokens before introducing one-off visual values.
- Inspect existing paths and naming before adding files; do not normalize naming as part of an unrelated task.
- Keep secrets out of source control. Document new environment variables in `.env.example`.

## Portable Skills

Reusable workflows live in `.agents/skills/` and follow the open Agent Skills `SKILL.md` format. Before acting, match the task against the descriptions below. If one matches, read its complete `SKILL.md` before making changes, then load only the referenced resources needed for the task.

- API work: `.agents/skills/api-integration/SKILL.md` - add, change, or consume REST endpoints through the project's API client, services, types, and React components.
- MUI work: `.agents/skills/web-ui-mui/SKILL.md` - build or change React interfaces using Material UI, theming, layout, forms, feedback, navigation, or MUI X.
- Code review: `.agents/skills/code-review/SKILL.md` - review a diff or specified files without editing them.

If an agent does not natively discover `.agents/skills/`, this registry is the discovery mechanism: open the matching file directly and follow it. When multiple skills apply, follow all relevant skills and resolve conflicts in favor of this file and the user's current request.

## API Invariants

- Preserve the existing `ApiResponse<T>` envelope.
- Service calls return unsuccessful responses instead of throwing to components.
- Components branch on `response.success` rather than adding `try/catch` around normal service calls.
- Follow the repository's actual filenames and route casing, even when skill examples use placeholders.

## Review and Verification

- Review generated output and changed files before finishing.
- Report checks that were run and any checks that could not be run.
- For reviews, prioritize correctness, security, regressions, and missing tests over stylistic preferences.
