import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import {
  MessageSquare,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Lock,
  Clock,
  Send,
  Video
} from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { SITE_CONFIG } from '../lib/config';
import { trackEvent } from '../lib/analytics';
import { validateInquiry } from '../lib/validation';
import { buildWhatsAppUrl, openWhatsApp } from '../lib/whatsapp';
import { CONCEPT_PROJECTS } from '../data/projectsData';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const conceptParam = searchParams.get('concept');
  const needParam = searchParams.get('need');

  const selectedConcept = conceptParam
    ? CONCEPT_PROJECTS.find((p) => p.slug === conceptParam || p.id === conceptParam)
    : null;

  const [formStartTime] = useState<number>(() => Date.now());

  const initialNeed = needParam
    ? needParam
    : selectedConcept
    ? `Customize "${selectedConcept.title}" Concept`
    : 'Starter Presence Website';

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    businessType: selectedConcept ? selectedConcept.categoryLabel : 'Bakery / Food Business',
    phone: '',
    need: initialNeed,
    budget: 'Tailored Scope Quotation',
    referralSource: 'Direct',
    message: selectedConcept
      ? `I would like to adapt the "${selectedConcept.title}" concept layout with my own products, details, and WhatsApp orders.`
      : needParam
      ? `I would like to get a custom quote and discuss the scope for ${needParam}.`
      : '',
    honeypot: '', // Hidden spam trap
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    trackEvent('contact_form_start', {
      concept_slug: selectedConcept?.slug,
      cta_location: 'contact_page',
    });
  }, [selectedConcept]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    setErrorMessage('');

    // 1. Client-side input & anti-spam validation
    const validation = validateInquiry({
      ...formData,
      formStartTime,
      customizingConceptId: selectedConcept?.id || null,
      customizingConceptTitle: selectedConcept?.title || null,
    });

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      if (validation.errors.general) {
        setErrorMessage(validation.errors.general);
      }
      return;
    }

    setSubmitStatus('submitting');

    try {
      // 2. Real Firestore database insertion
      const sanitized = validation.sanitizedData!;
      await addDoc(collection(db, 'inquiries'), {
        name: sanitized.name,
        businessName: sanitized.businessName,
        businessType: sanitized.businessType,
        phone: sanitized.phone,
        need: sanitized.need,
        message: sanitized.message,
        budget: sanitized.budget,
        referralSource: sanitized.referralSource,
        customizingConceptId: sanitized.customizingConceptId,
        customizingConceptTitle: sanitized.customizingConceptTitle,
        status: 'new',
        source: selectedConcept ? 'concept_customization' : 'website_contact_form',
        createdAt: serverTimestamp(),
      });

      // 3. Mark success ONLY AFTER database write succeeds
      setSubmitStatus('success');
      trackEvent('contact_form_submit_success', {
        concept_slug: selectedConcept?.slug,
        service_name: sanitized.need,
      });
    } catch (err: any) {
      console.error('[Firestore Inquiry Submission Error]', err);
      setSubmitStatus('error');
      setErrorMessage(
        'Unable to submit directly right now due to a network connection issue. You can instantly send your details directly via WhatsApp below.'
      );
      trackEvent('contact_form_submit_error', {
        error_type: err?.code || 'unknown_error',
      });
    }
  };

  const handleOpenWhatsAppFromForm = () => {
    openWhatsApp(
      {
        conceptTitle: selectedConcept?.title,
        name: formData.name,
        businessName: formData.businessName,
        phone: formData.phone,
        need: formData.need,
        budget: formData.budget,
        message: formData.message,
        source: 'contact_page_cta',
      },
      'contact_form_direct_whatsapp'
    );
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      <SEO
        title="Contact & Direct WhatsApp Inquiry"
        description="Discuss your small business website with Shanthapriya Silva. Direct WhatsApp chat, upfront package pricing, and fast response."
        canonicalPath="/contact"
      />

      {/* Header */}
      <section className="pt-10 sm:pt-14 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
          {selectedConcept
            ? `Customize "${selectedConcept.title}"`
            : "Let’s Talk About Your Website"}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-lg mx-auto">
          {selectedConcept
            ? `Send your business details to customize the ${selectedConcept.title} design with your own logo, prices, and WhatsApp orders.`
            : 'Message me directly on WhatsApp or send a project inquiry below. I will reply with an honest recommendation and clear pricing.'}
        </p>
      </section>

      {/* Main Grid */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Direct WhatsApp Fast Track Card (Left) */}
          <div className="md:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Fastest Communication
                </span>
                <h3 className="font-bold text-base text-stone-900">Chat on WhatsApp</h3>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Have a quick question about website packages, menu options, or delivery timelines? Message Shanthapriya directly on WhatsApp for an immediate response.
            </p>

            <div className="space-y-2">
              <button
                onClick={handleOpenWhatsAppFromForm}
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open WhatsApp ({SITE_CONFIG.phoneDisplay})</span>
              </button>

              <a
                href="https://wa.me/94788470610?text=Hi%20Shanthapriya,%20I%20would%20like%20to%20schedule%20a%20free%2015-minute%20Google%20Meet%20/%20Zoom%20session%20to%20discuss%20my%20website%20plan."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Video className="w-4 h-4 text-sky-600" />
                <span>Schedule Free 15-Min Google Meet</span>
              </a>
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-3 text-xs text-stone-600">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                <a href={`tel:${SITE_CONFIG.phoneTel}`} className="hover:text-stone-900 font-medium">
                  Direct: {SITE_CONFIG.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-stone-900 font-medium">
                  {SITE_CONFIG.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-stone-700 font-medium">
                  WhatsApp Support Active
                </span>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl text-[11px] text-stone-500 space-y-1">
              <span className="font-semibold text-stone-700 block flex items-center gap-1">
                <Clock className="w-3 h-3 text-stone-400" />
                Typical Response Time
              </span>
              <p>Under 2 hours during daytime (Monday – Saturday, 8:00 AM – 7:00 PM).</p>
            </div>
          </div>

          {/* Inquiry Form (Right) */}
          <div className="md:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200">
            {selectedConcept && (
              <div className="mb-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Selected Base Concept: {selectedConcept.title}</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  We will adapt this verified layout with your company branding, photos, pricing, and WhatsApp orders in 3–5 days.
                </p>
              </div>
            )}

            {/* Success State */}
            {submitStatus === 'success' ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-stone-900">
                  Enquiry Successfully Received!
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your project details have been safely registered. Shanthapriya will review your inquiry and message you on WhatsApp or call you shortly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleOpenWhatsAppFromForm}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-6 rounded-xl transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Speed up by forwarding to WhatsApp</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-bold text-base text-stone-900 border-b border-stone-100 pb-2">
                  {selectedConcept ? 'Concept Customization Request' : 'Project Enquiry Form'}
                </h3>

                {/* General or network error notice */}
                {submitStatus === 'error' && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-2">
                    <div className="flex items-center gap-2 font-bold">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Submission Notice</span>
                    </div>
                    <p>{errorMessage}</p>
                    <div className="pt-1 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-900 text-white rounded-lg font-semibold text-xs cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Retry Submission</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleOpenWhatsAppFromForm}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-semibold text-xs cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Send via WhatsApp Fallback</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Honeypot Spam Trap (Hidden from genuine humans) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website_fax_trap">Do not fill this</label>
                  <input
                    type="text"
                    id="website_fax_trap"
                    name="website_fax_trap"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-700 block">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kasun Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-stone-900 bg-stone-50/40"
                    />
                    {validationErrors.name && (
                      <p className="text-[10px] text-rose-600 font-semibold">{validationErrors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-700 block">
                      Business or Brand Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cinnamon Bakes, Negombo"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-stone-900 bg-stone-50/40"
                    />
                    {validationErrors.businessName && (
                      <p className="text-[10px] text-rose-600 font-semibold">{validationErrors.businessName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-700 block">
                      WhatsApp / Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 077 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-stone-900 bg-stone-50/40"
                    />
                    {validationErrors.phone && (
                      <p className="text-[10px] text-rose-600 font-semibold">{validationErrors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-700 block">
                      Business Type
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-stone-900 bg-white"
                    >
                      <option value="Bakery / Cake Shop / Home Baker">Bakery / Cake Shop / Home Baker</option>
                      <option value="Cafe / Coffee Shop / Eatery">Cafe / Coffee Shop / Eatery</option>
                      <option value="Salon / Barbershop / Spa">Salon / Barbershop / Spa</option>
                      <option value="Flora / Flower Boutique / Gift Shop">Flora / Flower Boutique / Gift Shop</option>
                      <option value="Real Estate Broker / Property Agent">Real Estate Broker / Property Agent</option>
                      <option value="Personal Trainer / Fitness Coach">Personal Trainer / Fitness Coach</option>
                      <option value="Other Small Business / Consultancy">Other Small Business / Consultancy</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-700 block">
                      What solution / scope do you need? <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.need}
                      onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-stone-900 bg-white"
                    >
                      {selectedConcept && (
                        <option value={`Customize "${selectedConcept.title}" Concept`}>
                          Customize "{selectedConcept.title}" Concept
                        </option>
                      )}
                      <option value="Starter Presence Website">Starter Presence (Fast Launch)</option>
                      <option value="Growth & Catalogue Website">Growth & Catalogue (Menu / Store / Booking)</option>
                      <option value="Custom Architecture">Custom Architecture (Tailored Scope)</option>
                      <option value="Business Website">Business Website</option>
                      <option value="Menu & WhatsApp Ordering">Menu & WhatsApp Ordering</option>
                      <option value="Service & Booking Flow">Service & Booking Flow</option>
                      <option value="Product Showcase & Catalogue">Product Showcase & Catalogue</option>
                      <option value="Real Estate & Portfolio Hub">Real Estate & Portfolio Hub</option>
                      <option value="Website Redesign / Upgrade">Website Redesign / Upgrade</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-700 block">
                      Scope & Quotation Preference
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-stone-900 bg-white"
                    >
                      <option value="Tailored Scope Quotation">Tailored Scope Quotation (Based on requirements)</option>
                      <option value="Starter Scope (Essential Business)">Starter Scope (Essential Business Presence)</option>
                      <option value="Growth Scope (Interactive Features)">Growth Scope (Interactive Menu / Booking / Catalogue)</option>
                      <option value="Advanced Custom Scope">Advanced Custom Scope (Multi-Page / Complex Architecture)</option>
                      <option value="Need Consultation First">Need Consultation First (Discuss on WhatsApp / Call)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-700 block">
                    Tell me about your project or specific items to include
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. We have about 12 menu items and want customers to browse and place orders directly to our WhatsApp."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-stone-900 bg-stone-50/40"
                  />
                  {validationErrors.message && (
                    <p className="text-[10px] text-rose-600 font-semibold">{validationErrors.message}</p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="w-full sm:flex-1 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white font-bold text-xs py-3 px-6 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitStatus === 'submitting' ? 'Submitting...' : 'Submit Project Enquiry'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenWhatsAppFromForm}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>

                <p className="text-[11px] text-stone-400 text-center pt-1">
                  🔒 We respect your business privacy. Your details are never sold or shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
