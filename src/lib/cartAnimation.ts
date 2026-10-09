/**
 * Handles the animated flying item effect from the clicked button/card
 * to the cart icon (Top Nav on Desktop, Bottom Nav on Mobile).
 */

export function triggerFlyToCartAnimation(
  imageUrl?: string,
  source?: HTMLElement | React.MouseEvent | TouchEvent | null
) {
  if (typeof window === 'undefined') return;

  // Respect user preference for reduced motion
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return;
  }

  // 1. Determine Start Coordinates (Source button / click position)
  let startX = window.innerWidth / 2;
  let startY = window.innerHeight / 2;

  if (source) {
    if (
      'getBoundingClientRect' in source &&
      typeof source.getBoundingClientRect === 'function'
    ) {
      const rect = source.getBoundingClientRect();
      startX = rect.left + rect.width / 2;
      startY = rect.top + rect.height / 2;
    } else if (
      'currentTarget' in source &&
      source.currentTarget &&
      typeof (source.currentTarget as HTMLElement).getBoundingClientRect ===
        'function'
    ) {
      const rect = (
        source.currentTarget as HTMLElement
      ).getBoundingClientRect();
      startX = rect.left + rect.width / 2;
      startY = rect.top + rect.height / 2;
    } else if (
      'clientX' in source &&
      typeof (source as React.MouseEvent).clientX === 'number'
    ) {
      startX = (source as React.MouseEvent).clientX;
      startY = (source as React.MouseEvent).clientY;
    }
  } else if (
    document.activeElement &&
    typeof document.activeElement.getBoundingClientRect === 'function'
  ) {
    const rect = document.activeElement.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      startX = rect.left + rect.width / 2;
      startY = rect.top + rect.height / 2;
    }
  }

  // 2. Determine Target Cart Element (Mobile Bottom Nav vs Desktop Top Nav)
  const isMobile = window.innerWidth <= 768;
  let targetEl: HTMLElement | null = null;

  if (isMobile) {
    targetEl = (document.getElementById('mobile-cart-icon') ||
      document.querySelector('.bottom-nav-cart-bubble') ||
      document.querySelector('.bottom-nav-cart-item')) as HTMLElement | null;
  }

  // Fallback to desktop if mobile not found or hidden
  if (!targetEl || targetEl.offsetParent === null) {
    targetEl = (document.getElementById('desktop-cart-icon') ||
      document.querySelector('.cart-button.desktop-only') ||
      document.querySelector('.cart-button')) as HTMLElement | null;
  }

  // Fallback if desktop also not visible, re-check mobile
  if (!targetEl || targetEl.offsetParent === null) {
    targetEl = (document.getElementById('mobile-cart-icon') ||
      document.getElementById('desktop-cart-icon')) as HTMLElement | null;
  }

  let targetX = isMobile ? window.innerWidth / 2 : window.innerWidth - 60;
  let targetY = isMobile ? window.innerHeight - 38 : 42;

  if (targetEl) {
    const targetRect = targetEl.getBoundingClientRect();
    targetX = targetRect.left + targetRect.width / 2;
    targetY = targetRect.top + targetRect.height / 2;
  }

  // 3. Create Flyer Element in DOM
  const flyer = document.createElement('div');
  flyer.className = 'fly-to-cart-item';
  flyer.setAttribute('aria-hidden', 'true');

  if (imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = '';
    flyer.appendChild(img);
  } else {
    flyer.innerHTML = `<span style="font-size:22px;">🛍️</span>`;
  }

  document.body.appendChild(flyer);

  // 4. Calculate Keyframe Trajectory
  const dx = targetX - startX;
  const dy = targetY - startY;

  let keyframes: Keyframe[] = [];

  if (targetY < startY) {
    // Desktop: Moving upward towards top header
    const midX1 = startX + dx * 0.18;
    const midY1 = startY - 35;

    const midX2 = startX + dx * 0.68;
    const midY2 = Math.min(startY, targetY) - 45;

    keyframes = [
      {
        transform: `translate3d(${startX}px, ${startY}px, 0) scale(0.7) rotate(0deg)`,
        opacity: 0.9,
      },
      {
        transform: `translate3d(${midX1}px, ${midY1}px, 0) scale(1.15) rotate(-12deg)`,
        opacity: 1,
        offset: 0.25,
      },
      {
        transform: `translate3d(${midX2}px, ${midY2}px, 0) scale(0.85) rotate(14deg)`,
        opacity: 0.95,
        offset: 0.7,
      },
      {
        transform: `translate3d(${targetX}px, ${targetY}px, 0) scale(0.18) rotate(25deg)`,
        opacity: 0,
        offset: 1,
      },
    ];
  } else {
    // Mobile: Moving downward towards bottom navigation bar
    const popUpY = startY - 50;
    const midX1 = startX + dx * 0.22;

    const midX2 = startX + dx * 0.75;
    const midY2 = startY + dy * 0.65;

    keyframes = [
      {
        transform: `translate3d(${startX}px, ${startY}px, 0) scale(0.7) rotate(0deg)`,
        opacity: 0.9,
      },
      {
        transform: `translate3d(${midX1}px, ${popUpY}px, 0) scale(1.2) rotate(12deg)`,
        opacity: 1,
        offset: 0.25,
      },
      {
        transform: `translate3d(${midX2}px, ${midY2}px, 0) scale(0.8) rotate(-8deg)`,
        opacity: 0.95,
        offset: 0.7,
      },
      {
        transform: `translate3d(${targetX}px, ${targetY}px, 0) scale(0.18) rotate(0deg)`,
        opacity: 0,
        offset: 1,
      },
    ];
  }

  // 5. Execute Animation & Trigger Cart Reaction
  try {
    const animation = flyer.animate(keyframes, {
      duration: 750,
      easing: 'cubic-bezier(0.2, 0.8, 0.25, 1)',
      fill: 'forwards',
    });

    animation.onfinish = () => {
      flyer.remove();

      // Trigger bounce & ripple effect on the target cart element
      if (targetEl) {
        targetEl.classList.remove('cart-bounce-effect');
        void targetEl.offsetWidth; // Force CSS reflow
        targetEl.classList.add('cart-bounce-effect');

        // Also pulse cart counter badge if present
        const badge = targetEl.querySelector(
          '.cart-count, .bottom-cart-badge'
        );
        if (badge) {
          badge.classList.remove('cart-badge-bounce');
          void (badge as HTMLElement).offsetWidth;
          badge.classList.add('cart-badge-bounce');
          setTimeout(() => badge.classList.remove('cart-badge-bounce'), 600);
        }

        setTimeout(() => {
          if (targetEl) targetEl.classList.remove('cart-bounce-effect');
        }, 650);
      }
    };
  } catch {
    // Fallback if Web Animations API fails
    flyer.remove();
  }
}
