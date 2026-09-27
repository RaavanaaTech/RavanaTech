import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, MessageSquare } from 'lucide-react';
import { buildWhatsAppUrl } from '../../lib/whatsapp';

interface ConceptDemoHeaderProps {
  conceptTitle: string;
  conceptSlug: string;
}

export const ConceptDemoHeader: React.FC<ConceptDemoHeaderProps> = ({
  conceptTitle,
  conceptSlug,
}) => {
  const whatsappUrl = buildWhatsAppUrl({
    conceptTitle,
    need: `Customize ${conceptTitle}`,
    message: `Hi Shanthapriya, I reviewed the live demo of "${conceptTitle}" and would like to adapt it with my own business products and branding.`,
  });

  return (
    <div className="sticky top-0 z-50 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-md px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Link
            to={`/projects/${conceptSlug}`}
            className="inline-flex items-center gap-1.5 font-medium text-stone-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Project Details</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <span className="text-stone-600">|</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 font-semibold border border-amber-800/60 text-[10px] uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            Concept Demonstration
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/contact?concept=${conceptSlug}`}
            className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded font-medium transition-colors"
          >
            Request Customization
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-semibold transition-colors"
          >
            <MessageSquare className="w-3 h-3" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
