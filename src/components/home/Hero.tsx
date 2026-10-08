import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero" aria-label="Aruna's Kitchen homemade food in Kurnool">
      <h1 className="sr-only">
        Aruna’s Kitchen — Authentic Home Foods in Kurnool | Traditional Rayalaseema Sweets & Snacks
      </h1>
      <div className="hero-image">
        <Image
          src="/images/hero/rayalaseema-food-hero.png"
          alt="Aruna's Kitchen - Authentic Home Foods in Kurnool, Rayalaseema Sweets & Snacks"
          fill
          priority
          sizes="100vw"
          className="hero-image-content"
        />
      </div>
    </section>
  );
}