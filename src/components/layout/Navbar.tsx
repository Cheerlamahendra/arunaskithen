'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import NavSearch from './NavSearch';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'home' | 'products' | 'packages' | 'about' | 'contact'>('home');
  const { getCartItemCount } = useCart();
  const cartCount = getCartItemCount();

  const closeDrawer = () => setDrawerOpen(false);

  // Active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const productsEl = document.getElementById('products');
      const packagesEl = document.getElementById('packages');
      const aboutEl = document.getElementById('about');
      const contactEl = document.getElementById('contact');

      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;

      if (isAtBottom || (contactEl && scrollY >= contactEl.offsetTop - 300)) {
        setActiveSection('contact');
      } else if (aboutEl && scrollY >= aboutEl.offsetTop - 300) {
        setActiveSection('about');
      } else if (packagesEl && scrollY >= packagesEl.offsetTop - 300) {
        setActiveSection('packages');
      } else if (productsEl && scrollY >= productsEl.offsetTop - 300) {
        setActiveSection('products');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="container nav-inner">
          {/* Brand Logo & Name */}
          <Link href="/" className="brand" onClick={closeDrawer} aria-label="Aruna’s Kitchen home">
            <Image
              src="/images/logo/arunas-logo.jpeg"
              alt="Arunass Kitchen - Flavors of Rayalaseema"
              width={64}
              height={64}
              className="brand-logo"
              priority
            />
            <span className="brand-copy">
              <strong>Arunass Kitchen</strong>
              <small>Flavors of Rayalaseema</small>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link
              href="/#home"
              onClick={() => setActiveSection('home')}
              className={activeSection === 'home' ? 'nav-active' : ''}
            >
              Home
            </Link>
            <Link
              href="/#products"
              onClick={() => setActiveSection('products')}
              className={activeSection === 'products' ? 'nav-active' : ''}
            >
              Products
            </Link>
            <Link
              href="/#packages"
              onClick={() => setActiveSection('packages')}
              className={activeSection === 'packages' ? 'nav-active' : ''}
            >
              Packages
            </Link>
            <Link
              href="/#about"
              onClick={() => setActiveSection('about')}
              className={activeSection === 'about' ? 'nav-active' : ''}
            >
              About Us
            </Link>
            <Link
              href="/#contact"
              onClick={() => setActiveSection('contact')}
              className={activeSection === 'contact' ? 'nav-active' : ''}
            >
              Contact
            </Link>
          </nav>

          {/* Search & Actions */}
          <div className="nav-actions">
            {/* Search (Desktop input / Mobile icon trigger) */}
            <NavSearch />

            {/* Desktop Cart Icon Button (hidden on mobile) */}
            <Link
              href="/cart"
              className="icon-button cart-button desktop-only"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag size={21} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>

            {/* Mobile menu toggle: ONLY three lines, no box/border */}
            <button
              type="button"
              className="menu-button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={26} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================
          MOBILE RIGHT SLIDE DRAWER (SLIDE PLATE)
         ========================================= */}
      {drawerOpen && (
        <div
          className="drawer-backdrop"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      <aside
        className={`mobile-slide-drawer ${drawerOpen ? 'open' : ''}`}
        aria-label="Mobile side navigation"
      >
        <div className="drawer-header">
          <div className="drawer-brand">
            <Image
              src="/images/logo/arunas-logo.jpeg"
              alt="Arunass Kitchen"
              width={46}
              height={46}
              className="brand-logo"
            />
            <div className="drawer-brand-text">
              <strong>Arunass Kitchen</strong>
              <small>Flavors of Rayalaseema</small>
            </div>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={closeDrawer}
            aria-label="Close menu"
          >
            <X size={25} />
          </button>
        </div>

        <nav className="drawer-nav">
          <Link
            href="/#home"
            onClick={() => {
              setActiveSection('home');
              closeDrawer();
            }}
            className={`drawer-link ${activeSection === 'home' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            href="/#products"
            onClick={() => {
              setActiveSection('products');
              closeDrawer();
            }}
            className={`drawer-link ${activeSection === 'products' ? 'active' : ''}`}
          >
            Products
          </Link>
          <Link
            href="/#packages"
            onClick={() => {
              setActiveSection('packages');
              closeDrawer();
            }}
            className={`drawer-link ${activeSection === 'packages' ? 'active' : ''}`}
          >
            Packages
          </Link>
          <Link
            href="/#about"
            onClick={() => {
              setActiveSection('about');
              closeDrawer();
            }}
            className={`drawer-link ${activeSection === 'about' ? 'active' : ''}`}
          >
            About Us
          </Link>
          <Link
            href="/#contact"
            onClick={() => {
              setActiveSection('contact');
              closeDrawer();
            }}
            className={`drawer-link ${activeSection === 'contact' ? 'active' : ''}`}
          >
            Contact
          </Link>
        </nav>

        <div className="drawer-footer">
          <a
            className="whatsapp-button full"
            href="https://wa.me/918143645962?text=Hello%20Aruna%E2%80%99s%20Kitchen%2C%20I%20came%20from%20your%20website%20and%20would%20like%20to%20order."
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeDrawer}
          >
            <WhatsAppIcon size={20} colored={false} /> Order on WhatsApp
          </a>
          <p className="drawer-subtext">
            Traditional Homemade Delicacies from Kurnool
          </p>
        </div>
      </aside>
    </>
  );
}
