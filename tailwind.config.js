/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f6f6f7',
          100: '#e2e2e5',
          200: '#c5c5ca',
          300: '#9f9fa7',
          400: '#787881',
          500: '#5c5c65',
          600: '#4a4a52',
          700: '#3e3e44',
          800: '#35353a',
          900: '#1c1c20',
          950: '#0f0f12',
        },
        cream: {
          50: '#fffdfa',
          100: '#fff8f0',
          200: '#ffeedd',
          300: '#ffe0c2',
          400: '#ffd09e',
          500: '#ffb86c',
          600: '#f59e0b',
        },
        crimson: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        brand: {
          bg: '#09090b',
          card: '#151417',
          surface: '#242126',
          border: '#3a3335',
          text: '#fff8f0',
          muted: '#a1a1aa',
          accent: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Newsreader', 'ui-serif', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        soft: '0 10px 28px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.04)',
        card: '0 24px 80px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.05)',
        glow: '0 0 24px rgba(220,38,38,0.15)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
      animation: {
        'fade-in': 'fadeIn 150ms ease-out',
        'slide-in': 'slideIn 200ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
