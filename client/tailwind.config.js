/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'themeBlue': '#6E00FF',
        'textGrey': '#7C7C7C',
        'notOrange': '#F24E1E',
        'boxGrey': '#E7E7E7',
        'textBlack': '#333333',
        'darkBlue': '#5322BC',
        'shadowBlue': '#79C5EF',
        'bgBlue': '#EFF6FC'
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "edu-sa": ["Edu SA Beginner", "cursive"],
        mono: ["Roboto Mono", "monospace"],
      },
      backgroundImage:{
        'chat-bg':"url('./src/assets/chat-bg.jpg')"
      }
    },
  },
  plugins: [],
}