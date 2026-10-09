import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Image src="/images/logo/arunas-logo.png" alt="Arunass Kitchen logo" width={82} height={82} />
          <h3>Arunass Kitchen</h3>
          <p>Traditional homemade foods from Kurnool with the warmth and taste of Rayalaseema.</p>
          <p>Address:</p>
          <div className="footer-location"><MapPin size={16} /> <span>Umaha Mahasvare Nagar, Sudereddy Palli Road, Kurnool, Andhra Pradesh - 518002</span></div>
        </div>
        <div><h4>Quick Links</h4><Link href="/">Home</Link><Link href="/#products">Products</Link><Link href="/#about">About</Link><Link href="/#contact">Contact</Link></div>
        <div><h4>Categories</h4><Link href="/#products">Snacks</Link><Link href="/#products">Sweets</Link><Link href="/#products">Karjikay</Link><Link href="/#products">Karam &amp; Spices</Link><Link href="/#products">Pickles</Link></div>
        <div className="footer-order"><h4>Order Directly</h4><p>Send your product list and delivery details through WhatsApp.</p><a className="whatsapp-button" href="https://wa.me/918143645962" target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} colored={false} /> +91 8143645962</a></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Arunass Kitchen. All Rights Reserved.</span><span>Flavors of Rayalaseema</span></div>
    </footer>
  );
}
