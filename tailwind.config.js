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
        "my-cat-alert": "#eb1e22",
        "my-cat-news": "#f6961b",
        "my-cat-shop": "#2c66b0",
        "my-cat-job": "#40b449",
        "my-cat-other": "#614399",
      },
      animation: {
        blink: 'blink 5s infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: '#4B5563' },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
