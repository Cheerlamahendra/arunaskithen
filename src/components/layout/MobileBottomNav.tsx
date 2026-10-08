'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Home,
  Grid3X3,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { getCartItemCount } = useCart();
  const cartCount = getCartItemCount();
  const [activeSection, setActiveSection] = useState<'home' | 'products' | 'about' | 'contact'>('home');

  // Detect active section on scroll
  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const productsEl = document.getElementById('products');
      const aboutEl = document.getElementById('about');
      const contactEl = document.getElementById('contact');

      if (contactEl && scrollY >= contactEl.offsetTop - 300) {
        setActiveSection('contact');
      } else if (aboutEl && scrollY >= aboutEl.offsetTop - 300) {
        setActiveSection('about');
      } else if (productsEl && scrollY >= productsEl.offsetTop - 300) {
        setActiveSection('products');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // WhatsApp inquiry message to Aruna's Kitchen
  const whatsappInquiryMessage = encodeURIComponent(
    'Hello Aruna’s Kitchen, I came from your website. Can you please tell me what type of products you are serving and how I can place an order?'
  );
  const whatsappUrl = `https://wa.me/918143645962?text=${whatsappInquiryMessage}`;

  const isHomeActive = pathname === '/' && activeSection === 'home';
  const isProductsActive = (pathname === '/' && activeSection === 'products') || pathname.startsWith('/products');
  const isCartActive = pathname === '/cart';

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      <div className="bottom-nav-inner bottom-nav-4-items">
        {/* 1. Home */}
        <Link
          href="/#home"
          onClick={() => setActiveSection('home')}
          className={`bottom-nav-item ${isHomeActive ? 'active' : ''}`}
          aria-label="Home"
        >
          <div className="bottom-nav-icon-wrap">
            <Home size={21} />
          </div>
          <span className="bottom-nav-label">Home</span>
        </Link>

        {/* 2. Products */}
        <Link
          href="/#products"
          onClick={() => setActiveSection('products')}
          className={`bottom-nav-item ${isProductsActive ? 'active' : ''}`}
          aria-label="Products"
        >
          <div className="bottom-nav-icon-wrap">
            <Grid3X3 size={21} />
          </div>
          <span className="bottom-nav-label">Products</span>
        </Link>

        {/* 3. Cart - Highlighted & Centered with Scale-up Animation */}
        <Link
          href="/cart"
          className={`bottom-nav-item bottom-nav-cart-item ${isCartActive ? 'active' : ''}`}
          aria-label={`Cart with ${cartCount} items`}
        >
          <div className="bottom-nav-cart-bubble">
            <ShoppingBag size={22} className="cart-bubble-icon" />
            {cartCount > 0 && (
              <span className="bottom-cart-badge">{cartCount}</span>
            )}
          </div>
          <span className="bottom-nav-label cart-label">Cart</span>
        </Link>

        {/* 4. WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bottom-nav-item bottom-nav-whatsapp"
          aria-label="WhatsApp Inquiry"
        >
          <div className="bottom-nav-icon-wrap">
            <WhatsAppIcon size={22} colored={true} />
          </div>
          <span className="bottom-nav-label">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
