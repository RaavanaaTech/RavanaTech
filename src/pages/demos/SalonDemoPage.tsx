import React, { useState } from 'react';
import { ConceptDemoHeader } from './ConceptDemoHeader';
import { Scissors, Calendar, Clock, MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../../lib/config';
import { SEO } from '../../components/seo/SEO';

export const SalonDemoPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState('Executive Haircut & Beard Sculpting');
  const [preferredDate, setPreferredDate] = useState('Saturday Morning (10:00 AM)');

  const services = [
    { name: 'Executive Haircut & Beard Sculpting', price: 'Rs. 2,800', duration: '45 mins', desc: 'Precision consultation, warm botanical shampoo, taper fade and hot towel razor shave.' },
    { name: 'Keratin Smoothing Therapy', price: 'Rs. 12,500', duration: '90 mins', desc: 'Deep protein infusion that eliminates humidity frizz and strengthens hair cuticles.' },
    { name: 'Hydra-Glow Facial & Scalp Detox', price: 'Rs. 5,500', duration: '60 mins', desc: 'Ultrasonic pore cleanse, botanical nourishment mask and pressure point head massage.' },
    { name: 'Gentleman Grooming Package', price: 'Rs. 4,200', duration: '75 mins', desc: 'Complete hair styling, beard grooming, eye revival patch and cooling neck therapy.' },
  ];

  const handleBookAppointment = () => {
    const text = encodeURIComponent(
      `*Appointment Request — The Grooming Lounge*\n` +
      `• Requested Service: ${selectedService}\n` +
      `• Preferred Date/Time: ${preferredDate}\n` +
      `• Client Name: [Your Name]\n` +
      `• Note: Please confirm slot availability.`
    );
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F9F9FA] text-stone-900 font-sans">
      <SEO
        title="The Grooming Lounge Salon — Online Appointment Booking Demo"
        description="Modern salon rate card, stylist specialties, grooming packages, and 3-step WhatsApp appointment scheduling demo."
        canonicalPath="/demo/salon"
        ogImage="https://ravanatech.com/assets/social/og-demo-salon.png"
      />
      <ConceptDemoHeader
        conceptTitle="The Grooming Lounge Salon"
        conceptSlug="salon"
      />

      {/* Hero */}
      <header className="relative bg-zinc-950 text-white py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80"
            alt="Salon Interior"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest block">
            Bespoke Grooming & Hair Spa • Colombo 07
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-serif text-zinc-100">
            The Grooming Lounge
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Contemporary haircuts, beard styling, and therapeutic scalp care in an unhurried, private setting.
          </p>
          <div className="pt-2">
            <button
              onClick={handleBookAppointment}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-lg transition-colors shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Book Appointment via WhatsApp</span>
            </button>
          </div>
        </div>
      </header>

      {/* Appointment Booking Wizard */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
            Select Your Service & Schedule
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Choose your desired treatment below. A pre-formatted WhatsApp booking message will open for instant confirmation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s) => (
            <div
              key={s.name}
              onClick={() => setSelectedService(s.name)}
              className={`p-5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                selectedService === s.name
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-md'
                  : 'bg-white text-stone-900 border-stone-200 hover:border-stone-400'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-sm sm:text-base">{s.name}</h3>
                <span className={`font-extrabold text-sm shrink-0 ${selectedService === s.name ? 'text-emerald-400' : 'text-stone-900'}`}>
                  {s.price}
                </span>
              </div>
              <p className={`text-xs leading-relaxed ${selectedService === s.name ? 'text-zinc-300' : 'text-stone-500'}`}>
                {s.desc}
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>{s.duration}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Slot Selector & CTA */}
        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 block">Selected Service</label>
              <div className="p-3 bg-stone-50 rounded-lg text-xs font-semibold text-stone-900 border border-stone-200">
                {selectedService}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 block">Preferred Time Window</label>
              <select
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full p-3 bg-stone-50 rounded-lg text-xs font-semibold text-stone-900 border border-stone-200 focus:outline-none"
              >
                <option value="Today Afternoon (3:00 PM)">Today Afternoon (3:00 PM)</option>
                <option value="Tomorrow Morning (10:00 AM)">Tomorrow Morning (10:00 AM)</option>
                <option value="Saturday Morning (10:00 AM)">Saturday Morning (10:00 AM)</option>
                <option value="Sunday Afternoon (2:00 PM)">Sunday Afternoon (2:00 PM)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-100">
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero cancellation penalties. Pay at the salon counter.</span>
            </div>
            <button
              onClick={handleBookAppointment}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3 px-8 rounded-xl transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Confirm on WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-8 px-4 text-center text-xs space-y-2 border-t border-zinc-800">
        <p className="font-serif text-sm text-zinc-200">The Grooming Lounge</p>
        <p>Concept Demonstration layout built by Ravana Tech Sri Lanka.</p>
      </footer>
    </div>
  );
};
