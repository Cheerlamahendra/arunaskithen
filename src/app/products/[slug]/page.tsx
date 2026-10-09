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
  const title = `${product.name} (${product.category})`;
  const description = `${product.description} Freshly prepared with traditional Rayalaseema recipes by Arunass Kitchen in Kurnool, Andhra Pradesh. Order authentic homemade ${product.name} on WhatsApp: +91 8143645962.`;

  return {
    title,
    description,
    keywords: [
      product.name,
      `${product.name} Kurnool`,
      `homemade ${product.name}`,
      `${product.category} in Kurnool`,
      'Arunass Kitchen',
      'Arunass Kitchen Kurnool',
      'Rayalaseema foods Kurnool',
      'authentic homemade food Kurnool',
    ],
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Arunass Kitchen Kurnool`,
      description,
      url: `${siteUrl}/products/${product.slug}`,
      siteName: 'Arunass Kitchen',
      type: 'article',
      images: [
        {
          url: `${siteUrl}${product.image}`,
          width: 800,
          height: 800,
          alt: `${product.name} - Traditional Homemade ${product.category} from Arunass Kitchen Kurnool`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Arunass Kitchen Kurnool`,
      description,
      images: [`${siteUrl}${product.image}`],
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

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/products/${product.slug}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Products',
            item: `${siteUrl}/#products`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.name,
            item: `${siteUrl}/products/${product.slug}`,
          },
        ],
      },
      {
        '@type': 'Product',
        '@id': `${siteUrl}/products/${product.slug}#product`,
        name: product.name,
        image: `${siteUrl}${product.image}`,
        description: product.description,
        category: product.category,
        brand: {
          '@type': 'Brand',
          name: 'Arunass Kitchen',
        },
        offers: {
          '@type': 'Offer',
          url: `${siteUrl}/products/${product.slug}`,
          priceCurrency: 'INR',
          price: product.price,
          priceValidUntil: '2026-12-31',
          availability: product.available
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'LocalBusiness',
            name: 'Arunass Kitchen Kurnool',
            telephone: '+918143645962',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Kurnool',
              addressRegion: 'Andhra Pradesh',
              postalCode: '518002',
              addressCountry: 'IN',
            },
          },
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaGraph),
        }}
      />
      <ProductDetails product={product} />
    </>
  );
}
