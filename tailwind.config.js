/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17243a",
        muted: "#685960",
        redlove: "#d71920",
        plum: "#4b1831",
        coral: "#ff6b5f",
        blush: "#f8ecee"
      },
      boxShadow: {
        glass: "0 22px 70px rgba(86, 40, 54, 0.16)"
      },
      fontFamily: {
        sans: ["Lato", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
