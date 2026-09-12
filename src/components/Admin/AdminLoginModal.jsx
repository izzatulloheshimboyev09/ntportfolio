import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Lock, User, Key, X, ShieldAlert, Sparkles, CheckCircle } from 'lucide-react';

export const AdminLoginModal = () => {
  const { isAdminModalOpen, setIsAdminModalOpen, login } = usePortfolio();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAdminModalOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = login(username, password);
      setLoading(false);
      if (!res.success) {
        setError(res.message);
      } else {
        setUsername('');
        setPassword('');
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-slate-950 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={() => setIsAdminModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-white/5 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Admin Tizimiga Kirish</h3>
            <p className="text-xs font-mono text-slate-400 mt-0.5">Xavfsiz boshqaruv hududi</p>
          </div>
        </div>

        {/* Demo Credentials Box */}
        <div className="mb-5 p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/20 text-xs font-mono text-slate-300 flex items-center justify-between">
          <div>
            <div className="text-cyan-400 font-bold mb-0.5">Standart hisob ma'lumotlari:</div>
            <div>Login: <span className="text-white">admin</span> | Parol: <span className="text-white">admin123</span></div>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            <span>To'ldirish</span>
          </button>
        </div>

        {/* Error alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Login (Foydalanuvchi nomi)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Maxfiy Parol
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:brightness-110 text-slate-950 font-mono font-bold text-sm flex items-center justify-center gap-2 shadow-neon-cyan/40 shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <span>Tekshirilmoqda...</span>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Panelga Kirish</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
