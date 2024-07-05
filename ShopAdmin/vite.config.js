import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  darkMode: 'class', // background animations configuration
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://purchase.ankusamenggservices.com/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
