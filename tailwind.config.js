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
      screens: {
        xs: '1px',
        // => @media (min-width: 640px) { ... }

        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
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
        grey: '#e8ebf0', //eeeff1 -eski rengi-
        midnight: '#020617',
        pig: '#f23f5d',
        tahiti: '#3ab7bf',
        silver: '#ecebff',
        bubblegum: '#ff77e9',
        bermuda: '#78dcca',
        gorkem: 'lch(5.6 0.88 251.33 / 1)',
        night: '#0C090A',
        blackSwan: '#151718',
        ash: '#a5a2b5',
        aqua: '#06b9f0',
        plum: '#100f15',
        aurora: '#4653d9',
        amethyst: '#161525',
        lavender: '#6a4ebb',
        lilac: '#eae1ff',
        brown: '#242526',
        teal: '#47b39d',
      },
    },
  },
  plugins: [],
};
