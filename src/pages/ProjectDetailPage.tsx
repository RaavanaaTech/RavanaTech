import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CONCEPT_PROJECTS } from '../data/projectsData';
import { SEO } from '../components/seo/SEO';
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  Layers,
  ArrowLeft,
  MessageSquare
} from 'lucide-react';
import { openWhatsApp } from '../lib/whatsapp';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const project = CONCEPT_PROJECTS.find(
    (p) => p.slug === slug || p.id === slug
  );

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-stone-900">Project Concept Not Found</h1>
        <p className="text-stone-600 text-sm">The concept website you are looking for does not exist or has been moved.</p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>
      </div>
    );
  }

  const handleCustomizeClick = () => {
    navigate(`/contact?concept=${project.slug}`);
  };

  const handleWhatsAppClick = () => {
    openWhatsApp(
      {
        conceptTitle: project.title,
        need: `Customize: ${project.title}`,
        message: `Hi Shanthapriya, I would like to customize the "${project.title}" layout for my business.`,
      },
      `project_detail_${project.slug}`
    );
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      <SEO
        title={`${project.title} — Concept Demonstration`}
        description={project.solution}
        canonicalPath={`/projects/${project.slug}`}
        ogImage={`https://ravanatech.com/assets/social/og-demo-${project.slug}.png`}
      />

      {/* Breadcrumb & Navigation Top Strip */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex items-center justify-between gap-3 text-xs text-stone-500">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 font-medium text-stone-700 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Concept Projects</span>
          </Link>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider border border-amber-200">
            <Sparkles className="w-3 h-3 text-amber-700" />
            Concept Demonstration
          </span>
        </div>
      </div>

      {/* Main Concept Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <span className="text-xs font-bold text-stone-500 uppercase tracking-widest block">
          {project.categoryLabel} • Practical Website Solution
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900">
          {project.title}
        </h1>
        <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          {project.tagline}
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            to={project.demoUrl}
            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-xs transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Launch Live Interactive Demo</span>
          </Link>
          <button
            onClick={handleCustomizeClick}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Customize This for My Business</span>
          </button>
        </div>
      </section>

      {/* Concept Disclosure Box (Required by Rule 12) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-4 sm:p-5 rounded-xl bg-amber-50/90 border border-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-amber-900">
            <h4 className="font-bold">Transparent Demonstration Notice</h4>
            <p className="leading-relaxed">
              These are conceptual demonstration projects created to explore practical website solutions for Sri Lankan businesses.
              They are not paid client projects, and no fake client results or statistics are claimed. If you like this structure, we can adapt it for your verified business.
            </p>
          </div>
        </div>
      </section>

      {/* Project Visual Showcase */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="rounded-2xl border border-stone-200 overflow-hidden shadow-sm bg-stone-100 aspect-16/9 relative group">
          <img
            src={project.mainImage}
            alt={`${project.title} - Main Preview`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-6 sm:p-8">
            <div className="text-white space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-300">Target Business Profile</span>
              <p className="font-bold text-base sm:text-lg">{project.targetBusiness}</p>
            </div>
          </div>
        </div>

        {/* Gallery Thumbnails */}
        {project.galleryImages && project.galleryImages.length > 0 && (
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {project.galleryImages.map((img, idx) => (
              <div key={idx} className="aspect-16/10 rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                <img src={img} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Architectural Breakdown */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* The Business Challenge */}
          <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-3">
            <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 text-xs font-bold flex items-center justify-center">!</span>
              <span>The Business Challenge</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          {/* The Technical Approach */}
          <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-3">
            <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">✓</span>
              <span>The Practical Solution</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {project.approach}
            </p>
          </div>
        </div>

        {/* Key Features List */}
        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-stone-200 space-y-4">
          <h3 className="font-bold text-base text-stone-900">Key Functional Features Demonstrated</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Demonstration Outcome Notice */}
        <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Demonstration Outcome</h4>
          <p className="text-xs text-stone-700 leading-relaxed">
            {project.demonstrationOutcome}
          </p>
        </div>

        {/* Final CTA Bar */}
        <div className="p-8 bg-stone-900 text-white rounded-2xl text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold">
            Need something like this for your business?
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto">
            We take this verified mobile-first layout and replace the content with your logo, real photos, pricing, and WhatsApp orders. Delivery in 3 to 5 days.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleCustomizeClick}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
            >
              Start Customization Request
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss on WhatsApp</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
