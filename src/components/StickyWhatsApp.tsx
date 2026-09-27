import React from 'react';
import { MessageSquare } from 'lucide-react';
import { SITE_CONFIG } from '../lib/config';
import { trackEvent } from '../lib/analytics';

export const StickyWhatsApp: React.FC = () => {
  const handleClick = () => {
    trackEvent('whatsapp_click', {
      cta_location: 'mobile_sticky_bar',
    });
  };

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:hidden z-30 pointer-events-auto">
      <a
        href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20Shanthapriya,%20I'm%20interested%20in%20a%20website%20for%20my%20business.`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium text-sm py-3 px-4 rounded-xl shadow-lg border border-emerald-500/30 transition-transform active:scale-[0.98]"
        aria-label="Chat on WhatsApp with Ravana Tech"
      >
        <MessageSquare className="w-4 h-4 fill-white/20" />
        <span className="font-semibold">WhatsApp Ravana Tech</span>
        <span className="text-emerald-100 text-xs font-normal">({SITE_CONFIG.phoneDisplay})</span>
      </a>
    </div>
  );
};
