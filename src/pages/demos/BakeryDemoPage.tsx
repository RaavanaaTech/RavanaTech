import React, { useState } from 'react';
import { ConceptDemoHeader } from './ConceptDemoHeader';
import { MessageSquare, Clock, MapPin, Phone, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../../lib/config';
import { SEO } from '../../components/seo/SEO';

export const BakeryDemoPage: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>(['Rustic Country Sourdough']);
  const [activeTab, setActiveTab] = useState<'bread' | 'pastry' | 'cakes'>('bread');

  const menu = {
    bread: [
      { name: 'Rustic Country Sourdough', price: 'Rs. 950', desc: 'Naturally leavened 36-hour slow fermented loaf with dark golden blistered crust.' },
      { name: 'Dark Rye with Caraway Seeds', price: 'Rs. 1,150', desc: 'Hearty traditional rye bread with subtle herbal aromatics, perfect for cured meats.' },
      { name: 'Toasted Sesame Brioche Loaf', price: 'Rs. 1,050', desc: 'Rich, buttery sliced brioche enriched with Sri Lankan farm eggs and French butter.' },
      { name: 'Olive & Rosemary Focaccia', price: 'Rs. 850', desc: 'Fluffy Italian flatbread dimpled with Kalamata olives and extra virgin olive oil.' },
    ],
    pastry: [
      { name: 'Belgian Dark Chocolate Babka', price: 'Rs. 1,450', desc: 'Braided buttery dough swirled with 70% dark Belgian chocolate ganache.' },
      { name: 'Almond Frangipane Croissant', price: 'Rs. 720', desc: 'Twice-baked flaky butter croissant stuffed with rich almond cream and toasted flakes.' },
      { name: 'Cinnamon Brown Butter Morning Bun', price: 'Rs. 620', desc: 'Cardamom and cinnamon-infused dough rolled in fragrant citrus brown sugar.' },
      { name: 'Passionfruit Cruffin', price: 'Rs. 680', desc: 'Hybrid croissant muffin filled with tart local passionfruit curd.' },
    ],
    cakes: [
      { name: 'Custom Celebration Cake (1kg)', price: 'Rs. 4,800', desc: 'Layered vanilla sponge with choice of Earl Grey buttercream or salted caramel.' },
      { name: 'Flourless Dark Cocoa Torte', price: 'Rs. 5,200', desc: 'Decadent gluten-free chocolate indulgence topped with fresh local berries.' },
      { name: 'Ceylon Spiced Carrot Cake (1kg)', price: 'Rs. 4,500', desc: 'Moist walnut and shredded carrot cake layered with whipped cream cheese frosting.' },
    ],
  };

  const toggleItem = (name: string) => {
    setSelectedItems((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const handleOrderWhatsApp = () => {
    const itemsList = selectedItems.length > 0 ? selectedItems.join(', ') : 'Daily fresh pastries';
    const text = encodeURIComponent(
      `*Order Inquiry — Crumb & Crust Bakery*\n` +
      `• Items: ${itemsList}\n` +
      `• Pickup Date/Time: Tomorrow 10:00 AM\n` +
      `• Note: Please confirm availability and pickup instructions.`
    );
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-stone-900 font-sans">
      <SEO
        title="Crumb & Crust Bakery — Live WhatsApp Ordering Menu Demo"
        description="Artisan bakery digital menu with 36-hour sourdough, fresh pastries, and instant 1-tap WhatsApp pre-ordering for Sri Lankan bakeries."
        canonicalPath="/demo/bakery"
        ogImage="https://ravanatech.com/assets/social/og-demo-bakery.png"
      />
      <ConceptDemoHeader
        conceptTitle="Crumb & Crust Bakery"
        conceptSlug="bakery"
      />

      {/* Bakery Hero */}
      <header className="relative bg-stone-900 text-white overflow-hidden py-16 sm:py-24 px-4 sm:px-6">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80"
            alt="Bakery Interior"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">
            Artisanal Breads & Morning Pastries • Negombo
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-serif text-amber-50">
            Crumb & Crust Bakery
          </h1>
          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto leading-relaxed">
            Slow-fermented sourdoughs, laminated morning pastries, and handcrafted celebration cakes baked fresh every morning at dawn.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleOrderWhatsApp}
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm py-3 px-6 rounded-lg transition-colors shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Pre-Order on WhatsApp</span>
            </button>
            <a
              href="#menu"
              className="inline-flex items-center gap-2 bg-stone-800/80 hover:bg-stone-800 text-amber-100 font-semibold text-xs sm:text-sm py-3 px-6 rounded-lg border border-stone-700 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Fresh Menu</span>
            </a>
          </div>
        </div>
      </header>

      {/* Info Strip */}
      <div className="bg-amber-900/10 border-y border-amber-900/20 py-3 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs text-amber-950 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-700" />
            <span>Open Wed–Sun: 7:00 AM – 4:00 PM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-700" />
            <span>42 Beach Road, Negombo, Sri Lanka</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-amber-700" />
            <span>Orders: +94 78 847 0610</span>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <section id="menu" className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
            Fresh Daily Menu & WhatsApp Ordering
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Tap the items you want to pre-order. Then tap "Send Order to WhatsApp" to lock in your daily bake.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2">
          {[
            { id: 'bread', label: 'Slow Sourdoughs' },
            { id: 'pastry', label: 'Flaky Pastries' },
            { id: 'cakes', label: 'Celebration Cakes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {menu[activeTab].map((item) => {
            const isSelected = selectedItems.includes(item.name);
            return (
              <div
                key={item.name}
                onClick={() => toggleItem(item.name)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-amber-50/80 border-amber-500 shadow-xs'
                    : 'bg-white border-stone-200 hover:border-amber-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm sm:text-base text-stone-900">
                      {item.name}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                  <span className="inline-block text-xs font-extrabold text-amber-800 pt-1">
                    {item.price}
                  </span>
                </div>
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                    isSelected
                      ? 'bg-amber-600 border-amber-600 text-white'
                      : 'border-stone-300 text-transparent'
                  }`}
                >
                  <Check className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Summary Sticky Action */}
        <div className="p-4 sm:p-5 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-stone-500 block">Selected items for pre-order:</span>
            <span className="font-bold text-sm text-stone-900">
              {selectedItems.length > 0 ? selectedItems.join(' • ') : 'None selected (tap items above)'}
            </span>
          </div>
          <button
            onClick={handleOrderWhatsApp}
            disabled={selectedItems.length === 0}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm py-2.5 px-6 rounded-lg transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Order via WhatsApp</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-8 px-4 text-center text-xs space-y-2 border-t border-stone-800">
        <p className="font-serif text-sm text-stone-200">Crumb & Crust Bakery</p>
        <p>Concept Demonstration layout built by Ravana Tech Sri Lanka.</p>
      </footer>
    </div>
  );
};
