import type { CartItem } from '@/types/product';
import { formatCurrency } from './utils';

export const WHATSAPP_NUMBER = '918143645962';

export interface CustomerDetails {
  name: string;
  mobile: string;
  doorNo: string;
  street: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  landmark: string;
  instructions: string;
}

export function generateWhatsAppMessage(items: CartItem[], customer: CustomerDetails) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderLines = items
    .map((item, index) => {
      const unitStr = item.unit && item.unit !== '1 kg' ? 'pack' : 'kg';
      return `${index + 1}. ${item.name}\n   Quantity: ${item.quantity} ${unitStr}\n   Price: ${formatCurrency(item.price)}/${unitStr}\n   Total: ${formatCurrency(item.price * item.quantity)}`;
    })
    .join('\n\n');


  return `Hello Aruna’s Kitchen,\n\nI would like to place an order.\n\nCustomer Details:\nName: ${customer.name}\nMobile: ${customer.mobile}\n\nDelivery Address:\nDoor No: ${customer.doorNo || '-'}\nStreet/Area: ${customer.street}\nCity: ${customer.city}\nDistrict: ${customer.district || '-'}\nState: ${customer.state || 'Andhra Pradesh'}\nPincode: ${customer.pincode || '-'}\nLandmark: ${customer.landmark || '-'}\n\nOrder Details:\n\n${orderLines}\n\n--------------------------------\nSubtotal: ${formatCurrency(subtotal)}\nTotal Amount: ${formatCurrency(subtotal)}\n--------------------------------\n\nAdditional Instructions:\n${customer.instructions || '-'}\n\nPlease confirm my order.`;
}

export function generateWhatsAppUrl(items: CartItem[], customer: CustomerDetails) {
  const message = generateWhatsAppMessage(items, customer);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function generateContactWhatsAppUrl() {
  const message =
    "Hi Aruna's Kitchen, I would like to know more about your products!";

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}