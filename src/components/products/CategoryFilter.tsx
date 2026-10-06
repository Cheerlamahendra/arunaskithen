'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { categories, type CategoryFilter } from '@/data/categories';

const categoryImages: Record<CategoryFilter, string> = {
  All: '/images/categories/all-sm.jpeg',
  Snacks: '/images/categories/snacks-sm.jpeg',
  Sweets: '/images/categories/sweets-sm.jpeg',
  Karjikay: '/images/categories/karjikay-sm.jpeg',
  'Karam & Spices': '/images/categories/karam-sm.jpeg',
  Pickles: '/images/categories/pickles-sm.jpeg',
  'Farm Products': '/images/categories/farm-sm.png',
};

export default function CategoryFilter({
  category,
  search,
  onCategory,
  onSearch,
}: {
  category: CategoryFilter;
  search: string;
  onCategory: (value: CategoryFilter) => void;
  onSearch: (value: string) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  };

  useEffect(() => {
    checkScroll();
    const handleResize = () => checkScroll();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollerRef.current) return;
    const amount = direction === 'left' ? -220 : 220;
    scrollerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(checkScroll, 320);
  };

  const handleSelect = (item: CategoryFilter, e: React.MouseEvent<HTMLButtonElement>) => {
    onCategory(item);
    e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <div className="filter-bar">
      {/* Search products bar */}
      <div className="search-box">
        <Search size={18} />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
        />
        {search && (
          <button onClick={() => onSearch('')} aria-label="Clear search">
            <X size={17} />
          </button>
        )}
      </div>

      {/* Category horizontal scrolling bar with left & right navigation buttons */}
      <div className="category-scroll-container">
        {canScrollLeft && (
          <button
            type="button"
            className="category-scroll-arrow arrow-left"
            onClick={() => handleScroll('left')}
            aria-label="Scroll categories left"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        <div
          className="filter-chips"
          ref={scrollerRef}
          onScroll={checkScroll}
          role="tablist"
          aria-label="Filter categories"
        >
          {categories.map((item) => {
            const isSelected = category === item;
            return (
              <button
                key={item}
                type="button"
                className={`filter-chip-btn ${isSelected ? 'selected' : ''}`}
                onClick={(e) => handleSelect(item, e)}
                role="tab"
                aria-selected={isSelected}
              >
                <span className="chip-img-wrap">
                  <Image
                    src={categoryImages[item]}
                    alt={item}
                    width={26}
                    height={26}
                    className="chip-img"
                  />
                </span>
                <span className="chip-name">{item}</span>
              </button>
            );
          })}
        </div>

        {canScrollRight && (
          <button
            type="button"
            className="category-scroll-arrow arrow-right"
            onClick={() => handleScroll('right')}
            aria-label="Scroll categories right"
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
