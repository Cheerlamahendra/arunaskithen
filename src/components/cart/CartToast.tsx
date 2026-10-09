'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ShoppingBag, X } from 'lucide-react';
import type { ToastItem } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';

interface CartToastProps {
  toast: ToastItem | null;
  onClose: () => void;
}

export default function CartToast({ toast, onClose }: CartToastProps) {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (!toast) return;

    setIsLeaving(false);

    // Auto-dismiss after 3.8 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 3800);

    return () => clearTimeout(timer);
  }, [toast?.id]);

  if (!toast) return null;

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsLeaving(false);
      onClose();
    }, 240);
  };

  const { product, quantity, actionType } = toast;
  const isIncreased = actionType === 'increased';
  const unitLabel = product.unit
    ? product.unit === 'Combo Pack'
      ? 'pack'
      : product.unit
    : '1 kg';

  return (
    <div className="cart-toast-wrapper" role="status" aria-live="polite">
      <div className={`cart-toast ${isLeaving ? 'leaving' : ''}`}>
        {/* Product Image Thumbnail with Checkmark Badge */}
        <div className="cart-toast-thumbnail">
          <Image
            src={product.image}
            alt={product.name}
            width={48}
            height={48}
            className="cart-toast-img"
          />
          <span className="cart-toast-check-badge" aria-hidden="true">
            <Check size={11} strokeWidth={3.4} />
          </span>
        </div>

        {/* Product Information */}
        <div className="cart-toast-info">
          <div className="cart-toast-heading">
            <span className="cart-toast-success-text">
              {isIncreased ? 'Quantity Updated (+1)' : 'Added to Cart!'}
            </span>
          </div>
          <p className="cart-toast-product-name" title={product.name}>
            {product.name}
          </p>
          <div className="cart-toast-subline">
            <span>
              {isIncreased
                ? `Now ${quantity} ${quantity > 1 && unitLabel === 'pack' ? 'packs' : unitLabel}`
                : `${quantity} ${quantity > 1 && unitLabel === 'pack' ? 'packs' : unitLabel}`}
            </span>
            <span className="cart-toast-dot">•</span>
            <span className="cart-toast-price">
              {formatCurrency(product.price * quantity)}
            </span>
          </div>
        </div>

        {/* View Cart & Close Buttons */}
        <div className="cart-toast-actions">
          <Link
            href="/cart"
            onClick={handleClose}
            className="cart-toast-view-btn"
            aria-label="View items in cart"
          >
            <ShoppingBag size={14} />
            <span>View Cart</span>
          </Link>
          <button
            type="button"
            onClick={handleClose}
            className="cart-toast-close-btn"
            aria-label="Dismiss notification"
          >
            <X size={15} />
          </button>
        </div>

        {/* Animated 3.8s Progress Indicator */}
        <div className="cart-toast-progress-bar" />
      </div>
    </div>
  );
}
