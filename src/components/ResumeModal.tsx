import React, { useEffect } from 'react';
import { X, Download, Printer, CheckCircle2, Briefcase, Award, Code2, Sparkles, Mail, Phone, MapPin } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
    >
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden my-6 z-10">
        {/* Modal Header Controls */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-stone-100/95 backdrop-blur-xs border-b border-stone-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Curriculum Vitae
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-xs font-semibold text-stone-700">Shanthapriya Silva</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-md hover:bg-stone-50 cursor-pointer shadow-xs"
              title="Print CV or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200 rounded-md cursor-pointer transition-colors"
              aria-label="Close CV modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="p-6 sm:p-10 space-y-8 print:p-0 text-stone-800 font-sans">
          {/* Header */}
          <div className="border-b border-stone-200 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
                  Shanthapriya Silva
                </h1>
                <p className="text-base font-semibold text-stone-600 mt-1">
                  Founder & AI-Assisted Web Developer — Ravana Tech
                </p>
              </div>
              <div className="text-xs sm:text-right text-stone-500 space-y-1">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3 h-3 text-stone-400" />
                  <span>+94 78 847 0610</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3 h-3 text-stone-400" />
                  <span>info.ravanatech@gmail.com</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  <span>Sri Lanka</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm text-stone-600 leading-relaxed max-w-2xl">
              Backed by 20 years of diverse professional experience, bringing an analytical,
              solution-driven approach to web development. Specializing in planning, building, and
              launching clean, mobile-friendly websites for Sri Lankan small businesses using a
              modern AI-assisted workflow.
            </p>
          </div>

          {/* Core Strengths */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-2">
              <Award className="w-4 h-4 text-stone-700" />
              <span>Core Strengths & Business Acumen</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                'Business Requirement Analysis',
                'Analytical Problem Solving',
                'Customer Communication',
                'Operations & Practical Thinking',
                'AI-Assisted Accelerated Workflow',
                'Web & Cloud Deployment',
              ].map((strength, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-stone-900 shrink-0 mt-0.5" />
                  <span>{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience Advantage */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-stone-700" />
              <span>Professional Experience</span>
            </h2>

            <div className="space-y-4">
              <div className="border-l-2 border-stone-800 pl-4 py-0.5">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-bold text-stone-900">Founder & Web Developer</h3>
                  <span className="text-xs text-stone-500 font-medium">2026 – Present</span>
                </div>
                <p className="text-xs text-stone-600 font-medium">Ravana Tech • Sri Lanka</p>
                <ul className="mt-2 space-y-1 text-xs text-stone-600 list-disc list-inside">
                  <li>Founded Ravana Tech to help Sri Lankan small businesses establish an affordable, clean digital presence.</li>
                  <li>Engineered 6 end-to-end conceptual website prototypes solving specific small-business operational problems (menu ordering, appointment booking, property listings, floral showcases).</li>
                  <li>Utilizes modern generative AI tooling (Google AI Studio, Gemini, ChatGPT) for rapid wireframing, content planning, and accelerated coding.</li>
                </ul>
              </div>

              <div className="border-l-2 border-stone-300 pl-4 py-0.5">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-bold text-stone-900">20 Years of Diverse Professional Experience</h3>
                  <span className="text-xs text-stone-500 font-medium">Past 20 Years</span>
                </div>
                <p className="text-xs text-stone-600 font-medium">Various Professional Roles • Sri Lanka</p>
                <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                  Extensive cross-functional background across business operations, customer handling,
                  stakeholder communication, and practical problem resolution. This deep real-world
                  experience provides the critical ability to understand client business needs first
                  before writing code.
                </p>
              </div>
            </div>
          </div>

          {/* Technical & AI Stack */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-stone-700" />
              <span>Technical & Tooling Capabilities</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <h4 className="font-bold text-stone-900 mb-1.5">Web Technologies</h4>
                <p className="text-stone-600 leading-relaxed">
                  HTML5, CSS3, Modern JavaScript, Responsive UI, Mobile-First Design, Web Components
                </p>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <h4 className="font-bold text-stone-900 mb-1.5">AI-Assisted Workflow</h4>
                <p className="text-stone-600 leading-relaxed">
                  Google AI Studio, Gemini, ChatGPT, Meta AI for rapid architecture, planning & code acceleration
                </p>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <h4 className="font-bold text-stone-900 mb-1.5">Cloud & Deployment</h4>
                <p className="text-stone-600 leading-relaxed">
                  Firebase Hosting, Google Cloud tools, Git version control, SEO & structured metadata
                </p>
              </div>
            </div>
          </div>

          {/* Demonstration Projects */}
          <div className="space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-stone-700" />
              <span>Selected Demonstration Work (Ravana Tech)</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
              <div className="border border-stone-200 p-2.5 rounded-lg">
                <span className="font-bold text-stone-900">Crumb & Crust Bakery</span>
                <span className="text-stone-500 ml-1.5">• Concept Website</span>
                <p className="text-stone-600 mt-0.5">Categorized digital menu with instant WhatsApp item ordering.</p>
              </div>
              <div className="border border-stone-200 p-2.5 rounded-lg">
                <span className="font-bold text-stone-900">The Grooming Lounge Salon</span>
                <span className="text-stone-500 ml-1.5">• Concept Website</span>
                <p className="text-stone-600 mt-0.5">Online appointment booking request flow with transparent rates.</p>
              </div>
              <div className="border border-stone-200 p-2.5 rounded-lg">
                <span className="font-bold text-stone-900">Prime Habitat Properties</span>
                <span className="text-stone-500 ml-1.5">• Concept Website</span>
                <p className="text-stone-600 mt-0.5">High-impact real estate listing showcase with agent viewing schedule.</p>
              </div>
              <div className="border border-stone-200 p-2.5 rounded-lg">
                <span className="font-bold text-stone-900">Petals & Stems Flora</span>
                <span className="text-stone-500 ml-1.5">• Concept Website</span>
                <p className="text-stone-600 mt-0.5">Floral bouquet showcase with same-day delivery order inquiries.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between print:hidden">
          <p className="text-xs text-stone-500">
            Available for selected small-business website projects in Sri Lanka.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium bg-stone-900 text-white rounded-md hover:bg-stone-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
