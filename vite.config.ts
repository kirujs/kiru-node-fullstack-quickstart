import path from "path"
import { defineConfig } from "vite"
import vike from "vike/plugin"
import kaioken from "vite-plugin-kaioken"
import tailwindcss from "@tailwindcss/vite"
import { telefunc } from "telefunc/vite"
import { pages } from "vike-cloudflare"

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
  ],
  build: {
    rollupOptions: {
      external: ["wrangler"],
    },
    target: "es2022",
  },
})
