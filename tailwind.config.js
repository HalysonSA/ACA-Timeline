/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src//components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'home': '-10px 10px 20px rgba(0, 0, 0, 0.25)',
      },
      rotate: {
        '30': '30deg',
      },
      minHeight: {
        'min': '54rem',
        
        'calendar' : '500px'
      },
      maxHeight: {
        'max': '54rem',
      },
      maxWidth: {
        'max': '34rem',
      },
      minWidth: {
        'min': '90%',
      },
      width: {
        
        'calendar': '700px'
      },
      height: {
        'screen/2': '50vh',
        'screen-3/4': '75vh',
      },
      fontFamily:{
        'Roboto': ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}