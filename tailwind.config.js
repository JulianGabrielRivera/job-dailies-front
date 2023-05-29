module.exports = {
  content: ["./src/**/*.{html,js,css}"],
  theme: {
    extend: {},
    screens: {
      xs: "500px",
      sm: "650px",
      // => @media (min-width: 576px) { ... }

      md: "830px",
      // => @media (min-width: 960px) { ... }

      lg: "1440px",
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
