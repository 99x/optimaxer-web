export const viteconfig = `import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: './data/config.json',
          dest: './'
        },
        {
          src: './data/commands.json',
          dest: './'
        },
        {
          src: './data/actions.json',
          dest: './'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});`;