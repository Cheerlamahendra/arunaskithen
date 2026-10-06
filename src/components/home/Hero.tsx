import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero" aria-label="Aruna's Kitchen homemade food">
      <div className="hero-image">
        <Image
          src="/images/hero/rayalaseema-food-hero.png"
          alt="Aruna's Kitchen - Homemade Rayalaseema Food"
          fill
          priority
          sizes="100vw"
          className="hero-image-content"
        />
      </div>
    </section>
  );
}