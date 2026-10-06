'use client';

import type { CustomerDetails } from '@/lib/whatsapp';

interface Props { value: CustomerDetails; onChange: (value: CustomerDetails) => void; onSubmit: () => void; }

export default function CustomerForm({ value, onChange, onSubmit }: Props) {
  const set = (key: keyof CustomerDetails, fieldValue: string) => onChange({ ...value, [key]: fieldValue });
  return <form className="customer-form" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
    <div className="form-grid">
      <label>Full Name *<input value={value.name} onChange={(e) => set('name', e.target.value)} required placeholder="Enter your name" /></label>
      <label>Mobile Number *<input value={value.mobile} onChange={(e) => set('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))} required pattern="[6-9][0-9]{9}" placeholder="10 digit mobile number" /></label>
      <label>House / Door No.<input value={value.doorNo} onChange={(e) => set('doorNo', e.target.value)} placeholder="House / door number" /></label>
      <label className="span-2">Street / Area *<input value={value.street} onChange={(e) => set('street', e.target.value)} required placeholder="Street or area" /></label>
      <label>City *<input value={value.city} onChange={(e) => set('city', e.target.value)} required /></label>
      <label>District<input value={value.district} onChange={(e) => set('district', e.target.value)} placeholder="Kurnool" /></label>
      <label>State<input value={value.state} onChange={(e) => set('state', e.target.value)} /></label>
      <label>Pincode<input value={value.pincode} onChange={(e) => set('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="6 digit pincode" /></label>
      <label>Landmark<input value={value.landmark} onChange={(e) => set('landmark', e.target.value)} placeholder="Optional" /></label>
      <label className="span-2">Additional Instructions<textarea value={value.instructions} onChange={(e) => set('instructions', e.target.value)} placeholder="Any special delivery instructions?" rows={3}/></label>
    </div>
    <button className="primary-button full" type="submit">Review Order <span>→</span></button>
  </form>;
}
