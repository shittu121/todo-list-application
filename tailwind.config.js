/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
  	borderRadius: {
  		none: '0',
  		tiny: '3px',
  		sm: '5px',
  		md: '7px',
  		lg: '9px',
  		full: '50%'
  	},
  	boxShadow: {
  		sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
  		md: '0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06)',
  		lg: '0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)',
  		'dark-sm': '0 1px 2px rgba(0, 0, 0, 0.4)',
  		'dark-md': '0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3)',
  		'dark-lg': '0 2.4rem 3.2rem rgba(0, 0, 0, 0.4)'
  	},
  	extend: {
  		fontFamily: {
  			sono: [
  				'Sono',
  				'sans-serif'
  			],
  			poppins: [
  				'Poppins',
  				'san-serif'
  			],
  			livvic: [
  				'Livvic',
  				'san-serif'
  			]
  		},
  		transitionTimingFunction: {
  			spring: 'cubic-bezier(0.88, -0.35, 0.565, 1.35)'
  		},
  		width: {
  			'custom-min-width': 'min(100% - 4rem, 1300px)',
  			'form-container': 'min(100% - 4rem, 450px)'
  		},
  		screens: {
  			desktop: {
  				max: '90em'
  			},
  			miniDesktop: {
  				max: '75em'
  			},
  			PC: {
  				max: '64em'
  			},
  			tablet: {
  				max: '43.75em'
  			},
  			mobile: {
  				max: '30em'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		
  	}
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/forms')],
};