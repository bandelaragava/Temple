import React, { useState } from 'react';
import { ArrowLeft, Star, ShoppingCart, Zap, Shield, Truck, Heart } from 'lucide-react';
import type { Product } from './storeData';

interface Props {
  product: Product;
  onBack: () => void;
  onAddToCart: (p: Product, qty: number) => void;
  onBuyNow: (p: Product, qty: number) => void;
}

const ProductDetail: React.FC<Props> = ({ product, onBack, onAddToCart, onBuyNow }) => {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="pd-wrapper">
      <button className="pd-back" onClick={onBack}>
        <ArrowLeft size={18} /> Back to Store
      </button>

      <div className="pd-grid">
        {/* Left: Image */}
        <div className="pd-img-side">
          <div className="pd-img-box" style={{ background: product.image ? 'white' : product.gradient }}>
            {product.image ? (
              <img src={product.image} alt={product.name} className="pd-real-img" />
            ) : (
              <span className="pd-img-emoji">{product.emoji}</span>
            )}
            {product.badge && <span className="pd-img-badge">{product.badge}</span>}
          </div>
          <div className="pd-trust-badges">
            <div className="pd-trust"><Shield size={16}/> Temple Verified</div>
            <div className="pd-trust"><Truck size={16}/> Free Delivery ₹500+</div>
            <div className="pd-trust"><Heart size={16}/> 100% Sacred</div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="pd-info-side">
          <span className="pd-category">{product.category}</span>
          <h1 className="pd-title">{product.name}</h1>

          <div className="pd-rating-row">
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={16}
                fill={s <= Math.round(product.rating) ? '#D4AF37' : 'none'}
                color="#D4AF37"
              />
            ))}
            <span className="pd-rating-num">{product.rating}</span>
            <span className="pd-rating-count">({product.reviews} reviews)</span>
          </div>

          <div className="pd-price-row">
            <span className="pd-price">₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span className="pd-price-old">₹{product.originalPrice}</span>
                <span className="pd-discount">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          <p className="pd-description">{product.description}</p>

          <div className="pd-qty-row">
            <span className="pd-qty-label">Quantity:</span>
            <div className="pd-qty-ctrl">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <span className="pd-subtotal">Subtotal: ₹{product.price * qty}</span>
          </div>

          <div className="pd-actions">
            <button className={`pd-btn-cart ${added ? 'added' : ''}`} onClick={handleAdd}>
              <ShoppingCart size={18}/>
              {added ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>
            <button className="pd-btn-buy" onClick={() => onBuyNow(product, qty)}>
              <Zap size={18}/> Buy Now
            </button>
          </div>

          <div className="pd-info-boxes">
            <div className="pd-info-box">
              <span>🕐</span>
              <div>
                <strong>Delivery</strong>
                <p>3–5 business days across India</p>
              </div>
            </div>
            <div className="pd-info-box">
              <span>🙏</span>
              <div>
                <strong>Divine Assurance</strong>
                <p>All items blessed in temple sanctum</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pd-wrapper { padding: 1.5rem 0; }
        .pd-back {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: none; border: none; cursor: pointer;
          color: var(--secondary); font-weight: 700; font-size: 0.9rem;
          margin-bottom: 1.5rem; transition: gap 0.2s;
        }
        .pd-back:hover { gap: 0.7rem; }
        .pd-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }
        @media(max-width:768px){ .pd-grid { grid-template-columns: 1fr; gap: 1.5rem; } }

        .pd-img-side { display: flex; flex-direction: column; gap: 1rem; }
        .pd-img-box {
          border-radius: 24px;
          height: 340px;
          display: flex; align-items: center; justify-content: center;
          position: relative;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
        }
        .pd-img-emoji { font-size: 9rem; filter: drop-shadow(0 8px 20px rgba(0,0,0,0.2)); }
        .pd-real-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 24px;
          padding: 1rem; /* Added padding to give some space around the full image */
        }
        .pd-img-badge {
          position: absolute; top: 16px; left: 16px;
          background: linear-gradient(135deg,#800000,#B02B2B);
          color: #fff; font-size: 0.75rem; font-weight: 700;
          padding: 0.3rem 0.8rem; border-radius: 20px;
        }
        .pd-trust-badges {
          display: flex; gap: 0.5rem; flex-wrap: wrap;
        }
        .pd-trust {
          display: flex; align-items: center; gap: 0.4rem;
          font-size: 0.75rem; font-weight: 600; color: var(--text-muted);
          background: var(--glass); border: 1px solid var(--glass-border);
          padding: 0.4rem 0.8rem; border-radius: 20px;
        }

        .pd-info-side { display: flex; flex-direction: column; gap: 1rem; }
        .pd-category {
          font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1.5px;
          color: var(--primary); font-weight: 700;
        }
        .pd-title {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2rem);
          color: var(--secondary); line-height: 1.2;
        }
        .pd-rating-row {
          display: flex; align-items: center; gap: 0.3rem;
          flex-wrap: wrap;
        }
        .pd-rating-num { font-weight: 700; font-size: 0.9rem; margin-left: 0.3rem; }
        .pd-rating-count { color: var(--text-muted); font-size: 0.85rem; }

        .pd-price-row { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .pd-price { font-size: 2rem; font-weight: 900; color: var(--secondary); }
        .pd-price-old { text-decoration: line-through; color: var(--text-muted); font-size: 1.1rem; }
        .pd-discount {
          background: #e8f5e9; color: #2e7d32;
          font-size: 0.8rem; font-weight: 700;
          padding: 0.2rem 0.6rem; border-radius: 6px;
        }

        .pd-description {
          color: var(--text-muted); line-height: 1.7; font-size: 0.95rem;
          border-left: 3px solid var(--accent);
          padding-left: 1rem;
        }

        .pd-qty-row {
          display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
        }
        .pd-qty-label { font-weight: 600; font-size: 0.9rem; }
        .pd-qty-ctrl {
          display: flex; align-items: center;
          border: 1.5px solid var(--glass-border);
          border-radius: 30px; overflow: hidden;
        }
        .pd-qty-ctrl button {
          width: 36px; height: 36px; font-size: 1.2rem; font-weight: 700;
          background: var(--marble); border: none; cursor: pointer;
          transition: background 0.2s;
        }
        .pd-qty-ctrl button:hover { background: var(--primary); color: white; }
        .pd-qty-ctrl span {
          min-width: 40px; text-align: center;
          font-weight: 700; font-size: 1rem;
        }
        .pd-subtotal {
          font-size: 0.9rem; font-weight: 700;
          color: var(--secondary);
          background: var(--marble);
          padding: 0.4rem 0.8rem; border-radius: 8px;
        }

        .pd-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
        .pd-btn-cart {
          flex: 1; display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; padding: 0.9rem 1.5rem;
          background: linear-gradient(135deg,var(--primary),var(--primary-hover));
          color: white; border: none; border-radius: 50px;
          font-size: 1rem; font-weight: 700; cursor: pointer;
          transition: all 0.3s; box-shadow: 0 6px 20px rgba(255,153,51,0.3);
          min-width: 160px;
        }
        .pd-btn-cart:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(255,153,51,0.4); }
        .pd-btn-cart.added { background: linear-gradient(135deg,#2e7d32,#43a047); }

        .pd-btn-buy {
          flex: 1; display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; padding: 0.9rem 1.5rem;
          background: linear-gradient(135deg,var(--secondary),#B02B2B);
          color: white; border: none; border-radius: 50px;
          font-size: 1rem; font-weight: 700; cursor: pointer;
          transition: all 0.3s; box-shadow: 0 6px 20px rgba(128,0,0,0.25);
          min-width: 140px;
        }
        .pd-btn-buy:hover { transform: translateY(-2px); filter: brightness(1.1); }

        .pd-info-boxes {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem;
        }
        @media(max-width:480px){ .pd-info-boxes { grid-template-columns: 1fr; } }
        .pd-info-box {
          display: flex; align-items: flex-start; gap: 0.7rem;
          background: var(--glass); border: 1px solid var(--glass-border);
          padding: 0.8rem 1rem; border-radius: 12px;
        }
        .pd-info-box span { font-size: 1.4rem; }
        .pd-info-box strong { font-size: 0.85rem; display: block; color: var(--secondary); }
        .pd-info-box p { font-size: 0.78rem; color: var(--text-muted); margin: 0; }
      `}</style>
    </div>
  );
};

export default ProductDetail;
