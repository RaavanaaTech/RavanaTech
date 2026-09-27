import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, MessageSquare, FileText } from 'lucide-react';
import { SITE_CONFIG } from '../lib/config';

interface NavbarProps {
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand Logo & Name */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            aria-label={`${SITE_CONFIG.brandName} Homepage`}
          >
            <img
              src="/assets/brand/ravana-tech-mark.svg"
              alt="Ravana Tech Logo"
              className="w-8 h-8 rounded-lg shadow-xs object-cover"
            />
            <div>
              <span className="block font-bold text-base tracking-tight text-stone-900 leading-none group-hover:text-stone-700 transition-colors">
                {SITE_CONFIG.brandName}
              </span>
              <span className="block text-[11px] font-medium text-stone-500 tracking-normal mt-0.5">
                {SITE_CONFIG.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-stone-900 bg-stone-200/80 font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-xs transition-all hover:translate-y-[-1px]"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/contact"
              className="bg-stone-900 text-white text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1.5"
            >
              <span>Start</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-stone-700 hover:text-stone-900 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#FAF9F6] px-4 pt-3 pb-6 space-y-2 animate-in fade-in duration-150">
          <div className="space-y-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
                    isActive
                      ? 'bg-stone-200 text-stone-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-200/80 space-y-2">
            {onOpenResume && (
              <button
                onClick={() => {
                  onOpenResume();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 text-sm font-medium cursor-pointer"
              >
                <FileText className="w-4 h-4 text-stone-500" />
                <span>Founder Background & Credentials</span>
              </button>
            )}

            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20Shanthapriya,%20I'm%20interested%20in%20a%20website%20for%20my%20business.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp ({SITE_CONFIG.phoneDisplay})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
