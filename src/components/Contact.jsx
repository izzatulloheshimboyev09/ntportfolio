import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Mail, 
  Send, 
  MapPin, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Github, Linkedin } from './Icons';

export const Contact = () => {
  const { profile, sendMessage } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      sendMessage(formData);
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Aloqa & Hamkorlik</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Birgalikda Yangi Loyihani Boshlaymizmi?
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            G'oyalaringiz yoki hamkorlik takliflaringiz bo'lsa, quyidagi shakl orqali to'g'ridan-to'g'ri xabar qoldiring.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                To'g'ridan-to'g'ri aloqa
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/20 text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">Elektron Pochta</span>
                    <a href={`mailto:${profile.email}`} className="text-sm font-medium text-slate-200 hover:text-cyan-400 transition-colors">
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/20 text-emerald-400">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">Telegram</span>
                    <a href={profile.telegram} target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-200 hover:text-emerald-400 transition-colors">
                      {profile.telegram.replace('https://t.me/', '@')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-violet-500/20 text-violet-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">Manzil</span>
                    <span className="text-sm font-medium text-slate-200">
                      {profile.location || "Toshkent, O'zbekiston"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status banner */}
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono text-emerald-300">
                  {profile.status} • Odatda 1-2 soat ichida javob beriladi
                </span>
              </div>
            </div>

            {/* Admin Notice Pill */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-400 font-mono flex items-center gap-2">
              <span className="text-cyan-400">&bull;</span>
              Ushbu formadan yuborilgan xabarlar darhol sayt Admin panelida aks etadi.
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-2xl border border-white/10 relative">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Xabaringiz Qabul Qilindi!</h3>
                  <p className="text-slate-400 text-sm max-w-md mx-auto">
                    Katta rahmat! Xabaringiz to'g'ridan-to'g'ri tizimga yuborildi. Tez orada siz bilan bog'lanaman.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 rounded-xl bg-slate-800 text-cyan-400 font-mono text-xs hover:bg-slate-700 transition-colors"
                  >
                    Yana xabar yuborish
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-2">
                        Ismingiz <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Masalan: Sardor"
                        className="w-full px-4 py-3 rounded-xl glass-input text-sm focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-2">
                        Email Manzilingiz <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="sardor@example.com"
                        className="w-full px-4 py-3 rounded-xl glass-input text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">
                      Mavzu
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Masalan: React loyiha bo'yicha taklif"
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">
                      Xabaringiz <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Loyihangiz tavsifi yoki xabaringizni yozing..."
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm focus:outline-none resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-mono font-bold text-sm flex items-center justify-center gap-2 shadow-neon-cyan/40 shadow-lg hover:shadow-cyan-500/50 transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Yuborilmoqda...</span>
                    ) : (
                      <>
                        <span>Xabarni Yuborish</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
