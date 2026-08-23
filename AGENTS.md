# Context Core Client - Agent Guide

This file is the canonical, tool-neutral source of project instructions. It applies to the entire repository. Tool-specific instruction files are compatibility adapters only and must not define competing project rules.

## Project

- React 19 + TypeScript 6 application built with Vite 8.
- Material UI 9 is the primary component and theming library.
- Axios is wrapped by the transport layer in `src/api/`.
- React Router owns client-side routing.

## Architecture

- Entry point (`src/main.tsx`) wraps `App` in `ThemeProvider(theme)` + `CssBaseline`. `App.tsx` just renders `RouterProvider` for the router defined in `src/router/Router.tsx`.
- Routing is a single tree under `MainLayout` (`src/layouts/MainLayout.tsx`), which takes `sidebar`/`topBar` as props (`NavSidebar`, `TopBar`) and renders page routes through `<Outlet />`. The index route redirects to `/chat`.
- Adding a route means touching three places together: a page in `src/pages/`, a route entry in `src/router/Router.tsx`, and a nav entry in `src/configs/Navigation.configs.tsx` (consumed by `NavSidebar`).
- Pages in `src/pages/*.tsx` are thin wrappers that compose a feature module; they hold no logic themselves (e.g. `Chat.tsx` only renders `ChatPanel`).
- Feature code lives under `src/features/<feature>/` and follows a layered structure — use the `chat` feature as the reference:
  - `screens/` — top-level views for a mode of the feature (e.g. `NewChat.screen.tsx`, `ChatConversation.screen.tsx`).
  - `panels/` — stateful composition root that switches between screens and owns local state (`Chat.panel.tsx`), plus secondary panels (`History.panel.tsx`).
  - `sections/<screen>/` — the pieces a screen is built from (e.g. `sections/chat/TitleBar.section.tsx`).
  - `<feature>.types.ts` / `<feature>.mock.ts` — feature-local types and mock data, separate from `src/types/`.
- The API transport layer (`src/api/IApiClient.ts`, `src/api/AxiosClient.ts` singleton via `getApiClient()`, `src/configs/api.configs.ts`, `src/types/api.types.ts`) exists but no `src/services/*.ts` entities have been added yet — the first one should follow `.agents/skills/api-integration/SKILL.md` exactly rather than inventing a new shape.
- `src/theme/theme.ts` augments the MUI theme with a `theme.tokens.*` namespace (surface levels, radius scale, dual-shadow elevation, motion) carried over from a legacy CSS mockup that doesn't map onto MUI's palette/shadow slots directly — prefer `theme.tokens.*` for those values instead of hardcoding or stretching `Palette`.
- No path aliases are configured (`tsconfig.app.json`, `vite.config.ts`) — imports are relative throughout.
- Icons come from `lucide-react`, not `@mui/icons-material`.

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

## Path-Scoped Rules

Rules that apply only to files under specific paths live in `.claude/rules/` as one file per rule, each with a `paths:` frontmatter glob. Claude Code auto-loads a matching rule when a matching file is opened or edited; other agents don't get this automatically and must check this directory before touching a matching path.

- `.claude/rules/mui-sx-limit.md` (`src/components/**/*.tsx`, `src/**/*.component.tsx`) - no JSX element's `sx` prop may have more than 3 top-level keys (each nested selector, e.g. `&:hover`, counts as 1). Over the limit: styling shared across components belongs in the theme (`styleOverrides`/`variants`); styling specific to one component belongs in a co-located `ComponentName.styled.component.tsx`.

When adding a new rule file, add a corresponding entry here so agents that can't discover `.claude/rules/` natively still find it.

## API Invariants

- Preserve the existing `ApiResponse<T>` envelope.
- Service calls return unsuccessful responses instead of throwing to components.
- Components branch on `response.success` rather than adding `try/catch` around normal service calls.
- Follow the repository's actual filenames and route casing, even when skill examples use placeholders.

## Review and Verification

- Review generated output and changed files before finishing.
- Report checks that were run and any checks that could not be run.
- For reviews, prioritize correctness, security, regressions, and missing tests over stylistic preferences.
