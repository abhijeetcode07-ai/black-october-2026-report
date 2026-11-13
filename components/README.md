# Hero component

`ui/responsive-hero-banner.tsx` is the React + Tailwind version of the homepage hero.
It is **not** wired into the live site yet: this project is a static HTML + Bootstrap 5
+ vanilla JS site with no build step, so the hero in `index.html` + `css/style.css` is
a native, dependency-free port of the same design.

`demo.tsx` shows the props the live site uses. It is also not referenced by any page
yet — it exists as a reference for the future React app.

Keep the two implementations in sync when you change copy, colours, or spacing.

## Component API

| Prop | Type | Purpose |
| --- | --- | --- |
| `className` | `string` | Extra classes merged onto the outer `<section>` |
| `logoUrl`, `logoText` | `string` | Image wordmark, or a text fallback when no image is given |
| `backgroundImageUrl` | `string` | Hero background (Unsplash URL by default) |
| `navLinks` | `NavLink[]` | `{ label, href, isActive? }` pills |
| `ctaButtonText`, `ctaButtonHref` | `string` | White pill in the desktop nav |
| `badgeLabel`, `badgeText` | `string` | Announcement pill above the title |
| `title`, `titleLine2` | `string` | Two-line display headline |
| `description`, `metaText` | `string` | Lede and the mono metadata line |
| `primaryButtonText/Href`, `secondaryButtonText/Href` | `string` | Hero actions |
| `partnersTitle`, `partners` | `string`, `Partner[]` | Source/partner row (`label` or `logoUrl`) |

State: the only state is `mobileMenuOpen`, which toggles the mobile nav panel.
Interactions: the toggle sets `aria-expanded`/`aria-controls`, menu links close the
panel, and every interactive element has a visible `focus-visible` outline.

## Making this project shadcn-ready

The site has no `package.json`, so nothing needs uninstalling. From the project root:

```bash
npm create vite@latest . -- --template react-ts
npm install
npm install tailwindcss @tailwindcss/vite tw-animate-css lucide-react
npm install -D @types/node
```

Register the Tailwind v4 plugin and the `@` alias in `vite.config.ts`:

```ts
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
});
```

Add the matching alias to `tsconfig.json` (and `tsconfig.app.json` if present):

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

Then create `src/index.css`:

```css
@import 'tailwindcss';
@import 'tw-animate-css';

@theme inline {
  --font-serif: 'Instrument Serif', Georgia, serif;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
  --color-background: #09090b;
  --color-foreground: #fafafa;
}
```

Load the fonts in `index.html` (they are not bundled by Tailwind):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;600&display=swap"
  rel="stylesheet"
/>
```

Finally initialise shadcn and move the component into the generated app:

```bash
npx shadcn@latest init
npx shadcn@latest add button
```

`npx shadcn@latest init` creates `components.json` and expects components in
`components/ui` (or `src/components/ui` once Vite scaffolds `src/`). Keep that path:
the CLI resolves imports, registry installs (`npx shadcn@latest add button`) and path
aliases against it, so a custom folder means rewriting `components.json` aliases and
every generated import. When you scaffold with Vite, copy the file to
`src/components/ui/responsive-hero-banner.tsx` and import it from
`@/components/ui/responsive-hero-banner`.

Install the component's only runtime dependency:

```bash
npm install lucide-react
```

## Why the live site uses CSS instead

`index.html` is plain HTML rendered without a build step. A `.tsx` file cannot be
served by it, so the same layout, tokens, typography, animations and responsive
breakpoints were re-implemented in `css/style.css` under the `hero-*` and
`animate-fade-slide-in-*` classes. That keeps the site working on any static host
(and preserves `events.xml` + Bootstrap behaviour) while the React component is
ready for the migration.
