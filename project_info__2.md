# Farah Origin — Codebase Overview

## Summary
Farah Origin is a Next.js e-commerce/web presence site for a handmade crochet, mehendi, and craft atelier. The site features a responsive design with dark/light theme support, a product gallery, reviews, a shopping cart, and an inquiry/ordering flow. The primary language is JavaScript (React/Next.js App Router) with Tailwind CSS for styling.

## Architecture
- **Framework**: Next.js 14+ (App Router) with React 18
- **Styling**: Tailwind CSS 3 + CSS custom properties (HSL variables) for theming
- **Theme**: `next-themes` for dark/light mode toggle with `class` strategy
- **State**: React Context (CartContext) for cart state
- **Deployment**: Static export (`out/` directory present, `next.config.js` configured for static export)
- **Entry point**: `app/layout.js` wraps the app in `CartProvider` → `ThemeProvider` → `{children}`
- **Routing**: File-based routing under `app/`

## Directory Structure
```
farah-origin/
├── app/                       # Next.js App Router pages
│   ├── layout.js              # Root layout — providers, fonts, metadata
│   ├── page.jsx               # Home page
│   ├── globals.css            # Global styles, CSS variables, theme definitions
│   ├── api/
│   │   └── inquiry/           # API route for inquiry form submission
│   ├── cart/                  # Shopping cart page
│   ├── contact-us/            # Contact page
│   ├── gallery/               # Image gallery page
│   ├── inquiry-sent/          # Post-submission confirmation
│   ├── order-confirmation/    # Post-order confirmation
│   ├── order-now/             # Order form page
│   ├── reviews/               # Reviews/testimonials page
│   └── view-collection/       # Collection catalog page
├── components/                # Reusable React components
│   ├── Navbar.jsx             # Main navigation bar (mobile + desktop)
│   ├── Footer.jsx             # Site footer
│   ├── Hero.jsx               # Homepage hero section
│   ├── About.jsx              # About section
│   ├── Collections.jsx        # Collections showcase
│   ├── CTA.jsx                # Call-to-action section
│   ├── Gallery.jsx            # Gallery grid component
│   ├── Instagram.jsx          # Instagram feed embed
│   ├── Services.jsx           # Services section
│   ├── Testimonials.jsx       # Customer testimonials carousel
│   ├── ThemeProvider.jsx      # next-themes wrapper
│   ├── ThemeToggleButton.jsx  # Dark/light toggle button
│   └── WhatsAppButton.jsx     # WhatsApp floating button
├── context/
│   └── CartContext.js          # Cart state management (React Context + useReducer)
├── data/
│   ├── gallery.js              # Gallery image data
│   └── inquiries.json          # Persisted inquiries (JSON file store)
├── public/                     # Static assets (images, icons)
├── tailwind.config.js          # Tailwind configuration with theme CSS variables
├── next.config.js             # Next.js config (static export)
└── package.json               # Dependencies and scripts
```

## Key Abstractions

### Navbar (`components/Navbar.jsx`)
- **Responsibility**: Top navigation bar with desktop links (horizontal) and mobile hamburger → full-screen overlay menu. Contains the theme toggle and "Inquire Now" CTA.
- **State**: `isOpen` (boolean) — controls mobile menu visibility
- **Key behavior**: Desktop layout uses `hidden md:flex` for the link row. Mobile uses a toggle button with `Menu`/`X` icons. Mobile drawer is a `fixed` overlay below the navbar (`top-20`), full-width, centered content, with `animate-fadeIn`.
- **Mobile UI concern**: The mobile drawer fills the entire screen (`w-full h-[calc(100vh-5rem)]`) with centered links. It does NOT use a left-drawer/sidebar pattern.

### ThemeProvider (`components/ThemeProvider.jsx`)
- **Responsibility**: Wraps children with `next-themes` ThemeProvider using `class` attribute strategy, defaulting to system preference.
- **Key detail**: Uses `attribute="class"` so Tailwind's `dark:` modifier and the `.dark` CSS class work together.

### ThemeToggleButton (`components/ThemeToggleButton.jsx`)
- **Responsibility**: Renders Sun/Moon icon button that toggles between dark and light themes.
- **Edge case**: Renders a disabled placeholder on the server to avoid hydration mismatch (uses `mounted` state flag).

### Footer (`components/Footer.jsx`)
- **Responsibility**: Site footer with quick links, support links, social media icons, and copyright.
- **Layout**: 3-column grid on desktop, stacked on mobile.

### CartContext (`context/CartContext.js`)
- **Responsibility**: Manages cart items array with `addItem`, `removeItem`, `clearCart` actions using `useReducer`.
- **State shape**: `{ items: Array<{ id, name, price, quantity, image }> }`

## Mobile Navigation — Current Behavior & Required Change

### Current Implementation (lines 37–52 of `Navbar.jsx`)
```jsx
{isOpen && (
  <div className="md:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] 
                  bg-[var(--background)] flex flex-col items-center justify-center 
                  space-y-8 text-xl animate-fadeIn">
    {/* nav links rendered here */}
  </div>
)}
```
- **Position**: Full-width overlay (`w-full`) spanning the entire viewport below the navbar
- **Content alignment**: Vertically and horizontally centered (`items-center justify-center`)
- **Animation**: Simple opacity fade-in (`animate-fadeIn`)
- **Backdrop**: No backdrop — the drawer itself covers the entire screen

