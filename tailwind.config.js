/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F1EDE5',
          light: '#FAF7F2',
          surface: '#E7E0D4',
          dark: '#DDD5C7',
        },
        charcoal: {
          DEFAULT: '#101010',
          dark: '#0A0A0A',
          surface: '#171717',
          card: '#1F1F1F',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        coral: {
          DEFAULT: '#FF6046',
          hover: '#FF765F',
          dim: '#E24C33',
          glow: 'rgba(255, 96, 70, 0.25)',
        },
        muted: {
          DEFAULT: '#77736D',
          light: '#96918A',
          dark: '#58554F',
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        syne: ['"Syne"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
        widest: '0.15em',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
