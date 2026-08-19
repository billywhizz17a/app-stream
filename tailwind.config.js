/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-blue-500/10', 'border-blue-500/20', 'text-blue-400',
    'bg-green-500/10', 'border-green-500/20', 'text-green-400',
    'bg-red-500/10', 'border-red-500/20', 'text-red-400',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
