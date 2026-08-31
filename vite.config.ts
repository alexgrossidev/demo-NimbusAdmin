import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/0.Components'),
      '@api': path.resolve(__dirname, './src/1.API'),
      '@context': path.resolve(__dirname, './src/2.Context'),
      '@theme': path.resolve(__dirname, './src/3.Theme'),
      '@atoms': path.resolve(__dirname, './src/3.Theme/0.Atoms'),
      '@molecules': path.resolve(__dirname, './src/3.Theme/1.Molecules'),
      '@routing': path.resolve(__dirname, './src/4.Routing'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
})
