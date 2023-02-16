/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: 'rgb(164 87 23);',
      },
      backgroundImage: {
        banner: `url('../public/images/banner.jpg')`
      }
    },
  },
  plugins: [],
}
