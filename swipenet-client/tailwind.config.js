/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // all your components/pages
  ],
  theme: {
    extend: {
      colors: {
        "swipe-navy": "#0f172a",
        "swipe-dark": "#1e293b",
        "swipe-blue": "#3b82f6",
        "swipe-text-primary": "#f8fafc",
		"swipe-border": "#334155", // ✅ add this
        "swipe-text-secondary": "#94a3b8",
        "background": "#111827",
      },
      boxShadow: {
        "glow": "0 0 15px rgba(59,130,246,0.5)",
        "card": "0 2px 10px rgba(0,0,0,0.2)",
      },
      backgroundImage: {
        "gradient-card": "linear-gradient(135deg, #1e293b, #0f172a)",
        "gradient-primary": "linear-gradient(135deg, #3b82f6, #60a5fa)",
        "gradient-glow": "radial-gradient(circle, #3b82f6, transparent)",
      },
    },
  },
  plugins: [],
};
     