import path from "path"
import { defineConfig } from "vite"
import vike from "vike/plugin"
import kaioken from "vite-plugin-kaioken"
import tailwindcss from "@tailwindcss/vite"
import { telefunc } from "telefunc/vite"
import { pages } from "vike-cloudflare"
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
    pages({
      server: {
        kind: "hono",
        entry: "./src/server/hono-entry.ts",
      },
    }),
    devServer({
      entry: "./src/server/hono-entry.ts",
      exclude: [
        /^\/@.+$/,
        /.*\.(ts|tsx)($|\?)/,
        /.*\.(s?css|less)($|\?)/,
        /^\/favicon\.ico$/,
        /.*\.(svg|png)($|\?)/,
        /^\/(public|assets|static)\/.+/,
        /^\/node_modules\/.*/,
      ],
      /**
       * We're disabling Hono's hot update handler since vite-plugin-kaioken deals with HMR.
       * Hono's plugin should still take care of server module reloads, though.
       */
      handleHotUpdate: () => {},
      injectClientScript: false,
    }),
  ],
  build: {
    rollupOptions: {
      external: ["wrangler"],
    },
    target: "es2022",
  },
})
