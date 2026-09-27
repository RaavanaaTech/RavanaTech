import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { SERVICES_LIST, PRICING_PACKAGES } from '../data/servicesData';
import { SITE_CONFIG } from '../lib/config';
import { openWhatsApp } from '../lib/whatsapp';
import {
  ArrowRight,
  MessageSquare,
  Check,
  Building2,
  UtensilsCrossed,
  CalendarCheck,
  ShoppingBag,
  Home,
  Clock,
  Sparkles
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Building2':
        return <Building2 className="w-5 h-5 text-stone-900" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-stone-900" />;
      case 'CalendarCheck':
        return <CalendarCheck className="w-5 h-5 text-stone-900" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5 text-stone-900" />;
      case 'Home':
        return <Home className="w-5 h-5 text-stone-900" />;
      default:
        return <Building2 className="w-5 h-5 text-stone-900" />;
    }
  };

  const handleWhatsAppQuote = (tierName: string) => {
    openWhatsApp(
      {
        need: tierName,
        message: `Hi Shanthapriya, I would like to discuss my business scope and get a custom quote for the "${tierName}" tier.`,
      },
      'services_page_quote_request'
    );
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      <SEO
        title="Website Solutions & Custom Quotes | Ravana Tech"
        description="Bespoke website design for Sri Lankan businesses. Discuss your project scope and receive a transparent, custom written quote."
        canonicalPath="/services"
      />

      {/* Header - Minimal & Punchy */}
      <section className="pt-10 sm:pt-14 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
          Tailored Web Solutions
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
          Every business has unique needs. Instead of rigid, one-size-fits-all packages, we price each project transparently around your exact scope and goals.
        </p>
      </section>

      {/* 1. Core Package Tiers (Inquiry & Scope Discussion Model) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-6 sm:p-7 rounded-2xl border flex flex-col justify-between space-y-6 transition-all ${
                pkg.badge === 'Most Popular'
                  ? 'bg-white border-stone-900 shadow-sm ring-1 ring-stone-900/10'
                  : 'bg-white border-stone-200'
              }`}
            >
              <div className="space-y-4">
                {/* Meta header */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-stone-900">{pkg.name}</span>
                    <span className="text-[11px] font-semibold text-emerald-700">
                      {pkg.badge}
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 font-medium">
                    {pkg.scopeSummary} · {pkg.turnaround}
                  </div>
                </div>

                <div className="pt-1 pb-2 border-b border-stone-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block">
                    Investment
                  </span>
                  <div className="text-xl font-extrabold text-stone-900">
                    Custom Quotation
                  </div>
                  <span className="text-[11px] text-stone-500">
                    Calculated based on your exact deliverables
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Clean Feature List */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                    Included in Scope
                  </span>
                  <ul className="space-y-2 text-xs text-stone-700">
                    {pkg.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-stone-100">
                <Link
                  to={`/contact?need=${encodeURIComponent(pkg.name)}`}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5 ${
                    pkg.badge === 'Most Popular'
                      ? 'bg-stone-900 hover:bg-stone-800 text-white'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-900'
                  }`}
                >
                  <span>Request Custom Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => handleWhatsAppQuote(pkg.name)}
                  className="w-full py-2 px-3 rounded-xl font-semibold text-xs text-stone-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Discuss on WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Industry-Specific Solutions (Minimal & Clean) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
            Specialized Industry Setups
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Pre-tested architectures built for how Sri Lankan consumers browse and purchase.
          </p>
        </div>

        <div className="space-y-3">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 hover:border-stone-400 transition-all flex flex-col md:flex-row gap-5 items-start justify-between"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
                    {getIcon(service.iconName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-stone-900">{service.title}</h3>
                    <span className="text-[11px] text-stone-400">
                      Best for: {service.targetBusinesses.join(', ')}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed max-w-2xl">
                  {service.shortDescription}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                  {service.deliverables.slice(0, 4).map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-stone-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div className="shrink-0 w-full md:w-48 pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-stone-100 md:pl-5 flex flex-col justify-center gap-2 self-center">
                <Link
                  to={`/contact?need=${encodeURIComponent(service.title)}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs py-2 px-3 rounded-xl transition-colors text-center"
                >
                  <span>Inquire Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => handleWhatsAppQuote(service.title)}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-stone-50 hover:bg-stone-100 text-stone-700 font-semibold text-xs py-1.5 px-3 rounded-xl transition-colors cursor-pointer text-center"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Transparent Process Banner (Minimal CTA) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-extrabold text-lg text-white">
              Need a clear, written proposal for your business?
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 max-w-md">
              Share your requirements with us. You'll receive a detailed scope breakdown and fixed quotation within 24 hours.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-900 font-bold text-xs py-3 px-5 rounded-xl transition-colors shadow-xs"
            >
              <span>Get Free Quotation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
