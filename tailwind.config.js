import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme'

export const theme = {
  screens: {
    'sm': '576px',
    // => @media (min-width: 576px) { ... }

    'md': '960px',
    // => @media (min-width: 960px) { ... }

    'lg': '1440px',
    // => @media (min-width: 1440px) { ... }
  },
  extend: {
    fontFamily: {
      sans: ['Inter var', ..._fontFamily.sans],
    },
  },


}