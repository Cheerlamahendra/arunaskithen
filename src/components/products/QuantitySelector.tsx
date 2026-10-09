'use client';

import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onDecrease: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  onIncrease: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function QuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
}: QuantitySelectorProps) {
  return (
    <div
      className="quantity-selector"
      aria-label="Quantity selector"
    >
      <button
        type="button"
        onClick={onDecrease}
        aria-label={
          quantity === 1
            ? 'Remove product'
            : 'Decrease quantity'
        }
      >
        <Minus size={14} />
      </button>

      <span aria-live="polite">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}