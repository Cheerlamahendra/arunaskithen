import { Heart, Leaf, Sparkles } from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';

const features = [
  [Heart, 'Homemade Taste in Kurnool', 'Traditional recipes prepared fresh in Kurnool with authentic care.'],
  [Sparkles, 'Authentic Rayalaseema Flavors', 'Pure heritage flavors of Rayalaseema made right at home.'],
  [Leaf, 'Quality Natural Ingredients', 'Handpicked ingredients, pure oils, and farm-fresh spices.'],
  [WhatsAppIcon, 'Easy WhatsApp Ordering', 'Order directly via WhatsApp at +91 8143645962.'],
] as const;

export default function WhyChooseUs() {
  return <section className="why-section"><div className="container"><div className="section-heading centered"><span>Why Aruna’s</span><h2>Made With Care, Served With Love</h2></div><div className="feature-grid">{features.map(([Icon, title, text]) => <article className="feature-card" key={title}><div className="feature-icon"><Icon size={23}/></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>;
}
