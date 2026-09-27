import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { CONCEPT_PROJECTS } from '../data/projectsData';
import { ConceptProject } from '../types';
import {
  Sparkles,
  Eye,
  AlertTriangle
} from 'lucide-react';

interface ProjectsPageProps {
  onSelectProject?: (project: ConceptProject) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', label: 'All 6 Concepts' },
    { id: 'food', label: 'Bakery & Cafe' },
    { id: 'beauty', label: 'Salon & Spa' },
    { id: 'retail', label: 'Flora & Gifts' },
    { id: 'realestate', label: 'Real Estate' },
    { id: 'fitness', label: 'Fitness & Health' },
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? CONCEPT_PROJECTS
      : CONCEPT_PROJECTS.filter((p) => p.category === selectedCategory);

  const handleCustomize = (slug: string) => {
    navigate(`/contact?concept=${slug}`);
  };

  return (
    <div className="space-y-10 sm:space-y-14 pb-20">
      <SEO
        title="Small Business Website Concepts & Live Demos"
        description="Explore interactive demonstration concepts for Sri Lankan bakeries, cafes, salons, florists, trainers, and real estate agencies with instant WhatsApp booking."
        canonicalPath="/projects"
      />

      {/* Header */}
      <section className="pt-8 sm:pt-12 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold border border-stone-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Interactive Demonstrations</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
          Concept Websites & Turnkey Gallery
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
          Test live, functioning website concepts built for Sri Lankan businesses.
          Like a layout? We can customize it with your branding, photos, prices, and WhatsApp ordering in 3 to 5 days.
        </p>
      </section>

      {/* Concept Disclosure Box (Required by Rule 12) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[11px] sm:text-xs">
            <strong>Clear Concept Disclosure:</strong> These are conceptual demonstration projects created to explore practical website solutions for small businesses in Sri Lanka.
            They are not paid client projects, and no fake client results, testimonials, or sales figures are claimed.
          </p>
        </div>
      </section>

      {/* Category Filter Tabs - Minimal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Compact 6x1 Grid of Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:border-stone-400 hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <Link to={`/projects/${p.slug}`} className="block relative aspect-4/3 overflow-hidden bg-stone-100">
                  <img
                    src={p.mainImage}
                    alt={`${p.title} - Website concept by Ravana Tech`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-1.5 left-1.5">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-stone-900/90 text-amber-300 backdrop-blur-xs">
                      Demo
                    </span>
                  </div>
                </Link>

                <div className="p-3 space-y-1">
                  <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block truncate">
                    {p.categoryLabel}
                  </span>
                  <h3 className="font-bold text-xs sm:text-sm text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    <Link to={`/projects/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p className="text-[11px] text-stone-500 leading-snug line-clamp-2">
                    {p.solution}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-3 pt-0 space-y-1.5">
                <Link
                  to={p.demoUrl}
                  className="w-full py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1 shadow-xs"
                >
                  <Eye className="w-3 h-3" />
                  <span>Live Demo</span>
                </Link>

                <div className="grid grid-cols-2 gap-1.5">
                  <Link
                    to={`/projects/${p.slug}`}
                    className="py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md text-[10px] font-medium text-center transition-colors block truncate"
                  >
                    Case
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleCustomize(p.slug)}
                    className="py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-md text-[10px] font-medium text-center transition-colors cursor-pointer truncate"
                  >
                    Adapt →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How Customization Works - Minimal */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-7 bg-white rounded-2xl border border-stone-200 space-y-5">
          <div className="text-center space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">
              How Concept Customization Works
            </h2>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              If you see a demonstration layout you like, we adapt it into your official website in 3 simple steps:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
              <span className="w-5 h-5 rounded-md bg-stone-900 text-white text-[11px] font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="font-bold text-xs text-stone-900">Choose a Base Concept</h3>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Pick the demo matching your business model (Bakery, Cafe, Salon, Flora, Realtor, or Fitness).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
              <span className="w-5 h-5 rounded-md bg-stone-900 text-white text-[11px] font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-xs text-stone-900">Send Your Details</h3>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Send your shop name, logo, menu items, prices, and photos easily over WhatsApp.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
              <span className="w-5 h-5 rounded-md bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="font-bold text-xs text-stone-900">Launch in 3 to 5 Days</h3>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                We adapt the code, connect WhatsApp orders, set up your domain, and hand over the live site.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
