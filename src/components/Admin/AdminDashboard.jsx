import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  User, 
  Layers, 
  Cpu, 
  Mail, 
  Settings, 
  LogOut, 
  Eye, 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft,
  ExternalLink,
  Sparkles,
  Award
} from 'lucide-react';

export const AdminDashboard = ({ onOpenProjectModal }) => {
  const { 
    profile, 
    updateProfile, 
    skills, 
    addSkill, 
    updateSkill, 
    deleteSkill, 
    projects, 
    deleteProject, 
    messages, 
    markMessageAsRead, 
    deleteMessage, 
    resetToDefaults, 
    logout,
    setIsAdminDashboardOpen 
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('profile');
  const [profileForm, setProfileForm] = useState({ ...profile });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New skill form state
  const [newSkill, setNewSkill] = useState({ name: '', level: 90, category: 'Frontend' });
  const [skillSuccess, setSkillSuccess] = useState(false);

  // Profile change handler
  const handleProfileChange = (e) => {
    setProfileForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;

    addSkill({
      name: newSkill.name.trim(),
      level: Number(newSkill.level),
      category: newSkill.category
    });
    setNewSkill({ name: '', level: 90, category: 'Frontend' });
    setSkillSuccess(true);
    setTimeout(() => setSkillSuccess(false), 3000);
  };

  const handleResetData = () => {
    if (window.confirm("Rostdan ham barcha ma'lumotlarni dastlabki holatiga qaytarmoqchimisiz?")) {
      resetToDefaults();
      setProfileForm({ ...profile });
      alert("Ma'lumotlar tiklandi!");
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans pb-24">
      
      {/* Top Navigation Bar */}
      <div className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminDashboardOpen(false)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-cyan-400 hover:border-cyan-500/40 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Portfolioga Qaytish</span>
            </button>
            <div className="h-5 w-[1px] bg-white/10 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="font-mono font-bold text-white text-sm hidden sm:inline">
                Admin Boshqaruv Markazi
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full hidden md:inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Real-time Sync Active
            </span>

            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono hover:bg-rose-500/20 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Chiqish</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs transition-all ${
              activeTab === 'profile'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-neon-cyan/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profil & Daraja</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs transition-all ${
              activeTab === 'projects'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-neon-cyan/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Loyihalar ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs transition-all ${
              activeTab === 'skills'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-neon-cyan/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Ko'nikmalar ({skills.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs transition-all ${
              activeTab === 'messages'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-neon-cyan/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Xabarlar ({messages.length})</span>
            {messages.filter(m => !m.read).length > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs transition-all ${
              activeTab === 'system'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-neon-cyan/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Tizim & Tiklash</span>
          </button>
        </div>

        {/* TAB 1: PROFILE & DEVELOPER LEVEL */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 mb-6 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-cyan-400" />
                    Profil Ma'lumotlari & Darajani Boshqarish
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    Bu yerdan kiritilgan har bir o'zgarish portfolioda darhol aks etadi
                  </p>
                </div>

                {saveSuccess && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Muvaffaqiyatli saqlandi!</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleProfileSave} className="space-y-6">
                
                {/* Developer Level Selector */}
                <div className="p-5 rounded-xl bg-slate-900/80 border border-cyan-500/30">
                  <label className="block text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-cyan-400" />
                    Dasturchilik Darajasi (Developer Rank / Level)
                  </label>
                  <p className="text-xs text-slate-400 mb-4">
                    Darajani tanlang — Hero va About bo'limlaridagi badge'lar bir zumda yangilanadi:
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Junior', 'Middle', 'Senior', 'Lead'].map((lvl) => (
                      <button
                        type="button"
                        key={lvl}
                        onClick={() => setProfileForm(prev => ({ ...prev, level: lvl }))}
                        className={`p-3 rounded-xl border text-center font-mono font-bold text-sm transition-all ${
                          profileForm.level === lvl
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-neon-cyan/40 scale-[1.02]'
                            : 'bg-slate-950/60 text-slate-400 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {lvl} Developer
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name and Main Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      To'liq Ism (Full Name)
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Asosiy Kasb Unvoni (Title)
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={profileForm.title}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none"
                    />
                  </div>
                </div>

                {/* Bio text */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Haqida Qismidagi Matn (Bio / Description)
                  </label>
                  <textarea
                    name="bio"
                    rows={4}
                    value={profileForm.bio}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none resize-none leading-relaxed"
                  ></textarea>
                </div>

                {/* Stats counters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Tajriba Yillari (masalan: 3+)
                    </label>
                    <input
                      type="text"
                      name="experienceYears"
                      value={profileForm.experienceYears}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Bajarilgan Loyihalar Soni
                    </label>
                    <input
                      type="text"
                      name="completedProjects"
                      value={profileForm.completedProjects}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Mamnun Hamkorlar Soni
                    </label>
                    <input
                      type="text"
                      name="satisfiedClients"
                      value={profileForm.satisfiedClients}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none"
                    />
                  </div>
                </div>

                {/* Contact and Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Telegram Havolasi
                    </label>
                    <input
                      type="text"
                      name="telegram"
                      value={profileForm.telegram}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      GitHub Havolasi
                    </label>
                    <input
                      type="text"
                      name="github"
                      value={profileForm.github}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Faol Holat (Status badge)
                    </label>
                    <input
                      type="text"
                      name="status"
                      value={profileForm.status}
                      onChange={handleProfileChange}
                      placeholder="Loyihalar uchun ochiq"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:brightness-110 text-slate-950 font-mono font-bold text-sm shadow-neon-cyan/40 shadow-lg transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Profilni Saqlash</span>
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Loyihalarni Boshqarish</h3>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Yangi loyiha qo'shing, mavjudlarini tahrirlang yoki o'chiring
                </p>
              </div>

              <button
                onClick={() => onOpenProjectModal(null)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs shadow-neon-cyan/30 shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Yangi Loyiha Qo'shish</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  className="glass-panel rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-video bg-slate-900">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80";
                        }}
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 text-cyan-400">
                        {project.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <h4 className="font-bold text-white text-base mb-1 line-clamp-1">{project.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mb-3">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies?.map((tech, i) => (
                          <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-white/5">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-white/10"
                          title="Saytni ochish"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenProjectModal(project)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 text-xs font-mono"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Tahrirlash</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`"${project.title}" o'chirilsinmi?`)) {
                            deleteProject(project.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20"
                        title="O'chirish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SKILLS MANAGEMENT */}
        {activeTab === 'skills' && (
          <div className="space-y-8">
            {/* Add New Skill Form */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                Yangi Texnik Ko'nikma Qo'shish
              </h3>

              {skillSuccess && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Ko'nikma muvaffaqiyatli qo'shildi!</span>
                </div>
              )}

              <form onSubmit={handleAddSkill} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Texnologiya Nomi
                  </label>
                  <input
                    type="text"
                    required
                    value={newSkill.name}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Masalan: Next.js, Redux, GraphQL"
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Toifasi (Category)
                  </label>
                  <input
                    type="text"
                    value={newSkill.category}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Frontend, Styling, Tools"
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-mono text-slate-300">
                      Bilish Darajasi (%)
                    </label>
                    <span className="text-xs font-mono text-cyan-400 font-bold">
                      {newSkill.level}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={newSkill.level}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, level: e.target.value }))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs shadow-neon-cyan/30 shadow-lg transition-all flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Qo'shish</span>
                </button>
              </form>
            </div>

            {/* Existing Skills List */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-6">Mavjud Ko'nikmalar ({skills.length})</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <div 
                    key={skill.id}
                    className="p-4 rounded-xl bg-slate-900/70 border border-white/10 flex items-center justify-between gap-3 group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-sm text-slate-200">{skill.name}</span>
                        <span className="font-mono text-xs text-cyan-400 font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyan-400 rounded-full" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                        {skill.category || 'Frontend'}
                      </span>
                    </div>

                    <button
                      onClick={() => deleteSkill(skill.id)}
                      className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MESSAGES INBOX */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Foydalanuvchilardan Kelgan Xabarlar</h3>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Saytning Aloqa (Contact) bo'limidan yuborilgan xabarlar
              </p>
            </div>

            {messages.length === 0 ? (
              <div className="glass-panel p-12 text-center rounded-2xl border border-dashed border-white/10">
                <Mail className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 font-mono text-sm">Hozircha hech qanday xabar kelmagan.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`glass-panel p-6 rounded-2xl border transition-all ${
                      msg.read ? 'border-white/5 opacity-80' : 'border-cyan-500/30 bg-slate-900/80 shadow-neon-cyan/10'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${msg.read ? 'bg-slate-600' : 'bg-cyan-400 animate-pulse'}`} />
                        <h4 className="font-bold text-white text-base">{msg.name}</h4>
                        <span className="text-xs font-mono text-slate-400">&lt;{msg.email}&gt;</span>
                      </div>
                      <span className="text-xs font-mono text-slate-500">{msg.date}</span>
                    </div>

                    {msg.subject && (
                      <div className="text-sm font-semibold text-cyan-300 font-mono mb-2">
                        Mavzu: {msg.subject}
                      </div>
                    )}

                    <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-white/5 mb-4">
                      {msg.message}
                    </p>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      {!msg.read && (
                        <button
                          onClick={() => markMessageAsRead(msg.id)}
                          className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 text-xs font-mono border border-cyan-500/20"
                        >
                          O'qilgan deb belgilash
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (window.confirm("Ushbu xabarni o'chirmoqchimisiz?")) {
                            deleteMessage(msg.id);
                          }
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-mono border border-rose-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>O'chirish</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: SYSTEM & BACKUP */}
        {activeTab === 'system' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 max-w-2xl">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-amber-400" />
              Tizimni Boshlang'ich Holatga Qaytarish
            </h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Agar sinov maqsadida qo'shilgan yoki o'zgartirilgan barcha ma'lumotlarni o'chirib, dastlabki mukammal holatdagi profil, loyihalar va ko'nikmalarni tiklamoqchi bo'lsangiz, quyidagi tugmani bosing.
            </p>

            <button
              onClick={handleResetData}
              className="px-5 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono font-bold text-xs flex items-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Dastlabki Ma'lumotlarni Tiklash (Reset)</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
