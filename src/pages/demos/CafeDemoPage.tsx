import React, { useState } from 'react';
import { ConceptDemoHeader } from './ConceptDemoHeader';
import { Coffee, MapPin, Clock, MessageSquare, Compass, Phone } from 'lucide-react';
import { SITE_CONFIG } from '../../lib/config';
import { SEO } from '../../components/seo/SEO';

export const CafeDemoPage: React.FC = () => {
  const [selectedBrew, setSelectedBrew] = useState<string>('Estate Pour-Over (Kotmale Peaberry)');

  const brews = [
    { name: 'Estate Pour-Over (Kotmale Peaberry)', price: 'Rs. 850', notes: 'Honey, jasmine, lime acidity', process: 'Washed single-origin' },
    { name: 'Oat Milk Flat White', price: 'Rs. 780', notes: 'Velvety microfoam, toasted macadamia sweetness', process: 'Double ristretto' },
    { name: 'Spiced Cardamom Cold Brew', price: 'Rs. 820', notes: '18h steeped, crushed green cardamom & condensed cream', process: 'Slow drip' },
    { name: 'Single-Origin Long Black', price: 'Rs. 650', notes: 'Dark chocolate, dried plum, brown sugar finish', process: 'Nuvara Eliya highland' },
  ];

  const handleReserveTable = () => {
    const text = encodeURIComponent(
      `*Table Reservation & Inquiry — Ceylon Roast Cafe*\n` +
      `• Interested In: ${selectedBrew}\n` +
      `• Guests: 2 Persons\n` +
      `• Time: Today around 3:30 PM\n` +
      `• Note: Please confirm seating and Wi-Fi workspace availability.`
    );
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans">
      <SEO
        title="Ceylon Roast Specialty Cafe — Digital Menu & Location Demo"
        description="Single-origin Ceylon coffee showcase, food pairings, Google Maps navigation, and WhatsApp table reservation demo for cafes in Sri Lanka."
        canonicalPath="/demo/cafe"
        ogImage="https://ravanatech.com/assets/social/og-demo-cafe.png"
      />
      <ConceptDemoHeader
        conceptTitle="Ceylon Roast Specialty Cafe"
        conceptSlug="cafe"
      />

      {/* Hero */}
      <header className="relative bg-stone-900 text-stone-100 py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-25 mix-blend-luminosity">
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80"
            alt="Cafe Interior"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-amber-300 text-xs font-semibold">
            <Coffee className="w-3.5 h-3.5" />
            <span>Highland Specialty Coffee • Kandy, Sri Lanka</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-serif text-stone-50">
            Ceylon Roast Specialty Cafe
          </h1>
          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto leading-relaxed">
            Single-estate Arabica, hand-brewed filter coffees, artisanal brunch, and a quiet leafy workspace.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleReserveTable}
              className="inline-flex items-center gap-2 bg-stone-100 hover:bg-white text-stone-900 font-bold text-xs sm:text-sm py-3 px-6 rounded-lg transition-colors shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Reserve Table on WhatsApp</span>
            </button>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-xs sm:text-sm py-3 px-6 rounded-lg border border-stone-700 transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </header>

      {/* Specialty Menu */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
            Specialty Harvest Coffees
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Grown above 1,200m in the Central Highlands of Sri Lanka and roasted in-house weekly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {brews.map((b) => (
            <div
              key={b.name}
              onClick={() => setSelectedBrew(b.name)}
              className={`p-5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                selectedBrew === b.name
                  ? 'bg-amber-900/5 border-amber-800 shadow-xs ring-1 ring-amber-800'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-sm sm:text-base text-stone-900">{b.name}</h3>
                <span className="font-bold text-xs sm:text-sm text-amber-900 shrink-0">{b.price}</span>
              </div>
              <p className="text-xs text-stone-500">{b.notes}</p>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-600">
                {b.process}
              </span>
            </div>
          ))}
        </div>

        {/* Location & Ambience Strip */}
        <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-4">
          <h3 className="font-bold text-base text-stone-900">Visit Us & Work With Us</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
            <div className="space-y-1">
              <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-500" />
                Hours
              </span>
              <p>Daily: 7:30 AM – 8:00 PM</p>
              <p className="text-stone-400">Kitchen closes at 7:00 PM</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                Address
              </span>
              <p>18 Peradeniya Road, Kandy</p>
              <p className="text-stone-400">Free parking in rear lane</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-stone-500" />
                Table Inquiries
              </span>
              <p>WhatsApp: +94 78 847 0610</p>
              <p className="text-stone-400">High-speed optical Wi-Fi available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-8 px-4 text-center text-xs space-y-2 border-t border-stone-800">
        <p className="font-serif text-sm text-stone-200">Ceylon Roast Specialty Cafe</p>
        <p>Concept Demonstration layout built by Ravana Tech Sri Lanka.</p>
      </footer>
    </div>
  );
};
