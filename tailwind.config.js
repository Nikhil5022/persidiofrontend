/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0052CC',
        secondary: '#FF5630',
        background: '#F4F5F7',
        text: '#172B4D',
        accent: '#36B37E',
      },
    },
  },
  plugins: [],
}
