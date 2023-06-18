/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2A6350',
        secondary: '#F2BE4B',
      },
    },
  },
  plugins: [],
}
