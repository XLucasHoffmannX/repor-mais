/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './views/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
  	container: {
  		center: 'true',
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		},
  		fontFamily: {
  			poppins: [
  				'Poppins',
  				'sans-serif'
  			]
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'50%': {
  					opacity: '0.5'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			fadeOut: {
  				'0%': {
  					opacity: '1'
  				},
  				'100%': {
  					opacity: '0'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			smoothContent: {
  				from: {
  					opacity: '0',
  					marginTop: '-150px'
  				},
  				to: {
  					opacity: '1',
  					marginTop: '0px'
  				}
  			},
  			up: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(2rem)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			down: {
  				from: {
  					opacity: '0',
  					transform: 'translateY(-1.2rem)'
  				},
  				to: {
  					opacity: '1'
  				}
  			},
  			left: {
  				from: {
  					opacity: '0',
  					transform: 'translateX(10rem)'
  				},
  				to: {
  					opacity: '1'
  				}
  			},
  			right: {
  				from: {
  					opacity: '0',
  					transform: 'translateX(-10rem)'
  				},
  				to: {
  					opacity: '1'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			fadeIn: 'fadeIn 0.5s ease-in-out',
  			fadeOut: 'fadeOut 0.5s ease-in-out',
  			smoothContent: 'smoothContent 0.5s ease-in-out forwards',
  			up: 'up 0.5s ease-out',
  			down: 'down 0.5s ease-in-out forwards',
  			left: 'left 0.5s ease-in-out forwards',
  			right: 'right 0.5s ease-in-out forwards',
  			spin: 'spin 1s linear infinite'
  		}
  	}
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('tailwindcss-animate'),
    function ({ addBase }) {
      addBase({
        '::-webkit-scrollbar': {
          width: '6.5px',
          height: '6.5px',
          backgroundColor: '#f9fafb' // bg-gray-50
        },
        '::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.1)',
          borderRadius: '12px',
          backgroundColor: '#f1f1f1'
        },
        '::-webkit-scrollbar-thumb': {
          borderRadius: '10px',
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,.3)',
          backgroundColor: '#D1D5DB' // bg-gray-700
        }
      });
    }
  ]
};
