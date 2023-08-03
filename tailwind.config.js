// tailwind.config.js/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dart-red': '#EE2D29',
      },
    },
  },
  plugins: [
    // ...
  ],
  corePlugins: {
    preflight: true, // <== disable this!
  },
};
