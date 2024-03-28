/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00DC82',
        dark: '#1F1F1F',
        subdark: '#2F2F2F',
        secondary: 'rgb(0 220 130 / 0.85)',
        shade: '#9E9E9E'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        rubik: ['Rubik Scribble', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
