import type { Metadata } from 'next';
import type React from 'react';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'Aruna’s Kitchen | Flavors of Rayalaseema',
  description:
    'Order authentic homemade snacks, sweets, pickles, karam and traditional Rayalaseema foods from Aruna’s Kitchen in Kurnool.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Aruna’s Kitchen',
    description:
      'Flavors of Rayalaseema — traditional homemade foods from Kurnool.',
    images: ['/images/logo/arunas-logo.jpeg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
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
