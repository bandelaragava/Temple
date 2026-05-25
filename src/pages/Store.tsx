import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, Search, Flame, Gift, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, CATEGORIES, type Product, type CartItem } from './store/storeData'; // CartItem used for cart state
import ProductCard from './store/ProductCard';
import ProductDetail from './store/ProductDetail';
import Cart from './store/Cart';
import Checkout, { type OrderDetails } from './store/Checkout';
import OrderConfirmation from './store/OrderConfirmation';

type View = 'shop' | 'detail' | 'cart' | 'checkout' | 'confirmation';

const Store: React.FC = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<View>('shop');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('templeCart') || '[]'); }
    catch { return []; }
  });
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [orderId, setOrderId] = useState('');

  // Load products from CMS
  const [storeProducts, setStoreProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('storeProducts');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  // Persist cart
  useEffect(() => {
    localStorage.setItem('templeCart', JSON.stringify(cart));
  }, [cart]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = useCallback((product: Product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id == product.id);
      if (existing) return prev.map(i => i.id == product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
  }, []);

  const updateQty = useCallback((id: number, qty: number) => {
    if (qty < 1) { setCart(prev => prev.filter(i => i.id != id)); return; }
    setCart(prev => prev.map(i => i.id == id ? { ...i, qty } : i));
  }, []);

  const removeItem = useCallback((id: number) => {
    setCart(prev => prev.filter(i => i.id != id));
  }, []);

  const viewDetails = useCallback((p: Product) => {
    setSelectedProduct(p);
    setView('detail');
  }, []);

  const handleBuyNow = (product: Product, qty: number) => {
    addToCart(product, qty);
    setView('cart');
  };

  const handlePlaceOrder = (details: OrderDetails) => {
    setOrderDetails(details);
    const id = 'TMP' + Date.now().toString().slice(-8).toUpperCase();
    setOrderId(id);
    localStorage.setItem('templeLastCart', JSON.stringify(cart));
    setCart([]);
    setView('confirmation');
  };

  // Filtered products
  const filtered = storeProducts.filter(p => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const specialProducts = storeProducts.filter(p => p.category === 'special' || p.badge);

  return (
    <div className="store-page">
      {/* ── Page Header ── */}
      <div className="store-hero">
        <div className="container">
          <span className="modern-badge">🛕 Temple Sacred Store</span>
          <h1 className="store-hero-title">Divine Blessings, Delivered Home</h1>
          <p className="store-hero-sub">
            Authentic prasadam, consecrated idols, pooja essentials & spiritual books — directly from the temple
          </p>
          <div className="store-hero-btns">
            <button className="btn-primary" onClick={() => setView('shop')}>
              Explore Store
            </button>
            <button
              className="store-cart-fab"
              onClick={() => setView('cart')}
              aria-label="Open cart"
            >
              <ShoppingCart size={20}/>
              <span>Cart</span>
              {cartCount > 0 && <span className="store-cart-count">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>

      <div className="container store-content">
        <AnimatePresence mode="wait">

          {/* ══════════ SHOP VIEW ══════════ */}
          {view === 'shop' && (
            <motion.div key="shop"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
            >
              {/* ── Special Banner ── */}
              <section className="special-banner-section">
                <div className="special-banner-grid">
                  <div className="special-banner sb-prasadam" onClick={() => setSelectedCategory('prasadam')}>
                    <span className="sb-icon">🎁</span>
                    <div>
                      <h3>Temple Special Prasadam</h3>
                      <p>Blessed in sanctum, shipped to your door</p>
                    </div>
                    <Flame size={20} className="sb-flame"/>
                  </div>
                  <div className="special-banner sb-festival" onClick={() => setSelectedCategory('special')}>
                    <span className="sb-icon">🎉</span>
                    <div>
                      <h3>Festival Offers</h3>
                      <p>Hanuman Jayanti special hampers — limited!</p>
                    </div>
                    <Gift size={20} className="sb-flame"/>
                  </div>
                  <div className="special-banner sb-seva" onClick={() => setSelectedCategory('donation')}>
                    <span className="sb-icon">⭐</span>
                    <div>
                      <h3>Limited Seva Items</h3>
                      <p>Sponsor a temple ritual & earn divine merit</p>
                    </div>
                    <Star size={20} className="sb-flame"/>
                  </div>
                </div>
              </section>

              {/* ── Categories ── */}
              <section className="categories-section">
                <h2 className="section-title">Browse Categories</h2>
                <div className="categories-scroll">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      className={`cat-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                      style={{ '--cat-color': cat.color } as React.CSSProperties}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      <span className="cat-emoji">{cat.emoji}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* ── Search + Cart Bar ── */}
              <div className="store-toolbar">
                <div className="store-search-wrap">
                  <Search size={16} className="store-search-icon"/>
                  <input
                    className="store-search"
                    placeholder="Search prasadam, idols, books…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <button className="store-cart-btn" onClick={() => setView('cart')}>
                  <ShoppingCart size={18}/>
                  <span>Cart</span>
                  {cartCount > 0 && <span className="store-cart-count">{cartCount}</span>}
                </button>
              </div>

              {/* ── Products Grid ── */}
              <section className="products-section">
                <div className="products-grid-header">
                  <h2 className="section-title" style={{ marginBottom: 0 }}>
                    {selectedCategory === 'all' ? 'All Sacred Items' :
                      CATEGORIES.find(c => c.id === selectedCategory)?.label}
                  </h2>
                  <span className="products-count">{filtered.length} items</span>
                </div>

                {filtered.length === 0 ? (
                  <div className="no-products">
                    <span>🔍</span>
                    <p>No items found. Try a different category or search term.</p>
                  </div>
                ) : (
                  <div className="products-grid">
                    {filtered.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={p => addToCart(p)}
                        onViewDetails={viewDetails}
                        cartQty={cart.find(item => item.id == product.id)?.qty || 0}
                        onUpdateQty={updateQty}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* ── Special Section ── */}
              <section className="special-section">
                <div className="special-section-header">
                  <span className="modern-badge" style={{ background: 'linear-gradient(135deg,#800000,#B02B2B)' }}>
                    ✨ Special Collection
                  </span>
                  <h2 className="section-title">Featured Sacred Items</h2>
                  <p className="section-sub">Handpicked by temple priests for maximum divine benefit</p>
                </div>
                <div className="special-featured-grid">
                  {specialProducts.slice(0, 3).map(p => (
                    <div key={p.id} className="sf-card" onClick={() => viewDetails(p)}>
                      <div className="sf-img" style={{ background: p.image ? 'white' : p.gradient }}>
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="sf-real-img" />
                        ) : (
                          <span>{p.emoji}</span>
                        )}
                        {p.badge && <span className="sf-badge">{p.badge}</span>}
                      </div>
                      <div className="sf-info">
                        <h3>{p.name}</h3>
                        <p>{p.shortDesc}</p>
                        <div className="sf-footer">
                          <span className="sf-price">₹{p.price}</span>
                          {(() => {
                            const cartQty = cart.find(item => item.id == p.id)?.qty || 0;
                            return cartQty > 0 ? (
                              <div className="sf-qty-ctrl" onClick={e => e.stopPropagation()}>
                                <button onClick={() => updateQty(p.id, cartQty - 1)}>−</button>
                                <span>{cartQty}</span>
                                <button onClick={() => updateQty(p.id, cartQty + 1)}>+</button>
                              </div>
                            ) : (
                              <button className="sf-btn" onClick={e => { e.stopPropagation(); addToCart(p); }}>
                                <ShoppingCart size={14}/> Add
                              </button>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {/* ══════════ PRODUCT DETAIL ══════════ */}
          {view === 'detail' && selectedProduct && (
            <motion.div key="detail"
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}
            >
              <ProductDetail
                product={selectedProduct}
                onBack={() => setView('shop')}
                onAddToCart={(p, qty) => addToCart(p, qty)}
                onBuyNow={handleBuyNow}
                cartQty={cart.find(item => item.id == selectedProduct.id)?.qty || 0}
              />
            </motion.div>
          )}

          {/* ══════════ CART ══════════ */}
          {view === 'cart' && (
            <motion.div key="cart"
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}
            >
              <Cart
                cart={cart}
                onUpdateQty={updateQty}
                onRemove={removeItem}
                onCheckout={() => setView('checkout')}
                onContinueShopping={() => setView('shop')}
              />
            </motion.div>
          )}

          {/* ══════════ CHECKOUT ══════════ */}
          {view === 'checkout' && (
            <motion.div key="checkout"
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}
            >
              <Checkout
                cart={cart}
                onBack={() => setView('cart')}
                onPlaceOrder={handlePlaceOrder}
              />
            </motion.div>
          )}

          {/* ══════════ CONFIRMATION ══════════ */}
          {view === 'confirmation' && orderDetails && (
            <motion.div key="confirmation"
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            >
              <OrderConfirmation
                cart={(() => {
                  try { return JSON.parse(localStorage.getItem('templeLastCart') || '[]'); }
                  catch { return []; }
                })()}
                orderDetails={orderDetails}
                orderId={orderId}
                onShopMore={() => setView('shop')}
                onGoHome={() => navigate('/')}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Floating cart bubble */}
      {view === 'shop' && cartCount > 0 && (
        <button className="floating-cart" onClick={() => setView('cart')}>
          <ShoppingCart size={22}/>
          <span className="floating-cart-count">{cartCount}</span>
        </button>
      )}

      <style>{`
        /* ── Hero ── */
        .store-page { min-height: 70vh; }
        .store-hero {
          background: linear-gradient(135deg,#4b0000 0%,#800000 50%,#B02B2B 100%);
          color: white; padding: 4rem 0 3rem;
          text-align: center; position: relative; overflow: hidden;
        }
        .store-hero::before {
          content: '🕉️';
          position: absolute; font-size: 20rem; opacity: 0.04;
          top: 50%; left: 50%; transform: translate(-50%,-50%);
          user-select: none; pointer-events: none;
        }
        .store-hero-title {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 5vw, 3.2rem);
          color: #F7EF8A; margin: 0.8rem 0;
          text-shadow: 0 2px 20px rgba(0,0,0,0.3);
        }
        .store-hero-sub {
          color: rgba(255,255,255,0.85);
          max-width: 580px; margin: 0 auto 1.5rem;
          font-size: clamp(0.9rem, 2vw, 1.05rem); line-height: 1.6;
        }
        .store-hero-btns {
          display: flex; align-items: center; justify-content: center;
          gap: 1rem; flex-wrap: wrap;
        }
        .store-cart-fab {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(255,255,255,0.15); border: 2px solid rgba(255,255,255,0.4);
          color: white; padding: 0.75rem 1.5rem; border-radius: 50px;
          font-weight: 700; cursor: pointer; transition: all 0.3s;
          position: relative;
        }
        .store-cart-fab:hover { background: rgba(255,255,255,0.25); }

        .store-content { padding-top: 2.5rem; padding-bottom: 4rem; }

        /* ── Special Banners ── */
        .special-banner-section { margin-bottom: 2.5rem; }
        .special-banner-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem;
        }
        @media(max-width:768px){ .special-banner-grid { grid-template-columns: 1fr; } }
        .special-banner {
          display: flex; align-items: center; gap: 1rem;
          padding: 1.2rem 1.4rem; border-radius: 16px;
          cursor: pointer; transition: transform 0.25s, box-shadow 0.25s;
          color: white; position: relative; overflow: hidden;
        }
        .special-banner:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,0.15); }
        .sb-prasadam { background: linear-gradient(135deg,#FF9933,#e67e22); }
        .sb-festival  { background: linear-gradient(135deg,#800000,#B02B2B); }
        .sb-seva      { background: linear-gradient(135deg,#B8860B,#DAA520); }
        .special-banner h3 { font-size: 1rem; font-weight: 800; margin-bottom: 0.2rem; }
        .special-banner p  { font-size: 0.78rem; opacity: 0.9; }
        .sb-icon { font-size: 2.2rem; flex-shrink: 0; }
        .sb-flame { position: absolute; right: 1.2rem; opacity: 0.4; }

        /* ── Categories ── */
        .categories-section { margin-bottom: 1.5rem; }
        .section-title {
          font-family: var(--font-heading); color: var(--secondary);
          font-size: clamp(1.3rem, 3vw, 1.8rem); margin-bottom: 1rem;
        }
        .section-sub { color: var(--text-muted); margin-top: -0.5rem; margin-bottom: 1.5rem; }
        .categories-scroll {
          display: flex; gap: 0.6rem; flex-wrap: wrap;
        }
        .cat-pill {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.5rem 1.1rem; border-radius: 30px;
          border: 1.5px solid var(--glass-border);
          background: var(--glass); cursor: pointer;
          font-size: 0.85rem; font-weight: 600; color: var(--text);
          transition: all 0.2s; white-space: nowrap;
        }
        .cat-pill:hover {
          border-color: var(--cat-color,var(--primary));
          color: var(--cat-color,var(--primary));
          transform: translateY(-1px);
        }
        .cat-pill.active {
          background: var(--cat-color,var(--primary));
          border-color: var(--cat-color,var(--primary));
          color: white; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .cat-emoji { font-size: 1rem; }

        /* ── Toolbar ── */
        .store-toolbar {
          display: flex; gap: 1rem; align-items: center;
          margin-bottom: 1.5rem; flex-wrap: wrap;
        }
        .store-search-wrap {
          flex: 1; position: relative; min-width: 200px;
        }
        .store-search-icon {
          position: absolute; left: 1rem; top: 50%;
          transform: translateY(-50%); color: var(--text-muted);
        }
        .store-search {
          width: 100%; padding: 0.7rem 1rem 0.7rem 2.5rem;
          border: 1.5px solid var(--glass-border); border-radius: 30px;
          font-family: var(--font-main); font-size: 0.9rem;
          background: var(--glass); color: var(--text);
          transition: border-color 0.2s;
        }
        .store-search:focus { outline: none; border-color: var(--primary); }
        .store-cart-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.7rem 1.4rem;
          background: linear-gradient(135deg,var(--secondary),#B02B2B);
          color: white; border: none; border-radius: 30px;
          font-weight: 700; font-size: 0.9rem; cursor: pointer;
          transition: all 0.2s; position: relative;
          box-shadow: 0 4px 14px rgba(128,0,0,0.25);
        }
        .store-cart-btn:hover { transform: translateY(-1px); }
        .store-cart-count {
          position: absolute; top: -6px; right: -6px;
          background: var(--primary); color: white;
          font-size: 0.65rem; font-weight: 800;
          width: 18px; height: 18px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid white;
        }

        /* ── Products ── */
        .products-section { margin-bottom: 3rem; }
        .products-grid-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.2rem; flex-wrap: wrap; gap: 0.5rem;
        }
        .products-count {
          font-size: 0.85rem; color: var(--text-muted); font-weight: 600;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1.4rem;
        }
        @media(max-width:480px){ .products-grid { grid-template-columns: repeat(2,1fr); gap: 0.8rem; } }
        @media(max-width:360px){ .products-grid { grid-template-columns: 1fr; } }
        .no-products {
          text-align: center; padding: 4rem 2rem;
          display: flex; flex-direction: column; align-items: center; gap: 1rem;
        }
        .no-products span { font-size: 3rem; }
        .no-products p { color: var(--text-muted); }

        /* ── Special Section ── */
        .special-section { margin-bottom: 3rem; }
        .special-section-header { text-align: center; margin-bottom: 1.5rem; }
        .special-featured-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 1.2rem;
        }
        @media(max-width:768px){ .special-featured-grid { grid-template-columns: 1fr; } }
        .sf-card {
          border-radius: 18px; overflow: hidden; cursor: pointer;
          border: 1px solid var(--glass-border);
          background: var(--glass);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .sf-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(128,0,0,0.1); }
        .sf-img {
          height: 160px; display: flex; align-items: center;
          justify-content: center; font-size: 4rem; position: relative;
        }
        .sf-real-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 0.5rem;
          transition: transform 0.5s ease;
        }
        .sf-card:hover .sf-real-img {
          transform: scale(1.1);
        }
        .sf-badge {
          position: absolute; top: 10px; left: 10px;
          background: rgba(0,0,0,0.55); color: white;
          font-size: 0.68rem; font-weight: 700;
          padding: 0.2rem 0.6rem; border-radius: 20px;
        }
        .sf-info { padding: 1rem 1.1rem 1.2rem; }
        .sf-info h3 {
          font-size: 1rem; color: var(--secondary);
          font-family: var(--font-heading); margin-bottom: 0.3rem;
        }
        .sf-info p { font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.6rem; }
        .sf-footer { display: flex; align-items: center; justify-content: space-between; }
        .sf-price { font-weight: 800; color: var(--secondary); }
        .sf-btn {
          display: inline-flex; align-items: center; gap: 0.3rem;
          background: linear-gradient(135deg,var(--primary),var(--primary-hover));
          color: white; border: none; padding: 0.4rem 0.9rem;
          border-radius: 30px; font-size: 0.78rem; font-weight: 700;
          cursor: pointer; transition: transform 0.2s;
        }
        .sf-btn:hover { transform: scale(1.06); }
        .sf-qty-ctrl {
          display: flex;
          align-items: center;
          border: 1.5px solid var(--glass-border);
          border-radius: 30px;
          overflow: hidden;
          background: var(--marble);
        }
        .sf-qty-ctrl button {
          width: 26px;
          height: 26px;
          font-size: 0.9rem;
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
        .sf-qty-ctrl button:hover {
          background: var(--primary);
          color: white;
        }
        .sf-qty-ctrl span {
          min-width: 26px;
          text-align: center;
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--secondary);
        }

        /* ── Floating Cart ── */
        .floating-cart {
          position: fixed; bottom: 6rem; right: 2rem;
          width: 58px; height: 58px; border-radius: 50%;
          background: linear-gradient(135deg,var(--secondary),#B02B2B);
          color: white; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 24px rgba(128,0,0,0.35);
          z-index: 900; transition: transform 0.2s;
        }
        .floating-cart:hover { transform: scale(1.1); }
        .floating-cart-count {
          position: absolute; top: -4px; right: -4px;
          background: var(--primary); color: white;
          font-size: 0.65rem; font-weight: 800;
          width: 20px; height: 20px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid white;
        }
        @media (max-width: 768px) {
          .floating-cart {
            bottom: 1.25rem;
            right: 1.25rem;
            width: 46px;
            height: 46px;
          }
          .floating-cart svg {
            width: 18px;
            height: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default Store;
