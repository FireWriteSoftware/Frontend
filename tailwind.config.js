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
          1: '#0062bb',
          2: '#F1F5F8',
          3: '#1875c9',
          4: '#1065b3',
          5: '#DEE7EF',
          6: '#D32929',
          7: '#365A74',
          8: '#D2DFEA',
          9: '#91C714',
          10: '#2d8ce3',
          11: '#F78B00',
          12: '#FBC500',
          13: '#7F9EB9',
          14: '#E6F3FF',
          15: '#8DA9BE',
          16: '#607F96',
          17: '#FFEFD9',
          18: '#D8F8BC',
          19: '#1a65ab',
          20: '#3b80bf',
          21: '#C6D4FD',
          22: '#E8EEFF',
          23: '#1b61a1',
          24: '#163296',
          25: '#C7D2FF',
          26: '#082b9c',
          27: '#2064ad',
          28: '#BBC8FD',
          29: '#284EB2',
          30: '#98AFF5',
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
