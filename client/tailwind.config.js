/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/assets/**/*.{js,ts,jsx,tsx}",
  ],


  theme: {
    extend: {
      colors: {
        stonee: "#000",    
      },
        
      fontFamily: {  
        founders: ["founders"],
        neue: ["neue"],
        nb: ["nb"],
        rejouice: ["rejouice"],
      },
        
      backgroundImage: {
        "radial-gradient": "radial-gradient(var(--tw-gradient-stops))",
        "conic-gradient": "conic-gradient(from 225deg, #FFC876, #79FFF7, #9F53FF, #FF98E2, #FFC876)",
        "bloopy": "linear-gradient(to right, #4cf5ef, #4b31f5)",
      },
    },
  },


  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addComponents({
        ".hide-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".headlinex": {
          "@apply text-n-2 lg:text-[2.2rem] lg:max-w-[40rem] lg:leading-[3.5rem] md:text-[2rem] md:max-w-[26rem] md:leading-[3rem] md:tracking-tight text-[1.8rem] max-w-[24rem] leading-[2.5rem]": {},
        },
      });

      addUtilities({
        ".clip-corner": {
          clipPath: "polygon(95% 0, 100% 25%, 100% 100%, 0 100%, 0 0)",
        },
        ".clip-corner-v": {
          clipPath: "polygon(82% 4%, 86% 0, 90% 4%, 100% 4%, 100% 100%, 0 100%, 0 4%)",
        },
        ".clip-corner-2": {
          clipPath: "polygon(95% 0, 100% 25%, 100% 100%, 5% 100%, 0% 75%, 0 0)",
        },
      });
    }),
  ],

};
