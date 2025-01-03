/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['"Nunito Sans"', 'sans-serif'], // Add Nunito Sans to Tailwind's font stack
      },
      colors: {
        "custom-blue": "#0B8FAC",
        "custom-teal": "#7BC1B7",
        "custom-light-teal": "#D2EBE7",
        "custom-sky": "#1995B0",
        "custom-orange": "#F89603",
        "custom-dark-blue": "#13375B",
        "custom-green": "#129820",
        "custom-red": "#F30000",
        "custom-gray-dark": "#5F5F60",
        "custom-gray-medium": "#4F4E69",
        "custom-gray-light": "#858585",
      },
    },
  },
  plugins: [],
};
