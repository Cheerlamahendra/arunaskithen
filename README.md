# Arunass Kitchen — Flavors of Rayalaseema

An authentic homemade food storefront and order management web application built with **Next.js 15 (App Router)**, **React 19**, and **TypeScript**. 

Specialized for traditional Rayalaseema sweets, spicy karam, crispy snacks, podulu, handcrafted Andhra pickles, and value combo packages based in **Kurnool, Andhra Pradesh, India**.

---

## 🌟 Key Features

### 🛍️ E-Commerce & Storefront Experience
- **Interactive Product Catalog**: Real-time keyword search, responsive category filters (Snacks, Sweets, Karjikay, Karam & Spices, Pickles, Farm Products), and clean product cards.
- **Value Combo Packages**: Dedicated handcrafted packages section with item breakdown, savings tags, and thumbnail switchers (`src/data/packages.ts`).
- **Fly-to-Cart Animation**: 60fps hardware-accelerated flying item animation that traces a smooth arc from the clicked button into:
  - **Desktop View**: The top navigation shopping bag icon (`#desktop-cart-icon`).
  - **Mobile View**: The center floating cart bubble in the mobile bottom bar (`#mobile-cart-icon`).
  - Animated cart bounce pop effect upon arrival.
- **Added to Cart & Quantity Updated Toast**: Branded toast notifications showing product photo, checkmark badge, updated quantities, total price, and a direct "View Cart" button.
- **Cart & Quantity Controls**: Quantity selectors, persistent state via `localStorage`, and real-time total calculations (`CartContext.tsx`).
- **Direct WhatsApp Checkout**: Customer delivery form (Name, Mobile, Door No, Street, Landmark, City, Pincode) generating a formatted, itemized WhatsApp order message sent directly to **+91 8143645962**.
- **Mobile-First Experience**: Sticky glassmorphic top header, right-side slide plate drawer menu, and a fixed animated bottom navigation bar.

---

## 🚀 Technical & Local SEO Optimization

- **Official Brand Favicon Suite**: Generated from `public/images/logo/arunas-logo.jpeg`:
  - `public/favicon.ico` (multi-size: 16×16, 32×32, 48×48)
  - `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/favicon-48x48.png`
  - `public/apple-touch-icon.png` (180×180)
  - `public/android-chrome-192x192.png`, `public/android-chrome-512x512.png`
  - `src/app/icon.png`, `src/app/apple-icon.png`, `src/app/favicon.ico`
  - `public/site.webmanifest` with PWA theme colors (`#8b1e14`)
- **Metadata & Open Graph**:
  - Default title: `Arunass Kitchen | Homemade Foods & Traditional Pickles in Kurnool`
  - Title template: `%s | Arunass Kitchen Kurnool`
  - Dynamic canonical URLs based on `process.env.NEXT_PUBLIC_SITE_URL`
  - Branded 1200×630 Open Graph banner (`/images/og-image.jpg`) and Twitter summary card
- **Structured Data (Schema.org JSON-LD)**:
  - `@graph` containing `WebSite` and `LocalBusiness` / `FoodEstablishment` / `Store`
  - Verified Kurnool address, phone number, geo coordinates (`15.8281`, `78.0373`), opening hours (`08:00 – 21:00`), and payment methods
  - `BreadcrumbList` on individual product detail pages (`Home > Products > [Product]`)
  - `Product` and `Offer` schema with prices, currency (`INR`), availability, and seller details
