# Aruna’s Home Made Food

A responsive Next.js + TypeScript homemade-food storefront for **Aruna’s Home Made Food — Flavors of Rayalaseema**.

## Features

- 32 products stored in one editable `src/data/products.ts` file
- Category filtering and product search
- 2-column product grid on mobile
- Centralized cart with quantity controls and localStorage persistence
- Customer/address checkout form
- Dynamic WhatsApp order message to **+91 9553357971**
- Product detail routes
- Responsive navbar, hero, category navigation, about, features, ordering steps and footer
- Local logo and product image assets under `public/images`
- SEO metadata and accessible labels

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm start
```

## Easy product editing

Edit only:

`src/data/products.ts`

Each product contains its name, price, unit, category, image, description and availability.

## WhatsApp configuration

The WhatsApp number is centralized in:

`src/lib/whatsapp.ts`

Current number: `919553357971`.

## Assets

- Official uploaded logo: `public/images/logo/arunas-logo.jpeg`
- Hero artwork: `public/images/hero/rayalaseema-food-hero.svg`
- Product artwork: `public/images/products/*.svg`

The product image files are local so there are no broken remote image dependencies.
