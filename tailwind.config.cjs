const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

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
      neutral: colors.neutral,
      black: colors.black,
      grey: colors.gray,
      indigo: colors.indigo,
      spaceGrey: '#111111',
      spaceWhite: '#FAFAFC',
      red: colors.red,
      purple: colors.purple,
      slate: colors.slate,
      darkFromColor: `#8797e8 30%`,
      darkViaColor1: `#a162e8 50%`,
      darkViaColor2: `#f093b0 70%`,
      darkToColor: `#dab56c 94%`,
      lightViaColor2: `#e47c9d 70%`,
      lightToColor: `#dd9f22 94%`,
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
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-gradient': (angle) => ({
            'background-image': `linear-gradient(${angle}, var(--tw-gradient-stops))`,
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
          }),
        },
        {
          // values from config and defaults you wish to use most
          values: Object.assign(
            theme('bgGradientDeg', {}), // name of config key. Must be unique
            {
              0: '0deg',
              90: '90deg',
              271: '271deg',
            }
          ),
        }
      );
    }),
  ],
};
