import React, { useState } from 'react';
import { CONCEPT_PROJECTS } from '../../data/projectsData';
import { ConceptProject } from '../../types';
import { FolderKanban, Eye, ExternalLink, Sparkles, Plus, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminProjectsPage: React.FC = () => {
  const [projects] = useState<ConceptProject[]>(CONCEPT_PROJECTS);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-emerald-500" />
            <span>Concept Projects CMS</span>
          </h1>
          <p className="text-xs text-stone-400">
            Current turn-key concept website demonstrations featured across Ravana Tech.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="aspect-16/10 bg-stone-950 relative overflow-hidden">
                <img src={p.mainImage} alt={p.title} className="w-full h-full object-cover opacity-80" />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-stone-900/90 text-amber-400 border border-amber-500/30">
                  Concept Demo
                </span>
              </div>
              <div className="p-4 space-y-2">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  {p.categoryLabel}
                </span>
                <h3 className="font-bold text-base text-white">{p.title}</h3>
                <p className="text-xs text-stone-400 line-clamp-2">{p.solution}</p>
              </div>
            </div>

            <div className="p-4 pt-0 flex items-center gap-2 text-xs">
              <Link
                to={`/projects/${p.slug}`}
                className="flex-1 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-center font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Details</span>
              </Link>
              <Link
                to={p.demoUrl}
                className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors flex items-center justify-center gap-1"
                title="Launch Live Demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
