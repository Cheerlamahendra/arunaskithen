import { Heart, Leaf, Sparkles } from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';

const features = [
  [Heart, 'Homemade Taste', 'Traditional recipes prepared with care.'],
  [Sparkles, 'Authentic Rayalaseema Flavors', 'Inspired by traditional regional food.'],
  [Leaf, 'Quality Ingredients', 'Carefully selected ingredients for every batch.'],
  [WhatsAppIcon, 'Easy WhatsApp Ordering', 'Order directly through WhatsApp.'],
] as const;

export default function WhyChooseUs() {
  return <section className="why-section"><div className="container"><div className="section-heading centered"><span>Why Aruna’s</span><h2>Made With Care, Served With Love</h2></div><div className="feature-grid">{features.map(([Icon, title, text]) => <article className="feature-card" key={title}><div className="feature-icon"><Icon size={23}/></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>;
}
