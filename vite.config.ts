import path from "path"
import { defineConfig } from "vite"
import vike from "vike/plugin"
import kaioken from "vite-plugin-kaioken"
import tailwindcss from "@tailwindcss/vite"
import { telefunc } from "telefunc/vite"
import devServer from "@hono/vite-dev-server"

export default defineConfig({
  publicDir: path.resolve(__dirname, "src/app/public"),
  resolve: {
    alias: {
      $: path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    vike(),
    kaioken(),
    tailwindcss(),
    telefunc(),
    devServer({
      entry: "./src/server/hono-entry.ts",
      ignoreWatching: [/\.db/],
      exclude: [
        /^\/@.+$/,
        /.*\.(ts|tsx)($|\?)/,
        /.*\.(s?css|less)($|\?)/,
        /^\/favicon\.ico$/,
        /.*\.(svg|png)($|\?)/,
        /^\/(public|assets|static)\/.+/,
        /^\/node_modules\/.*/,
      ],
      injectClientScript: false,
    }),
  ],
})
