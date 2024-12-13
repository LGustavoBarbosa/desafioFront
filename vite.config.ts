import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      core: path.resolve(__dirname, "src/core"),
      domain: path.resolve(__dirname, "src/domain"),
      providers: path.resolve(__dirname, "src/providers"),
      views: path.resolve(__dirname, "src/views"),
    },
  },
});
