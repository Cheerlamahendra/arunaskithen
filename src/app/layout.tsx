import type { Metadata } from 'next';
import type React from 'react';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { CartProvider } from '@/context/CartContext';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arunaskitchen.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Aruna’s Kitchen | Best Authentic Home Foods in Kurnool',
    template: '%s | Aruna’s Kitchen Kurnool',
  },
  description:
    'Order authentic home foods in Kurnool from Aruna’s Kitchen. Traditional Rayalaseema homemade sweets, spicy karam, crispy snacks, podulu & traditional pickles. Freshly prepared in Kurnool (Umaha Mahasvare Nagar, Sudereddy Palli Road). Fast delivery & direct WhatsApp ordering at +91 8143645962.',
  keywords: [
    'home foods in Kurnool',
    'Aruna’s Kitchen',
    'Arunas Kitchen',
    'Aruna’s Kitchen Kurnool',
    'Arunas Kitchen Kurnool',
    'home foods Kurnool',
    'homemade food in Kurnool',
    'Rayalaseema home foods',
    'Rayalaseema sweets Kurnool',
    'homemade snacks Kurnool',
    'Andhra pickles Kurnool',
    'Karam Chutallu',
    'Karam Boondi Kurnool',
    'Chakodillu Kurnool',
    'Chekkallu Kurnool',
    'Sunundallu Kurnool',
    'Karjakayyallu Kurnool',
    'homemade sweets Kurnool',
    'traditional Andhra food Kurnool',
    'home food delivery Kurnool',
    'best home foods Kurnool',
    'Umaha Mahasvare Nagar Kurnool',
    'Sudereddy Palli Road Kurnool',
  ],
  authors: [{ name: 'Aruna’s Kitchen', url: siteUrl }],
  creator: 'Aruna’s Kitchen',
  publisher: 'Aruna’s Kitchen',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  icons: { icon: '/favicon.svg', apple: '/favicon.svg' },
  openGraph: {
    title: 'Aruna’s Kitchen | Authentic Home Foods in Kurnool',
    description:
      'Craving genuine Rayalaseema home-cooked taste? Order authentic sweets, snacks, pickles & karam from Aruna’s Kitchen in Kurnool. Delivered fresh to your door!',
    url: siteUrl,
    siteName: 'Aruna’s Kitchen',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/logo/arunas-logo.jpeg',
        width: 800,
        height: 800,
        alt: 'Aruna’s Kitchen - Authentic Home Foods in Kurnool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aruna’s Kitchen | Best Authentic Home Foods in Kurnool',
    description:
      'Authentic homemade Rayalaseema snacks, sweets, karam & pickles prepared with love in Kurnool. WhatsApp Order: +91 8143645962.',
    images: ['/images/logo/arunas-logo.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Schema.org structured data for LocalBusiness & FoodEstablishment
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'FoodEstablishment', 'Store'],
    '@id': `${siteUrl}/#localbusiness`,
    name: 'Aruna’s Kitchen',
    alternateName: [
      'Aruna’s Kitchen Kurnool',
      'Arunas Kitchen',
      'Aruna Home Foods Kurnool',
      'Flavors of Rayalaseema',
    ],
    description:
      'Authentic homemade Rayalaseema snacks, sweets, karam powders, and pickles made fresh with traditional recipes in Kurnool, Andhra Pradesh.',
    url: siteUrl,
    telephone: '+918143645962',
    image: `${siteUrl}/images/logo/arunas-logo.jpeg`,
    logo: `${siteUrl}/images/logo/arunas-logo.jpeg`,
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Google Pay, PhonePe, WhatsApp Order',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Umaha Mahasvare Nagar, Sudereddy Palli Road',
      addressLocality: 'Kurnool',
      addressRegion: 'Andhra Pradesh',
      postalCode: '518002',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 15.8281,
      longitude: 78.0373,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Kurnool',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Andhra Pradesh',
      },
      {
        '@type': 'Country',
        name: 'India',
      },
    ],
    servesCuisine: [
      'Rayalaseema',
      'Andhra',
      'Indian',
      'Traditional Sweets & Snacks',
      'Homemade Foods',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '21:00',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Aruna’s Kitchen Rayalaseema Delicacies',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Traditional Snacks',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Homemade Sweets',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Karam & Spices',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Homemade Pickles',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Value Combo Packages',
        },
      ],
    },
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <MobileBottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
