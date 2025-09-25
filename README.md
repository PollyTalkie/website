# PollyTalkie Website

This is the SEO-optimized static website for PollyTalkie, built with Astro and designed for deployment on Cloudflare Pages.

## 🚀 Project Overview

This website was created to separate the marketing/public pages from the main PollyTalkie portal (Next.js SPA) to improve SEO performance. The website includes:

- **Landing Page** - Interactive chat demo, features, testimonials
- **Pricing Page** - Interactive pricing calculator with add-ons
- **About Page** - Company information and values
- **Contact Page** - Contact form and information
- **Blog Page** - Blog listing (ready for CMS integration)
- **Privacy Policy** - Legal documentation
- **Terms of Service** - Legal documentation
- **Download Page** - App download information

## 🌐 Internationalization

The website supports both English and Chinese (Simplified):
- English: `/` (default)
- Chinese: `/zh/`

## 🛠️ Tech Stack

- **Framework**: Astro 4.x
- **UI Components**: React 18.x (for interactive components)
- **Styling**: Tailwind CSS
- **Animations**: CSS animations + Framer Motion (where needed)
- **Deployment**: Cloudflare Pages
- **Languages**: TypeScript

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # UI components (Button, Logo, etc.)
│   ├── ChatDemo.tsx    # Interactive chat demonstration
│   ├── Testimonials.tsx # Customer testimonials
│   ├── PricingCalculator.tsx # Interactive pricing tool
│   ├── Navigation.astro # Site navigation
│   └── Footer.astro    # Site footer
├── i18n/               # Internationalization
│   ├── utils.ts        # i18n utilities
│   └── translations/   # Translation files
│       ├── en.json     # English translations
│       └── zh.json     # Chinese translations
├── layouts/            # Page layouts
│   └── Layout.astro    # Base layout
├── lib/                # Utilities
│   └── utils.ts        # Helper functions
├── pages/              # Pages (file-based routing)
│   ├── index.astro     # English landing page
│   ├── pricing.astro   # English pricing page
│   ├── about.astro     # English about page
│   ├── contact.astro   # English contact page
│   ├── blog.astro      # English blog page
│   ├── privacy.astro   # English privacy policy
│   ├── terms.astro     # English terms of service
│   ├── download.astro  # English download page
│   └── zh/             # Chinese pages
│       ├── index.astro
│       ├── pricing.astro
│       ├── about.astro
│       ├── contact.astro
│       ├── blog.astro
│       ├── privacy.astro
│       ├── terms.astro
│       └── download.astro
├── styles/             # Global styles
│   └── globals.css     # Tailwind + custom styles
public/                 # Static assets
├── logo.png           # PollyTalkie logo
├── testimonials/      # User testimonial images
└── blog/              # Blog post images
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## 🎨 Key Features

### Interactive Components
- **Chat Demo**: Animated conversation simulation showing PollyTalkie in action
- **Pricing Calculator**: Interactive add-on calculator for subscription plans
- **Testimonials**: Auto-rotating customer testimonials
- **Responsive Navigation**: Mobile-friendly navigation with language switching

### SEO Optimizations
- Static site generation for fast loading
- Proper meta tags and structured data
- Optimized images and assets
- Clean URLs with i18n support
- Semantic HTML structure

### Design System
- Consistent color scheme matching the portal
- Tailwind CSS for utility-first styling
- Dark/light mode support
- Responsive design for all screen sizes
- Smooth animations and transitions

## 🌍 Deployment

This website is configured for deployment on Cloudflare Pages:

1. **Connect your repository** to Cloudflare Pages
2. **Build settings**:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node.js version: 18.x or higher

3. **Environment variables**: None required for basic functionality

## 🔗 Integration with Portal

The website integrates with the main PollyTalkie portal:
- All CTA buttons link to `https://portal.pollytalkie.com`
- Contact forms can be configured to send to the portal's API
- Consistent branding and messaging across both properties

## 📝 Content Management

### Adding Blog Posts
Blog posts are currently hardcoded in the page files. To add dynamic blog functionality:
1. Integrate with a headless CMS (Contentful, Strapi, etc.)
2. Or use Astro's content collections with Markdown files
3. Update the blog pages to fetch from your chosen content source

### Updating Translations
1. Edit the JSON files in `src/i18n/translations/`
2. Add new keys following the existing structure
3. Use the `t()` function in components to access translations

### Modifying Pricing
Update the pricing tiers and calculator in:
- `src/i18n/translations/en.json` and `zh.json` (pricing section)
- `src/components/PricingCalculator.tsx` (calculator logic)

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Ensure all new pages have both English and Chinese versions
3. Test responsive design on multiple screen sizes
4. Maintain consistency with the existing design system

## 📄 License

This project is proprietary to PollyTalkie. All rights reserved.
