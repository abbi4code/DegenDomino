const svgToDataUri = require("mini-svg-data-uri");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["gamefont", "sans-serif"], // Add custom font
        roboto: ["Roboto", "sans-serif"], // For Google Fonts example
      },
      animation: {
        meteor: "meteor 10s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": {
            transform: "translateY(-100%) rotate(215deg)",
            opacity: 0,
          },
          "50%": {
            opacity: 1,
          },
          "100%": {
            transform: "translateY(100vh) translateX(1000px) rotate(215deg)",
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [
    addVariablesForColors,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-dot-thick": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-outline": {
          textShadow:
            "-1px -1px 0 #000,  1px -1px 0 #000, -1px  1px 0 #000,  1px  1px 0 #000",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
