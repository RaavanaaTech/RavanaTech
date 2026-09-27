import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { CONCEPT_PROJECTS } from '../data/projectsData';
import { FAQS_LIST } from '../data/faqsData';
import { SITE_CONFIG } from '../lib/config';
import { openWhatsApp } from '../lib/whatsapp';
import { WelcomeAudioGreeting } from '../components/home/WelcomeAudioGreeting';
import { InteractiveQuotationMatrix } from '../components/home/InteractiveQuotationMatrix';
import { LivingHumanAvatar } from '../components/home/LivingHumanAvatar';
import {
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  Building2,
  UtensilsCrossed,
  CalendarCheck,
  ShoppingBag,
  Home,
  Sparkles,
  ChevronRight,
  Eye,
  Zap
} from 'lucide-react';

interface HomePageProps {
  onSelectProject?: (project: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectProject }) => {
  return (
    <div className="space-y-6 sm:space-y-8 pb-12 w-full">
      <SEO
        title="Simple Websites for Growing Small Businesses | Ravana Tech Sri Lanka"
        description="Launch a clean mobile-friendly website with instant WhatsApp ordering and Google visibility in 3 to 5 days. Get a free quote."
        canonicalPath="/"
      />

      {/* 1. AUDIO VOICE GREETING BAR (Under 30s Decision Trigger) */}
      <WelcomeAudioGreeting />

      {/* 2. COMPACT HERO SECTION (Full Viewport Density - Minimal Vertical Spacing) */}
      <section className="pt-2 sm:pt-4 max-w-7xl mx-auto px-3 sm:px-6 text-center space-y-3">
        {/* Hero Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight max-w-4xl mx-auto">
          Simple Websites for Growing Small Businesses.
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
          {SITE_CONFIG.supportingMessage} Stop wasting hours typing repeated price lists in Instagram & WhatsApp DMs.
        </p>

        {/* Fast CTAs */}
        <div className="pt-0.5 flex flex-wrap items-center justify-center gap-2">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs px-5 py-2 rounded-xl transition-all shadow-sm cursor-pointer hover:scale-102"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Get a Free Quote</span>
          </Link>

          <button
            onClick={() =>
              openWhatsApp(
                { message: "Hi Shanthapriya, I need a simple website for my business in Sri Lanka. Can you give me a quote?" },
                'hero_whatsapp_instant'
              )
            }
            className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </button>

          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-stone-50 text-stone-800 font-medium text-xs px-3.5 py-2 rounded-xl border border-stone-200 transition-colors shadow-2xs"
          >
            <span>Live Demos</span>
          </Link>
        </div>
      </section>

      {/* 2. REAL-TIME LIVING FOUNDER AVATAR & CLONED VOICE ENGINE */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6">
        <LivingHumanAvatar variant="hero" />
      </section>

      {/* 2.5 INTERACTIVE DECISION MATRIX & INSTANT QUOTATION ENGINE */}
      <InteractiveQuotationMatrix />

      {/* 3. THE REALITY (Problem Recognition) - Super Compact 3-Column */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="p-3.5 sm:p-5 bg-white rounded-xl border border-stone-200 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-stone-100 pb-1.5">
            <div>
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
                The Reality for Sri Lankan Shops
              </span>
              <h2 className="text-xs sm:text-sm font-extrabold text-stone-900">
                Why Relying on Social Media Alone Is Costing You Ready-To-Buy Customers
              </h2>
            </div>
            <span className="text-[11px] text-stone-400">3 Major Bottlenecks</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            <div className="p-2.5 rounded-lg bg-stone-50/80 border border-stone-100 space-y-0.5">
              <span className="text-[11px] font-bold text-stone-900 block">1. Endless DM Repetition</span>
              <p className="text-[11px] text-stone-600 leading-snug">
                Typing prices, sending cake photos, and explaining slots in WhatsApp wastes hours every single day.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-stone-50/80 border border-stone-100 space-y-0.5">
              <span className="text-[11px] font-bold text-stone-900 block">2. Invisibility on Google</span>
              <p className="text-[11px] text-stone-600 leading-snug">
                When people search "bakery near me" or "wedding florist", FB posts don't rank. You lose orders to rivals.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-stone-50/80 border border-stone-100 space-y-0.5">
              <span className="text-[11px] font-bold text-stone-900 block">3. Corporate Distrust</span>
              <p className="text-[11px] text-stone-600 leading-snug">
                High-ticket corporate buyers & event planners hesitate to transfer advance payments to a social page only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TAILORED WEBSITE SOLUTIONS - 6x1 Compact Grid */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b border-stone-200 pb-1.5">
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-stone-900 tracking-tight">
              Tailored Website Solutions
            </h2>
            <p className="text-[11px] text-stone-500">
              Practical structures designed specifically for how local customers browse and order.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-0.5 text-xs font-semibold text-stone-700 hover:text-emerald-700 transition-colors shrink-0"
          >
            <span>All Solutions & Pricing</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6x1 Grid: 5 Services + 1 Need Advice Card */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
          {/* 1. Business Website */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-2xs transition-all space-y-1.5 flex flex-col justify-between group">
            <div className="space-y-1">
              <div className="w-6 h-6 rounded bg-stone-100 flex items-center justify-center text-stone-800">
                <Building2 className="w-3 h-3" />
              </div>
              <h3 className="font-bold text-[11px] sm:text-xs text-stone-900 group-hover:text-emerald-700 transition-colors">
                Business Presence
              </h3>
              <p className="text-[10px] sm:text-[11px] text-stone-500 leading-tight line-clamp-2">
                Essential site for trades, consultancies, and shops with Google map & contact.
              </p>
            </div>
            <div className="pt-1.5 border-t border-stone-100 flex items-center justify-between text-[10px]">
              <span className="text-stone-400">Starter</span>
              <Link to="/services" className="font-bold text-stone-900 hover:text-emerald-700 flex items-center">
                <span>Details →</span>
              </Link>
            </div>
          </div>

          {/* 2. Menu & WhatsApp Ordering */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-2xs transition-all space-y-1.5 flex flex-col justify-between group">
            <div className="space-y-1">
              <div className="w-6 h-6 rounded bg-amber-50 text-amber-800 flex items-center justify-center">
                <UtensilsCrossed className="w-3 h-3" />
              </div>
              <h3 className="font-bold text-[11px] sm:text-xs text-stone-900 group-hover:text-emerald-700 transition-colors">
                Menu & WhatsApp
              </h3>
              <p className="text-[10px] sm:text-[11px] text-stone-500 leading-tight line-clamp-2">
                Visual digital menu with 1-tap WhatsApp pre-ordering pre-filling prices.
              </p>
            </div>
            <div className="pt-1.5 border-t border-stone-100 flex items-center justify-between text-[10px]">
              <span className="text-stone-400">Food / Cafe</span>
              <Link to="/services" className="font-bold text-stone-900 hover:text-emerald-700 flex items-center">
                <span>Details →</span>
              </Link>
            </div>
          </div>

          {/* 3. Booking Website */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-2xs transition-all space-y-1.5 flex flex-col justify-between group">
            <div className="space-y-1">
              <div className="w-6 h-6 rounded bg-stone-100 text-stone-800 flex items-center justify-center">
                <CalendarCheck className="w-3 h-3" />
              </div>
              <h3 className="font-bold text-[11px] sm:text-xs text-stone-900 group-hover:text-emerald-700 transition-colors">
                Booking Flow
              </h3>
              <p className="text-[10px] sm:text-[11px] text-stone-500 leading-tight line-clamp-2">
                Treatment lists and appointment requests for salons, spas, & fitness coaches.
              </p>
            </div>
            <div className="pt-1.5 border-t border-stone-100 flex items-center justify-between text-[10px]">
              <span className="text-stone-400">Salons</span>
              <Link to="/services" className="font-bold text-stone-900 hover:text-emerald-700 flex items-center">
                <span>Details →</span>
              </Link>
            </div>
          </div>

          {/* 4. Product Showcase */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-2xs transition-all space-y-1.5 flex flex-col justify-between group">
            <div className="space-y-1">
              <div className="w-6 h-6 rounded bg-rose-50 text-rose-800 flex items-center justify-center">
                <ShoppingBag className="w-3 h-3" />
              </div>
              <h3 className="font-bold text-[11px] sm:text-xs text-stone-900 group-hover:text-emerald-700 transition-colors">
                Product Showcase
              </h3>
              <p className="text-[10px] sm:text-[11px] text-stone-500 leading-tight line-clamp-2">
                Digital showroom for florists, gifts, and crafts with gallery & WhatsApp inquiries.
              </p>
            </div>
            <div className="pt-1.5 border-t border-stone-100 flex items-center justify-between text-[10px]">
              <span className="text-stone-400">Retail</span>
              <Link to="/services" className="font-bold text-stone-900 hover:text-emerald-700 flex items-center">
                <span>Details →</span>
              </Link>
            </div>
          </div>

          {/* 5. Realtor & Professional */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-2xs transition-all space-y-1.5 flex flex-col justify-between group">
            <div className="space-y-1">
              <div className="w-6 h-6 rounded bg-sky-50 text-sky-800 flex items-center justify-center">
                <Home className="w-3 h-3" />
              </div>
              <h3 className="font-bold text-[11px] sm:text-xs text-stone-900 group-hover:text-emerald-700 transition-colors">
                Realtor / Agency
              </h3>
              <p className="text-[10px] sm:text-[11px] text-stone-500 leading-tight line-clamp-2">
                Authoritative listings with specs, photos, amenities, and viewing appointments.
              </p>
            </div>
            <div className="pt-1.5 border-t border-stone-100 flex items-center justify-between text-[10px]">
              <span className="text-stone-400">Real Estate</span>
              <Link to="/services" className="font-bold text-stone-900 hover:text-emerald-700 flex items-center">
                <span>Details →</span>
              </Link>
            </div>
          </div>

          {/* 6. Need Advice Quick Action */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-stone-900 text-white space-y-1.5 flex flex-col justify-between">
            <div className="space-y-0.5">
              <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block">
                Quick Advice
              </span>
              <h3 className="font-bold text-[11px] sm:text-xs">Not sure which fits?</h3>
              <p className="text-[10px] sm:text-[11px] text-stone-300 leading-tight">
                Send a 10-sec voice note on WhatsApp.
              </p>
            </div>
            <button
              onClick={() =>
                openWhatsApp(
                  { message: "Hi Shanthapriya, I'm not sure which website package fits my business best. Can you advise?" },
                  'home_need_advice_compact'
                )
              }
              className="w-full py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-center font-bold text-[10px] rounded-lg transition-colors cursor-pointer"
            >
              Ask on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* 6. CONCEPT WEBSITES - 6x1 Compact Grid (All 6 Concepts - No Long Scroll) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b border-stone-200 pb-1.5">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-600 mb-0.5">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Interactive Demonstrations</span>
            </div>
            <h2 className="text-sm sm:text-base font-extrabold text-stone-900 tracking-tight">
              Test Live Working Website Concepts
            </h2>
            <p className="text-[11px] text-stone-500">
              *Practical demonstration layouts. Click any concept to test or adapt for your brand in 3-5 days.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1 text-xs font-bold text-stone-900 hover:text-emerald-700 transition-colors shrink-0"
          >
            <span>Explore All 6 Concepts</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 6x1 Grid of Concepts */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
          {CONCEPT_PROJECTS.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:border-stone-400 hover:shadow-2xs transition-all flex flex-col justify-between group"
            >
              <div>
                <Link to={`/projects/${p.slug}`} className="block relative aspect-4/3 overflow-hidden bg-stone-100">
                  <img
                    src={p.mainImage}
                    alt={`${p.title} - Website concept by Ravana Tech`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-1 left-1">
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-stone-900/90 text-amber-300 backdrop-blur-2xs">
                      Demo
                    </span>
                  </div>
                </Link>

                <div className="p-2 space-y-0.5">
                  <span className="text-[9px] font-semibold text-stone-400 uppercase tracking-wider block truncate">
                    {p.categoryLabel}
                  </span>
                  <h3 className="font-bold text-[11px] sm:text-xs text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    <Link to={`/projects/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p className="text-[10px] text-stone-500 leading-tight line-clamp-2">
                    {p.solution}
                  </p>
                </div>
              </div>

              {/* Compact Action Buttons */}
              <div className="p-2 pt-0 space-y-1">
                <Link
                  to={p.demoUrl}
                  className="w-full py-1 bg-stone-900 hover:bg-stone-800 text-white rounded text-[10px] font-semibold text-center transition-colors flex items-center justify-center gap-1 shadow-2xs"
                >
                  <Eye className="w-2.5 h-2.5" />
                  <span>Live Demo</span>
                </Link>

                <Link
                  to={`/projects/${p.slug}`}
                  className="w-full py-0.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-[9px] font-medium text-center transition-colors block truncate"
                >
                  Inspect Case →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. QUICK TRUST & FOUNDER (Compact 2-Grid) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {/* Why Ravana Tech (The Standard) */}
          <div className="p-3.5 sm:p-4 bg-white rounded-xl border border-stone-200 space-y-2">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
              The Ravana Tech Guarantee
            </span>
            <h3 className="font-bold text-xs sm:text-sm text-stone-900">
              Why Sri Lankan Business Owners Choose Us:
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-[11px] text-stone-600">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Direct Founder Talk (No Middlemen)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>AI-Assisted Turnkey Delivery (3 Days)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Zero Recurring Server Hosting Bills</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>100% Tested on Smart Mobile Phones</span>
              </li>
            </ul>
          </div>

          {/* About Founder Minimal */}
          <div className="p-3.5 sm:p-4 bg-stone-100/70 rounded-xl border border-stone-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-stone-900 text-stone-100 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                RT
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider block">
                  Lead Engineer & Founder
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900">Shanthapriya Silva</h4>
                <p className="text-[10px] sm:text-[11px] text-stone-600 leading-snug">
                  20 years diverse experience · Dedicated to high-conversion web development for local businesses.
                </p>
              </div>
            </div>
            <Link
              to="/about"
              className="text-[11px] font-bold text-stone-900 hover:text-emerald-700 shrink-0 bg-white px-2.5 py-1 rounded-lg border border-stone-200"
            >
              Background →
            </Link>
          </div>
        </div>
      </section>

      {/* 8. COMPACT FAQ ACCORDION (3 Most Critical Questions) */}
      <section className="max-w-4xl mx-auto px-3 sm:px-6 space-y-2">
        <div className="text-center space-y-0.5">
          <h2 className="text-xs sm:text-sm font-extrabold text-stone-900">
            Frequently Asked Questions
          </h2>
          <p className="text-[10px] text-stone-500">
            Clear, honest answers about website development, hosting, and WhatsApp ordering.
          </p>
        </div>

        <div className="space-y-1.5">
          {FAQS_LIST.slice(0, 3).map((faq, idx) => (
            <details
              key={idx}
              className="group p-2.5 sm:p-3 bg-white rounded-lg border border-stone-200 transition-all [&_summary::-webkit-details-marker]:hidden text-xs"
            >
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-[11px] sm:text-xs text-stone-900">
                <span>{faq.question}</span>
                <span className="transition-transform group-open:rotate-180 text-stone-400 text-[10px]">▼</span>
              </summary>
              <p className="mt-1.5 text-[11px] text-stone-600 leading-relaxed border-t border-stone-100 pt-1.5">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};
