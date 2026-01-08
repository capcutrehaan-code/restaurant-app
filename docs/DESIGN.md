# Design System

Complete design system and UI/UX guidelines for the Restaurant App.

## 🎨 Color Palette

### Primary Colors
- **Primary Red**: `#C41E3A`
  - Use for: CTA buttons, important actions, branding
  - Shades: 50-900 available in Tailwind config
  
- **Secondary Orange**: `#FF6B35`
  - Use for: Highlights, badges, secondary actions
  
- **Dark Green**: `#1B5E20`
  - Use for: Veg indicator, success states
  
- **Accent Gold**: `#FFD700`
  - Use for: Offers, premium features, loyalty rewards

### Neutral Colors
- **Dark**: `#1A1A1A` - Dark mode background
- **White**: `#FFFFFF` - Light mode background
- **Gray**: `#F5F5F5` - Secondary backgrounds

### Semantic Colors
- **Success**: Green shades
- **Warning**: Yellow/Orange shades
- **Error**: Red shades
- **Info**: Blue shades

## 📏 Typography

### Font Family
```css
font-family: 'Inter', 'SF Pro Display', 'Roboto', system-ui, sans-serif;
```

### Scale
- **Display**: 32px, Bold - Hero sections
- **H1**: 28px, Bold - Page titles
- **H2**: 24px, Semibold - Section headers
- **H3**: 20px, Semibold - Card titles
- **H4**: 18px, Semibold - Subsections
- **Body Large**: 16px, Regular - Main content
- **Body**: 14px, Regular - Secondary content
- **Caption**: 12px, Regular - Labels, hints
- **Small**: 10px, Regular - Fine print

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## 📐 Spacing System

Based on 4px grid:

```javascript
{
  xs: '4px',    // 0.25rem
  sm: '8px',    // 0.5rem
  md: '16px',   // 1rem
  lg: '24px',   // 1.5rem
  xl: '32px',   // 2rem
  '2xl': '48px',  // 3rem
  '3xl': '64px',  // 4rem
}
```

## 🔲 Component Library

### Button

**Variants:**
- `primary` - Main CTAs (red background)
- `secondary` - Secondary actions (orange background)
- `outline` - Less prominent actions
- `ghost` - Minimal style

**Sizes:**
- `sm` - Small (32px height)
- `md` - Medium (40px height)
- `lg` - Large (48px height)

**Usage:**
```tsx
<Button variant="primary" size="md">
  Place Order
</Button>
```

### Card

**Variants:**
- `default` - Standard card with shadow
- `elevated` - Prominent card with larger shadow
- `outline` - Card with border instead of shadow

**Usage:**
```tsx
<Card variant="elevated">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
```

### Input

**Features:**
- Label support
- Error states with messages
- Helper text
- Dark mode compatible

**Usage:**
```tsx
<Input
  label="Phone Number"
  placeholder="Enter 10-digit number"
  error="Invalid phone number"
/>
```

### Badge

**Variants:**
- `veg` - Green badge with dot
- `non-veg` - Red badge with dot
- `jain` - Purple badge
- `success` / `warning` / `error` / `info`

**Usage:**
```tsx
<Badge variant="veg">Vegetarian</Badge>
<Badge variant="non-veg">Non-Veg</Badge>
```

### Modal

**Features:**
- Backdrop with blur
- Escape to close
- Responsive sizing (sm, md, lg, xl)
- Smooth animations

**Usage:**
```tsx
<Modal isOpen={isOpen} onClose={handleClose} title="Dish Details" size="lg">
  <div>Modal content</div>
</Modal>
```

## 🎭 Icons

Using **Lucide React** icon library:

**Common Icons:**
- `Home` - Homepage
- `ShoppingBag` - Menu/Products
- `ShoppingCart` - Cart
- `User` - Profile
- `Search` - Search functionality
- `Star` - Ratings
- `Heart` - Favorites
- `MapPin` - Location
- `Phone` - Contact
- `Clock` - Time/Hours

## 📱 Responsive Design

### Breakpoints
```javascript
{
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large
}
```

### Mobile-First Approach
Design for mobile first, then enhance for larger screens.

