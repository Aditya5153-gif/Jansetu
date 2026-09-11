/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
