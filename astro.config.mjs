// @ts-check
import { execSync } from 'node:child_process'

import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

const pkg = await import('./package.json', { with: { type: 'json' } })
const name = pkg.default.name
const version = pkg.default.version
const commit = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim()
const versionToken = `${version}, ${commit}`

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    define: {
      __APP_NAME__: JSON.stringify(name),
      __APP_VERSION__: JSON.stringify(versionToken),
      __COMMIT__: JSON.stringify(commit),
    },
  },
})
