import React from 'react';
import { ShoppingCart, Trash2, ArrowRight, Package } from 'lucide-react';
import type { CartItem } from './storeData';

interface Props {
  cart: CartItem[];
  onUpdateQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

const Cart: React.FC<Props> = ({ cart, onUpdateQty, onRemove, onCheckout, onContinueShopping }) => {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);
  const deliveryFee = total >= 500 ? 0 : 50;
  const grandTotal = total + deliveryFee;

  if (cart.length === 0) return (
    <div className="cart-empty">
      <Package size={72} strokeWidth={1} />
      <h2>Your cart is empty</h2>
      <p>Add sacred items from the store to begin your divine shopping journey</p>
      <button className="cart-back-btn" onClick={onContinueShopping}>
        <ShoppingCart size={16}/> Browse Store
      </button>
      <style>{`
        .cart-empty {
          text-align: center; padding: 5rem 2rem;
          display: flex; flex-direction: column; align-items: center; gap: 1rem;
        }
        .cart-empty svg { color: var(--text-muted); opacity: 0.4; }
        .cart-empty h2 { font-family: var(--font-heading); color: var(--secondary); font-size: 1.8rem; }
        .cart-empty p { color: var(--text-muted); max-width: 360px; }
        .cart-back-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: linear-gradient(135deg,var(--primary),var(--primary-hover));
          color: white; border: none; padding: 0.8rem 2rem;
          border-radius: 50px; font-weight: 700; cursor: pointer; margin-top: 1rem;
        }
      `}</style>
    </div>
  );

