/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
import tailwindcssAnimated from 'tailwindcss-animated';

export const theme = {
  extend: {
    colors: {
      // Legacy colors kept for backward compat
      fondo: '#060918',
      fondo2: '#4C1D95',
      fondo3: '#065F46',
      fondo4: '#9A3412',
      fondo5: '#1E40AF',
      letra: '#fffef9',

      // v3 Color System — RGB channel format enables opacity modifiers (e.g. bg-brand/20)
      brand: {
        DEFAULT: 'rgb(var(--color-brand) / <alpha-value>)',
        dark: 'rgb(var(--color-brand-dark) / <alpha-value>)',
        light: 'rgb(var(--color-brand-light) / <alpha-value>)',
      },
      surface: {
        DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
        mid: 'rgb(var(--color-surface-mid) / <alpha-value>)',
        card: 'rgb(var(--color-surface-card) / <alpha-value>)',
      },
      cyan: {
        DEFAULT: 'rgb(var(--color-cyan) / <alpha-value>)',
      },
      muted: {
        DEFAULT: 'rgb(var(--color-muted) / <alpha-value>)',
      },
      // Semantic text tokens — use these instead of text-white
      primary: {
        DEFAULT: 'rgb(var(--color-text-primary) / <alpha-value>)',
      },
      secondary: {
        DEFAULT: 'rgb(var(--color-text-secondary) / <alpha-value>)',
      },
      // Semantic border token — use instead of border-white/X
      line: {
        DEFAULT: 'rgb(var(--color-border-base) / <alpha-value>)',
      },
    },
    fontFamily: {
      roboto: ['Roboto Slab'],
      space: ['Space Grotesk', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    screens: {
      'xxl': '2560px',
    },
  },
};

export const plugins = [
  tailwindcssAnimated
];
