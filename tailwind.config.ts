import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#171615', // Noir Militaire
          olive: '#4C4F3B', // Vert Olive
          brown: '#69432D', // Brun Militaire
        },
        neutral: {
          dark: '#303030', // Gris Foncé
          light: '#D9D9D9', // Pour contraster, peut être ajusté
        },
        accent: {
          red: '#9D0000', // Rouge Sombre
        },
        text: {
          dark: '#FFFFFF', // Blanc pour le texte sur fond sombre
          light: '#FFD700', // Jaune pour les accents lumineux
        },
      },
      fontFamily: {
        blackOps: ['Black Ops One', 'system-ui'],
      },
      boxShadow: {
        military:
          '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
