import Link from 'next/link';
export default function NotFound() { return <main className="simple-page"><div className="container empty-cart"><h1>Product not found</h1><p>The product you requested is not available.</p><Link href="/#products" className="primary-button">Browse Products</Link></div></main>; }
