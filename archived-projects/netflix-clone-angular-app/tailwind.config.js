/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      height: {
        "screen-minus": (value) => `calc(100vh - ${value}px)`,
      },
    },
  },
  plugins: [],
};
