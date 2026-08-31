# Nimbus Admin

A back-office admin console for managing software licenses, business usage, and
product updates — built as a **front-end work sample** to demonstrate
production-grade React + TypeScript architecture.

> **About this repository.** This is a portfolio piece. It has **no backend** —
> every data source is an in-memory mock, and authentication is simulated
> client-side (see [Security model](#security-model)). Company-specific names and
> data have been anonymized. The focus here is architecture, typing discipline,
> and component design, not feature completeness.

<!-- Replace with real screenshots or a GIF once deployed -->
<p align="center">
  <img src="docs/screenshots/signin.png" alt="Sign-in screen" width="49%" />
  <img src="docs/screenshots/dashboard.png" alt="Dashboard" width="49%" />
</p>

---

## Tech stack

| Concern | Choice |
| --- | --- |
| UI runtime | **React 19** (with the **React Compiler** enabled) |
| Language | **TypeScript 5.9** in `strict` mode |
| Build tool | **Vite 7** |
| Routing | **TanStack Router** (type-safe, routes-as-data) |
| UI kit | **MUI 7** + Emotion, wrapped in a small in-house design system |
| Forms & validation | **react-hook-form** + **Zod** (via a typed `useForm` facade) |
| HTTP | **Axios** behind a custom `useApi` hook |
| Dates | **date-fns** + MUI X date pickers |

---

## Quick start

Requires **Node ≥ 20.19** (Vite 7) and npm.

```bash
npm install
cp .env.example .env      # optional; the app runs fully on mocks without it
npm run dev               # start the dev server (http://localhost:5173)
```

Other scripts:

```bash
npm run build         # type-check (tsc -b) + production build
npm run preview       # serve the production build locally
npm run typecheck     # type-check only
npm run lint          # ESLint
npm run lint:fix      # ESLint with autofix
npm run format        # Prettier write
npm run format:check  # Prettier check (CI-friendly)
```

### Demo credentials

Auth is mocked. Sign in with any of these (password `demo1234`) to see how the
UI adapts per role:

| Email | Role |
| --- | --- |
| `admin@example.com` | admin |
| `pm@example.com` | project-manager |
| `assistant@example.com` | assistant |
| `developer@example.com` | developer |

---

## Architecture

### Layered, numbered folders

`src/` is organized into numbered layers that make the intended **dependency
direction** obvious at a glance — lower numbers are lower-level and never import
from higher ones:

```
src/
  0.Components/    Feature modules (the app's screens)
  1.API/           HTTP client, request hooks, API modules
  2.Context/       Global React context (auth)
  3.Theme/         Design system: atoms → molecules → components → layouts
  4.Routing/       Route definitions, router, guards, navigation
  5.Utils/         Reusable hooks (useForm, useStepper) and libraries
  6.Config/        Runtime config from env
```

Path aliases (`@/`, `@atoms/`, `@api/`, …) are configured in both
`tsconfig.app.json` and `vite.config.ts` so imports stay flat regardless of
nesting depth.

### The Container / Logic / UI / Interfaces pattern

Every feature under `0.Components` follows the same four-layer split. This keeps
rendering, state, and types decoupled and independently testable:

```
SomeFeature/
  Container/     Composition root — wires hooks to UI, owns the render switch
  Logic/         Custom hooks (use*) — state, data fetching, validation
  UI/            Presentational components (dumb, prop-driven, memoized)
  Interfaces/    Types, Zod schemas, static config dictionaries
```

- **Container** components do no styling and no data access; they call a Logic
  hook and map its result to UI. See
  [`Sidebar.tsx`](src/0.Components/0.Sidebar/Container/Sidebar.tsx) for the
  cleanest example.
- **Logic** hooks return a flat object of state + handlers. The CreateLicense
  wizard's
  [`useCreateLicenseForm.ts`](src/0.Components/2.LicenseManagement/CreateLicense/Logic/useCreateLicenseForm.ts)
  owns a multi-step Zod schema with cross-field refinements and a per-step
  validation dispatcher.
- **UI** components are `memo`-wrapped, receive explicit props, and hold only
  transient UI state (a `showPassword` toggle, etc.).

### Design system (`3.Theme`)

A small set of `AG*` primitives wrap MUI with a consistent `variant`/`size` API,
built with `styled(..., { name, slot })`, `forwardRef`, and `displayName` — e.g.
[`AGFormComponent.tsx`](src/3.Theme/0.Atoms/AGFormComponent.tsx) (exposing
`AGTextField`/`AGCheckbox`/`AGDateField`) and
[`AGBadge.tsx`](src/3.Theme/0.Atoms/AGBadge.tsx). Atoms compose into molecules
(`AGDataBox` KPI tiles) and components (a headless-driven `Stepper`).

### Reusable hooks (`5.Utils`)

Two headless abstractions do the heavy lifting and are documented with runnable
`*.example.tsx` files:

- [`useForm`](src/5.Utils/1.Hooks/form/useForm.ts) — a fully generic facade over
  react-hook-form + Zod. One schema yields both the runtime validator and the
  inferred TS type. Adds `getFieldProps()` (spread straight onto an MUI field),
  a submit wrapper that maps thrown `ZodError` paths back onto the right fields,
  a `submissionError` channel for API errors, and `transformOnSubmit`.
- [`useStepper`](src/5.Utils/1.Hooks/stepper/useStepper.ts) — headless wizard
  state with async per-step `validate()` guards, linear/non-linear modes, and
  derived progress. The rendering lives separately in
  [`Stepper.tsx`](src/3.Theme/2.Components/Stepper.tsx).

### Routing (`4.Routing`)

Routes are defined **as data**
([`routes.tsx`](src/4.Routing/routes.tsx)) using `link`/`collapse`/`title`/
`divider` builders, each carrying `permissions`. This single source of truth
drives both the sidebar (filtered by role via `getRoutesForRole`) and the
TanStack Router tree ([`router.tsx`](src/4.Routing/router.tsx)). Authenticated
routes sit under a layout route whose `beforeLoad` guard redirects
unauthenticated users to `/signin`.

### State management

Deliberately **no global state library**. State lives at the smallest scope that
owns it:

1. **Context (one)** — [`Auth.context.tsx`](src/2.Context/Auth.context.tsx), a
   `useReducer` + `useMemo` store hydrated from `localStorage`, accessed only
   through granular selector hooks (`useCurrentUser`, `useRole`,
   `usePermission`, …) that throw outside the provider.
2. **Feature hooks** — data, forms, modals, and wizard state co-located with each
   feature in its `Logic/` folder.
3. **Component `useState`** — transient UI only.

**Trade-off:** with no server-state layer, each list re-implements
`loading`/`error`/pagination by hand. The clear next step is **TanStack Query**
for caching, dedup, and invalidation — see the roadmap.

---

## Security model

This is a front-end sample, but the auth-adjacent behavior was hardened so the
patterns are correct rather than merely demonstrative:

- **Single token store.** All token reads/writes go through
  [`1.API/core/token.ts`](src/1.API/core/token.ts). (Previously three different
  `localStorage` keys were used, so the API layer never saw the token the auth
  context wrote.)
- **Credential validation.** The mock login actually verifies email + password
  against known demo accounts and rejects everything else, instead of
  always succeeding.
- **No plaintext-password handling.** The license-creation flow no longer
  collects a provisional end-user password; the (mock) flow issues an activation
  link instead — an admin should never set or see another user's password.
- **401 handling.** The Axios interceptors clear the token and redirect to
  `/signin` on `401`.
- **No secrets, no payload logging.** No credentials or tokens live in the repo
  or its history; all `console.log`s of form data were removed.

**Known limitation (by design):** the bearer token is kept in `localStorage`,
which is readable by any script on the page (XSS-exfiltratable), and route guards
are **client-side only**. A real deployment must move to an `httpOnly`, `Secure`,
`SameSite` cookie issued by the backend and enforce authorization server-side.
This is documented rather than hidden.

---

## Engineering standards

- **TypeScript** — `strict`, `noUnusedLocals`/`noUnusedParameters`,
  `noImplicitOverride`, `forceConsistentCasingInFileNames`, and
  `noUncheckedSideEffectImports` (see [`tsconfig.app.json`](tsconfig.app.json)).
  `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` are recommended
  next once a full type pass is run.
- **ESLint** ([`eslint.config.js`](eslint.config.js)) — flat config extending
  the JS, typescript-eslint, React Hooks, and React Refresh recommended sets,
  plus project rules (`no-console`, `eqeqeq`, `prefer-const`, unused-vars with
  `^_` escape hatch). `eslint-config-prettier` is applied last to avoid
  formatting conflicts.
- **Prettier** ([`.prettierrc.json`](.prettierrc.json)) + **EditorConfig** — a
  single formatting authority to end mixed tabs/quotes.

---

## Roadmap & known gaps

This is an intentionally-scoped sample. The following are **built but not wired
into the router**, or are natural next steps — listed here honestly rather than
presented as finished:

**Screens present in the codebase, disabled in the router** (re-enable in
[`routes.tsx`](src/4.Routing/routes.tsx)):
- [ ] License management: Create (9-step wizard), Manage (searchable table),
      Permissions editor
- [ ] Project-Manager dashboard (KPI tiles + at-risk-client actions)
- [ ] Business usage report

**Platform gaps worth closing next:**
- [ ] **Server-state layer** (TanStack Query) to replace hand-rolled fetch state
- [ ] **MUI `ThemeProvider` + design tokens** — the `AG*` atoms are token-ready,
      but no custom theme/`CssBaseline` is mounted yet, so MUI defaults apply
- [ ] **Dark mode** via `colorSchemes`
- [ ] **Global UX services** — toast/snackbar, error boundary, confirm dialog
- [ ] **i18n** — UI copy is currently mixed English/Italian
- [ ] **Mock layer via MSW** to unify the scattered in-memory mocks
- [ ] **Tests + CI** — Vitest + Testing Library, highest-value first on
      `useForm` and `useStepper`

---

## Project structure

```
src/
├── 0.Components/
│   ├── 0.Sidebar/            Role-filtered navigation
│   ├── 1.Auth/               Sign-in (mocked)
│   ├── 2.LicenseManagement/  Create / Manage / Permissions / Justification
│   ├── 3.Dashboards/         Admin + PM dashboards
│   └── 4.AdminUtilities/     Updates / Business usage / Ticketing
├── 1.API/                    Axios client, useApi hook, API modules
├── 2.Context/                Auth context + selector hooks
├── 3.Theme/                  Design system (atoms → layouts)
├── 4.Routing/                Routes-as-data, router, guards
├── 5.Utils/                  useForm, useStepper, shared libraries
└── 6.Config/                 Env-driven config
```
