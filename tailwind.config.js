/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src//components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        'min': '54rem',
      },
      maxHeight: {
        'max': '54rem',
      },
      maxWidth: {
        'max': '34rem',
      },
      height: {
        'screen/2': '50vh',
        'screen-3/4': '75vh'
      },
      fontFamily:{
        'Roboto': ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}