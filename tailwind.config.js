/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
import tailwindcssAnimated from 'tailwindcss-animated';
export const theme = {
  extend: {
    colors: {
      fondo: '#060918',
      // Tema Púrpura (Original)
      fondo2: '#4C1D95',
      // Tema Verde Esmeralda
      fondo3: '#065F46',
      // Tema Terracota
      fondo4: '#9A3412',
      // Tema Azul Océano
      fondo5: '#1E40AF',
      letra: '#fffef9',
      temas: {
        morado: {
          start: '#4C1D95',
          mid: '#7C3AED',
          end: '#8B5CF6'
        },
        verde: {
          start: '#065F46',
          mid: '#059669',
          end: '#34D399'
        },
        terracota: {
          start: '#9A3412',
          mid: '#EA580C',
          end: '#FB923C'
        },
        oceano: {
          start: '#1E40AF',
          mid: '#3B82F6',
          end: '#60A5FA'
        }
      }
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
    tailwindcssAnimated
];

