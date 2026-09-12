import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, Image, Link, Layers, Check, Sparkles } from 'lucide-react';
import { Github } from '../Icons';

export const ProjectModal = ({ projectToEdit, isOpen, onClose }) => {
  const { addProject, updateProject } = usePortfolio();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Web App',
    description: '',
    image: '',
    technologies: 'React, Tailwind CSS',
    liveUrl: '',
    githubUrl: '',
  });

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        title: projectToEdit.title || '',
        category: projectToEdit.category || 'Web App',
        description: projectToEdit.description || '',
        image: projectToEdit.image || '',
        technologies: Array.isArray(projectToEdit.technologies) 
          ? projectToEdit.technologies.join(', ') 
          : (projectToEdit.technologies || ''),
        liveUrl: projectToEdit.liveUrl || '',
        githubUrl: projectToEdit.githubUrl || '',
      });
    } else {
      setFormData({
        title: '',
        category: 'Web App',
        description: '',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
        technologies: 'React, Tailwind CSS, Vite',
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
      });
    }
  }, [projectToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    // Convert comma-separated tech into array
    const techArray = formData.technologies
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const projectPayload = {
      title: formData.title.trim(),
      category: formData.category,
      description: formData.description.trim(),
      image: formData.image.trim() || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      technologies: techArray.length > 0 ? techArray : ['React', 'Tailwind'],
      liveUrl: formData.liveUrl.trim(),
      githubUrl: formData.githubUrl.trim(),
    };

    if (projectToEdit && projectToEdit.id) {
      updateProject(projectToEdit.id, projectPayload);
    } else {
      addProject(projectPayload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-950 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {projectToEdit ? "Loyihani Tahrirlash" : "Yangi Loyiha Qo'shish"}
              </h3>
              <p className="text-xs font-mono text-slate-400">
                O'zgarishlar darhol bosh sahifada aks etadi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Loyiha Nomi <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Masalan: AI Chat Platform"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Kategoriya
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none bg-slate-900 text-slate-200"
              >
                <option value="Web App">Web App</option>
                <option value="Fintech">Fintech</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="AI Tools">AI Tools</option>
                <option value="Productivity">Productivity</option>
                <option value="Media">Media</option>
                <option value="Mobile/Hybrid">Mobile/Hybrid</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Rasm URL Havolasi (Image URL)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none"
              />
            </div>
            {formData.image && (
              <div className="mt-2 h-28 w-full rounded-xl overflow-hidden border border-white/10 bg-slate-900 relative">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span className="absolute bottom-1 right-2 text-[10px] font-mono bg-black/60 px-1.5 rounded text-slate-300">
                  Rasm ko'rinishi
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Tavsif (Description) <span className="text-cyan-400">*</span>
            </label>
            <textarea
              name="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Loyiha haqida qisqacha ma'lumot va asosiy funksiyalari..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Ishlatilgan Texnologiyalar (vergul bilan ajrating)
            </label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="React, Tailwind CSS, Redux, Vite"
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Live Demo Havolasi
              </label>
              <div className="relative">
                <Link className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  placeholder="https://my-app.vercel.app"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                GitHub Repo Havolasi
              </label>
              <div className="relative">
                <Github className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/username/project"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-white/10 font-mono text-xs transition-colors"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:brightness-110 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 shadow-neon-cyan/40 shadow-lg transition-all"
            >
              <Check className="w-4 h-4" />
              <span>{projectToEdit ? "O'zgarishlarni Saqlash" : "Loyihani Qo'shish"}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
