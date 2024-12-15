/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B8FAC', // custom primary color
      },
      fontFamily: {
        sans: ['"Red Hat Display"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
