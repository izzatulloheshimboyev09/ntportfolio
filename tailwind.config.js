/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        cyber: {
          bg: '#030712',
          surface: '#0B0F19',
          card: 'rgba(15, 23, 42, 0.65)',
          cardHover: 'rgba(30, 41, 59, 0.75)',
          neonCyan: '#06b6d4',
          neonEmerald: '#10b981',
          neonViolet: '#8b5cf6',
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'neon-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
        'neon-violet': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
