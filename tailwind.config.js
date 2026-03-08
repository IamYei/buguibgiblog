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
        sans: ['Nunito', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        display: ['Quicksand', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        fg: '#111111',
        bg: '#ffffff',
        glass: {
          light: 'rgba(255, 255, 255, 0.4)',
          dark: 'rgba(17, 17, 17, 0.4)',
          borderLight: 'rgba(255, 255, 255, 0.3)',
          borderDark: 'rgba(255, 255, 255, 0.05)',
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 12px 40px 0 rgba(31, 38, 135, 0.15)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        'glass-dark-hover': '0 12px 40px 0 rgba(0, 0, 0, 0.8)',
        'neon': '0 0 24px rgba(125, 211, 252, 0.3)',
        'neon-dark': '0 0 24px rgba(56, 189, 248, 0.2)',
      },
      animation: {
        'blob': 'blob 15s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
        'wiggle': 'wiggle 6s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
          '33%': { transform: 'translate(40px, -60px) scale(1.15) rotate(10deg)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.9) rotate(-10deg)' },
          '100%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg) translateY(0)' },
          '50%': { transform: 'rotate(3deg) translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
