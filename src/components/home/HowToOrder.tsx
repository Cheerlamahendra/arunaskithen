import { ArrowRight, ShoppingCart, Utensils } from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';

const steps = [
  [Utensils, '01', 'Choose Your Favorites', 'Browse snacks, sweets, pickles and other products.'],
  [ShoppingCart, '02', 'Add To Cart', 'Select quantity and review your order.'],
  [WhatsAppIcon, '03', 'Order On WhatsApp', 'Enter your details and send the order directly to Aruna’s Kitchen.'],
] as const;

export default function HowToOrder() {
  return <section className="how-section"><div className="container"><div className="section-heading centered"><span>Simple &amp; Direct</span><h2>How To Order</h2><p>Three easy steps from our kitchen to your home.</p></div><div className="steps-grid">{steps.map(([Icon, number, title, text], index) => <article className="step-card" key={number}><div className="step-top"><span>{number}</span><Icon size={25}/></div><h3>{title}</h3><p>{text}</p>{index < steps.length - 1 && <ArrowRight className="step-arrow" size={22}/>}</article>)}</div></div></section>;
}
