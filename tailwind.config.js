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
        // Warmes Bühnenlicht (Halogen/Amber) statt Standard-Blau
        accent: {
          DEFAULT: '#ffb547',
          300: '#ffd08a',
          400: '#ffc266',
          500: '#ffb547',
          600: '#f59e0b',
          700: '#d97706',
        },
        paper: '#f3eee6',
        // Öffentliche Seite: hell und schlicht
        canvas: '#f6f5f1',
        surface: '#ffffff',
        fg: '#121211',
        muted: '#5d5b56',
        line: '#dedbd3',
      },
      fontFamily: {
        sans: ['"Geist Variable"', 'system-ui', 'sans-serif'],
        display: ['"Geist Variable"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        'extra-wide': '0.35em',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'beam-sway': 'beamSway 9s ease-in-out infinite',
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
        beamSway: {
          '0%, 100%': { transform: 'translateX(-50%) rotate(var(--tilt, 0deg))' },
          '50%': { transform: 'translateX(-50%) rotate(calc(var(--tilt, 0deg) + var(--sway, 4deg)))' },
        },
      },
    },
  },
  plugins: [],
};
