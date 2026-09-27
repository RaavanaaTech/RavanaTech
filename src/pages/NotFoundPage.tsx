import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Home, ArrowLeft, MessageSquare } from 'lucide-react';
import { SITE_CONFIG } from '../lib/config';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
      <SEO title="Page Not Found (404)" description="The page you requested could not be found." />

      <div className="space-y-2">
        <span className="text-4xl font-extrabold text-stone-300">404</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
          The link you clicked may have moved or no longer exists. Let's get you back on track.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Go to Homepage</span>
        </Link>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-xl transition-colors"
        >
          <span>Explore Website Concepts</span>
        </Link>
        <a
          href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20Shanthapriya,%20I%20noticed%20a%20broken%20link%20on%20your%20website.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Contact on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
