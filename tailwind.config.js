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
  	colors: {
  		'brand-50': '#e6e7f5',
  		'brand-100': '#cdceeb',
  		'brand-200': '#b4b6e1',
  		'brand-300': '#9b9ed7',
  		'brand-400': '#8286ce',
  		'brand-500': '#050c9c',
  		'brand-600': '#03075e',
  		'brand-700': '#03064e',
  		'brand-800': '#02053e',
  		'brand-900': '#01042f',
  		'grey-0': '#fff',
  		'grey-50': ' #f9fafb',
  		'grey-100': '#f3f4f6',
  		'grey-200': '#e5e7eb',
  		'grey-300': '#d1d5db',
  		'grey-400': '#9ca3af',
  		'grey-500': '#6b7280',
  		'grey-600': '#4b5563',
  		'grey-700': '#374151',
  		'grey-800': '#1f2937',
  		'grey-900': '#111827',
  		transparent: 'transparent',
  		'dark-grey-0': '#18212f',
  		'dark-grey-50': '#111827',
  		'dark-grey-100': '#1f2937',
  		'dark-grey-200': '#374151',
  		'dark-grey-300': '#4b5563',
  		'dark-grey-400': '#6b7280',
  		'dark-grey-500': '#9ca3af',
  		'dark-grey-600': '#d1d5db',
  		'dark-grey-700': '#e5e7eb',
  		'dark-grey-800': '#f3f4f6',
  		'dark-grey-900': '#f9fafb',
  		'red-100': '#fee2e2',
  		'red-500': '#ff0000',
  		'red-700': '#b91c1c',
  		'red-800': '#991b1b',
  		'dark-red-100': '#fee2e2',
  		'dark-red-700': '#b91c1c',
  		'dark-red-800': '#991b1b',
  		'backdrop-color': 'rgba(255, 255, 255, 0.1)',
  		border: 'hsl(var(--border))'
  	},
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