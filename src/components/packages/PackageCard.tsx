'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ShoppingCart, Sparkles, Check } from 'lucide-react';
import { useState } from 'react';

import type { PackageOffer } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import QuantitySelector from '@/components/products/QuantitySelector';

export default function PackageCard({
  packageOffer,
}: {
  packageOffer: PackageOffer;
}) {
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState<string>(packageOffer.image);

  const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    items,
  } = useCart();

  // Find this package in cart
  const cartItem = items.find((item) => item.productId === packageOffer.id);
  const isInCart = Boolean(cartItem && cartItem.quantity > 0);

  const handleAddToCart = (e?: React.MouseEvent<HTMLButtonElement>) => {
    addToCart(packageOffer, 1, e?.currentTarget);
    setAdded(true);
    window.setTimeout(() => {
      setAdded(false);
    }, 1000);
  };

  const handleIncrease = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (!cartItem) return;
    increaseQuantity(packageOffer.id, e?.currentTarget);
  };

  const handleDecrease = () => {
    if (!cartItem) return;
    if (cartItem.quantity <= 1) {
      removeFromCart(packageOffer.id);
      return;
    }
    decreaseQuantity(packageOffer.id);
  };

  const savings = packageOffer.originalPrice - packageOffer.price;

  return (
    <article className="product-card package-card">
      {/* Package Image & Badges */}
      <div className="product-image-wrap package-image-wrap">
        <Link
          href={`/products/${packageOffer.slug}`}
          className="package-image-link"
          aria-label={`View ${packageOffer.name}`}
        >
          <Image
            src={activeImage}
            alt={`Authentic homemade ${packageOffer.name}`}
            fill
            sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw"
            className="product-image"
          />
        </Link>

        {/* Category & Badge */}
        <span className="product-category package-badge">
          <Sparkles size={11} className="inline-icon" /> Combo Pack
        </span>

        {savings > 0 && (
          <span className="package-save-tag">
            Save {formatCurrency(savings)}
          </span>
        )}

        {/* Quick image preview thumbs */}
        <div className="package-preview-thumbs" aria-label="Package items thumbnails">
          <button
            type="button"
            className={`pkg-thumb ${activeImage === packageOffer.image ? 'active' : ''}`}
            onClick={() => setActiveImage(packageOffer.image)}
            title="View Combo Collage"
          >
            All 3
          </button>
          {packageOffer.packageItems.map((item, idx) => (
            <button
              key={idx}
              type="button"
              className={`pkg-thumb ${activeImage === item.image ? 'active' : ''}`}
              onClick={() => setActiveImage(item.image)}
              title={`View ${item.name}`}
            >
              #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Package Details */}
      <div className="product-body package-body">
        {/* Title */}
        <Link
          href={`/products/${packageOffer.slug}`}
          className="product-name package-title"
        >
          {packageOffer.name}
        </Link>

        {/* Subtitle / Total weight */}
        <div className="package-subtitle">
          <span>{packageOffer.subtitle}</span>
          <span className="package-weight-badge">{packageOffer.totalWeight} Total</span>
        </div>

        {/* Included Items with Quantities */}
        <div className="package-items-box">
          <strong className="package-items-header">Includes 3 Handcrafted Items:</strong>
          <ul className="package-items-list">
            {packageOffer.packageItems.map((item, idx) => (
              <li key={idx} className="package-item-row">
                <span className="package-check-mark">
                  <Check size={13} strokeWidth={3} />
                </span>
                <span className="package-item-title">{item.name}</span>
                <span className="package-item-qty">{item.weight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Line */}
        <div className="price-line package-price-line">
          <div className="package-price-wrap">
            <strong>{formatCurrency(packageOffer.price)}</strong>
            <span className="package-unit-text">/ 3-Item Pack</span>
          </div>
          {packageOffer.originalPrice > packageOffer.price && (
            <del className="package-struck-price">
              {formatCurrency(packageOffer.originalPrice)}
            </del>
          )}
        </div>

        {/* CART CONTROLS */}
        {!isInCart ? (
          <button
            type="button"
            className={`add-button ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={!packageOffer.available}
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
          <div className="product-cart-controls">
            <QuantitySelector
              quantity={cartItem?.quantity ?? 1}
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
            />

            <Link
              href="/cart"
              className="add-button view-cart-button"
              aria-label={`View ${packageOffer.name} in cart`}
            >
              <ShoppingBag size={15} />
              View in Cart
            </Link>
          </div>
        )}

        {!packageOffer.available && (
          <small className="unavailable">Currently Unavailable</small>
        )}
      </div>
    </article>
  );
}
