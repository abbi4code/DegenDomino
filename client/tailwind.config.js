module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
