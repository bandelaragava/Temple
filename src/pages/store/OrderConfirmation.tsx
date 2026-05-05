import React, { useEffect, useRef } from 'react';
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react';
import type { CartItem } from './storeData';
import type { OrderDetails } from './Checkout';

interface Props {
  cart: CartItem[];
  orderDetails: OrderDetails;
  orderId: string;
  onShopMore: () => void;
  onGoHome: () => void;
}

const OrderConfirmation: React.FC<Props> = ({ cart, orderDetails, orderId, onShopMore, onGoHome }) => {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = total >= 500 ? 0 : 50;
  const grand = total + delivery;
  const confettiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple CSS confetti burst animation via class toggle
    const el = confettiRef.current;
    if (el) el.classList.add('burst');
  }, []);

  return (
    <div className="oc-wrapper">
      {/* Success Header */}
      <div className="oc-hero glass-card">
        <div className="oc-icon-ring" ref={confettiRef}>
          <CheckCircle size={56} strokeWidth={1.5} />
        </div>
        <h1 className="oc-title">Order Placed Successfully!</h1>
        <p className="oc-subtitle">
          🙏 May Lord SRI GOVINDHA RAJA SWAMI VARI 's blessings be with you. Your order is confirmed and will be shipped soon.
        </p>
        <div className="oc-order-id">
          Order ID: <strong>#{orderId}</strong>
        </div>
      </div>

      <div className="oc-layout">
        {/* Left: Items */}
        <div className="oc-items-col glass-card" style={{ padding: '1.5rem' }}>
          <h3 className="oc-section-title"><Package size={18} /> Items Ordered</h3>
          {cart.map(item => (
            <div key={item.id} className="oc-item">
              <div className="oc-item-img" style={{ background: item.gradient }}>
                <span>{item.emoji}</span>
              </div>
              <div className="oc-item-info">
                <p className="oc-item-name">{item.name}</p>
                <p className="oc-item-meta">Qty: {item.qty} &nbsp;·&nbsp; ₹{item.price} each</p>
              </div>
              <span className="oc-item-price">₹{item.price * item.qty}</span>
            </div>
          ))}

          <div className="oc-divider" />
          <div className="oc-bill-row"><span>Subtotal</span><span>₹{total}</span></div>
          <div className="oc-bill-row">
            <span>Delivery</span>
            <span>{delivery === 0 ? <span style={{ color: '#2e7d32' }}>FREE</span> : `₹${delivery}`}</span>
          </div>
          <div className="oc-divider" />
          <div className="oc-bill-row oc-grand">
            <span>Total Paid</span><span>₹{grand}</span>
          </div>
        </div>

        {/* Right: Delivery + Payment */}
        <div className="oc-right-col">
          <div className="oc-detail-card glass-card" style={{ padding: '1.5rem' }}>
            <h3 className="oc-section-title">📦 Delivering To</h3>
            <p className="oc-detail-name">{orderDetails.name}</p>
            <p className="oc-detail-text">{orderDetails.address}</p>
            <p className="oc-detail-text">{orderDetails.city} – {orderDetails.pincode}</p>
            <p className="oc-detail-text">📞 {orderDetails.phone}</p>
          </div>

          <div className="oc-detail-card glass-card" style={{ padding: '1.5rem' }}>
            <h3 className="oc-section-title">💳 Payment</h3>
            <div className="oc-pay-pill">
              {orderDetails.paymentMethod === 'upi' && <><span>📱</span> UPI — {orderDetails.upiId}</>}
              {orderDetails.paymentMethod === 'card' && <><span>💳</span> Card Payment</>}
              {orderDetails.paymentMethod === 'netbanking' && <><span>🏦</span> Net Banking</>}
            </div>
            <div className="oc-pay-status">✅ Payment Confirmed</div>
          </div>

          <div className="oc-timeline glass-card" style={{ padding: '1.5rem' }}>
            <h3 className="oc-section-title">🕐 Delivery Timeline</h3>
            {[
              { icon: '✅', label: 'Order Confirmed', done: true },
              { icon: '🙏', label: 'Temple Blessing', done: true },
              { icon: '📦', label: 'Packing & Dispatch', done: false },
              { icon: '🚚', label: 'Out for Delivery', done: false },
              { icon: '🏠', label: 'Delivered', done: false },
            ].map((step, i) => (
              <div key={i} className={`oc-step ${step.done ? 'done' : ''}`}>
                <div className="oc-step-icon">{step.icon}</div>
                <div className="oc-step-line" />
                <span>{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="oc-ctas">
        <button className="oc-btn-shop" onClick={onShopMore}>
          <ShoppingBag size={18} /> Shop More
        </button>
        <button className="oc-btn-home" onClick={onGoHome}>
          <Home size={18} /> Go to Home
        </button>
      </div>

      <style>{`
        .oc-wrapper { padding: 1rem 0; display: flex; flex-direction: column; gap: 1.5rem; }

        .oc-hero {
          text-align: center; padding: 2.5rem 2rem;
          display: flex; flex-direction: column; align-items: center; gap: 1rem;
          background: linear-gradient(135deg, rgba(255,153,51,0.05), rgba(212,175,55,0.08));
        }
        .oc-icon-ring {
          width: 100px; height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg,#2e7d32,#43a047);
          display: flex; align-items: center; justify-content: center;
          color: white;
          box-shadow: 0 0 0 0 rgba(46,125,50,0.4);
          animation: oc-pulse 1.5s ease-out forwards;
        }
        @keyframes oc-pulse {
          0%   { transform: scale(0.6); opacity: 0; box-shadow: 0 0 0 0 rgba(46,125,50,0.5); }
          60%  { transform: scale(1.12); box-shadow: 0 0 0 20px rgba(46,125,50,0); }
          100% { transform: scale(1); opacity: 1; }
        }
        .oc-title {
          font-family: var(--font-heading); color: var(--secondary);
          font-size: clamp(1.5rem, 3.5vw, 2.2rem);
        }
        .oc-subtitle { color: var(--text-muted); max-width: 520px; line-height: 1.6; }
        .oc-order-id {
          background: var(--marble); padding: 0.5rem 1.2rem;
          border-radius: 30px; font-size: 0.9rem; color: var(--text-muted);
        }
        .oc-order-id strong { color: var(--secondary); }

        .oc-layout {
          display: grid; grid-template-columns: 1fr 340px;
          gap: 1.5rem; align-items: start;
        }
        @media(max-width:900px){ .oc-layout { grid-template-columns: 1fr; } }

        .oc-section-title {
          display: flex; align-items: center; gap: 0.5rem;
          font-family: var(--font-heading); color: var(--secondary);
          font-size: 1.05rem; margin-bottom: 1rem;
        }
        .oc-item {
          display: flex; align-items: center; gap: 1rem;
          padding: 0.7rem 0; border-bottom: 1px solid var(--glass-border);
        }
        .oc-item:last-of-type { border-bottom: none; }
        .oc-item-img {
          width: 50px; height: 50px; border-radius: 10px;
          flex-shrink: 0; display: flex; align-items: center;
          justify-content: center; font-size: 1.6rem;
        }
        .oc-item-info { flex: 1; }
        .oc-item-name { font-weight: 700; font-size: 0.9rem; color: var(--text); }
        .oc-item-meta { font-size: 0.75rem; color: var(--text-muted); margin-top: 0.15rem; }
        .oc-item-price { font-weight: 800; color: var(--secondary); font-size: 0.95rem; white-space: nowrap; }

        .oc-divider { height: 1px; background: var(--glass-border); margin: 0.7rem 0; }
        .oc-bill-row {
          display: flex; justify-content: space-between;
          font-size: 0.88rem; color: var(--text-muted); padding: 0.2rem 0;
        }
        .oc-bill-row span:last-child { font-weight: 700; color: var(--text); }
        .oc-grand { font-size: 1rem !important; }
        .oc-grand span { color: var(--secondary) !important; font-weight: 800 !important; }

        .oc-right-col { display: flex; flex-direction: column; gap: 1rem; }
        .oc-detail-card {}
        .oc-detail-name { font-weight: 700; font-size: 1rem; color: var(--text); margin-bottom: 0.3rem; }
        .oc-detail-text { font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; }

        .oc-pay-pill {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: var(--marble); padding: 0.5rem 1rem;
          border-radius: 30px; font-size: 0.85rem; font-weight: 600;
        }
        .oc-pay-status {
          margin-top: 0.7rem; font-size: 0.85rem;
          color: #2e7d32; font-weight: 700;
        }

        .oc-step {
          display: flex; align-items: center; gap: 0.8rem;
          padding: 0.35rem 0; font-size: 0.85rem;
          color: var(--text-muted); position: relative;
        }
        .oc-step.done { color: var(--text); font-weight: 600; }
        .oc-step-icon { font-size: 1.1rem; width: 24px; text-align: center; }
        .oc-step-line {
          position: absolute; left: 11px; top: 100%;
          width: 2px; height: 100%; background: var(--glass-border);
        }
        .oc-step:last-child .oc-step-line { display: none; }
        .oc-step.done .oc-step-line { background: #a5d6a7; }

        .oc-ctas {
          display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
        }
        .oc-btn-shop, .oc-btn-home {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.85rem 2rem; border-radius: 50px;
          font-weight: 700; font-size: 1rem; cursor: pointer;
          transition: all 0.3s; border: none;
        }
        .oc-btn-shop {
          background: linear-gradient(135deg,var(--primary),var(--primary-hover));
          color: white; box-shadow: 0 6px 20px rgba(255,153,51,0.3);
        }
        .oc-btn-shop:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(255,153,51,0.4); }
        .oc-btn-home {
          background: transparent; color: var(--secondary);
          border: 2px solid var(--secondary) !important;
        }
        .oc-btn-home:hover { background: var(--secondary); color: white; }
      `}</style>
    </div>
  );
};

export default OrderConfirmation;
