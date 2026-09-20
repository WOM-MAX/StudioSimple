---
name: Estudio Simple
colors:
  surface: '#101415'
  surface-dim: '#101415'
  surface-bright: '#363a3b'
  surface-container-lowest: '#0b0f10'
  surface-container-low: '#191c1e'
  surface-container: '#1d2022'
  surface-container-high: '#272a2c'
  surface-container-highest: '#323537'
  on-surface: '#e0e3e5'
  on-surface-variant: '#c3c6d1'
  inverse-surface: '#e0e3e5'
  inverse-on-surface: '#2d3133'
  outline: '#8d909b'
  outline-variant: '#434750'
  surface-tint: '#abc7ff'
  primary: '#abc7ff'
  on-primary: '#002f66'
  primary-container: '#123a72'
  on-primary-container: '#85a6e4'
  inverse-primary: '#3c5e98'
  secondary: '#ffb786'
  on-secondary: '#502400'
  secondary-container: '#f27a00'
  on-secondary-container: '#542600'
  tertiary: '#57d6f3'
  on-tertiary: '#003640'
  tertiary-container: '#00414d'
  on-tertiary-container: '#24b4d0'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#abc7ff'
  on-primary-fixed: '#001b3f'
  on-primary-fixed-variant: '#22467f'
  secondary-fixed: '#ffdcc6'
  secondary-fixed-dim: '#ffb786'
  on-secondary-fixed: '#311300'
  on-secondary-fixed-variant: '#723600'
  tertiary-fixed: '#abedff'
  tertiary-fixed-dim: '#57d6f3'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#101415'
  on-background: '#e0e3e5'
  surface-variant: '#323537'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style
The design system is anchored in the concept of "Guided Clarity." It targets parents of 3rd to 8th graders, balancing the authority of an educational institution with the approachability of a supportive tutor. The visual language is **Corporate Modern with a Playful Edge**, utilizing deep architectural blues to instill trust, punctuated by vibrant, energetic accents that signal progress and success.

The emotional response should be one of "empowered calm." By using structured layouts like Bento grids and smooth, purposeful animations, the UI removes the cognitive load often associated with tracking a child's academic journey. The aesthetic is premium and polished, avoiding "childish" tropes in favor of a sophisticated, high-end educational tool for the modern family.

## Colors
The palette is dominated by **Midnight Blue (#123A72)**, which serves as the canvas for the entire experience, creating a focused, high-contrast environment. 

- **Primary Canvas:** #123A72 is used for deep backgrounds and primary navigation containers.
- **Action/CTA:** **Vivid Orange (#F57C00)** is reserved strictly for primary actions and "Start" buttons to ensure high visibility against the blue.
- **Progression:** **Turquoise (#18AFCB)** tracks active growth and movement.
- **Supportive Feedback:** **Green (#4CAF50)** identifies completed tasks and helpful parent tips, while **Yellow (#FBC02D)** is used exclusively for achievement markers like stars and badges.
- **Text & Surfaces:** A range of cool grays derived from the neutral base ensures legibility, with pure white reserved for high-priority body text.

## Typography
This design system utilizes a tiered typography strategy. **Montserrat** is used for all headings to provide a bold, geometric, and modern feel that resonates with a "premium" brand. **Inter** is used for body copy and UI labels to ensure maximum readability and a systematic, clean look.

Headlines should use tight letter-spacing to appear more impactful. Large display type on desktop scales down significantly for mobile to maintain a balanced hierarchy within the Bento grid containers.

## Layout & Spacing
The layout follows a **Bento Grid** philosophy, where content is organized into logical, rounded rectangular modules of varying sizes. This approach allows for a "glanceable" dashboard where parents can see multiple data points (grades, tips, progress) simultaneously.

- **Grid:** Use a 12-column grid for desktop and a 4-column grid for mobile.
- **Rhythm:** An 8px base unit governs all spacing.
- **Bento Modules:** Components should snap to the grid with consistent 24px gutters. On mobile, modules stack vertically, maintaining their internal 2XL roundedness.
- **Cascade Navigation:** The dashboard navigation uses a "cascading" reveal, where selecting a high-level category (e.g., "Student Name") slides in a sub-layer of options from the left, maintaining context without full-page refreshes.

## Elevation & Depth
Depth in this design system is achieved through **Tonal Layering** and **Soft Inner Glows** rather than heavy drop shadows. 

- **Surface Levels:** The primary background is the darkest layer. Cards and Bento modules use a slightly lighter shade of blue or a semi-transparent overlay to appear "lifted."
- **Interactive Depth:** When a card is hovered, it should subtly scale (1.02x) and increase its inner glow to simulate physical movement toward the user.
- **Glassmorphism:** Use a light backdrop blur (20px) on navigation bars and modal overlays to maintain a sense of space and modern transparency.
- **Borders:** Subtle, low-opacity white borders (10-15% opacity) should be used on cards to define edges against the dark background.

## Shapes
The design system embraces a very soft, approachable geometry. All primary containers and buttons utilize **2XL rounded corners (1.5rem / 24px)**. 

- **Cards/Bento Modules:** Use a consistent 24px radius.
- **Buttons/Inputs:** Use a 16px radius for a slightly tighter but still soft appearance.
- **Interactive Elements:** Progress bars and chips should use "Pill" shapes (fully rounded) to contrast against the more structural Bento modules.

## Components

### Buttons & Chips
- **Primary CTA:** Orange background, white text, 16px radius. Uses a "spring" animation on click.
- **Chips:** Small, pill-shaped indicators using the Accent (Turquoise) or Support (Green) colors with 10% background opacity for a subtle "tag" look.

### Bento Cards
- Standardized containers for data. They must include a "label-sm" header and often house an icon in the top right. Content within should be center-aligned or top-left aligned depending on the data density.

### Interactive Accordions
- Used for "Parent Tips" and "Subject Breakdown." These should feature a smooth chevron rotation and a "slide-down" reveal animation. The header of the accordion should use the Support (Green) color for tips or Primary (Blue) for data.

### Cascade Navigation
- A vertical sidebar that expands horizontally. Icons are always visible; labels slide out on hover or click. Sub-navigation slides over the primary list, with a clear "back" breadcrumb at the top.

### Input Fields
- Dark blue background with a 1px border. On focus, the border transitions to Turquoise with a subtle outer glow.

### Progress Bars
- Thick, 12px height bars with fully rounded ends. The "track" is a dark version of the primary blue, and the "fill" uses the Turquoise accent.