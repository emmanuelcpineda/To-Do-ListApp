/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gabarito: ['Gabarito', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      colors: {
        'primary': "#ccfbf1",
        "teal-400": "#2dd4bf",
        "sky-400": "#38bdf8",
        "indigo-100": "#e0e7ff",
        "white-400": "rgba(255, 255, 255, 0.80)"
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
      },
    },
  },
  plugins: [],
}

