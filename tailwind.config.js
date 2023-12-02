/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];

export const theme = {
  extend: {
    colors: {
      fondo: '#060918',
      fondo2: '#2069a2',
      fondo3: '#641f5e',
      fondo4: '#3f9499',
      letra: '#fffef9',
    },
    fontFamily: {
      roboto: ['Roboto Slab'],
      Peralta: ['Peralta'],
    },
    // fontSize:{
    //   tit:'120px',
    // },
    screens: {
      'xxl': '2560px',
    },

  },
};
export const plugins = [
    require('tailwindcss-animated')
];

