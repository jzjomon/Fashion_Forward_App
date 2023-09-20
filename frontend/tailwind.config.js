/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bornkey: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        }, 
        deathkey: {
          '0%':{ transform: 'translateX(0px)'},
          '50%':{ transform: 'translateX(-200px) scale(1)'},
          '100%':{ transform: 'translateX(-200px) scale(0)' },
        }
        
      },
      animation: {
        'born': 'bornkey 1s ease 1',
        'death' : 'deathkey 1s ease 1'
      },
    },
  },
  plugins: [],
}
