/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Beef, 
  ChefHat, 
  Salad, 
  ShoppingBag, 
  X, 
  Plus, 
  Minus, 
  Info,
  Flame,
  Clock,
  MapPin,
  Phone,
  Truck,
  Store,
  Pizza,
  GlassWater,
  Utensils
} from 'lucide-react';
import { MENU_ITEMS, CATEGORIES, MenuItem } from './data/menu';
import { supabase, logOrderToSupabase } from './lib/supabase';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('pies');
  const [cartOpen, setCartOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number; selectedSize?: { name: string; price: number } }[]>([]);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('pickup');
  const [itemForSize, setItemForSize] = useState<MenuItem | null>(null);

  // Effect to center the active category button
  useEffect(() => {
    const activeBtn = document.getElementById(`cat-${activeCategory}`);
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeCategory]);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const addToCart = (item: MenuItem, size?: { name: string; price: number }) => {
    if (item.sizes && !size) {
      setItemForSize(item);
      return;
    }

    setCart(prev => {
      const cartItemId = size ? `${item.id}-${size.name}` : item.id;
      const existing = prev.find(i => (i.selectedSize ? `${i.item.id}-${i.selectedSize.name}` : i.item.id) === cartItemId);
      
      if (existing) {
        return prev.map(i => {
          const currentId = i.selectedSize ? `${i.item.id}-${i.selectedSize.name}` : i.item.id;
          return currentId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i;
        });
      }
      return [...prev, { item, quantity: 1, selectedSize: size }];
    });
    
    if (itemForSize) setItemForSize(null);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(i => (i.selectedSize ? `${i.item.id}-${i.selectedSize.name}` : i.item.id) !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev.map(i => {
        const currentId = i.selectedSize ? `${i.item.id}-${i.selectedSize.name}` : i.item.id;
        if (currentId === cartItemId) {
          const newQty = Math.max(0, i.quantity + delta);
          return { ...i, quantity: newQty };
        }
        return i;
      }).filter(i => i.quantity > 0);
    });
  };

  const cartTotal = cart.reduce((sum, i) => sum + ((i.selectedSize?.price ?? i.item.price) * i.quantity), 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const sendWhatsAppOrder = () => {
    const phoneNumber = '966143932000';
    const itemsList = cart.map(i => {
      const sizeTag = i.selectedSize ? ` (${i.selectedSize.name})` : '';
      const price = i.selectedSize?.price ?? i.item.price;
      return `• ${i.item.name}${sizeTag} (x${i.quantity}) - ${price * i.quantity} ر.س`;
    }).join('\n');

    const typeHeader = orderType === 'delivery' ? '🛵 *طلب توصيل*' : '🏪 *استلام من المحل*';
    
    let baseMessage = `*تفاصيل الطلب من مطعم بيتي:*\n\n${itemsList}\n\n`;
    baseMessage += `💰 *المبلغ النهائي: ${cartTotal} ر.س*\n\n`;
    baseMessage += `📍 *حالة الطلب:* ${typeHeader}\n`;

    const finalizeAndSend = (locationLink?: string) => {
      // Log to Supabase for tracking
      logOrderToSupabase({
        items: cart.map(i => ({
          name: i.item.name,
          quantity: i.quantity,
          size: i.selectedSize?.name,
          price: i.selectedSize?.price ?? i.item.price
        })),
        total: cartTotal,
        type: orderType,
        location: locationLink
      });

      let finalMessage = baseMessage;
      if (orderType === 'delivery') {
        finalMessage += `\n*الرجاء كتابة بيانات العنوان هنا:*\n`;
        finalMessage += `- الحي:\n`;
        finalMessage += `- الشارع:\n`;
        finalMessage += `- رقم المنزل:\n\n`;
        
        if (locationLink) {
          finalMessage += `📍 *رابط الموقع المباشر:*\n${locationLink}\n\n`;
        } else {
          finalMessage += `⚠️ *ملاحظة:* يرجى إرسال "موقعك الحالي (Location)" عبر الواتساب بعد إرسال هذه الرسالة مباشرة لضمان سرعة الوصول.\n\n`;
        }
      }
      
      const encodedMessage = encodeURIComponent(finalMessage);
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    if (orderType === 'delivery' && "geolocation" in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false);
          const link = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
          finalizeAndSend(link);
        },
        () => {
          setIsLocating(false);
          finalizeAndSend();
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      finalizeAndSend();
    }
  };

  return (
    <div className="max-w-[500px] mx-auto bg-brand-cream min-h-screen shadow-[0_0_100px_rgba(0,0,0,0.5)] relative flex flex-col selection:bg-brand-primary selection:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 transition-all duration-300 bg-white shadow-sm border-b border-brand-secondary/10 py-3">
        <div className="px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
              <Flame size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter text-brand-secondary">
              مطعم فطائرومشويات بيتي
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-brand-primary hover:bg-brand-primary/5 rounded-full transition-colors"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <motion.span 
                  key={cartCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-brand-accent text-brand-primary text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Categories Nav */}
      <section id="menu" className="sticky top-[64px] z-40 py-8 bg-brand-cream/90 backdrop-blur-md border-b border-brand-secondary/10 overflow-hidden">
        <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory px-[25vw] py-2">
          <div className="flex gap-6 shrink-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                id={`cat-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`snap-center flex flex-col items-center gap-3 w-32 py-4 rounded-3xl font-bold transition-all duration-500 relative group animate-in fade-in zoom-in duration-700 ${
                  activeCategory === cat.id 
                    ? 'bg-brand-primary text-white shadow-2xl shadow-brand-primary/30 scale-110 z-10' 
                    : 'bg-white text-slate-400 hover:bg-brand-primary/10 hover:text-brand-primary opacity-60 hover:opacity-100 scale-90'
                }`}
              >
                <div className={`p-3 rounded-full transition-colors duration-500 ${activeCategory === cat.id ? 'bg-white/20' : 'bg-slate-50 group-hover:bg-brand-primary/20'}`}>
                  {cat.id === 'pies' && <Pizza size={24} />}
                  {cat.id === 'pizza' && <Pizza size={24} />}
                  {cat.id === 'grills' && <Flame size={24} />}
                  {cat.id === 'shawarma' && <Beef size={24} />}
                  {cat.id === 'burger' && <Utensils size={24} />}
                  {cat.id === 'falafel' && <Salad size={24} />}
                  {cat.id === 'appetizers' && <Salad size={24} />}
                  {cat.id === 'juices' && <GlassWater size={24} />}
                </div>
                <span className="text-sm tracking-wide">{cat.name}</span>
                {activeCategory === cat.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-1 w-2 h-2 bg-brand-secondary rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-2 px-4 pb-32">
        <div className="flex flex-col gap-1">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              // Add grouping headers for juices and shawarma
              let header = null;
              const prevItem = index > 0 ? filteredItems[index - 1] : null;

              if (activeCategory === 'juices') {
                const getJuiceType = (id: string) => {
                  if (id.startsWith('ju-nat-') || id === 'ju-orange-pressed') return 'قسم العصير';
                  if (id.startsWith('ju-spec-')) return 'قسم الخلطات';
                  if (id.startsWith('ju-shagaf-')) return 'عصير الشقف';
                  return null;
                };
                
                const currentType = getJuiceType(item.id);
                const prevType = prevItem ? getJuiceType(prevItem.id) : null;
                
                if (currentType && currentType !== prevType) {
                  header = (
                    <div className="py-4 px-2 mt-4 first:mt-0">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-1 rounded-full bg-yellow-400" />
                        <h2 className="text-lg font-black text-yellow-500">
                          {currentType}
                        </h2>
                      </div>
                    </div>
                  );
                }
              } else if (activeCategory === 'shawarma') {
                const getShawarmaType = (id: string) => {
                  if (id.startsWith('sh-ch-')) return 'شاورما دجاج';
                  if (id.startsWith('sh-mt-')) return 'شاورما لحم';
                  return null;
                };

                const currentType = getShawarmaType(item.id);
                const prevType = prevItem ? getShawarmaType(prevItem.id) : null;

                if (currentType && currentType !== prevType) {
                  header = (
                    <div className="py-4 px-2 mt-4 first:mt-0">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-1 rounded-full bg-yellow-400" />
                        <h2 className="text-lg font-black text-yellow-500">
                          {currentType}
                        </h2>
                      </div>
                    </div>
                  );
                }
              } else if (activeCategory === 'grills') {
                const getGrillType = (id: string) => {
                  if (id.startsWith('gr-plate-')) return 'قسم المشويات';
                  if (id.startsWith('gr-chicken-') || id === 'gr-rice') return 'قسم المشويات';
                  if (id.startsWith('gr-sand-') || id.startsWith('gr-sarookh-')) return 'سندوتشات المشويات';
                  return null;
                };

                const currentType = getGrillType(item.id);
                const prevType = prevItem ? getGrillType(prevItem.id) : null;

                if (currentType && currentType !== prevType) {
                  header = (
                    <div className="py-4 px-2 mt-4 first:mt-0">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-1 rounded-full bg-yellow-400" />
                        <h2 className="text-lg font-black text-yellow-500">
                          {currentType}
                        </h2>
                      </div>
                    </div>
                  );
                }
              }

              return (
                <div key={item.id}>
                  {header}
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group bg-white p-2.5 border-b border-brand-secondary/5 flex items-center gap-3 active:bg-brand-cream transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className="text-[15px] font-black text-brand-primary truncate">{item.name}</h3>
                        {!item.sizes && <span className="text-brand-primary/60 font-black text-[12px] shrink-0 mr-2">{item.price} ر.س</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        {item.calories && (
                          <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 text-[9px] shrink-0 font-bold">{item.calories} سعرة</span>
                        )}
                        <p className="text-slate-400 text-[10px] truncate">{item.description}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => addToCart(item)}
                      className="shrink-0 w-9 h-9 bg-brand-primary text-white rounded-xl shadow-lg shadow-brand-primary/10 flex items-center justify-center active:scale-90 transition-all hover:bg-brand-primary/90"
                    >
                      <Plus size={18} />
                    </button>
                  </motion.div>
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-brand-primary/20 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-[500px] md:left-1/2 md:-translate-x-1/2 md:right-auto bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-brand-secondary/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="text-brand-primary" />
                  <h2 className="text-2xl font-black text-brand-primary">طلبك</h2>
                </div>
                <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <X />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                    <ShoppingBag size={64} strokeWidth={1} />
                    <p className="text-lg">سلتك فارغة حالياً</p>
                    <button 
                      onClick={() => setCartOpen(false)}
                      className="text-brand-primary font-bold hover:underline"
                    >
                      ابدأ بإضافة الأطباق
                    </button>
                  </div>
                ) : (
                  cart.map((cartItem) => (
                    <div key={cartItem.selectedSize ? `${cartItem.item.id}-${cartItem.selectedSize.name}` : cartItem.item.id} className="flex gap-4 items-center bg-slate-50 p-4 rounded-2xl">
                      <div className="flex-1">
                        <h4 className="font-bold text-brand-primary leading-tight">
                          {cartItem.item.name}
                          {cartItem.selectedSize && <span className="text-[10px] bg-brand-primary/10 text-brand-primary px-1.5 py-0.5 rounded-md mr-2">{cartItem.selectedSize.name}</span>}
                        </h4>
                        <p className="text-brand-primary/70 font-black">{cartItem.selectedSize?.price ?? cartItem.item.price} ر.س</p>
                      </div>
                      <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-1">
                        <button 
                          onClick={() => updateQuantity(cartItem.selectedSize ? `${cartItem.item.id}-${cartItem.selectedSize.name}` : cartItem.item.id, -1)}
                          className="p-1 hover:bg-white rounded-lg transition-colors text-slate-500"
                        >
                          {cartItem.quantity === 1 ? <X size={16} /> : <Minus size={16} />}
                        </button>
                        <span className="font-bold w-4 text-center">{cartItem.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(cartItem.selectedSize ? `${cartItem.item.id}-${cartItem.selectedSize.name}` : cartItem.item.id, 1)}
                          className="p-1 hover:bg-white rounded-lg transition-colors text-brand-primary"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-brand-secondary/10 bg-brand-cream/50 space-y-6">
                  {/* Order Type Toggle */}
                  <div className="bg-white p-1.5 rounded-2xl flex relative border border-slate-200 h-14">
                    <motion.div 
                      layout
                      initial={false}
                      animate={{ 
                        right: orderType === 'pickup' ? '6px' : 'calc(50% + 3px)',
                      }}
                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                      className="absolute top-1.5 bottom-1.5 w-[calc(50%-9px)] bg-brand-secondary rounded-xl shadow-lg shadow-brand-secondary/20"
                    />
                    <button 
                      onClick={() => setOrderType('pickup')}
                      className={`relative z-10 flex-1 flex items-center justify-center gap-2 font-black transition-colors duration-300 ${orderType === 'pickup' ? 'text-brand-primary' : 'text-slate-400'}`}
                    >
                      <Store size={20} />
                      <span>استلام</span>
                    </button>
                    <button 
                      onClick={() => setOrderType('delivery')}
                      className={`relative z-10 flex-1 flex items-center justify-center gap-2 font-black transition-colors duration-300 ${orderType === 'delivery' ? 'text-brand-primary' : 'text-slate-400'}`}
                    >
                      <Truck size={20} />
                      <span>توصيل</span>
                    </button>
                  </div>

                  <div className="flex justify-between items-center text-lg">
                    <span className="text-slate-500">المجموع النهائي</span>
                    <span className="text-2xl font-black text-brand-primary">{cartTotal} ر.س</span>
                  </div>
                  <button 
                    onClick={sendWhatsAppOrder}
                    disabled={isLocating}
                    className="w-full py-4 bg-brand-primary text-white rounded-2xl font-bold text-lg shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-3"
                  >
                    {isLocating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>جاري تحديد موقعك...</span>
                      </>
                    ) : (
                      'إكمال الطلب عبر واتساب'
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Size Selection Overlay */}
      <AnimatePresence>
        {itemForSize && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setItemForSize(null)}
              className="fixed inset-0 bg-brand-primary/40 backdrop-blur-sm z-[80]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 md:max-w-[500px] md:mx-auto bg-white z-[90] rounded-t-[32px] p-8 pb-12 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-brand-primary">{itemForSize.name}</h3>
                <button onClick={() => setItemForSize(null)} className="p-2 bg-slate-100 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <p className="text-slate-500 mb-8">اختر الحجم المناسب لك:</p>
              <div className="grid gap-4">
                {itemForSize.sizes?.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => addToCart(itemForSize, { name: size.name, price: size.price })}
                    className="flex items-center justify-between p-5 bg-slate-50 hover:bg-brand-primary/5 border border-slate-100 hover:border-brand-primary/30 rounded-2xl group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-brand-primary shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-colors">
                        <Plus size={24} />
                      </div>
                      <span className="text-lg font-bold text-slate-700">{size.name}</span>
                    </div>
                    <span className="text-xl font-black text-brand-primary">{size.price} ر.س</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-brand-primary text-white pt-20 pb-10">
        <div className="px-4 grid gap-12 mb-20 text-center">
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-2">
              <Flame size={48} className="text-brand-accent mb-2" />
              <span className="text-3xl font-black tracking-tighter leading-tight text-brand-secondary">فطائرومشويات بيتي</span>
            </div>
            <p className="text-brand-cream/80 leading-relaxed font-medium">
              نحن نفخر بتقديم أجود أنواع الفطائر والمشويات الشامية المحضرة يومياً بكل حب وإتقان لنضمن لكم تجربة فريدة.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold">تواصل معنا</h4>
            <div className="flex flex-col items-center gap-6">
              <a href="tel:0143932000" className="flex flex-col items-center gap-2 hover:text-brand-accent transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone size={24} className="text-brand-accent" />
                </div>
                <span dir="ltr" className="text-lg font-bold">0143932000</span>
              </a>
              <a 
                href="https://maps.app.goo.gl/3i9ru2iJQyVFvgXv7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 hover:text-brand-accent transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin size={24} className="text-brand-accent" />
                </div>
                <span className="text-lg font-bold">ينبع الصناعية حي العيون</span>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold">ساعات العمل</h4>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10 max-w-xs mx-auto w-full">
              <p className="text-lg font-bold mb-2">يومياً</p>
              <p className="text-2xl font-black text-brand-accent">12:00 م - 2:00 ص</p>
              <p className="text-sm text-brand-cream/40 mt-4">نعمل في جميع أيام الأسبوع لخدمتكم</p>
            </div>
          </div>
        </div>
        <div className="px-4 pt-8 border-t border-white/10 text-center text-brand-cream/40 text-sm">
          جميع الحقوق محفوظة {new Date().getFullYear()} © مطعم فطائرومشويات بيتي
        </div>
      </footer>

      {/* Mobile Floating Cart Button */}
      <div className="lg:hidden fixed bottom-6 left-0 right-0 px-4 z-[55]">
        <button 
          onClick={() => setCartOpen(true)}
          className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold shadow-2xl shadow-brand-primary/40 flex items-center justify-between px-8"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <motion.span 
                  key={cartCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-brand-accent text-brand-primary text-[10px] font-bold flex items-center justify-center rounded-full"
                >
                  {cartCount}
                </motion.span>
              )}
            </div>
            <span>عرض السلة</span>
          </div>
          <span className="text-brand-accent">{cartTotal} ر.س</span>
        </button>
      </div>
    </div>
  );
}