```tsx
// Mobile: Stack vertically
// Desktop: Side by side
<div className="flex flex-col md:flex-row gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
</div>
```

## 🌙 Dark Mode

All components support dark mode via Tailwind's `dark:` prefix.

**Implementation:**
```tsx
className="bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
```

**Toggle:**
```tsx
const { theme, toggleTheme } = useThemeStore();
```

## 🎬 Animations

### Transitions
- **Default**: 200ms ease
- **Hover states**: Scale, opacity, color
- **Page transitions**: Fade in 300ms

### Keyframes
```css
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes slideUp {
  0% { transform: translateY(10px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes scaleIn {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
```

## 🔘 Shadows

```javascript
{
  soft: '0 2px 8px rgba(0, 0, 0, 0.1)',
  medium: '0 4px 12px rgba(0, 0, 0, 0.15)',
  card: '0 1px 3px rgba(0, 0, 0, 0.12)',
}
```

## 📐 Layout Patterns

### Page Layout
```tsx
<div className="min-h-screen bg-gray-50 dark:bg-dark-900">
  <header className="bg-white dark:bg-dark-800 shadow-sm">
    {/* Header content */}
  </header>
  <main className="max-w-7xl mx-auto px-4 py-6">
    {/* Page content */}
  </main>
</div>
```

### Grid Layouts
```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id}>{item}</Card>)}
</div>
```

## 🖼️ Image Guidelines

### Dish Images
- **Aspect Ratio**: 16:9 or 4:3
- **Minimum Size**: 800x600px
- **Format**: WebP (with JPG fallback)
- **Optimization**: Compress to <200KB

### Logo/Icons
- **Format**: SVG preferred
- **Size**: 48x48px for icons

## ♿ Accessibility

### Requirements
- Color contrast ratio ≥ 4.5:1 for text
- Keyboard navigation support
- ARIA labels for interactive elements
- Alt text for all images
- Focus indicators visible

### Example:
```tsx
<button
  aria-label="Add to cart"
  className="focus:ring-2 focus:ring-primary-500"
>
  <ShoppingCart />
</button>
```

## 📊 Data Visualization

### Order Status Flow
```
Pending → Confirmed → Preparing → Ready → Out for Delivery → Delivered
```

**Status Colors:**
- Pending: Yellow/Warning
- Confirmed/Preparing: Blue/Info
- Ready: Green/Success
- Out for Delivery: Blue/Info
- Delivered: Green/Success
- Cancelled: Red/Error

## 🎯 UX Guidelines

### Loading States
- Show skeleton loaders for content
- Disable buttons during API calls
- Display loading spinner for actions

### Empty States
- Show friendly message
- Provide clear action (e.g., "Browse Menu")
- Use relevant icon

### Error Handling
- Toast notifications for errors
- Inline validation for forms
- Clear error messages
- Retry options when appropriate

### Feedback
- Toast for success/error messages
- Button loading states
- Optimistic UI updates
- Confirmation modals for destructive actions

## 📏 Form Design

### Best Practices
- Label above input
- Clear placeholder text
- Validation on blur
- Error messages below field
- Required fields marked with *

### Example:
```tsx
<Input
  label="Email Address *"
  type="email"
  placeholder="you@example.com"
  error={errors.email}
  required
/>
```

## 🎨 Branding

### Logo Usage
- Maintain aspect ratio
- Minimum size: 120px width
- Clear space: Equal to logo height
- Use on white or dark backgrounds only

### Voice & Tone
- Friendly and approachable
- Clear and concise
- Professional yet warm
- Food-focused language

## 📱 Mobile Considerations

### Touch Targets
- Minimum size: 44x44px
- Adequate spacing between tappable elements
- Easy-to-reach primary actions

### Navigation
- Bottom navigation for main sections
- Sticky header for quick access
- Pull-to-refresh on lists

### Performance
- Lazy load images
- Infinite scroll for long lists
- Optimize bundle size
- Cache API responses

## 🎨 Component Showcase

View live components at: `/storybook` (if Storybook is set up)

Or refer to:
- `frontend/src/components/ui/` for base components
- `frontend/src/components/features/` for feature components
