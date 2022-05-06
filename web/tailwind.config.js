const defaultTheme = require('tailwindcss/defaultTheme')

/**
 * @type { import('tailwindcss/tailwind-config').TailwindConfig }
 */
module.exports = {
  mode: 'jit',
  content: [
    './src/components/**/*.tsx',
    './src/pages/**/*.tsx',
    './src/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          300: '#996DFF',
          500: '#8257e6',
          900: '#271A45',
        }
      },
      borderRadius: {
        'md': '4px',
      },
      transitionDelay: {
        '0': '0ms',
      },
      transitionProperty: {
        'width': 'max-width, width'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
  ],
}
