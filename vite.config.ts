import { telefunc } from "telefunc/vite"
import tailwindcss from "@tailwindcss/vite"
import kaioken from "vite-plugin-kaioken"
import devServer from "@hono/vite-dev-server"
import { defineConfig, type Plugin } from "vite"
import vike from "vike/plugin"
import path from "node:path"

export default defineConfig({
  publicDir: path.resolve(__dirname, "src/app/public"),
  resolve: {
    alias: {
      $: path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    vike({}),
    kaioken({}),
    devServer({
      entry: "./src/server/hono-entry.ts",
      ignoreWatching: [/\.db/],
      exclude: [
        /^\/@.+$/,
        /.*\.(ts|tsx|vue)($|\?)/,
        /.*\.(s?css|less)($|\?)/,
        /^\/favicon\.ico$/,
        /.*\.(svg|png)($|\?)/,
        /^\/(public|assets|static)\/.+/,
        /^\/node_modules\/.*/,
      ],
      injectClientScript: false,
    }),

    tailwindcss(),
    telefunc(),
  ],
  build: {
    target: "es2022",
    sourcemap: false,
    outDir: "dist",
  },
})
