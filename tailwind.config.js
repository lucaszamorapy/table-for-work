export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      screens: {
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1220px",
        "2xl": "1220px",
      },
      colors: {
        // Cores personalizadas
        blackTable: "#242424",
        purpleTable: "#5F2E82",
        blueTable: "#49a09d",
      },
    },
  },
  plugins: [],
};
