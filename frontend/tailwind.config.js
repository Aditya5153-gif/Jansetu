/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#1b4332',
          900: '#143823',
          950: '#0c2517'
        },
        walnut: {
          50: '#fdf8f4',
          100: '#faede2',
          200: '#f3d9c2',
          300: '#e5be9b',
          400: '#c89569',
          500: '#a36d40',
          600: '#7e4e2a',
          700: '#6b3d1b',
          800: '#5c3519',
          900: '#4a2b16',
          950: '#2c160a'
        },
        prussian: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0f3d61',
          800: '#003153',
          900: '#07253a',
          950: '#031726'
        },
        saffron: {
          50: '#fff9eb',
          100: '#ffefc6',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c'
        },
        tirangaGreen: {
          50: '#f0fdf4',
          500: '#16a34a',
          600: '#15803d',
          700: '#166534'
        },
        chakraNavy: {
          50: '#f0f4fd',
          500: '#1e3a8a',
          600: '#172554',
          900: '#0b132b'
        }
      }
    },
  },
  plugins: [],
}
