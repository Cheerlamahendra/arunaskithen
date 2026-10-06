import type { Product } from '@/types/product';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) return <div className="empty-state"><div>⌕</div><h3>No products found.</h3><p>Try another search or category.</p></div>;
  return <div className="product-grid">{products.map((product) => <ProductCard product={product} key={product.id}/>)}</div>;
}
