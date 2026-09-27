import React, { useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { trackEvent } from '../../lib/analytics';
import { openWhatsApp } from '../../lib/whatsapp';
import { Send, CheckCircle2, MessageSquare, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface QuickLeadCaptureProps {
  onSuccess?: () => void;
}

export const QuickLeadCapture: React.FC<QuickLeadCaptureProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    phone: '',
    businessType: 'Bakery / Food Studio',
    need: 'Instant Quote & WhatsApp Ordering',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const businessTypes = [
    'Bakery / Food Studio',
    'Specialty Cafe / Restaurant',
    'Salon / Spa / Grooming',
    'Flower Shop / Gifts & Crafts',
    'Real Estate / Property',
    'Personal Trainer / Fitness',
    'Consultant / Professional',
    'Other Small Business'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Quick validation
    if (!formData.phone.trim() || formData.phone.trim().length < 9) {
      setError('Please enter a valid phone or WhatsApp number.');
      return;
    }

    setLoading(true);

    try {
      // Direct Firestore Insertion to save lead for database promotion / follow-up
      await addDoc(collection(db, 'inquiries'), {
        name: formData.businessName.trim() || 'Quick Quote Visitor',
        businessName: formData.businessName.trim() || 'Small Business',
        businessType: formData.businessType,
        phone: formData.phone.trim(),
        need: formData.need,
        message: `Quick Quote request via 30-second Homepage lead capture widget. Business: ${formData.businessName || 'N/A'}, Category: ${formData.businessType}`,
        status: 'new',
        leadSource: 'homepage_quick_quote_widget',
        submittedAt: new Date().toISOString(),
        createdAt: serverTimestamp(),
      });

      trackEvent('contact_form_submit_success', {
        category: formData.businessType,
        source: 'homepage_quick_quote_widget',
      });

      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('Error saving lead:', err);
      // Even if Firestore hits permission or offline, we preserve user experience
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppInstant = () => {
    const text = `Hi Shanthapriya, I would like to get a quote for my business (${formData.businessName || 'My Business'} - ${formData.businessType}). My contact number is ${formData.phone || ''}.`;
    openWhatsApp({ message: text }, 'quick_quote_whatsapp_handoff');
  };

  if (submitted) {
    return (
      <div className="p-5 sm:p-6 bg-emerald-50/90 border border-emerald-300 rounded-2xl text-center space-y-3 shadow-xs">
        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <h3 className="font-extrabold text-stone-900 text-base sm:text-lg">
          Thank you! Your Details Are Recorded.
        </h3>
        <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
          I will review your requirements and send a customized quote & live demo recommendation to{' '}
          <strong className="text-stone-900">{formData.phone}</strong> within 2 hours.
        </p>
        <div className="pt-1">
          <button
            onClick={handleWhatsAppInstant}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp Directly Now</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="quick-quote-card" className="bg-stone-900 text-white p-4 sm:p-6 rounded-2xl border border-stone-800 shadow-xl relative overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative space-y-4">
        {/* Header line */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-stone-800 pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>30-Second Instant Quotation</span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              Get an Honest Price & Layout Recommendation in 30 Seconds
            </h3>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-stone-400">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>No long forms · 100% Free</span>
          </div>
        </div>

        {/* Quick Compact Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* 1. Phone / WhatsApp */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-300 mb-1">
                WhatsApp / Phone Number <span className="text-emerald-400">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="077 123 4567 or +94 77..."
                className="w-full px-3 py-2 bg-stone-950/80 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* 2. Business Name */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-300 mb-1">
                Your Shop or Brand Name
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="e.g. Colombo Treats"
                className="w-full px-3 py-2 bg-stone-950/80 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* 3. Category */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-300 mb-1">
                Business Type
              </label>
              <select
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                className="w-full px-3 py-2 bg-stone-950/80 border border-stone-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {businessTypes.map((type) => (
                  <option key={type} value={type} className="bg-stone-900 text-white">
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p className="text-[11px] text-rose-400 font-medium">{error}</p>
          )}

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-1">
            <div className="flex items-center gap-1.5 text-[10px] text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Direct Founder Review · Saved to secure database · No spam guaranteed</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{loading ? 'Submitting...' : 'Request Quotation (Free)'}</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppInstant}
                className="inline-flex items-center justify-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-emerald-400 font-semibold text-xs px-3.5 py-2.5 rounded-xl border border-stone-700 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp Directly</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
