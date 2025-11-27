# Analytics Demo

This document covers how to run the project, use the Tailwind color variables, create routes with the Next.js App Router, where to place components, how to use translations, and the atomic structure for new pages.

## 1) Run and build

Prerequisites:
- Node.js 18+
- Yarn Classic (1.x)

Install dependencies, run in development, build, and start in production:

    # Install deps
    yarn

    # Run dev
    yarn dev

    # Build
    yarn build

    # Start production
    yarn start


## 2) Tailwind color variables

- All color variables are defined in `src/globals.css` as CSS custom properties (hex values) in kebab-case, e.g. `--orange-700`, `--gray-light-mode-900`, `--gray-dark-mode-25`, etc.
- Use them via Tailwind v3 arbitrary values in your class names:

    - Background: `bg-[var(--orange-700)]`
    - Text: `text-[var(--gray-light-mode-900)]`
    - Border: `border-[var(--gray-neutral-200)]`
    - Dark mode variants (class-based): `dark:bg-[var(--gray-dark-mode-900)]`, `dark:text-[var(--gray-dark-mode-25)]`

Examples from the codebase:
- Root layout applies base background/text colors:
  - `src/app/layout.tsx` → `<body className="... bg-[var(--gray-light-mode-25)] text-[var(--gray-light-mode-900)] dark:bg-[var(--gray-dark-mode-900)] dark:text-[var(--gray-dark-mode-25)]">`
- A page using a palette color:
  - `src/app/(dashboard)/home/page.tsx` → `<div className="h-full w-full bg-[var(--orange-700)]">...</div>`

## 3) Create routes in the App Router

This project uses the Next.js App Router (the `src/app` directory).

- Create a route by adding a folder and a `page.tsx` file:
  - `/home` → `src/app/home/page.tsx`
  - `/dashboard/reports` → `src/app/dashboard/reports/page.tsx`

- Route groups (do not affect the URL) use parentheses:
  - `/home` can live under `src/app/(dashboard)/home/page.tsx` and will still route to `/home`.

- Dynamic routes:
  - `/users/[id]` → `src/app/users/[id]/page.tsx`

Minimal example (`src/app/reports/page.tsx`):

    export default function ReportsPage() {
      return (
        <div className="p-6">
          <h1 className="text-[var(--gray-dark-mode-900)] dark:text-[var(--gray-dark-mode-25)]">
            Reports
          </h1>
        </div>
      );
    }


## 4) Components location

- Application-level/shared components should be created inside:
  - `src/app/components`
- If a page needs its own local-only components, place them inside a `components/` folder within that page’s directory (see the Atomic Structure below) and name component files in PascalCase (e.g., `FeatureWidget.tsx`).


## 5) Translations (Next Intl)

- Dictionaries live in `src/dictionaries`.
- The root layout already wraps the app with the translations provider.
- Use the hook in any client component:

    import { useTranslations } from "next-intl";

    export default function Home() {
      const t = useTranslations("home-page"); // namespace

      return (
        <div className="p-4">
          <h1>{t("welcome")}</h1>
          <p>{t("description")}</p>
        </div>
      );
    }

- Use the appropriate namespace (e.g., `"home-page"`) and keys available in the dictionaries.


## 6) Atomic structure for new pages

Every new route directory should follow this structure:

- `actions.ts` — server-side actions only (annotate with `"use server"`)
- `controller.tsx` — client-side controller to manage state/logic and orchestrate the page
- `page.tsx` — the route entry that composes your controller/content
- `content.tsx` — purely presentational layout (UI only)
- `components/` — optional folder for page-specific components (files in PascalCase)

Example tree:

    src/app/feature/
      actions.ts
      controller.tsx
      page.tsx
      content.tsx
      components/
        FeatureWidget.tsx

Example stubs:

`src/app/feature/actions.ts`:

    "use server";

    export async function doSomethingOnServer(formData: FormData) {
      // Server-only logic
      return { ok: true };
    }

`src/app/feature/controller.tsx`:

    "use client";
    import React from "react";
    import { useTranslations } from "next-intl";
    import { doSomethingOnServer } from "./actions";
    import Content from "./content";

    export default function FeatureController() {
      const t = useTranslations("feature-page");

      async function onSubmit(formData: FormData) {
        await doSomethingOnServer(formData);
      }

      return <Content t={t} onSubmit={onSubmit} />;
    }

`src/app/feature/content.tsx`:

    "use client";
    import React from "react";

    export default function Content({
      t,
      onSubmit,
    }: {
      t: (key: string) => string;
      onSubmit: (formData: FormData) => Promise<void>;
    }) {
      return (
        <div className="p-6 bg-[var(--white)] text-[var(--gray-light-mode-900)] dark:bg-[var(--gray-dark-mode-900)] dark:text-[var(--gray-dark-mode-25)]">
          <h1 className="text-2xl font-semibold">{t("title")}</h1>
          <form action={onSubmit} className="mt-4">
            <button className="rounded px-3 py-2 bg-[var(--brand-600)] text-[var(--white)] hover:bg-[var(--brand-700)]">
              {t("submit")}
            </button>
          </form>
        </div>
      );
    }

`src/app/feature/page.tsx`:

    import FeatureController from "./controller";

    export default function Page() {
      return <FeatureController />;
    }

`src/app/feature/components/FeatureWidget.tsx`:

    "use client";
    import React from "react";

    export default function FeatureWidget() {
      return (
        <div className="p-3 border border-[var(--gray-neutral-200)]">
          Widget
        </div>
      );
    }

---
