/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['cupcake', 'black', 'dark', 'cmyk'],
  },
}
