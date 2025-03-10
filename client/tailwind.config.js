/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensures Tailwind scans your files
    theme: {
      extend: {
        colors: {
          brick: '#b85042',
          brickHover: '#9e3f34',
          beige: '#f2e1c1',
          beigeHover: '#d9c4a8',
          charcoal: '#3e3e3e',
          charcoalHover: '#2c2c2c',
          olive: '#8a8a74',
          oliveHover: '#747460',
          offwhite: '#eae7dc',
          offwhiteHover: '#d2cfc2',
          success: '#528034',
        },
        keyframes: {
          bounce: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(4px)' }
          }
        },
        animation: {
          'spin-slow': 'spin 2s linear infinite', // Custom slower spin
          'bounce-slow': 'bounce 1.5s infinite' // 
        }
      },
    },
    plugins: [],
  };
  