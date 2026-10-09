import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout & Delivery',
  description: 'Enter your delivery details to complete your homemade food order from Arunass Kitchen Kurnool.',
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
