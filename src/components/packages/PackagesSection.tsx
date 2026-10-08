'use client';

import { packages } from '@/data/packages';
import PackageCard from './PackageCard';

export default function PackagesSection() {
  return (
    <section className="packages-section" id="packages">
      <div className="container">
        <div className="section-heading centered">
          <span>Special Value Combos</span>
          <h2>Exclusive Package Deals</h2>
          <p>
            Experience authentic Rayalaseema favorites bundled together. Perfect for festive celebrations, gifting, and family meals at discounted prices.
          </p>
        </div>

        <div className="product-grid packages-grid">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} packageOffer={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
