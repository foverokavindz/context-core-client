---
<!-- paths:
    - 'src/components/**/*.tsx'
    - 'src/**/*.component.tsx'
    - "src/**/*.tsx"     -->
---

# MUI `sx` prop limit

No JSX element may have more than **3 keys** in its `sx` prop.

```tsx
// ❌ Not allowed — 4 keys in one sx
<Box sx={{ display: 'flex', padding: 2, borderRadius: 1, gap: 2 }}>
```

## Counting rule

Count top-level keys in the `sx` object for that element, including nested selectors
(e.g. `'&:hover'`, `'&.Mui-disabled'`) — each nested selector counts as **1 key**
regardless of how many properties are inside it.

```tsx
// This is 3 keys: display, padding, '&:hover' — allowed
<Box sx={{ display: 'flex', padding: 2, '&:hover': { opacity: 0.8 } }}>
```

## When over the limit — decide where the style belongs first

Before creating a local styled file, check whether this styling is **specific to
this one component** or a **shared pattern used across the app** (e.g. the base
look of a Card, Button, or Chip that multiple features rely on — an invoice card
using the same treatment as a dashboard card).

- **Shared / reused across components → theme file, not a local styled file.**
  Add or update a `styleOverrides` / `variants` entry for that MUI component in
  the theme (e.g. `theme/components/MuiCard.ts`, merged into the main theme).
  Do **not** create a `.styled.component.tsx` for this — the theme is the single
  source of truth, and every instance of that component picks it up automatically.
  If a theme override for this component already exists, extend it there instead
  of duplicating styling in a local file.

- **Specific to this one component only → local styled file.**
    1. Create `ComponentName.styled.component.tsx` next to `ComponentName.tsx`.
    2. Move the styling into a `styled()` component there — one exported styled
       component per element that needed it.
    3. Import it into `ComponentName.tsx` and replace the raw JSX element + `sx`
       with the styled component. Pass only genuinely dynamic values as props;
       everything static belongs in the styled definition itself.

If unsure which case applies, ask before picking — search the codebase for other
uses of the same MUI base component first; two or more unrelated components
already styling it the same way is a sign it belongs in the theme.

```tsx
// ComponentName.styled.component.tsx
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const StyledCard = styled(Box)(({ theme }) => ({
	display: 'flex',
	padding: theme.spacing(2),
	borderRadius: theme.shape.borderRadius,
	gap: theme.spacing(2),
}));
```

```tsx
// ComponentName.tsx
import { StyledCard } from './ComponentName.styled.component';

<StyledCard>...</StyledCard>;
```

## No hardcoded values

Styled components (and any `sx`) must not hardcode raw design values — colors,
font sizes, spacing, border radius, shadows, breakpoints. Every value must come
from the theme via a token.

```tsx
// ❌ Not allowed — hardcoded values
export const StyledCard = styled(Box)({
	padding: '16px',
	borderRadius: '8px',
	color: '#1A1A1A',
	fontSize: '14px',
});
```

```tsx
// ✅ Correct — theme tokens
export const StyledCard = styled(Box)(({ theme }) => ({
	padding: theme.spacing(2),
	borderRadius: theme.shape.borderRadius,
	color: theme.palette.text.primary,
	fontSize: theme.typography.body2.fontSize,
}));
```

If a value doesn't have a matching token yet (e.g. a new color or a one-off font
size that's actually going to be reused), don't invent a hardcoded number in the
component. Add the token to the theme config first (`theme/tokens.ts` or the
relevant `theme/palette.ts` / `theme/typography.ts` file), then reference it from
there. The styled component should only ever read theme values, never define them.

Before adding a new token, check the existing ones — reuse over duplication.
Two components independently adding near-identical values (e.g. `#1A1A1A` and
`#1B1B1B`) is a sign they should share one token.

## Exceptions

- A single dynamic/conditional value (e.g. `sx={{ color: isActive ? 'primary.main' : 'text.secondary' }}`)
  still counts as 1 key — the 3-key limit applies regardless of whether values are
  static or conditional.
- `sx` props used purely for one-off layout overrides passed down from a parent
  (e.g. `sx={{ mt: 2 }}` on a reusable component instance) are exempt — this rule
  targets components defining their _own_ styling, not consumers positioning them.
- A genuinely one-off numeric value with no design meaning (e.g. `zIndex: 1` to
  sit one layer above a specific sibling, or a magic offset fixing a single
  third-party component's layout quirk) doesn't need a token — only colors,
  spacing, typography, radius, and shadows are required to be tokenized, since
  those are the values that recur and drift.
