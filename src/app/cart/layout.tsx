import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arunasskitchen.in';

export const metadata: Metadata = {
  title: 'Shopping Basket',
  description: 'Review your selected authentic Rayalaseema homemade sweets, snacks, and pickles.',
  alternates: {
    canonical: `${siteUrl}/cart`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
