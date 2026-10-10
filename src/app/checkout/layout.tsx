import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arunasskitchen.in';

export const metadata: Metadata = {
  title: 'Checkout & Delivery',
  description: 'Enter your delivery details to complete your homemade food order from Arunass Kitchen Kurnool.',
  alternates: {
    canonical: `${siteUrl}/checkout`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
