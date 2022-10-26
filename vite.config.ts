import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// const path = require("path");
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "src": path.resolve(__dirname, "./src"),
    },
  },
});
