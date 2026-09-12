import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Briefcase, 
  CheckCircle, 
  Users, 
  Award, 
  Layers, 
  Code2, 
  Sparkles,
  Zap,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const AboutStats = () => {
  const { profile, skills, projects } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Calculate dynamic stats
  const totalProjectsCount = projects.length || parseInt(profile.completedProjects) || 25;
  
  const stats = [
    {
      id: 'exp',
      title: 'Dasturlash Tajribasi',
      value: profile.experienceYears || '3+',
      label: 'Yillik tajriba',
      icon: Briefcase,
      color: 'from-cyan-500 to-blue-500',
      border: 'border-cyan-500/20'
    },
    {
      id: 'projects',
      title: 'Muvaffaqiyatli Loyihalar',
      value: `${totalProjectsCount}+`,
      label: 'To\'liq yakunlangan',
      icon: CheckCircle,
      color: 'from-emerald-500 to-teal-500',
      border: 'border-emerald-500/20'
    },
    {
      id: 'clients',
      title: 'Mamnun Hamkorlar',
      value: profile.satisfiedClients || '20+',
      label: 'Xalqaro & Mahalliy',
      icon: Users,
      color: 'from-violet-500 to-purple-500',
      border: 'border-violet-500/20'
    },
    {
      id: 'level',
      title: 'Hozirgi Bosqich',
      value: profile.level || 'Senior',
      label: 'Dasturchilik darajasi',
      icon: Award,
      color: 'from-amber-500 to-orange-500',
      border: 'border-amber-500/20'
    }
  ];

  // Unique categories for skills filter
  const categories = ['All', ...new Set(skills.map(s => s.category || 'General'))];
  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === selectedCategory);

  // Experience level timeline representation
  const levels = ['Junior', 'Middle', 'Senior', 'Lead'];
  const currentLevelIndex = levels.indexOf(profile.level) !== -1 ? levels.indexOf(profile.level) : 2;

  return (
    <section id="about" className="py-24 relative bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Tajriba & Ko'nikmalar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tajriba va Texnik Imkoniyatlar
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Zamonaviy veb ekotizimida yuqori sifat, tezkor ishlash va barqaror arxitekturani ta'minlovchi vositalar bilan qurollanganman.
          </p>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((item) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={item.id}
                className={`glass-panel p-6 rounded-2xl glass-panel-hover border ${item.border} relative overflow-hidden group`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-20 text-white shadow-lg`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-500 tracking-wider">STAT</span>
                </div>
                <div className="text-3xl font-black font-mono text-white mb-1 tracking-tight">
                  {item.value}
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  {item.title}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Developer Level Visual Stepper */}
        <div className="mb-20 glass-panel p-8 rounded-2xl border border-white/10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                Karyera O'sishi
              </span>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Dasturchilik Darajasi Yo'nalishi
                <span className="text-xs font-mono py-0.5 px-2.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Faol: {profile.level}
                </span>
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Admin panel orqali dinamik o'zgartiriladi
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {levels.map((lvl, idx) => {
              const isPassed = idx <= currentLevelIndex;
              const isCurrent = idx === currentLevelIndex;

              return (
                <div 
                  key={lvl}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    isCurrent 
                      ? 'bg-cyan-950/40 border-cyan-400 shadow-neon-cyan/20 scale-[1.02]' 
                      : isPassed
                      ? 'bg-slate-900/60 border-emerald-500/30 text-slate-300'
                      : 'bg-slate-900/20 border-white/5 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-slate-400">0{idx + 1}.</span>
                    {isPassed ? (
                      <CheckCircle className={`w-4 h-4 ${isCurrent ? 'text-cyan-400' : 'text-emerald-400'}`} />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                    )}
                  </div>
                  <div className={`font-mono font-bold text-lg ${isCurrent ? 'text-cyan-300' : 'text-slate-200'}`}>
                    {lvl}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {idx === 0 && 'HTML/CSS, JS, Asosiy React'}
                    {idx === 1 && 'Murakkab State, REST, SPA'}
                    {idx === 2 && 'Arxitektura, Optimizatsiya, CI/CD'}
                    {idx === 3 && 'Jamoa boshqaruvi & Tech Lead'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical Skills Section */}
        <div id="skills">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>Tech Stack & Tools</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Texnik Ko'nikmalar
              </h3>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-neon-cyan/30'
                      : 'bg-slate-900/70 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="glass-panel p-5 rounded-2xl glass-panel-hover border border-white/10 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-mono font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {skill.category || 'Frontend'}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-cyan-400">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-400 rounded-full transition-all duration-700 group-hover:shadow-neon-cyan/50"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
