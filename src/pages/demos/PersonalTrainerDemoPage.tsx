import React, { useState } from 'react';
import { ConceptDemoHeader } from './ConceptDemoHeader';
import { Dumbbell, Target, Clock, MessageSquare, Check, Shield } from 'lucide-react';
import { SITE_CONFIG } from '../../lib/config';
import { SEO } from '../../components/seo/SEO';

export const PersonalTrainerDemoPage: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState('1-on-1 In-Person Personal Training');

  const programs = [
    {
      name: '1-on-1 In-Person Personal Training',
      price: 'Rs. 24,000 / month',
      allocation: '12 Private Sessions (3x per week)',
      desc: 'Individual resistance coaching, movement mechanics analysis, personalized progressive overload schedule, and weekly body composition scans.',
      tag: 'Most Popular',
    },
    {
      name: 'Remote Online Coaching & Nutrition Plan',
      price: 'Rs. 12,000 / month',
      allocation: 'Weekly Video Consultations & App Access',
      desc: 'Custom gym/home workout schedule delivered via mobile app, daily macronutrient breakdown, and weekly form check video reviews.',
      tag: 'Flexible',
    },
    {
      name: '8-Week Body Composition Sprint',
      price: 'Rs. 38,000 Total',
      allocation: '24 Intensive Sessions + Meal Prep Strategy',
      desc: 'High-accountability transformation package for weddings, sports conditioning, or specific body recomposition milestones.',
      tag: 'Goal Focused',
    },
  ];

  const handleBookConsultation = () => {
    const text = encodeURIComponent(
      `*Fitness Consultation Request — Peak Form Coaching*\n` +
      `• Interested Program: ${selectedProgram}\n` +
      `• My Fitness Goal: [Fat Loss / Muscle Gain / Posture Correction]\n` +
      `• Name: [Your Name]\n` +
      `• Note: I'd like to book a free 15-minute phone consultation.`
    );
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8] text-stone-900 font-sans">
      <SEO
        title="Peak Form Fitness Coaching — Trainer Website Demo"
        description="Fitness coach profile with workout packages, consultation intake form, and direct WhatsApp client onboarding for personal trainers in Sri Lanka."
        canonicalPath="/demo/personal-trainer"
        ogImage="https://ravanatech.com/assets/social/og-demo-personal-trainer.png"
      />
      <ConceptDemoHeader
        conceptTitle="Peak Form Fitness Coaching"
        conceptSlug="personal-trainer"
      />

      {/* Hero */}
      <header className="relative bg-emerald-950 text-white py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20 mix-blend-luminosity">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80"
            alt="Gym Training"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-300 text-xs font-semibold border border-emerald-800">
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Certified Strength & Conditioning Specialist • Colombo</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-serif text-emerald-50">
            Peak Form Fitness Coaching
          </h1>
          <p className="text-sm sm:text-base text-emerald-200/80 max-w-lg mx-auto leading-relaxed">
            Science-backed strength training, sustainable habit nutrition, and injury prevention tailored to busy working professionals.
          </p>
          <div className="pt-2">
            <button
              onClick={handleBookConsultation}
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-bold text-xs sm:text-sm py-3 px-6 rounded-lg transition-colors shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Book Free 15-Min Intro Consultation</span>
            </button>
          </div>
        </div>
      </header>

      {/* Program Tiers */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
            Coaching Packages & Pricing
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Choose a coaching format below and start your consultation via WhatsApp today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {programs.map((prog) => (
            <div
              key={prog.name}
              onClick={() => setSelectedProgram(prog.name)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                selectedProgram === prog.name
                  ? 'bg-white border-emerald-600 ring-2 ring-emerald-600 shadow-md'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {prog.tag}
                  </span>
                  {selectedProgram === prog.name && (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Selected
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-base text-stone-900 leading-snug">{prog.name}</h3>
                <div className="font-extrabold text-xl text-emerald-700">{prog.price}</div>
                <p className="text-xs font-semibold text-stone-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  {prog.allocation}
                </p>
                <p className="text-xs text-stone-600 leading-relaxed">{prog.desc}</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProgram(prog.name);
                  handleBookConsultation();
                }}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                  selectedProgram === prog.name
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                }`}
              >
                Inquire on WhatsApp
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-400 py-8 px-4 text-center text-xs space-y-2 border-t border-emerald-900">
        <p className="font-serif text-sm text-emerald-100">Peak Form Fitness Coaching</p>
        <p>Concept Demonstration layout built by Ravana Tech Sri Lanka.</p>
      </footer>
    </div>
  );
};
