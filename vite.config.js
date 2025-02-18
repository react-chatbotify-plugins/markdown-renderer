import react from "@vitejs/plugin-react";
import path from "path";
import eslint from "vite-plugin-eslint2";

import { defineConfig  } from "vite";

export default () => {
  
  return defineConfig({
    root: "src",
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.tsx"),
        name: "rcb-plugin",
        fileName: "index",
        formats: ["es", "cjs"],
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react-dom/server",
          "react/jsx-runtime",
          "react/jsx-dev-runtime",
          "react-chatbotify"
        ],
        output: {
          globals: {
            react: "React",
          }
        },
      },
      outDir: "../dist",
    },
    plugins: [
      react({
        include: "**/*.{jsx,tsx}",
      }),
      //eslint()
    ],
  });
}