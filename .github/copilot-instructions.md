# GitHub Copilot Instructions for Portfolio Project

You are assisting with a **SvelteKit portfolio** project focused on sustainability, modern web practices, and energy efficiency.

## Core Technology Stack

- **Svelte 5.49.2+** with modern runes-based reactivity
- **SvelteKit** (latest) with prerendering
- **Tailwind CSS 4.x** for styling
- **Playwright** for E2E testing
- **JavaScript with JSDoc** for type safety (TypeScript only for tests/config)

## Critical Priorities

### 1. Energy Efficiency First 🌱

This project prioritizes **green software** and **climate adaptation**. Always consider energy impact:

**Image Optimization**

- Use `<enhanced:img>` for automatic format optimization (AVIF → WebP → JPEG)
- Always include `loading="lazy"` and `decoding="async"`
- Set quality to 50 for good balance: `?quality=50`
- Provide explicit width/height to prevent layout shift

```svelte
<enhanced:img
  src={image}
  alt="descriptive text"
  loading="lazy"
  decoding="async"
  width={800}
  height={600}
/>
```

**Bundle Optimization**

- Minimize JavaScript footprint
- Leverage SvelteKit's prerendering
- Use static generation whenever possible
- Avoid unnecessary dependencies

**Performance Patterns**

- Lazy load components when appropriate
- Use derived state instead of computed functions
- Prefer CSS over JavaScript animations
- Minimize re-renders with thoughtful reactivity

---

## Svelte 5 Modern Patterns

### Props Declaration

Use `$props()` rune with destructuring:

```javascript
let { company, isActive = false } = $props();
```

### Derived State

Use `$derived()` for computed values:

```javascript
const totalPages = $derived(Math.ceil(items.length / pageSize));
const isValid = $derived(email.length > 0 && email.includes("@"));
```

### Effects

Use `$effect()` for side effects:

```javascript
$effect(() => {
  // Runs when dependencies change
  console.log(`Current page: ${currentPage}`);
});
```

### Bindable Props

For two-way binding:

```javascript
let { value = $bindable("") } = $props();
```

### Component Structure Pattern

```svelte
<script>
  // 1. Imports
  import Component from "./Component.svelte";

  // 2. Props
  let { data, count = 0 } = $props();

  // 3. Derived state
  const doubled = $derived(count * 2);

  // 4. Effects
  $effect(() => {
    // side effects
  });
</script>

<!-- 5. Markup -->
<div class="container">
  {#if data}
    <!-- content -->
  {/if}
</div>

<!-- 6. Scoped styles (only when Tailwind isn't sufficient) -->
<style>
  .container {
    /* Complex animations, grid layouts, or media queries */
  }
</style>
```

---

## Tailwind CSS Usage

### Configuration

- Dark mode: class-based (`dark:` prefix)
- Custom breakpoints: `sm: 375px`, `md: 550px`, `lg: 1000px`
- Custom fonts: `font-Cormorant`, `font-Poppins`, `font-Roboto`

### Patterns

✅ **DO:**

- Use long utility chains directly in markup
- Use `dark:` for all dark mode variations
- Use custom color palette (space-grey, space-white, hero-color-\*)
- Combine Tailwind with scoped styles for complex layouts

```svelte
<h1 class="font-Cormorant text-5xl text-neutral-800 md:text-6xl dark:text-neutral-100">Title</h1>
```

✅ **Gradient text effects:**

```svelte
<span class="bg-gradient-to-r from-purple-600 to-red-500 bg-clip-text text-transparent">
  Gradient Text
</span>
```

✅ **Responsive design:**

```svelte
<div class="flex flex-col text-center md:flex-row md:text-left">
  <!-- Centers on mobile, left-aligned on desktop -->
</div>
```

### When to Use Scoped CSS

- Complex animations with `@keyframes`
- Grid layouts with specific structure
- Hover states needing `:global(.dark)` wrapper
- Complex responsive behavior not achievable with utilities

---

## File Organization

```
src/
  lib/
    components/
      [feature]/        # Feature-specific: about/, blog/, icons/
    [feature]/          # Feature modules: career/, index/
    assets/images/      # Image assets
    shared/             # Global stores, theme utilities
    utils/              # Pure utilities
    data/               # JSON data files
  routes/               # SvelteKit routes
  blog/                 # Markdown blog posts
```

### Naming Conventions

- **Components:** PascalCase (`BlogListItem.svelte`, `NavItem.svelte`)
- **Utilities:** camelCase (`utils.js`, `theme.js`)
- **Routes:** SvelteKit convention (`+page.svelte`, `+layout.svelte`)
- **Markdown:** kebab-case (`sustainable-web-manifesto.md`)
- **Data:** lowercase (`companies.json`)

---

## Playwright Testing

### Test Structure

```typescript
import { test, expect } from "@playwright/test";

test.describe("Feature Name", () => {
  test("should do something specific", async ({ page }) => {
    await page.goto("/route");

    // Wait for dynamic content
    await page.waitForSelector("ul.flex.flex-col");

    // Use role-based selectors when possible
    const heading = page.getByRole("heading", { name: "Expected Text" });
    await expect(heading).toBeVisible();

    // Verify count
    const items = await page.locator("a.font-Poppins").all();
    expect(items.length).toBeGreaterThan(0);
  });
});
```

### Selector Priority

