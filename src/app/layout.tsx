import type { Metadata } from 'next';
import type React from 'react';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { CartProvider } from '@/context/CartContext';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arunasskitchen.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Arunass Kitchen | Homemade Foods & Traditional Pickles in Kurnool',
    template: '%s | Arunass Kitchen Kurnool',
  },
  description:
    'Discover authentic homemade sweets, traditional Rayalaseema pickles, spice powders and snacks from Arunass Kitchen in Kurnool, Andhra Pradesh.',
  keywords: [
    'Arunass Kitchen',
    'Arunass Kitchen Kurnool',
    'homemade food in Kurnool',
    'traditional Rayalaseema food',
    'homemade pickles in Kurnool',
    'homemade sweets in Kurnool',
    'Rayalaseema sweets Kurnool',
    'Andhra pickles Kurnool',
    'homemade snacks Kurnool',
    'Sunundallu Kurnool',
    'Karjakayyallu Kurnool',
    'Karam Boondi Kurnool',
    'Chakodillu Kurnool',
    'Chekkallu Kurnool',
    'homemade spice powders Kurnool',
    'Kurnool home foods delivery',
    'Umaha Mahasvare Nagar Kurnool',
  ],
  authors: [{ name: 'Arunass Kitchen', url: siteUrl }],
  creator: 'Arunass Kitchen',
  publisher: 'Arunass Kitchen',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Arunass Kitchen | Homemade Foods & Traditional Pickles in Kurnool',
    description:
      'Discover authentic homemade sweets, traditional Rayalaseema pickles, spice powders and snacks from Arunass Kitchen in Kurnool, Andhra Pradesh.',
    url: siteUrl,
    siteName: 'Arunass Kitchen',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Arunass Kitchen - Homemade Foods & Traditional Pickles in Kurnool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arunass Kitchen | Homemade Foods & Traditional Pickles in Kurnool',
    description:
      'Authentic homemade Rayalaseema snacks, sweets, karam & pickles prepared with love in Kurnool. WhatsApp Order: +91 8143645962.',
    images: [`${siteUrl}/images/og-image.jpg`],
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
  // Schema.org structured data graph for WebSite and LocalBusiness
  const schemaGraphJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Arunass Kitchen',
        alternateName: 'Arunass Kitchen Kurnool',
        description:
          'Authentic homemade Rayalaseema snacks, sweets, spice powders, and pickles made fresh in Kurnool, Andhra Pradesh.',
        inLanguage: 'en-IN',
        publisher: {
          '@id': `${siteUrl}/#localbusiness`,
        },
      },
      {
        '@type': ['LocalBusiness', 'FoodEstablishment', 'Store'],
        '@id': `${siteUrl}/#localbusiness`,
        name: 'Arunass Kitchen',
        alternateName: [
          'Arunass Kitchen Kurnool',
          'Arunass Kitchen Rayalaseema Foods',
          'Flavors of Rayalaseema',
        ],
        description:
          'Authentic homemade Rayalaseema snacks, sweets, karam powders, and pickles made fresh with traditional recipes in Kurnool, Andhra Pradesh.',
        url: siteUrl,
        telephone: '+918143645962',
        image: `${siteUrl}/images/og-image.jpg`,
        logo: `${siteUrl}/images/logo/arunas-logo.png`,
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
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+918143645962',
          contactType: 'customer service',
          contactOption: 'HearingImpairedSupported',
          availableLanguage: ['Telugu', 'English', 'Hindi'],
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Arunass Kitchen Rayalaseema Delicacies',
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
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaGraphJsonLd),
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
