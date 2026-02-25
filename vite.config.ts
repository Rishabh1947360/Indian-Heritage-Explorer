import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/Indian-Heritage-Explorer/",   

  plugins: [
    // Do NOT remove these
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Do not add .css, .tsx, .ts here
  assetsInclude: ['**/*.svg', '**/*.csv'],
})