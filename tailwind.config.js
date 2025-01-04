import { content, plugin } from 'flowbite-react/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    content(),
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#ce0395e9",
        "title": "#1c0014",
        "lite": "#f6f6f6",
        "desc": "#6a6666",
        "dark": "#181818"
      }
    },
  },
  plugins: [
    plugin()
  ],
  darkMode: "class"
}