/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'vehicleTruckImgProfile': "url('https://img.freepik.com/free-photo/truck-with-white-trailer-that-says-scania-side_123827-23486.jpg?t=st=1716641545~exp=1716645145~hmac=a849ad7e96e54314f0949223e0d78759b42e5996f98416d7a087cf03dfb973d8&w=900')",

        'supply-chain': "url('https://img.freepik.com/free-photo/supply-chain-representation-still-life_23-2150172463.jpg?t=st=1716883419~exp=1716887019~hmac=dc7971d2ee6895c09f082a9ecf1708f8f8dae69a0030f9f9654227f2237822da&w=900')",

        'gradient-network' :"url('https://img.freepik.com/free-vector/gradient-network-connection-background_23-2148865392.jpg?t=st=1716883377~exp=1716886977~hmac=1d056b085c98e082781c570a1769fd3edf465d1d17ab4f035111f0a3abc9c711&w=900')",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "spin-slow2": "spin2 8s linear infinite",
        "up-down": "upDown 2s infinite alternate",
        "up-down-dot": "upDownDot 4s infinite alternate",
        "left-right": "leftRight 8s ease-in-out infinite",
      },
      keyframes: {
        spin: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(359deg)",
          },
        },
        spin2: {
          from: {
            transform: "rotate(359deg)",
          },
          to: {
            transform: "rotate(0deg)",
          },
        },
        upDown: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(10%)" },
        },
        upDownDot: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(10%)" },
        },
        leftRight: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(30px)" },
        },
      },
    },
  },
  plugins: [],
};
