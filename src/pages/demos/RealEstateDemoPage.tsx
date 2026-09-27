import React, { useState } from 'react';
import { ConceptDemoHeader } from './ConceptDemoHeader';
import { Building, MapPin, Bed, Bath, Maximize, MessageSquare, Phone } from 'lucide-react';
import { SITE_CONFIG } from '../../lib/config';
import { SEO } from '../../components/seo/SEO';

export const RealEstateDemoPage: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState('Contemporary Villa in Rajagiriya');

  const properties = [
    {
      title: 'Contemporary Villa in Rajagiriya',
      price: 'Rs. 72,500,000',
      beds: '4 Beds',
      baths: '4 Baths',
      area: '3,200 sq.ft • 10 Perches',
      location: 'Prime Residential Zone, Rajagiriya',
      desc: 'Architect-designed split-level residence with rooftop plunge pool, solar electricity, modern pantry, and maid quarters.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Architect Residence in Thalawathugoda',
      price: 'Rs. 48,000,000',
      beds: '3 Beds',
      baths: '3 Baths',
      area: '2,400 sq.ft • 8 Perches',
      location: 'Kalalgoda, Thalawathugoda',
      desc: 'Private gated lane with peaceful greenery, double garage, landscaped court, and clear title deed with bank loan clearance.',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleViewingRequest = (propTitle: string) => {
    const text = encodeURIComponent(
      `*Private Property Viewing Request — Prime Habitat*\n` +
      `• Property: ${propTitle}\n` +
      `• Buyer Name: [Your Name]\n` +
      `• Preferred Day: This Saturday Afternoon\n` +
      `• Inquiries: Please share deed copy, floor plans, and viewing appointment.`
    );
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-stone-900 font-sans">
      <SEO
        title="Prime Habitat Real Estate — Property Showcase Demo"
        description="Credible property portfolio for Sri Lankan realtors with land specs, floor dimensions, photos, and 1-tap WhatsApp private viewing requests."
        canonicalPath="/demo/real-estate"
        ogImage="https://ravanatech.com/assets/social/og-demo-real-estate.png"
      />
      <ConceptDemoHeader
        conceptTitle="Prime Habitat Real Estate"
        conceptSlug="real-estate"
      />

      {/* Hero */}
      <header className="relative bg-slate-950 text-white py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
            alt="Real Estate Portfolio"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block">
            Exclusive Residential Brokerage • Colombo & Suburbs
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-serif text-slate-100">
            Prime Habitat Real Estate
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Curated modern residential homes, luxury apartments, and verified development land blocks with title deed transparency.
          </p>
        </div>
      </header>

      {/* Property Showcase */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
            Featured Verified Listings
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Schedule a private inspection directly with our licensed property specialist via WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((p) => (
            <div
              key={p.title}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded text-xs font-bold bg-slate-900 text-white">
                    {p.price}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-lg text-stone-900">{p.title}</h3>
                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{p.location}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4 py-2 border-y border-stone-100 text-xs text-stone-700 font-semibold">
                    <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5 text-stone-400" />{p.beds}</span>
                    <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-stone-400" />{p.baths}</span>
                    <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5 text-stone-400" />{p.area}</span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => handleViewingRequest(p.title)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-4 rounded-xl transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Schedule Private Viewing on WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 px-4 text-center text-xs space-y-2 border-t border-slate-800">
        <p className="font-serif text-sm text-slate-200">Prime Habitat Real Estate</p>
        <p>Concept Demonstration layout built by Ravana Tech Sri Lanka.</p>
      </footer>
    </div>
  );
};
