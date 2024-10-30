/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-acct": "#ff6d01",
        "my-acct-hover": "#f6b26b",
        "my-prim": "#0b5394",
        "my-prim-hover": "#3d85c6",
        "my-secon": "#6fa8dc",
        "my-secon-hover": "#9fc5e8",
        "my-text": "#0c1018",
        "my-bg-main": "#f3f3f3",
        "my-bg-card": "#ffffff",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
