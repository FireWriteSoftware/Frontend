const primaryColors = require('@left4code/tw-starter/dist/js/colors')

module.exports = {
  // mode: "jit",
  purge: [
    './src/**/*.{php,html,js,jsx,ts,tsx,vue}',
    './public/**/*.{php,html,js,jsx,ts,tsx,vue}',
    './resources/**/*.{php,html,js,jsx,ts,tsx,vue}',
    './node_modules/@left4code/tw-starter/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: primaryColors.gray['300']
    }),
    extend: {
      colors: {
        ...primaryColors,
        theme: {
          1: '#bb0000',
          2: '#faf7f7',
          3: '#c91818',
          4: '#b31010',
          5: '#efdede',
          6: '#D32929',
          7: '#743636',
          8: '#ead2d2',
          9: '#91C714',
          10: '#e32d2d',
          11: '#F78B00',
          12: '#FBC500',
          13: '#b97f7f',
          14: '#ffe6e6',
          15: '#be8d8d',
          16: '#966060',
          17: '#FFEFD9',
          18: '#D8F8BC',
          19: '#ab1a1a',
          20: '#bf3b3b',
          21: '#fdc6c6',
          22: '#ffe8e8',
          23: '#a11b1b',
          24: '#961616',
          25: '#ffc7c7',
          26: '#9c0808',
          27: '#ad2020',
          28: '#fdbbbb',
          29: '#b22828',
          30: '#f59898',
          31: 'rgba(0,0,0,0.5)'
        }
      },
      fontFamily: {
        roboto: ['Roboto']
      },
      container: {
        center: true
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%'
      },
      screens: {
        xs: '450px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xxl: '1600px'
      },
      strokeWidth: {
        0.5: 0.5,
        1.5: 1.5,
        2.5: 2.5
      }
    }
  },
  variants: {
    extend: {
      zIndex: ['responsive', 'hover'],
      position: ['responsive', 'hover'],
      padding: ['responsive', 'last'],
      margin: ['responsive', 'last'],
      borderWidth: ['responsive', 'last'],
      backgroundColor: ['last', 'first', 'odd', 'responsive', 'hover', 'dark'],
      borderColor: ['last', 'first', 'odd', 'responsive', 'hover', 'dark'],
      textColor: ['last', 'first', 'odd', 'responsive', 'hover', 'dark'],
      boxShadow: ['last', 'first', 'odd', 'responsive', 'hover', 'dark'],
      borderOpacity: ['last', 'first', 'odd', 'responsive', 'hover', 'dark'],
      backgroundOpacity: ['last', 'first', 'odd', 'responsive', 'hover', 'dark']
    }
  }
}
