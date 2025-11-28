import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 💡 Necesitas importar 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 💡 AGREGAR ESTA SECCIÓN PARA FORZAR EL ALIAS DE REACT
  resolve: {
    alias: {
      'react': path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
})