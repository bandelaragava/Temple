import React from 'react';
import { ShoppingCart, Star, Zap } from 'lucide-react';
import type { Product } from './storeData';

interface Props {
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
  cartQty?: number;
  onUpdateQty?: (id: number, qty: number) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAddToCart, onViewDetails, cartQty = 0, onUpdateQty }) => (
  <div className="sp-card" onClick={() => onViewDetails(product)}>
    {product.badge && <span className="sp-badge">{product.badge}</span>}
    <div className="sp-img" style={{ background: product.image ? 'white' : product.gradient }}>
      {product.image ? (
        <img src={product.image} alt={product.name} className="sp-real-img" />
      ) : (
        <span className="sp-emoji">{product.emoji}</span>
      )}
    </div>
    <div className="sp-body">
      <p className="sp-cat">{product.category}</p>
      <h3 className="sp-name">{product.name}</h3>
      <p className="sp-desc">{product.shortDesc}</p>
      <div className="sp-rating">
        <Star size={13} fill="#D4AF37" color="#D4AF37" />
        <span>{product.rating}</span>
        <span className="sp-reviews">({product.reviews})</span>
      </div>
      <div className="sp-footer">
        <div className="sp-price">
          <span className="sp-price-main">₹{product.price}</span>
          {product.originalPrice && (
            <span className="sp-price-old">₹{product.originalPrice}</span>
          )}
        </div>
        {cartQty > 0 ? (
          <div className="sp-qty-ctrl" onClick={e => e.stopPropagation()}>
            <button onClick={() => onUpdateQty && onUpdateQty(product.id, cartQty - 1)}>−</button>
            <span>{cartQty}</span>
            <button onClick={() => onUpdateQty && onUpdateQty(product.id, cartQty + 1)}>+</button>
          </div>
        ) : (
          <button
            className="sp-btn-cart"
            onClick={e => { e.stopPropagation(); onAddToCart(product); }}
            title="Add to Cart"
          >
            <ShoppingCart size={16} />
            <span>Add</span>
          </button>
        )}
      </div>
      <button className="sp-btn-buy" onClick={e => { e.stopPropagation(); onViewDetails(product); }}>
        <Zap size={14} /> View Details
      </button>
    </div>

    <style>{`
      .sp-card {
        background: var(--glass);
        backdrop-filter: blur(12px);
        border: 1px solid var(--glass-border);
        border-radius: 18px;
        overflow: hidden;
        box-shadow: var(--shadow);
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        position: relative;
        display: flex;
        flex-direction: column;
      }
      .sp-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 20px 50px rgba(128,0,0,0.12);
      }
      .sp-badge {
        position: absolute;
        top: 12px;
        left: 12px;
        background: linear-gradient(135deg,#800000,#B02B2B);
        color: #fff;
        font-size: 0.7rem;
        font-weight: 700;
        padding: 0.2rem 0.6rem;
        border-radius: 20px;
        z-index: 2;
        letter-spacing: 0.5px;
      }
      .sp-img {
        height: 170px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .sp-emoji {
        font-size: 4.5rem;
        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.18));
        user-select: none;
      }
      .sp-real-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        padding: 0.5rem;
        transition: transform 0.5s ease;
      }
      .sp-card:hover .sp-real-img {
        transform: scale(1.1);
      }
      .sp-body {
        padding: 1rem 1.1rem 1.1rem;
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: 0.3rem;
      }
      .sp-cat {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--primary);
        font-weight: 700;
      }
      .sp-name {
        font-size: 1rem;
        font-family: var(--font-heading);
        color: var(--secondary);
        line-height: 1.3;
        margin: 0.1rem 0;
      }
      .sp-desc {
        font-size: 0.8rem;
        color: var(--text-muted);
        line-height: 1.4;
        flex: 1;
      }
      .sp-rating {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--text);
        margin: 0.2rem 0;
      }
      .sp-reviews { color: var(--text-muted); font-weight: 400; }
      .sp-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.4rem;
      }
      .sp-price { display: flex; align-items: baseline; gap: 0.4rem; }
      .sp-price-main {
        font-size: 1.1rem;
        font-weight: 800;
        color: var(--secondary);
      }
      .sp-price-old {
        font-size: 0.8rem;
        text-decoration: line-through;
        color: var(--text-muted);
      }
      .sp-btn-cart {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        background: linear-gradient(135deg,var(--primary),var(--primary-hover));
        color: white;
        border: none;
        padding: 0.45rem 0.9rem;
        border-radius: 30px;
        font-size: 0.8rem;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 4px 12px rgba(255,153,51,0.3);
      }
      .sp-btn-cart:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 18px rgba(255,153,51,0.4);
      }
      .sp-qty-ctrl {
        display: flex;
        align-items: center;
        border: 1.5px solid var(--glass-border);
        border-radius: 30px;
        overflow: hidden;
        background: var(--marble);
      }
      .sp-qty-ctrl button {
        width: 28px;
        height: 28px;
        font-size: 1rem;
        background: transparent;
        border: none;
        cursor: pointer;
        font-weight: 700;
        color: var(--secondary);
        transition: background 0.2s, color 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .sp-qty-ctrl button:hover {
        background: var(--primary);
        color: white;
      }
      .sp-qty-ctrl span {
        min-width: 28px;
        text-align: center;
        font-weight: 700;
        font-size: 0.95rem;
        color: var(--secondary);
      }
      .sp-btn-buy {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        width: 100%;
        margin-top: 0.5rem;
        padding: 0.5rem;
        border: 1.5px solid var(--secondary);
        border-radius: 30px;
        background: transparent;
        color: var(--secondary);
        font-size: 0.8rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
      }
      .sp-btn-buy:hover {
        background: var(--secondary);
        color: white;
      }
    `}</style>
  </div>
);

export default ProductCard;