  return (
    <div className="cart-wrapper">
      <div className="cart-header-row">
        <h2 className="cart-heading">
          <ShoppingCart size={24}/> Your Cart
          <span className="cart-count">{itemCount} item{itemCount !== 1 ? 's' : ''}</span>
        </h2>
        <button className="cart-continue-link" onClick={onContinueShopping}>← Continue Shopping</button>
      </div>

      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items-col">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="ci-img" style={{ background: item.gradient }}>
                <span>{item.emoji}</span>
              </div>
              <div className="ci-info">
                <h4 className="ci-name">{item.name}</h4>
                <p className="ci-desc">{item.shortDesc}</p>
                <div className="ci-bottom">
                  <div className="ci-qty-ctrl">
                    <button onClick={() => onUpdateQty(item.id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <span className="ci-price">₹{item.price * item.qty}</span>
                  <button className="ci-remove" onClick={() => onRemove(item.id)} title="Remove">
                    <Trash2 size={15}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="cart-summary-col">
          <div className="cart-summary glass-card" style={{ padding: '1.5rem' }}>
            <h3 className="cs-title">Order Summary</h3>
            <div className="cs-row"><span>Subtotal ({itemCount} items)</span><span>₹{total}</span></div>
            <div className="cs-row">
              <span>Delivery</span>
              <span>{deliveryFee === 0 ? <span style={{color:'#2e7d32'}}>FREE</span> : `₹${deliveryFee}`}</span>
            </div>
            {deliveryFee > 0 && (
              <p className="cs-free-hint">Add ₹{500 - total} more for free delivery!</p>
            )}
            <div className="cs-divider"/>
            <div className="cs-row cs-total"><span>Grand Total</span><span>₹{grandTotal}</span></div>
            <button className="cs-checkout-btn" onClick={onCheckout}>
              Proceed to Checkout <ArrowRight size={18}/>
            </button>
            <div className="cs-payment-icons">
              <span>🏦</span><span>💳</span><span>📱</span>
              <span className="cs-upi-text">UPI · Cards · Net Banking</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cart-wrapper { padding: 1rem 0; }
        .cart-header-row {
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap;
          gap: 0.5rem; margin-bottom: 1.5rem;
        }
        .cart-heading {
          display: flex; align-items: center; gap: 0.7rem;
          font-family: var(--font-heading); color: var(--secondary);
          font-size: clamp(1.4rem, 3vw, 1.8rem);
        }
        .cart-count {
          background: var(--primary); color: white;
          font-size: 0.75rem; padding: 0.2rem 0.6rem;
          border-radius: 20px; font-weight: 700;
        }
        .cart-continue-link {
          background: none; border: none; cursor: pointer;
          color: var(--secondary); font-weight: 600; font-size: 0.9rem;
          transition: gap 0.2s;
        }
        .cart-continue-link:hover { text-decoration: underline; }

        .cart-layout {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 2rem; align-items: start;
        }
        @media(max-width:900px){ .cart-layout { grid-template-columns: 1fr; } }

        .cart-items-col { display: flex; flex-direction: column; gap: 1rem; }

        .cart-item {
          display: flex; gap: 1.2rem;
          background: var(--glass); backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: 16px; padding: 1rem 1.2rem;
          transition: box-shadow 0.2s;
        }
        .cart-item:hover { box-shadow: 0 8px 24px rgba(128,0,0,0.07); }

        .ci-img {
          width: 80px; height: 80px; border-radius: 12px;
          flex-shrink: 0; display: flex; align-items: center;
          justify-content: center; font-size: 2.4rem;
        }
        .ci-info { flex: 1; display: flex; flex-direction: column; gap: 0.3rem; }
        .ci-name { font-size: 1rem; font-weight: 700; color: var(--secondary); }
        .ci-desc { font-size: 0.78rem; color: var(--text-muted); line-height: 1.4; }
        .ci-bottom {
          display: flex; align-items: center; gap: 1rem;
          flex-wrap: wrap; margin-top: 0.3rem;
        }
        .ci-qty-ctrl {
          display: flex; align-items: center;
          border: 1.5px solid var(--glass-border); border-radius: 30px; overflow: hidden;
        }
        .ci-qty-ctrl button {
          width: 30px; height: 30px; font-size: 1.1rem;
          background: var(--marble); border: none; cursor: pointer;
          font-weight: 700; transition: background 0.2s;
        }
        .ci-qty-ctrl button:hover { background: var(--primary); color: white; }
        .ci-qty-ctrl span {
          min-width: 32px; text-align: center;
          font-weight: 700; font-size: 0.9rem;
        }
        .ci-price { font-weight: 800; font-size: 1rem; color: var(--secondary); }
        .ci-remove {
          background: none; border: none; cursor: pointer;
          color: #c0392b; padding: 0.3rem;
          border-radius: 50%; transition: background 0.2s;
        }
        .ci-remove:hover { background: #fde8e8; }

        .cs-title {
          font-family: var(--font-heading); color: var(--secondary);
          font-size: 1.2rem; margin-bottom: 1rem;
        }
        .cs-row {
          display: flex; justify-content: space-between;
          font-size: 0.9rem; padding: 0.4rem 0;
          color: var(--text-muted);
        }
        .cs-row span:last-child { font-weight: 600; color: var(--text); }
        .cs-free-hint {
          font-size: 0.75rem; color: #2e7d32; font-weight: 600;
          background: #e8f5e9; padding: 0.4rem 0.7rem; border-radius: 6px;
          margin-top: 0.3rem;
        }
        .cs-divider { height: 1px; background: var(--glass-border); margin: 0.8rem 0; }
        .cs-total { font-size: 1.1rem; font-weight: 800 !important; }
        .cs-total span { color: var(--secondary) !important; font-weight: 800 !important; }
        .cs-checkout-btn {
          display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; width: 100%;
          margin-top: 1rem; padding: 0.9rem;
          background: linear-gradient(135deg,var(--secondary),#B02B2B);
          color: white; border: none; border-radius: 12px;
          font-size: 1rem; font-weight: 700; cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 6px 20px rgba(128,0,0,0.25);
        }
        .cs-checkout-btn:hover { transform: translateY(-2px); filter: brightness(1.1); }
        .cs-payment-icons {
          display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; margin-top: 0.8rem; font-size: 1.3rem;
        }
        .cs-upi-text { font-size: 0.72rem; color: var(--text-muted); margin-left: 0.2rem; }
      `}</style>
    </div>
  );
};

export default Cart;
