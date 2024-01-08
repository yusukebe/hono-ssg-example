import { Plugin, createServer } from 'vite'
import type { Hono } from 'hono'
import { toSsg } from 'hono/ssg'
import fs from 'fs/promises'

type BuildConfig = {
  outDir?: string
  publicDir?: string
}
type HonoSSGOptions = {
  entry?: string
  outDir?: string
  build?: BuildConfig
}

export const defaultOptions: Required<HonoSSGOptions> = {
  entry: './src/index.tsx',
  outDir: '.hono',
  build: {
    outDir: '../dist',
    publicDir: '../public'
  }
}

const HonoSSGBuild = (options?: HonoSSGOptions): Plugin => {
  const entry = options?.entry ?? defaultOptions.entry
  const outDir = options?.outDir ?? defaultOptions.outDir
  let files: string[] = []
  return {
    name: 'hono-ssg-build',
    apply: 'build',
    config: async () => {
      // Create a server to load the module
      const server = await createServer({
        configFile: false,
        plugins: [],
        build: { ssr: true }
      })
      const module = await server.ssrLoadModule(entry)
      server.close()

      const app = module['default'] as Hono

      if (!app) {
        throw new Error(`Failed to find a named export "default" from ${entry}`)
      }

      files = await toSsg(app, fs, { dir: outDir })

      return {
        root: outDir,
        publicDir: options?.build?.publicDir ?? defaultOptions.build.publicDir,
        build: {
          outDir: options?.build?.outDir ?? defaultOptions.build.outDir,
          rollupOptions: {
            input: [...files]
          },
          emptyOutDir: true
        }
      }
    }
  }
}

export default HonoSSGBuild
