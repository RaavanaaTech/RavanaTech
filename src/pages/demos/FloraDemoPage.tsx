import React, { useState } from 'react';
import { ConceptDemoHeader } from './ConceptDemoHeader';
import { Flower2, Truck, Clock, MessageSquare, Heart } from 'lucide-react';
import { SITE_CONFIG } from '../../lib/config';
import { SEO } from '../../components/seo/SEO';

export const FloraDemoPage: React.FC = () => {
  const [selectedBouquet, setSelectedBouquet] = useState('Blush Pastel Garden Bouquet');
  const [greetingNote, setGreetingNote] = useState('Happy Birthday! Wishing you a wonderful day.');

  const bouquets = [
    { name: 'Blush Pastel Garden Bouquet', price: 'Rs. 4,500', desc: 'Premium Ecuadorian roses, pink lisianthus, eucalyptus sprigs with satin ribbon.', tag: 'Bestseller' },
    { name: 'Sunrise Lily & Hydrangea Box', price: 'Rs. 6,200', desc: 'Arranged in a luxury cylinder gift box with white oriental lilies and sky hydrangeas.', tag: 'Anniversary' },
    { name: 'Minimalist White Orchid Pot', price: 'Rs. 3,800', desc: 'Living double-stem Phalaenopsis orchid in textured ivory ceramic tabletop planter.', tag: 'Indoor Plants' },
    { name: 'Tropical Sunshine Celebration', price: 'Rs. 3,200', desc: 'Local birds of paradise, ginger blooms, yellow button chrysanthemums and greenery.', tag: 'Same-Day' },
  ];

  const handleOrderWhatsApp = () => {
    const text = encodeURIComponent(
      `*Floral Order Inquiry — Petals & Stems*\n` +
      `• Selected Bouquet: ${selectedBouquet}\n` +
      `• Greeting Card Note: "${greetingNote}"\n` +
      `• Delivery Address: [Recipient Address in Colombo/Gampaha]\n` +
      `• Delivery Date: Today (Same Day)`
    );
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FFFBFB] text-stone-900 font-sans">
      <SEO
        title="Petals & Stems — Flower Shop & Same-Day Delivery Demo"
        description="Bouquet catalogue with birthday, anniversary, and sympathy arrangements, same-day delivery timer, and direct WhatsApp ordering."
        canonicalPath="/demo/flora"
        ogImage="https://ravanatech.com/assets/social/og-demo-flora.png"
      />
      <ConceptDemoHeader
        conceptTitle="Petals & Stems Flower Shop"
        conceptSlug="flora"
      />

      {/* Hero */}
      <header className="relative bg-stone-900 text-white py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1600&q=80"
            alt="Flower Boutique"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 text-rose-200 text-xs font-semibold border border-rose-800">
            <Flower2 className="w-3.5 h-3.5" />
            <span>Curated Botanical Gifts & Same-Day Delivery • Colombo & Suburbs</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-serif text-rose-50">
            Petals & Stems
          </h1>
          <p className="text-sm sm:text-base text-rose-100/80 max-w-lg mx-auto leading-relaxed">
            Freshly conditioned fresh blooms arranged with care. Place your order before 2:00 PM for guaranteed same-day delivery.
          </p>
        </div>
      </header>

      {/* Catalog */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
            Fresh Handcrafted Bouquets
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Choose an arrangement below to order with your custom handwritten greeting card.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {bouquets.map((b) => (
            <div
              key={b.name}
              onClick={() => setSelectedBouquet(b.name)}
              className={`p-5 rounded-xl border transition-all cursor-pointer space-y-2 flex flex-col justify-between ${
                selectedBouquet === b.name
                  ? 'bg-rose-50/70 border-rose-400 ring-1 ring-rose-400 shadow-sm'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-base text-stone-900">{b.name}</h3>
                  <span className="font-extrabold text-sm text-rose-800 shrink-0">{b.price}</span>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed pt-1">{b.desc}</p>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">
                  {b.tag}
                </span>
                <span className="text-xs font-semibold text-rose-600">
                  {selectedBouquet === b.name ? '✓ Selected' : 'Tap to select'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Card Message & Delivery Input */}
        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Personalized Handwritten Greeting Card</span>
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 block">Message to write on gift card</label>
            <textarea
              rows={2}
              value={greetingNote}
              onChange={(e) => setGreetingNote(e.target.value)}
              className="w-full p-3 bg-stone-50 rounded-lg text-xs text-stone-800 border border-stone-200 focus:outline-none focus:border-rose-400"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-100">
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Same-day temperature-controlled van delivery across Colombo.</span>
            </div>
            <button
              onClick={handleOrderWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3 px-8 rounded-xl transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Order on WhatsApp Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-8 px-4 text-center text-xs space-y-2 border-t border-stone-800">
        <p className="font-serif text-sm text-rose-100">Petals & Stems</p>
        <p>Concept Demonstration layout built by Ravana Tech Sri Lanka.</p>
      </footer>
    </div>
  );
};
