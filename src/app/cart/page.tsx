'use client';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/context/CartContext';
export default function CartPage(){const{items}=useCart();return <main className="simple-page"><div className="container"><Link href="/#products" className="back-link"><ArrowLeft size={17}/> Continue Shopping</Link><div className="page-heading"><span>Your basket</span><h1>Your Cart</h1><p>{items.length?'Review your favorites before entering delivery details.':'Your cart is waiting for some homemade favorites.'}</p></div>{items.length?<div className="cart-layout"><div className="cart-list">{items.map(item=><CartItem key={item.productId} item={item}/>)}</div><CartSummary/></div>:<div className="empty-cart"><ShoppingBag size={44}/><h2>Your cart is empty</h2><p>Add your favorite homemade foods to continue.</p><Link href="/#products" className="primary-button">Explore Products</Link></div>}</div></main>}
