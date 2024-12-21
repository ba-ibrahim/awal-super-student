// tailwind.config.js
export default {
  content: [
    './index.html', // Ensures Tailwind looks at your HTML files
    './src/**/*.{js,jsx,ts,tsx}', // Ensures it also looks at JS/JSX files inside 'src' folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
