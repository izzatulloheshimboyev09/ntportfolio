export const INITIAL_DATA = {
  profile: {
    name: "Izzatulloh Eshimboyev",
    title: "Front-end Developer",
    titles: [
      "Front-end Developer",
      "React.js Specialist",
      "Tailwind CSS Artisan",
      "UI/UX Architecture"
    ],
    level: "Senior", // Junior, Middle, Senior, Lead
    status: "Loyihalar uchun ochiq",
    experienceYears: "3+",
    completedProjects: "28+",
    satisfiedClients: "20+",
    location: "Toshkent, O'zbekiston",
    email: "eshimboyevizzatulloh@gmail.com",
    github: "https://github.com",
    telegram: "https://t.me/izzatulloh",
    linkedin: "https://linkedin.com",
    bio: "Zamonaviy, yuqori tezlikda ishlovchi va estetik jihatdan mukammal veb-ilovalarni noldan arxitekturasigacha qurishga ixtisoslashgan Front-end dasturchi. Minimalistik dizayn, shaffof glassmorphism va eng so'nggi texnologiyalar orqali foydalanuvchi tajribasini yangi bosqichga olib chiqaman.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    resumeUrl: "#"
  },
  skills: [
    { id: "1", name: "React.js", level: 95, category: "Frontend", icon: "Code2" },
    { id: "2", name: "Tailwind CSS", level: 96, category: "Styling", icon: "Palette" },
    { id: "3", name: "JavaScript (ES6+)", level: 92, category: "Core", icon: "Cpu" },
    { id: "4", name: "Vite & Tooling", level: 90, category: "Build Tools", icon: "Zap" },
    { id: "5", name: "TypeScript", level: 85, category: "Core", icon: "FileCode" },
    { id: "6", name: "Next.js", level: 88, category: "Framework", icon: "Layers" },
    { id: "7", name: "Redux Toolkit / Zustand", level: 89, category: "State", icon: "Database" },
    { id: "8", name: "Git & GitHub", level: 92, category: "Version Control", icon: "GitBranch" },
    { id: "9", name: "REST API & GraphQL", level: 90, category: "Backend/API", icon: "Globe" },
    { id: "10", name: "Responsive & Glassmorphism UI", level: 98, category: "UI/UX", icon: "Layout" }
  ],
  projects: [
    {
      id: "p1",
      title: "Nexus Crypto & Trading Terminal",
      category: "Fintech",
      description: "Haqiqiy vaqt rejimida kriptovalyutalar dinamikasi, shamchalar grafiklari va savdo tahlilini taqdim etuvchi ultra-tezkor tahliliy dashboard.",
      image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&auto=format&fit=crop&q=80",
      technologies: ["React", "Tailwind CSS", "Chart.js", "WebSocket", "Vite"],
      liveUrl: "https://example.com/demo-nexus",
      githubUrl: "https://github.com/example/nexus-crypto",
      featured: true,
      createdAt: "2024-08-15"
    },
    {
      id: "p2",
      title: "CyberPulse - E-Commerce NextGen",
      category: "E-Commerce",
      description: "Dark-cyberpunk uslubidagi premium elektron tijorat platformasi. Savatcha, to'lov tizimlari va tezkor qidiruv integratsiyalangan.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
      technologies: ["React", "Redux Toolkit", "Tailwind CSS", "Stripe API"],
      liveUrl: "https://example.com/demo-cyberpulse",
      githubUrl: "https://github.com/example/cyberpulse",
      featured: true,
      createdAt: "2024-09-02"
    },
    {
      id: "p3",
      title: "DevSprint - Agile Kanban SaaS",
      category: "Productivity",
      description: "Dasturchilar va IT jamoalar uchun vazifalarni boshqarish tizimi. Drag-and-drop, sprint tahlili va jamoaviy chat funksiyalari.",
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80",
      technologies: ["React", "DnD Kit", "Tailwind CSS", "LocalStorage", "Lucide"],
      liveUrl: "https://example.com/demo-devsprint",
      githubUrl: "https://github.com/example/devsprint",
      featured: true,
      createdAt: "2024-10-10"
    },
    {
      id: "p4",
      title: "HyperAI - Prompt & Model Hub",
      category: "AI Tools",
      description: "Sun'iy intellekt modellarini sinash, promptlar to'plami va kod generatsiyasi uchun mo'ljallangan qulay developer interfeysi.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
      technologies: ["React", "OpenAI API", "Tailwind CSS", "SyntaxHighlighter"],
      liveUrl: "https://example.com/demo-hyperai",
      githubUrl: "https://github.com/example/hyper-ai",
      featured: false,
      createdAt: "2024-11-20"
    },
    {
      id: "p5",
      title: "Aura Stream - Audio Streaming App",
      category: "Media",
      description: "Minimalistik musiqa va podcast platformasi. Audio vizualizatsiyasi, pleylistlar va offline kesh xotirasi bilan jihozlangan.",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
      technologies: ["React", "Web Audio API", "Tailwind CSS", "Vite"],
      liveUrl: "https://example.com/demo-aurastream",
      githubUrl: "https://github.com/example/aurastream",
      featured: false,
      createdAt: "2024-12-05"
    }
  ],
  messages: [
    {
      id: "msg_1",
      name: "Akmal Karimov",
      email: "akmal.dev@gmail.com",
      subject: "Fintech startap uchun taklif",
      message: "Salom Izzatulloh! Sizning portfoliongizdagi Nexus Crypto loyihangiz juda yoqdi. Bizning yangi platformamizga Front-end arxitektor kerak, qachon suhbatlashsak bo'ladi?",
      date: "2025-01-10 14:20",
      read: false
    },
    {
      id: "msg_2",
      name: "Sardor Aliyev",
      email: "sardor@venture.uz",
      subject: "Frilans loyiha bo'yicha",
      message: "Assalomu alaykum! Bizda zamonaviy SaaS CRM tizimi bor. React va Tailwind bilan UI ni qayta ishlab chiqish kerak.",
      date: "2025-01-12 18:45",
      read: true
    }
  ]
};
