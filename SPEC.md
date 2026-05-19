# DPDP Consultants Website - Project Specification

## Project Overview
- **Project Name**: DPDP Consultants Website
- **Type**: Corporate Consulting Company Website (Frontend Only)
- **Core Functionality**: A professional consulting website with static pages, blog system, resources section, and client dashboard UI
- **Target Users**: Business clients seeking data protection and privacy consulting services

## Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Bootstrap 5.3
- GSAP (GreenSock Animation Platform)
- Sass/CSS Modules

## 🧱 Tech Stack Requirements
✅ Next.js 16 (App Router)
✅ React 19
✅ TypeScript
✅ Bootstrap 5.3
✅ GSAP for animations
✅ Fully Responsive
✅ SEO optimized structure
✅ Clean folder structure
✅ Reusable components
✅ Well commented code

## 🌐 Routing Requirements

### Static Pages
- `/` - Home
- `/about` - About
- `/services` - Services
- `/contact` - Contact
- `/privacy-policy` - Privacy Policy
- `/terms-conditions` - Terms & Conditions

### Blog System (Dynamic)
- `/blog` - Blog listing
- `/blog/[slug]` - Blog detail

### Resources (Dynamic)
- `/resources` - Resources listing
- `/resources/[slug]` - Resource detail

### Client Dashboard UI (Frontend Only)
- `/dashboard/login` - Login
- `/dashboard/register` - Register
- `/dashboard` - Dashboard home
- `/dashboard/documents` - Documents
- `/dashboard/tickets` - Tickets
- `/dashboard/profile` - Profile

## 🔁 Legacy URL Support
The website must support legacy .php URLs via Next.js rewrites:
- `/draft-dpdp-rules-2025.php` → `/resources/draft-dpdp-rules-2025`
- `/about.php` → `/about`
- `/contact.php` → `/contact`

## 📁 Folder Structure
```
src/
├── app/
│   ├── (main)/
│   │   ├── page.tsx (Home)
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms-conditions/page.tsx
│   │   └── blog/
│   │       ├── page.tsx
│   │       └── [slug]/page.tsx
│   ├── dashboard/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── page.tsx (dashboard home)
│   │   ├── documents/page.tsx
│   │   ├── tickets/page.tsx
│   │   └── profile/page.tsx
│   └── resources/
│       ├── page.tsx
│       └── [slug]/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── DashboardLayout.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── BlogCard.tsx
│   │   ├── CTASection.tsx
│   │   └── Testimonials.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Card.tsx
├── lib/
│   ├── utils.ts
│   └── constants.ts
├── types/
│   └── index.ts
├── data/
│   ├── blog.ts
│   ├── services.ts
│   └── resources.ts
└── styles/
    └── globals.scss
```

## 🎨 UI Requirements

### Header
- Sticky navigation
- Logo on left
- Navigation links center
- CTA button on right
- Mobile hamburger menu

### Footer
- Company info
- Quick links
- Services links
- Contact info
- Social media icons
- Copyright

### Hero Section
- Large headline with animation
- Subheadline
- CTA buttons
- Background image/gradient
- GSAP text reveal animation

### Service Cards
- Icon
- Title
- Description
- Hover effects
- GSAP fade-in on scroll

### Blog Cards
- Featured image
- Title
- Excerpt
- Date
- Read more link

### Contact Form UI
- Name field
- Email field
- Phone field
- Message textarea
- Submit button
- Form validation (UI only)

### Dashboard Layout
- Sidebar navigation
- Top header with user info
- Main content area
- Logout button

## 🎬 Animation Requirements (GSAP)

### Hero Animations
- Text reveal from bottom
- Staggered word animation
- Fade in for CTA buttons

### Scroll Animations
- Fade in sections on scroll
- Staggered card animations
- Parallax effects where appropriate

### Transitions
- Page transitions
- Hover state animations

## 📱 Responsiveness

### Breakpoints
- Mobile: < 576px
- Tablet: 576px - 992px
- Desktop: > 992px

### Mobile Features
- Hamburger menu
- Stacked layouts
- Touch-friendly buttons
- Adjusted font sizes

## 🔍 SEO Setup

### Metadata
- Dynamic title and description
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Structured data (JSON-LD)

### Semantic HTML
- Proper heading hierarchy (h1-h6)
- Article tags for blog posts
- Section tags for page sections
- Nav tags for navigation
- Footer tag for footer

## 📦 Components List

### Layout Components
1. Header - Sticky navigation header
2. Footer - Site footer with links
3. DashboardLayout - Layout wrapper for dashboard pages

### Section Components
1. HeroSection - Hero section with animations
2. ServiceCard - Individual service card
3. BlogCard - Individual blog post card
4. CTASection - Call to action section
5. Testimonials - Client testimonials
6. ContactForm - Contact form UI

### UI Components
1. Button - Reusable button component
2. Input - Form input component
3. Card - Reusable card component

## 📌 Code Quality

### TypeScript Types
- BlogPost interface
- Service interface
- Resource interface
- User interface (for dashboard)
- Form interfaces

### Best Practices
- No any types
- Proper error handling
- Clean component structure
- Reusable utilities
- Proper naming conventions

## ❌ Excluded Features
- Backend logic
- Authentication logic
- Database connection
- WordPress integration (structure ready)

## 🎯 Deliverables
- Complete Next.js frontend project
- All routes created and working
- Dummy data for blog/resources
- Working navigation
- GSAP animations
- SEO optimized
- Responsive design
- Ready to connect with WordPress later
