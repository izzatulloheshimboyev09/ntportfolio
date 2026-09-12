import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Terminal, 
  ShieldCheck, 
  Lock, 
  Menu, 
  X, 
  ExternalLink, 
  Sparkles,
  UserCheck
} from 'lucide-react';

export const Navbar = () => {
  const { 
    profile, 
    isAdminLoggedIn, 
    setIsAdminModalOpen, 
    setIsAdminDashboardOpen,
    isAdminDashboardOpen,
    logout 
  } = usePortfolio();
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Asosiy', href: '#hero' },
    { name: 'Haqimda', href: '#about' },
    { name: 'Ko\'nikmalar', href: '#skills' },
    { name: 'Loyihalar', href: '#projects' },
    { name: 'Bog\'lanish', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/40' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-slate-900 to-violet-500/20 border border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400 transition-all duration-300 shadow-neon-cyan/20">
              <Terminal className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-lg tracking-wider text-white group-hover:text-cyan-400 transition-colors">
                &lt;{profile.name.split(' ')[0]} /&gt;
              </span>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {profile.level} Dev
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-1.5 text-sm text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAdminDashboardOpen(!isAdminDashboardOpen)}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>{isAdminDashboardOpen ? "Portfolioga qaytish" : "Admin Panel"}</span>
                </button>
                <button
                  onClick={logout}
                  title="Chiqish"
                  className="p-1.5 rounded-lg text-xs font-mono text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-colors"
                >
                  Chiqish
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 transition-all group"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                <span>Admin</span>
              </button>
            )}

            <a
              href="#contact"
              className="relative group overflow-hidden px-4 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:brightness-110 transition-all shadow-neon-cyan/30"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Bog'lanish
              </span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300"
            >
              <Lock className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-slate-900/95 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              {isAdminLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      setIsAdminDashboardOpen(!isAdminDashboardOpen);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 px-3 rounded-lg text-xs font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    {isAdminDashboardOpen ? "Portfolioga qaytish" : "Admin Panelga o'tish"}
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 px-3 rounded-lg text-xs font-mono text-rose-400 bg-rose-500/10 border border-rose-500/20 text-center"
                  >
                    Tizimdan chiqish
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsAdminModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-3 rounded-lg text-xs font-mono text-slate-300 bg-slate-800/80 border border-white/10 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-cyan-400" />
                  Admin sifatida kirish
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
