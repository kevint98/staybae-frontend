import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 4000,
    host: "0.0.0.0",
    strictPort: true,
  },
});
