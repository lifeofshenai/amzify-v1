/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff0f7',
          100: '#ffe4ef',
          200: '#ffc9e0',
          300: '#ff9dc4',
          400: '#ff61a2',
          500: '#ff006b',
          600: '#ff006b',
          700: '#cc0056',
          800: '#a60047',
          900: '#8a003b',
        },
        secondary: {
          50: '#fff0f7',
          100: '#ffe4ef',
          200: '#ffc9e0',
          300: '#ff9dc4',
          400: '#ff61a2',
          500: '#ff006b',
          600: '#ff006b',
          700: '#cc0056',
          800: '#a60047',
          900: '#8a003b',
        },
      },
      fontFamily: {
        'logo': ['Arial Black', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};