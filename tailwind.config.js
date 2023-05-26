/** @type {import('tailwindcss').Config} */
module.exports = {
  // irisMode: 'class',
  darkMode: 'class',
  // darkMode: ['class', '[data-mode="dark"]'],
  // irisMode: ['class', '[data-mode="iris"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        xl: '0 13px 26px rgba(#000, .2), 0 3px 6px rgba(#000, .2)',
      },
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#fdfdfd',
        grey: '#eeeff1',
        midnight: '#020617',
        pig: '#f23f5d',
        tahiti: '#3ab7bf',
        silver: '#ecebff',
        bubblegum: '#ff77e9',
        bermuda: '#78dcca',
        gorkem: 'lch(5.6 0.88 251.33 / 1)',
        night: '#0C090A',
      },
    },
  },
  plugins: [],
};
