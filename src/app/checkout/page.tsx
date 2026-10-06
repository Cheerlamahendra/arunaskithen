'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import type { CustomerDetails } from '@/lib/whatsapp';
import type { CartItem } from '@/types/product';
import CustomerForm from '@/components/checkout/CustomerForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { formatCurrency } from '@/lib/utils';
import { generateWhatsAppUrl } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';

const initial: CustomerDetails = {
  name: '',
  mobile: '',
  doorNo: '',
  street: '',
  city: 'Kurnool',
  district: 'Kurnool',
  state: 'Andhra Pradesh',
  pincode: '',
  landmark: '',
  instructions: '',
};

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [customer, setCustomer] = useState(initial);
  const [review, setReview] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [completedOrderData, setCompletedOrderData] = useState<{
    customerName: string;
    totalAmount: number;
    totalKg: number;
    whatsappUrl: string;
    orderedItems: CartItem[];
  } | null>(null);

  const handleOrderPlaced = () => {
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totalKg = items.reduce((sum, item) => sum + item.quantity, 0);
    const whatsappUrl = generateWhatsAppUrl(items, customer);

    setCompletedOrderData({
      customerName: customer.name,
      totalAmount,
      totalKg,
      whatsappUrl,
      orderedItems: [...items],
    });
    setOrderCompleted(true);
    clearCart();
  };

  /*
   * 1. Order Completed State:
   * Shown right after the customer clicks "Order on WhatsApp".
   * Reassures the customer that their order was dispatched to WhatsApp
   * and clearly displays that the cart has been emptied.
   */
  if (orderCompleted && completedOrderData) {
    return (
      <main className="simple-page order-success-page">
        <div className="container order-success-card">
          <div className="order-success-icon-wrap">
            <CheckCircle2 size={54} className="order-success-icon" />
          </div>

          <span className="order-success-pill">Order Sent via WhatsApp</span>

          <h1>Thank you, {completedOrderData.customerName || 'Valued Customer'}!</h1>

          <p className="order-success-lead">
            Your order has been sent to <strong>Aruna&apos;s Kitchen</strong> via WhatsApp.
          </p>

          <div className="order-success-meta">
            <div className="success-meta-item">
              <span className="meta-label">Total Amount</span>
              <strong className="meta-value">
                {formatCurrency(completedOrderData.totalAmount)}
              </strong>
            </div>
            <div className="success-meta-item">
              <span className="meta-label">Total Quantity</span>
              <strong className="meta-value">
                {completedOrderData.totalKg} kg
              </strong>
            </div>
          </div>

          {/* Ordered items preview with images */}
          {completedOrderData.orderedItems.length > 0 && (
            <div className="order-success-items-list">
              <span className="success-items-title">Items Ordered</span>
              {completedOrderData.orderedItems.map((item) => (
                <div className="order-success-item-row" key={item.productId}>
                  <div className="order-success-item-left">
                    <div className="order-success-thumb">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="review-thumb-img"
                      />
                    </div>
                    <div>
                      <strong>{item.name}</strong>
                      <small>{item.quantity} kg × {formatCurrency(item.price)}</small>
                    </div>
                  </div>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="order-success-box">
            <WhatsAppIcon size={22} colored={true} />
            <p>
              WhatsApp has been opened with your order and delivery details pre-filled.
              Our team at Aruna&apos;s Kitchen will message you back shortly to confirm delivery.
            </p>
          </div>

          <div className="order-success-actions">
            <Link href="/#products" className="primary-button full">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /*
   * 2. Empty Cart State:
   * If cart is empty (e.g. customer navigates to /checkout with no items or refreshes)
   */
  if (!items.length) {
    return (
      <main className="simple-page">
        <div className="container empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add products before checkout.</p>
          <Link href="/#products" className="primary-button">
            Explore Products
          </Link>
        </div>
      </main>
    );
  }

  /*
   * 3. Normal Checkout Flow (Form / Review)
   */
  return (
    <main className="checkout-page">
      <div className="container">
        <Link href="/cart" className="back-link">
          <ArrowLeft size={17} /> Back to Cart
        </Link>

        <div className="page-heading">
          <span>WhatsApp ordering</span>
          <h1>{review ? 'Review Your Order' : 'Customer Details'}</h1>
          <p>
            {review
              ? 'Check everything once before sending your order.'
              : 'Enter your delivery details. No online payment is required.'}
          </p>
        </div>

        <div className="checkout-layout">
          {review ? (
            <OrderSummary
              items={items}
              customer={customer}
              onEdit={() => setReview(false)}
              onOrderPlaced={handleOrderPlaced}
            />
          ) : (
            <CustomerForm
              value={customer}
              onChange={setCustomer}
              onSubmit={() => setReview(true)}
            />
          )}

          <aside className="checkout-note">
            <strong>Ordering directly</strong>
            <p>
              Your order will be sent to <b>+91 9553357971</b> through WhatsApp.
            </p>
            <div className="mini-steps">
              <span>1</span>
              <p>Enter your details</p>
              <span>2</span>
              <p>Review your items</p>
              <span>3</span>
              <p>Send on WhatsApp</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
