/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#040404',
          900: '#080808',
          850: '#0d0d0d',
          800: '#111111',
          700: '#1a1a1a',
          600: '#242424',
          500: '#333333',
          400: '#555555',
          300: '#888888',
          200: '#b0b0b0',
          100: '#e0e0e0',
        },
        accent: {
          DEFAULT: '#e30613',
          300: '#f87171',
          400: '#e30613',
          500: '#e30613',
          600: '#c4050f',
          700: '#a3040c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        'extra-wide': '0.35em',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 6s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 2.5s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
