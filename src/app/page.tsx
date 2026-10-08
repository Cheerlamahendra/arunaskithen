'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/home/Hero';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import HowToOrder from '@/components/home/HowToOrder';
import CTASection from '@/components/home/CTASection';
import ProductGrid from '@/components/products/ProductGrid';
import CategoryFilter from '@/components/products/CategoryFilter';
import PackagesSection from '@/components/packages/PackagesSection';
import { products } from '@/data/products';
import { type CategoryFilter as CategoryFilterType } from '@/data/categories';

export default function HomePage() {
  const [category, setCategory] = useState<CategoryFilterType>('All');
  const [search, setSearch] = useState('');
  const filtered = useMemo(
    () =>
      products.filter(
        (product) =>
          (category === 'All' || product.category === category) &&
          (product.name.toLowerCase().includes(search.toLowerCase().trim()) ||
            product.description.toLowerCase().includes(search.toLowerCase().trim()))
      ),
    [category, search]
  );

  return (
    <main>
      <div id="home">
        <Hero />
      </div>
      <section className="products-section" id="products">
        <div className="container">
          <div className="section-heading">
            <span>Fresh from our kitchen</span>
            <h2>Flavors of our Home</h2>
            <p>
              Explore traditional snacks, sweets, pickles, karam and farm products.
            </p>
          </div>
          <CategoryFilter
            category={category}
            search={search}
            onCategory={setCategory}
            onSearch={setSearch}
          />
          <ProductGrid products={filtered} />
        </div>
      </section>
      <PackagesSection />
      <section className="about-section" id="about">
        <div className="container about-grid">
          <div className="about-art">
            {/* Hero image background in About section */}
           <Image
              src="/images/logo/arunas-logo1.jpeg"
              alt="Aruna’s Kitchen"
              width={400}
              height={400}
              className="about-art-bg"
            />
            {/* <div className="about-art-overlay" /> */}

            {/* Made with Care badge with official logo */}
            {/* <div className="about-circle">
              <div className="about-logo-wrap">
                <Image
                  src="/images/logo/arunas-logo.jpeg"
                  alt="Aruna’s Kitchen Logo"
                  width={104}
                  height={104}
                  className="about-logo-img"
                />
              </div>
              <span>Made with</span>
              <strong>Care</strong>
              <small>Flavors of Rayalaseema</small>
            </div> */}
          </div>
          <div className="about-copy">
            <span className="eyebrow dark">Our story</span>
            <h2>Traditional Taste, Homemade With Love in Kurnool</h2>
            <p>
              Aruna’s Kitchen brings authentic homemade food and traditional Rayalaseema flavors to your doorstep in Kurnool. Freshly prepared at Umaha Mahasvare Nagar, Sudereddy Palli Road, Kurnool (518002), our delicious snacks, sweets, pickles, and karam varieties are crafted with pure ingredients, authentic heritage recipes, and genuine home-cooked care.
            </p>
            <div className="about-points">
              <span>✓ Homemade preparation</span>
              <span>✓ Traditional recipes</span>
              <span>✓ Quality ingredients</span>
              <span>✓ Authentic Rayalaseema flavors</span>
            </div>
            <a href="#products" className="text-link">
              Explore the collection <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>
      <WhyChooseUs />
      <HowToOrder />
      <CTASection />
    </main>
  );
}
