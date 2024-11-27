import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: true, // This enables access on your local IP
    port: 5173, // Optional: customize the port
  },
})
