import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          soft: '#fce7ef',
          DEFAULT: '#ffffff',
          50: '#ffffff',
          100: '#f8f9fa',
          200: '#f0f1f3',
        },
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#2E7D32',
          600: '#1b5e20',
          700: '#145219',
          800: '#0d3b12',
          900: '#0a2e0e',
        },
        mint: {
          50: '#f0fdf9',
          100: '#ccfbef',
          200: '#99f6df',
          300: '#5ceccd',
          400: '#2dd4b6',
          DEFAULT: '#b2dfdb',
        },
        secondary: {
          soft: '#fce7ef',
          DEFAULT: '#fbcfe8',
          dark: '#f9a8d4',
        },
        accent: {
          gold: '#d4af37',
          DEFAULT: '#2E7D32',
          dark: '#1b5e20',
          light: '#43a047',
        },
        background: {
          warm: '#fefcf8',
          DEFAULT: '#fefcf8',
        },
        text: {
          DEFAULT: '#1f2937',
          light: '#6b7280',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config