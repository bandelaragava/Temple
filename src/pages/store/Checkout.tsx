import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, CreditCard, Smartphone, Building } from 'lucide-react';
import type { CartItem } from './storeData';

interface Props {
  cart: CartItem[];
  onBack: () => void;
  onPlaceOrder: (details: OrderDetails) => void;
}

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: 'upi' | 'card' | 'netbanking';
  upiId?: string;
}

const Checkout: React.FC<Props> = ({ cart, onBack, onPlaceOrder }) => {
  const [form, setForm] = useState<OrderDetails>({
    name: '', phone: '', address: '', city: '', pincode: '',
    paymentMethod: 'upi', upiId: '',
  });
  const [errors, setErrors] = useState<Partial<OrderDetails>>({});
  const [placing, setPlacing] = useState(false);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = total >= 500 ? 0 : 50;
  const grand = total + delivery;

  const set = (k: keyof OrderDetails, v: string) =>
    setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Partial<OrderDetails> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Valid 10-digit mobile required';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Valid 6-digit pincode required';
    if (form.paymentMethod === 'upi' && !form.upiId?.trim()) e.upiId = 'UPI ID is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setPlacing(true);
    setTimeout(() => { onPlaceOrder(form); }, 1400);
  };

  const payMethods = [
    { id: 'upi',        label: 'UPI',         Icon: Smartphone,  desc: 'GPay, PhonePe, Paytm' },
    { id: 'card',       label: 'Card',        Icon: CreditCard,  desc: 'Debit / Credit Card' },
    { id: 'netbanking', label: 'Net Banking', Icon: Building,    desc: 'All major banks' },
  ] as const;

  return (
    <div className="co-wrapper">
      <button className="co-back" onClick={onBack}>
        <ArrowLeft size={16}/> Back to Cart
      </button>
      <h2 className="co-heading">Checkout</h2>

      <form className="co-form" onSubmit={handleSubmit} noValidate>
        <div className="co-layout">
          {/* Left: Form */}
          <div className="co-left">
            {/* Delivery Info */}
            <div className="co-section glass-card" style={{ padding: '1.5rem' }}>
              <h3 className="co-section-title">📦 Delivery Details</h3>
              <div className="co-fields">
                <div className="co-field">
                  <label>Full Name *</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)}
                    placeholder="Your full name" className={errors.name ? 'err' : ''}/>
                  {errors.name && <span className="co-err">{errors.name}</span>}
                </div>
                <div className="co-field">
                  <label>Phone Number *</label>
                  <input value={form.phone} onChange={e => set('phone', e.target.value)}
                    placeholder="10-digit mobile number" type="tel"
                    className={errors.phone ? 'err' : ''}/>
                  {errors.phone && <span className="co-err">{errors.phone}</span>}
                </div>
                <div className="co-field co-field-full">
                  <label>Full Address *</label>
                  <textarea value={form.address} onChange={e => set('address', e.target.value)}
                    placeholder="House No, Street, Landmark"
                    className={errors.address ? 'err' : ''} rows={3}/>
                  {errors.address && <span className="co-err">{errors.address}</span>}
                </div>
                <div className="co-field">
                  <label>City *</label>
                  <input value={form.city} onChange={e => set('city', e.target.value)}
                    placeholder="City" className={errors.city ? 'err' : ''}/>
                  {errors.city && <span className="co-err">{errors.city}</span>}
                </div>
                <div className="co-field">
                  <label>Pincode *</label>
                  <input value={form.pincode} onChange={e => set('pincode', e.target.value)}
                    placeholder="6-digit pincode" type="tel" maxLength={6}
                    className={errors.pincode ? 'err' : ''}/>
                  {errors.pincode && <span className="co-err">{errors.pincode}</span>}
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="co-section glass-card" style={{ padding: '1.5rem' }}>
              <h3 className="co-section-title">💳 Payment Method</h3>
              <div className="co-pay-methods">
                {payMethods.map(({ id, label, Icon, desc }) => (
                  <label key={id} className={`co-pay-opt ${form.paymentMethod === id ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value={id}
                      checked={form.paymentMethod === id}
                      onChange={() => set('paymentMethod', id)}/>
                    <Icon size={22}/>
                    <div>
                      <span className="co-pay-label">{label}</span>
                      <span className="co-pay-desc">{desc}</span>
                    </div>
                    {form.paymentMethod === id && <CheckCircle size={18} className="co-pay-check"/>}
                  </label>
                ))}
              </div>
              {form.paymentMethod === 'upi' && (
                <div className="co-field" style={{ marginTop: '1rem' }}>
                  <label>UPI ID *</label>
                  <input value={form.upiId} onChange={e => set('upiId', e.target.value)}
                    placeholder="yourname@upi" className={errors.upiId ? 'err' : ''}/>
                  {errors.upiId && <span className="co-err">{errors.upiId}</span>}
                </div>
              )}
            </div>
          </div>

          {/* Right: Summary */}
          <div className="co-right">
            <div className="co-summary glass-card" style={{ padding: '1.5rem' }}>
              <h3 className="co-section-title">🛒 Order Summary</h3>
              {cart.map(item => (
                <div key={item.id} className="co-item-row">
                  <span>{item.emoji} {item.name} × {item.qty}</span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
              <div className="co-divider"/>
              <div className="co-total-row"><span>Subtotal</span><span>₹{total}</span></div>
              <div className="co-total-row">
                <span>Delivery</span>
                <span>{delivery === 0 ? <span style={{color:'#2e7d32'}}>FREE</span> : `₹${delivery}`}</span>
              </div>
              <div className="co-divider"/>
              <div className="co-total-row co-grand">
                <span>Grand Total</span><span>₹{grand}</span>
              </div>
              <button type="submit" className="co-place-btn" disabled={placing}>
                {placing ? (
                  <><span className="co-spinner"/>&nbsp;Placing Order…</>
                ) : (
                  <><CheckCircle size={18}/> Place Order</>
                )}
              </button>
              <p className="co-secure-note">🔒 Secured & Encrypted Payment</p>
            </div>
          </div>
        </div>
      </form>

      <style>{`
        .co-wrapper { padding: 1rem 0; }
        .co-back {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: none; border: none; cursor: pointer;
          color: var(--secondary); font-weight: 700; font-size: 0.9rem;
          margin-bottom: 1rem;
        }
        .co-back:hover { text-decoration: underline; }
        .co-heading {
          font-family: var(--font-heading); color: var(--secondary);
          font-size: clamp(1.5rem, 3vw, 2rem); margin-bottom: 1.5rem;
        }
        .co-layout {
          display: grid; grid-template-columns: 1fr 360px;
          gap: 2rem; align-items: start;
        }
        @media(max-width:900px){ .co-layout { grid-template-columns: 1fr; } }
        .co-left, .co-right { display: flex; flex-direction: column; gap: 1.5rem; }
        .co-section-title {
          font-family: var(--font-heading); color: var(--secondary);
          font-size: 1.1rem; margin-bottom: 1rem;
        }
        .co-fields {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media(max-width:560px){ .co-fields { grid-template-columns: 1fr; } }
        .co-field { display: flex; flex-direction: column; gap: 0.3rem; }
        .co-field-full { grid-column: 1 / -1; }
        .co-field label { font-size: 0.82rem; font-weight: 600; color: var(--text); }
        .co-field input, .co-field textarea {
          padding: 0.7rem 0.9rem;
          border: 1.5px solid var(--glass-border);
          border-radius: 10px; font-family: var(--font-main);
          font-size: 0.9rem; background: var(--glass);
          color: var(--text); transition: border-color 0.2s;
          resize: vertical;
        }
        .co-field input:focus, .co-field textarea:focus {
          outline: none; border-color: var(--primary);
        }
        .co-field input.err, .co-field textarea.err { border-color: #c0392b; }
        .co-err { font-size: 0.75rem; color: #c0392b; font-weight: 600; }

        .co-pay-methods { display: flex; flex-direction: column; gap: 0.8rem; }
        .co-pay-opt {
          display: flex; align-items: center; gap: 1rem;
          padding: 0.9rem 1.1rem;
          border: 1.5px solid var(--glass-border);
          border-radius: 12px; cursor: pointer;
          transition: all 0.2s; position: relative;
        }
        .co-pay-opt input { display: none; }
        .co-pay-opt.selected {
          border-color: var(--primary);
          background: linear-gradient(135deg, rgba(255,153,51,0.06), rgba(212,175,55,0.06));
        }
        .co-pay-label { display: block; font-weight: 700; font-size: 0.9rem; }
        .co-pay-desc { display: block; font-size: 0.75rem; color: var(--text-muted); }
        .co-pay-check { position: absolute; right: 1rem; color: var(--primary); }

        .co-item-row {
          display: flex; justify-content: space-between;
          font-size: 0.85rem; padding: 0.3rem 0;
          color: var(--text-muted); gap: 1rem;
        }
        .co-item-row span:first-child { flex: 1; }
        .co-item-row span:last-child { font-weight: 700; color: var(--text); white-space: nowrap; }
        .co-divider { height: 1px; background: var(--glass-border); margin: 0.8rem 0; }
        .co-total-row {
          display: flex; justify-content: space-between;
          font-size: 0.9rem; padding: 0.2rem 0; color: var(--text-muted);
        }
        .co-total-row span:last-child { font-weight: 700; color: var(--text); }
        .co-grand { font-size: 1.1rem !important; }
        .co-grand span { color: var(--secondary) !important; font-weight: 800 !important; }
        .co-place-btn {
          display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; width: 100%; margin-top: 1rem;
          padding: 1rem; background: linear-gradient(135deg,var(--secondary),#B02B2B);
          color: white; border: none; border-radius: 12px;
          font-size: 1rem; font-weight: 700; cursor: pointer;
          transition: all 0.3s; box-shadow: 0 6px 20px rgba(128,0,0,0.25);
        }
        .co-place-btn:hover:not(:disabled) { transform: translateY(-2px); filter: brightness(1.1); }
        .co-place-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .co-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: white;
          border-radius: 50%;
          display: inline-block;
          animation: co-spin 0.7s linear infinite;
        }
        @keyframes co-spin { to { transform: rotate(360deg); } }
        .co-secure-note {
          text-align: center; font-size: 0.75rem;
          color: var(--text-muted); margin-top: 0.6rem;
        }
      `}</style>
    </div>
  );
};

export default Checkout;
