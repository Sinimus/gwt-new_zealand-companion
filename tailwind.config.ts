import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#fdf6e3',
        primary: '#d97706',
        secondary: '#10b981',
        accent: '#0ea5e9',
        text: '#422006',
      },
      fontFamily: {
        heading: ['Merriweather', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
