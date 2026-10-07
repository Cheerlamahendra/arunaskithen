import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { generateContactWhatsAppUrl } from '@/lib/whatsapp';

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="container cta-card">
        <div>
          <span>Ready for something homemade?</span>
          <h2>Ready to Taste the Flavors of Rayalaseema?</h2>
          <p>Pick your favorites and send your order directly through WhatsApp.</p>
        </div>
        <a className="primary-button light" href={generateContactWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={20} colored={true} /> Order on WhatsApp
        </a>
      </div>
    </section>
  );
}
