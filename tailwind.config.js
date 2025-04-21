/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Georgia, serif'],
        body: ['Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        'primary-bg': '#fefbf6',
        'text-primary': '#4a3b30',
        'nav-bg': '#2f2a1d',
        'nav-text': '#f5e8c7',
        'accent': '#a8c686',
        'accent-hover': '#8b9a47',
        'section-bg': '#f0ead6',
      },
    },
  },
  plugins: [],
};