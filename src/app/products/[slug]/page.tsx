import { notFound } from 'next/navigation';
import ProductDetails from '@/components/products/ProductDetails';
import { getProductBySlug, products } from '@/data/products';
export function generateStaticParams(){return products.map(product=>({slug:product.slug}));}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const product=getProductBySlug(slug);if(!product)notFound();return <ProductDetails product={product}/>;}
