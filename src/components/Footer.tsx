import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, MessageSquare, Video } from 'lucide-react';
import { SITE_CONFIG, ACCOUNT_ECOSYSTEM } from '../lib/config';

interface FooterProps {
  onOpenResume?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const socialIcons = [
    {
      name: 'WhatsApp',
      url: ACCOUNT_ECOSYSTEM.whatsapp?.url || `https://wa.me/${SITE_CONFIG.whatsappNumber}`,
      color: 'hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-950/20',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: ACCOUNT_ECOSYSTEM.facebook?.url || SITE_CONFIG.facebookUrl,
      color: 'hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-950/20',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: ACCOUNT_ECOSYSTEM.instagram?.url || 'https://www.instagram.com/ravanatechofficial',
      color: 'hover:text-pink-400 hover:border-pink-500/30 hover:bg-pink-950/20',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: ACCOUNT_ECOSYSTEM.linkedinCompany?.url || ACCOUNT_ECOSYSTEM.linkedinPersonal?.url || 'https://www.linkedin.com/company/ravanatech',
      color: 'hover:text-sky-400 hover:border-sky-500/30 hover:bg-sky-950/20',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      url: ACCOUNT_ECOSYSTEM.youtube?.url || 'https://www.youtube.com/@RavanaTechOfficial',
      color: 'hover:text-red-400 hover:border-red-500/30 hover:bg-red-950/20',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      url: ACCOUNT_ECOSYSTEM.tiktok?.url || 'https://www.tiktok.com/@ravanatechofficial',
      color: 'hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-950/20',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      url: ACCOUNT_ECOSYSTEM.x?.url || 'https://x.com/RavanaTech',
      color: 'hover:text-stone-100 hover:border-stone-500/30 hover:bg-stone-800/60',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      url: ACCOUNT_ECOSYSTEM.github?.url || SITE_CONFIG.githubUrl,
      color: 'hover:text-white hover:border-stone-500/30 hover:bg-stone-800/60',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-850 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Main Minimal Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-800/60">
          {/* Brand */}
          <div className="space-y-1">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/assets/brand/ravana-tech-mark.svg"
                alt="Ravana Tech Logo"
                className="w-7 h-7 rounded-lg shadow-xs"
              />
              <span className="font-bold text-base tracking-tight text-white">
                {SITE_CONFIG.brandName}
              </span>
            </Link>
            <p className="text-xs text-stone-500">
              Simple, high-conversion websites for Sri Lankan businesses.
            </p>
          </div>

          {/* Clean Navigation Links */}
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            <Link to="/" className="text-stone-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-stone-400 hover:text-white transition-colors">
              Solutions
            </Link>
            <Link to="/projects" className="text-stone-400 hover:text-white transition-colors">
              Projects
            </Link>
            <Link to="/about" className="text-stone-400 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/blog" className="text-stone-400 hover:text-white transition-colors">
              Guides
            </Link>
            <Link to="/contact" className="text-stone-400 hover:text-white transition-colors">
              Contact
            </Link>
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="text-stone-500 hover:text-stone-300 transition-colors cursor-pointer text-xs"
              >
                Founder CV
              </button>
            )}
          </nav>

          {/* Social Icons - Compact & Elegant */}
          <div className="flex items-center gap-1.5 shrink-0">
            {socialIcons.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                title={item.name}
                className={`w-7 h-7 rounded-lg bg-stone-900 text-stone-400 border border-stone-800/80 flex items-center justify-center transition-all hover:scale-105 ${item.color}`}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* 15-Min Free Google Meet Consultation Banner */}
        <div className="py-4 px-5 my-6 rounded-2xl bg-gradient-to-r from-sky-950/40 via-stone-900/60 to-emerald-950/30 border border-sky-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center shrink-0">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-xs text-stone-200 block">
                15-Min Free Google Meet / Zoom Consultation
              </span>
              <span className="text-[11px] text-stone-400 block mt-0.5">
                Screen-share, explore live architecture, and get honest technical guidance directly from founder Shanthapriya Silva.
              </span>
            </div>
          </div>

          <a
            href="https://wa.me/94788470610?text=Hi%20Shanthapriya,%20I%20would%20like%20to%20schedule%20a%20free%2015-minute%20Google%20Meet%20/%20Zoom%20session%20to%20discuss%20my%20website%20plan."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-sky-600/80 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 shadow-sm cursor-pointer"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Schedule 15-Min Meet</span>
          </a>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span>© 2026 {SITE_CONFIG.brandName}</span>
            <span>·</span>
            <span>Colombo, Sri Lanka</span>
            <span>·</span>
            <a
              href={ACCOUNT_ECOSYSTEM.whatsapp?.url || `https://wa.me/${SITE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
            >
              <MessageSquare className="w-3 h-3 text-emerald-500" />
              <span>{SITE_CONFIG.phoneDisplay}</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/privacy" className="hover:text-stone-300 transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link
              to="/admin/login"
              className="hover:text-stone-300 transition-colors flex items-center gap-1"
            >
              <Lock className="w-2.5 h-2.5 text-stone-600" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
