/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'spin-slow2': 'spin2 8s linear infinite',
        'up-down': 'upDown 2s infinite alternate',
      },
      keyframes: {
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(359deg)',
          },
        },
        spin2: {
          from: {
            transform: 'rotate(359deg)',
          },
          to: {
            transform: 'rotate(0deg)',
          },
        },
        upDown: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(10%)' },
        },
      },
    },
  },
  plugins: [],
}