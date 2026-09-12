import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Terminal, Lock, Heart, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const { profile, isAdminLoggedIn, setIsAdminModalOpen, setIsAdminDashboardOpen } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#02050e] py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono font-bold text-white tracking-wider">
                {profile.name}
              </span>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                © {new Date().getFullYear()} Barcha huquqlar himoyalangan.
              </p>
            </div>
          </div>

          {/* Quick Note */}
          <div className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>using React, Tailwind CSS & Vite</span>
          </div>

          {/* Right Action links */}
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
              title="Yuqoriga chiqish"
            >
              <ArrowUp className="w-4 h-4" />
            </button>

            {isAdminLoggedIn ? (
              <button
                onClick={() => setIsAdminDashboardOpen(true)}
                className="text-xs font-mono text-cyan-400 hover:underline"
              >
                Admin Panel &rarr;
              </button>
            ) : (
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Login</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </footer>
  );
};