### Desired Behavior: Left-Side Drawer
To make the mobile menu slide in from the left edge (a "left corner" taskbar/drawer), the following changes are needed:

1. **Narrow the drawer width** — e.g., `w-72` or `w-3/4 max-w-sm`
2. **Left-align content** — change from `items-center justify-center` to `items-start justify-start pt-8 pl-6`
3. **Add slide-from-left animation** — replace `animate-fadeIn` with a custom keyframe that translates from `-translate-x-full` to `translate-x-0`
4. **Add a backdrop overlay** — a semi-transparent overlay (`bg-black/50`) behind the drawer that can be tapped to close
5. **Prevent body scroll** — toggle `overflow-hidden` on `<body>` when drawer is open (the `.mobile-menu-open` class already exists in `globals.css` but is not wired up)

### Recommended Structure After Change
```jsx
{isOpen && (
  <>
    {/* Backdrop */}
    <div 
      className="md:hidden fixed inset-0 bg-black/50 z-40"
      onClick={() => setIsOpen(false)}
    />
    {/* Left Drawer */}
    <div className="md:hidden fixed top-20 left-0 w-72 h-[calc(100vh-5rem)] 
                    bg-[var(--background)] flex flex-col items-start justify-start 
                    pt-8 pl-6 space-y-8 text-xl shadow-2xl z-50 animate-slideIn">
      {/* nav links */}
    </div>
  </>
)}
```

### New CSS Required (in `globals.css`)
```css
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
.animate-slideIn {
  animation: slideIn 0.3s ease-out;
}
```

Alternatively, Tailwind's built-in transition utilities could be used with `translate-x-full`/`translate-x-0` classes and a stateful animation approach.

## Non-Obvious Behaviors & Design Decisions

- **Theme CSS variable strategy**: The site uses HSL CSS variables defined in `:root` and `.dark` blocks in `globals.css`. Tailwind references these via `hsl(var(--background))` in the config. This means the entire theme is driven by CSS custom properties — Tailwind's `bg-background` and `text-foreground` classes work because they map to these CSS variables.
- **No TypeScript**: Despite having `tsconfig.json`, all components use `.jsx`/`.js` extensions — the project is effectively JavaScript with a TypeScript config present (possibly for editor support).
- **Static export with API routes**: The app has `next.config.js` configured for static export, yet there's a `app/api/inquiry/route.js` API route. Static export and API routes are mutually exclusive — this means inquiries are likely handled differently in production (maybe a separate server or the API route only works in dev mode).
- **JSON file as database**: `data/inquiries.json` is used as a simple file-based store for inquiry submissions — suitable for small-scale use but will have concurrency issues under load.
- **`animate-fadeIn` is not defined in Tailwind config**: The `animate-fadeIn` class used in the Navbar is not defined in `tailwind.config.js` and no `@keyframes fadeIn` was found in `globals.css` — this animation probably does nothing at runtime (the class silently resolves to no animation).

## Module Reference

| File | Purpose |
|------|---------|
| `app/layout.js` | Root layout — loads fonts, wraps providers, sets metadata |
| `app/page.jsx` | Homepage — assembles all homepage sections (Hero, About, Services, etc.) |
| `app/globals.css` | Global CSS variables, Tailwind directives, custom animations, scrollbar styling |
| `components/Navbar.jsx` | Responsive navbar with desktop/mobile layouts and theme toggle |
| `components/Footer.jsx` | Site footer with links and social icons |
| `components/ThemeProvider.jsx` | next-themes integration wrapper |
| `components/ThemeToggleButton.jsx` | Dark/light toggle button with hydration-safe render |
| `context/CartContext.js` | Cart state via useReducer + Context |
| `data/gallery.js` | Gallery image metadata array |
| `app/api/inquiry/route.js` | POST handler for inquiry form submissions |
| `tailwind.config.js` | Tailwind color system mapped to CSS variables |

## Suggested Reading Order

1. **`app/globals.css`** — Start here to understand the theming system (CSS variables, dark mode, custom properties)
2. **`app/layout.js`** — See how fonts and providers are composed
3. **`components/Navbar.jsx`** — The component requiring the mobile drawer change; understand current structure
4. **`components/ThemeToggleButton.jsx`** — Understand the hydration-safe pattern used for client-side features
5. **`context/CartContext.js`** — See the state management pattern (useReducer + Context)
6. **`tailwind.config.js`** — How CSS variables are wired into Tailwind utility classes

---

**Note**: I am in **Explore Mode** — I can analyze and document the codebase, but I cannot make code changes. To implement the mobile drawer change (switching from full-screen centered overlay to left-side slide-in drawer), please switch to **Act Mode** using the mode selector at the bottom of the chat. My analysis above provides the exact code changes needed in `components/Navbar.jsx` and `app/globals.css` — those will carry over as context for implementation.