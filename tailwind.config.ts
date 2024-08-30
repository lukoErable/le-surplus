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
          DEFAULT: '#1A2F0F', // Dark green
          olive: '#3D4F2E', // Darker olive green
          sand: '#1C1C1C', // Very dark gray (almost black)
          khaki: '#9B8D30', // Dark khaki (yellowish-green)
          camo: '#2D3A1F', // Dark camouflage green
        },
        neutral: {
          dark: '#0F0F0F', // Very dark gray (almost black)
          light: '#D9D9D9', // Light gray
        },
        accent: {
          yellow: '#FFD700', // Gold (yellow)
          green: '#355E3B', // Hunter green
        },
        text: {
          dark: '#000000', // Black
          light: '#FFD700', // Yellow
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
