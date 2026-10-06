'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ShoppingBag,
  ShoppingCart,
} from 'lucide-react';
import { useState } from 'react';

import type { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import QuantitySelector from './QuantitySelector';

export default function ProductDetails({
  product,
}: {
  product: Product;
}) {
  const [added, setAdded] = useState(false);

  const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    items,
  } = useCart();

  /*
   * Find this product inside the global cart.
   * Keeps product detail page synchronized with home and cart.
   */
  const cartItem = items.find(
    (item) => item.productId === product.id
  );

  const isInCart = Boolean(cartItem && cartItem.quantity > 0);

  /*
   * ADD TO CART
   */
  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    window.setTimeout(() => {
      setAdded(false);
    }, 1000);
  };

  /*
   * PLUS
   */
  const handleIncrease = () => {
    if (!cartItem) return;
    increaseQuantity(product.id);
  };

  /*
   * MINUS
   * When quantity is 1 and user decreases, product is removed from cart,
   * resetting back to the initial "Add to Cart" button.
   */
  const handleDecrease = () => {
    if (!cartItem) return;

    if (cartItem.quantity <= 1) {
      removeFromCart(product.id);
      return;
    }

    decreaseQuantity(product.id);
  };

  return (
    <main className="product-detail-page">
      <div className="container">
        {/* Back button */}
        <Link
          href="/#products"
          className="back-link"
        >
          <ArrowLeft size={17} />
          Back to products
        </Link>

        <div className="product-detail">
          {/* ==============================
              PRODUCT IMAGE
             ============================== */}
          <div className="detail-image">
            <Image
              src={product.image}
              alt={`Homemade ${product.name}`}
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
              priority
            />
          </div>

          {/* ==============================
              PRODUCT INFORMATION
             ============================== */}
          <div className="detail-copy">
            <span className="detail-category">
              {product.category}
            </span>

            <h1>
              {product.name}
            </h1>

            <p className="detail-price">
              {formatCurrency(product.price)}
              <span> / 1 kg</span>
            </p>

            <p>
              {product.description}
            </p>

            <div className="detail-note">
              All listed prices are for 1 kg.
            </div>

            {/* =================================
                CART / QUANTITY / TOTAL
               ================================= */}
            {isInCart ? (
              <div className="detail-row">
                <QuantitySelector
                  quantity={cartItem?.quantity ?? 1}
                  onDecrease={handleDecrease}
                  onIncrease={handleIncrease}
                />

                <span className="detail-total">
                  Total:{' '}
                  <strong>
                    {formatCurrency(
                      product.price * (cartItem?.quantity ?? 1)
                    )}
                  </strong>
                </span>
              </div>
            ) : (
              <div className="detail-row">
                <span className="detail-total">
                  Price per kg:{' '}
                  <strong>
                    {formatCurrency(product.price)}
                  </strong>
                </span>
              </div>
            )}

            {/* =================================
                ACTION BUTTONS
               ================================= */}
            <div className="detail-actions">
              {!isInCart ? (
                /* Initial state: Only Add to Cart is shown */
                <button
                  type="button"
                  className={`add-button large ${added ? 'added' : ''}`}
                  onClick={handleAddToCart}
                  disabled={!product.available}
                >
                  <ShoppingCart size={18} />
                  {added ? 'Added to Cart' : 'Add to Cart'}
                </button>
              ) : (
                /* In Cart state: changes to View in Cart button */
                <Link
                  href="/cart"
                  className="add-button large view-cart-button"
                  aria-label={`View ${product.name} in cart`}
                >
                  <ShoppingBag size={18} />
                  View in Cart
                </Link>
              )}
            </div>

            {!product.available && (
              <small className="unavailable">
                Currently Unavailable
              </small>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}