- **Sitemap & Robots Directives**:
  - Auto-generated `src/app/sitemap.ts` (`/sitemap.xml`) containing all canonical product & package routes
  - Configured `src/app/robots.ts` (`/robots.txt`) with Googlebot-Image permissions and `noindex` rules on private `/cart` and `/checkout` screens

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Static Site Generation / SSG)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Modern CSS3 (CSS Variables, Flexbox, CSS Grid, Glassmorphism, Keyframe animations)
- **Asset Processing**: [Sharp](https://sharp.pixelplumbing.com/) (favicon & social image generator)

---

## 📂 Project Structure

```
arunas-home-made-food/
├── public/
│   ├── favicon.ico                  # Multi-size browser favicon
│   ├── favicon-*.png                # 16x16, 32x32, 48x48 PNG icons
│   ├── apple-touch-icon.png         # iOS touch icon (180x180)
│   ├── android-chrome-*.png         # Android PWA icons (192x192, 512x512)
│   ├── site.webmanifest             # Web application manifest
│   └── images/
│       ├── logo/                    # Brand logo (arunas-logo.jpeg)
│       ├── hero/                    # Hero banners & illustrations
│       ├── categories/              # Category thumbnails
│       ├── packages/                # Value combo package imagery
│       ├── products/                # Product photos (sweets, snacks, pickles)
│       └── og-image.jpg             # 1200x630 Open Graph social preview card
├── scripts/
│   └── generate-favicons.js         # Automated favicon & OG asset generator
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout, metadata & Schema.org graph
│   │   ├── page.tsx                 # Homepage (Hero, Products, About, CTA)
│   │   ├── sitemap.ts               # Dynamic XML sitemap generator
│   │   ├── robots.ts                # Production robots.txt generator
│   │   ├── globals.css              # Theme variables, responsive styles & animations
│   │   ├── cart/                    # Cart overview page & noindex layout
│   │   ├── checkout/                # Checkout delivery form & noindex layout
│   │   └── products/[slug]/         # Dynamic product detail pages & schema
│   ├── components/
│   │   ├── cart/                    # CartItem, CartSummary, CartToast
│   │   ├── home/                    # Hero, WhyChooseUs, HowToOrder, CTASection
│   │   ├── layout/                  # Navbar, NavSearch, Footer, MobileBottomNav
│   │   ├── packages/                # PackagesSection, PackageCard
│   │   ├── products/                # ProductCard, ProductGrid, ProductDetails, QuantitySelector
│   │   └── ui/                      # WhatsAppIcon
│   ├── context/
│   │   └── CartContext.tsx          # Global cart state, flying animation, toast trigger
│   ├── data/
│   │   ├── categories.ts            # Category list & filtering types
│   │   ├── packages.ts              # Combo packages, inclusions & pricing
│   │   └── products.ts              # Product catalog (name, slug, price, unit, image)
│   ├── lib/
│   │   ├── cartAnimation.ts         # Parabolic fly-to-cart Web Animations logic
│   │   ├── utils.ts                 # Currency formatter (INR) & class helpers
│   │   └── whatsapp.ts              # Structured WhatsApp message & URL builder
│   └── types/
│       └── product.ts               # CartItem, Product, PackageOffer type interfaces
├── next.config.ts                   # Next.js configuration
├── package.json                     # Project scripts and dependencies
└── tsconfig.json                    # TypeScript compiler options
```

---

## 🏃 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm or yarn or pnpm

### Installation

1. Clone or open the repository:
   ```bash
   cd arunas-home-made-food
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build

To verify and generate the production static build:

```bash
# Type check without emitting files
npx tsc --noEmit

# Run Next.js production build
npm run build

# Start production server
npm start
```

---

## ⚙️ Configuration & Customization

### 1. Adding or Editing Products
Edit [`src/data/products.ts`](file:///e:/avmsmart%20clients%20projects/arunas-home-made-food/arunas-home-made-food/src/data/products.ts):
```typescript
make(
  38,
  'New Homemade Product',
  450,
  'Sweets',
  '/images/products/new-sweet.jpeg',
  'Authentic homemade description of the delicacy.',
  '1 kg'
)
```
Product detail pages (`/products/[slug]`) and sitemap entries will generate automatically.

### 2. Adding Combo Packages
Edit [`src/data/packages.ts`](file:///e:/avmsmart%20clients%20projects/arunas-home-made-food/arunas-home-made-food/src/data/packages.ts) to define combo offers with bundled items, weights, and discounted package prices.

### 3. WhatsApp Ordering Number
The business WhatsApp recipient is centralized in [`src/lib/whatsapp.ts`](file:///e:/avmsmart%20clients%20projects/arunas-home-made-food/arunas-home-made-food/src/lib/whatsapp.ts):
```typescript
export const WHATSAPP_NUMBER = '918143645962';
```

### 4. Production Domain
Set `NEXT_PUBLIC_SITE_URL` in your hosting environment variables (e.g., Vercel, Netlify, or `.env.production`):
```env
NEXT_PUBLIC_SITE_URL=https://arunaskitchen.com
```
Defaults to `https://arunaskitchen.com` if not specified.

---

## 📍 Business Location

- **Business Name**: Arunass Kitchen
- **Tagline**: Flavors of Rayalaseema
- **Address**: Umaha Mahasvare Nagar, Sudereddy Palli Road, Kurnool, Andhra Pradesh - 518002
- **Direct WhatsApp Orders**: [+91 8143645962](https://wa.me/918143645962)
- **Hours**: Monday – Sunday, 8:00 AM – 9:00 PM

---

## 📄 License

Private client project for **Arunass Kitchen**. All rights reserved.
