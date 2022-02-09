const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.svelte'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '375px',
      md: '550px',
      md2: '600px',
      md3: '800px',
      lg: '1000px',
      xl: '1500px',
      xl2: '3000px',
    },
    colors: {
      white: colors.white,
      black: colors.black,
      grey: colors.gray,
      indigo: colors.indigo,
      spaceGrey: '#111111',
      spaceWhite: '#FAFAFC',
      sky: colors.sky,
      red: colors.red,
      pink: colors.fuchsia,
      yellow: colors.yellow,
      slate: colors.slate,
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
};
