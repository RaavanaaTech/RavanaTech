import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { SITE_CONFIG } from '../lib/config';
import { openWhatsApp } from '../lib/whatsapp';
import {
  FileText,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Cpu,
  HeartHandshake,
  UserCheck,
  AlertCircle
} from 'lucide-react';

interface AboutPageProps {
  onOpenResume?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenResume }) => {
  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      <SEO
        title="About Shanthapriya Silva — Founder of Ravana Tech"
        description="Meet Shanthapriya Silva, founder of Ravana Tech. 20 years of diverse professional experience combined with modern AI-assisted web development for Sri Lankan small businesses."
        canonicalPath="/about"
      />

      {/* Main Profile Header */}
      <section className="pt-10 sm:pt-14 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-xs flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Founder Visual Emblem / Placeholder */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-stone-900 text-stone-100 flex flex-col items-center justify-center shrink-0 shadow-md border-4 border-stone-100">
            <span className="font-extrabold text-3xl tracking-tight">RT</span>
            <span className="text-[10px] text-stone-400 font-semibold tracking-wider mt-1">FOUNDER</span>
          </div>

          <div className="space-y-4 text-center md:text-left flex-1">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                Founder & Lead Digital Specialist
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 mt-1">
                {SITE_CONFIG.founderName}
              </h1>
            </div>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
              "{SITE_CONFIG.founderExperience}"
            </p>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Based in Sri Lanka, I created Ravana Tech to bridge the gap between expensive software agencies and bloated, broken templates.
              My goal is simple: help hardworking local business owners launch clean, dependable websites that make it easy for their customers to find them, inspect their products, and order over WhatsApp.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() =>
                  openWhatsApp(
                    { message: "Hi Shanthapriya, I would like to introduce my business and discuss a website." },
                    'about_page_whatsapp'
                  )
                }
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-5 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat with Shanthapriya</span>
              </button>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs py-2.5 px-5 rounded-xl border border-stone-200 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-stone-500" />
                  <span>Inspect Background & CV</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy: AI-Assisted, Human-Guided */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Core Working Philosophy</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            AI-Assisted. Business-Focused. Human-Guided.
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto">
            Artificial Intelligence is a supporting capability, not the product itself.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-900 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900">1. AI-Assisted Efficiency</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We leverage modern AI coding assistants to write clean, boilerplate code rapidly. This cuts project delivery time from months to days, allowing us to keep prices accessible.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-900 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900">2. Business-Focused Scope</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We do not build complicated, fragile features you do not need. Every button, menu item, and layout is built around one clear goal: helping your customer take action.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-900 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900">3. Human-Guided Care</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              AI cannot understand your neighborhood, your loyal customers, or your unique recipes. Shanthapriya personally reviews every word, photo, and link before your website goes live.
            </p>
          </div>
        </div>
      </section>

      {/* Relevant Real-World Strengths */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-stone-200 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 text-center sm:text-left">
            What You Can Expect Working With Me
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
            <div className="p-4 rounded-xl bg-stone-50 space-y-1">
              <strong className="text-stone-900 block text-sm">Truthful, Jargon-Free Advice</strong>
              <p className="text-stone-500 leading-relaxed">
                If your business only needs a simple 1-page website, I will tell you frankly instead of trying to sell you an expensive 10-page package.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 space-y-1">
              <strong className="text-stone-900 block text-sm">Fast WhatsApp Communication</strong>
              <p className="text-stone-500 leading-relaxed">
                You never wait days for email replies. Quick voice notes and messages over WhatsApp keep your project moving smoothly.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 space-y-1">
              <strong className="text-stone-900 block text-sm">Practical Operational Thinking</strong>
              <p className="text-stone-500 leading-relaxed">
                With 20 years of diverse professional experience in customer handling and operations, I focus on how your site functions in the real world.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 space-y-1">
              <strong className="text-stone-900 block text-sm">Complete Ownership & Transparency</strong>
              <p className="text-stone-500 leading-relaxed">
                You own your domain and your website. No hostage fees, no artificial lock-ins, and full transparency on all accounts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
