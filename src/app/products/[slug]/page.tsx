import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/products/ProductDetails';
import { getProductBySlug, products } from '@/data/products';
import { packages } from '@/data/packages';

export function generateStaticParams() {
  return [...products, ...packages].map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arunaskitchen.com';
  const title = `${product.name} | Authentic Rayalaseema Home Food | Aruna’s Kitchen Kurnool`;
  const description = `Buy authentic homemade ${product.name} in Kurnool from Aruna’s Kitchen. Handcrafted with traditional Rayalaseema recipes and quality ingredients. Order fresh on WhatsApp: +91 8143645962.`;

  return {
    title,
    description,
    keywords: [
      product.name,
      `${product.name} Kurnool`,
      `homemade ${product.name}`,
      'home foods in Kurnool',
      'Aruna’s Kitchen',
      'Arunas Kitchen',
      'Rayalaseema foods Kurnool',
    ],
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/products/${product.slug}`,
      images: [
        {
          url: product.image,
          alt: `Homemade ${product.name} - Aruna’s Kitchen Kurnool`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arunaskitchen.com';
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: `${siteUrl}${product.image}`,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Aruna’s Kitchen',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      availability: product.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'LocalBusiness',
        name: 'Aruna’s Kitchen Kurnool',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <ProductDetails product={product} />
    </>
  );
}
