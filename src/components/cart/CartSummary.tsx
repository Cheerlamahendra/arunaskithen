import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';

export default function CartSummary() {
  const { items, getCartTotal, getCartItemCount } = useCart();
  return <aside className="cart-summary"><div className="summary-row"><span>Subtotal</span><strong>{formatCurrency(getCartTotal())}</strong></div><div className="summary-row"><span>Total Items</span><strong>{getCartItemCount()} kg</strong></div><div className="summary-total"><span>Total Amount</span><strong>{formatCurrency(getCartTotal())}</strong></div><Link className="primary-button full" href={items.length ? '/checkout' : '/#products'}>{items.length ? 'Proceed to Order' : 'Explore Products'} <ArrowRight size={18}/></Link><small>You will enter your delivery details before placing the order on WhatsApp.</small></aside>;
}
