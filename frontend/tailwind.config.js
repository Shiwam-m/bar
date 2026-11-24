/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f1012',
        panel: '#17181b',
        ink: '#f1ede4',
        soft: '#9a968c',
        gold: {
          DEFAULT: '#c8a45a',
          dark: '#b89347',
          light: '#e0c27b',
        },
        line: 'rgba(241, 237, 228, 0.14)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
