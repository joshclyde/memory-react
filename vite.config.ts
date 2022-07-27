import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// const path = require("path");
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@Components": path.resolve(__dirname, "./src/Components"),
    },
  },
});
