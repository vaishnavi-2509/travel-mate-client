/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx,html}"];
export const theme = {
  extend: {
    keyframes: {
      slideDown: {
        '0%': { opacity: '0', transform: 'translateY(-10px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
    animation: {
      slideDown: 'slideDown 0.3s ease-out forwards',
    },
  },
};
export const plugins = [];
