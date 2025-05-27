const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.svelte"],
  darkMode: "class",
  theme: {
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "8xl": "6rem"
    },
    screens: {
      sm: "375px",
      md: "550px",
      md2: "600px",
      md3: "800px",
      lg: "1000px",
      xl: "1385px",
      xl2: "3000px"
    },
    colors: {
      white: colors.white,
      neutral: colors.neutral,
      black: colors.black,
      grey: colors.gray,
      "space-grey": "#111111",
      "light-space-grey": "#151a1a",
      "space-white": "#FaFaFc",
      "almost-white": "#fefefe",
      red: colors.red,
      purple: colors.purple,
      slate: colors.slate,
      teal: colors.teal,
      blue: colors.blue,
      "hero-color-1": `#8797e8`,
      "hero-color-2": `#a162e8`,
      "hero-color-3": `#f093b0`,
      "hero-color-4": `#dab56c`,
      "hero-color-5": `#e47c9d`,
      "hero-color-6": `#dd9f22`,
      "progress-bar-blue": "#BF41E0"
    },
    fontFamily: {
      Cormorant: ["Cormorant", "serif"],
      Poppins: ["Poppins", "sans-serif"],
      Roboto: ["Roboto Serif", "serif"]
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      gridTemplateColumns: {
        "articles-sm": "repeat(auto-fill, minmax(200px, 1fr))",
        "articles-md": "repeat(auto-fill, minmax(250px, 1fr))",
        "articles-lg": "repeat(auto-fill, minmax(300px, 1fr))"
      },
      lineHeight: {
        standard: "1.15",
        extraRelaxed: "1.7"
      },
      padding: {
        22: "5.5rem"
      },
      flex: {
        2: "2 2 0%"
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("color.neutral"),
            code: {
              paddingTop: "0.25rem",
              paddingRight: "0.15rem",
              borderRadius: "4px",
              padding: "2px 5px 0 5px"
            },
            "code::before": {
              content: '""'
            },
            "code::after": {
              content: '""'
            }
          }
        }
      })
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-gradient": (angle) => ({
            "background-image": `linear-gradient(${angle}, var(--tw-gradient-stops))`,
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent"
          })
        },
        {
          values: Object.assign(theme("bgGradientDeg", {}), {
            0: "0deg",
            90: "90deg",
            271: "271deg"
          })
        }
      );
    })
  ]
};
