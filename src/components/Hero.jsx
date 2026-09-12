import React, { useState, useEffect } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import {
  ArrowRight,
  Download,
  Send,
  Mail,
  Terminal,
  Sparkles,
  Code,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { formatTelegramUrl } from "../utils/formatters";

export const Hero = () => {
  const { profile } = usePortfolio();

  // Dynamic titles rotation / typing effect
  const titles =
    profile.titles && profile.titles.length > 0
      ? profile.titles
      : [
          profile.title || "Front-end Developer",
          "React.js Specialist",
          "Tailwind CSS Artisan",
        ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const fullText = titles[currentTitleIndex] || "Front-end Developer";
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < fullText.length) {
        setDisplayedText(fullText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayedText(fullText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === fullText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentTitleIndex, titles]);

  // Level badge color styling
  const getLevelBadge = (level) => {
    switch (level?.toLowerCase()) {
      case "junior":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "middle":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "senior":
        return "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 border-cyan-500/40 shadow-neon-cyan/20";
      case "lead":
        return "bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 border-amber-500/40";
      default:
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
    }
  };

  const handleDownloadCV = () => {
    // Generates a mock resume download or opens link
    const element = document.createElement("a");
    const file = new Blob(
      [
        `CV - ${profile.name}\n` +
          `Kasb: ${profile.title} (${profile.level})\n` +
          `Bio: ${profile.bio}\n` +
          `Email: ${profile.email}\n` +
          `Tajriba: ${profile.experienceYears} yil\n` +
          `Telegram: ${profile.telegram}\n` +
          `GitHub: ${profile.github}\n`,
      ],
      { type: "text/plain" },
    );
    element.href = URL.createObjectURL(file);
    element.download = `${profile.name.replace(/\s+/g, "_")}_Resume.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden cyber-grid"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-violet-500/15 to-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-600/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bio & Intro */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Status & Level Badge */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{profile.status || "Loyihalar uchun ochiq"}</span>
              </span>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border backdrop-blur-md ${getLevelBadge(profile.level)}`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Daraja: {profile.level || "Senior"}</span>
              </span>
            </div>

            {/* Main Greeting & Name */}
            <div>
              <p className="text-sm md:text-base font-mono text-slate-400 tracking-wider mb-2 flex items-center gap-2">
                <span className="text-cyan-400">&gt;</span> Assalomu alaykum,
                men
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
                  {profile.name}
                </span>
              </h1>
            </div>

            {/* Dynamic Animated Title */}
            <div className="h-12 sm:h-14 flex items-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-cyan-400 flex items-center tracking-tight">
                <span>{displayedText}</span>
                <span className="w-2.5 h-8 bg-cyan-400 ml-1 animate-pulse"></span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              {profile.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <a
                href="#projects"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-semibold text-sm transition-all duration-200 shadow-neon-cyan/40 shadow-lg hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Loyihalarni ko'rish</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleDownloadCV}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-cyan-500/40 font-mono text-sm transition-all duration-200 backdrop-blur-md group"
              >
                <Download className="w-4 h-4 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
                <span>Resume yuklab olish</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="pt-4 flex items-center gap-3">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider mr-1">
                Aloqa:
              </span>

              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-slate-800/80 transition-all"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}

              {profile.telegram && (
                <a
                  href={formatTelegramUrl(profile.telegram)}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-slate-800/80 transition-all"
                  title="Telegram"
                >
                  <Send className="w-4 h-4" />
                </a>
              )}

              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-slate-800/80 transition-all"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}

              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-slate-800/80 transition-all"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Cyberpunk Interactive Code Console */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative background glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-violet-500/30 to-emerald-500/30 blur-xl opacity-60 group-hover:opacity-100 transition duration-1000 animate-pulse-slow"></div>

              {/* Code Card Terminal */}
              <div className="relative rounded-2xl bg-slate-950/90 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
                {/* Window Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>developer.config.ts</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    UTF-8
                  </div>
                </div>

                {/* Code Window Body */}
                <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed text-slate-300 space-y-2 select-none overflow-x-auto">
                  <div>
                    <span className="text-violet-400">const</span>{" "}
                    <span className="text-cyan-300">developer</span>{" "}
                    <span className="text-slate-400">=</span>{" "}
                    <span className="text-yellow-400">&#123;</span>
                  </div>

                  <div className="pl-4">
                    <span className="text-slate-400">fullName:</span>{" "}
                    <span className="text-emerald-300">"{profile.name}"</span>,
                  </div>

                  <div className="pl-4">
                    <span className="text-slate-400">rank:</span>{" "}
                    <span className="text-cyan-400">
                      "{profile.level} Engineer"
                    </span>
                    ,
                  </div>

                  <div className="pl-4">
                    <span className="text-slate-400">coreStack:</span>{" "}
                    <span className="text-yellow-400">[</span>
                    <span className="text-amber-300">"React"</span>,{" "}
                    <span className="text-amber-300">"Tailwind"</span>,{" "}
                    <span className="text-amber-300">"Vite"</span>,{" "}
                    <span className="text-amber-300">"JS"</span>
                    <span className="text-yellow-400">]</span>,
                  </div>

                  <div className="pl-4">
                    <span className="text-slate-400">experience:</span>{" "}
                    <span className="text-cyan-300">
                      {profile.experienceYears
                        ? `"${profile.experienceYears} years"`
                        : '"3+ years"'}
                    </span>
                    ,
                  </div>

                  <div className="pl-4">
                    <span className="text-slate-400">cleanCodeLover:</span>{" "}
                    <span className="text-violet-400">true</span>,
                  </div>

                  <div className="pl-4">
                    <span className="text-slate-400">openToRelocate:</span>{" "}
                    <span className="text-emerald-400">true</span>,
                  </div>

                  <div className="pl-4">
                    <span className="text-slate-400">craftModernUI:</span>{" "}
                    <span className="text-violet-400">()</span>{" "}
                    <span className="text-violet-400">=&gt;</span>{" "}
                    <span className="text-emerald-300">"Ultra Premium ✨"</span>
                  </div>

                  <div>
                    <span className="text-yellow-400">&#125;</span>;
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Ready to Deploy</span>
                    </div>
                    <div className="text-slate-500">Vite v5.x • React 18+</div>
                  </div>
                </div>
              </div>

              {/* Floating tech badge */}
              <div className="absolute -bottom-4 -right-2 bg-slate-900/90 border border-cyan-500/30 rounded-xl px-3 py-2 flex items-center gap-2 shadow-xl backdrop-blur-md">
                <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-xs font-mono text-cyan-200">
                  High-Performance Front-end
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
