import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arunaskitchen.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/cart', '/checkout'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/images/', '/favicon*.png', '/apple-touch-icon.png', '/og-image.jpg'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
