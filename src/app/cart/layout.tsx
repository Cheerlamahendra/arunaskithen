import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Basket',
  description: 'Review your selected authentic Rayalaseema homemade sweets, snacks, and pickles.',
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