1. **Role-based:** `page.getByRole('button', { name: 'Submit' })`
2. **Text-based:** `page.getByText('Click me')`
3. **CSS selectors:** `page.locator('.class-name')` (when specific targeting needed)

### Dark Mode Testing

```typescript
// Check computed styles
const element = page.locator(".theme-element");
const bgColor = await element.evaluate((el) => window.getComputedStyle(el).backgroundColor);
expect(bgColor).toBe("rgb(23, 23, 23)"); // dark mode value
```

### Write Tests For

- Page rendering and navigation
- Dynamic content loading
- Theme switching (light/dark)
- Responsive behavior
- Accessibility (ARIA, semantic HTML)

---

## Accessibility Requirements

### Always Include

✅ **Alt text** for all images (descriptive, not decorative)
✅ **Width/height** attributes to prevent layout shift
✅ **ARIA labels** for icon buttons and non-text controls
✅ **Semantic HTML:** `<nav>`, `<main>`, `<footer>`, proper heading hierarchy
✅ **Keyboard navigation** support

```svelte
<!-- Icon button example -->
<button aria-label="Toggle dark mode" onclick={toggleTheme}>
  <SunIcon />
</button>

<!-- Image example -->
<img src={image} alt="Portrait of Antonio at the beach" width={400} height={400} />
```

---

## Dark Mode Implementation

### HTML Class-Based

```svelte
<div class="bg-white text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100">
  Content adapts to theme
</div>
```

### Scoped Styles

```css
.element:hover {
  background-color: rgba(203, 213, 225, 0.1);
}

:global(.dark) .element:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
```

### Theme Toggle

Use existing theme store from `$lib/shared/theme.js` for consistency.

---

## Type Safety

### JSDoc for Props

```javascript
/**
 * @typedef {Object} Props
 * @property {string} title - The component title
 * @property {boolean} [isActive] - Optional active state
 * @property {Array<{id: string, name: string}>} items - Array of items
 */

/** @type {Props} */
let { title, isActive = false, items } = $props();
```

### TypeScript Only For

- Test files (`.test.ts`)
- Configuration files (`.config.ts`)

---

## State Management

### Local State

Use Svelte 5 runes for local reactivity.

### Global State

Use Svelte stores (writable/readable):

```javascript
import { writable } from "svelte/store";

export const theme = writable("light");
```

### With localStorage

Use the custom `createWritableStore` from `$lib/shared/store.js`:

```javascript
import { createWritableStore } from "$lib/shared/store";

export const userPrefs = createWritableStore("prefs", defaultValue);
userPrefs.useLocalStorage(); // Enable persistence
```

---

## Data Fetching

### Load Functions

```javascript
// +page.js
export async function load({ params }) {
  // Fetch data at build time
  const posts = await fetchPosts();
  return { posts };
}
```

### Dynamic Imports

```javascript
const modules = import.meta.glob("../blog/*.md");
```

---

## Code Style Guidelines

### Formatting

- **Indentation:** 2 spaces
- **Quotes:** Single quotes for JS, double for HTML attributes
- **Semicolons:** Consistent usage (present in codebase)
- **Line length:** Break long Tailwind class chains naturally

### Comments

- JSDoc for component APIs
- Inline comments for complex logic
- Focus on "why" not "what"

### Imports

```javascript
// 1. External dependencies
import { writable } from "svelte/store";

// 2. $lib imports
import Component from "$lib/components/Component.svelte";
import { utils } from "$lib/utils/utils.js";

// 3. Relative imports
import LocalComponent from "./LocalComponent.svelte";
```

---

## Common Patterns

### List Rendering

```svelte
{#each items as item (item.id)}
  <ListItem {item} />
{/each}
```

### Conditional Rendering

```svelte
{#if condition}
  <Component />
{:else if otherCondition}
  <OtherComponent />
{:else}
  <Fallback />
{/if}
```

### Event Handling

```svelte
<button onclick={handleClick}>Click</button>
<input oninput={(e) => (value = e.target.value)} />
```

### Slots and Children

```svelte
<!-- Parent -->
<Wrapper>
  <p>Content goes here</p>
</Wrapper>

<!-- Wrapper component -->
<div class="wrapper">
  {@render children?.()}
</div>
```

---

## Key Reminders

🌱 **Energy efficiency is not optional** - it's a core value

- Optimize images aggressively
- Minimize JavaScript
- Use prerendering
- Lazy load when appropriate

🎨 **Tailwind first, scoped CSS when needed**

- Most styling via utilities
- Scoped for animations, complex layouts, hover states with dark mode

🧪 **Test everything with Playwright**

- E2E tests for all pages
- Role-based selectors
- Test dark mode behavior

♿ **Accessibility is required**

- Semantic HTML
- ARIA labels
- Alt text
- Keyboard navigation

⚡ **Modern Svelte 5 patterns always**

- Use runes: `$props()`, `$derived()`, `$effect()`
- No legacy reactive declarations (`$:`)
- Snippet-based children rendering

---

## Questions to Ask

When generating code, consider:

1. Is this the most energy-efficient approach?
2. Are images properly optimized?
3. Is this accessible?
4. Does this work in dark mode?
5. Should this have a Playwright test?
6. Am I using Svelte 5 runes correctly?
7. Is the responsive design mobile-first?

---

**Remember:** This portfolio represents values of sustainability and thoughtful engineering. Every line of code should reflect that commitment.
