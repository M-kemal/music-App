/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {


    container: {
      center: true
    },

    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        comfor: ['Comfortaa', 'cursive']
      },
      
      colors: {
        'msc-main': '#3B185F',
        'msc-green1': '#CCD6A6',
        'msc-green2': '#DAE2B6',
        'msc-crown': '#F4EAD5',
        'msc-light': '#E6DDC4',
        'msc-light2': '#FFFBE9',
        'msc-light3': '#F0E9D2',
      },
    },
  },
  plugins: [],
}

