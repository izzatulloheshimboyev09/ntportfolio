import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ExternalLink, 
  Layers, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye,
  Filter,
  Code
} from 'lucide-react';
import { Github } from './Icons';

export const Projects = ({ onOpenProjectModal }) => {
  const { projects, isAdminLoggedIn, deleteProject } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories
  const categories = ['All', ...new Set(projects.map(p => p.category || 'Web'))];

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.technologies && project.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const handleDelete = (id, title) => {
    if (window.confirm(`Haqiqatan ham "${title}" loyihasini o'chirmoqchimisiz?`)) {
      deleteProject(id);
    }
  };

  return (
    <section id="projects" className="py-24 relative cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Portfolio Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Bajarilgan Loyihalar Galereyasi
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Fikr va g'oyalardan boshlab to'liq ishga tushirilgan, zamonaviy stack va responsiv dizaynga ega loyihalar.
            </p>
          </div>

          {/* Admin quick add button */}
          {isAdminLoggedIn && (
            <button
              onClick={() => onOpenProjectModal(null)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs shadow-neon-cyan/30 shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Loyiha Qo'shish</span>
            </button>
          )}
        </div>

        {/* Filter and Search Controls */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <Filter className="w-4 h-4 text-slate-500 hidden sm:block mr-1 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-neon-cyan/20'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Qidirish (React, Tailwind...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-white/10 rounded-xl text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

        </div>

        {/* Projects Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 text-center border border-dashed border-white/10">
            <Code className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 font-mono text-sm">
              Mos keluvchi loyihalar topilmadi. Qidiruv so'zini o'zgartirib ko'ring.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="glass-panel rounded-2xl overflow-hidden border border-white/10 glass-panel-hover flex flex-col group"
              >
                {/* Image & Badges */}
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-950/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30">
                      {project.category || 'Web App'}
                    </span>
                  </div>

                  {/* Admin Direct Action Buttons on Card */}
                  {isAdminLoggedIn && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={() => onOpenProjectModal(project)}
                        className="p-1.5 rounded-lg bg-slate-900/90 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/40 transition-colors shadow-lg"
                        title="Tahrirlash"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id, project.title)}
                        className="p-1.5 rounded-lg bg-slate-900/90 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/40 transition-colors shadow-lg"
                        title="O'chirish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies && project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-800/80 text-slate-300 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action links */}
                    <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-mono text-xs transition-all group/link"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 hover:border-white/20 font-mono text-xs transition-all"
                          title="Source Code"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
