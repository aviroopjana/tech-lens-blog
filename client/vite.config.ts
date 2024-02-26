import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api' : 'https://tech-lens-blog-server.vercel.app',
    },
  },
  plugins: [react()],
})
