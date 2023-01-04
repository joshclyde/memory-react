import { defineConfig, type PluginOption } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

import react from "@vitejs/plugin-react";
// const path = require("path");
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({ open: true, template: "sunburst" }) as PluginOption],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
  },
});
