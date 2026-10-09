import type { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { packages } from '@/data/packages';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arunaskitchen.com';
  const currentDate = new Date();

  // Primary indexable pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Combo packages
  const packageRoutes: MetadataRoute.Sitemap = packages.map((pkg) => ({
    url: `${siteUrl}/products/${pkg.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Individual products
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...packageRoutes, ...productRoutes];
}
