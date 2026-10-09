'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

import type { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import QuantitySelector from './QuantitySelector';

export default function ProductCard({
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

  // Find the product in the cart
  const cartItem = items.find(
    (item) => item.productId === product.id
  );

  const isInCart = Boolean(cartItem && cartItem.quantity > 0);

  /*
   * ADD TO CART
   * Adds 1 kg to cart on initial click.
   */
  const handleAddToCart = (e?: React.MouseEvent<HTMLButtonElement>) => {
    addToCart(product, 1, e?.currentTarget);
    setAdded(true);
    window.setTimeout(() => {
      setAdded(false);
    }, 1000);
  };

  /*
   * PLUS BUTTON
   */
  const handleIncrease = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (!cartItem) return;
    increaseQuantity(product.id, e?.currentTarget);
  };

  /*
   * MINUS BUTTON
   * When quantity is 1 or reaches 0, removes the product from the cart completely,
   * reverting back to the "Add to Cart" button.
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
    <article className="product-card">
      {/* Product Image */}
      <Link
        href={`/products/${product.slug}`}
        className="product-image-wrap"
        aria-label={`View ${product.name}`}
      >
        <Image
          src={product.image}
          alt={`Traditional homemade ${product.name}`}
          fill
          sizes="(max-width: 600px) 45vw, (max-width: 1000px) 30vw, 23vw"
          className="product-image"
        />

        <span className="product-category">
          {product.category}
        </span>
      </Link>

      {/* Product Details */}
      <div className="product-body">
        {/* Product Name */}
        <Link
          href={`/products/${product.slug}`}
          className="product-name"
        >
          {product.name}
        </Link>

        {/* Price */}
        <div className="price-line">
          <strong>
            {formatCurrency(product.price)}
          </strong>
          <span>/ 1 kg</span>
        </div>

        {/* =========================================
            CART CONTROLS
           ========================================= */}
        {!isInCart ? (
          /*
           * INITIAL STATE (Quantity = 0 / not in cart)
           * Only Add to Cart is displayed.
           */
          <button
            type="button"
            className={`add-button ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={!product.available}
          >
            {added ? (
              'Added to Cart'
            ) : (
              <>
                <ShoppingCart size={16} />
                Add to Cart
              </>
            )}
          </button>
        ) : (
          /*
           * PRODUCT IS IN CART (Quantity > 0)
           * Shows Quantity Selector and changes Add to Cart to View in Cart!
           */
          <div className="product-cart-controls">
            {/* Quantity */}
            <QuantitySelector
              quantity={cartItem?.quantity ?? 1}
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
            />

            {/* View in Cart button - opens the cart page */}
            <Link
              href="/cart"
              className="add-button view-cart-button"
              aria-label={`View ${product.name} in cart`}
            >
              <ShoppingBag size={15} />
              View in Cart
            </Link>
          </div>
        )}

        {/* Unavailable */}
        {!product.available && (
          <small className="unavailable">
            Currently Unavailable
          </small>
        )}
      </div>
    </article>
  );
}