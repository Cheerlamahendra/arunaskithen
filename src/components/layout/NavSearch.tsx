'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, ChevronRight, Tag } from 'lucide-react';
import { products } from '@/data/products';
import { formatCurrency } from '@/lib/utils';

export default function NavSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Filter products based on search query
  const matchingProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  // Focus mobile input when opened
  useEffect(() => {
    if (mobileSearchOpen) {
      setTimeout(() => {
        mobileInputRef.current?.focus();
      }, 50);
    }
  }, [mobileSearchOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setMobileSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectProduct = () => {
    setIsOpen(false);
    setMobileSearchOpen(false);
    setQuery('');
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <div className="nav-search-wrapper" ref={containerRef}>
      {/* =========================================
          DESKTOP SEARCH BAR
         ========================================= */}
      <div className="desktop-search-bar">
        <Search size={16} className="nav-search-icon" />
        <input
          type="text"
          className="nav-search-input"
          placeholder="Search foods, snacks, sweets..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          aria-label="Search items"
        />
        {query && (
          <button
            type="button"
            className="nav-search-clear"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* =========================================
          MOBILE SEARCH ICON (only icon shown by default)
         ========================================= */}
      <button
        type="button"
        className="mobile-search-icon-btn"
        onClick={() => {
          setMobileSearchOpen(true);
          setIsOpen(true);
        }}
        aria-label="Open search"
      >
        <Search size={22} />
      </button>

      {/* =========================================
          MOBILE FULL-WIDTH SEARCH OVERLAY BAR
         ========================================= */}
      {mobileSearchOpen && (
        <div className="mobile-search-fullbar-overlay">
          <div className="mobile-search-inner">
            <Search size={18} className="mobile-bar-icon" />
            <input
              ref={mobileInputRef}
              type="text"
              className="mobile-bar-input"
              placeholder="Search sweets, snacks, karam..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              aria-label="Search products"
            />
            {query && (
              <button
                type="button"
                className="mobile-bar-clear"
                onClick={clearSearch}
                aria-label="Clear text"
              >
                <X size={16} />
              </button>
            )}
            <button
              type="button"
              className="mobile-bar-cancel"
              onClick={() => {
                setMobileSearchOpen(false);
                setIsOpen(false);
                setQuery('');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* =========================================
          SEARCH RESULTS DROPDOWN (below search)
         ========================================= */}
      {isOpen && (mobileSearchOpen || query.trim() !== '') && (
        <div
          className={`nav-search-dropdown ${mobileSearchOpen ? 'mobile-dropdown-fullscreen' : ''}`}
          role="region"
          aria-label="Search results"
        >
          {query.trim() === '' ? (
            <div className="nav-search-empty-prompt">
              <span className="search-hint-title">
                <Tag size={13} /> Popular Categories
              </span>
              <div className="search-quick-tags">
                {['Snacks', 'Sweets', 'Pickles', 'Karam & Spices'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="search-tag-chip"
                    onClick={() => {
                      setQuery(tag);
                      setIsOpen(true);
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : matchingProducts.length > 0 ? (
            <div className="nav-search-results">
              <div className="nav-search-header">
                <span>{matchingProducts.length} items found</span>
              </div>
              <ul className="nav-search-list">
                {matchingProducts.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="nav-search-item"
                      onClick={handleSelectProduct}
                    >
                      <div className="nav-search-item-img">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={44}
                          height={44}
                          className="search-thumb"
                        />
                      </div>
                      <div className="nav-search-item-info">
                        <strong className="nav-search-item-name">
                          {product.name}
                        </strong>
                        <div className="nav-search-item-meta">
                          <span className="nav-search-item-cat">
                            {product.category}
                          </span>
                          <span className="nav-search-item-price">
                            {formatCurrency(product.price)} / 1 kg
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="nav-search-arrow" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="nav-search-no-results">
              <p>
                No delicacies found for <strong>&ldquo;{query}&rdquo;</strong>
              </p>
              <small>Try searching &ldquo;Chutallu&rdquo;, &ldquo;Laddu&rdquo;, or &ldquo;Pickles&rdquo;</small>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
