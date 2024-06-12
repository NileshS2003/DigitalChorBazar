/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors:{
        pratham:'#218380',
        dwitiy:'#58B09C',
        tritiy:'#F9ECCC',
        chaturth:'#FF6F59',
        pancham:'#211A1D'
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
};
