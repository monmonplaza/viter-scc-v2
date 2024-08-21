/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        regular: ["poppins-regular", "Arial", "sans-serif"],
        medium: ["poppins-medium", "Arial", "sans-serif"],
        semibold: ["poppins-semibold", "Arial", "sans-serif"],
      },
      textColor: {
        accent: "rgba(var(--accent), <alpha-value>)",
        light: "rgba(var(--light), <alpha-value>)",
        primary: "rgba(var(--primary), <alpha-value>)",
        secondary: "rgba(var(--secondary), <alpha-value>)",
        dark: "rgba(var(--dark), <alpha-value>)",
        line: "rgba(var(--line), <alpha-value>)",
        alert: "rgba(var(--alert), <alpha-value>)",
        success: "rgba(var(--success), <alpha-value>)",
        warning: "rgba(var(--warning), <alpha-value>)",
        info: "rgba(var(--info), <alpha-value>)",
      },
      backgroundColor: {
        accent: "rgba(var(--accent), <alpha-value>)",
        popup: "rgba(var(--popup), <alpha-value>)",
        light: "rgba(var(--light), <alpha-value>)",
        primary: "rgba(var(--primary), <alpha-value>)",
        secondary: "rgba(var(--secondary), <alpha-value>)",
        orange: "rgba(var(--orange), <alpha-value>)",
        dark: "rgba(var(--dark), <alpha-value>)",
        line: "rgba(var(--line), <alpha-value>)",
        alert: "rgba(var(--alert), <alpha-value>)",
        success: "rgba(var(--success), <alpha-value>)",
        warning: "rgba(var(--warning), <alpha-value>)",
        info: "rgba(var(--info), <alpha-value>)",
      },
      borderColor: {
        accent: "rgba(var(--accent), <alpha-value>)",
        popup: "rgba(var(--popup), <alpha-value>)",
        light: "rgba(var(--light), <alpha-value>)",
        primary: "rgba(var(--primary), <alpha-value>)",
        secondary: "rgba(var(--secondary), <alpha-value>)",
        orange: "rgba(var(--orange), <alpha-value>)",
        dark: "rgba(var(--dark), <alpha-value>)",
        line: "rgba(var(--line), <alpha-value>)",
        alert: "rgba(var(--alert), <alpha-value>)",
        success: "rgba(var(--success), <alpha-value>)",
        warning: "rgba(var(--warning), <alpha-value>)",
        info: "rgba(var(--info), <alpha-value>)",
      },
      stroke: {
        accent: "rgba(var(--accent), <alpha-value>)",
      },

      boxShadow: {
        custom: "0px 4px 4px 0px rgba(0,0,0,0.05)",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "60" },
        },
        slideRight: {
          "0%": { right: "-100%" },
          "100%": { right: "0%" },
        },
        slideUp: {
          "0%": { top: "55%", opacity: 0 },
          "100%": { top: "50%", opacity: 1 },
        },
        rotate: {
          "100%": { transform: "rotate(360deg)" },
        },
        loading: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },

      animation: {
        rotate: "rotate 2s linear infinite",
        loading: "loading 1.5s ease-in infinite",
        fadeIn: "fadeIn .3s ease-in",
        slideRight: "slideRight .2s linear ",
        slideUp: "slideUp .2s linear ",
      },
    },
  },
  plugins: [],
};
