import React from 'react';
import { SEO } from '../components/seo/SEO';
import { ShieldCheck, Mail, Phone, Lock, Server } from 'lucide-react';
import { SITE_CONFIG } from '../lib/config';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      <SEO
        title="Privacy Policy & Data Handling"
        description="Plain-language privacy policy explaining how Ravana Tech handles project inquiries, contact information, and business confidentiality in Sri Lanka."
        canonicalPath="/privacy"
      />

      {/* Header */}
      <section className="pt-10 sm:pt-14 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold border border-stone-200">
          <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
          <span>Customer Trust & Data Integrity</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-lg mx-auto">
          We respect your privacy. Here is an honest, plain-English explanation of what data we collect and how we safeguard it.
        </p>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-3">
          <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>1. What Information We Collect</span>
          </h2>
          <p>When you contact Ravana Tech through our website form, direct email, phone call, or WhatsApp, we collect only the information you voluntarily provide:</p>
          <ul className="list-disc pl-5 space-y-1 text-stone-600">
            <li>Your name and contact phone / WhatsApp number</li>
            <li>Your business or brand name and business type (e.g. Bakery, Salon)</li>
            <li>Project requirements, design preferences, and estimated budget guidance</li>
            <li>Any notes or menu items you submit for website planning</li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-3">
          <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-600" />
            <span>2. Why We Collect It & How We Use It</span>
          </h2>
          <p>Your details are used strictly to:</p>
          <ul className="list-disc pl-5 space-y-1 text-stone-600">
            <li>Review your website scope and provide an accurate, honest project quote</li>
            <li>Communicate directly regarding your inquiries, proposals, and development timelines</li>
            <li>Prepare project proposals, contract agreements, or invoices</li>
          </ul>
          <p className="font-semibold text-stone-900 pt-1">
            We will never sell, rent, or trade your contact information or project specifications to third-party telemarketers or advertisers.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-3">
          <h2 className="text-base font-bold text-stone-900">3. Storage & Security Practices</h2>
          <p>
            Form submissions are stored securely in Google Cloud / Firebase Firestore infrastructure protected by strict server-side security rules.
            Access to inquiry records is restricted to authenticated administrator sessions only. Public visitors have no access to browse or read inquiries.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-3">
          <h2 className="text-base font-bold text-stone-900">4. Analytics & Cookies</h2>
          <p>
            We use lightweight, privacy-conscious Google Analytics to monitor general website traffic trends (such as page visits, device types, and button interactions).
            We do not transmit personal names, phone numbers, or private inquiry messages to analytics trackers.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-3">
          <h2 className="text-base font-bold text-stone-900">5. Contact Us Regarding Your Data</h2>
          <p>
            If you wish to review, update, or request the deletion of your inquiry details from our database, please contact Shanthapriya Silva directly:
          </p>
          <div className="pt-2 space-y-1 font-semibold text-stone-900">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-stone-500" />
              <a href={`mailto:${SITE_CONFIG.email}`} className="hover:underline">{SITE_CONFIG.email}</a>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-stone-500" />
              <span>{SITE_CONFIG.phoneDisplay}</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
