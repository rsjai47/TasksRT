module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {

      colors: {
        'dark-1': '#121212',
        'dark-2': '#1D1D1D',
        'dark-3': '#353535'
      },
      fontFamily: {
        'Zilla': ['"Zilla Slab"', 'serif'],
      }
    },
  },
  variants: {
    extend: {
      opacity: ["active"],
    },  
  },
  plugins: [],
}
